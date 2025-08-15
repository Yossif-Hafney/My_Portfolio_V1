import { Link } from "@tanstack/react-router";

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
        className="group h-full flex flex-col bg-[#13283a] border border-gray-700/60 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
      >
        <img
          className="w-full h-48 object-cover"
          src={image}
          alt={title}
          loading="lazy"
        />
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-300/90 text-sm mb-4 line-clamp-3 flex-1">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs"
                >
                  {tag}
                </span>
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
