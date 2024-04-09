import { useNavigate, useParams } from "react-router-dom"
import TopBar from "../../components/common/menu/TopBar"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import { ReviewDetailList, ReviewInterface } from "../../types/review/ReviewType";
import { Reivew } from "../../components/main/Info/Reivew";
import { ReactComponent as Close} from "../../assets/image/icon/close.svg";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../components/common/spinner/Spinner";

function List() {

    const navigate = useNavigate();
    const {placeId} = useParams();
    const {userInfo} = useAppSelector(state=>state.auth);
    const [review,setReview] = useState<ReviewDetailList[]>([]);
    const [reviewTotalCount,setReviewTotalCount] = useState(0);

    const [items, setItems] = useState(Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`));
    const [hasMore, setHasMore] = useState(true);

    /* useEffect(()=>{

        if(placeId){

            axios(`/api/v1/review?placeId=${placeId}&page=1&size=10`,{
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

    },[placeId]); */

    const loadMore = () => {
        // 가짜 데이터 추가
        const newItems = Array.from({ length: 10 }, (_, index) => `Item ${items.length + index + 1}`);
        setItems([...items, ...newItems]);

        // 더 많은 항목이 있는지 확인하여 스크롤 가능 여부 설정
        if (items.length >= 100) {
            setHasMore(false);
        }
    };

    return (
        <div className="h-screen overflow-y-auto scrollbar-hide">
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                useWindow={false}
                loader={<Spinner key={0}/>}
            >
                <TopBar hide={true} className="!sticky top-0">
                    <button 
                        className="absolute top-1/2 right-4 -translate-y-1/2"
                        onClick={()=>navigate(-1)}
                    >
                        <Close fill="#000"/>
                    </button>
                </TopBar>
                <div>
                    <div className=" bg-white p-4">
                        <p className="font-normal text-sm tracking-custom mb-3">
                            후기 <span className="text-primary">{  review.length > 0 ? reviewTotalCount : 0}</span>개
                        </p>

                        {/* {
                            review.map((e,i)=>
                                <Reivew item={e} index={i} key={i} />
                            )
                        } */}

                        {/* 테스트용 */}
                        {
                            items.map((e,i)=>
                                <div className={`tracking-custom font-pretendard mt-5`} key={i}>

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
                            )
                        }
                        
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default List