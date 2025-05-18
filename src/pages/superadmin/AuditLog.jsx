// AuditLogs.jsx - Super Admin Audit Logs Viewer
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'auditLogs'));
        const logsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLogs(logsData);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Audit Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Timestamp</th>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Action</th>
              <th className="py-2 px-4 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No logs found</td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td className="py-2 px-4 border text-sm">{new Date(log.timestamp?.toDate()).toLocaleString()}</td>
                  <td className="py-2 px-4 border text-sm">{log.user || 'N/A'}</td>
                  <td className="py-2 px-4 border text-sm font-medium text-blue-600">{log.action}</td>
                  <td className="py-2 px-4 border text-sm text-gray-700">{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
