import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

import TopBar from "../../components/common/menu/TopBar";
import Navigation from "../../components/common/menu/Navigation";
import { ReactComponent as SettingSVG } from "../../assets/image/icon/setting.svg";
import { ReactComponent as Vintage } from "../../assets/image/icon/vintage.svg";
import { useAppSelector } from "../../store/hooks";
import FormNickname from "../../components/mypage/FormNickname";
import ComingModal from "../../components/mypage/Modal/ComingModal";
import ReviewPage from "../../components/mypage/ReviewPage";
import { useMypageTotal } from "../../hook/useMypageTotal";
import Spinner from "../../components/common/spinner/Spinner";

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
  // modal
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const { totalBookmarkCount, reviewTotalCount } = useMypageTotal();

  const [reivews, setReivews] = useState<Review[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(() => {
    axios(`/api/v1/user/my/reviews?page=${page}&size=10`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
      .then(({ data }: { data: RootInterface }) => {
        if (data.hasNext) {
          setHasNext(data.hasNext);
          setReivews((prev) => [...prev, ...data.reviews]);
          setPage(page + 1);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <main className="h-screen">
        <div className="flex h-[calc(100vh-70px)] flex-col">
          <div className="flex-none">
            <TopBar hide={true}>
              <SettingSVG
                onClick={() => setIsOpen(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-800"
              />
            </TopBar>

            <div className="flex items-center px-6 leading-none tracking-custom">
              <div className="relative h-[68px] w-[68px] rounded-full bg-[#EBEBEB]">
                <Vintage className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4">
                <FormNickname />
              </div>
            </div>

            <div className="mt-6 flex border-b border-gray-300 text-center text-[13px] font-semibold text-gray-300">
              <Link
                to={"/mypage"}
                className={`" relative flex-1 py-4 after:absolute after:bottom-0 after:h-1 after:w-full  after:translate-y-1/2`}
              >
                북마크 {totalBookmarkCount}
              </Link>
              <Link
                to={"/mypage/review"}
                className={`relative flex-1 py-4 text-primary after:absolute after:bottom-0 after:block after:h-1 after:w-full after:translate-y-1/2 after:bg-primary`}
              >
                후기 {reviewTotalCount}
              </Link>
            </div>
          </div>

          <div className="h-full overflow-y-auto scrollbar-hide">
            <InfiniteScroll
              pageStart={1}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={
                <div className="text-center" key={0}>
                  로딩 중입니다...
                </div>
              }
              // loader={
              //   <div className="flex h-96 w-full items-center justify-center">
              //     <Spinner />
              //   </div>
              // }
              useWindow={false}
            >
              {reivews.map((reivew, i) => (
                <ReviewPage
                  item={reivew}
                  key={i}
                  index={i}
                  setIsOpen={setIsOpen}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>

        <Navigation />
      </main>
      <ComingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
