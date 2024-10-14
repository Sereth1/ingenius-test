import useFetchCourses from "@/hooks/useFetchCourses";
import Link from "next/link";
import React, { useState } from "react";

export default function Try() {
  const { courses, status, error } = useFetchCourses();
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);

  return (
    <div>
      {error && <div>{error}</div>}
      {status === "succeeded" &&
        courses.map((course) => (
          <div key={course.id}>
            <div>
              <h2>{course.id}</h2>
              <p>{course.description}</p>
              <div
                onClick={() =>
                  setActiveCourseId(
                    activeCourseId === course.id ? null : course.id
                  )
                }
              >
                Show more
              </div>
              <div
                className={`${activeCourseId !== course.id ? "hidden" : ""}`}
              >
                {course.modules.map((module) =>
                  module.lessons.map((lesson) => (
                    <div key={lesson.title}>
                      <h4>{lesson.title}</h4>
                      <p>{lesson.description}</p>
                    </div>
                  ))
                )}
              </div>
              {/* Add a link to the course details page */}
              <Link href={`/courses/${course.id}`}>
                <div>Read All</div>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
