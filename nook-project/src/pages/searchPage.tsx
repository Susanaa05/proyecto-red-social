import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FeedHeader from "../components/feedheader";
import Post from "../components/postComponent";
import postsData from "../data/posts.json";

function SearchPage() {
    const location = useLocation();
    const selectedPlace = location.state?.selectedPlace || null;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [posts] = useState(postsData);

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
                <div className="w-full max-w-[480px] mx-auto">
                    <FeedHeader />
                </div>

                {isMobile ? (
                    <>
                        {/* ===== MOBILE ===== */}

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
                        <div className="flex flex-col-reverse lg:flex-row justify-center gap-6">
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
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchPage;

