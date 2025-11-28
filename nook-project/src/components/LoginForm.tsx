import { useState } from "react";
import nookLogo from "../assets/nook2.png";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
  onGoToSignup: () => void;
  onForgotPassword: () => void;
}

function LoginForm({ onLogin, onGoToSignup, onForgotPassword }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = () => {
    onLogin?.(formData.email, formData.password);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="p-10 rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl max-w-sm w-full"> 
      <div className="text-center mb-8">
        <img
          src={nookLogo}
          alt="Nook Logo"
          className="mx-auto w-24" 
        />
      </div>

      <div className="space-y-4">
        {/* SOLO Email */}
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-gray-200"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-gray-200"
        />

        {/* Continue Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-black text-white rounded-xl font-semibold text-base hover:bg-gray-800 transition-colors shadow-lg mt-6"
        >
          Continue
        </button>
      </div>

      <div className="text-center space-y-3 mt-4">
        <button
          onClick={onForgotPassword}
          className="text-gray-600 hover:text-gray-800 transition-colors text-sm block w-full"
        >
          Forgot your password?
        </button>

        <div className="text-gray-700 text-sm">
          Don't have an account?{' '}
          <button
            onClick={onGoToSignup}
            className="underline font-semibold text-purple-700 hover:text-purple-500 transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;