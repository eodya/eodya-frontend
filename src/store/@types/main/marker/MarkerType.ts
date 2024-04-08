type MainMarker = {
    placeId: number;
    x: number;
    y: number;
}

export interface initialStateType {
    loading : boolean;
    markers : MainMarker[];
    error : boolean;
}