import { useState } from "react";
import { useForm } from "react-hook-form";

import photo from "@assets/image/icon/photo.svg";
import { ReactComponent as Close } from "@assets/image/icon/close.svg";
import Btn from "@common/btn/Btn";

interface SpotInfoProps {
  onNext: (data: any) => void;
  name: string;
  address: string;
  type: "spot" | "review";
  comments?: string;
  images?: File[];
}

const MAX_LENGTH = 500;
const MAX_IMAGE_COUNT = 2;

function SpotInfo({
  onNext,
  name,
  address,
  type,
  comments = "",
  images = [],
}: SpotInfoProps) {
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      commentsInput: comments,
    },
  });
  const commentsInput = watch("commentsInput", comments);

  const [imagesInput, setImagesInput] = useState<File[]>(images);
  const [selectedImage, setSelectedImage] = useState<number | null>();

  const isContentValid = commentsInput.trim().length > 0;
  const isImageUploaded = imagesInput.length > 0;
  const isAllValid =
    type === "spot" ? isContentValid && isImageUploaded : isContentValid;

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    if (value.length <= MAX_LENGTH) {
      setValue("commentsInput", value);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (imagesInput.length < MAX_IMAGE_COUNT) {
      setImagesInput([...imagesInput, file]);
    }
  };

  const handleImageRemove = (
    index: number,
    event: React.MouseEvent<SVGElement, MouseEvent>,
  ) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setImagesInput(imagesInput.filter((_, i) => i !== index)); // 이미지 삭제
    setSelectedImage(null); // 선택 상태 초기화
  };

  const handleImageClick = (index: number) => {
    if (selectedImage === index) {
      // 이미 선택된 이미지를 다시 클릭하면 삭제
      setImagesInput(imagesInput.filter((_, i) => i !== index));
      setSelectedImage(null); // 선택 상태 초기화
    } else {
      // 이미지 선택 상태 설정
      setSelectedImage(index);
    }
  };

  const onSubmit = (data: any) => {
    const submissionData = {
      comments: data.commentsInput,
      images: data.imagesInput,
    };

    onNext(submissionData);
  };

  return (
    <form
      className="flex h-full flex-col justify-between p-4"
      onSubmit={handleSubmit(onSubmit)}
      onClick={() => setSelectedImage(null)}
    >
      <div>
        <div className="border-b border-gray-200 py-6">
          <p className="font-bold">{name}</p>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm">{address}</span>
            <span className="text-[13px] font-semibold text-primary"></span>
          </div>
        </div>

        <div className="relative py-5">
          <textarea
            {...register("commentsInput")}
            onChange={handleContentChange}
            className="h-[200px] w-full resize-none rounded-[10px] bg-[#f6f6f6] p-3 focus:outline-none"
            placeholder="장소를 방문하며 좋았던 점을 적어 주세요"
            maxLength={MAX_LENGTH}
          ></textarea>
          <div className="absolute bottom-8 right-3 text-[13px] text-gray-500">
            {commentsInput.length}/{MAX_LENGTH}
          </div>
        </div>

        <div>
          {imagesInput.length === 0 && type === "spot" && (
            <p className="mb-2 text-[13px] text-error-200">
              찾아올 다른 분들을 위해 꼭 사진을 남겨 주세요!
            </p>
          )}

          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <label
              htmlFor="image"
              className="flex h-[72px] w-[72px] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-gray-300 text-[13px] text-gray-300"
            >
              <img src={photo} alt="사진 추가" />
              <p>사진 {imagesInput.length}/2</p>
            </label>

            {imagesInput.map((image, index) => (
              <div
                key={index}
                className="group relative flex h-[72px] w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-lg text-[13px] text-gray-300"
                onClick={() => handleImageClick(index)}
              >
                {selectedImage === index && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                    <Close
                      className="fill-white"
                      onClick={(e) => handleImageRemove(index, e)}
                    />
                  </div>
                )}
                <img
                  src={URL.createObjectURL(image)}
                  className={`h-full w-full object-cover ${selectedImage === index && "blur-[2px]"}`}
                  alt="스팟 사진"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-3">
        <Btn
          className={`${isAllValid ? "!bg-gray-950" : "!bg-gray-100 !text-gray-500"}`}
          disabled={!isAllValid}
        >
          다음
        </Btn>
      </div>
    </form>
  );
}

export default SpotInfo;
