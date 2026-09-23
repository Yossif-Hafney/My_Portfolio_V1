import { Link } from "@tanstack/react-router";
import SkillBadge from "./SkillIcon";

interface ProjectCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  tags?: string[];
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export default function ProjectCard({
  id,
  image,
  title,
  description,
  tags,
  onClick,
  onMouseEnter,
}: ProjectCardProps) {
  return (
    <Link
      to="/projects/$projectid"
      params={{ projectid: id.toString() }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div
        id={`project-card-${id}`}
        className="group h-full flex flex-col bg-[#13283a] border border-gray-700/60 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1 hover:border-sky-500/40 cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={title}
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#13283a] via-transparent to-transparent opacity-70" />
        </div>
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-300/90 text-sm mb-4 line-clamp-3 flex-1">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tags.slice(0, 3).map((tag) => (
                <SkillBadge key={tag} name={tag} size="sm" />
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded text-xs">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
