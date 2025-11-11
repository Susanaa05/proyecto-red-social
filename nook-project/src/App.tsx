import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import SearchPage from "./pages/searchPage";
import SearchFunction from "./components/searchFunction";
import Navbar from "./components/sideBar";
import CreatePost from "./components/createPost";
import './App.css';

function App() {
  // State to control the Create Post modal visibility
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar lateral izquierda */}
      <Navbar onCreateClick={() => setIsCreatePostOpen(true)} />

      {/* Contenido principal */}
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
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchFunction" element={<SearchFunction />} />
          <Route path="/searchPage" element={<SearchPage />} />
        </Routes>
      </main>

      {/* Create Post Modal */}
      <CreatePost 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />
    </div>
  );
}

export default App;