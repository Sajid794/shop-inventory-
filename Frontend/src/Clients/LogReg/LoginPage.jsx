import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-2">Client Login</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back! Please enter your credentials.</p>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <RiLockPasswordFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-gray-600">
          Don't have an account?
          <Link to="/signupPage" className="ml-1 text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
