import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import authSlice from "@store/features/auth/authSlice";
import mainMarker from "@store/features/main/marker/markerSlice";
import spotInfoOpen from "@store/features/main/spotInfo/InfoSlice";
import InfoPlace from "@store/features/main/spotInfo/InfoPlace";
import errorModal from "@store/features/errorModal/modalSlice";
import location from "@store/features/main/location/locationSlice";
import search from "@store/features/main/search/searchSlice";

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
  search,
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
