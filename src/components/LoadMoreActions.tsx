type LoadMoreActionsProps = {
  showFilters: boolean;
  canLoadMore: boolean;
  filteredCount: number;
  onLoadMore: () => void;
};

export default function LoadMoreActions({
  showFilters,
  canLoadMore,
  onLoadMore,
}: LoadMoreActionsProps) {
  // Only show load more for projects page (when filters are enabled)
  if (!showFilters || !canLoadMore) return null;

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <button
        onClick={onLoadMore}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95 overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative flex items-center space-x-2">
          <span>Load More Projects</span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
