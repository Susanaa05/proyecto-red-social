// pages/home.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FeedHeader from "../components/feedheader";
import Stories from "../components/stories";
import FeedFilters from "../components/feedFilters";
import SuggestedUsers from "../components/SuggestedUsers";
import Post from "../components/post";
import StoryModal from "../components/StoryModal";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { supabase } from "../lib/supabase";
import { setPosts } from "../store/postsSlice";

function Home() {
  const location = useLocation();
  const selectedPlace = location.state?.selectedPlace || null;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeFilter, setActiveFilter] = useState("following");
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  const stories = [
    {
      id: 1,
      name: "Mia Park",
      storyImg: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800",
      profileImg: "https://i.pinimg.com/1200x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg",
    },
    {
      id: 2,
      name: "Andre Lee",
      storyImg: "https://i.pinimg.com/1200x/fb/3a/a4/fb3aa460fecd3b0a68e30c13e8c74d51.jpg",
      profileImg: "https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg",
    },
    {
      id: 3,
      name: "Luna Kim",
      storyImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      profileImg: "https://i.pinimg.com/1200x/f5/9c/90/f59c9088e58a7baaa3b463ddca7dbab2.jpg",
    },
    {
      id: 4,
      name: "Alex Rivera",
      storyImg: "https://i.pinimg.com/1200x/b4/5c/b7/b45cb75c5071e17ea3cefb99f8b85b80.jpg",
      profileImg: "https://i.pinimg.com/736x/3c/2b/ad/3c2badd0b9688bcb810ef699afc3f7c1.jpg",
    },
  ];

  // 👇 AGREGAR ESTAS FUNCIONES FALTANTES
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleStoryClick = (story: any) => {
    const storyIndex = stories.findIndex(s => s.id === story.id);
    setSelectedStoryIndex(storyIndex);
    setIsStoryModalOpen(true);
  };

  const handleCloseStoryModal = () => {
    setIsStoryModalOpen(false);
  };

  // 👇 AGREGAR ESTA LÓGICA DE FILTRADO FALTANTE
  const placeFilteredPosts = selectedPlace
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(selectedPlace.toLowerCase()) ||
        post.description.toLowerCase().includes(selectedPlace.toLowerCase())
      )
    : posts;

  const filteredPosts = (() => {
    switch (activeFilter) {
      case "trending":
        return [...placeFilteredPosts].sort((a, b) => b.visitors.length - a.visitors.length);
      case "near":
        return placeFilteredPosts.filter(post => 
          post.location && post.location.toLowerCase().includes("cali")
        );
      case "following":
      default:
        return placeFilteredPosts;
    }
  })();

  // 👇 AGREGAR ESTE EFFECT FALTANTE
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cargar posts desde Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id(username, avatar_url)
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching posts:', error);
          return;
        }

        if (data) {
          const transformedPosts = data.map(post => ({
            id: post.id,
            image: post.image_url,
            title: post.title,
            category: post.category,
            description: post.description,
            visitors: post.visitors || [],
            likes: post.likes || 0,
            isLiked: post.is_liked || false,
            user: post.profiles
          }));
          
          dispatch(setPosts(transformedPosts));
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div className="flex justify-center min-h-screen px-4 overflow-x-hidden bg-gray-50">
      <div className="w-full max-w-6xl flex flex-col gap-6 mt-6">
        
        {loading && (
          <div className="flex justify-center py-8">
            <p className="text-gray-500">Cargando publicaciones...</p>
          </div>
        )}

        {isMobile ? (
          <>
            {/* MOBILE VIEW */}
            <div className="w-full max-w-[480px] mx-auto">
              <FeedHeader />
            </div>

            <div className="w-full max-w-[480px] mx-auto flex flex-col gap-3">
              <h2 className="text-base font-semibold text-gray-800 px-1">Stories</h2>
              <Stories onStoryClick={handleStoryClick} />
            </div>

            <FeedFilters 
              activeFilter={activeFilter} 
              onFilterChange={handleFilterChange} 
            />

            {/* POSTS MOBILE */}
            {!loading && (
              <div className="w-full max-w-[480px] mx-auto flex flex-col gap-6 px-1 sm:px-0">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="w-full rounded-2xl overflow-hidden shadow-md bg-white">
                    <Post
                      id={post.id}
                      image={post.image}
                      title={post.title}
                      category={post.category}
                      description={post.description}
                      visitors={post.visitors}
                      initialLikes={post.likes || 0}
                      initialIsLiked={post.isLiked || false}
                    />
                  </div>
                ))}
                {filteredPosts.length === 0 && (
                  <p className="text-gray-500 text-center mt-10">
                    {selectedPlace 
                      ? `No results found for "${selectedPlace}" in ${activeFilter}`
                      : `No posts found in ${activeFilter}`
                    }
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* DESKTOP VIEW */}
            <div className="flex flex-col gap-4">
              <FeedHeader />
              <FeedFilters 
                activeFilter={activeFilter} 
                onFilterChange={handleFilterChange} 
              />
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-between gap-6">
              {/* POSTS DESKTOP */}
              {!loading && (
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                  {filteredPosts.map((post) => (
                    <Post
                      key={post.id}
                      id={post.id}
                      image={post.image}
                      title={post.title}
                      category={post.category}
                      description={post.description}
                      visitors={post.visitors}
                      initialLikes={post.likes || 0}
                      initialIsLiked={post.isLiked || false}
                    />
                  ))}
                  {filteredPosts.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">
                      {selectedPlace 
                        ? `No results found for "${selectedPlace}" in ${activeFilter}`
                        : `No posts found in ${activeFilter}`
                      }
                    </p>
                  )}
                </div>
              )}

              {/* RIGHT COLUMN */}
              <div className="w-full lg:w-[310px]">
                <h2 className="text-base font-semibold text-gray-800 mb-2">Stories</h2>
                <Stories onStoryClick={handleStoryClick} />
                <div className="mt-6 hidden md:block">
                  <SuggestedUsers />
                </div>
              </div>
            </div>
          </>
        )}

        {/* STORY MODAL */}
        <StoryModal
          isOpen={isStoryModalOpen}
          onClose={handleCloseStoryModal}
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
        />
      </div>
    </div>
  );
}

export default Home;