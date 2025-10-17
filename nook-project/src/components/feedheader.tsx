import { useEffect, useState } from "react";

const FeedHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      {isMobile ? (
        // ===== Vista mobile =====
        <div className="flex items-center gap-4 p-4 w-full max-w-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/60"
            alt="User"
            className="w-14 h-14 rounded-full object-cover border-2 border-purple-300"
          />
          <div>
            <h2 className="text-base font-semibold text-gray-900">Alex Smith</h2>
            <p className="text-gray-500 text-sm">What’s new?</p>
          </div>
        </div>
      ) : (
        // ===== Vista desktop =====
        <h1 className="text-[22px] font-extrabold text-black tracking-tight">
          MY FEED
        </h1>
      )}
    </div>
  );
};

export default FeedHeader;
