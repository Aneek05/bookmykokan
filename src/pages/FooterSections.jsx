import React, { useEffect, useState } from 'react';
import ColorThief from 'color-thief-browser';

export default function FooterSections() {
  const [bgColor, setBgColor] = useState('#e0f4f4'); // fallback

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Important to avoid CORS errors
    img.src = '/hero.jpg'; // Your hero section image path

    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img); // [r, g, b]
      setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, []);

  return (
    <footer className="text-gray-800 px-6 py-10" style={{ backgroundColor: bgColor }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        {/* Column 1 */}
        <div>
          <h3 className="font-bold text-base mb-2">BOOKMYKOKAN</h3>
          <ul className="space-y-2">
            <li>About Us</li><li>Careers</li><li>Investor Relations</li><li>Media</li><li>Contact Us</li>
          </ul>
        </div>
        {/* Column 2 */}
        <div>
          <h3 className="font-bold text-base mb-2">PRODUCT OFFERING</h3>
          <ul className="space-y-2">
            <li>Homestays & Villas</li><li>Alphonso Mangoes</li><li>Kokam Products</li><li>Pickles & Snacks</li><li>Masalas</li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h3 className="font-bold text-base mb-2">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li>FAQs</li><li>Terms & Conditions</li><li>Privacy Policy</li><li>Cancellation Policy</li><li>Refund Policy</li>
          </ul>
        </div>
        {/* Column 4 */}
        <div>
          <h3 className="font-bold text-base mb-2">CORPORATE TRAVEL</h3>
          <ul className="space-y-2">
            <li>Partner With Us</li><li>Business Bookings</li><li>Agent Login</li><li>Affiliate Program</li><li>Corporate Offers</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
