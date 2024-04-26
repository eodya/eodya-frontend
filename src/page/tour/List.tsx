import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import TopBar from "@common/menu/TopBar";
import Spinner from "@common/spinner/Spinner";
import TourList from "@components/main/Tour/List";
import RankModal from "@components/main/Modal/RankModal";

import { ReactComponent as Close } from "@assets/image/icon/close.svg";
import { ReactComponent as More } from "@assets/image/icon/more.svg";
import { useAppSelector } from "@store/hooks";
import { PlaceDetail } from "@store/@types/main/tourList/TourPlaceType";

interface TourType {
  placeDetails: PlaceDetail[];
  hasNext: boolean;
}

function List() {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetail[]>([]);
  const [hasNext, setHasNext] = useState(true);

  // 모달창
  const [isOpen, setIsOpen] = useState(false);
  const onOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const loadMore = (page: number) => {
    if (!userInfo) return;

    axios
      .post(
        `/api/v1/place/search?page=${page}&size=10`,
        { address: "서울" },
        {
          headers: {
            Authorization: userInfo.token,
            "Content-Type": "application/json",
          },
        },
      )
      .then(({ data }: { data: TourType }) => {
        setPlaceDetails(data.placeDetails);
        setHasNext(data.hasNext);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="h-screen overflow-y-auto scrollbar-hide">
        <InfiniteScroll
          pageStart={1}
          loadMore={(page) => loadMore(page)}
          hasMore={hasNext}
          useWindow={false}
          loader={<Spinner key={0} />}
        >
          <div className="!sticky top-0">
            <TopBar hide={true}>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => navigate(-1)}
              >
                <Close fill="#000" />
              </button>
            </TopBar>
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
          </div>

          <div>
            <div className=" bg-white p-4">
              {placeDetails.map((e, i) => (
                <TourList item={e} key={i} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
      <RankModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default List;
