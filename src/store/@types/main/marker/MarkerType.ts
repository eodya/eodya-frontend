export interface MainMarker {
  placeId: number;
  x: number;
  y: number;
}

export interface MainMarkerType {
  loading: boolean;
  markers: MainMarker[];
  error: boolean;
}
