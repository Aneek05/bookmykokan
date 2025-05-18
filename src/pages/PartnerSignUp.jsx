import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../firebase';

const partnerImages = ['/login/partner1.jpg', '/login/partner2.jpg', '/login/partner3.jpg'];

export default function PartnerSignupModal({ onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % partnerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await setDoc(doc(db, 'users', result.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessType: formData.businessType,
        role: 'partner'
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden relative">
        {/* Left Image Panel */}
        <div className="w-1/2 relative hidden md:block">
          <img src={partnerImages[imageIndex]} alt="Slide" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 text-white p-6 flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-4">Why Partner With Us?</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-400" /> Access revenue dashboard</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-400" /> Add villas/products instantly</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-400" /> Manage orders & payouts</li>
            </ul>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <FaTimes size={22} />
          </button>

          <h3 className="text-xl font-bold mb-4">Become a Partner</h3>

          {submitted ? (
            <div className="text-green-600 text-center font-medium text-lg mt-8">
              Thank you! Your partner account has been created. You’ll receive your dashboard link soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Select Business Type</option>
                <option value="Homestays/Villa">Homestays/Villa</option>
                <option value="Product Seller">Product Seller</option>
              </select>
              <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
