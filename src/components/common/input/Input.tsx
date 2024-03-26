/*  
    input창에 입력부분과 
    검색 버튼 아이콘에는 기본적으로 type이 submit으로 들어가 있습니다.
    value값이 수정이 되면 search 아이콘의 색상이 변동이 됩니다.
*/

import { ReactComponent as Search} from "../../../assets/image/icon/search.svg";

export default function Input({
    name,
    id,
    type,
    placeholder,
    defaultValue,
    maxLength,
    className,
    onChange,
    onInput
} : React.InputHTMLAttributes<HTMLInputElement>) {

  return (
    <div
        className={`w-full relative rounded-[10px] h-[46px] font-pretendard overflow-hidden ${className ? className : ""}`}
    >
        <input
            className="px-5 min-w-0 w-full h-full text-base tracking-[-0.02em] leading-4 outline-none placeholder:text-gray-300"
            onInput={onInput}
            onChange={onChange}
            name={name}
            id={id}
            maxLength={maxLength}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
        ></input>
        <button 
            className="absolute right-5 top-1/2 -translate-y-1/2"
            type="submit"
        ><Search className={`${defaultValue ? "fill-gray-900" : "fill-gray-300"}`}/></button>
    </div>
  )


}