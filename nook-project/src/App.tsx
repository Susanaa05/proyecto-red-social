// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import SearchPage from "./pages/searchPage";
import Login from "./pages/login";
import { PostDetail } from "./pages/PostDetail";
import SearchFunction from "./components/searchFunction";
import Navbar from "./components/sideBar";
import CreatePost from "./components/createPost";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { openCreatePostModal, closeCreatePostModal } from "./store/uiSlice";
import { setPosts } from "./store/postsSlice";
import postsData from "./data/posts.json";
import { SessionChecker } from "./components/SessionChecker";
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  // Get state from Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isCreatePostOpen = useAppSelector((state) => state.ui.isCreatePostModalOpen);

  /**
   * Load posts data on mount
   */
  useEffect(() => {
    dispatch(setPosts(postsData));
  }, [dispatch]);

  return (
    <>
      <SessionChecker />
      <Routes>
        {/* ===== RUTA DE LOGIN (SIN NAVBAR) ===== */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* ===== RUTAS CON NAVBAR ===== */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex min-h-screen bg-gray-100">
                <Navbar onCreateClick={() => dispatch(openCreatePostModal())} />
                <main
                  className="
                  flex-1 p-4 sm:p-6
                  lg:ml-64
                  ml-16
                  transition-all duration-300
                "
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/searchFunction" element={<SearchFunction />} />
                    <Route path="/searchPage" element={<SearchPage />} />
                  </Routes>
                </main>
                <CreatePost
                  isOpen={isCreatePostOpen}
                  onClose={() => dispatch(closeCreatePostModal())}
                />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;