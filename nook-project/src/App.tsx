import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createPost";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import SearchPage from "./pages/searchPage";
import Navbar from "./components/sideBar";
import './App.css'
import SuggestedUsers from './components/SuggestedUsers';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar lateral izquierda */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1 p-6 ml-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>

      {/* Sidebar derecha con layout flexible */}
      <aside className="w-80 hidden lg:flex flex-col border-l border-gray-200 bg-white">
        {/* Espacio flexible - puedes agregar componentes aquí arriba */}
        <div className="flex-grow">
          {/* Si quieres agregar contenido en la parte superior, ponlo aquí */}
          {/* Ejemplo: <TrendingTopics /> */}
        </div>
        
        {/* SuggestedUsers siempre en la parte inferior */}
        <div className="p-6">
          <SuggestedUsers />
        </div>
      </aside>
    </div>
  )
}

export default App