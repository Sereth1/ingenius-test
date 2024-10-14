export type Content = {
  type: "text" | "video" | "audio" | "podcast";
  data: string;
};

export type Lesson = {
  title: string;
  description: string;
  topics: string[];
  content: Content[];
};

export type Module = {
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  modules: Module[];
};
