// 공용 버튼 인터페이스 정의
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: "bg-primary" | "bg-gray-950" | "bg-white";
}
