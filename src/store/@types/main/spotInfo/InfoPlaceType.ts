export type getInfoPlace = {
    loading : boolean;
    info : {
        name: string;
        addressDetail: string;
        image: string;
        placeStatus: string;
        bookmarkCount: number;
        bookmarkStatus: boolean;
        placeId : number;
    },
    error : boolean;
}