import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { createWrapper, HYDRATE } from "next-redux-wrapper";
=======
>>>>>>> redux
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

<<<<<<< HEAD
const combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

=======
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

>>>>>>> redux
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["posts","async", "storage"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

<<<<<<< HEAD
const makeStore = (context) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
=======
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
>>>>>>> redux
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

<<<<<<< HEAD
  store.__persistor = persistStore(store);

  return store;
};

export const store = makeStore()
export const wrapper = createWrapper(makeStore, { debug: false });
export const persistor = makeStore().__persistor;





=======
store.dispatch(verifyAuth());

export const persistor = persistStore(store);
>>>>>>> redux
