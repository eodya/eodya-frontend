import logo from "@assets/image/logo.svg";

function SplashScreen() {
  return (
    <div className="relative mx-auto flex h-dvh max-w-lg items-center justify-center overflow-hidden bg-white bg-pattern bg-cover">
      <img src={logo} alt="로고" />
    </div>
  );
}

export default SplashScreen;
