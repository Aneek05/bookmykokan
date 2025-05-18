import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

<Routes>
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/superadmin" element={<SuperAdminDashboard />} />
</Routes>
