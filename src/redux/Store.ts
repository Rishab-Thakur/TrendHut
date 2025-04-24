import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";
import productSlice from "./ProductSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  cart: CartSlice,
  product: productSlice,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "product"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
