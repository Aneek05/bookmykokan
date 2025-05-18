// ListProperty.jsx — Partner Onboarding Page
import React, { useState } from 'react';
import { FaCheckCircle, FaBuilding, FaHandshake, FaSuitcaseRolling, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

export default function ListProperty() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-white text-gray-800">
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

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

      {/* Hero Section */}
      <section className="relative h-[75vh] text-white text-center">
        <img
          src="/images/hero-partner.jpg"
          alt="Partner Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 pt-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Property or Products on BookMyKonkan</h1>
          <p className="max-w-3xl mx-auto text-lg">Reach thousands of travelers & buyers. Get your own Partner Dashboard to manage listings, track earnings, and grow your business.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-12">How Partnership Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ['📝 Sign the Agreement', 'Review and digitally sign our terms & conditions.'],
            ['🔑 Get Dashboard Access', 'We’ll send a unique login link to manage your listings.'],
            ['🏡 Add Your Listings', 'Upload images, set prices, and go live in minutes.'],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-orange-50 rounded-lg shadow p-6">
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-700 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Dashboard Features */}
<section className="relative py-16 px-6 text-white text-center overflow-hidden">
  <img
    src="/images/bg-pattern.svg"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0"
  />
  <div className="relative z-10">
    <h2 className="text-2xl font-bold text-center mb-10 text-orange-700">What You Get In Your Partner Dashboard</h2>
    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-sm text-black">
      <ul className="space-y-3 text-left">
        <li>🏡 Add/edit your villas or products</li>
        <li>📸 Upload photos, set descriptions</li>
        <li>📅 Set availability / manage stock</li>
        <li>📊 Track bookings, orders & revenue</li>
        <li>📄 View/download invoices</li>
      </ul>
      <ul className="space-y-3 text-left">
        <li>📲 Get WhatsApp booking alerts</li>
        <li>📈 Export commission reports</li>
        <li>🔄 Live calendar sync (for stays)</li>
        <li>⚠️ Low stock alerts (for products)</li>
        <li>🤝 24/7 support and dashboard help</li>
      </ul>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="bg-white py-10 text-center">
        <h3 className="text-xl font-bold mb-4">Ready to Partner With Us?</h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">Click below to create your partner account. You’ll receive an email with the agreement link and further onboarding steps.</p>
        <a href="/partner-signup" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full transition">
          Create Partner Account
        </a>
      </section>

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
