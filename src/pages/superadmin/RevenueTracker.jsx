// RevenueTracker.jsx — Super Admin Panel
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function RevenueTracker() {
  const [bookings, setBookings] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [filterPartner, setFilterPartner] = useState('All');

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const filtered = bookings.filter(b =>
    (filterType === 'All' || b.type === filterType) &&
    (filterPartner === 'All' || b.partner === filterPartner)
  );

  const totalRevenue = filtered.reduce((acc, b) => acc + Number(b.amount || 0), 0);
  const commission = Math.round(totalRevenue * 0.25);
  const partners = [...new Set(bookings.map(b => b.partner))];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Revenue Tracker</h2>
        <div className="flex gap-4 items-center">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-700"
          >
            <option value="All">All Types</option>
            <option value="Villa">Villa/Homestay</option>
            <option value="Product">Products</option>
          </select>
          <select
            value={filterPartner}
            onChange={(e) => setFilterPartner(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-700"
          >
            <option value="All">All Partners</option>
            {partners.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-800">
          <div className="bg-orange-50 p-4 rounded">
            <h4 className="text-xs text-gray-500">Total Bookings</h4>
            <p className="text-xl font-bold">{filtered.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h4 className="text-xs text-gray-500">Total Revenue</h4>
            <p className="text-xl font-bold">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="text-xs text-gray-500">Commission Earned (25%)</h4>
            <p className="text-xl font-bold">₹{commission.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <h4 className="text-xs text-gray-500">Unique Partners</h4>
            <p className="text-xl font-bold">{partners.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
