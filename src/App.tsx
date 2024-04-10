import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import { useAppSelector } from "./store/hooks";

import Layout from "./components/layout/Layout";
import KakaoCallback from "./components/login/KakaoCallback";
import PrivateRoute from "./components/login/PrivateRoute";
import PublicRoute from "./components/login/PublicRoute";
// import SplashScreen from './components/layout/SplashScreen';

import Main from "./page/main/Main";
import LoginPage from "./page/login/Login";
import Spinner from "./components/common/spinner/Spinner";
import ErrorModal from "./components/common/btn/Share/Modal/ErrorModal";
const Mypage = lazy(() => import("./page/mypage/BookMark"));
const Review = lazy(() => import("./page/mypage/Review"));
const NewReviewPage = lazy(() => import("./page/new/Review"));
const NewSpotPage = lazy(() => import("./page/new/Spot"));
const NotFound = lazy(() => import("./page/404/NotFound"));

function App() {
  // const [loading, setLoading] = useState(false);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  const errorModalState = useAppSelector(
    (state: RootState) => state.errorModal,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const initialization = sessionStorage.getItem("initialization");

    if (!initialization) {
      // setLoading(true);
      sessionStorage.setItem("initialization", "true");

      // const timer = setTimeout(() => {
      //   setLoading(false);
      // }, 1500);
      // // return () => clearTimeout(timer);

      const checkLogin = () => {
        const path = window.location.pathname;
        if (!isLoggedIn && path === "/") {
          navigate("/login");
        }
      };

      checkLogin();
    }
  }, []);

  // if (loading) {
  //   return <SplashScreen />;
  // }

  return (
    <Suspense
      fallback={
        <div
          role="status"
          className="flex h-dvh w-full items-center justify-center"
        >
          <Spinner />
        </div>
      }
    >
      {errorModalState.isOpen && (
        <ErrorModal
          isOpen={errorModalState.isOpen}
          message={errorModalState.message}
        />
      )}

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main />} />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/api/auth/callback/kakao"
            element={
              <PublicRoute>
                <KakaoCallback />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/new/review/:id"
            element={
              <PrivateRoute>
                <NewReviewPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/new/spot"
            element={
              <PrivateRoute>
                <NewSpotPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage/review"
            element={
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            }
          />

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
