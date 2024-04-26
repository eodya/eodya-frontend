import { ReactComponent as BookmarkSVG } from "@assets/image/icon/bookmark.svg";

// 메인 북마크 버튼
export const MainBookMarkBtn = ({
  bookMark,
  setBookMark,
}: {
  bookMark: boolean;
  setBookMark: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onClick = () => {
    setBookMark(!bookMark);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-3 flex h-10 w-10 items-center justify-center rounded-lg ${bookMark ? "bg-primary" : "bg-white"}`}
    >
      <BookmarkSVG className={`${bookMark ? "fill-white" : "fill-gray-300"}`} />
    </button>
  );
};
