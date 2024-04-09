// 스크롤 버전용
import { useEffect, useState } from "react";
import { ReactComponent as More } from "../../assets/image/icon/more.svg";
import RankModal from "./Modal/RankModal";
import { useAppSelector } from "../../store/hooks";
import { TourListLayout } from "./TourListLayout";
import { change as TourChange } from "../../store/features/main/tourList/openSlice";

export function TourList() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useAppSelector((state) => state.tourPlace);

  useEffect(() => {
    if (data.placeDetails.length > 0) {
      TourChange(true);
    } else {
      TourChange(false);
    }
  }, [data]);

  // 모달창
  const onOpen = () => {
    setIsOpen(true);
  };
  // 모달창 닫기
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`relative z-30 flex h-[calc(100vh-70px)] select-none flex-col rounded-r-[10px] rounded-t-[10px] bg-white pt-7`}
      >
        <div className="flex flex-none items-center justify-between px-4">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">
            근처의 명소
          </h2>
          <button
            className="flex items-center text-[13px] font-medium tracking-[-0.02em]"
            onClick={onOpen}
          >
            랭킹순 <More className="fill-gray-800" />
          </button>
        </div>

        <div className="h-full overflow-y-auto scrollbar-hide">
          {
            // data.placeDetails.map((e,i)=><TourListLayout item={e} key={i} />)
            data.placeDetails.map((e, i) => (
              <div className="h-9 bg-black"></div>
            ))
          }
        </div>
      </div>

      <RankModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
