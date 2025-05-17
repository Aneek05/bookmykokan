// LoginModal.jsx — Enhanced with rotating image banners, Google login buttons, email OTP placeholders
import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

const personalImages = ['/login/personal1.jpg', '/login/personal2.jpg', '/login/personal3.jpg', '/login/personal4.jpg'];
const partnerImages = ['/login/partner1.jpg', '/login/partner2.jpg', '/login/partner3.jpg'];

export default function LoginModal({ onClose, onLogin }) {
  const [tab, setTab] = useState('personal');
  const [imageIndex, setImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const currentImages = tab === 'personal' ? personalImages : partnerImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % currentImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tab]);

  const handleSendOtp = () => {
    if (email) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onLogin();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden relative">
        {/* Left Banner Section */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src={currentImages[imageIndex]}
            alt="Slide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 text-white p-6 flex flex-col justify-center">
            {tab === 'personal' ? (
              <>
                <h2 className="text-xl font-bold mb-4">Why Sign Up?</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /> Track orders & delivery</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /> Get member-only discounts</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /> View past bookings</li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Partner Benefits</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-400" /> List products & manage orders</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-400" /> Export sales & revenue reports</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-400" /> Dedicated partner support</li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <FaTimes size={22} />
          </button>

          {/* Tabs */}
          <div className="flex mb-4 border rounded-full overflow-hidden">
            <button
              onClick={() => setTab('personal')}
              className={`w-1/2 py-2 text-sm font-semibold ${tab === 'personal' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
            >
              Personal Account
            </button>
            <button
              onClick={() => setTab('partner')}
              className={`w-1/2 py-2 text-sm font-semibold ${tab === 'partner' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}
            >
              Partner Account
            </button>
          </div>

          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded px-3 py-2 mb-4"
          />

          {otpSent ? (
            <>
              <label className="block mb-2 font-medium">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="w-full border rounded px-3 py-2 mb-4"
              />
              <button onClick={handleVerifyOtp} className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition">Verify & Continue</button>
            </>
          ) : (
            <button onClick={handleSendOtp} className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Send OTP</button>
          )}

          <p className="text-center text-sm text-gray-500 mt-4">or Login with</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="bg-white border rounded-full w-10 h-10 flex items-center justify-center text-lg">G</button>
            {tab === 'personal' && <button className="bg-white border rounded-full w-10 h-10 flex items-center justify-center text-lg">✉️</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
