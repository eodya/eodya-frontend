// 현재 위치 가져오는 함수
export const getCurrentLocation = async () => {
  const { geolocation } = navigator;

  if (!geolocation) {
    // 위치를 동의 하지 않았을경우 에러가 뜹니다.
    return {
      center: {
        lat: 0,
        lng: 0,
      },
      error: {
        message: "위치정보를 가져올수 없습니다.",
      },
    };
  }

  try {
    // Promise을 넣어줘서 resolve 성공 reject 실패 기준을 나눔
    const position: GeolocationCoordinates = await new Promise(
      (resolve, reject) => {
        // 성공했을 경우 success 핸들링
        const handleSuccess: PositionCallback = (pos) => {
          resolve(pos.coords); // 성공했을때 위도 경도 보내주기
        };

        // 실패했을 경우 error 핸들링
        const handleError: PositionErrorCallback = (error) => {
          reject(error); // 실패했을때 error 보내주기
        };

        geolocation.getCurrentPosition(handleSuccess, handleError, OPTION); // position 가져오는 함수
      },
    );

    const { latitude, longitude } = position;

    return {
      center: {
        lat: latitude,
        lng: longitude,
      },
      error: null,
    };
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      const { code, message } = error;
      return {
        center: {
          lat: 0,
          lng: 0,
        },
        error: {
          code,
          message,
        },
      };
    }
  }
};

const OPTION = {
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#options 옵션은 여기서 확인 가능합니다
  enableHighAccuracy: true, // true를 쓰면 정확도가 올라가고 // false을 쓰면 속도는 빠르지만 정확도는 낮아집니다.
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms) 가져오는데 1분까지 기다리겠다는 의미
  maximumAge: 1000 * 3600 * 24, // 24 hour 캐시값이 24시간
};
