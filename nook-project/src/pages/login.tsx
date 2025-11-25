import LoginForm from '../components/LoginForm';
import LoginMapSection from '../components/LoginMapSection';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';

function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = (username: string, password: string) => {
    console.log('Login attempt:', { username, password });
    
    // Dispatch login action with user data
    dispatch(login({
      id: '1',
      firstName: 'Alex',
      userName: username || 'Alex_S',
      location: 'Cali, Colombia',
      avatar: 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#6B7DB0] via-[#8B7DA8] to-[#9B8DAF]">
      
      {/* Decorative circles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between relative z-10">
        <LoginMapSection />
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default Login;