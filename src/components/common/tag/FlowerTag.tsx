// 개화 상태값에 따라 배경색이 들어가집니다.

const tag : {[key : string] : string} = {
  ["BLOOMING"] : "개화",
  ["FULL_BLOOM"] : "만개",
  ["NEXT_YEAR"] : "내년에 만나요",
}

export default function FlowerTag({placeState} : {placeState : string}) {

    let bgName = "";

    switch(placeState){
        case "BLOOMING" :
            bgName = "bg-success-200"
            break;
        case "FULL_BLOOM" :
            bgName = "bg-error-200"
            break;
        case "NEXT_YEAR" :
            bgName = "bg-gray-200"
            break;
    }


  return (
    <div className={`text-white inline-block rounded font-semibold text-[10px] leading-none tracking-custom py-1 px-[6px] ${bgName}`}>{tag[placeState]}</div>
  )
}
