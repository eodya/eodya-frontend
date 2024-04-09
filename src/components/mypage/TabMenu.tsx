import { Link, useLocation } from 'react-router-dom'
import { useMypageTotal } from '../../hook/useMypageTotal';

function Tabmenu() {
    const { totalBookmarkCount, reviewTotalCount } = useMypageTotal();
    const {pathname} = useLocation();

    return (
        <div className="mt-6 flex border-b border-gray-300 text-center text-[13px] font-semibold text-gray-300">
            <Link
                to={"/mypage"}
                className={`" relative flex-1 py-4 after:absolute after:bottom-0 after:block after:h-1 after:w-full after:translate-y-1/2 after:bg-primary ${pathname === "/mypage" ? "text-primary after:block" : "after:hidden"}`}
            >
                북마크 {totalBookmarkCount}
            </Link>
            <Link
                to={"/mypage/review"}
                className={`after:bg-primar relative flex-1 py-4 after:absolute after:bottom-0 after:block after:h-1 after:w-full after:translate-y-1/2 after:bg-primary ${pathname === "/mypage/review" ? "text-primary after:block" : "after:hidden"}`}
            >
                후기 {reviewTotalCount}
            </Link>
        </div>
    )
}

export default Tabmenu