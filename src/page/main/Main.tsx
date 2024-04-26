import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map } from "react-kakao-maps-sdk";

import Input from "@common/input/Input";
import Navigation from "@common/menu/Navigation";
import BlossomMarker from "@common/marker/BlossomMarker";
import UserMarker from "@common/marker/UserMarker";
import FlowerTag from "@common/tag/FlowerTag";
import TopBar from "@common/menu/TopBar";
import BookMarker from "@common/marker/BookMarker";
import { MainBookMarkBtn } from "@components/main/Btn/MainBookMarkBtn";
import { LocationBtn } from "@components/main/Btn/LocationBtn";
import Tour from "@components/main/Tour/Tour";
import { Info } from "@components/main/Info/Info";
import Search from "@components/main/Search/Search";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getMarker } from "@store/features/main/marker/markerSlice";
import { getPlace } from "@store/features/main/spotInfo/InfoPlace";
import { MainMarker } from "@store/@types/main/marker/MarkerType";
import { changeAction } from "@store/features/main/location/locationSlice";
import { searchAction } from "@store/features/main/search/searchSlice";
import { useWatchLocation } from "@hooks/mapLocation/useWatchLocation";
import { useGetPostion } from "@hooks/mapLocation/useGetPostion";

export default function Main() {
  const dispatch = useAppDispatch();

  // 유저
  const { userInfo } = useAppSelector((state) => state.auth);

  // location 버튼
  const locationBtn = useAppSelector((state) => state.location);
  const [tourOpen, setTourOpen] = useState(false);

  // 북마크
  const [bookMark, setBookMark] = useState(false);

  // 등록된 모든 마커
  const { markers } = useAppSelector((state) => state.mainMarker);
  useEffect(() => {
    if (!userInfo) return;
    dispatch(getMarker(userInfo.token));
  }, [bookMark, userInfo, dispatch]);

  // 지도 초기위치 설정, 포지션 가져오기
  const { state, setState, getPostion } = useGetPostion();
  const currentHandler = () => {
    dispatch(
      changeAction({
        nomarl: false,
        tour: true,
        info: false,
      }),
    );
    getPostion();
  };

  // 마커 클릭
  const [clickMarker, setClickMarker] = useState(0);
  const markerHanlder = (e: MainMarker) => {
    if (!userInfo) return;
    // info 데이터
    setState({
      center: {
        lat: e.x,
        lng: e.y,
      },
      isPanto: true,
    }); // 위치 이동
    setClickMarker(e.placeId); // 마커변동
    dispatch(
      // 장소 가져오기
      getPlace({ token: userInfo.token, placeId: e.placeId }),
    );
    dispatch(
      changeAction({
        // 버튼 변경
        nomarl: false,
        tour: false,
        info: true,
      }),
    );
  };

  // 중심좌표 변경
  const onCenterChanged = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setState({
      center: {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      },
      isPanto: false,
    });
  };

  // 현재위치 Watch
  const { location } = useWatchLocation();

  // 검색기능
  const data = [
    {
      placeId: 1,
      x: 13.0,
      y: 14.0,
      name: "애기능 동산",
      addressDetail: "서울 성북구 12",
      placeStatus: "BLOOMING",
    },
    {
      placeId: 1,
      x: 13.0,
      y: 14.0,
      name: "애기능 동산2",
      addressDetail: "인천 서구 12",
      placeStatus: "FULL_BLOOM",
    },
    {
      placeId: 1,
      x: 13.0,
      y: 14.0,
      name: "애기능 동산3",
      addressDetail: "인천 불구 12",
      placeStatus: "NEXT_YEAR",
    },
  ];
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState(false);
  const searchHandler = () => {
    setSearch(true);
  };
  const searchChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setSearchInput(e.target.value);
  };
  const searchSubmitHanlder: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(searchAction({ data, searchInput }));
  };

  return (
    <>
      <main className="relative h-screen overflow-hidden">
        {/* 검색버튼 */}
        {!tourOpen && (
          <div
            className={`absolute z-50 w-full ${search ? "top-0" : "top-[30px]"}`}
          >
            {search && (
              <TopBar onBack={() => setSearch(false)}>
                {" "}
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  검색
                </p>{" "}
              </TopBar>
            )}
            <div className="px-4">
              <form onSubmit={searchSubmitHanlder}>
                <Input
                  defaultValue={searchInput}
                  type="text"
                  placeholder="장소를 검색해 보세요"
                  onClick={searchHandler}
                  className={`${search ? "!bg-gray-100" : ""}`}
                  onChange={searchChangeHandler}
                />
              </form>
              {!search && (
                <MainBookMarkBtn
                  bookMark={bookMark}
                  setBookMark={setBookMark}
                />
              )}
            </div>
          </div>
        )}

        {/* 맵 */}
        <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{ width: "100%", height: "100%" }}
          level={5}
          onDragStart={() => {
            setClickMarker(0); // 마커 클릭 초기화
            dispatch(
              changeAction({
                nomarl: true,
                tour: false,
                info: false,
              }),
            );
          }}
          onCenterChanged={onCenterChanged}
        >
          {/* 마커 */}
          {markers.map((e, i) => (
            <BlossomMarker
              key={i + e.x + e.y}
              position={{ lat: e.x, lng: e.y }}
              onClick={() => markerHanlder(e)}
            />
          ))}

          {/* 테스트용 마커 */}
          <BlossomMarker
            position={{ lat: 37.581602151002315, lng: 126.69745010724675 }}
            onClick={() => {
              if (!userInfo) return;
              // info 데이터
              setClickMarker(1);
              setState({
                center: {
                  lat: 37.581602151002315,
                  lng: 126.69745010724675,
                },
                isPanto: true,
              });
              dispatch(getPlace({ token: userInfo.token, placeId: 1 }));
              dispatch(
                changeAction({
                  // 버튼 변경
                  nomarl: false,
                  tour: false,
                  info: true,
                }),
              );
            }}
            isClicked={clickMarker === 1}
          />

          <BookMarker
            position={{ lat: 37.591602151002315, lng: 126.69745010724675 }}
            onClick={() => {
              if (!userInfo) return;
              // info 데이터
              setClickMarker(1);
              setState({
                center: {
                  lat: 37.581602151002315,
                  lng: 126.69745010724675,
                },
                isPanto: true,
              });
              dispatch(getPlace({ token: userInfo.token, placeId: 1 }));
              dispatch(
                changeAction({
                  // 버튼 변경
                  nomarl: false,
                  tour: false,
                  info: true,
                }),
              );
            }}
          />

          {/* 유저 마커 */}
          {location && (
            <UserMarker
              clickable={false}
              position={{ lat: location.latitude, lng: location.longitude }}
            />
          )}
        </Map>

        {/* 마커 관련 명소 */}

        {locationBtn.nomarl && (
          <div className="absolute bottom-[70px] left-5 z-20 mb-5">
            <LocationBtn onClick={currentHandler} />
          </div>
        )}

        {locationBtn.tour && (
          <div
            className={`absolute ${tourOpen ? "translate-y-0" : "translate-y-3/4"} bottom-[70px] z-20 h-[calc(100vh-70px)] w-full transition-transform duration-300`}
          >
            <div
              className={`duration-500} absolute bottom-full left-5 z-20 mb-5 transition-transform`}
            >
              {!tourOpen && <LocationBtn onClick={currentHandler} />}
            </div>
            <Tour tourOpen={tourOpen} setTourOpen={setTourOpen} />
          </div>
        )}

        {locationBtn.info && (
          <div
            className={`absolute bottom-[70px] z-20 w-full transition-transform duration-300`}
          >
            <div
              className={`duration-500} absolute bottom-full left-5 z-20 mb-5 transition-transform`}
            >
              <LocationBtn onClick={currentHandler} />
            </div>
            <Info />
          </div>
        )}

        {/* 네비게이션바 */}
        {!tourOpen && <Navigation />}
      </main>

      {search && <Search />}
    </>
  );
}
