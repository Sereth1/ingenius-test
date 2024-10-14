"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course, courses as mockCourses } from "@/data/course"; // Adjust the path to your data file

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

export const fetchAllCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    return new Promise<Course[]>((resolve) => resolve(mockCourses));
  }
);

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
