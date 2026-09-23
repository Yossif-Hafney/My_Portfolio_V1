import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Projects from "./Projects";
import ButtonComponent from "../components/Button";
import SkillsGrid from "../components/SkillsGrid";
import SkillBadge from "../components/SkillIcon";
import { featuredSkills, profile } from "../data/profile";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        <div className="landing container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 mt-8 sm:mt-12 lg:mt-20 pb-8">
          <div className="w-full lg:w-1/2 xl:w-5/12 space-y-5 sm:space-y-6">
            <p className="text-center lg:text-left text-sky-300 font-medium tracking-wide">
              Frontend Developer
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white text-center lg:text-left font-bold leading-tight">
              Hi, I am {profile.firstName}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-center lg:text-left leading-relaxed text-slate-300 max-w-2xl mx-auto lg:mx-0">
              I build fast, accessible web apps with TypeScript, React, Next.js,
              Vue, and Nuxt.js — backed by OOP, data structures, databases, and
              networks.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {featuredSkills.slice(0, 8).map((skill) => (
                <SkillBadge key={skill} name={skill} size="sm" />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <ButtonComponent
                title="Get In Touch"
                variant="primary"
                onClick={() => navigate({ to: "/contact" })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6
             sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200
              shadow-lg hover:shadow-xl"
              />
              <button
                type="button"
                onClick={() => navigate({ to: "/projects" })}
                className="inline-flex items-center gap-2 px-6 py-3 text-slate-200 hover:text-white
                  border border-slate-600/80 hover:border-sky-400/60 rounded-xl transition-colors"
              >
                View projects
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-7/12 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto drop-shadow-2xl"
              src="/images/landing.svg"
              alt="Developer illustration"
              loading="eager"
            />
          </div>
        </div>
      </section>
      <SkillsGrid compact />
      <div className="projects">
        <Projects limit={6} showFilters={false} />
      </div>
    </>
  );
}
