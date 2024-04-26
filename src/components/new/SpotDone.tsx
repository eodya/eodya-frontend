import Btn from "@common/btn/Btn";

interface SpotDoneProps {
  onNext: (data: any) => void;
  name: string;
  address: string;
  type: "spot" | "review";
  placeStatus?: "BLOOMING" | "FULL_BLOOM" | "NEXT_YEAR" | null;
}

function SpotDone({ onNext, name, address, type, placeStatus }: SpotDoneProps) {
  const state =
    placeStatus === "BLOOMING"
      ? "개화"
      : placeStatus === "FULL_BLOOM"
        ? "만개"
        : "내년에 만나요";

  return (
    <div
      className={`flex h-full w-full flex-col justify-between overflow-hidden bg-pattern bg-cover p-4`}
    >
      <div className="flex h-[calc(100%-72px)] w-full flex-col items-center justify-center ">
        <p className="text-xl font-semibold">
          {type === "spot" ? "새 스팟을 등록했어요!" : "후기를 등록했어요!"}
        </p>

        <div className="mt-5 box-border min-w-[240px] rounded-[10px] bg-white px-[30px] py-6">
          <div className="flex items-center font-bold">
            {name}
            {type === "review" && (
              <span className="ml-2 flex h-[18px] items-center justify-center rounded bg-primary px-1.5 text-[10px] font-semibold text-white">
                {state}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm">{address}</span>
            <span className="text-[13px] font-semibold text-primary"></span>
          </div>
        </div>
      </div>

      <div className="w-full py-3">
        <Btn onClick={onNext}>확인</Btn>
      </div>
    </div>
  );
}

export default SpotDone;
