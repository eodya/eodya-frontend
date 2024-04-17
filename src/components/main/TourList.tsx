import { useEffect, useState } from "react";
import { ReactComponent as More } from "../../assets/image/icon/more.svg";
import RankModal from "./Modal/RankModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TourListLayout } from "./TourListLayout";
import TopBar from "../common/menu/TopBar";
import { prevClick, upClick } from "../../store/features/main/map/tourClick";
import { open } from "../../store/features/main/spotView/slice";
import { getPlace } from "../../store/features/main/spotInfo/InfoPlace";
import { getTourPlace } from "../../store/features/main/tourList/tourPlace";

export interface RootInterface {
  placeDetails: PlaceDetail[];
  hasNext: boolean;
}

export interface PlaceDetail {
  placeId: number;
  name: string;
  addressDetail: string;
  placeImage: string;
  bookmarkStatus: boolean;
  placeStatus: string;
}

export function TourList() {
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);
  const tourState = useAppSelector((state) => state.tourClick);

  const [isOpen, setIsOpen] = useState(false);
  // 모달창
  const onOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  // 모달창 닫기
  const onClose = () => {
    setIsOpen(false);
  };

  // 무한 스크롤
  const [page, setPage] = useState(1);

  const {
    data: { placeDetails: place, hasNext },
  } = useAppSelector((state) => state.tourPlace);

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getTourPlace({ token: userInfo.token, address: "서울", page }));
  }, [page]);

  const spotViewOpen = (e: PlaceDetail) => {
    if (!userInfo) return;
    dispatch(getPlace({ token: userInfo.token, placeId: e.placeId }));
    dispatch(open());
  };

  const handleUp = () => {
    if (!tourState.up) dispatch(upClick());
  };
  const handlePrev = () => {
    if (tourState.up) dispatch(prevClick());
  };

  return (
    <>
      <div
        onClick={handleUp}
        className={`relative z-30 flex h-[calc(100vh-70px)] select-none flex-col rounded-r-[10px] rounded-t-[10px] bg-white pt-7`}
      >
        {tourState.up && (
          <div className="flex-none">
            <TopBar onBack={handlePrev}></TopBar>
          </div>
        )}
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

        <div className="min-h-[800px] overflow-y-auto scrollbar-hide">
          {place.map((e, i) => (
            <TourListLayout onClick={() => spotViewOpen(e)} item={e} key={i} />
          ))}
        </div>
      </div>

      <RankModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
