import { useEffect, useState } from "react";
import { ReactComponent as More } from "../../../assets/image/icon/more.svg";
import RankModal from "../Modal/RankModal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import TopBar from "../../common/menu/TopBar";
import { prevClick, upClick } from "../../../store/features/main/map/tourClick";
import { open } from "../../../store/features/main/spotView/slice";
import { getPlace } from "../../../store/features/main/spotInfo/InfoPlace";
import { getTourPlace } from "../../../store/features/main/tourList/tourPlace";
import { PlaceDetail } from "../../../store/@types/main/tourList/TourPlaceType";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import List from "./List";

interface TourType {
  placeDetails: PlaceDetail[];
  hasNext: boolean;
}

function Tour(){

  const navigate = useNavigate();

  // 유저
  const {userInfo} = useAppSelector(state=>state.auth);

  // 모달창
  const [isOpen,setIsOpen] = useState(false);
  const onOpen :React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.stopPropagation();
    setIsOpen(true);
  }
  const onClose = ()=>{
    setIsOpen(false);
  };

  const [tourState,setTourState] = useState<PlaceDetail[]>([]);

  useEffect(() => {
    if (!userInfo) return;

    axios.post(`/api/v1/place/search?page=1&size=10`,{address : "서울"},{
      headers : {
          Authorization : userInfo.token,
          "Content-Type" : "application/json",
      }
    })
    .then(({data} : {data : TourType})=>{
      setTourState(data.placeDetails);
    })
    .catch(e=>{
      console.error(e);
    })

  }, [userInfo]);


  /* const spotViewOpen = (e: PlaceDetail) => {
    if (!userInfo) return;
    dispatch(getPlace({ token: userInfo.token, placeId: e.placeId }));
    dispatch(open());
  };

  const handleUp = () => {
    if (!tourState.up) dispatch(upClick());
  };

  const handlePrev = () => {
    if (tourState.up) dispatch(prevClick());
  }; */

  const onClick=(e :PlaceDetail)=>{
    navigate(`/detail/${e.placeId}`);
  }

  return (
    <>
      <div
        className={`bg-white rounded-t-[10px] rounded-r-[10px] font-pretendard h-screen flex flex-col z-30 relative select-none`}
      >
        <div className="flex-none">
          <TopBar></TopBar>
        </div>

        <div className="flex flex-none items-center justify-between px-4">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">
            근처의 명소
          </h2>
          <button
            className="flex items-center text-[13px] font-medium tracking-[-0.02em]"
            onClick={onOpen}
          >
            랭킹순 <More className="fill-gray-800" />
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-hide">
          <div className="pb-4">
            {
              tourState.map((e,i)=><List onClick={()=>onClick(e)} item={e} key={i} />)
            }
            {
              <Link 
                className="w-full h-[46px] text-gray-500 text-sm leading-none flex items-center justify-center bg-gray-100 rounded-[10px] mt-4"
                to={`/`}
              >더보기</Link>
            }
          </div>
        </div>

      </div>

      <RankModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Tour;
