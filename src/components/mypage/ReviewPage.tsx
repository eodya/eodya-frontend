import { GridLayout } from "./GridLayout";
import FlowerTag from "../common/tag/FlowerTag";
import { Image } from "./Image";
import { ReactComponent as HorizSVG } from "../../assets/image/icon/horiz.svg";
import { Review } from "../../types/mypage/ReviewType";
import { useAppDispatch } from "../../store/hooks";
import { open } from "../../store/features/errorModal/modalSlice";

export default function ReviewPage({
  item,
  index,
}: {
  item: Review;
  index: number;
}) {
  const dispatch = useAppDispatch();

  return (
    <GridLayout index={index}>
      <p className="text-[13px] leading-none tracking-custom text-gray-300 ">
        {item.reviewDate}
      </p>

      <div className="relative mt-2 flex">
        <div className="relative w-[80px] flex-none">
          <div className="absolute left-0 top-0 z-10 ml-[10px] mt-[10px] leading-none">
            <FlowerTag placeState={item.placeStatus} />
          </div>
          <Image src={item.image} />
        </div>
        <dl className="ml-3 pr-5 tracking-custom">
          <dt className="text-base font-bold leading-4 text-gray-950">
            {item.name}
          </dt>
          <dd className="mt-[6px] text-sm font-normal leading-[21px] text-gray-900">
            {item.reviewContent}
          </dd>
        </dl>
      </div>

      <div className="mt-2 flex justify-end text-[13px] leading-none tracking-custom text-gray-300">
        <button onClick={() => dispatch(open({ message: "준비 중입니다." }))}>
          <HorizSVG />
        </button>
      </div>
    </GridLayout>
  );
}
