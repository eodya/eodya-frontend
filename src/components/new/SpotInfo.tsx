import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import exifr from "exifr";

import { useAppDispatch } from "../../store/hooks";
import { SpotFormValuesType } from "../../types/SpotFormValuesType";
import photo from "../../assets/image/icon/photo.svg";
import { ReactComponent as Close } from "../../assets/image/icon/close.svg";
import Btn from "../common/btn/Btn";
import { open } from "../../store/features/errorModal/modalSlice";

interface SpotInfoProps {
  onNext: (data: any) => void;
  name: string;
  address: string;
  type: "spot" | "review";
  initialFormValues: Partial<SpotFormValuesType>;
}

const MAX_LENGTH = 500;
const MAX_IMAGE_COUNT = 2;

function SpotInfo({
  onNext,
  name,
  address,
  type,
  initialFormValues,
}: SpotInfoProps) {
  const dispatch = useAppDispatch();

  const { register, watch, handleSubmit, setValue } = useForm();
  const contentInput = watch("contentInput", "");

  const [imagesInput, setImagesInput] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>();
  const [imageDates, setImageDates] = useState<string | null>(null);

  const isContentValid = contentInput.trim().length > 0;
  const isImageUploaded = imagesInput.length > 0;
  const isAllValid =
    type === "spot" ? isContentValid && isImageUploaded : isContentValid;

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    if (value.length <= MAX_LENGTH) {
      setValue("contentInput", value);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (imagesInput.length < MAX_IMAGE_COUNT) {
        const data = await exifr.parse(file);

        const dateTaken =
          data === undefined
            ? new Date().toISOString().substring(0, 10)
            : data.DateTimeOriginal
              ? data.DateTimeOriginal.toISOString().substring(0, 10)
              : new Date().toISOString().substring(0, 10);

        setImageDates(dateTaken);

        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target || !e.target.result) {
            console.error("FileReader에서 이미지를 로드하는 데 실패했습니다.");
            return;
          }

          const img = new Image();
          img.src = e.target.result as string;

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            if (!ctx) {
              console.error(
                "Canvas에서 2D 컨텍스트를 가져오는 데 실패했습니다.",
              );
              return;
            }
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
              if (!blob) return;
              const webpImage = new File([blob], "converted_image.webp", {
                type: "image/webp",
              });

              setImagesInput([...imagesInput, webpImage]);
            }, "image/webp");
          };
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error reading image date: ", error);
      dispatch(open({ message: "다른 이미지를 선택해 주세요." }));
    }
  };

  const handleImageRemove = (
    index: number,
    event: React.MouseEvent<SVGElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setImagesInput(imagesInput.filter((_, i) => i !== index));
    setSelectedImage(null);
  };

  const handleImageClick = (index: number) => {
    if (selectedImage === index) {
      setImagesInput(imagesInput.filter((_, i) => i !== index));
      setSelectedImage(null);
    } else {
      setSelectedImage(index);
    }
  };

  const onSubmit = (data: any) => {
    const submissionData = {
      reviewContent: data.contentInput,
      images: imagesInput,
      reviewDate: imageDates,
    };

    onNext(submissionData);
  };

  useEffect(() => {
    if (initialFormValues.reviewContent) {
      setValue("contentInput", initialFormValues.reviewContent);
    }
    if (initialFormValues.images) {
      setImagesInput(initialFormValues.images);
    }
    if (initialFormValues.reviewDate) {
      setImageDates(initialFormValues.reviewDate);
    }
  }, [initialFormValues, setValue]);

  return (
    <form
      className="flex h-full flex-col justify-between p-4"
      onSubmit={handleSubmit(onSubmit)}
      onClick={() => setSelectedImage(null)}
    >
      <div>
        <div className="h-[104px] border-b border-gray-200 pt-3">
          <div className="mb-1">
            <p className="font-bold">{name}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm">{address}</span>
            <span className="text-[13px] font-semibold text-primary">
              {imageDates && imageDates.replace(/-/g, ".") + " 방문"}
            </span>
          </div>
        </div>

        <div className="relative py-5">
          <textarea
            {...register("contentInput")}
            onChange={handleContentChange}
            className="h-[200px] w-full resize-none rounded-[10px] bg-[#f6f6f6] p-3 focus:outline-none"
            placeholder="장소를 방문하며 좋았던 점을 적어 주세요"
            maxLength={MAX_LENGTH}
          ></textarea>
          <div className="absolute bottom-8 right-3 text-[13px] text-gray-500">
            {contentInput.length}/{MAX_LENGTH}
          </div>
        </div>

        <div>
          {imagesInput.length === 0 && type === "spot" && (
            <p className="mb-2 text-[13px] text-error-200">
              찾아올 다른 분들을 위해 꼭 사진을 남겨 주세요!
            </p>
          )}

          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
            />

            <label
              htmlFor="image"
              className="flex h-[72px] w-[72px] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-gray-300 text-[13px] text-gray-300"
            >
              <img src={photo} alt="사진 추가" />
              <p>사진 {imagesInput.length}/2</p>
            </label>

            {imagesInput.map((image, index) => (
              <div
                key={index}
                className="group relative flex h-[72px] w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-lg text-[13px] text-gray-300"
                onClick={() => handleImageClick(index)}
              >
                {selectedImage === index && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                    <Close
                      className="fill-white"
                      onClick={(e) => handleImageRemove(index, e)}
                    />
                  </div>
                )}
                <img
                  src={URL.createObjectURL(image)}
                  className={`h-full w-full object-cover ${selectedImage === index && "blur-[2px]"}`}
                  alt="스팟 사진"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-3">
        <Btn
          className={`${isAllValid ? "!bg-gray-950" : "!bg-gray-100 !text-gray-500"}`}
          disabled={!isAllValid}
        >
          다음
        </Btn>
      </div>
    </form>
  );
}

export default SpotInfo;
