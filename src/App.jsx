import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Permissions from './pages/Permissions';
import TeamPermissions from './pages/TeamPermissions';
import Members from './pages/Members';
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
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/team-permissions" element={<TeamPermissions />} />
          <Route path="/members" element={<Members />} />
          {/* Add all other internal pages here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
