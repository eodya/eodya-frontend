import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

import TopBar from "../../components/common/menu/TopBar";
import Navigation from "../../components/common/menu/Navigation";
import { ReactComponent as SettingSVG } from "../../assets/image/icon/setting.svg";
import { ReactComponent as Vintage } from "../../assets/image/icon/vintage.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import FormNickname from "../../components/mypage/FormNickname";
import ReviewPage from "../../components/mypage/ReviewPage";
import Spinner from "../../components/common/spinner/Spinner";
import Information from "../../components/mypage/Information/Information";
import Tabmenu from "../../components/mypage/TabMenu";
import { Review as ReviewArrayType, ReviewType } from "../../types/mypage/ReviewType";

function Review() {

  // modal
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

import { open } from "../../store/features/errorModal/modalSlice";

export interface RootInterface {
  reviewTotalCount: number;
  reviews: Review[];
  hasNext: boolean;
}

export interface Review {
  placeId: number;
  reviewDate: string;
  image: string;
  name: string;
  reviewContent: string;
  placeStatus: string;
}

export default function BookMark() {
  const dispatch = useAppDispatch();
  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const [reivews, setReivews] = useState<ReviewArrayType[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(()=>{
    axios(`/api/v1/user/my/reviews?page=${page}&size=10`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
    .then(({ data }: { data: ReviewType }) => {
      setHasNext(data.hasNext);
      setReivews((prev) => [...prev, ...data.reviews]);
      setPage(page + 1);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  },[page])

  return (
    <>
      <main className="h-screen">
        <div className="flex h-[calc(100vh-70px)] flex-col">

          <div className="flex-none">
            <Information/>
            <Tabmenu/>
          </div>

          <div className="h-full overflow-y-auto scrollbar-hide">
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={<div className="text-center" key={0}><Spinner/></div>}
              useWindow={false}
            >
              {reivews.map((reivew, i) => (
                <ReviewPage item={reivew} key={i} index={i} />
              ))}
            </InfiniteScroll>
          </div>
        </div>

        <Navigation />
      </main>
    </>
  );
}

export default Review
