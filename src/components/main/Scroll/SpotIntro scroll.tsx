// 스크롤 버전은 추후에 해야할것 같습니다.
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { change as yChange } from "../../../store/features/main/spotInfo/ySlice";
import { change as TourChange } from "../../../store/features/main/tourList/openSlice";
import { change as InfoChange } from "../../../store/features/main/spotInfo/InfoSlice";
import { LocationBtn } from "../Btn/LocationBtn";
import { TourList } from "../TourList";
import { MarkerInfo } from "../MarkerInfo";

export function SpotIntro({getPostion,getTourList} : {getPostion : any,getTourList : any}){
  const dispatch = useAppDispatch();

  // 하단 Info창 관련 state
  const spotInfoY = useAppSelector((state) => state.spotInfoY);
  const tourOpen = useAppSelector((state) => state.tourOpen);

  // marker 클릭 관련 state
  const spotInfoOpen = useAppSelector((state) => state.spotInfoOpen);

  const [naviHide, setNaviHide] = useState(false);
  const [move, setMove] = useState(false);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = () => {
    if (tourOpen) {
      setMove(true);
    }
  };
  
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = () => {
    if (tourOpen) {
      setMove(true);
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (tourOpen) {
      if (move) {
        if (spotInfoY <= 50) {
          dispatch(yChange(0));
        }

        if (spotInfoY > 80) {
          dispatch(yChange(100));
        } else if (spotInfoY > 50) {
          dispatch(yChange(85));
        }

        setMove(false);
      }
    }
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    if (tourOpen) {
      if (move) {
        if (spotInfoY <= 50) {
          dispatch(yChange(0));
        }

        if (spotInfoY > 80) {
          dispatch(yChange(100));
        } else if (spotInfoY > 50) {
          dispatch(yChange(85));
        }

        setMove(false);
      }
    }
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (tourOpen) {
      if (move) {
        const touch = e.touches[0];
        const { clientY } = touch;

        const y = (clientY / window.innerHeight) * 100;

        if (y < 18) {
          setMove(false);
          return;
        }

        dispatch(yChange(Math.ceil(y)));
      }
    }
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (tourOpen) {
      if (move) {
        const { clientY } = e;

        const y = (clientY / window.innerHeight) * 100;

        if (y < 18) {
          setMove(false);
          return;
        }

        dispatch(yChange(Math.ceil(y)));
      }
    }
  };

  useEffect(() => {
    if (tourOpen) {
      if (spotInfoY < 50) {
        setNaviHide(true);
      } else {
        setNaviHide(false);
      }
    }
  }, [spotInfoY, tourOpen]);

  useEffect(() => {
    if (tourOpen) {
      dispatch(yChange(85));
    }
  }, [tourOpen]);

  // 내 위치로 이동 및 이동후 근처의 명소 나오게
  const handleLocation = () => {
    getPostion();
    dispatch(yChange(100));
    setTimeout(() => {
      // 0.5초후에 근처의 명소 보이게
      dispatch(InfoChange(false));
    }, 200);
    setTimeout(() => {
      // 0.5초후에 근처의 명소 보이게
      dispatch(TourChange(true));
    }, 500);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ transform: `translateY(${spotInfoY}%)` }}
      className={`absolute bottom-[70px] z-50 w-full ${move ? "cursor-grab" : "transition-transform duration-300"}`}
    >
      <div
        className={`absolute bottom-full left-5 z-20 mb-5 transition-transform duration-500 ${naviHide ? "translate-y-[calc(100%+20px)]" : ""}`}
      >
        <LocationBtn onClick={handleLocation} />
      </div>

      {/* {!spotInfoOpen && tourOpen && <TourList />} */}
      {/* {!tourOpen && spotInfoOpen && <MarkerInfo />} */}

    </div>
  );
}
