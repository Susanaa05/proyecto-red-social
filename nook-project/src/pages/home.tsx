import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FeedHeader from "../components/feedheader";
import Stories from "../components/stories";
import FeedFilters from "../components/feedFilters";
import SuggestedUsers from "../components/SuggestedUsers";
import Post from "../components/Post";
import { useAppSelector } from "../store/hooks";

function Home() {
  const location = useLocation();
  const selectedPlace = location.state?.selectedPlace || null;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Get posts from Redux store
  const posts = useAppSelector((state) => state.posts.posts);

  const filteredPosts = selectedPlace
    ? posts.filter((post) =>
      post.title.toLowerCase().includes(selectedPlace.toLowerCase()) ||
      post.description.toLowerCase().includes(selectedPlace.toLowerCase())
    )
    : posts;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center min-h-screen px-4 overflow-x-hidden bg-gray-50">
      <div className="w-full max-w-6xl flex flex-col gap-6 mt-6">
        {isMobile ? (
          <>
            {/* ===== MOBILE ===== */}
            <div className="w-full max-w-[480px] mx-auto">
              <FeedHeader />
            </div>

            <div className="w-full max-w-[480px] mx-auto flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-800 px-1">
                Stories
              </h2>
              <Stories />
            </div>

            <FeedFilters />

            {/* ===== POSTS MOBILE - Responsive ===== */}
            <div className="w-full max-w-[480px] mx-auto flex flex-col gap-6 px-1 sm:px-0">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-full rounded-2xl overflow-hidden shadow-md bg-white"
                >
                  <Post
                    image={post.image}
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    visitors={post.visitors}
                  />
                </div>
              ))}
              {filteredPosts.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                  No results found for "{selectedPlace}"
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* ===== DESKTOP ===== */}
            <div className="flex flex-col gap-4">
              <FeedHeader />
              <FeedFilters />
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-between gap-6">
              {/* COLUMNA IZQUIERDA - POSTS */}
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                {filteredPosts.map((post) => (
                  <Post
                    key={post.id}
                    image={post.image}
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    visitors={post.visitors}
                  />
                ))}
              </div>

              {/* COLUMNA DERECHA - STORIES + SUGGESTED */}
              <div className="w-full lg:w-[310px]">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  Stories
                </h2>
                <Stories />

                {/* SUGERIDOS SOLO EN DESKTOP */}
                <div className="mt-6 hidden md:block">
                  <SuggestedUsers />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;