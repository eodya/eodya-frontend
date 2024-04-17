import { GridLayout } from './GridLayout'
import FlowerTag from '../common/tag/FlowerTag'
import { Image } from './Image'
import { BookMarkBtn } from '../common/btn/BookMarkBtn'
import { Bookmark } from '../../types/mypage/BookmarkType'

export default function BookPage({item,index}:{item :Bookmark,index : number}) {

  return (
    <GridLayout index={index}>
      <div className='flex relative pr-6'>
        <div className='w-[100px] relative flex-none'>
            <div className='absolute top-0 left-0 z-10 leading-none mt-[10px] ml-[10px]'>
            <FlowerTag placeState={item.placeStatus}/>
            </div>
            <Image src={item.image}/>
        </div>
        <dl className='ml-3 tracking-custom'>
            <dt className='text-base text-gray-950 font-bold leading-4'>{item.name}</dt>
            <dd className='text-sm font-normal mt-[6px] leading-[21px] text-gray-700'>{item.addressDetail}</dd>
        </dl>
        <div className="absolute right-0 top-0">
            <BookMarkBtn placeId={item.placeId.toString()} status={false} />
        </div>
      </div>
    </GridLayout>
  )
}
