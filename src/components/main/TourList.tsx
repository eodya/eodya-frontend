import { useEffect, useState } from "react";
import { ReactComponent as More} from "../../assets/image/icon/more.svg";
import RankModal from "./Modal/RankModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TourListLayout } from "./TourListLayout";
import TopBar from "../common/menu/TopBar";
import { prevClick, upClick } from "../../store/features/main/map/tourClick";
import { open } from "../../store/features/main/spotView/slice";
import { getPlace } from "../../store/features/main/spotInfo/InfoPlace";
import { getTourPlace } from "../../store/features/main/tourList/tourPlace";

export interface RootInterface {
  placeDetails: PlaceDetail[];
  hasNext: boolean;
}

export interface PlaceDetail {
  placeId: number;
  name: string;
  addressDetail: string;
  placeImage: string;
  bookmarkStatus: boolean;
  placeStatus: string;
}

export function TourList(){

  const dispatch = useAppDispatch();  
  // 유저
  const {userInfo} = useAppSelector(state=>state.auth);
  const tourState = useAppSelector(state=>state.tourClick);
  // 모달창
  const [isOpen,setIsOpen] = useState(false);
  const onOpen :React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.stopPropagation();
    setIsOpen(true);
  }
  const onClose = ()=>{
    setIsOpen(false);
  }

  // 무한 스크롤
  const [page, setPage] = useState(1);

  const {data : {placeDetails : place, hasNext}} = useAppSelector((state)=>state.tourPlace);

  useEffect(()=>{

    if(!userInfo) return;

    dispatch(getTourPlace({token : userInfo.token, address : "서울", page}));

  },[page])

  const spotViewOpen=(e : PlaceDetail)=>{
    if(!userInfo) return;
    dispatch(getPlace({token : userInfo.token, placeId : e.placeId}))
    dispatch(open());
  }

  const handleUp = ()=>{
    if(!tourState.up) dispatch(upClick());
  }
  const handlePrev = ()=>{
    if(tourState.up) dispatch(prevClick());
  }

  return (
    <>
      <div 
        onClick={handleUp}
        className={`bg-white rounded-t-[10px] rounded-r-[10px] pt-7 font-pretendard h-screen flex flex-col z-30 relative select-none`}
      >
        {
          tourState.up && 
            <div className="flex-none"><TopBar onBack={handlePrev}></TopBar></div>
        }
        <div className="flex justify-between items-center px-4 flex-none">
          <h2 className="text-xl tracking-[-0.02em] font-semibold">근처의 명소</h2>
          <button 
            className="flex items-center text-[13px] tracking-[-0.02em] font-medium"
            onClick={onOpen}
          >
            랭킹순 <More className="fill-gray-800"/>
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-hide">
          {
            place.map((e,i)=><TourListLayout onClick={()=>spotViewOpen(e)} item={e} key={i} />)
          }
        </div>
      </div>

      <RankModal isOpen={isOpen} onClose={onClose}/>
      
    </>
  )
  
}