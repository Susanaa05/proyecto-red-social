import { useState } from "react";
import nookLogo from "../assets/nook2.png";

interface RegisterFormProps {
  onRegister: (data: { email: string, password: string, fullName: string, username: string }) => void;
  onGoToLogin: () => void;
}

function RegisterForm({ onRegister, onGoToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    if (formData.email && formData.password && formData.fullName && formData.username) {
        onRegister(formData);
    } else {
        console.log('Please fill all fields.');
    }
  };

  return (
    // Contenedor del formulario de registro
    <div className="p-10 rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl max-w-sm w-full"> 
      <div className="text-center mb-8">
        <img
          src={nookLogo}
          alt="Nook Logo"
          className="mx-auto w-24" 
        />
      </div>

      <div className="space-y-4">
        {/* Email/Mobile Input */}
        <input
          type="text"
          placeholder="Mobile number or email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-gray-200"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-gray-200"
        />

        {/* Full Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-gray-200"
        />

        {/* User Input */}
        <input
          type="text"
          placeholder="User"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-gray-200"
        />

        {/* Terms and Policies */}
        <p className="text-xs text-center text-gray-600 pt-2">
            By signing up, you agree to our <a href="#" className="text-purple-700 font-medium hover:underline">Terms</a>, <a href="#" className="text-purple-700 font-medium hover:underline">Privacy Policy</a>, and <a href="#" className="text-purple-700 font-medium hover:underline">Cookie Policy</a>.
        </p>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-black text-white rounded-xl font-semibold text-base hover:bg-gray-800 transition-colors shadow-lg mt-4"
        >
          Register
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center mt-6 p-4 bg-white/70 rounded-xl shadow-md">
        <div className="text-gray-700 text-sm">
          Do you have an account?{' '}
          <button
            onClick={onGoToLogin}
            className="underline font-semibold text-purple-700 hover:text-purple-500 transition-colors"
          >
            Log in
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default RegisterForm;