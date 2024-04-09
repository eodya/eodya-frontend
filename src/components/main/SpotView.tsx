import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { start } from "repl";

import TopBar from "../common/menu/TopBar";
import { Reivew } from "./Reivew";
import FlowerTag from "../common/tag/FlowerTag";
import ShareBtn from "../common/btn/Share/ShareBtn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { close } from "../../store/features/main/spotView/slice";

interface ReviewInterface {
  reviewTotalCount: number;
  reviewDetailList: ReviewDetailList[];
  hasNext: boolean;
}

export interface ReviewDetailList {
  userId: number;
  nickName: string;
  reviewDate: string;
  reviewImage: string[];
  placeStatus: string;
  reviewContent: string;
}

export const SpotView = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const viewShow = useAppSelector((state) => state.spotView);
  const { info } = useAppSelector((start) => start.InfoPlace);

  const [review, setReview] = useState<ReviewDetailList[]>([]);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (info.placeId !== 0) {
      axios(`/api/v1/review?placeId=${info.placeId}&page=1&size=10`, {
        headers: {
          Authorization: userInfo?.token,
          "Content-Type": "application/json",
        },
      })
        .then(({ data }: { data: ReviewInterface }) => {
          setReviewTotalCount(data.reviewTotalCount);

          setHasNext(data.hasNext);
          setReview((prev) => [...prev, ...data.reviewDetailList]);
        })
        .catch((error) => {
          setHasNext(false);
          console.error("Error fetching data:", error);
        });
    }
  }, [info]);

  return (
    <div
      className={`${!viewShow ? "translate-x-full" : ""} absolute left-0 top-0 z-50 w-full bg-gray-100 transition-transform duration-300`}
    >
      <div className="relative h-screen overflow-y-auto scrollbar-hide">
        <TopBar
          className="!sticky left-0 top-0 z-30 box-border w-full max-w-xl bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-transparent to-[82.14%]"
          prevClassName="fill-white"
          onBack={() => {
            dispatch(close());
          }}
        >
          <nav className="absolute right-4 top-1/2 flex -translate-y-1/2">
            {/* <button onClick={() => setBookmark(!bookmark)}>
            {bookmark ? (
              <BookmarkOutline className="fill-white" />
            ) : (
              <Bookmark className="fill-white" />
            )}
          </button> */}
            <ShareBtn className="ml-2 fill-white" />
          </nav>
        </TopBar>

        <div className="sticky top-0 -mt-14 w-full after:block after:pb-[100%]">
          <img
            className="absolute left-0 top-0 h-full w-full object-cover object-top"
            src={info.image}
            alt={`${info.name} 이미지`}
          />
        </div>

        <div className="relative z-10 bg-gray-100">
          <div className="flex items-center justify-between bg-white px-4 pb-5 pt-5">
            <dl>
              <dt className="flex items-start text-xl font-bold tracking-custom text-gray-950">
                {info.name}{" "}
                <div className="ml-2 inline-block leading-none">
                  <FlowerTag placeState="개화" />
                </div>
              </dt>
              <dd className="mt-2 text-sm font-normal leading-[21px]  tracking-custom">
                {info.addressDetail}
                {/* <span className="text-[13px] leading-none font-semibold text-info-300">820m</span> */}
              </dd>
            </dl>
            <Link
              to={`/new/review/${info.placeId}`}
              className={`flex h-8 w-[87px] items-center justify-center rounded-full bg-primary text-xs font-semibold text-white`}
            >
              후기 남기기
            </Link>
          </div>

          <div className="mt-2 bg-white px-4 py-6">
            <p className="mb-3 text-sm font-normal tracking-custom">
              후기{" "}
              <span className="text-primary">
                {review.length > 0 ? reviewTotalCount : 0}
              </span>
              개
            </p>
            {review.map((e, i) => (
              <Reivew item={e} index={i} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
