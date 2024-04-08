import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TopBar from "../common/menu/TopBar";
import { Reivew } from "./Reivew";
import FlowerTag from "../common/tag/FlowerTag";
import ShareBtn from "../common/btn/Share/ShareBtn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { close } from "../../store/features/main/spotView/slice";
import { ReviewDetailList, ReviewInterface } from "../../types/review/ReviewType";

export const SpotView = () => {
  const dispatch = useAppDispatch();
  const viewShow = useAppSelector(state=>state.spotView);

  const {userInfo} = useAppSelector(state=>state.auth);
  const {info} = useAppSelector(start=>start.InfoPlace);

  const [review,setReview] = useState<ReviewDetailList[]>([]);
  const [reviewTotalCount,setReviewTotalCount] = useState(0);

  useEffect(()=>{
    
    if(info.placeId !== 0){

      axios(`/api/v1/review?placeId=${info.placeId}&page=1&size=3`,{
        headers : {
          Authorization : userInfo?.token,
          "Content-Type" : "application/json"
        }
      })
        .then(({data} : {data : ReviewInterface})=>{

          setReviewTotalCount(data.reviewTotalCount);
          setReview((prev)=>[...prev,...data.reviewDetailList]);
  
        })
        .catch(error => {

          console.error('Error fetching data:', error);
      });

    }

  },[info])

  return (
    <div
      className={`${!viewShow ? "translate-x-full" : ""} absolute left-0 top-0 z-[60] w-full bg-gray-100 font-pretendard transition-transform duration-300`}
    >
      <div className="relative h-screen overflow-y-auto scrollbar-hide">

        <TopBar
          className="!sticky left-0 top-0 z-30 box-border w-full max-w-xl bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-transparent to-[82.14%]"
          prevClassName="fill-white"
          onBack={() => {
            dispatch(close());
          }}
        >
          <nav className="absolute right-4 top-1/2 flex -translate-y-1/2">
            {/* <button onClick={() => setBookmark(!bookmark)}>
              {bookmark ? (
                <BookmarkOutline className="fill-white" />
              ) : (
                <Bookmark className="fill-white" />
              )}
            </button> */}
            <ShareBtn className="ml-2 fill-white" />
          </nav>
        </TopBar>

        <div className="w-full after:block after:pb-[100%] -mt-14 sticky top-0">
          <img className="absolute top-0 left-0 w-full h-full object-cover object-top" src={info.image} alt={`${info.name} 이미지`} />
        </div>

        <div className="relative z-10 bg-gray-100">
          <div className="flex items-center justify-between bg-white px-4 pb-5 pt-5">
            <dl>
              <dt className="text-xl font-bold text-gray-950 tracking-custom flex items-start">
                {info.name} <div className="ml-2 inline-block leading-none"><FlowerTag placeState="개화"/></div>
              </dt>
              <dd className="mt-2 tracking-custom font-normal text-sm  leading-[21px]">
                {info.addressDetail} 
                {/* <span className="text-[13px] leading-none font-semibold text-info-300">820m</span> */}
              </dd>
            </dl>
            <Link 
              to={`/new/review/${info.placeId}`} 
              className={`bg-primary text-white w-[87px] h-8 flex items-center justify-center text-xs font-semibold rounded-full`}
            >후기 남기기</Link>
          </div>

          <div className="mt-2 bg-white py-6 px-4">
            <p className="font-normal text-sm tracking-custom mb-3">
              후기 <span className="text-primary">{  review.length > 0 ? reviewTotalCount : 0}</span>개
            </p>
            {
              review.map((e,i)=>
                <Reivew item={e} index={i} key={i} />
              )
            }

            {/* 테스트용 */}
            <div className={`tracking-custom font-pretendard`}>

              <p className="text-[13px] leading-none text-gray-300">1010101.010</p>

              <div className={`grid grid-cols-2 gap-1 rounded-lg overflow-hidden mt-2 w-2/3 bg-gray-500`}>
                <div className={`w-full after:content-[''] after:pb-[100%] after:block relative`}>
                  <img className={`absolute top-0 left-0 w-full h-full object-cover object-center`} src={''} alt={`리뷰 이미지`} />
                </div>
              </div>

              <p className={`mt-2 text-sm text-gray-900 leading-[21px]`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tempore incidunt, recusandae mollitia nobis, consequuntur dolore obcaecati aliquam hic repellat adipisci quis nemo soluta fugit. Quasi eius perferendis nihil odio!
              </p>

            </div>

            <Link 
              className="w-full h-[46px] text-gray-500 text-sm leading-none flex items-center justify-center bg-gray-100 rounded-[10px] mt-4"
              to={`/review/${info.placeId}`}
            >더보기</Link>
          </div>
          
        </div>

      </div>
    </div>
  );
};
