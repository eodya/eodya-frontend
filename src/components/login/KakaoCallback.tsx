import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Spinner from "../common/spinner/Spinner";
import { login } from "../../store/features/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";

function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grantType = "authorization_code";
    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
      )
      .then((res: any) => {
        const { access_token } = res.data;

        return axios.post(`/api/v1/user/login`, {
          token: access_token,
        });
      })
      .then((res: any) => {
        dispatch(
          login({
            username: res.data.nickname,
            token: res.data.token,
            userId: res.data.userId,
          }),
        );
        navigate("/");
      })
      .catch((error: any) => {
        console.log(error);
        navigate("/login");
      });
  }, []);

  return <Spinner />;
}

export default KakaoCallback;
