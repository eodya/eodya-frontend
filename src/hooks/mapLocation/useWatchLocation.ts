import { useState, useEffect } from "react";

const OPTION = {
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#options 옵션은 여기서 확인 가능합니다
  enableHighAccuracy: true, // true를 쓰면 정확도가 올라가고 // false을 쓰면 속도는 빠르지만 정확도는 낮아집니다.
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms) 가져오는데 1분까지 기다리겠다는 의미
  maximumAge: 1000 * 3600 * 24, // 24 hour 캐시값이 24시간
};

// 위치가 변동이 생기면 그 위치 값을 가져옵니다.
export const useWatchLocation = () => {
  // 지금 위치 정보 저장
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  // 에러 저장
  const [error, setError] = useState("");

  // 성공함수
  const hanldeSuccess: PositionCallback = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  //  실패함수
  const hanldeError: PositionErrorCallback = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("위치 정보를 가져올수 없습니다.");
      return;
    }

    const locationWatchId = geolocation.watchPosition(
      hanldeSuccess,
      hanldeError,
      OPTION,
    );

    return () => {
      geolocation.clearWatch(locationWatchId);
    };
  }, []);

  return { location, error };
};
