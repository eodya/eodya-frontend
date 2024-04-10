import { useEffect, useState } from "react";
import { ReactComponent as More } from "../../../assets/image/icon/more.svg";
import RankModal from "../Modal/RankModal";
import { useAppSelector } from "../../../store/hooks";
import TopBar from "../../common/menu/TopBar";
import { PlaceDetail } from "../../../store/@types/main/tourList/TourPlaceType";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import List from "./List";

interface TourType {
  placeDetails: PlaceDetail[];
  hasNext: boolean;
}

function Tour({tourOpen,setTourOpen} : {tourOpen : boolean,setTourOpen :React.Dispatch<React.SetStateAction<boolean>>}){

  const navigate = useNavigate();

  // 유저
  const {userInfo} = useAppSelector(state=>state.auth);

  // 모달창
  const [isOpen,setIsOpen] = useState(false);
  const onOpen :React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    if(tourOpen){
      e.stopPropagation();
      setIsOpen(true);
    }
  }
  const onClose = ()=>{
    setIsOpen(false);
  };

  const [placeDetails,setPlaceDetails] = useState<PlaceDetail[]>([]);
  const [hasNext,setHasNext] = useState(false);

  useEffect(() => {
    if (!userInfo) return;

    axios.post(`/api/v1/place/search?page=1&size=10`,{address : "서울"},{
      headers : {
          Authorization : userInfo.token,
          "Content-Type" : "application/json",
      }
    })
    .then(({data} : {data : TourType})=>{
      setPlaceDetails(data.placeDetails);
      setHasNext(data.hasNext);
    })
    .catch(e=>{
      console.error(e);
    })

  }, [userInfo]);

  const tourClickHandler=(e :PlaceDetail)=>{
    navigate(`/detail/${e.placeId}`);
  }

  const tourClose :React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.stopPropagation();
    setTourOpen(false);
  }

  return (
    <>
      <div
        className={`bg-white rounded-t-[10px] rounded-r-[10px] font-pretendard h-screen flex flex-col z-30 relative select-none pt-5`}
      >
        {
          tourOpen &&
            <div className="flex-none">
              <TopBar onBack={tourClose}/>
            </div>
        }

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
              placeDetails.map((e,i)=><List onClick={()=>tourClickHandler(e)} item={e} key={i} />)
            }
            {
              hasNext &&
                <Link 
                  className="w-full h-[46px] text-gray-500 text-sm leading-none flex items-center justify-center bg-gray-100 rounded-[10px] mt-4"
                  to={`/tour`}
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
