import { GridLayout } from "./GridLayout";

export default function ReportPage({ index }: { index: number }) {
  return (
    <GridLayout index={index}>
      <div className="tracking-custom">
        <dl>
          <dt className="text-base font-bold leading-4 text-gray-950">
            애기능 동산
          </dt>
          <dd className="mt-[6px] text-sm font-normal leading-[21px] text-gray-500">
            서울 성북구 안암로 73-15
          </dd>
        </dl>
        <p className="mt-[6px] text-sm font-normal leading-[21px] text-gray-900">
          대통령은 국무회의의 의장이 되고, 국무총리는 부의장이 된다. 새로운
          회계연도가 개시될 때까지 예산안이 의결
        </p>
      </div>
    </GridLayout>
  );
}
