import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slice/slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./Slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import themeReducer from "./Slice/themeSlice";

const persistConfig = {
  key: "root",
  storage, //localStorage
  blacklist: ["api", "theme"],
};

export const persistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export const persistor = persistStore(store);
