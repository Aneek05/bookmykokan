// PartnerPanel.jsx — Admin Dashboard for Property/Product Owners

import { FaChartLine, FaHome, FaBox, FaDownload, FaBell, FaUserCircle, FaSignOutAlt, FaBuilding, FaHandshake, FaSuitcaseRolling, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';
import LoginModal from '../components/LoginModal'; // Adjust path if needed
import { Link } from 'react-router-dom';

export default function ListProperty() {
const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="bg-white text-gray-800">
{/* Transparent Navbar */}
<div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 text-white bg-transparent">
<div className="flex items-center space-x-6">
  <Link to="/">
    <img src="/logo.png" alt="logo" className="h-16 object-contain ml-4 cursor-pointer" />
  </Link>
    <div className="hidden md:flex items-center space-x-6 text-sm">
      <Link to="/list-property" className="flex items-center gap-2 hover:text-orange-300 transition">
        <FaBuilding /> <span>List Your Property/Products</span>
      </Link>
      <Link to="/partner-panel" className="flex items-center gap-2 hover:text-orange-300 transition">
        <FaHandshake /> <span>Partner Panel</span>
      </Link>
      <Link to="/my-bookings" className="flex items-center gap-2 hover:text-orange-300 transition">
        <FaSuitcaseRolling /> <span>My Bookings</span>
      </Link>
    </div>
  </div>

  <div className="flex items-center space-x-4">
    <button onClick={() => setShowLoginModal(true)} className="bg-blue-600 px-3 py-1 rounded text-sm">
      Login / SignUp <FaCaretDown className="inline ml-1" />
    </button>
    <div className="flex items-center gap-2 text-sm">
      <img src="/india.png" alt="India" className="h-4 w-6 object-cover rounded-sm" />
      <span>INR</span>
    </div>
  </div>
</div>

{showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {/* Hero Section */}
<section className="relative h-[75vh] text-white text-center">
  <img
    src="/images/partner-panel.jpg"
    alt="Partner Panel"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner Panel on BookMyKonkan</h1>
        <p className="max-w-3xl mx-auto text-lg">Track your stocks, check your revenue and grow your business</p>
      </section>

      {/* Dashboard Layout */}
      <div className="flex pt-24 px-4 md:px-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-md rounded-lg p-4 mr-8">
          <h2 className="text-xl font-bold mb-6">Partner Panel</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2 text-orange-600 font-semibold"><FaChartLine /> Dashboard</li>
            <li className="flex items-center gap-2"><FaHome /> My Villas</li>
            <li className="flex items-center gap-2"><FaBox /> My Products</li>
            <li className="flex items-center gap-2"><FaDownload /> Reports</li>
            <li className="flex items-center gap-2"><FaBell /> Alerts</li>
            <li className="flex items-center gap-2"><FaUserCircle /> Profile</li>
            <li className="flex items-center gap-2 text-red-500"><FaSignOutAlt /> Logout</li>
          </ul>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-sm font-semibold text-gray-600">Total Bookings</h4>
              <p className="text-2xl font-bold text-orange-600 mt-2">18</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-sm font-semibold text-gray-600">This Month's Revenue</h4>
              <p className="text-2xl font-bold text-green-600 mt-2">₹42,300</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-sm font-semibold text-gray-600">Low Stock Alerts</h4>
              <p className="text-2xl font-bold text-red-600 mt-2">2 Products</p>
            </div>
          </div>

          {/* Booking/Order Table (Sample) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Recent Bookings / Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Item</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">Raj Malhotra</td>
                    <td className="py-2 px-4">Blue Villa</td>
                    <td className="py-2 px-4">₹4,200</td>
                    <td className="py-2 px-4 text-green-600">Confirmed</td>
                    <td className="py-2 px-4">May 14, 2025</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Sneha Nair</td>
                    <td className="py-2 px-4">Kokum Syrup x3</td>
                    <td className="py-2 px-4">₹750</td>
                    <td className="py-2 px-4 text-orange-500">Pending</td>
                    <td className="py-2 px-4">May 13, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* WhatsApp & Calendar Sync */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h4 className="font-bold text-lg mb-2">📲 WhatsApp Booking Alerts</h4>
              <p className="text-sm text-gray-600 mb-4">Enable real-time alerts for every booking or order you receive.</p>
              <button className="bg-green-500 text-white px-5 py-2 rounded-full">Enable Now</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h4 className="font-bold text-lg mb-2">📅 Calendar Availability Sync</h4>
              <p className="text-sm text-gray-600 mb-4">Easily manage which days are open or blocked for bookings.</p>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full">Manage Calendar</button>
            </div>
          </div>
        </main>
      </div>

<footer className="bg-[#1b1b1b] text-white py-12 px-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-sm">
    <div>
      <h5 className="font-bold mb-3">Company</h5>
      <ul className="space-y-1"><li>About</li><li>Partner Policy</li></ul>
    </div>
    <div>
      <h5 className="font-bold mb-3">Legal</h5>
      <ul className="space-y-1"><li>Terms & Conditions</li><li>Privacy Policy</li></ul>
    </div>
    <div>
      <h5 className="font-bold mb-3">Support</h5>
      <ul className="space-y-1"><li>Help Center</li><li>FAQs</li></ul>
    </div>
    <div>
      <h5 className="font-bold mb-3">Follow Us</h5>
      <div className="flex space-x-3">
        <img src="/icons/instagram.svg" className="w-5 h-5" />
        <img src="/icons/facebook.svg" className="w-5 h-5" />
        <img src="/icons/twitter.svg" className="w-5 h-5" />
      </div>
    </div>
  </div>
  <p className="text-center text-xs mt-10 text-gray-400">© 2025 BookMyKonkan. All rights reserved.</p>
</footer>
    </div>
  );
}
