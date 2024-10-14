"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import CoursesCarousel from "../common/CoursesCarousel";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeHero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      const text = titleRef.current.querySelectorAll(".letter");
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: "-90%", opacity: 0, visibility: "hidden" },
        {
          y: 0,
          visibility: "visible",
          opacity: 1,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen p-10 relative z-10 bg-black text-white">
        <div ref={titleRef}>
          <h1 className="text-4xl font-bold text-center mb-4">
            {"Explore Your Path to Learning".split(" ").map((char, index) => (
              <div key={index} className="letter inline-block mr-2 ">
                {char}
              </div>
            ))}
          </h1>
          <h2 className="text-2xl text-center">
            {"Choose from a variety of courses that help you build your skills step by step."
              .split(" ")
              .map((word, index) => (
                <span key={index} className="letter inline-block mr-1">
                  {word}
                </span>
              ))}
          </h2>
        </div>
      </div>

      <div
        ref={cardRef}
        style={{ visibility: "hidden" }}
        className="absolute top-0 left-0 w-full min-h-screen flex flex-col items-center justify-center bg-gray-500 text-white p-10 z-20"
      >
        <h1 className="text-4xl font-bold mb-4">Find your Course</h1>
        <CoursesCarousel />
      </div>
    </div>
  );
}
