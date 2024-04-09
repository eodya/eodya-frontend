export interface ReviewType {
    reviewTotalCount: number;
    reviews: Review[];
    hasNext: boolean;
}
  
export interface Review {
    placeId: number;
    reviewDate: string;
    image: string;
    name: string;
    reviewContent: string;
    placeStatus: string;
}