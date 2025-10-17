import { useState } from "react";
import { TrendingUp, MapPin } from "lucide-react";

const FeedHeader = () => {
  const [active, setActive] = useState("following");

  const baseButton =
    "flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all";
  const getButtonClass = (type: string) =>
    active === type
      ? "bg-[#7C6AA6] text-white shadow-sm"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";

return (
  <div className="flex flex-col gap-5">
    <h1 className="text-[22px] font-extrabold text-black tracking-tight">
      MY FEED
    </h1>

    <div className="flex gap-3">
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
        <TrendingUp size={16} />
        Trending
      </button>

      <button
        onClick={() => setActive("near")}
        className={`${baseButton} ${getButtonClass("near")}`}
      >
        <MapPin size={16} />
        Near
      </button>
    </div>
  </div>
);
};

export default FeedHeader;