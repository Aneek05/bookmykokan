// AllBookings.jsx — Super Admin Dashboard Bookings Page (Live Firebase Version with Completion Logic + Revenue Fields)
import React, { useState, useEffect } from 'react';
import { FaDownload, FaCheck, FaClock } from 'react-icons/fa';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const filteredBookings = filter === 'All'
    ? bookings
    : bookings.filter(b => b.type === filter);

  const markAsCompleted = async (id) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    const commissionAmount = parseFloat((booking.amount * 0.25).toFixed(2));
    const partnerAmount = parseFloat((booking.amount - commissionAmount).toFixed(2));

    const bookingRef = doc(db, 'bookings', id);
    await updateDoc(bookingRef, {
      status: 'Completed',
      commissionAmount,
      partnerAmount
    });
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'Completed', commissionAmount, partnerAmount } : b)
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
        <div className="flex gap-4 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-700"
          >
            <option value="All">All Types</option>
            <option value="Villa">Villa/Homestay</option>
            <option value="Product">Products</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded flex items-center gap-2">
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Booking ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Partner</th>
              <th className="px-6 py-3">Amount (₹)</th>
              <th className="px-6 py-3">Commission (₹)</th>
              <th className="px-6 py-3">Partner Amount (₹)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {filteredBookings.map((b, i) => (
              <tr key={i} className="border-b hover:bg-orange-50">
                <td className="px-6 py-3 font-semibold">{b.id}</td>
                <td className="px-6 py-3">{b.customer}</td>
                <td className="px-6 py-3">{b.type}</td>
                <td className="px-6 py-3">{b.partner}</td>
                <td className="px-6 py-3">₹{b.amount}</td>
                <td className="px-6 py-3">₹{b.commissionAmount ?? '-'}</td>
                <td className="px-6 py-3">₹{b.partnerAmount ?? '-'}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    b.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-3">{b.date}</td>
                <td className="px-6 py-3">
                  {b.status !== 'Completed' && b.paymentMode === 'Manual' && (
                    <button
                      onClick={() => markAsCompleted(b.id)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
