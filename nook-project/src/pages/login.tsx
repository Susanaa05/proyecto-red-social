import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginMapSection from '../components/LoginMapSection';
import RegisterForm from '../components/registerForm';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';

const INITIAL_USERS = [
  {
    id: 'user1',
    userName: 'Alex_S',
    password: 'password123',
    firstName: 'Alex',
    location: 'Cali, Colombia',
    avatar: 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'
  },
];

function Login() {
  const dispatch = useAppDispatch();
  const [isLoginView, setIsLoginView] = useState(true);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE LOGIN ---
  const handleLogin = (username: string, password: string) => {
    setError(null);
    console.log('Login attempt:', { username, password });
    
    // 1. Verificar credenciales en la DB
    const user = users.find(u => 
      (u.userName === username || u.firstName === username) && u.password === password
    );

    if (user) {
      console.log('Login successful for:', user.userName);
      // 2. Despachar acción de login con datos del usuario ENCONTRADO
      dispatch(login({
        id: user.id,
        firstName: user.firstName,
        userName: user.userName,
        location: user.location,
        avatar: user.avatar
      }));
    } else {
      // 3. Mostrar error de credenciales
      setError('Invalid username or password.');
      console.log('Login failed: Invalid credentials.');
    }
  };

  // --- LÓGICA DE REGISTRO ---
  const handleRegister = (data: { email: string, password: string, fullName: string, username: string }) => {
    setError(null);
    
    // 1. Verificar si el usuario ya existe
    const exists = users.some(u => u.userName === data.username || u.firstName === data.fullName);
    
    if (exists) {
        setError('Username already taken.');
        return;
    }
    
    // 2. Crear nuevo usuario
    const newUser = {
        id: `user${users.length + 1}`,
        userName: data.username,
        password: data.password,
        firstName: data.fullName.split(' ')[0] || data.username,
        location: 'Unknown',
        avatar: 'https://i.pinimg.com/736x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg', // Avatar por defecto
    };

    // 3. Añadir a la lista de usuarios
    setUsers([...users, newUser]);
    console.log('User registered and logged in:', newUser.userName);

    dispatch(login({
        id: newUser.id,
        firstName: newUser.firstName,
        userName: newUser.userName,
        location: newUser.location,
        avatar: newUser.avatar
    }));
  };


  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#7B6EAE] via-[#9B7FBD] to-[#AF91C6]">
      
      {/* Círculos decorativos en el fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between relative z-10 py-10">
        <LoginMapSection />
        
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
          {/* Mensaje de error (si existe) */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/80 text-white rounded-xl shadow-md w-full max-w-sm text-center">
              {error}
            </div>
          )}

          {isLoginView ? (
            // Muestra el formulario de Login
            <LoginForm 
              onLogin={handleLogin} 
              onGoToSignup={() => { setIsLoginView(false); setError(null); }}
              onForgotPassword={() => console.log('Forgot password action')}
            />
          ) : (
            // Muestra el formulario de Registro
            <RegisterForm
              onRegister={handleRegister}
              onGoToLogin={() => { setIsLoginView(true); setError(null); }}
            />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 w-full text-white/60 text-sm text-center z-10">
        © 2022 — 2025 Whaleco Inc.
      </div>

    </div>
  );
}

export default Login;