import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListProperty from './pages/ListProperty';
import PartnerPanel from './pages/PartnerPanel';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/partner-panel" element={<PartnerPanel />} />
        </Routes>
    </Router>
  );
}

export default App;
