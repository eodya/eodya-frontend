export interface ReviewInterface {
  reviewTotalCount: number;
  reviewDetailList: ReviewDetailList[];
  hasNext: boolean;
}

export interface ReviewDetailList {
  userId: number;
  nickName: string;
  reviewDate: string;
  reviewImage: string[];
  placeStatus: string;
  reviewContent: string;
}
