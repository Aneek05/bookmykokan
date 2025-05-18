// Contracts.jsx - Super Admin view of signed contracts
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Contracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const snapshot = await getDocs(collection(db, 'signedContracts'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContracts(data);
    };
    fetchContracts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Signed Partner Contracts</h2>
      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full table-auto bg-white">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="py-2 px-4 text-left">Partner Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">IP Address</th>
              <th className="py-2 px-4 text-left">Signed At</th>
              <th className="py-2 px-4 text-left">Contract</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, i) => (
              <tr key={i} className="border-t text-sm">
                <td className="py-2 px-4">{c.partnerName}</td>
                <td className="py-2 px-4">{c.email}</td>
                <td className="py-2 px-4">{c.ip}</td>
                <td className="py-2 px-4">{new Date(c.timestamp?.toDate()).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <a
                    href={c.contractPDFUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                </td>
                <td className="py-2 px-4">
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                    Terminate
                  </button>
                </td>
              </tr>
            ))}
            {contracts.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 px-4 text-center text-gray-500">
                  No contracts signed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
