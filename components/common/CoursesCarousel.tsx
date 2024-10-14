import React, { useState } from "react";
import Image from "next/image";
import useFetchCourses from "@/hooks/useFetchCourses";
import { useRouter } from "next/navigation";

export default function CoursesCarousel() {
  const { courses, status, error } = useFetchCourses();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handlePrevious = () => {
    if (status === "succeeded") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.max(courses.length - 1, 0) : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (status === "succeeded") {
      setCurrentIndex((prevIndex) =>
        prevIndex >= courses.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleCourseClick = (courseId: number) => {
    router.push(`/courses/${courseId}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error fetching courses</div>
    );
  }

  if (status === "succeeded" && courses.length === 0) {
    return <div className="text-center">No courses available</div>;
  }

  const itemsToShow = window.innerWidth < 768 ? 1 : 3;
  const currentCourses = courses.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevious}
          className="text-lg text-gray-600 hover:text-gray-900"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="text-lg text-gray-600 hover:text-gray-900"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCourseClick(course.id)}
          >
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
