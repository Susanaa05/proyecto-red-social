import { useState } from "react";
import nookLogo from "../assets/nook2.png";

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = () => {
    onLogin?.(formData.username, formData.password);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="w-full max-w-md">

      <div className="mb-12 text-center lg:text-right">
        <img
          src={nookLogo}
          alt="Nook Logo"
        />

      </div>

      {/* Login Form */}
      <div className="space-y-4">
        {/* Username/Email Input */}
        <input
          type="text"
          placeholder="Phone, username or email"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-6 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-6 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        />

        {/* Continue Button */}
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold text-base hover:bg-gray-900 transition-colors shadow-lg"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/30"></div>
          <span className="px-4 text-white/70 text-sm">OR</span>
          <div className="flex-1 border-t border-white/30"></div>
        </div>

        {/* Links */}
        <div className="text-center space-y-3">
          <button
            onClick={() => console.log('Forgot password clicked')}
            className="text-white hover:text-white/80 transition-colors text-base block w-full"
          >
            Forgot your password?
          </button>

          <div className="text-white text-base">
            Don't have an account?{' '}
            <button
              onClick={() => console.log('Sign up clicked')}
              className="underline font-semibold hover:text-white/80 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-white/60 text-sm text-center lg:text-right">
        © 2022 — 2025 Whaleco Inc.
      </div>
    </div>
  );
}

export default LoginForm;