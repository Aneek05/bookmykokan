import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { MdVilla, MdRestaurant } from 'react-icons/md';
import { FaBuilding, FaHandshake, FaSuitcaseRolling } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import DownloadAppSection from './DownloadAppSection';
import FooterSections from './FooterSections';
import LoginModal from '../components/LoginModal'; // adjust path as needed

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('homestays');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const { t, i18n } = useTranslation();

  const handleGuestChange = (type, value) => {
    if (type === 'adults') {
      setAdults(Math.max(0, adults + value));
    } else {
      setChildren(Math.max(0, children + value));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {/* Top Header Strip */}
      <div className="flex justify-between items-center px-6 py-4 text-white bg-[#2a2a2a]">
        <div className="flex items-center space-x-6">
          <img src="/logo.png" alt="logo" className="h-16 object-contain ml-4" style={{ maxHeight: '70px' }} />
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center gap-2">
              <FaBuilding /> <span>{t('listProperty')}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHandshake /> <span>{t('partnerPanel')}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaSuitcaseRolling /> <span>{t('myBookings')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setShowLoginModal(true)} className="bg-blue-600 px-3 py-1 rounded text-sm">
            {t('Login/SignUp')} <FaCaretDown className="inline ml-1" />
          </button>
          <div className="flex items-center gap-2 text-sm">
  <img src="/india.png" alt="India" className="h-4 w-6 object-cover rounded-sm" />
  <span>INR |</span>
  <select
    onChange={(e) => i18n.changeLanguage(e.target.value)}
    className="bg-white text-black rounded px-2 py-1 text-sm"
  >
    <option value="en">English</option>
    <option value="hi">हिंदी</option>
    <option value="mr">मराठी</option>
  </select>
</div>

        </div>
      </div>

      {/* Hero Section with Tabs */}
      <section className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2">{t('heroTitle')}</h1>
          <p className="text-base md:text-lg mb-4">{t('heroSubtitle')}</p>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button onClick={() => setActiveTab('homestays')} className={`flex items-center space-x-2 px-6 py-2 rounded-full ${activeTab === 'homestays' ? 'bg-white text-black' : 'bg-transparent border border-white text-white'}`}>
              <MdVilla /> <span>{t('homestaysBtn')}</span>
            </button>
            <button onClick={() => setActiveTab('products')} className={`flex items-center space-x-2 px-6 py-2 rounded-full ${activeTab === 'products' ? 'bg-white text-black' : 'bg-transparent border border-white text-white'}`}>
              <MdRestaurant /> <span>{t('productsBtn')}</span>
            </button>
          </div>

          {/* Search Box */}
          {activeTab === 'homestays' && (
            <div className="bg-white text-black rounded-xl shadow p-4 w-full max-w-5xl flex flex-wrap justify-between items-center gap-4 relative">
              {/* City/Region Input with Dropdown */}
              <div className="relative w-full md:w-1/4">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
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
                  value={`${adults} ${t('adults')}, ${children} ${t('children')}`}
                  className="border rounded px-4 py-2 w-full cursor-pointer"
                  onFocus={() => setShowGuestDropdown(true)}
                  onBlur={() => setTimeout(() => setShowGuestDropdown(false), 150)}
                />
                {showGuestDropdown && (
                  <div className="absolute mt-1 bg-white shadow border rounded w-full z-10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{t('adults')}</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleGuestChange('adults', -1)} className="border rounded px-2">-</button>
                        <span>{adults}</span>
                        <button onClick={() => handleGuestChange('adults', 1)} className="border rounded px-2">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{t('children')}</span>
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
                  {t('search')}
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
              <h2 className="text-center font-bold text-2xl mb-6">{t('Essence of Kokan Delights')}</h2>
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
                  {t('exploreProducts')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <DownloadAppSection />
      <FooterSections />
    </div>
  );
}
