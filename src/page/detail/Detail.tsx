import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ReviewDetailList, ReviewInterface } from "../../types/review/ReviewType";
import TopBar from "../../components/common/menu/TopBar";
import ShareBtn from "../../components/common/btn/Share/ShareBtn";
import FlowerTag from "../../components/common/tag/FlowerTag";
import { Reivew } from "../../components/main/Info/Reivew";
import { BookMarkBtn } from "../../components/common/btn/BookMarkBtn";
import { getPlace } from "../../store/features/main/spotInfo/InfoPlace";

function Detail() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {placeId} = useParams();

    const {info} = useAppSelector(start=>start.InfoPlace);
    const {userInfo} = useAppSelector(state=>state.auth);
    
    const [review,setReview] = useState<ReviewDetailList[]>([]);
    const [reviewTotalCount,setReviewTotalCount] = useState(0);
    const [hasNext,setHasNext] = useState(false);

    useEffect(()=>{

        if(placeId && userInfo){

            dispatch(getPlace({token : userInfo.token, placeId : Number(placeId)}))

            axios(`/api/v1/review?placeId=${placeId}&page=1&size=3`,{
                headers : {
                    Authorization : userInfo?.token,
                    "Content-Type" : "application/json"
                }
            })
            .then(({data} : {data : ReviewInterface})=>{

                setReviewTotalCount(data.reviewTotalCount);
                setReview(data.reviewDetailList);
                setHasNext(data.hasNext);
        
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        }
    }, [placeId,userInfo]);

    return (
        <div
            className={`w-full bg-gray-100 font-pretendard transition-transform duration-300`}
        >
            <div className="relative h-screen overflow-y-auto scrollbar-hide">

                <TopBar
                    className="!sticky left-0 top-0 z-30 box-border w-full max-w-xl bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-transparent to-[82.14%]"
                    prevClassName="fill-white"
                    onBack={()=>{
                        navigate(-1);
                    }}
                >
                    <nav className="absolute right-4 top-1/2 flex -translate-y-1/2">
                        <BookMarkBtn placeId={info.placeId.toString()} status={info.bookmarkStatus} />
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
                        {
                            hasNext && 
                                <Link 
                                    className="w-full h-[46px] text-gray-500 text-sm leading-none flex items-center justify-center bg-gray-100 rounded-[10px] mt-4"
                                    to={`/review/${info.placeId}`}
                                >더보기</Link>
                        }
                    </div>
                
                </div>
                
            </div>
        </div>
    );

}

export default Detail