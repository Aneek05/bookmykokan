import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListProperty from './pages/ListProperty';
import PartnerPanel from './pages/PartnerPanel';
import ExploreProducts from './pages/ExploreProducts';
import PartnerSignUp from './pages/PartnerSignUp';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser(); // ← Moved here

  return (
    <Router>
      {/* You can conditionally show something globally here if needed */}
      {user && <div className="fixed top-2 right-4 z-50 text-sm text-white bg-black px-4 py-2 rounded">Hi, {user.displayName || user.email}</div>}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/partner-panel" element={<PartnerPanel />} />
        <Route path="/explore-products" element={<ExploreProducts />} />
        <Route path="/partner-signup" element={<PartnerSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
