import { useState } from "react";
import { ReviewDetailList } from "../../types/review/ReviewType";
// import { ReactComponent as More} from "../../assets/image/icon/more.svg";

export const Reivew = ({item,index} : {item : ReviewDetailList,index : number})=>{
    const [click,setClick] = useState(false);
  
  return (
    <div className={`${index !== 0 ? "mt-5 pt-5 border-t border-t-gray-100" : ""}  tracking-custom font-pretendard`}>

      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full bg-[#EBEBEB] w-7 h-7"></div>
          <p className="ml-[10px] font-semibold text-sm tracking-[-0.02em] text-gray-900">어댜4885</p>
        </div>
        <p className="text-gray-600 text-[13px] tracking-[-0.02em]">2024.04.18</p>
      </div> */}

      <p className="text-[13px] leading-none text-gray-300">{item.reviewDate}</p>

      <div className={`grid grid-cols-2 gap-1 rounded-lg overflow-hidden mt-2 w-2/3`}>
        {
          item.reviewImage.map((e,i)=>(
            <div key={i} className={`w-full after:content-[''] after:pb-[100%] after:block relative`}>
              <img className={`absolute top-0 left-0 w-full h-full ${item.reviewImage.length > 1 ? "" : "rounded-lg" } object-cover object-center`} src={e} alt={`${item.nickName} 리뷰 이미지`} />
            </div>
          ))
        }
      </div>

      <p className={`mt-2 text-sm text-gray-900 leading-[21px]`}>
        {item.reviewContent}
      </p>

    </div>
  )

}
  