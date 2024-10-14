"use client";
import CoursesList from "@/components/common/CourseList";
import SearchBar from "@/components/forms/SearchBar";
import useFetchCourses from "@/hooks/useFetchCourses";
import React, { useState } from "react";
import { Course } from "@/types/courseTypes";

export default function Page() {
  const { courses } = useFetchCourses();

  const [result, setResult] = useState<Course[] | undefined>(undefined);

  console.log(result);

  return (
    <div>
      <SearchBar courses={courses} setFilteredResults={setResult} />

      <CoursesList filteredCourses={result} />
    </div>
  );
}
