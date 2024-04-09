import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import error from "../../../../../assets/image/icon/error.svg";
import { RootState } from "../../../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { logout } from "../../../../../store/features/auth/authSlice";
import { close } from "../../../../../store/features/errorModal/modalSlice";

interface ErrorModalProps {
  isOpen: boolean;
  message: string | null;
}

function ErrorModal({ isOpen, message }: ErrorModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorCode } = useAppSelector((state: RootState) => state.errorModal);

  const handleClose = () => {
    switch (errorCode) {
      case "PLA-001":
      case "PLA-002":
        navigate("/new/spot");
        break;
      case "AUT-001":
      case "AUT-002":
      case "AUT-003":
      case "AUT-004":
        dispatch(logout());
        navigate("/login");
        break;
      default:
        break;
    }

    dispatch(close());
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        content: {
          position: "absolute",
          overflow: "hidden",
          left: "50%",
          top: "50%",
          right: "auto",
          bottom: "auto",
          padding: 0,
          marginRight: "-50%",
          borderRadius: "10px",
          transform: "translate(-50%, -50%)",
          width: `${(280 / 360) * 100}%`,
          height: "auto",
          maxWidth: 280,
        },
        overlay: {
          zIndex: 9999,
          background: "rgba(000,000,000,0.5)",
        },
      }}
    >
      <div className="font-pretendard tracking-custom">
        <div className="flex flex-col items-center justify-center gap-2 py-6">
          <img src={error} alt="에러 아이콘" />
          {message}
        </div>

        <button
          className="flex h-[45px] w-full items-center justify-center border-t border-gray-100 leading-[20.8px] text-gray-950"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}

export default ErrorModal;
