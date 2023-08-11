import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import { combineReducers } from "redux";
import modalReducer from "@/components/ui/modals/modalSlice";
import asyncReducer from "../api/asyncSlice";
import authReducer from "../api/auth/authSlice";
import postsReducer from "../app/blog/postsSlice";
import storageReducer from "../api/firestore/storageSlice";
import thunk from 'redux-thunk';

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

export function makeStore(initialState) {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
    devTools: process.env.NODE_ENV !== "production",
  });

  store.__persistor = persistStore(store);
  return store;
};

let store;
let persistor;

export function initializeStore(initialState) {
  const _store = store ?? makeStore(initialState);

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;

  // Create the store once in the client
  if (!store) store = _store;
  if (!persistor) persistor = store.__persistor;

  return _store;
}

export function useStore(initialState) {
  const _store = useMemo(() => initializeStore(initialState), [initialState]);
  return _store;
}

export { persistor };
