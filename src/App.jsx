import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Incidents from './pages/Incidents';
import WardMap from './pages/WardMap';
import History from './pages/History';
import MainLayout from './components/templates/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Application Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/map" element={<WardMap />} />
          <Route path="/history" element={<History />} />
          {/* Add all other internal pages here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
