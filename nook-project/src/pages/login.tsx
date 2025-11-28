import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginMapSection from '../components/LoginMapSection';
import RegisterForm from '../components/registerForm';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE LOGIN CON SUPABASE ---
  const handleLogin = async (email: string, password: string) => {
    setError(null);
    console.log('Login attempt:', { email });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        setError('Invalid email or password');
        console.log('Login failed:', error.message);
        return;
      }

      if (data.user) {
        console.log('Login successful for:', data.user.email);
        
        // Obtener el perfil del usuario desde la tabla profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')  // ← AGREGAMOS full_name
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.log('Error fetching profile:', profileError);
        }

        // ✅ CORREGIDO: Usar full_name para firstName y username para userName
        dispatch(login({
          id: data.user.id,
          firstName: profile?.full_name || profile?.username || data.user.email?.split('@')[0] || 'User',  // ← NOMBRE COMPLETO
          userName: profile?.username || 'user',  // ← USERNAME
          location: 'Unknown',
          avatar: profile?.avatar_url || 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'
        }));

        // Redirigir al home después del login exitoso
        navigate('/');
      }
      
    } catch (err) {
      setError('Login failed. Please try again.');
      console.log('Login error:', err);
    }
  };

  // --- LÓGICA DE REGISTRO CON SUPABASE ---
  const handleRegister = async (formData: { email: string, password: string, fullName: string, username: string }) => {
    setError(null);
    
    try {
      // 1. PRIMERO crear el usuario con signUp
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!authData.user) {
        setError('Registration failed. No user created.');
        return;
      }

      // 2. Crear perfil en la tabla profiles CON full_name Y username
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: formData.username,
          full_name: formData.fullName,  // ← GUARDAMOS EL NOMBRE COMPLETO
          avatar_url: 'https://i.pinimg.com/736x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg',
          created_at: new Date().toISOString()
        });

      if (profileError) {
        if (profileError.code === '23505') {
          setError('Username already taken. Please choose a different one.');
        } else {
          setError('Error creating profile: ' + profileError.message);
        }
        return;
      }

      console.log('Profile created with fullName:', formData.fullName, 'and username:', formData.username);

      // 3. MOSTRAR MENSAJE DE CONFIRMACIÓN
      setError('Registration successful! Please check your email to confirm your account.');
      setIsLoginView(true); // Volver al login

    } catch (err) {
      setError('Registration failed. Please try again.');
      console.log('Registration error:', err);
    }
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
            <LoginForm 
              onLogin={handleLogin} 
              onGoToSignup={() => { setIsLoginView(false); setError(null); }}
              onForgotPassword={() => console.log('Forgot password action')}
            />
          ) : (
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