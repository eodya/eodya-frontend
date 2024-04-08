import Navigation from "../../components/common/menu/Navigation";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import BookPage from "../../components/mypage/BookPage";
import axios from "axios";
import ComingModal from "../../components/mypage/Modal/ComingModal";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { useMypageTotal } from "../../hook/useMypageTotal";
import Spinner from "../../components/common/spinner/Spinner";
import Information from "../../components/mypage/Information/Information";


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

  // modal
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const { totalBookmarkCount, reviewTotalCount } = useMypageTotal();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

/*   const loadMore = ()=>{
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
  } */

  return (
    <>
      <main className="h-screen">
        <div className="flex h-[calc(100vh-70px)] flex-col">
          <div className="flex-none">

            <Information/>

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

          <div className="overflow-y-auto h-full scrollbar-hide">
{/*             <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={<div className="text-center" key={0}><Spinner/></div>}
              useWindow={false}
            >
              {bookmarks.map((bookmark, i) => (
                <BookPage item={bookmark} key={i} index={i} />
              ))}
            </InfiniteScroll> */}
          </div>
        </div>

        <Navigation />
      </main>
      <ComingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
