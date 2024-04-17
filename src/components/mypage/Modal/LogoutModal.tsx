import Modal from "react-modal";
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/features/auth/authSlice";

export default function LogoutModal({isOpen,onClose} : {isOpen : boolean, onClose : any}) {

    const dispatch = useAppDispatch();

    const handleClose = ()=>{
        onClose();
    }
  
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={{
            content : {
                position : "absolute",
                overflow : "hidden",
                left : "50%",
                top : "50%",
                right: 'auto',
                bottom: 'auto',
                padding : 0,
                marginRight: '-50%',
                borderRadius : "10px",
                transform: 'translate(-50%, -50%)',
                width : `${280/360*100}%`,
                height : 'auto',
                maxWidth : 280,
            },
            overlay : {
                zIndex : 9999,
                background : "rgba(000,000,000,0.5)"
            }
            }}
        >
            <div className="font-pretendard tracking-custom leading-none h-full">
              <div className='h-[82px] flex items-center justify-center text-base font-normal leading-[20.8px]'>
                로그아웃 하시겠습니까?
              </div>
              <div className="flex">
                <button 
                    className='h-11 flex items-center justify-center w-full border-t border-gray-100 text-error-300' 
                    onClick={handleClose}
                >취소</button>
                <button 
                    className='h-11 flex items-center justify-center w-full border-t border-gray-100' 
                    onClick={()=>dispatch(logout())}
                >확인</button>
              </div>
            </div>
        </Modal>
    )
  
}