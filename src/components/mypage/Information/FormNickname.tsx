import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateUsername } from "../../../store/features/auth/authSlice";

const MAX_LENGTH = 8;

export default function FormNickname() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [changeShow, setChangeShow] = useState(false);
  const { register, watch, handleSubmit, setValue } = useForm();
  const displayName = watch("displayName", userInfo?.username);

  useEffect(() => {
    if (displayName.length >= MAX_LENGTH) {
      setValue("displayName", displayName.substring(0, 8));
    }
  }, [displayName]);

  const onSubmit = (data: any) => {
    axios
      .patch(
        "/api/v1/user/nickname",
        { nickname: data.displayName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo?.token}`,
          },
        },
      )
      .then(() => {
        dispatch(
          updateUsername({
            userId: userInfo?.userId,
            username: data.displayName,
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChangeShow(false);
      });
  };

  return (
    <>
      {changeShow ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("displayName", { required: true })}
            className="box-border h-[31px] w-[121px] rounded border border-gray-200 px-1 py-[6px] font-semibold tracking-custom outline-none"
            type="text"
            defaultValue={userInfo?.username}
            maxLength={MAX_LENGTH}
          />
          <div className="mt-[6px]">
            <button
              className="mt-[3px] border-b border-gray-300 text-[13px] text-gray-300"
              type="submit"
            >
              확인
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="text-lg font-semibold">{userInfo?.username}</p>
          <p className="mt-[3px]  text-[13px] text-gray-300">
            <button
              className="border-b border-gray-300"
              type="button"
              onClick={() => setChangeShow(true)}
            >
              닉네임 변경
            </button>
          </p>
        </>
      )}
    </>
  );
}
