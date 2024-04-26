import { useNavigate } from "react-router-dom";

import not_found from "@assets/image/404.svg";
import Btn from "@common/btn/Btn";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-between">
      <div className="flex h-[calc(100%-72px)] w-full flex-col items-center justify-center ">
        <img src={not_found} alt="not found" />
        <p className="mt-5 text-center text-sm text-gray-500 ">
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br />
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
      </div>

      <div className="w-full py-3">
        <Btn
          className={`!bg-gray-950`}
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </Btn>
      </div>
    </div>
  );
}

export default NotFound;
