import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import authSlice from "./features/auth/authSlice";
import mainMarker from "./features/main/marker/markerSlice";
import spotInfoOpen from "./features/main/spotInfo/InfoSlice";
import InfoPlace from "./features/main/spotInfo/InfoPlace";
import errorModal from "./features/errorModal/modalSlice";
import location from "./features/main/location/locationSlice";
import search from "./features/main/search/searchSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  spotInfoOpen,
  mainMarker,
  InfoPlace,
  location,
  errorModal,
  search
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
