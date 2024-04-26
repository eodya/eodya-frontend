import { useCallback, useEffect, useState } from "react";

import { getCurrentLocation } from "@utils/mapLocation/getCurrentLocation";

export const useGetPostion = () => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 0, lng: 0 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  // 포지션 가져오기
  const getPostion = useCallback(async () => {
    const result = await getCurrentLocation();
    if (!result) return;

    const { center, error } = result;

    if (error) {
      return alert(error.message);
    }

    if (!center) return;
    setState({ center, isPanto: true });
  }, []);

  useEffect(() => {
    getPostion();
  }, []);

  return { state, setState, getPostion };
};
