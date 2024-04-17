import { ReactComponent as LogoutSVG} from "../../../assets/image/icon/logout.svg";
import { ReactComponent as Vintage } from "../../../assets/image/icon/vintage.svg";
import FormNickname from "./FormNickname";
import LogoutModal from "../Modal/LogoutModal";
import { useState } from "react";

export default function Information() {

    const [isOpen,setIsOpen] = useState(false);

    const onClose = ()=>{
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex items-center justify-between px-6 font-pretendard leading-none tracking-custom mt-16">
                <div className="flex items-center">
                    <div className="relative h-[68px] w-[68px] rounded-full bg-[#EBEBEB]">
                        <Vintage className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="ml-4">
                        <FormNickname />
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                >
                    <LogoutSVG/>
                </button>
            </div>
            <LogoutModal isOpen={isOpen} onClose={onClose}/>
        </>
    )

}