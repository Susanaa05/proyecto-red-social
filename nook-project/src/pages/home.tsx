import { useEffect, useState } from "react";
import FeedHeader from "../components/feedheader";
import Stories from "../components/stories";
import FeedFilters from "../components/feedFilters";

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center min-h-screen px-4 overflow-x-hidden bg-gray-50">
      <div className="w-full max-w-6xl flex flex-col gap-6 mt-6">
        {/* ===== MOBILE ===== */}
        {isMobile ? (
          <>
            <FeedHeader />

            {/* Contenedor de Stories */}
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-800 px-1">
                Stories
              </h2>
              <Stories />
            </div>

            <FeedFilters />

            {/* Aquí iría tu feed principal si lo usas */}
            <div className="bg-white rounded-2xl shadow-sm h-[600px] w-[350px] border border-gray-100 mt-3"></div>

          </>
        ) : (
          /* ===== DESKTOP ===== */
          <>
            <div className="flex flex-col gap-4">
              <FeedHeader />
              <FeedFilters />
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-between gap-6">
              <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-sm h-[600px] border border-gray-100"></div>

              <div className="w-full lg:w-[310px]">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  Stories
                </h2>
                <Stories />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
