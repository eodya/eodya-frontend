import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import TopBar from "@common/menu/TopBar";
import ReivewList from "@components/review/List";
import Spinner from "@common/spinner/Spinner";

import { ReviewDetailList, ReviewInterface } from "@/types/review/ReviewType";
import { ReactComponent as Close } from "@assets/image/icon/close.svg";
import { useAppSelector } from "@store/hooks";

function List() {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [review, setReview] = useState<ReviewDetailList[]>([]);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const loadMore = (page: number) => {
    console.log(page, userInfo, placeId);
    if (placeId && userInfo) {
      axios(`/api/v1/review?placeId=${placeId}&page=${page}&size=10`, {
        headers: {
          Authorization: userInfo.token,
          "Content-Type": "application/json",
        },
      })
        .then(({ data }: { data: ReviewInterface }) => {
          console.log(data);
          setReviewTotalCount(data.reviewTotalCount);
          setReview(data.reviewDetailList);
          setHasNext(data.hasNext);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide">
      <InfiniteScroll
        pageStart={0}
        loadMore={(page) => loadMore(page)}
        hasMore={hasNext}
        useWindow={false}
        loader={<Spinner key={0} />}
      >
        <TopBar hide={true} className="!sticky top-0">
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => navigate(-1)}
          >
            <Close fill="#000" />
          </button>
        </TopBar>
        <div>
          <div className=" bg-white p-4">
            <p className="mb-3 text-sm font-normal tracking-custom">
              후기{" "}
              <span className="text-primary">
                {review.length > 0 ? reviewTotalCount : 0}
              </span>
              개
            </p>

            {review.map((e, i) => (
              <ReivewList item={e} index={i} key={i} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default List;
