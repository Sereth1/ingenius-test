import { Course } from "@/types/courseTypes";
const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development, covering HTML, CSS, and JavaScript.",
    price: 20.99,
    image: "/images/web.png",
    modules: [
      {
        title: "HTML Basics",
        lessons: [
          {
            title: "Understanding HTML Structure",
            description: "Learn about HTML tags and document structure",
            topics: ["HTML tags", "Document structure", "Semantic HTML"],
            content: [
              {
                type: "text",
                data: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
              },
              {
                type: "video",
                data: "https://example.com/intro-to-html-video",
              },
            ],
          },
          {
            title: "Working with Forms",
            description: "Create and style HTML forms",
            topics: ["Form elements", "Input types", "Form validation"],
            content: [
              {
                type: "text",
                data: "HTML forms are used to collect user input. Learn how to create effective and accessible forms.",
              },
              {
                type: "audio",
                data: "https://example.com/html-forms-audio",
              },
            ],
          },
        ],
      },
      {
        title: "CSS Fundamentals",
        lessons: [
          {
            title: "CSS Selectors and Properties",
            description: "Master CSS selectors and common properties",
            topics: ["Selectors", "Box model", "Colors and typography"],
            content: [
              {
                type: "text",
                data: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
              },
              {
                type: "video",
                data: "https://example.com/css-selectors-video",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Programming",
    description:
      "Dive into JavaScript programming and learn to create interactive web applications.",
    price: 9.99,
    image: "/images/js.png",
    modules: [
      {
        title: "JavaScript Basics",
        lessons: [
          {
            title: "Variables and Data Types",
            description: "Understand JavaScript variables and basic data types",
            topics: ["Variables", "Data types", "Operators"],
            content: [
              {
                type: "text",
                data: "JavaScript is a programming language that enables interactive web pages.",
              },
              {
                type: "podcast",
                data: "https://example.com/js-basics-podcast",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "React Fundamentals",
    description:
      "Learn the basics of React, a popular JavaScript library for building user interfaces.",
    price: 69.99,
    image: "/images/react.png",
    modules: [
      {
        title: "Introduction to React",
        lessons: [
          {
            title: "Components and Props",
            description: "Understand React components and how to use props",
            topics: ["React components", "Props", "JSX"],
            content: [
              {
                type: "text",
                data: "React is a JavaScript library for building user interfaces, particularly single-page applications.",
              },
              {
                type: "video",
                data: "https://example.com/react-components-video",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Python for Beginners",
    description:
      "Start your programming journey with Python, a versatile and beginner-friendly language.",
    price: 39.99,
    image: "/images/python.png",
    modules: [
      {
        title: "Python Basics",
        lessons: [
          {
            title: "Variables and Data Structures",
            description:
              "Learn about Python variables and basic data structures",
            topics: ["Variables", "Lists", "Dictionaries"],
            content: [
              {
                type: "text",
                data: "Python is a high-level, interpreted programming language known for its simplicity and readability.",
              },
              {
                type: "audio",
                data: "https://example.com/python-basics-audio",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Data Science Essentials",
    description:
      "Explore the fundamentals of data science, including statistics and machine learning.",
    price: 79.99,
    image: "/images/data.png",
    modules: [
      {
        title: "Introduction to Statistics",
        lessons: [
          {
            title: "Descriptive Statistics",
            description:
              "Learn about measures of central tendency and dispersion",
            topics: ["Mean", "Median", "Standard deviation"],
            content: [
              {
                type: "text",
                data: "Statistics is the science of collecting, analyzing, and interpreting data.",
              },
              {
                type: "podcast",
                data: "https://example.com/stats-basics-podcast",
              },
            ],
          },
        ],
      },
    ],
  },
];
export { courses };
export type { Course };
