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
    <div className="m-10">
      <div className="border flex bg-purple-500 p-6 rounded-full justify-between items-center gap-5">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-white">StarCourse</h1>
        </div>

        <form
          action="submit"
          className="flex items-center gap-4 text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="rounded-xl p-3 w-[600px] border border-gray-400"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
            className="rounded-xl p-2 border border-gray-400 bg-white"
          >
            <option value="">Sort By</option>
            <option value="increasing">Increasing Price</option>
            <option value="decreasing">Decreasing Price</option>
          </select>

          <label htmlFor="priceRange" className="sr-only">
            Price Range
          </label>
          <select
            id="priceRange"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-xl p-2 border border-gray-400 bg-white"
          >
            <option value="">Price Range</option>
            <option value="10">Up to $10</option>
            <option value="20">Up to $20</option>
            <option value="30">Up to $30</option>
            <option value="50">$50+</option>
          </select>

          <button
            type="submit"
            className="rounded-xl p-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Surprise Me
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl p-3 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 ml-4"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
