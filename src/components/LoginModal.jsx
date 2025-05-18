// LoginModal.jsx — Updated with Firebase partner login
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const personalImages = ['/login/personal1.jpg', '/login/personal2.jpg', '/login/personal3.jpg'];
const partnerImages = ['/login/partner1.jpg', '/login/partner2.jpg', '/login/partner3.jpg'];

export default function LoginModal({ onClose }) {
  const [tab, setTab] = useState('personal');
  const [imageIndex, setImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUser();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const currentImages = tab === 'personal' ? personalImages : partnerImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % currentImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tab]);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem('emailForSignIn');
      if (!storedEmail) storedEmail = window.prompt('Please provide your email for confirmation');
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(async result => {
          window.localStorage.removeItem('emailForSignIn');
          await setDoc(doc(db, 'users', result.user.uid), {
            name: result.user.displayName || '',
            email: result.user.email,
            role: 'customer'
          });
          setUser(result.user);
          onClose();
        })
        .catch(console.error);
    }
  }, []);

  const handleSendOtp = () => {
    const actionCodeSettings = { url: window.location.href, handleCodeInApp: true };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        setOtpSent(true);
      })
      .catch(console.error);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async result => {
        await setDoc(doc(db, 'users', result.user.uid), {
          name: result.user.displayName || '',
          email: result.user.email,
          role: 'customer'
        });
        setUser(result.user);
        onClose();
      })
      .catch(console.error);
  };

  const handlePartnerLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(async result => {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (userDoc.exists() && userDoc.data().role === 'partner') {
          setUser(result.user);
          onClose();
        } else {
          alert('Access denied. Not a partner.');
        }
      })
      .catch(() => {
        alert('Invalid credentials');
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden relative">
        <div className="w-1/2 relative hidden md:block">
          <img src={currentImages[imageIndex]} alt="Slide" className="w-full h-full object-cover" />
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

        <div className="w-full md:w-1/2 p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <FaTimes size={22} />
          </button>

          <div className="flex mb-4 border rounded-full overflow-hidden">
            <button onClick={() => setTab('personal')} className={`w-1/2 py-2 text-sm font-semibold ${tab === 'personal' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>Personal Account</button>
            <button onClick={() => setTab('partner')} className={`w-1/2 py-2 text-sm font-semibold ${tab === 'partner' ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>Partner Account</button>
          </div>

          {tab === 'personal' ? (
            <>
              <label className="block mb-2 font-medium">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full border rounded px-3 py-2 mb-4" />
              {!otpSent ? (
                <button onClick={handleSendOtp} className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Send OTP</button>
              ) : (
                <div className="text-green-600 font-medium text-center">OTP sent! Check your email and click the link to log in.</div>
              )}
              <p className="text-center text-sm text-gray-500 mt-4">or Login with</p>
              <div className="flex justify-center gap-4 mt-2">
                <button onClick={handleGoogleLogin} className="bg-white border rounded-full w-10 h-10 flex items-center justify-center text-lg">G</button>
              </div>
            </>
          ) : (
            <>
              <label className="block mb-2 font-medium">Username or Work Email</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded px-3 py-2 mb-4" />
              <label className="block mb-2 font-medium">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-4" />
              <button onClick={handlePartnerLogin} className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition">Login</button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Don’t have an account?{' '}
                <Link to="/partner-signup" className="text-blue-600 font-semibold underline">Click here to sign up</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
