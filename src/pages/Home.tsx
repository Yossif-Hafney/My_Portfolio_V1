import { useNavigate } from "@tanstack/react-router";
import Projects from "./Projects";
import ButtonComponent from "../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="landing container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 mt-8 sm:mt-10 lg:mt-16">
        <div className="w-full lg:w-1/2 xl:w-5/12 space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white text-center lg:text-left uppercase font-bold leading-tight">
            Hi, I am Yossif
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:text-left leading-relaxed text-gray-300 max-w-2xl mx-auto lg:mx-0">
            I am a Frontend Developer
          </p>
          <div className="flex justify-center lg:justify-start pt-4 sm:pt-6">
            <ButtonComponent
              title="Get In Touch"
              variant="primary"
              onClick={() => navigate({ to: "/contact" })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6
             sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200
              shadow-lg hover:shadow-xl"
            ></ButtonComponent>
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-7/12 flex justify-center lg:justify-end">
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
            src="/images/landing.svg"
            alt="Landing image"
            loading="lazy"
          />
        </div>
      </section>
      <div className="projects">
        <Projects limit={6} showFilters={false} />
      </div>
    </>
  );
}
