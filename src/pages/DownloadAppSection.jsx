import React from 'react';

export default function DownloadAppSection() {
  return (
    <div className="bg-white py-12 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between border-t border-b">
      {/* Left Section */}
      <div className="flex-1 mb-8 md:mb-0">
        <h2 className="text-2xl font-bold mb-2">Download App Now!</h2>
        <p className="text-sm mb-4">
          Use code <span className="font-bold">WELCOMEBMK</span> and get <span className="font-bold">FLAT 12% OFF</span> on your first Homestay & Villas/Essence of Kokan booking
        </p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg">🇮🇳 +91</span>
          <input
            type="text"
            placeholder="Enter Mobile number"
            className="border rounded px-3 py-2 w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">GET APP LINK</button>
        </div>
        <div className="flex space-x-4">
          <img src="/googleplay.png" alt="Google Play" className="h-10" />
          <img src="/appstore.png" alt="App Store" className="h-10" />
        </div>
      </div>

      {/* QR Code */}
      <div className="flex-shrink-0">
        <img src="/qrcode.png" alt="QR Code" className="h-32 w-32" />
      </div>
    </div>
  );
}
