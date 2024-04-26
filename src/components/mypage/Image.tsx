export function Image({ src }: { src?: string }) {
  return (
    <div
      className={`relative w-full flex-none overflow-hidden rounded-lg after:block after:pb-[100%]`}
    >
      <img
        className="absolute left-0 top-0 h-full w-full object-cover object-center"
        src={src}
        alt=""
      />
    </div>
  );
}
