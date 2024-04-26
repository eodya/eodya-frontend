const tag: { [key: string]: string } = {
  ["BLOOMING"]: "개화",
  ["FULL_BLOOM"]: "만개",
  ["NEXT_YEAR"]: "내년에 만나요",
};

export default function FlowerTag({ placeState }: { placeState: string }) {
  let bgName = "";

  switch (placeState) {
    case "BLOOMING":
      bgName = "bg-success-200";
      break;
    case "FULL_BLOOM":
      bgName = "bg-error-200";
      break;
    case "NEXT_YEAR":
      bgName = "bg-gray-200";
      break;
  }

  return (
    <div
      className={`inline-block rounded px-[6px] py-1 text-[10px] font-semibold leading-none tracking-custom text-white ${bgName}`}
    >
      {tag[placeState]}
    </div>
  );
}
