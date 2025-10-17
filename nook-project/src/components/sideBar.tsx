import { NavLink } from 'react-router-dom';
import nookLogo from "../assets/nook.png";
import { Home, Search, Plus, Bell, CircleUserRound, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full bg-black text-white flex flex-col items-center py-6 transition-all duration-300 z-50
          ${isDesktop ? 'w-64' : isOpen ? 'w-40' : 'w-16'}
        `}
      >
        {/* Botón de menú (solo visible en mobile) */}
        {!isDesktop && (
          <button
            onClick={toggleMenu}
            className="bg-gray-900 p-2 rounded-md hover:bg-gray-800 transition mb-6"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}

        {/* Logo (solo visible cuando está expandido o en desktop) */}
        {(isOpen || isDesktop) && (
          <img
            src={nookLogo}
            alt="Logo Nook"
            className={`transition-all duration-300 mb-8 
              ${isDesktop ? 'w-28' : 'w-16'}`} // 👈 logo más grande solo en desktop
          />
        )}

        {/* Navegación */}
        <nav
          className={`
            flex flex-col w-full px-2
            ${isDesktop ? 'gap-12' : 'gap-8'}
          `}
        >
          {[
            { to: "/", label: "Home", icon: <Home /> },
            { to: "/searchPage", label: "Search", icon: <Search /> },
            { to: "/createPost", label: "Create", icon: <Plus /> },
            { to: "/notifications", label: "Notifications", icon: <Bell /> },
            { to: "/profile", label: "Profile", icon: <CircleUserRound /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 hover:text-purple-400 px-2 transition-colors ${
                  isActive ? 'text-purple-300' : ''
                } ${isDesktop ? 'text-lg font-medium' : 'text-base'}`
              }
              onClick={() => !isDesktop && setIsOpen(false)}
            >
              {/* Tamaños separados para mobile y desktop */}
              <div className={`${isDesktop ? 'scale-125' : 'scale-100'} transition-transform`}>
                {icon}
              </div>
              <span
                className={`
                  overflow-hidden transition-all duration-300
                  ${isOpen || isDesktop ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                `}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default NavBar;
