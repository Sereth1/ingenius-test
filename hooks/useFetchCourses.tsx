"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchAllCourses, resetCourses } from "@/redux/courseSlice";

const useFetchCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, status, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCourses());
    }
  }, [dispatch, status]);

  return {
    courses,
    status,
    error,
    resetCourses: () => dispatch(resetCourses()),
  };
};

export default useFetchCourses;
