import { skillGroups } from "../data/profile";
import SkillBadge from "./SkillIcon";

type SkillsGridProps = {
  compact?: boolean;
};

export default function SkillsGrid({ compact = false }: SkillsGridProps) {
  return (
    <section
      className={compact ? "py-12 sm:py-16" : "py-16 sm:py-20"}
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
          >
            Languages, frameworks, and CS
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Frontend-focused, with solid computer science foundations to ship
            reliable products.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-slate-700/60 bg-white/5 p-6 sm:p-7 backdrop-blur-sm
                hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {group.title}
              </h3>
              <p className="text-sm text-slate-400 mb-5">{group.description}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <SkillBadge name={skill} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
