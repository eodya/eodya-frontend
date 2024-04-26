import { useForm } from "react-hook-form";

import Btn from "@common/btn/Btn";
import arrow from "@assets/image/icon/arrow_drop_down.svg";

interface SpotMoreProps {
  onNext: (data: any) => void;
  name: string;
  address: string;
}

function SpotMore({ onNext, name, address }: SpotMoreProps) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const submissionData = { ...data };

    onNext(submissionData);
  };

  return (
    <form
      className="flex h-full flex-col justify-between p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="h-[104px] border-b border-gray-200 pt-3">
          <div className="mb-1">
            <p className="font-bold">{name}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm">{address}</span>
            <span className="text-[13px] font-semibold text-primary"></span>
          </div>
        </div>

        <div>
          <div className="pt-5">
            <p className="mb-2.5 font-bold">인근 놀거리 추천</p>
            <div className="flex h-[46px] w-full cursor-pointer items-center justify-between rounded-[10px] bg-gray-100 px-5">
              <input
                {...register("vicinity")}
                className="h-full w-[calc(100%-24px)] cursor-pointer bg-transparent outline-none"
                placeholder="카카오맵에서 선택하기"
                readOnly
              />
              <div className="flex h-6 w-6 items-center justify-center">
                <img src={arrow} alt="arrow" />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <p className="mb-2.5 font-bold">외부 후기 연동</p>
            <div className="h-[46px] w-full rounded-[10px] bg-gray-100 px-5">
              <input
                {...register("externalReview")}
                className="h-full w-full bg-transparent outline-none"
                placeholder="SNS 링크를 입력하세요"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-3">
        <Btn>다음</Btn>
      </div>
    </form>
  );
}

export default SpotMore;
