/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { Course } from "@/types/courseTypes";
import React, { useState } from "react";

interface Props {
  courses?: Course[];
  setFilteredResults?: React.Dispatch<
    React.SetStateAction<Course[] | undefined>
  >;
}

export default function SearchBar({ courses, setFilteredResults }: Props) {
  const [value, setValue] = useState<string>("");
  const [sorting, setSorting] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let filteredCourses = courses ? [...courses] : [];

    if (query) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (value) {
      if (value === "50") {
        filteredCourses = filteredCourses.filter((course) => course.price > 50);
      } else {
        filteredCourses = filteredCourses.filter(
          (course) => course.price <= +value
        );
      }
    }

    if (sorting === "increasing") {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (sorting === "decreasing") {
      filteredCourses.sort((a, b) => b.price - a.price);
    }

    setFilteredResults && setFilteredResults(filteredCourses);
  }

  function handleReset() {
    setQuery("");
    setValue("");
    setSorting("");
    setFilteredResults && setFilteredResults(courses);
  }

  return (
    <div className="p-4">
      <div className="border bg-purple-500 p-6 rounded-lg justify-between items-center gap-4 flex flex-col md:flex-row">
        <h1 className="text-3xl md:text-4xl  font-bold text-white text-center mb-4 md:mb-0 pr-64">
          StarCourse
        </h1>

        <form
          className="flex flex-col gap-4 w-full md:flex-row md:items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="rounded-lg p-3 w-full md:w-[300px] lg:w-[500px] text-black border border-gray-400"
            placeholder="Search "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            id="sort"
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
            className="rounded-lg p-2 border border-gray-400 text-black w-full md:w-[150px]"
          >
            <option value="">Sort By</option>
            <option value="increasing">Increasing Price</option>
            <option value="decreasing">Decreasing Price</option>
          </select>

          <select
            id="priceRange"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-lg p-2 border border-gray-400 text-black w-full md:w-[150px]"
          >
            <option value="">Price Range</option>
            <option value="10">Up to $10</option>
            <option value="20">Up to $20</option>
            <option value="30">Up to $30</option>
            <option value="50">$50+</option>
          </select>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button
              type="submit"
              className="rounded-lg p-3 w-full md:w-auto border text-white font-semibold hover:bg-green-400 transition-all"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg p-3 w-full md:w-auto bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
