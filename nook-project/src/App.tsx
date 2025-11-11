import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import SearchPage from "./pages/searchPage";
import Login from "./pages/login";
import SearchFunction from "./components/searchFunction";
import Navbar from "./components/sideBar";
import CreatePost from "./components/createPost";
import './App.css';

function App() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* ===== RUTA DE LOGIN (SIN NAVBAR) ===== */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          )
        } 
      />

      {/* ===== RUTAS CON NAVBAR ===== */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <div className="flex min-h-screen bg-gray-100">
              <Navbar onCreateClick={() => setIsCreatePostOpen(true)} />
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
                onClose={() => setIsCreatePostOpen(false)} 
              />
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;