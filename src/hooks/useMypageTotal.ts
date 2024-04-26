import { useEffect, useState } from "react";
import axios from "axios";

import { useAppSelector } from "@store/hooks";
import { BookmarkType } from "@/types/mypage/BookmarkType";
import { ReviewType } from "@/types/mypage/ReviewType";

export const useMypageTotal = () => {
  // user
  const { userInfo } = useAppSelector((state) => state.auth);

  const [totalBookmarkCount, setTotalBookmarkCount] = useState(0);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);

  useEffect(() => {
    axios(`/api/v1/user/my/bookmarks?page=1&size=1`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
      .then(({ data }: { data: BookmarkType }) => {
        setTotalBookmarkCount(data.totalBookmarkCount);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_RESPONSE") {
          console.error("서버 통신 오류가 발생했습니다.");
        }
      });

    axios(`/api/v1/user/my/reviews?page=1&size=1`, {
      headers: {
        Authorization: userInfo?.token,
      },
    })
      .then(({ data }: { data: ReviewType }) => {
        setReviewTotalCount(data.reviewTotalCount);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_RESPONSE") {
          console.error("서버 통신 오류가 발생했습니다.");
        }
      });
  }, [userInfo]);

  return { totalBookmarkCount, reviewTotalCount };
};
