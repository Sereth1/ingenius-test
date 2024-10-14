"use client";
import { useParams } from "next/navigation";
import useFetchCourses from "@/hooks/useFetchCourses";
import React from "react";

export default function CourseDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const { courses, status, error } = useFetchCourses();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-4xl font-extrabold text-white animate-bounce">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-600">
        <div className="text-4xl font-extrabold text-white">Error: {error}</div>
      </div>
    );
  }

  if (status === "succeeded") {
    const course = courses.find(
      (course) => course.id === parseInt(id as string)
    );

    if (!course) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-600">
          <div className="text-4xl font-extrabold text-white">
            Course not found
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Image at the top */}
          <div className="relative h-80 bg-gradient-to-tr from-purple-700 to-pink-500">
            <img
              src={course.image || "/placeholder-image.jpg"}
              alt={course.title}
              className="absolute inset-0 object-cover w-full h-full opacity-70"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Course content */}
          <div className="p-10 space-y-6">
            <p className="text-xl text-gray-800 leading-relaxed">
              {course.description}
            </p>
            <p className="text-3xl font-bold text-green-600">
              Price: ${course.price}
            </p>

            <h2 className="text-3xl font-extrabold text-gray-800">Modules</h2>
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="mb-8">
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                  {module.title}
                </h3>
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="mb-6 p-6 bg-indigo-50 border-l-4 border-indigo-600 rounded-lg shadow-sm"
                  >
                    <h4 className="text-xl font-semibold text-indigo-800 mb-2">
                      Lesson: {lesson.title}
                    </h4>
                    <p className="text-gray-700 mb-4">{lesson.description}</p>
                    <h5 className="text-lg font-bold text-indigo-700">
                      Topics:
                    </h5>
                    <ul className="list-disc ml-6 text-gray-600 mb-4">
                      {lesson.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                    <h5 className="text-lg font-bold text-indigo-700">
                      Content:
                    </h5>
                    <div className="space-y-2">
                      {lesson.content.map((contentItem, contentIndex) => (
                        <div key={contentIndex}>
                          {contentItem.type === "text" && (
                            <p className="text-gray-800">{contentItem.data}</p>
                          )}
                          {contentItem.type === "video" && (
                            <a
                              href={contentItem.data}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline hover:text-blue-700"
                            >
                              Watch Video
                            </a>
                          )}
                          {contentItem.type === "audio" && (
                            <a
                              href={contentItem.data}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline hover:text-blue-700"
                            >
                              Listen to Audio
                            </a>
                          )}
                          {contentItem.type === "podcast" && (
                            <a
                              href={contentItem.data}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline hover:text-blue-700"
                            >
                              Listen to Podcast
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
