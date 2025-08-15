import { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Play,
  Eye,
  Share2,
  Bookmark,
} from "lucide-react";
import { Loading, ErrorState, Toast } from "../components";
import { useProject } from "../hooks";

// using the typed hook useProject for data fetching

export default function ProjectDetails() {
  const { projectid: projectId } = useParams({ from: "/projects/$projectid" });
  const navigate = useNavigate();
  const { project, loading, error } = useProject(projectId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const goBackToProjects = () => {
    try {
      const hasSaved = sessionStorage.getItem("projects:listState");
      if (hasSaved && window.history.length > 1) {
        window.history.back();
        return;
      }
    } catch (e) {
      if (import.meta.env.DEV) console.debug("history/back fallback", e);
    }
    navigate({ to: "/projects" });
  };

  // Reset gallery index when project changes
  useEffect(() => {
    setSelectedImage(0);
  }, [project?.id]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
      } catch (e) {
        console.error("Clipboard failed:", e);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/15 text-green-300 border-green-500/30";
      case "in production":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "in development":
        return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-slate-800/60 text-slate-300 border-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in production":
        return <Play className="w-4 h-4" />;
      case "in development":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return <Loading label="Loading project details..." fullscreen />;
  }

  if (error || !project) {
    return (
      <ErrorState
        title="Project Not Found"
        message={error || "The project you are looking for does not exist."}
        actionLabel="Back to Projects"
        onAction={goBackToProjects}
        fullscreen
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0d2438]">
      <Toast
        message="Link copied to clipboard"
        show={copiedToast}
        onClose={() => setCopiedToast(false)}
      />
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goBackToProjects}
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors border ${
                  isBookmarked
                    ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/25"
                    : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-700/60"
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700 hover:bg-slate-700/60 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-slate-300">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Live Demo
                </a>
                {project.sourceCode !== "Private Repository" && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Status and Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div
                className={`flex items-center px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}
              >
                {getStatusIcon(project.status)}
                <span className="ml-2 font-medium">{project.status}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Calendar className="w-4 h-4 mr-2" />
                {project.startDate} - {project.endDate}
              </div>
              <div className="flex items-center text-slate-300">
                <User className="w-4 h-4 mr-2" />
                {project.client}
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Project Gallery
            </h2>
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-800">
                <img
                  src={project.gallery[selectedImage]}
                  alt={`${project.title} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {project.gallery.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {project.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 ring-2 ring-blue-500/30"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Project
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {project.branches.map((branch, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium"
                  >
                    {branch}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Actions */}
            <div className="bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Live Site
                </a>
                {project.sourceCode !== "Private Repository" && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-slate-700 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-12 bg-[#13283a] border border-slate-800/60 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">More Projects</h2>
          <div className="text-center">
            <p className="text-slate-300 mb-4">Explore more of my work</p>
            <button
              onClick={goBackToProjects}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View All Projects
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
