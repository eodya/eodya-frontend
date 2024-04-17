import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorInfo {
  message: string;
}

const getErrorInfo = (errorCode: string): ErrorInfo => {
  const errorMap: Record<string, ErrorInfo> = {
    "COM-001": { message: "요청한 URL에 해당하는 리소스를 찾을 수 없습니다." },
    "COM-002": { message: "사용자 입력이 유효성 검사에 실패했습니다." },
    "COM-003": { message: "허용되지 않은 HTTP Method 요청이 발생했습니다." },
    "COM-004": { message: "기타 서버 내부가 에러 발생했습니다." },
    "USR-001": { message: "사용자를 찾을 수 없습니다." },
    "USR-002": { message: "해당 닉네임으로 등록된 사용자가 있습니다." },
    "PLA-001": { message: "해당 장소를 찾을 수 없습니다." },
    "PLA-002": { message: "이미 등록된 장소입니다." },
    "PLA-003": { message: "사진은 최소 1장, 최대 2장 등록할 수 있습니다." },
    "REC-001": { message: "추천 상태를 찾을 수 없습니다." },
    "BOO-001": { message: "북마크 상태를 찾을 수 없습니다." },
    "AUT-001": { message: "유효한 카카오 토큰이 아닙니다." },
    "AUT-002": { message: "유효한 토큰이 아닙니다." },
    "AUT-003": { message: "만료된 토큰입니다." },
    "AUT-004": { message: "JWT token 오류가 발생했습니다." },
    default: { message: "알 수 없는 오류가 발생했습니다." },
  };

  return errorMap[errorCode] || errorMap["default"];
};

interface ModalState {
  isOpen: boolean;
  message: string | null;
  errorCode: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  message: null,
  errorCode: null,
};

const errorModalSlice = createSlice({
  name: "errorModal",
  initialState,
  reducers: {
    open: (
      state,
      action: PayloadAction<{ errorCode?: string; message?: string }>,
    ) => {
      if (action.payload.errorCode) {
        // errorCode가 제공된 경우, 해당 에러 코드에 맞는 메시지 사용
        const errorInfo = getErrorInfo(action.payload.errorCode);
        state.message = errorInfo.message;
        state.errorCode = action.payload.errorCode;
      } else if (action.payload.message) {
        // 직접 메시지가 제공된 경우, 그 메시지 사용
        state.message = action.payload.message;
      } else {
        // errorCode도 message도 제공되지 않은 경우, 기본 메시지 사용
        state.message = "알 수 없는 오류가 발생했습니다.";
      }
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
      state.message = null;
      state.errorCode = null;
    },
  },
});

export const { open, close } = errorModalSlice.actions;

export default errorModalSlice.reducer;
