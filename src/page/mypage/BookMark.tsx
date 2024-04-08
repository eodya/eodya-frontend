import Navigation from "../../components/common/menu/Navigation";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import BookPage from "../../components/mypage/BookPage";
import axios from "axios";
import ComingModal from "../../components/mypage/Modal/ComingModal";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../components/common/spinner/Spinner";
import Information from "../../components/mypage/Information/Information";
import Tabmenu from "../../components/mypage/TabMenu";
import { Bookmark as BookmarkArryType, BookmarkType } from "../../types/mypage/BookmarkType";

function BookMark() {

  // modal
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const [bookmarks, setBookmarks] = useState<BookmarkArryType[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = ()=>{
    axios(`/api/v1/user/my/bookmarks?page=${page}&size=10`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
    .then(({ data }: { data: BookmarkType }) => {
      setHasNext(data.hasNext);
      setBookmarks((prev) => [...prev, ...data.bookmarks]);
      setPage(page + 1);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  return (
    <>
      <main className="h-screen">
        <div className="flex h-[calc(100vh-70px)] flex-col">
          <div className="flex-none">
            <Information/>
            <Tabmenu/>
          </div>

          <div className="overflow-y-auto h-full scrollbar-hide">
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={<div className="text-center" key={0}><Spinner/></div>}
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
      <ComingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default BookMark
