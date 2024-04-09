/* 
  기본적으로 bgColor가 bg-primay로 들어가고 그외에 "bg-gray-950" 와 "bg-white" 가 들어갑니다. 
  그 외에 컬러는 className으로 따로 추가하면 됩니다.
*/
import { ButtonProps } from "../../../types/ButtonProps";

export default function Btn({
  bgColor,
  className,
  type,
  children,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        ${bgColor}
        ${
          bgColor === "bg-primary" || bgColor === "bg-gray-950"
            ? "text-white"
            : ""
        }
        h-12 w-full rounded-[10px] text-center text-sm font-semibold leading-[14px] tracking-[-0.02em]
        ${className ? className : ""}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Btn.defaultProps = {
  bgColor: "bg-primary",
};
