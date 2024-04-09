import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

import TopBar from "../../components/common/menu/TopBar";
import Navigation from "../../components/common/menu/Navigation";
import { ReactComponent as SettingSVG } from "../../assets/image/icon/setting.svg";
import { ReactComponent as Vintage } from "../../assets/image/icon/vintage.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import FormNickname from "../../components/mypage/FormNickname";
import BookPage from "../../components/mypage/BookPage";
import { useMypageTotal } from "../../hook/useMypageTotal";
import Spinner from "../../components/common/spinner/Spinner";
import { open } from "../../store/features/errorModal/modalSlice";

export interface RootInterface {
  totalBookmarkCount: number;
  bookmarks: Bookmark[];
  hasNext: boolean;
}

export interface Bookmark {
  placeId: number;
  image: string;
  name: string;
  addressDetail: string;
  bookmarkCount: number;
  bookmarkStatus: boolean;
  placeStatus: string;
}

export default function BookMark() {
  const dispatch = useAppDispatch();
  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const { totalBookmarkCount, reviewTotalCount } = useMypageTotal();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(() => {
    axios(`/api/v1/user/my/bookmarks?page=${page}&size=10`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
      .then(({ data }: { data: RootInterface }) => {
        if (data.hasNext) {
          setHasNext(data.hasNext);
          setBookmarks((prev) => [...prev, ...data.bookmarks]);
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
                onClick={() => dispatch(open({ message: "준비 중입니다." }))}
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
                className={`" relative flex-1 py-4 text-primary after:absolute after:bottom-0 after:block after:h-1 after:w-full after:translate-y-1/2 after:bg-primary`}
              >
                북마크 {totalBookmarkCount}
              </Link>
              <Link
                to={"/mypage/review"}
                className={`after:bg-primar relative flex-1 py-4 after:absolute after:bottom-0 after:h-1 after:w-full after:translate-y-1/2`}
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
              {bookmarks.map((bookmark, i) => (
                <BookPage item={bookmark} key={i} index={i} />
              ))}
            </InfiniteScroll>
          </div>
        </div>

        <Navigation />
      </main>
    </>
  );
}
