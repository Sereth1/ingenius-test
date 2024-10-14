"use client";
import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "@/redux/courseSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
