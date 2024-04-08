import { useEffect, useState } from "react";
import { LocationBtn } from "./Btn/LocationBtn";
import { TourList } from "./TourList";
import { MarkerInfo } from "./MarkerInfo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { show } from "../../store/features/main/map/tourClick";
import { spotHide } from "../../store/features/main/map/spotClick";

export default function SpotIntro({getPostion} : {getPostion : any}){

  const tourState = useAppSelector(state=>state.tourClick);
  const spotState = useAppSelector(state=>state.spotClick);
  const dispatch = useAppDispatch();

  // 내 위치로 이동 및 이동후 근처의 명소 나오게
  const handleLocation = () => {
    getPostion();
    dispatch(show());
    dispatch(spotHide());
  };

  return (
    <div
      style={{
        transform : `translateY(${
          tourState.show ? tourState.up ? "0%" : "85%" : spotState.show ? "0%" : "100%"
        })`
      }}
      className={`absolute translate-y-full bottom-[70px] z-50 w-full transition-transform duration-300`}
    >
      <div
        className={`absolute bottom-full left-5 z-20 mb-5 transition-transform duration-500}`}
      >
        <LocationBtn onClick={handleLocation} />
      </div>

      {
        !spotState.show &&
        tourState.show && <TourList/>
      }

      {
        !tourState.show && 
        spotState.show &&<MarkerInfo />
      }

    </div>
  );
}
