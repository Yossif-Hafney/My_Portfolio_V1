import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ProjectSectionHeaderProps = {
  showFilters: boolean;
  query: string;
  setQuery: (query: string) => void;
  branch: string;
  setBranch: (branch: string) => void;
  branches: string[];
};

export default function ProjectSectionHeader({
  showFilters,
  query,
  setQuery,
  branch,
  setBranch,
  branches,
}: ProjectSectionHeaderProps) {
  if (!showFilters) {
    return (
      <div className="text-center mt-24 mb-16">
        <div className="relative inline-block group">
          <div
            className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-800/30 rounded-3xl blur-xl opacity-40
         group-hover:opacity-60 transition-all duration-1000 animate-pulse"
          ></div>
          <div
            className="relative bg-slate-900/40 backdrop-blur-sm border border-slate-700/50
         rounded-3xl p-8 shadow-2xl"
          >
            <div className="mb-6">
              <h2
                className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-300
           via-purple-300 to-blue-500 bg-clip-text text-transparent mb-4 leading-tight tracking-tight"
              >
                Featured Projects
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-500 bg-clip-text text-transparent mb-3 tracking-tight">
          Projects Portfolio
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Explore my diverse range of projects across different technologies and
          domains
        </p>
        <div className="mt-4 h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch gap-4">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg"
          />
          {!query && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200 pointer-events-none">
              <FontAwesomeIcon
                icon={faSearchengin}
                className="text-lg sm:text-xl md:text-2xl transition-transform group-hover:scale-110"
              />
            </span>
          )}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              ×
            </button>
          )}
        </div>

        {/* Branch Filter */}
        <div className="lg:w-80 flex items-center gap-3">
          <div className="relative group flex-1">
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full appearance-none px-6 py-4 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl text-slate-100 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-lg cursor-pointer"
            >
              <option value="" className="bg-slate-900">
                All Categories
              </option>
              {branches.map((b) => (
                <option key={b} value={b} className="bg-slate-900">
                  {b}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {branch && (
            <button
              type="button"
              onClick={() => setBranch("")}
              className="shrink-0 px-3 py-2 text-xs font-medium rounded-lg border border-purple-400/40 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/60 transition-colors duration-200"
              aria-label="Clear category"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
