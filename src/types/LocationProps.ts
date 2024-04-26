// location 가져올때 error 타입
export type LocationError = {
  code?: number;
  message?: string;
};

// location 가져올때 success 타입
export type LocationSuccess = {
  latitude: number;
  longitude: number;
};
