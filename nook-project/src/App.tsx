import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createPost";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import SearchPage from "./pages/searchPage";
import Navbar from "./components/sideBar";
import './App.css'


function App() {

  return (
       <div className="flex min-h-screen bg-gray-100">
      {/* Navbar lateral */}
      <Navbar />

      {/* Contenido de la página */}
      <main className="ml-50 flex-1 p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
