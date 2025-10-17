import { useEffect, useState } from "react";
import FeedHeader from "../components/feedheader";
import Stories from "../components/stories";
import FeedFilters from "../components/feedFilters";
import SuggestedUsers from "../components/SuggestedUsers";
import Post from "../components/Post";

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Datos de los posts
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1593069567131-53a0614dde1d?w=500",
      title: "Zoologico de Cali",
      category: "nature",
      description: "A good place to connect with nature"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      title: "Parque del Café",
      category: "adventure", 
      description: "Amazing coffee experience with roller coasters"
    }
  ];

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

            {/* SuggestedUsers */}
            <SuggestedUsers />

            <FeedFilters />

            {/* POSTS EN MÓVIL */}
            <div className="flex flex-col gap-6">
              {posts.map(post => (
                <Post
                  key={post.id}
                  image={post.image}
                  title={post.title}
                  category={post.category}
                  description={post.description}
                />
              ))}
            </div>

          </>
        ) : (
          /* ===== DESKTOP ===== */
          <>
            <div className="flex flex-col gap-4">
              <FeedHeader />
              <FeedFilters />
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-between gap-6">
              {/* COLUMNA IZQUIERDA - POSTS */}
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                {posts.map(post => (
                  <Post
                    key={post.id}
                    image={post.image}
                    title={post.title}
                    category={post.category}
                    description={post.description}
                  />
                ))}
              </div>

              {/* COLUMNA DERECHA - STORIES + SUGGESTED */}
              <div className="w-full lg:w-[310px]">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  Stories
                </h2>
                <Stories />
                
                {/* SuggestedUsers */}
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