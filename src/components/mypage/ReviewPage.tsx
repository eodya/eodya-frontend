import { GridLayout } from './GridLayout'
import FlowerTag from '../common/tag/FlowerTag'
import { Image } from './Image'
import { ReactComponent as HorizSVG} from "../../assets/image/icon/horiz.svg";
import { Review } from '../../types/mypage/ReviewType';

export default function ReviewPage({item,index,setIsOpen}: {item: Review,index : number,setIsOpen : any}) {
  return (
    <GridLayout index={index}>
      <p className='text-gray-300 text-[13px] tracking-custom leading-none '>{item.reviewDate}</p>

      <div className='flex relative mt-2'>
        <div className='w-[80px] relative flex-none'>
          <div className='absolute top-0 left-0 z-10 leading-none mt-[10px] ml-[10px]'>
            <FlowerTag placeState={item.placeStatus}/>
          </div>
          <Image src={item.image}/>
        </div>
        <dl className='ml-3 tracking-custom pr-5'>
          <dt className='text-base text-gray-950 font-bold leading-4'>{item.name}</dt>
          <dd className='text-sm leading-[21px] font-normal text-gray-900 mt-[6px]'>
            {item.reviewContent}
          </dd>
        </dl>
      </div>

      <div className='flex justify-end mt-2 text-[13px] tracking-custom leading-none text-gray-300'>
        <button onClick={()=>setIsOpen(true)}><HorizSVG/></button>
      </div>
    </GridLayout>
  )
}
