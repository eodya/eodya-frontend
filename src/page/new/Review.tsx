import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { open } from "../../store/features/errorModal/modalSlice";
import TopBar from "../../components/common/menu/TopBar";
import SpotInfo from "../../components/new/SpotInfo";
import SpotStatus from "../../components/new/SpotStatus";
import SpotDone from "../../components/new/SpotDone";
import SpotMore from "../../components/new/review/SpotMore";
import { SpotFormValuesType } from "../../types/SpotFormValuesType";

const LAST_STEP = 3;

function NewReviewPage() {
  let { id } = useParams();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<Partial<SpotFormValuesType>>({
    name: "",
    addressDetail: "",
    reviewContent: "",
    placeStatus: null,
    reviewDate: null,
    images: [],
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBackClick = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleSpotInfoChange = (data: any) => {
    if (data.reviewDate === null)
      data.reviewDate = new Date().toISOString().substring(0, 10);

    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));

    setStep((prev) => prev + 1);
  };

  const handleSpotStatusChange = (data: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      placeStatus: data,
    }));
  };

  // const handleSpotMoreChange = (data: any) => {
  //   console.log(formValues);
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     ...data,
  //   }));

  //   setStep((prev) => prev + 1);
  // };

  useEffect(() => {
    axios
      .get(`/api/v1/place/detail/${id}`, {
        headers: {
          Authorization: `${userInfo?.token}`,
        },
      })
      .then((res: any) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          name: res.data.name,
          addressDetail: res.data.addressDetail,
        }));
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.code === "PLA-001") {
          navigate("/404");
        }
      });
  }, []);

  useEffect(() => {
    if (formValues.placeStatus) {
      const json = {
        placeId: id,
        reviewDate: formValues.reviewDate,
        placeStatus: formValues.placeStatus,
        reviewContent: formValues.reviewContent,
      };

      const formData = new FormData();
      formData.append(
        "review",
        new Blob([JSON.stringify(json)], {
          type: "application/json",
        }),
      );

      for (const key in formValues) {
        if (key === "images" && Array.isArray(formValues[key])) {
          (formValues[key] as File[]).forEach((file) => {
            formData.append("image", file);
          });
        }
      }

      axios
        .post(`/api/v1/review`, formData, {
          headers: {
            Authorization: `${userInfo?.token}`,
            "Contest-Type": "multipart/form-data",
          },
        })
        .then((res: any) => {
          setStep((prev) => prev + 1);
        })
        .catch((error: any) => {
          console.log(error);
          if (error?.response?.data.code) {
            dispatch(open({ errorCode: error?.response?.data.code }));
          } else {
            dispatch(open({ message: "오류가 발생하였습니다." }));
          }
        });
    }
  }, [formValues.placeStatus]);

  return (
    <main className="h-dvh w-full">
      {step !== LAST_STEP && (
        <TopBar canClose={true} onBack={handleBackClick}>
          <div className="flex h-full items-center justify-center font-medium">
            후기 남기기
          </div>
        </TopBar>
      )}

      <div
        className={`${step !== LAST_STEP ? "h-[calc(100%-56px)] bg-white" : "h-full bg-gray-100"} w-full`}
      >
        {step === 1 && (
          <SpotInfo
            onNext={handleSpotInfoChange}
            name={formValues.name as string}
            address={formValues.addressDetail as string}
            initialFormValues={formValues}
            type="review"
          />
        )}
        {step === 2 && (
          <SpotStatus
            onNext={handleSpotStatusChange}
            name={formValues.name as string}
            address={formValues.addressDetail as string}
          />
        )}
        {/* {step === 3 && (
          <SpotMore
            onNext={handleSpotMoreChange}
            name={formValues.name}
            address={formValues.address}
          />
        )} */}
        {step === LAST_STEP && (
          <SpotDone
            onNext={() => navigate("/mypage/review")}
            name={formValues.name as string}
            address={formValues.addressDetail as string}
            type="review"
            placeStatus={formValues.placeStatus}
          />
        )}
      </div>
    </main>
  );
}

export default NewReviewPage;
