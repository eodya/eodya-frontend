import { useState } from "react";
import axios from "axios";
import Navigation from "../../components/common/menu/Navigation";
import { useAppSelector } from "../../store/hooks";
import BookPage from "../../components/mypage/BookPage";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../components/common/spinner/Spinner";
import Information from "../../components/mypage/Information/Information";
import Tabmenu from "../../components/mypage/TabMenu";
import {
  Bookmark as BookmarkArryType,
  BookmarkType,
} from "../../types/mypage/BookmarkType";

function BookMark() {
  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const [bookmarks, setBookmarks] = useState<BookmarkArryType[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = () => {
    if(!userInfo) return;
    axios(`/api/v1/user/my/bookmarks?page=${page}&size=10`, {
      headers: {
        Authorization: userInfo.token,
      },
    })
      .then(({ data }: { data: BookmarkType }) => {
        setHasNext(data.hasNext);
        setBookmarks((prev) => [...prev, ...data.bookmarks]);
        setPage(page + 1);
      })
      .catch((error) => {
        setHasNext(false);
        if(error.code === "ERR_BAD_RESPONSE"){
          console.error('서버 통신 오류가 발생했습니다.');
        }
      });
  };

  return (
    <>
      <main className="h-screen">
        <div className="flex h-[calc(100vh-70px)] flex-col">
          <div className="flex-none">
            <Information />
            <Tabmenu />
          </div>

          <div className="h-full overflow-y-auto scrollbar-hide">
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={
                <div className="text-center" key={0}>
                  <Spinner />
                </div>
              }
              useWindow={false}
            >
              {
                bookmarks.length === 0 ? <p className="py-4 text-center bg-gray-200 rounded mt-2">북마크가 존재하지 않습니다.</p> :bookmarks.map((bookmark, i) => <BookPage item={bookmark} key={i} index={i} />)
              }
            </InfiniteScroll>
          </div>
        </div>

        <Navigation />
      </main>
    </>
  );
}

export default BookMark;
