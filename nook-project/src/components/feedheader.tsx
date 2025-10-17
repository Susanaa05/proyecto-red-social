import { useEffect, useState } from "react";

/**
 * FeedHeader Component
 * Displays the main header section of the feed.
 * It adapts its layout based on screen size (mobile or desktop).
 */
const FeedHeader = () => {
  // State that determines if the user is on a mobile screen
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /**
   * useEffect runs once when the component mounts.
   * It listens for window resizing to update the `isMobile` state dynamically.
   */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function removes the listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:gap-5">
      {isMobile ? (
        // ===== Mobile view =====
        // Shows a compact header with the user's profile picture and greeting
        <div className="flex items-center gap-4 p-4 w-full max-w-full overflow-hidden">
          {/* User profile image */}
          <img
            src="https://i.pravatar.cc/60"
            alt="User"
            className="w-14 h-14 rounded-full object-cover border-2 border-purple-300"
          />

          {/* User info and message prompt */}
          <div>
            <h2 className="text-base font-semibold text-gray-900">Alex Smith</h2>
            <p className="text-gray-500 text-sm">What’s new?</p>
          </div>
        </div>
      ) : (
        // ===== Desktop view =====
        // Displays a simple title for the feed section
        <h1 className="text-[22px] font-extrabold text-black tracking-tight">
          MY FEED
        </h1>
      )}
    </div>
  );
};

export default FeedHeader;
