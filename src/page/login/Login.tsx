import { Link } from "react-router-dom";

import logo from "@assets/image/logo.svg";

function LoginPage() {
  const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-[60px] font-pretendard">
      <div className="bg-[#F0F0F0 items-center] flex h-[276px] w-[276px] justify-center rounded-full">
        <img src={logo} alt="로고" />
      </div>

      <div className="flex w-full max-w-[328px] flex-col items-center justify-center gap-4">
        <button
          className="h-[46px] w-full rounded-[10px] bg-[#FAE100] text-sm font-semibold"
          onClick={() => (window.location.href = kakaoURL)}
        >
          카카오로 로그인
        </button>

        <Link to={"/"} className="text-sm font-semibold underline">
          로그인 없이 둘러보기
        </Link>
      </div>
    </main>
  );
}

export default LoginPage;
