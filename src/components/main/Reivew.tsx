import { useState } from "react";
import { ReviewDetailList } from "./SpotView";
// import { ReactComponent as More} from "../../assets/image/icon/more.svg";

export const Reivew = ({
  item,
  index,
}: {
  item: ReviewDetailList;
  index: number;
}) => {
  const [click, setClick] = useState(false);

  return (
    <div
      className={`${index !== 0 ? "mt-5 border-t border-t-gray-100 pt-5" : ""}  tracking-custom`}
    >
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full bg-[#EBEBEB] w-7 h-7"></div>
          <p className="ml-[10px] font-semibold text-sm tracking-[-0.02em] text-gray-900">어댜4885</p>
        </div>
        <p className="text-gray-600 text-[13px] tracking-[-0.02em]">2024.04.18</p>
      </div> */}

      <p className="text-[13px] leading-none text-gray-300">
        {item.reviewDate}
      </p>

      <div
        className={`mt-2 grid w-2/3 grid-cols-2 gap-1 overflow-hidden rounded-lg`}
      >
        {item.reviewImage.map((e, i) => (
          <div
            key={i}
            className={`relative w-full after:block after:pb-[100%] after:content-['']`}
          >
            <img
              className={`absolute left-0 top-0 h-full w-full ${item.reviewImage.length > 1 ? "" : "rounded-lg"} object-cover object-center`}
              src={e}
              alt={`${item.nickName} 리뷰 이미지`}
            />
          </div>
        ))}
      </div>

      <p className={`mt-2 text-sm leading-[21px] text-gray-900`}>
        {item.reviewContent}
      </p>
    </div>
  );
};
