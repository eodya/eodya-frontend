import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import TopBar from "@common/menu/TopBar";
import ShareBtn from "@common/btn/Share/ShareBtn";
import FlowerTag from "@common/tag/FlowerTag";
import BookMarkBtn from "@common/btn/BookMarkBtn";
import ReivewList from "@components/review/List";

import { ReviewDetailList, ReviewInterface } from "@/types/review/ReviewType";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPlace } from "@store/features/main/spotInfo/InfoPlace";

function Detail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { placeId } = useParams();

  const { info } = useAppSelector((start) => start.InfoPlace);
  const { userInfo } = useAppSelector((state) => state.auth);

  const [review, setReview] = useState<ReviewDetailList[]>([]);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    if (placeId && userInfo) {
      dispatch(getPlace({ token: userInfo.token, placeId: Number(placeId) }));

      axios(`/api/v1/review?placeId=${placeId}&page=1&size=3`, {
        headers: {
          Authorization: userInfo?.token,
          "Content-Type": "application/json",
        },
      })
        .then(({ data }: { data: ReviewInterface }) => {
          setReviewTotalCount(data.reviewTotalCount);
          setReview(data.reviewDetailList);
          setHasNext(data.hasNext);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [placeId, userInfo, dispatch]);

  return (
    <div
      className={`w-full bg-gray-100 font-pretendard transition-transform duration-300`}
    >
      <div className="relative h-screen overflow-y-auto scrollbar-hide">
        <TopBar
          className="!sticky left-0 top-0 z-30 box-border w-full max-w-xl bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-transparent to-[82.14%]"
          prevClassName="fill-white"
          onBack={() => {
            navigate(-1);
          }}
        >
          <nav className="absolute right-4 top-1/2 flex -translate-y-1/2">
            <BookMarkBtn
              placeId={info.placeId.toString()}
              status={info.bookmarkStatus}
              numberHide={true}
              fillStyle="fill-white"
            />
            <ShareBtn className="ml-2 fill-white" />
          </nav>
        </TopBar>

        <div className="sticky top-0 -mt-14 w-full after:block after:pb-[100%]">
          <img
            className="absolute left-0 top-0 h-full w-full object-cover object-top"
            src={info.image}
            alt={`${info.name} 이미지`}
          />
        </div>

        <div className="relative z-10 bg-gray-100">
          <div className="flex items-center justify-between bg-white px-4 pb-5 pt-5">
            <dl>
              <dt className="flex items-start text-xl font-bold tracking-custom text-gray-950">
                {info.name}{" "}
                <div className="ml-2 inline-block leading-none">
                  <FlowerTag placeState={info.placeStatus} />
                </div>
              </dt>
              <dd className="mt-2 text-sm font-normal leading-[21px]  tracking-custom">
                {info.addressDetail}
                {/* <span className="text-[13px] leading-none font-semibold text-info-300">820m</span> */}
              </dd>
            </dl>
            <Link
              to={`/new/review/${info.placeId}`}
              className={`flex h-10 w-[87px] items-center justify-center rounded-full bg-primary text-xs font-semibold text-white`}
            >
              후기 남기기
            </Link>
          </div>

          <div className="mt-2 bg-white px-4 py-6">
            <p className="mb-3 text-sm font-normal tracking-custom">
              후기{" "}
              <span className="text-primary">
                {review.length > 0 ? reviewTotalCount : 0}
              </span>
              개
            </p>
            {review.map((e, i) => (
              <ReivewList item={e} index={i} key={i} />
            ))}

            {/* 
                            테스트
                            <div className={`tracking-custom`}>

                                <div className={`mt-2 grid w-[calc(100%-56px)] grid-cols-2 gap-1 overflow-hidden rounded-lg`}>
                                    <div className={`relative w-full after:block after:pb-[100%] after:content-['']`}>
                                        <img
                                            className={`absolute left-0 top-0 h-full w-full object-cover object-center`}
                                            src={'https://picsum.photos/200'}
                                            alt={`리뷰 이미지`}
                                        />
                                    </div>
                                    <div className={`relative w-full after:block after:pb-[100%] after:content-['']`}>
                                        <img
                                            className={`absolute left-0 top-0 h-full w-full object-cover object-center`}
                                            src={'https://picsum.photos/200'}
                                            alt={`리뷰 이미지`}
                                        />
                                    </div>
                                </div>
                                <p className={`mt-2 text-sm leading-[21px] text-gray-900`}>
                                    지금이 딱 피크인 것 같아요!! 가서 인생샷 찍고 왔습니다!
                                </p>
                                <p className="text-[13px] mt-[3px] leading-none text-gray-300">
                                    2024.04.18
                                </p>
                            
                            </div>

                            <div className={`mt-5 border-t border-t-gray-100 pt-5 tracking-custom`}>

                                <div className={`mt-2 grid w-[calc(100%-56px)] grid-cols-2 gap-1 overflow-hidden rounded-lg`}>
                                    <div className={`relative w-full after:block after:pb-[100%] after:content-['']`}>
                                        <img
                                            className={`absolute left-0 top-0 h-full w-full rounded-lg object-cover object-center`}
                                            src={'https://picsum.photos/200'}
                                            alt={`리뷰 이미지`}
                                        />
                                    </div>
                                </div>
                                <p className={`mt-2 text-sm leading-[21px] text-gray-900`}>
                                    지금이 딱 피크인 것 같아요!! 가서 인생샷 찍고 왔습니다!
                                </p>
                                <p className="text-[13px] mt-[3px] leading-none text-gray-300">
                                    2024.04.18
                                </p>
                            
                            </div>
                        */}

            {hasNext && (
              <Link
                className="mt-4 flex h-[46px] w-full items-center justify-center rounded-[10px] bg-gray-100 text-sm leading-none text-gray-500"
                to={`/review/${info.placeId}`}
              >
                더보기
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
