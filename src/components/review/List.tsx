import { ReviewDetailList } from "@/types/review/ReviewType";

function List({ item, index }: { item: ReviewDetailList; index: number }) {
  return (
    <div
      className={`${index !== 0 ? "mt-5 border-t border-t-gray-100 pt-5" : ""}  tracking-custom`}
    >
      <div
        className={`mt-2 grid w-[calc(100%-56px)] grid-cols-2 gap-1 overflow-hidden rounded-lg`}
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
      <p className="mt-[3px] text-[13px] leading-none text-gray-300">
        {item.reviewDate}
      </p>

      <p className={`mt-2 text-sm leading-[21px] text-gray-900`}>
        {item.reviewContent}
      </p>
    </div>
  );
}

export default List;
