
import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { MdVilla, MdRestaurant } from 'react-icons/md';
import { FaBuilding, FaHandshake, FaSuitcaseRolling } from 'react-icons/fa';
import { motion } from 'framer-motion';
import LoginModal from '../components/LoginModal';
import { Link } from 'react-router-dom';


const homestayImages = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'];
const essenceImages = ['/hero4.jpg', '/hero5.jpg', '/hero6.jpg'];
const sideImagesHomestay = ['/images/house.png', '/images/beach.png', '/images/tree.png', '/images/leaves.png'];
const sideImagesEssence = ['/images/products-left.png', '/images/products-right.png', '/images/products-left1.png', '/images/products-right1.png'];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('homestays');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);
  const [bgImages, setBgImages] = useState(homestayImages);
  const [sideImages, setSideImages] = useState(sideImagesHomestay);

  useEffect(() => {
    setBgImages(activeTab === 'products' ? essenceImages : homestayImages);
    setSideImages(activeTab === 'products' ? sideImagesEssence : sideImagesHomestay);
    setBgIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bgImages]);

  const handleGuestChange = (type, value) => {
    if (type === 'adults') setAdults(Math.max(0, adults + value));
    else setChildren(Math.max(0, children + value));
  };

  return (
    <div className="bg-white text-gray-800">
{/* Transparent Navbar */}
<div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 text-white bg-transparent">
  <div className="flex items-center space-x-6">
    <img src="/logo.png" alt="logo" className="h-16 object-contain ml-4" />
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
      <section
        className="relative h-[75vh] bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4 pt-32 md:pt-40">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2">{('Experience Konkans Charm')}</h1>
          <p className="text-base md:text-lg mb-4">{('Explore villas, flavors, and traditions of the coast')}</p>

          <div className="flex space-x-4 mb-6">
            <button onClick={() => setActiveTab('homestays')} className={`flex items-center space-x-2 px-6 py-2 rounded-full ${activeTab === 'homestays' ? 'bg-white text-black' : 'bg-transparent border border-white text-white'}`}>
              <MdVilla /> <span>{('HomeStays/Villas')}</span>
            </button>
            <button onClick={() => setActiveTab('products')} className={`flex items-center space-x-2 px-6 py-2 rounded-full ${activeTab === 'products' ? 'bg-white text-black' : 'bg-transparent border border-white text-white'}`}>
              <MdRestaurant /> <span>{('Essence of Konkan')}</span>
            </button>
          </div>


{/* Search Box */}
          {activeTab === 'homestays' && (
            <div className="bg-white text-black rounded-xl shadow p-4 w-full max-w-5xl flex flex-wrap justify-between items-center gap-4 relative">
              {/* City/Region Input with Dropdown */}
              <div className="relative w-full md:w-1/4">
                <input
                  type="text"
                  placeholder={('Search your stay region')}
                  onFocus={() => setShowCityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCityDropdown(false), 150)}
                  className="border rounded px-4 py-2 w-full"
                />
                {showCityDropdown && (
                  <div className="absolute bg-white border mt-1 w-full rounded shadow-md z-10">
                    <div className="px-4 py-2 text-gray-600 text-sm font-medium">POPULAR</div>
                    {["Goa", "Malvan", "Ratnagiri", "Dapoli", "Ganpatipule", "Sindhudurg"].map((city, i) => (
                      <div key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-in */}
              <input type="date" className="border rounded px-4 py-2 w-full md:w-1/5" />

              {/* Check-out */}
              <input type="date" className="border rounded px-4 py-2 w-full md:w-1/5" />

              {/* Guests */}
              <div className="relative w-full md:w-1/5">
                <input
                  type="text"
                  readOnly
                  value={`${adults} ${('adults')}, ${children} ${('children')}`}
                  className="border rounded px-4 py-2 w-full cursor-pointer"
                  onFocus={() => setShowGuestDropdown(true)}
                  onBlur={() => setTimeout(() => setShowGuestDropdown(false), 150)}
                />
                {showGuestDropdown && (
                  <div className="absolute mt-1 bg-white shadow border rounded w-full z-10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{('adults')}</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleGuestChange('adults', -1)} className="border rounded px-2">-</button>
                        <span>{adults}</span>
                        <button onClick={() => handleGuestChange('adults', 1)} className="border rounded px-2">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{('children')}</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleGuestChange('children', -1)} className="border rounded px-2">-</button>
                        <span>{children}</span>
                        <button onClick={() => handleGuestChange('children', 1)} className="border rounded px-2">+</button>
                      </div>
                    </div>
                    <button onClick={() => setShowGuestDropdown(false)} className="bg-blue-600 text-white px-4 py-1 mt-2 rounded w-full">Apply</button>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="w-full flex justify-center">
                <button className="bg-orange-600 text-white px-6 py-2 rounded font-semibold hover:bg-orange-700">
                  {('search')}
                </button>
              </div>
            </div>
          )}

          {/* Region Grid */}
          {activeTab === 'homestays' && (
            <div className="bg-white text-black p-6 rounded-xl max-w-6xl mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {["Goa", "Malvan", "Ratnagiri", "Dapoli", "Sindhudurg", "Ganpatipule"].map((place, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded p-4 hover:bg-orange-50 cursor-pointer">
                    <img src={`/destinations/${place.toLowerCase()}.jpg`} alt={place} className="w-16 h-16 rounded-full object-cover mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{place}</h4>
                      <p className="text-sm text-gray-600">Homestays - Villas & Apts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white text-black p-6 rounded-xl max-w-6xl mt-6">
              <h2 className="text-center font-bold text-2xl mb-6">{('Essence of Kokan Delights')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Alphonso Mangoes */}
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow">
                  <img src="/products/mangoes.jpg" alt="Alphonso Mangoes" className="w-20 h-20 rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Alphonso Mangoes</h3>
                    <p className="text-sm text-gray-600">King of Fruits from Ratnagiri and Devgad.</p>
                  </div>
                </div>

                {/* Kokam Products */}
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow">
                  <img src="/products/kokam.jpg" alt="Kokam Products" className="w-20 h-20 rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Kokam Products</h3>
                    <p className="text-sm text-gray-600">Refreshing syrups, agal and more.</p>
                  </div>
                </div>

                {/* Pickles and Snacks */}
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow">
                  <img src="/products/pickles.jpg" alt="Pickles & Snacks" className="w-20 h-20 rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Pickles & Snacks</h3>
                    <p className="text-sm text-gray-600">Traditional homemade delights from Kokan.</p>
                  </div>
                </div>

                {/* Masalas */}
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow">
                  <img src="/products/masalas.jpg" alt="Masalas" className="w-20 h-20 rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Masalas</h3>
                    <p className="text-sm text-gray-600">Authentic spices for the real Kokan taste.</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold">
                  {('Expore More Products')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

{/* Why Book With Us Section */}
<section className="bg-white py-16 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Book With <span className="text-orange-600">BookMyKonkan?</span></h2>
    <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
      <div className="bg-white shadow rounded-lg p-6">
        <img src="/icons/verified.png" alt="Verified" className="w-40 h-100 rounded-full object-cover mb-4" />
        <h4 className="font-bold text-lg text-gray-800 mb-2">Verified Villas & Homestays</h4>
        <p className="text-gray-600">Only trusted hosts listed, reviewed for cleanliness and comfort.</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <img src="/icons/deliver.png" alt="Deliver" className="w-40 h-100 rounded-full object-cover mb-4" />
        <h4 className="font-bold text-lg text-gray-800 mb-2">Local Delicacies Delivered</h4>
        <p className="text-gray-600">Get authentic Konkan masalas, pickles and mangoes to your doorstep.</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <img src="/icons/support.png" alt="Support" className="w-40 h-100 rounded-full object-cover mb-4" />
        <h4 className="font-bold text-lg text-gray-800 mb-2">Fast Booking & Support</h4>
        <p className="text-gray-600">Smart filters, real-time booking and help when you need it most.</p>
      </div>
    </div>
  </div>
</section>


{/* Offers & Deals Section */}
<section className="bg-white py-16 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800"> Offers & Deals</h2>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Offer 1 - Limited time */}
      <div className="bg-white rounded-lg shadow-md p-4 flex">
        <img src="/offers/earlybird.jpg" alt="Early Bird" className="w-28 h-24 rounded-full object-cover mr-4" />
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-800">Early Bird Offer</h4>
            <p className="text-sm text-gray-600">Get ₹300 off on your first homestay booking using code <strong>KONKAN300</strong>.</p>
          </div>
          <span className="text-green-600 font-semibold text-sm mt-2">Valid for first 50 users</span>
        </div>
      </div>

      {/* Offer 2 - Festival deal */}
      <div className="bg-white rounded-lg shadow-md p-4 flex">
        <img src="/offers/festival.jpg" alt="Festival Offer" className="w-28 h-24 rounded-full object-cover mr-4" />
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-800">Festive Spice Sale</h4>
            <p className="text-sm text-gray-600">Buy any 2 spice jars and get 1 free. Automatically applied at checkout.</p>
          </div>
          <span className="text-orange-500 font-semibold text-sm mt-2">Limited stocks only!</span>
        </div>
      </div>

      {/* Offer 3 - Summer code */}
      <div className="bg-white rounded-lg shadow-md p-4 flex">
        <img src="/offers/summerdeal.jpg" alt="Summer Deal" className="w-28 h-24 rounded-full object-cover mr-4" />
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-800">Summer Special</h4>
            <p className="text-sm text-gray-600">Use code <strong>SUMMER15</strong> to get 15% off on all villa stays across Konkan.</p>
          </div>
          <a href="#" className="text-blue-600 font-semibold text-sm mt-2">How to apply?</a>
        </div>
      </div>

      {/* Offer 4 - Konkan combo */}
      <div className="bg-white rounded-lg shadow-md p-4 flex">
        <img src="/offers/combo.jpg" alt="Konkan Combo" className="w-28 h-24 rounded-full object-cover mr-4" />
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-800">Stay + Delights Combo</h4>
            <p className="text-sm text-gray-600">Get a free spice hamper on every booking above ₹4000. No code needed.</p>
          </div>
          <span className="text-purple-600 font-semibold text-sm mt-2">Auto applied at checkout</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* How It Works Section */}
<section className="py-16 px-4 bg-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center">
        <img src="/icons/search.png" alt="Search" className="w-40 h-40 rounded-full object-cover mb-4" />
        <h4 className="font-semibold text-lg mb-2">Search & Discover</h4>
        <p className="text-sm text-gray-600">Find villas and local products tailored to your trip.</p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/icons/book.png" alt="Book" className="w-40 h-40 rounded-full object-cover mb-4" />
        <h4 className="font-semibold text-lg mb-2">Instant Booking</h4>
        <p className="text-sm text-gray-600">Book verified stays or order Konkan goodies online.</p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/icons/enjoy.png" alt="Enjoy" className="w-40 h-40 rounded-full object-cover mb-4" />
        <h4 className="font-semibold text-lg mb-2">Enjoy Your Stay</h4>
        <p className="text-sm text-gray-600">Experience the rich culture, food and vibes of Konkan.</p>
      </div>
    </div>
  </div>
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