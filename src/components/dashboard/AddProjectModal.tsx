import { useState } from "react";
import { X, Upload, Globe, Github, Folder, Tag, Plus } from "lucide-react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: NewProject) => void;
}

export interface NewProject {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  technologies: string[];
  status: "in-progress" | "completed" | "planning";
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: AddProjectModalProps) {
  const [formData, setFormData] = useState<NewProject>({
    title: "",
    description: "",
    tags: [],
    github: "",
    demo: "",
    image: "",
    technologies: [],
    status: "planning",
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentTech, setCurrentTech] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    onSubmit(formData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      tags: [],
      github: "",
      demo: "",
      image: "",
      technologies: [],
      status: "planning",
    });
    setCurrentTag("");
    setCurrentTech("");
    onClose();
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addTechnology = () => {
    if (
      currentTech.trim() &&
      !formData.technologies.includes(currentTech.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, currentTech.trim()],
      }));
      setCurrentTech("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Plus className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New Project</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe your project..."
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as NewProject["status"],
                }))
              }
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Github className="w-4 h-4 inline mr-1" />
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, github: e.target.value }))
                }
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Live Demo URL
              </label>
              <input
                type="url"
                value={formData.demo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, demo: e.target.value }))
                }
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://project-demo.com"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Project Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
              }
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/project-image.jpg"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-blue-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Folder className="w-4 h-4 inline mr-1" />
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentTech}
                onChange={(e) => setCurrentTech(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTechnology())
                }
                className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., React, TypeScript, Node.js..."
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-1 hover:text-emerald-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim() || !formData.description.trim()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
