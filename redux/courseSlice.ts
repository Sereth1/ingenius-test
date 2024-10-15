"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "@/data/course";

interface CoursesState {
  courses: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  status: "idle",
  error: null,
};

export const fetchAllCourses = createAsyncThunk("fetchCourses", async () => {
  const response = await fetch("/api/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const data = await response.json();
  return data;
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetCourses(state) {
      state.courses = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCourses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.courses = action.payload;
    });
    builder.addCase(fetchAllCourses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to load courses";
    });
  },
});

export const { resetCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
