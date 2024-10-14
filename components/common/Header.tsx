"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useRef, useEffect } from "react";

export default function Header() {
  const start = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (start.current) {
      gsap.fromTo(
        start.current,
        { y: -300, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }
  }, []);

  return (
    <div ref={start} className="bg-black shadow-md py-4 px-6">
      <div className="grid md:flex items-center justify-between">
        <Link href="/" passHref>
          <div className="pb-2 md:pb-0 text-center font-bold text-xl text-white cursor-pointer hover:opacity-80 transition-opacity duration-300">
            MyLogo
          </div>
        </Link>

        <div className="flex-1 flex justify-center">
          <div className="flex space-x-10">
            <Link href="/" passHref>
              <div
                className="text-white cursor-pointer rounded-full px-4 py-2 hover:bg-slate-100 hover:text-black transition-all duration-300"
                aria-label="Home"
              >
                Home
              </div>
            </Link>
            <Link href="/find-your-course" passHref>
              <div
                className="text-white cursor-pointer rounded-full px-4 py-2 hover:bg-slate-100 hover:text-black transition-all duration-300"
                aria-label="Courses"
              >
                Courses
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
