import SkillsGrid from "../components/SkillsGrid";
import SkillBadge from "../components/SkillIcon";
import { featuredSkills, profile } from "../data/profile";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Me
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I am {profile.name}, a frontend developer who ships clean,
              responsive interfaces and understands the systems behind them.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 
                shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-3"></span>
                  My Journey
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I specialize in modern frontend work with TypeScript,
                    JavaScript, HTML, and CSS. I build applications with React
                    and Next.js, and I also work with Vue and Nuxt.js when the
                    product needs that stack.
                  </p>
                  <p>
                    Alongside UI work, I keep a strong foundation in Java, OOP,
                    data structures, databases, and networks. That mix helps me
                    reason about APIs, performance, and how a frontend should
                    talk to the rest of the system.
                  </p>
                  <p>
                    I care about readable code, accessible layouts, and pages
                    that feel fast on real devices — not just in a design file.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-blue-500/20 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">Focus</h3>
                <p className="text-3xl font-bold text-blue-400 mb-1">
                  Frontend
                </p>
                <p className="text-gray-300 text-sm">
                  React, Next.js, Vue, Nuxt.js
                </p>
              </div>

              <div
                className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-purple-500/20 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Languages
                </h3>
                <p className="text-3xl font-bold text-purple-400 mb-1">TS / JS</p>
                <p className="text-gray-300 text-sm">Plus HTML, CSS, and Java</p>
              </div>

              <div
                className="bg-gradient-to-br from-green-500/10 to-teal-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-green-500/20 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Foundations
                </h3>
                <p className="text-3xl font-bold text-green-400 mb-1">CS</p>
                <p className="text-gray-300 text-sm">
                  OOP, DS, databases, networks
                </p>
              </div>
            </div>
          </div>

          <SkillsGrid compact />

          <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60">
            <h3 className="text-2xl font-bold text-white mb-6">All skills</h3>
            <div className="flex flex-wrap gap-2">
              {featuredSkills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full mr-3"></span>
              My Approach
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-1">
                  User-centered UI
                </h4>
                <p className="text-gray-300 text-sm">
                  Clear layouts, readable type, and interactions that make sense
                  on phone and desktop.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Clean code</h4>
                <p className="text-gray-300 text-sm">
                  Typed, maintainable components instead of one-off markup.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  Performance first
                </h4>
                <p className="text-gray-300 text-sm">
                  Fast loads and smooth navigation so the product feels solid.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  Continuous learning
                </h4>
                <p className="text-gray-300 text-sm">
                  Staying current with React, Vue, and the wider web platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
