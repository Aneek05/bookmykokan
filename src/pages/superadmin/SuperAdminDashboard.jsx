// SuperAdminDashboard.jsx — Overview Page with Sidebar + Summary Cards
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaFileInvoiceDollar, FaFileContract } from 'react-icons/fa';

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1e1e] text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Super Admin</h2>
        <nav className="space-y-4 text-sm">
          <Link to="/superadmin" className="block hover:text-orange-300">Dashboard Overview</Link>
          <Link to="/superadmin/bookings" className="block hover:text-orange-300">All Bookings</Link>
          <Link to="/superadmin/revenue" className="block hover:text-orange-300">Revenue Tracker</Link>
          <Link to="/superadmin/audit-logs" className="block hover:text-orange-300">Audit Logs</Link>
          <Link to="/superadmin/contracts" className="block hover:text-orange-300">View Contracts</Link>
          <Link to="/superadmin/policies" className="block hover:text-orange-300">Partner Policies</Link>
          <Link to="/superadmin/manage-admins" className="block hover:text-orange-300">Manage Admin Access</Link>
          <Link to="/superadmin/add-product" className="block hover:text-orange-300">Add Product</Link>
          <Link to="/superadmin/add-villa" className="block hover:text-orange-300">Add Villa</Link>
        </nav>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">Logout</button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <FaUsers className="text-3xl text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Active Partners</p>
              <h4 className="text-xl font-bold">48</h4>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <FaClipboardList className="text-3xl text-purple-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <h4 className="text-xl font-bold">1,290</h4>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <FaFileInvoiceDollar className="text-3xl text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Invoices Generated</p>
              <h4 className="text-xl font-bold">1,165</h4>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <FaFileContract className="text-3xl text-orange-600" />
            <div>
              <p className="text-gray-500 text-sm">Contracts Signed</p>
              <h4 className="text-xl font-bold">42</h4>
            </div>
          </div>
        </div>

        {/* Welcome message or future charts */}
        <div className="bg-white shadow rounded-lg p-8 text-center text-gray-700">
          Welcome to your Super Admin Dashboard. Use the sidebar to navigate and manage all areas of your platform.
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-64 right-0 bg-[#1e1e1e] text-white text-xs py-4 px-6 flex justify-between">
        <p>© 2025 BookMyKonkan.com</p>
        <a
          href="https://wa.me/919307661898?text=Hi%20Support%2C%20I%20need%20help%20with%20my%20Super%20Admin%20Dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-200"
        >
          Contact Allverse Studios via WhatsApp
        </a>
      </footer>

    </div>
  );
}
