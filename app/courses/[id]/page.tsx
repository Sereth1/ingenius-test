"use client";
import { useParams } from "next/navigation";
import useFetchCourses from "@/hooks/useFetchCourses";
import React from "react";

export default function CourseDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const { courses, status, error } = useFetchCourses();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (status === "succeeded") {
    const course = courses.find(
      (course) => course.id === parseInt(id as string)
    );

    if (!course) {
      return <div>Course not found</div>;
    }

    return (
      <div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <h2>Modules:</h2>
        {course.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <h3>{module.title}</h3>
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex}>
                <h4>Lesson: {lesson.title}</h4>
                <p>{lesson.description}</p>
                <h5>Topics:</h5>
                <ul>
                  {lesson.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>{topic}</li>
                  ))}
                </ul>
                <h5>Content:</h5>
                {lesson.content.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    {contentItem.type === "text" && <p>{contentItem.data}</p>}
                    {contentItem.type === "video" && (
                      <a
                        href={contentItem.data}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video
                      </a>
                    )}
                    {contentItem.type === "audio" && (
                      <a
                        href={contentItem.data}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Listen to Audio
                      </a>
                    )}
                    {contentItem.type === "podcast" && (
                      <a
                        href={contentItem.data}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Listen to Podcast
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
