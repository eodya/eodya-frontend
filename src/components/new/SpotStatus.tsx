import { useState } from "react";

import Btn from "@common/btn/Btn";

import state_not_selected from "@assets/image/icon/state_not_selected.svg";
import state_not_selected_full from "@assets/image/icon/state_not_selected_full.svg";
import state_blooming from "@assets/image/icon/state_blooming.svg";
import state_full_bloom from "@assets/image/icon/state_full_bloom.svg";
import state_next_year from "@assets/image/icon/state_next_year.svg";

interface SpotStatusProps {
  onNext: (data: any) => void;
  name: string;
  address: string;
}

function SpotStatus({ onNext, name, address }: SpotStatusProps) {
  const [status, setStatus] = useState<
    "BLOOMING" | "FULL_BLOOM" | "NEXT_YEAR" | null
  >(null);
  const isAllValid = status != null;

  const handleStatusChange = (
    value: "BLOOMING" | "FULL_BLOOM" | "NEXT_YEAR",
  ) => {
    setStatus(value);
  };

  return (
    <div className="flex h-full flex-col justify-between p-4">
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

        <div className="pt-[80px]">
          <div>
            <p className="mb-2 text-lg font-semibold">
              {name}의<br />꽃 상태는 어땠나요?
            </p>
            <span className="text-sm">
              이후 찾아올 분들을 위해
              <br />
              현재 꽃 상태를 알려 주세요!
            </span>
          </div>

          <div className="mt-[60px] flex justify-center gap-10">
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-4"
              onClick={() => handleStatusChange("BLOOMING")}
            >
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full">
                <img
                  src={
                    status === "BLOOMING" ? state_blooming : state_not_selected
                  }
                  alt="개화"
                />
              </div>
              <p
                className={`${status === "BLOOMING" && "font-bold text-primary"} text-sm text-gray-200`}
              >
                개화
              </p>
            </div>
            <div
              className="flex w-[85px] cursor-pointer flex-col items-center justify-center gap-4"
              onClick={() => handleStatusChange("FULL_BLOOM")}
            >
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full">
                <img
                  src={
                    status === "FULL_BLOOM"
                      ? state_full_bloom
                      : state_not_selected_full
                  }
                  alt="만개"
                />
              </div>
              <p
                className={`${status === "FULL_BLOOM" && "font-bold text-primary"} text-sm text-gray-200`}
              >
                만개
              </p>
            </div>
            <div
              className="flex w-[85px] cursor-pointer flex-col items-center justify-center gap-4"
              onClick={() => handleStatusChange("NEXT_YEAR")}
            >
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full">
                <img
                  src={
                    status === "NEXT_YEAR"
                      ? state_next_year
                      : state_not_selected
                  }
                  alt="내년에 만나요"
                />
              </div>
              <p
                className={`${status === "NEXT_YEAR" && "font-bold text-gray-950"} text-sm text-gray-200`}
              >
                내년에 만나요
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-3">
        <Btn
          className={`${isAllValid ? "!bg-gray-950" : "!bg-gray-100 !text-gray-500"}`}
          disabled={!isAllValid}
          onClick={() => onNext(status)}
        >
          다음
        </Btn>
      </div>
    </div>
  );
}

export default SpotStatus;
