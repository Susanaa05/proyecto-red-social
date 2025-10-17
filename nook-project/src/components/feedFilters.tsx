import { useState } from "react";
import { TrendingUp, MapPin } from "lucide-react";

const FeedFilters = () => {
  const [active, setActive] = useState("following");

  const baseButton =
    "flex items-center justify-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base flex-shrink-0";

  const getButtonClass = (type: string) =>
    active === type
      ? "bg-[#7C6AA6] text-white shadow-sm"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="w-full flex justify-center mt-4 lg:justify-start">
      <div
        className="
          flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide
          w-full max-w-full px-1
        "
      >
        <button
          onClick={() => setActive("following")}
          className={`${baseButton} ${getButtonClass("following")}`}
        >
          Following
        </button>

        <button
          onClick={() => setActive("trending")}
          className={`${baseButton} ${getButtonClass("trending")}`}
        >
          <TrendingUp size={18} />
          Trending
        </button>

        <button
          onClick={() => setActive("near")}
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
