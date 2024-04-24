/*  
  position 는 lat: number; lng: number; 를 꼭 넣어주셔야합니다.
  draggable? 는 true 일경우 드래그가 가능하며 false는 불가능합니다.
  clickable? 는 true 일경우 클릭 이벤트가 가능하며 false일 경우 불가능합니다.
  onClick 는 click이벤트를 넣을수있습니다. 매개변수로 marker 를 받습니다.
  onDragStart 는 드래그 시작시 이벤르를 의미합니다.
  onDragEnd 는 드래그 끝날시 이벤르를 의미합니다.
*/

import {MapMarker, MapMarkerProps} from "react-kakao-maps-sdk"
import bookmark from "../../../assets/image/marker/bookmark.png";

const SIZE = {
    width : 24,
    height : 28
}

export default function BookMarker({position,draggable,clickable,onClick,onDragStart,onDragEnd} : MapMarkerProps) {
  return (
    <MapMarker
      position={position}
      image={{
        src : bookmark,
        size : {
          width : SIZE.width,
          height : SIZE.height
        },
        options: {
          offset: {
            x: SIZE.width,
            y: SIZE.height,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        }
      }}
      draggable={draggable}
      clickable={clickable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
    </MapMarker>
  )
}
