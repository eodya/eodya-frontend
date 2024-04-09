import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import FlowerTag from "../../common/tag/FlowerTag";
import { BookMarkBtn } from "../../common/btn/BookMarkBtn";

// 클릭 info
export function Info(){

    const navigate = useNavigate();
    const {info} = useAppSelector(state=>state.InfoPlace);
      
    const onClick=()=>{
      navigate(`/detail/${info.placeId}`);
    }
  
    return(
      <div className="pt-4 bg-white rounded-t-[10px] rounded-r-[10px]">
        
        <div className="bg-white p-4" onClick={onClick}>

          <div className="relative">
            <div className="absolute left-[10px] top-[10px] z-20 leading-none">
              <FlowerTag placeState={info.placeStatus} />
            </div>
            <div
              className={`grid grid-cols-${info.image.length} gap-1 overflow-hidden rounded-lg`}
            >
              <div className="relative h-40 w-full">
                <img
                  className="absolute left-0 top-0 h-full w-full object-cover object-center"
                  src={info.image}
                  alt={`${info.name} 이미지`}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-start justify-between">
            <div className="leading-none tracking-custom">
              <dl>
                <dt className="text-base font-bold text-gray-950">{info.name}</dt>
                <dd className="mt-1 text-sm font-normal leading-[21px]">
                  {info.addressDetail}
                </dd>
              </dl>
              {/* <p className="text-[13px] mt-1 leading-[13px] text-info-300 font-semibold">820m</p> */}
            </div>
            <BookMarkBtn 
              placeId={info.placeId.toString()} 
              status={info.bookmarkStatus} 
            />
          </div>
        </div>

      </div>
    )
    
}