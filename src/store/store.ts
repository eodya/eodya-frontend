import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import authSlice from "./features/auth/authSlice";
import mainMarker from "./features/main/marker/markerSlice";
import spotViewReducer from "./features/main/spotView/slice";
import spotInfoY from "./features/main/spotInfo/ySlice";
import spotInfoOpen from "./features/main/spotInfo/InfoSlice";
import tourOpen from "./features/main/tourList/openSlice";
import InfoPlace from "./features/main/spotInfo/InfoPlace";
import tourPlace from "./features/main/tourList/tourPlace";
import tourClick from "./features/main/map/tourClick";
import spotClick from "./features/main/map/spotClick";
import errorModal from "./features/errorModal/modalSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  spotView: spotViewReducer,
  spotInfoY,
  spotInfoOpen,
  tourOpen,
  mainMarker,
  InfoPlace,
  tourClick,
  spotClick,
  tourPlace, // 주변 명소
  errorModal,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Redux의 type을 꺼내줍니다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
