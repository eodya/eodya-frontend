import {ReactComponent as BookmarkSVG} from "../../../assets/image/icon/bookmark.svg";

// 메인 북마크 버튼
export const MainBookMarkBtn = ({bookMark,setBookMark} : {bookMark : boolean, setBookMark :React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  const onClick = ()=>{
    setBookMark(!bookMark);
  }

  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={`w-10 h-10 rounded-lg mt-3 flex items-center justify-center ${bookMark ? "bg-primary" : "bg-white"}`}
    >
      <BookmarkSVG className={`${bookMark ? "fill-white" : "fill-gray-300"}`}/>
    </button>
  )
  
}