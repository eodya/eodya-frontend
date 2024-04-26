import { MapMarker, MapMarkerProps } from "react-kakao-maps-sdk";

import blossom from "@assets/image/marker/blossom.png";
import blossomClick from "@assets/image/marker/blossom_click.png";

interface MarkerProps extends MapMarkerProps {
  isClicked?: boolean;
}

/*  
  position 는 lat: number; lng: number; 를 꼭 넣어 주셔야 합니다.
  draggable? 는 true일 경우 드래그가 가능하며 false는 불가능합니다.
  clickable? 는 true일 경우 클릭 이벤트가 가능하며 false일 경우 불가능합니다.
  onClick 는 click 이벤트를 넣을 수 있습니다. 매개 변수로 marker를 받습니다.
  onDragStart 는 드래그 시작 시 이벤트를 의미합니다.
  onDragEnd 는 드래그 끝날 시 이벤트를 의미합니다.
*/
export default function BlossomMarker({
  position,
  draggable,
  clickable,
  onClick,
  onDragStart,
  onDragEnd,
  isClicked,
}: MarkerProps) {
  return (
    <MapMarker
      position={position}
      image={isClicked ? NORMAL : BLOSSOM}
      draggable={draggable}
      clickable={clickable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      zIndex={2}
    />
  );
}

// BLOSSOM 이미지
const BLOSSOM = {
  src: blossom,
  size: {
    width: 24,
    height: 28,
  },
  options: {
    offset: {
      x: 24,
      y: 28,
    },
  },
};

// 기본 이미지
const NORMAL = {
  src: blossomClick,
  size: {
    width: 26,
    height: 36,
  },
  options: {
    offset: {
      x: 26,
      y: 36,
    },
  },
};
