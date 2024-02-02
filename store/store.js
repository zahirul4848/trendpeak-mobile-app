import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { userApiSlice } from "./userApiSlice";
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categoryApiSlice } from "./categoryApiSlice";
import { productApiSlice } from "./productApiSlice";
import cartSlice from "./cartSlice";
import { orderApiSlice } from "./orderApiSlice";

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
}

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  [productApiSlice.reducerPath]: productApiSlice.reducer,
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { warnAfter: 128 },
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,],
        
      // },
    }).concat([userApiSlice.middleware, categoryApiSlice.middleware, productApiSlice.middleware, orderApiSlice.middleware]),
});

export const persistor = persistStore(store);
