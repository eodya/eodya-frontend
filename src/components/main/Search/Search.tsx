import { Link } from "react-router-dom"
import FlowerTag from "../../common/tag/FlowerTag"
import { useAppSelector } from "../../../store/hooks"

function Search() {

    const searchData = useAppSelector(state=>state.search);

    return (
        <div className="bg-white absolute top-0 left-0 w-full h-full z-40 pt-[102px] tracking-custom">
            <div className="h-full overflow-y-auto">
                {
                    searchData.map((e,i)=>(
                        <div key={i} className="flex items-center justify-between px-4 py-5">
                            <dl>
                                <dt className="flex">
                                    <h4 className="mr-2 font-bold">{e.name}</h4>
                                    <div className="flex-none">
                                        <FlowerTag placeState={e.placeStatus}/>
                                    </div>
                                </dt>
                                <dd className="mt-2">{e.addressDetail}</dd>
                            </dl>
                            <Link
                                className="w-[87px] h-8 rounded-full bg-primary flex items-center justify-center text-xs leading-none font-semibold text-white flex-none ml-3"
                                to={`/new/review/${e.placeId}`}
                            >후기 남기기</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default Search