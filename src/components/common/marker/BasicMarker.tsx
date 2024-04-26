import { MapMarker, MapMarkerProps } from "react-kakao-maps-sdk";

import basic from "@assets/image/marker/basic.png";

/*  
  position 는 lat: number; lng: number; 를 꼭 넣어 주셔야 합니다.
  draggable? 는 true일 경우 드래그가 가능하며 false는 불가능합니다.
  clickable? 는 true일 경우 클릭 이벤트가 가능하며 false일 경우 불가능합니다.
  onClick 는 click 이벤트를 넣을 수 있습니다. 매개 변수로 marker를 받습니다.
  onDragStart 는 드래그 시작 시 이벤트를 의미합니다.
  onDragEnd 는 드래그 끝날 시 이벤트를 의미합니다.
*/
export default function BasicMarker({
  position,
  draggable,
  clickable,
  onClick,
  onDragStart,
  onDragEnd,
}: MapMarkerProps) {
  return (
    <MapMarker
      position={position}
      image={{
        src: basic,
        size: {
          width: SIZE.width,
          height: SIZE.height,
        },
        options: {
          offset: {
            x: SIZE.width,
            y: SIZE.height,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
      draggable={draggable}
      clickable={clickable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    ></MapMarker>
  );
}

const SIZE = {
  width: 34,
  height: 54,
};
