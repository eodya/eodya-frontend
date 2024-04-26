import { Link } from "react-router-dom";
import FlowerTag from "@common/tag/FlowerTag";
import { useAppSelector } from "@store/hooks";

function Search() {
  const searchData = useAppSelector((state) => state.search);

  return (
    <div className="absolute left-0 top-0 z-40 h-full w-full bg-white pt-[102px] tracking-custom">
      <div className="h-full overflow-y-auto">
        {searchData.map((e, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-5">
            <dl>
              <dt className="flex">
                <h4 className="mr-2 font-bold">{e.name}</h4>
                <div className="flex-none">
                  <FlowerTag placeState={e.placeStatus} />
                </div>
              </dt>
              <dd className="mt-2">{e.addressDetail}</dd>
            </dl>
            <Link
              className="ml-3 flex h-8 w-[87px] flex-none items-center justify-center rounded-full bg-primary text-xs font-semibold leading-none text-white"
              to={`/new/review/${e.placeId}`}
            >
              후기 남기기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
