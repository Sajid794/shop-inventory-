import { Link } from 'react-router-dom';
import { FaUserShield, FaUsers } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      {/* Logo and Title */}
      <div className="text-center mb-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/599/599305.png"
          alt="Inventory Logo"
          className="w-20 mx-auto mb-4 animate-bounce"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Inventory Management System</h1>
        <p className="mt-2 text-gray-600 text-lg">Manage your sales, stock, and customers seamlessly</p>
      </div>

      {/* Choose Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Admin Panel */}
        <Link to="/login" className="group">
          <div className="bg-white shadow-xl rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
            <FaUserShield className="text-5xl text-blue-600 mb-4 mx-auto group-hover:text-blue-800 transition-colors" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Admin Dashboard</h2>
            <p className="text-gray-500">Manage inventory, track sales, view reports and user activity.</p>
          </div>
        </Link>

        {/* Client Panel */}
        <Link to="/LoginPage" className="group">
          <div className="bg-white shadow-xl rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
            <FaUsers className="text-5xl text-green-600 mb-4 mx-auto group-hover:text-green-800 transition-colors" />
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Client Dashboard</h2>
            <p className="text-gray-500">Browse available stock, place orders, and manage purchases easily.</p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-16 text-sm text-gray-400">
        © 2025 Inventory Management System. All rights reserved.
      </div>
    </div>
  );
}

export default LandingPage
