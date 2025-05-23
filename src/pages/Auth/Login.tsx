import cryptoGlass from '../../assets/Futuristic_Glass_Cube.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4">
      {/* Back Arrow */}
      <Link to="/" className="flex items-center absolute top-8 left-8 text-black hover:text-blue-800">
        <ArrowLeft size={20} />
        <span className='ml-2'>Back</span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md p-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Welcome Back!</h2>
        <form className="space-y-5">
          {/* Username or Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="email"
                placeholder="Enter your email or username"
                className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 border border-gray-400 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms and Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              I agree to the <Link to="#" className="text-blue-600 underline">Terms</Link>
            </label>
            <Link to="#" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account with us?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Create Account</Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BlueScope™. All rights reserved.
      </div>

      {/* Floating Illustration */}
      <div className="absolute bottom-4 right-4 w-48 opacity-70 pointer-events-none">
        <motion.img
          src={cryptoGlass}
          alt="crypto illustration"
          className="w-full h-auto"
          animate={{ y: [0, -30, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
