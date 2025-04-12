// LoginModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import ColorThief from 'color-thief-browser';

export default function LoginModal({ onClose }) {
  const [tab, setTab] = useState('personal');
  const [dominantColor, setDominantColor] = useState('#ffe8c6');
  const imgRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = '/hero.jpg';
    image.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(image);
      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden relative">

        {/* Left Panel with Benefits */}
        <div
          className="w-1/2 p-6 text-black hidden md:flex flex-col justify-center"
          style={{ backgroundColor: dominantColor }}
        >
          {tab === 'personal' ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Why Sign Up?</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Real-time order & pickup tracking</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Exclusive deals on Kokan delicacies</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Access past orders & reorders</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Notifications on new items & offers</li>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Benefits for Partners</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> List villas or sell Kokan products</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Manage orders from dashboard</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Get real-time customer location</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-600" /> Track payments & payouts easily</li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Panel with Form */}
        <div className="w-full md:w-1/2 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
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
              Partner Login
            </button>
          </div>

          {tab === 'personal' ? (
            <>
              <label className="block mb-2 font-medium">Mobile Number</label>
              <div className="flex items-center border rounded px-2 py-1">
                <span className="mr-2">🇮🇳 +91</span>
                <input type="tel" placeholder="Enter Mobile Number" className="w-full outline-none" />
              </div>
              <button className="w-full mt-4 bg-gray-300 text-white py-2 rounded cursor-not-allowed">Continue</button>
              <p className="text-center text-sm text-gray-500 mt-4">or Login/Signup With</p>
              <div className="flex justify-center gap-4 mt-2">
                <button className="bg-white border rounded-full w-10 h-10 flex items-center justify-center text-lg">G</button>
                <button className="bg-white border rounded-full w-10 h-10 flex items-center justify-center text-lg">✉️</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">Login with Work Email</h3>
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full border rounded px-3 py-2"
              />
              <button className="w-full mt-4 bg-gray-300 text-white py-2 rounded cursor-not-allowed">Continue</button>
              <p className="text-center text-sm text-gray-500 mt-4">or use your business account with</p>
              <div className="flex justify-center mt-2">
                <button className="bg-white border rounded-full w-10 h-10 flex items-center justify-center text-lg">G</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
