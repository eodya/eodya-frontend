import { Bookmark } from "@/types/mypage/BookmarkType";
import FlowerTag from "@common/tag/FlowerTag";
import BookMarkBtn from "@common/btn/BookMarkBtn";
import { GridLayout } from "./GridLayout";
import { Image } from "./Image";

export default function BookPage({
  item,
  index,
}: {
  item: Bookmark;
  index: number;
}) {
  return (
    <GridLayout index={index}>
      <div className="relative flex pr-6">
        <div className="relative w-[100px] flex-none">
          <div className="absolute left-0 top-0 z-10 ml-[10px] mt-[10px] leading-none">
            <FlowerTag placeState={item.placeStatus} />
          </div>
          <Image src={item.image} />
        </div>
        <dl className="ml-3 tracking-custom">
          <dt className="text-base font-bold leading-4 text-gray-950">
            {item.name}
          </dt>
          <dd className="mt-[6px] text-sm font-normal leading-[21px] text-gray-700">
            {item.addressDetail}
          </dd>
        </dl>
        <div className="absolute right-0 top-0">
          <BookMarkBtn placeId={item.placeId.toString()} status={false} />
        </div>
      </div>
    </GridLayout>
  );
}
