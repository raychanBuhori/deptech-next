import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import { employeeApi } from "@/modules/employees/services/employeesApiSlice";
import { usersApi } from "@/modules/users/services/usersApiSlice";
import { employeeLeavesApi } from "@/modules/employees/services/employeeLeaveApiSlice";

import currentUserReducer from "@/modules/users/store/currentUserSlice";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [employeeLeavesApi.reducerPath]: employeeLeavesApi.reducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currentUser"] // Only persist the currentUser slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      employeeApi.middleware,
      usersApi.middleware,
      employeeLeavesApi.middleware
    )
});

export const persistor = persistStore(store);

// Optional: if using TypeScript, you can export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
