import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import {verifyAuth} from "@/api/auth/authSlice"
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import modalReducer from "@/components/ui/modals/modalSlice";
import asyncReducer from "@/api/asyncSlice";
import authReducer from "@/api/auth/authSlice";
import postsReducer from "@/app/blog/postsSlice";
import storageReducer from "@/api/firestore/storageSlice";

const rootReducer = combineReducers({
  async: asyncReducer,
  modals: modalReducer,
  auth: authReducer,
  posts: postsReducer,
  storage: storageReducer,
});

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["posts","async", "storage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

store.dispatch(verifyAuth());

export const persistor = persistStore(store);
