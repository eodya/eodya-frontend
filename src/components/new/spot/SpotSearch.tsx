import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import Input from "../../common/input/Input";
import Spinner from "../../common/spinner/Spinner";
import TopBar from "../../common/menu/TopBar";
import SearchItem from "../SearchItem";

interface SpotSearchProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<any>>;
  setValues: Dispatch<SetStateAction<any>>;
}

function SpotSearch({ isOpen, setIsOpen, setValues }: SpotSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState<number>(0);
  const [searchResults, setSearchResults] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleSelectSpot = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const liElement = target.closest("li") as HTMLElement;

    const lat = liElement.dataset.lat;
    const lng = liElement.dataset.lng;
    const name = liElement.dataset.name;
    const address = liElement.dataset.address;

    setValues((prevValues: any) => ({
      ...prevValues,
      name,
      addressDetail: address,
      y: lat,
      x: lng,
      isPanto: true,
    }));

    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setSearchResults([]);
    setIsInitialSearch(false);
    fetchSearchResults(page);
    setIsLoading(true);
  };

  const fetchSearchResults = (page: number) => {
    if (!hasMore) return; // 다음 페이지가 없다면 요청을 중단

    const ps = new kakao.maps.services.Places();
    const options = { page };

    ps.keywordSearch(
      inputValue.trim(),
      (data, status, _pagination) => {
        // console.log(_pagination);
        if (status === kakao.maps.services.Status.OK) {
          setTimeout(() => {
            // console.log(page, options, data);
            setSearchResults((prevResults) => [...prevResults, ...data]);
            setIsLoading(false);
            setHasMore(_pagination.hasNextPage);
          }, 500);
        } else {
          setIsLoading(false);
        }
      },
      options,
    );
  };

  useEffect(() => {
    if (inputValue.trim() && page >= 1 && !isInitialSearch) {
      fetchSearchResults(page);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div
      className={`absolute top-0 z-20 h-full w-full bg-white ${isOpen ? "left-0" : "left-full"}`}
    >
      <TopBar onBack={() => setIsOpen(false)}>
        <div className="flex h-full items-center justify-center font-medium">
          스팟 등록
        </div>
      </TopBar>

      <form onSubmit={handleSearchSubmit} className="p-4">
        <Input
          className="!bg-gray-100"
          placeholder="장소를 검색해 보세요."
          onChange={handleInputChange}
          defaultValue={inputValue.trim()}
        />
      </form>

      <ul className="h-[calc(100%-134px)] overflow-y-auto px-4 scrollbar-hide">
        {isInitialSearch === true ? (
          <div className="mt-10 text-center text-sm text-gray-500">
            {/* 검색해 보세요. */}
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index}>
              <SearchItem data={result} handleSelectSpot={handleSelectSpot} />
            </div>
          ))
        ) : !isLoading ? (
          <li className="py-6 text-center text-sm text-gray-500">
            검색 결과가 없습니다.
          </li>
        ) : null}

        {isLoading && page >= 1 && (
          <div className="mt-5 flex h-[600px] w-full items-center justify-center">
            <Spinner />
          </div>
        )}

        <div
          ref={loader}
          className="flex h-[50px] w-full items-center justify-center"
        >
          &nbsp;
        </div>
      </ul>
    </div>
  );
}

export default SpotSearch;
