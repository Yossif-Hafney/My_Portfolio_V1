export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Me
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate Frontend Developer dedicated to crafting
              exceptional digital experiences through clean code and innovative
              design.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Introduction Card */}
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
                    I specialize in building modern, responsive web applications
                    using cutting-edge technologies. My passion lies in
                    transforming complex problems into simple, beautiful, and
                    intuitive solutions.
                  </p>
                  <p>
                    With a strong foundation in React, TypeScript, and modern
                    CSS frameworks, I create applications that not only look
                    great but also provide exceptional user experiences across
                    all devices and platforms.
                  </p>
                  <p>
                    I believe in writing clean, maintainable code and staying
                    up-to-date with the latest industry trends and best
                    practices. Every project is an opportunity to learn
                    something new and push the boundaries of what's possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div
                className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-blue-500/20 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Experience
                </h3>
                <p className="text-3xl font-bold text-blue-400 mb-1">3+</p>
                <p className="text-gray-300 text-sm">Years of Development</p>
              </div>

              <div
                className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-purple-500/20 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Projects
                </h3>
                <p className="text-3xl font-bold text-purple-400 mb-1">50+</p>
                <p className="text-gray-300 text-sm">Completed Projects</p>
              </div>

              <div
                className="bg-gradient-to-br from-green-500/10 to-teal-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-green-500/20 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Satisfaction
                </h3>
                <p className="text-3xl font-bold text-green-400 mb-1">100%</p>
                <p className="text-gray-300 text-sm">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 
              shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-blue-600 rounded-full mr-3"></span>
                Technical Skills
              </h3>
              <div className="space-y-4">
                {[
                  { name: "React & TypeScript", level: 95 },
                  { name: "Tailwind CSS", level: 90 },
                  { name: "JavaScript (ES6+)", level: 92 },
                  { name: "Responsive Design", level: 88 },
                  { name: "API Integration", level: 85 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach & Values */}
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 
              shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full mr-3"></span>
                My Approach
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      User-Centered Design
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Every decision prioritizes user experience and
                      accessibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Clean Code</h4>
                    <p className="text-gray-300 text-sm">
                      Writing maintainable, scalable code that stands the test
                      of time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Performance First
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Optimizing for speed and efficiency in every application.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Continuous Learning
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Staying current with evolving technologies and best
                      practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
