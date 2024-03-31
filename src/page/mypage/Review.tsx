import TopBar from '../../components/common/menu/TopBar'
import Navigation from '../../components/common/menu/Navigation'
import { ReactComponent as SettingSVG} from "../../assets/image/icon/setting.svg";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as Vintage} from "../../assets/image/icon/vintage.svg";
import { useAppSelector } from '../../store/hooks';
import FormNickname from '../../components/mypage/FormNickname';
import axios from 'axios';
import ComingModal from '../../components/mypage/Modal/ComingModal';
import { Link } from 'react-router-dom';
import ReviewPage from '../../components/mypage/ReviewPage';
import InfiniteScroll from 'react-infinite-scroller';
import { useMypageTotal } from '../../hook/useMypageTotal';


export interface RootInterface {
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

export default function BookMark() {
    
  // modal
  const [isOpen,setIsOpen] = useState(false);
  const onClose = ()=>{
    setIsOpen(false);
  }

  // user
  const { userInfo } = useAppSelector(state=>state.auth);

  const {totalBookmarkCount,reviewTotalCount} = useMypageTotal();

  const [reivews, setReivews] = useState<Review[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(()=>{
    axios(`/api/v1/user/my/reviews?page=${page}&size=10`,{
      headers : {
        Authorization : userInfo?.token
      }
    })
      .then(({data} : {data : RootInterface})=>{

        if(data.hasNext){
          setHasNext(data.hasNext);
          setReivews((prev)=>[...prev,...data.reviews]);
          setPage(page+1);

        }else{
          return;
        }

      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });
  },[]);

  return (
    <>
      <main className='h-screen'>

        <div className='h-[calc(100vh-70px)] flex-col flex'>

          <div className='flex-none'>
            
            <TopBar
              hide={true}
            >
              <SettingSVG 
                onClick={()=>setIsOpen(true)}
                className="fill-gray-800 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              />
            </TopBar>

            <div className="flex items-center font-pretendard tracking-custom leading-none px-6">
              <div className="w-[68px] h-[68px] bg-[#EBEBEB] rounded-full relative"> 
                <Vintage  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
              </div> 
              <div className='ml-4'>
                <FormNickname/>
              </div>
            </div>

            <div className="flex font-semibold border-b text-gray-300 border-gray-300 text-[13px] mt-6 text-center">
                <Link 
                  to={'/mypage'} 
                  className={`flex-1 py-4 relative after:absolute after:translate-y-1/2 after:bottom-0 after:w-full after:h-1  "`}
                >북마크 {totalBookmarkCount}</Link>
                <Link 
                  to={'/mypage/review'} 
                  className={`flex-1 py-4 relative after:absolute after:translate-y-1/2 after:bottom-0 after:w-full after:h-1 after:bg-primary after:block text-primary`}
                >후기 {reviewTotalCount}</Link> 
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            <InfiniteScroll
              pageStart={1}
              loadMore={loadMore}
              hasMore={hasNext}
              loader={<div className='text-center'>로딩중입니다...</div>}
              useWindow={false}
            >
              {
                reivews.map((reivew,i) => <ReviewPage item={reivew} key={i} index={i} setIsOpen={setIsOpen} />)
              }
            </InfiniteScroll>
          </div>

        </div>

        <Navigation />

      </main> 
      <ComingModal isOpen={isOpen} onClose={onClose}/>
    </>
  )
}