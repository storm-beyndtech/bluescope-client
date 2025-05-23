import cryptoGlass from '../../assets/Futuristic_Glass_Cube.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4 sm:px-6">
      {/* Back Arrow */}
      <Link
        to="/"
        className="flex items-center absolute top-6 left-4 sm:top-8 sm:left-8 text-black hover:text-blue-800 text-sm sm:text-base"
      >
        <ArrowLeft size={18} aria-label="Back arrow" />
        <span className="ml-2">Back</span>
      </Link>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
          Create your account
        </h2>

        <form className="space-y-5">
          {/* Username or Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden
              />
              <input
                type="text"
                id="email"
                placeholder="Enter your email or username"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                aria-hidden
              />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms & Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 gap-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              I agree to the <Link to="#" className="text-blue-600 underline">Terms</Link>
            </label>
            <Link to="#" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-2xl hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} BlueScope™. All rights reserved.
      </div>

      {/* Floating Illustration */}
      <div className="absolute bottom-4 right-4 w-40 sm:w-48 opacity-70 pointer-events-none">
        <motion.img
          src={cryptoGlass}
          alt="crypto illustration"
          className="w-full h-auto"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
