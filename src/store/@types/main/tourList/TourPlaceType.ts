export interface TourPlaceType {
    loading : boolean
    data : {
        placeDetails: PlaceDetail[];
        hasNext: boolean;
    }
    error : null | string
}

export interface PlaceDetail {
    placeId: number;
    name: string;
    addressDetail: string;
    placeImage: string;
    bookmarkStatus: boolean;
    placeStatus: string;
}

