import { useCallback, useEffect, useState } from "react";

import { getCurrentLocation } from "@utils/mapLocation/getCurrentLocation";

export function useGetCity() {
  const [city, setCity] = useState("");
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const getPostion = useCallback(async () => {
    const result = await getCurrentLocation();
    if (!result) return;

    const { center, error } = result;

    if (error) {
      return alert(error.message);
    }

    if (!center) return;

    setCenter(center);
  }, []);

  useEffect(() => {
    const center = getPostion();

    const geocoder = new kakao.maps.services.Geocoder();

    /* geocoder.coord2Address(center.lng,center.lat, (result,status)=>{
            if(status === kakao.maps.services.Status.OK){
                
                console.log(result);
                
            }else{

            }

        }) */
  }, []);
}
