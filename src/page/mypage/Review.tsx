import Navigation from "../../components/common/menu/Navigation";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import ReviewPage from "../../components/mypage/ReviewPage";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../components/common/spinner/Spinner";
import Information from "../../components/mypage/Information/Information";
import Tabmenu from "../../components/mypage/TabMenu";
import {
  Review as ReviewArrayType,
  ReviewType,
} from "../../types/mypage/ReviewType";

function Review() {
  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const [reivews, setReivews] = useState<ReviewArrayType[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(() => {
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
  }, [page]);

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

export default Review;
