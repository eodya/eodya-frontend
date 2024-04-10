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
import { getPlace } from "../../store/features/main/spotInfo/InfoPlace";
import { useGetPostion } from "../../hook/mapLocation/useGetPostion";
import FlowerTag from "../../components/common/tag/FlowerTag";
import { Link } from "react-router-dom";
import { LocationBtn } from "../../components/main/Btn/LocationBtn";
import Tour from "../../components/main/Tour/Tour";
import { Info } from "../../components/main/Info/Info";
import { MainMarker } from "../../store/@types/main/marker/MarkerType";
import TopBar from "../../components/common/menu/TopBar";
import { changeAction } from "../../store/features/main/location/locationSlice";

export default function Main() {

  const dispatch = useAppDispatch();

  // 유저
  const { userInfo } = useAppSelector((state) => state.auth);
  
  // location 버튼
  const locationBtn = useAppSelector((state)=>state.location);
  const [tourOpen,setTourOpen] = useState(false);

  // 북마크
  const [bookMark, setBookMark] = useState(false);

  // 등록된 모든 마커
  const { markers } = useAppSelector((state) => state.mainMarker);
  useEffect(() => {
    if (!userInfo) return;
    dispatch(getMarker(userInfo.token));
  }, [bookMark, userInfo,dispatch]);

  // 지도 초기위치 설정, 포지션 가져오기
  const {state,setState,getPostion} = useGetPostion();
  const currentHandler = ()=>{
    dispatch(changeAction({
      nomarl : false,
      tour : true,
      info : false
    }));
    getPostion();
  }

  // 마커 클릭
  const [clickMarker,setClickMarker] = useState(0);
  const markerHanlder = (e : MainMarker)=>{
    if (!userInfo) return;
    // info 데이터
    setState({
      center : {
        lat: e.x, 
        lng: e.y
      },
      isPanto : true
    }); // 위치 이동
    setClickMarker(e.placeId); // 마커변동
    dispatch( // 장소 가져오기
      getPlace({ token: userInfo.token, placeId: e.placeId }),
    );
    dispatch(changeAction({ // 버튼 변경
      nomarl : false,
      tour : false,
      info : true
    }));
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
        {
          !tourOpen &&
          <div className={`absolute z-50 w-full px-4 ${search ? "top-0" : "top-[30px]"}`}>
            {
              search && <TopBar onBack={()=>setSearch(false)}> <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">스팟 검색</p> </TopBar>
            }
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
        }

        {/* 맵 */}
        <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{ width: "100%", height: "100%" }}
          level={5}
          onDragStart={() => {
            setClickMarker(0); // 마커 클릭 초기화
            dispatch(changeAction({
              nomarl : true,
              tour : false,
              info : false
            }));
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
              dispatch(changeAction({ // 버튼 변경
                nomarl : false,
                tour : false,
                info : true
              }));
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
        
        {
          locationBtn.nomarl &&
            <div className="absolute bottom-[70px] left-5 mb-5 z-20">
              <LocationBtn onClick={currentHandler} />
            </div>
        }

        {
          locationBtn.tour &&
            <div 
              className={`absolute ${tourOpen ? "translate-y-0" : "translate-y-3/4"} h-[calc(100vh-70px)] bottom-[70px] z-20 w-full transition-transform duration-300`}
              onClick={()=>setTourOpen(true)}
            >
              <div className={`absolute bottom-full left-5 z-20 mb-5 transition-transform duration-500}`}>
                {
                  !tourOpen && <LocationBtn onClick={currentHandler} />
                }
              </div>
              <Tour tourOpen={tourOpen} setTourOpen={setTourOpen}/>
            </div>
        }

        {
          locationBtn.info &&
            <div className={`absolute bottom-[70px] z-20 w-full transition-transform duration-300`}>
              <div className={`absolute bottom-full left-5 z-20 mb-5 transition-transform duration-500}`}>
                <LocationBtn onClick={currentHandler} />
              </div>
              <Info />
            </div>
        }
       
        {/* 네비게이션바 */}
        {
          !tourOpen && <Navigation />
        }
      </main>
      
      {
        search &&
        <div className="bg-white absolute top-0 left-0 w-full h-full z-40 pt-[102px] tracking-custom">
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