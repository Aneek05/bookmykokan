// ExploreProducts.jsx — Updated with circular sidebar icons, carousel images per product, and refined UI with login-required cart
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginModal from '../components/LoginModal';
import { FaCheckCircle, FaBuilding, FaHandshake, FaSuitcaseRolling, FaCaretDown } from 'react-icons/fa';

const allProducts = [
  {
    name: 'Koli Masala',
    price: 120,
    category: 'Masala',
    subcategory: 'Koli Masala',
    images: ['/products/koli-masala.jpg', '/products/koli-masala2.jpg']
  },
  {
    name: 'Malvani Masala',
    price: 130,
    category: 'Masala',
    subcategory: 'Malvani Masala',
    images: ['/products/malvani-masala.jpg']
  },
  {
    name: 'Chicken Masala',
    price: 125,
    category: 'Masala',
    subcategory: 'Chicken Masala',
    images: ['/products/chicken-masala.jpg']
  },
  {
    name: 'Fish Masala',
    price: 130,
    category: 'Masala',
    subcategory: 'Fish Masala',
    images: ['/products/fish-masala1.jpg', '/products/fish-masala2.jpg', '/products/fish-masala3.jpg']
  },
  {
    name: 'Kulith Pith',
    price: 90,
    category: 'Flours',
    subcategory: 'Kulith Pith',
    images: ['/products/kulith-pith.jpg']
  },
  {
    name: 'Ghavan Pith',
    price: 60,
    category: 'Flours',
    subcategory: 'Ghavan Pith',
    images: ['/products/ghavan-pith1.jpg', '/products/ghavan-pith2.jpg', '/products/ghavan-pith3.jpg']
  },
];

const categories = ['All', ...new Set(allProducts.map(p => p.category))];
const categoryIcons = {
  All: '/icons/all.svg',
  Masala: '/icons/masala.svg',
  Flours: '/icons/flour.svg'
};

export default function ExploreProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState({});
  const navigate = useNavigate();

  const filteredProducts = (selectedCategory === 'All'
    ? [...allProducts]
    : allProducts.filter(p => p.category === selectedCategory))
    .sort((a, b) => {
      if (sortOrder === 'lowtohigh') return a.price - b.price;
      if (sortOrder === 'hightolow') return b.price - a.price;
      return 0;
    });

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => {
        const next = { ...prev };
        filteredProducts.forEach(p => {
          const len = p.images.length;
          const i = prev[p.name] || 0;
          next[p.name] = (i + 1) % len;
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredProducts]);

  const handleAddToCart = () => {
    if (!loggedIn) setShowLoginModal(true);
    else navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#fffdf9]">
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

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={() => setLoggedIn(true)} />}

      <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('/images/hero-products.jpg')` }}>
        <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
        <h1 className="text-white text-4xl md:text-5xl font-bold z-10">Explore All Konkan Delights</h1>
      </section>

      <div className="flex max-w-7xl mx-auto mt-8">
        <aside className="w-64 bg-white p-4 shadow rounded-lg mr-6 hidden md:block">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
          <ul className="space-y-3">
            {categories.map((cat, i) => (
              <li key={i} className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedCategory(cat)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${selectedCategory === cat ? 'border-orange-600' : 'border-gray-300'}`}>
                  <img src={categoryIcons[cat]} alt={cat} className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${selectedCategory === cat ? 'text-orange-600' : 'text-gray-700'}`}>{cat}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select onChange={(e) => setSortOrder(e.target.value)} className="w-full border px-3 py-2 rounded">
              <option value="default">Default</option>
              <option value="lowtohigh">Price: Low to High</option>
              <option value="hightolow">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid md:grid-cols-3 gap-6 px-4">
            {filteredProducts.map((item, i) => (
              <div key={i} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4">
                <img src={item.images[carouselIndex[item.name] || 0]} alt={item.name} className="w-full h-48 object-contain mb-3" />
                <h4 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.subcategory}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-bold">₹{item.price}</span>
                  <input type="number" defaultValue={1} min={1} className="w-14 border px-2 py-1 rounded text-center text-sm" />
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full mt-3 border border-gray-400 hover:border-gray-700 text-gray-800 font-medium py-2 rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      <motion.section className="py-16 px-4 bg-[#fdf9f3] text-center relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <img src="/icons/partner-box.svg" alt="partner" className="absolute right-6 bottom-6 w-20 opacity-10" />
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Want to List Your Products With Us?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">Join our growing partner network and reach customers across the globe. Get your own admin panel to manage inventory, orders, invoices and more.</p>
        <Link to="/list-property" className="inline-block border border-orange-600 text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition">Become a Seller</Link>
      </motion.section>

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
