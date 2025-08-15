type ProjectResultsSummaryProps = {
  showFilters: boolean;
  isFiltering: boolean;
  displayedCount: number;
  filteredCount: number;
  totalCount: number;
  resetFilters: () => void;
};

export default function ProjectResultsSummary({
  showFilters,
  isFiltering,
  displayedCount,
  filteredCount,
  totalCount,
  resetFilters,
}: ProjectResultsSummaryProps) {
  // Only show when filters are enabled and filtering is active
  if (!showFilters || !isFiltering) return null;

  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-slate-700/30 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
      <div className="relative flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-75"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-150"></div>
          </div>
          <div className="text-slate-300 text-sm">
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Showing {displayedCount} of {filteredCount}
            </span>{" "}
            <span className="text-slate-300">filtered results</span>{" "}
            <span className="text-slate-500 text-xs">({totalCount} total)</span>
          </div>
        </div>

        {isFiltering && (
          <button
            type="button"
            onClick={resetFilters}
            className="group relative inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-lg hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            <svg
              className="w-3 h-3 mr-1.5 transition-transform duration-300 group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
