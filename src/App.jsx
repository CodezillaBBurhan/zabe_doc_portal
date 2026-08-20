import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Permissions from './pages/Permissions';
import TeamPermissions from './pages/TeamPermissions';
import Members from './pages/Members';
import Requests from './pages/Requests';
import Incidents from './pages/Incidents';
import WardMap from './pages/WardMap';
import History from './pages/History';
import SituationRoom from './pages/SituationRoom';
import PublicLinks from './pages/PublicLinks';
import CreatePublicLink from './pages/CreatePublicLink';
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
          <Route path="/logs" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/team" element={<TeamPermissions />} />
          <Route path="/members" element={<Members />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/map" element={<WardMap />} />
          <Route path="/history" element={<History />} />
          <Route path="/tv" element={<SituationRoom />} />
          <Route path="/links" element={<PublicLinks />} />
          <Route path="/links/create" element={<CreatePublicLink />} />
          {/* Add all other internal pages here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
