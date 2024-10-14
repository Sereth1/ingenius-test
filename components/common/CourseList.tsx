"use client";
import { Course } from "@/types/courseTypes";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import HeroMessage from "../coursesPage/HeroMessage";

interface Props {
  filteredCourses: Course[] | undefined;
}

export default function CoursesList({ filteredCourses }: Props) {
  const router = useRouter();
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);
  const coursesRef = useRef<HTMLDivElement[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapContextRef = useRef<any>(null);

  useGSAP(() => {
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
    }

    if (filteredCourses) {
      gsapContextRef.current = gsap.context(() => {
        gsap.from(coursesRef.current, {
          opacity: 0,
          y: 50,
          stagger: 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }

    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
      }
    };
  }, [filteredCourses]);

  function handleCourseClick(id: number) {
    router.push(`/courses/${id}`);
  }

  function toggleReadMore(courseId: number) {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  }

  return (
    <div className="mt-10 p-10">
      {!filteredCourses && <HeroMessage />}
      {filteredCourses && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              ref={(el) => {
                if (el) coursesRef.current[index] = el;
              }}
              className={`border p-6 rounded-lg bg-white shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between`}
              style={{
                minHeight: "500px",
                height: expandedCourseId === course.id ? "auto" : "500px",
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
