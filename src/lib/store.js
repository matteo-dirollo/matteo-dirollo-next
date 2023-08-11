import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
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

const combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["posts","async", "storage"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const makeStore = (context) => {
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

export const store = makeStore()
export const wrapper = createWrapper(makeStore, { debug: false });
export const persistor = makeStore().__persistor;





