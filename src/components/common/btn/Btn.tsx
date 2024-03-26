/* 
  기본적으로 bgColor가 bg-primay로 들어가고 그외에 "bg-gray-950" 와 "bg-white" 가 들어갑니다. 
  그 외에 컬러는 className으로 따로 추가하면 됩니다.
*/
import { ButtonProps } from "../../../types/ButtonProps"

export default function Btn({bgColor,className,type,children} : ButtonProps) {

  return (
    <button 
      type={type}
      className={`
        ${bgColor}
        ${bgColor === "bg-primary" || bgColor === "bg-gray-950" ? "text-white" : ""}
        w-full rounded-[10px] h-12 font-pretendard text-sm font-semibold text-center tracking-[-0.02em] leading-[14px]
        ${className ? className : ""}
      `}
    >{children}</button>
  )

}

Btn.defaultProps = {
  bgColor : "bg-primary"
}