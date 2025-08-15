export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's collaborate and create
              something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 
                shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-3"></span>
                  Send a Message
                </h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-3"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/60 rounded-xl 
                          text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 
                          focus:border-blue-500/70 transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-3"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/60 rounded-xl 
                          text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 
                          focus:border-blue-500/70 transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-3"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/60 rounded-xl 
                        text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 
                        focus:border-blue-500/70 transition-all duration-200"
                      placeholder="Project discussion, collaboration, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-3"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/60 rounded-xl 
                        text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 
                        focus:border-blue-500/70 transition-all duration-200 resize-none"
                      placeholder="Tell me about your project, ideas, or how we can work together..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                      text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 
                      hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 
                shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full mr-3"></span>
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-sm">📧</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300 text-sm">
                        eng.yossifhafney@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-sm">🌍</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-300 text-sm">
                        Available worldwide
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Response Time</p>
                      <p className="text-gray-300 text-sm">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 
                shadow-xl hover:shadow-green-500/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-green-400 to-teal-600 rounded-full mr-3"></span>
                  Connect
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      name: "LinkedIn",
                      url: "https://www.linkedin.com/in/yossif-hafney-22174533b/",
                      text: "text-blue-400",
                      bg: "bg-blue-500/10",
                      border: "border-blue-500/20",
                      hoverBg: "hover:bg-blue-500/20",
                    },
                    {
                      name: "GitHub",
                      url: "https://github.com/Yossif-Hafney/",
                      text: "text-purple-400",
                      bg: "bg-purple-500/10",
                      border: "border-purple-500/20",
                      hoverBg: "hover:bg-purple-500/20",
                    },
                    {
                      name: "Twitter",
                      url: "https://x.com/youssefhafney",
                      text: "text-cyan-400",
                      bg: "bg-cyan-500/10",
                      border: "border-cyan-500/20",
                      hoverBg: "hover:bg-cyan-500/20",
                    },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${s.name} in a new tab`}
                      title={s.name}
                      className={[
                        "flex items-center justify-between p-3 rounded-lg transition-all duration-200 group",
                        "border focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-slate-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                        s.bg,
                        s.border,
                        s.hoverBg,
                      ].join(" ")}
                    >
                      <span className={`${s.text} font-medium`}>{s.name}</span>
                      <span
                        className={`${s.text} transform group-hover:translate-x-1 transition-transform`}
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div
                className="bg-gradient-to-br from-green-500/10 to-teal-600/10 backdrop-blur-sm 
                rounded-2xl p-6 border border-green-500/20 shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold text-white">
                    Available for Work
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Currently accepting new projects and collaborations. Let's
                  discuss your ideas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
