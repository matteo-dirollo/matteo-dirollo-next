import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
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
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import { combineReducers } from "redux";
import modalReducer from "@/components/ui/modals/modalSlice";
import asyncReducer from "@/api/asyncSlice";
import authReducer from "@/api/auth/authSlice";
import postsReducer from "@/app/blog/postsSlice";
import storageReducer from "@/api/firestore/storageSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  async: asyncReducer,
  modals: modalReducer,
  auth: authReducer,
  posts: postsReducer,
  storage: storageReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["posts", "async", "storage"],
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
