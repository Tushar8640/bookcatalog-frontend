import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import bookReducer from "./features/books/bookSlice";
import authReducer from "./features/auth/authSlice";
const store = configureStore({
  reducer: {
    book: bookReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
