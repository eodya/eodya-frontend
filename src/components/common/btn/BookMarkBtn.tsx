import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppSelector } from "../../../store/hooks";
import { ReactComponent as BookmarkSVG } from "../../../assets/image/icon/bookmark.svg";
import { ReactComponent as BookmarkOutlineSVG } from "../../../assets/image/icon/bookmark_outline.svg";

// 북마크 버튼
export const BookMarkBtn = ({
  status,
  numberHide,
  placeId,
}: {
  status: boolean;
  numberHide?: boolean;
  placeId?: string;
}) => {
  const [bookState, setBookState] = useState(status);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const onClick = async (
    e: React.MouseEvent<HTMLDListElement, MouseEvent>,
    placeId: string,
  ) => {
    if (userInfo === null) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    } else {
      const data = {
        currentStatus: bookState,
      };

      await axios
        .patch(`/api/v1/bookmark/${placeId}`, data, {
          headers: {
            Authorization: `${userInfo?.token}`,
          },
        })
        .then((res: any) => {
          console.log(res);
          setBookState((prev) => !prev);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <dl
      className="cursor-pointer text-center"
      onClick={(e) => onClick(e, placeId || "")}
    >
      <div className="flex h-6 w-6 items-center justify-center">
        {bookState ? (
          <BookmarkSVG className={`fill-gray-300`} />
        ) : (
          <BookmarkOutlineSVG className={`fill-gray-300`} />
        )}
      </div>
      {!numberHide && (
        <p className="text-[13px] font-medium leading-[13px] tracking-custom text-gray-300">
          10
        </p>
      )}
    </dl>
  );
};
