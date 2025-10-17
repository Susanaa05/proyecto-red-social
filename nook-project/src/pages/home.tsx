import { useEffect, useState } from "react";
import FeedHeader from "../components/feedheader";
import Stories from "../components/stories";
import FeedFilters from "../components/feedFilters";
import SuggestedUsers from "../components/SuggestedUsers";
import Post from "../components/Post";
import postsData from "../data/posts.json"; // ✅ Importa tu JSON

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [posts, setPosts] = useState(postsData); // ✅ Usa los datos del JSON

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
              <h2 className="text-base font-semibold text-gray-800 px-1">Stories</h2>
              <Stories />
            </div>

            <SuggestedUsers />
            <FeedFilters />

            {/* POSTS MOBILE */}
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
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
                {posts.map((post) => (
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
                <h2 className="text-base font-semibold text-gray-800 mb-2">Stories</h2>
                <Stories />
                <div className="mt-6">
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
