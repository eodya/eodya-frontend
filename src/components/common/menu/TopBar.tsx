import { useNavigate } from "react-router-dom";

import { ReactComponent as Prev } from "../../../assets/image/icon/prev.svg";
import { ReactComponent as Close } from "../../../assets/image/icon/close.svg";

/* 
  기본적으로 prev 버튼을 생성하고
  children 값을 넣어 원하는 디자인으로 수정할 수 있게 했습니다.

  canClose: TopBar에 X 버튼 유무
  onBack: 뒤로가기 버튼 함수
*/

export default function TopBar({
  className,
  prevClassName,
  children,
  hide,
  canClose,
  onBack,
}: {
  className?: React.ReactNode;
  prevClassName?: React.ReactNode;
  children?: React.ReactNode;
  hide?: boolean;
  canClose?: boolean;
  onBack?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const navigate = useNavigate();

  return (
    <div className={`relative z-10 h-14 ${className ? className : ""}`}>
      {!hide ? (
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={onBack}
        >
          <Prev fill="#424242" className={`${prevClassName}`} />
        </button>
      ) : null}
      {children}
      {canClose && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => navigate(-1)}
        >
          <Close className="fill-[#424242]" />
        </button>
      )}
    </div>
  );
}
