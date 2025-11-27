import { useState } from "react";
import { TrendingUp, MapPin } from "lucide-react";

interface FeedFiltersProps {
  onFilterChange?: (filter: string) => void;
}

/**
 * FeedFilters Component
 * Displays buttons to filter the feed: Following, Trending, Near.
 */
const FeedFilters = ({ onFilterChange }: FeedFiltersProps) => {
  // Tracks the currently active filter
  const [active, setActive] = useState("following");

  // Base styles for all buttons
  const baseButton =
    "flex items-center justify-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base flex-shrink-0";

  // Returns styles depending on which button is active
  const getButtonClass = (type: string) =>
    active === type
      ? "bg-[#7C6AA6] text-white shadow-sm"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  // Handles filter selection and triggers the callback
  const handleClick = (type: string) => {
    setActive(type);
    onFilterChange?.(type);
  };

  return (
    <div className="w-full flex justify-center mt-4 lg:justify-start">
      {/* Buttons container */}
      <div
        className="
          flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide
          w-full max-w-full px-1
        "
      >
        {/* Following button */}
        <button
          onClick={() => handleClick("following")}
          className={`${baseButton} ${getButtonClass("following")}`}
        >
          Following
        </button>

        {/* Trending button */}
        <button
          onClick={() => handleClick("trending")}
          className={`${baseButton} ${getButtonClass("trending")}`}
        >
          <TrendingUp size={18} />
          Trending
        </button>

        {/* Near button */}
        <button
          onClick={() => handleClick("near")}
          className={`${baseButton} ${getButtonClass("near")}`}
        >
          <MapPin size={18} />
          Near
        </button>
      </div>
    </div>
  );
};

export default FeedFilters;
