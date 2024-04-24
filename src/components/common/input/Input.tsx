/*  
    input창에 입력부분과 
    검색 버튼 아이콘에는 기본적으로 type이 submit으로 들어가 있습니다.
    value값이 수정이 되면 search 아이콘의 색상이 변동이 됩니다.
*/

import { ReactComponent as Search } from "../../../assets/image/icon/search.svg";

export default function Input({
  name,
  id,
  type,
  placeholder,
  defaultValue,
  maxLength,
  className,
  onChange,
  onInput,
  onClick
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`bg-white relative h-[46px] w-full overflow-hidden rounded-[10px] ${className ? className : ""}`}
    >
      <input
        className="h-full w-full min-w-0 bg-transparent px-5 text-base leading-4 tracking-[-0.02em] outline-none placeholder:text-gray-300"
        onInput={onInput}
        onChange={onChange}
        onClick={onClick}
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
        disabled={defaultValue === ""}
      >
        <Search
          className={`${defaultValue ? "fill-gray-900" : "fill-gray-300"}`}
        />
      </button>
    </div>
  );
}
