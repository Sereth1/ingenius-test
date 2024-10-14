"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Module {
  title: string;
}

interface Course {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  modules: Module[];
}

interface Props {
  filteredCourses: Course[] | undefined;
}

export default function CoursesList({ filteredCourses }: Props) {
  const router = useRouter();
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);

  function handleCourseClick(id: number) {
    router.push(`/courses/${id}`);
  }

  function toggleReadMore(courseId: number) {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  }

  return (
    <div className="mt-10 p-10">
      {filteredCourses && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`border p-6 rounded-lg bg-white shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between`}
              style={{
                minHeight: "500px",
                height: expandedCourseId === course.id ? "auto" : "400px",
                overflow: "hidden",
              }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black">
                  {course.title}
                </h2>
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full"
                    width={400}
                    height={250}
                  />
                </div>
                <p className="text-black mb-2">Price: ${course.price}</p>
                <p className="text-black mb-4">
                  {expandedCourseId === course.id
                    ? course.description
                    : `${course.description}`}
                </p>
                {expandedCourseId === course.id && (
                  <div className="bg-gray-100 p-10 rounded-lg mt-4 ">
                    <h3 className="text-lg font-semibold mb-2 text-black">
                      Learn:
                    </h3>
                    <ul className="list-disc list-inside ml-4">
                      {course.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex} className="text-black">
                          {module.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => toggleReadMore(course.id)}
                  className="text-blue-500 underline hover:text-blue-700 mb-10"
                >
                  {expandedCourseId === course.id ? "Show Less" : "Read More"}
                </button>
              </div>
              <button
                onClick={() => handleCourseClick(course.id)}
                className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors w-full"
              >
                Go to Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
