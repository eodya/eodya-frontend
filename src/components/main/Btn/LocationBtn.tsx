import { ReactComponent as LocationSVG } from "@../assets/image/icon/location.svg";

// 내 위치로 다시 이동
export const LocationBtn = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0px_0px_3px_0px_#00000040]"
    >
      <LocationSVG />
    </button>
  );
};
