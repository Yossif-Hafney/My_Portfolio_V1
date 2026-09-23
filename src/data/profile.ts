export const profile = {
  name: "Yossif Hafney",
  firstName: "Yossif",
  role: "Frontend Developer",
  email: "eng.yossifhafney@gmail.com",
  phone: "+2001501883168",
  phoneDisplay: "+20 015 0188 3168",
  linkedin: "https://www.linkedin.com/in/yossifhafney/",
  github: "https://github.com/Yossif-Hafney/",
  location: "Available worldwide",
} as const;

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "Core languages I use every day",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "Java"],
  },
  {
    title: "Frameworks",
    description: "Building modern web apps",
    items: ["React", "Next.js", "Vue", "Nuxt.js"],
  },
  {
    title: "Computer Science",
    description: "Foundations behind the UI",
    items: ["OOP", "Data Structures", "Databases", "Networks"],
  },
];

export const featuredSkills = [
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Vue",
  "Nuxt.js",
  "Java",
  "OOP",
  "Data Structures",
  "Databases",
  "Networks",
];
