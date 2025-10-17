import { NavLink } from 'react-router-dom';
import nookLogo from "../assets/nook.png";
import { Home, Menu, X, Search, Plus, Bell, CircleUserRound } from 'lucide-react';
import { useState } from 'react';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Botón para abrir/cerrar en móvil */}
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md lg:hidden"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Barra de navegación */}
            <aside className={`
                fixed top-0 left-0 h-full w-64 bg-black text-white flex flex-col items-center py-10 space-y-10 px-6
                transition-transform duration-300 z-40
                lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>

                <img src={nookLogo} alt="Logo Nook" className="w-24" />

                <nav className='flex flex-col gap-6 w-full'>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `hover:text-purple-400 flex items-center gap-3 ${isActive ? 'text-white font-semibold' : ''}`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <Home size={24} />
                        Home
                    </NavLink>

                    <NavLink
                        to="/searchPage"
                        end
                        className={({ isActive }) =>
                            `hover:text-purple-400  flex items-center gap-3 ${isActive ? 'text-white font-semibold' : ''}`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <Search size={24} />
                        Search
                    </NavLink>

                    <NavLink
                        to="/notifications"
                        end
                        className={({ isActive }) =>
                            `hover:text-purple-400  flex items-center gap-3 ${isActive ? 'text-white font-semibold' : ''}`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <Bell size={24} />
                        Notifications
                    </NavLink>

                    <NavLink
                        to="/createPost"
                        end
                        className={({ isActive }) =>
                            `hover:text-purple-400  flex items-center gap-3 ${isActive ? 'text-white font-semibold' : ''}`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <Plus size={24} />
                        Create
                    </NavLink>

                    <NavLink
                        to="/profile"
                        end
                        className={({ isActive }) =>
                            `hover:text-purple-400 flex items-center gap-3 ${isActive ? 'text-white font-semibold' : ''}`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <CircleUserRound size={24} />
                        Profile
                    </NavLink>
                </nav>
            </aside>


            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default NavBar;