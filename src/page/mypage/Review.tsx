import TopBar from "../../components/common/menu/TopBar";
import Navigation from "../../components/common/menu/Navigation";
import { ReactComponent as SettingSVG } from "../../assets/image/icon/setting.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as Vintage } from "../../assets/image/icon/vintage.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import FormNickname from "../../components/mypage/Information/FormNickname";
import axios from "axios";
import ComingModal from "../../components/mypage/Modal/ComingModal";
import { Link } from "react-router-dom";
import ReviewPage from "../../components/mypage/ReviewPage";
import InfiniteScroll from "react-infinite-scroller";
import { useMypageTotal } from "../../hook/useMypageTotal";
import Spinner from "../../components/common/spinner/Spinner";
import { logout } from "../../store/features/auth/authSlice";
import { ReactComponent as LogoutSVG} from "../../assets/image/icon/logout.svg"

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

  const loadMore = useCallback(()=>{
    axios(`/api/v1/user/my/reviews?page=${page}&size=10`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
    .then(({ data }: { data: RootInterface }) => {
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
            
            <div className="flex items-center justify-between px-6 font-pretendard leading-none tracking-custom mt-16">
              <div className="flex items-center">
                <div className="relative h-[68px] w-[68px] rounded-full bg-[#EBEBEB]">
                  <Vintage className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="ml-4">
                  <FormNickname />
                </div>
              </div>
              <button
                onClick={() => dispatch(logout())}
              >
                <LogoutSVG/>
              </button>
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

          <div className="overflow-y-auto h-full scrollbar-hide">
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={<div className="text-center" key={0}><Spinner/></div>}
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
