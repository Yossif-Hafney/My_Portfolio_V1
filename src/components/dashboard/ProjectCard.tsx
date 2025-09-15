import { Eye, Edit, Trash2, ExternalLink } from "lucide-react";

interface Project {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  onView: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number, title: string) => void;
}

export default function ProjectCard({
  project,
  onView,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 group">
      {/* Project Image */}
      {project.image && (
        <div className="w-full h-32 rounded-lg overflow-hidden mb-4 bg-slate-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 flex-1 mr-3">
          {project.title}
        </h4>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onView(project.id)}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors group/btn"
            title="View Project"
          >
            <Eye className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => onEdit(project.id)}
            className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-colors group/btn"
            title="Edit Project"
          >
            <Edit className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => onDelete(project.id, project.title)}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors group/btn"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4 text-red-400 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-slate-500/20 text-slate-300 border border-slate-500/30 rounded text-xs">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Quick View Button */}
      <button
        onClick={() => onView(project.id)}
        className="w-full flex items-center justify-center gap-2 py-2 bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 hover:text-white rounded-lg transition-all duration-200 group/view"
      >
        <ExternalLink className="w-4 h-4 group-hover/view:scale-110 transition-transform" />
        <span className="font-medium">View Project</span>
      </button>
    </div>
  );
}
