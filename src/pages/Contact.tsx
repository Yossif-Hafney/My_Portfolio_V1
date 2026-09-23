import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/profile";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio message from ${name.trim() || "visitor"}`
    );
    const mailBody = encodeURIComponent(
      `${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`
    );
    window.location.href = `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let&apos;s collaborate and
              create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 
                shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-3"></span>
                  Send a Message
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
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
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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

            <div className="space-y-6">
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 
                shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full mr-3"></span>
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center space-x-3 rounded-lg p-1 -m-1 hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300 text-sm break-all">
                        {profile.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center space-x-3 rounded-lg p-1 -m-1 hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-300 text-sm">{profile.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-300 text-sm">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 
                shadow-xl hover:shadow-green-500/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-green-400 to-teal-600 rounded-full mr-3"></span>
                  Connect
                </h3>

                <div className="space-y-3">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-2 text-blue-400 font-medium">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </span>
                    <span className="text-blue-400 transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-2 text-purple-400 font-medium">
                      <Github className="w-4 h-4" />
                      GitHub
                    </span>
                    <span className="text-purple-400 transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>

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
                  Currently accepting new projects and collaborations. Let&apos;s
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
