import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import ButtonComponent from "./Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="py-2 px-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl relative">
        <div
          className="flex justify-between items-center p-3 sm:p-4 bg-transparent
         text-white border border-slate-800/60 shadow-sm rounded-lg backdrop-blur-sm
         hover:border-slate-700/80 hover:shadow-md hover:shadow-blue-500/10 
         transition-all duration-300"
        >
          {/* Logo */}
          <div className="logo group">
            <Link
              to="/"
              className="relative inline-flex items-center cursor-pointer text-xl sm:text-2xl font-black
             tracking-tight text-slate-100 select-none
             transition-all duration-500 hover:scale-110 transform"
            >
              <div className="relative overflow-hidden rounded-lg px-3 py-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse opacity-50"></div>
                <span className="relative z-10 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-500 bg-clip-text text-transparent font-extrabold">
                  H
                </span>
                <span className="relative z-10 text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-500 font-bold">
                  afney
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex pages">
            <ul className="flex items-center gap-1 lg:gap-3">
              {routes.map((route) => (
                <li key={route.name}>
                  <Link
                    to={route.path}
                    className={`relative inline-block px-2 lg:px-3 py-2 text-sm lg:text-base
                     rounded-lg text-slate-300 hover:text-white transition-all duration-300
                     hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60
                     hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 transform
                     group overflow-hidden ${
                       route.path !== "/"
                         ? "[&.active]:text-white [&.active]:bg-gradient-to-r [&.active]:from-blue-600/20 [&.active]:to-purple-600/20 [&.active]:border [&.active]:border-blue-500/30"
                         : ""
                     }`}
                  >
                    <span className="relative z-10">{route.name}</span>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg
             text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60
             focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300
             hover:scale-110 transform hover:shadow-lg hover:shadow-blue-500/10"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="h-6 w-6 flex flex-col justify-center items-center">
              {isMenuOpen ? (
                <span className="text-2xl font-light leading-none transition-transform duration-200 hover:rotate-90">
                  ×
                </span>
              ) : (
                <div className="space-y-1 transition-all duration-200">
                  <div className="w-5 h-0.5 bg-current transform transition-all duration-200 group-hover:w-6"></div>
                  <div className="w-5 h-0.5 bg-current transform transition-all duration-200"></div>
                  <div className="w-5 h-0.5 bg-current transform transition-all duration-200 group-hover:w-6"></div>
                </div>
              )}
            </div>
          </button>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <ButtonComponent
              title="Get in Touch"
              onClick={() => navigate({ to: "/contact" })}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 z-50 animate-in slide-in-from-top-5 duration-300">
            <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800/60 rounded-xl shadow-2xl shadow-blue-500/10 p-4">
              <ul className="space-y-2">
                {routes.map((route, index) => (
                  <li
                    key={route.name}
                    className="animate-in slide-in-from-left-5 duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link
                      to={route.path}
                      className={`relative block px-4 py-3 text-base rounded-lg text-slate-300
                       hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60
                       transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-blue-500/10
                       group overflow-hidden ${
                         route.path !== "/"
                           ? "[&.active]:text-white [&.active]:bg-gradient-to-r [&.active]:from-blue-600/20 [&.active]:to-purple-600/20 [&.active]:border [&.active]:border-blue-500/30"
                           : ""
                       }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10">{route.name}</span>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-700 animate-in slide-in-from-bottom-5 duration-300 delay-200">
                <ButtonComponent
                  title="Get in Touch"
                  onClick={() => {
                    navigate({ to: "/contact" });
                    setIsMenuOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
