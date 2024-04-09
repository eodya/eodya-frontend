import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Input from "../../components/common/input/Input";
import Navigation from "../../components/common/menu/Navigation";
import BlossomMarker from "../../components/common/marker/BlossomMarker";
import { MainBookMarkBtn } from "../../components/main/Btn/MainBookMarkBtn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useWatchLocation } from "../../hook/mapLocation/useWatchLocation";
import UserMarker from "../../components/common/marker/UserMarker";  
import { getMarker } from "../../store/features/main/marker/markerSlice";
import { hide } from "../../store/features/main/map/tourClick";
import { spotHide, spotShow } from "../../store/features/main/map/spotClick";
import { getPlace } from "../../store/features/main/spotInfo/InfoPlace";
import { useGetPostion } from "../../hook/mapLocation/useGetPostion";
import FlowerTag from "../../components/common/tag/FlowerTag";
import { Link } from "react-router-dom";
import { LocationBtn } from "../../components/main/Btn/LocationBtn";
import Tour from "../../components/main/Tour/Tour";
import { Info } from "../../components/main/Info/Info";
import { MainMarker } from "../../store/@types/main/marker/MarkerType";

export default function Main() {

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  
  // 북마크
  const [bookMark, setBookMark] = useState(false);

  // 등록된 모든 마커
  const { markers } = useAppSelector((state) => state.mainMarker);
  useEffect(() => {
    if (!userInfo) return;
    dispatch(getMarker(userInfo.token));
  }, [bookMark, userInfo]);

  // 지도 초기위치 설정, 포지션 가져오기
  const {state,setState,getPostion} = useGetPostion();

  // 마커 클릭
  const [clickMarker,setClickMarker] = useState(0);
  const markerHanlder = (e : MainMarker)=>{
    if (!userInfo) return;
    // info 데이터
    setClickMarker(e.placeId);
    setState({
      center : {
        lat: e.x, 
        lng: e.y
      },
      isPanto : true
    })
    dispatch(
      getPlace({ token: userInfo.token, placeId: e.placeId }),
    );
  }

  // 중심좌표 변경
  const onCenterChanged = (map : kakao.maps.Map)=>{
    const latlng = map.getCenter();
    setState({
      center: {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      },
      isPanto: false,
    });
  }

  // 현재위치 Watch
  const { location } = useWatchLocation();

  // 검색기능
  const [search,setSearch] = useState(false);
  const searchHandler = ()=>{
    setSearch(true);
  }

  return (
    <>
      <main className="relative h-screen overflow-hidden">

        {/* 검색버튼 */}
        <div className="absolute top-[30px] z-[51] w-full px-4">
          <Input 
            type="text" 
            placeholder="장소를 검색해 보세요"
            onClick={searchHandler}
          />
          {
            !search &&
            <MainBookMarkBtn 
              bookMark={bookMark} 
              setBookMark={setBookMark} 
            />
          }
        </div>

        {/* 맵 */}
        <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{ width: "100%", height: "100%" }}
          level={5}
          onDragStart={() => {

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
                center : {
                  lat: 37.581602151002315, 
                  lng: 126.69745010724675
                },
                isPanto : true
              });
              dispatch(
                getPlace({ token: userInfo.token, placeId: 1 }),
              );
            }}
            isClicked={clickMarker === 1}
          />

          {/* 유저 마커 */}
          {
            location && (
              <UserMarker
                clickable={false}
                position={{ lat: location.latitude, lng: location.longitude }}
              />
            )
          }

        </Map>

        {/* 마커 관련 명소 */}
        {/* <SpotIntro getPostion={getPostion}/> */}

        {/* 마커 클릭 관련 따로 만들기 */}
        
        <div className={`absolute h-[calc(100vh-70px)] bottom-[70px] z-[60] w-full transition-transform duration-300`}>
            <div className={`absolute bottom-full left-5 z-20 mb-5 transition-transform duration-500}`}>
              <LocationBtn onClick={getPostion} />
            </div>
            <Tour/>
        </div>
       

        {/* <div className={`absolute bottom-[70px] z-[60] w-full transition-transform duration-300`}>
          <div className={`absolute bottom-full left-5 z-20 mb-5 transition-transform duration-500}`}>
            <LocationBtn onClick={getPostion} />
          </div>
          <Info />
        </div> */}
        
        {/* 네비게이션바 */}
        <Navigation />
      </main>
      
      {
        search &&
        <div className="bg-white absolute top-0 left-0 w-full h-full z-50 pt-[95px] tracking-custom">
          <div className="h-full overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-5">
              <dl>
                <dt className="flex">
                  <h4 className="mr-2 font-bold">애기능 동산</h4>
                  <div className="flex-none">
                    <FlowerTag placeState="BLOOMING"/>
                  </div>
                </dt>
                <dd className="mt-2">서울 성북구 안암로 73-15</dd>
              </dl>
              <Link 
                className="w-[87px] h-8 rounded-full bg-primary flex items-center justify-center text-xs leading-none font-semibold text-white flex-none ml-3"
                to={'/new/review/0'}
              >후기 남기기</Link>
            </div>
          </div>
        </div>
      }

    </>
  );
}