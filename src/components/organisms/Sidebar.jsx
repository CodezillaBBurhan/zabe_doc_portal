import { Link, useLocation } from 'react-router-dom';
import MaterialIcon from '../atoms/MaterialIcon';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={`w-[230px] h-screen fixed left-0 top-0 bg-surface-container-lowest dark:bg-inverse-surface flex flex-col py-4 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      <div className="px-4 lg:px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-on-surface flex items-center justify-center shrink-0">
            <MaterialIcon icon="flag" className="text-white text-sm" />
          </div>
          <div className="min-w-0">
            <h1 className="font-headline-sm text-[15px] font-bold text-on-surface leading-tight truncate">Digital Operations</h1>
            <p className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] truncate">Center (DOC)</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-secondary hover:text-primary p-1 -mr-2">
            <MaterialIcon icon="close" />
          </button>
        )}
      </div>

      <div className="px-4 mb-4">
        <div className="bg-surface-bright rounded px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse shrink-0"></div>
          <span className="font-label-md text-label-md text-secondary truncate">System Operational</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
        <div className="mb-2 px-3 pt-2">
          <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] font-semibold">OPERATIONS</span>
        </div>

        <SidebarLink icon="dashboard" label="Overview" to="/dashboard" active={currentPath === '/dashboard'} />
        <SidebarLink icon="inbox" label="Requests" to="/requests" active={currentPath === '/requests'} />
        {/* <SidebarLink icon="fact_check" label="Approvals" to="/approvals" active={currentPath === '/approvals'} /> */}
        <SidebarLink icon="report_problem" label="Incidents" to="/incidents" active={currentPath === '/incidents'} />

        <div className="mb-2 mt-6 px-3 pt-2">
          <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] font-semibold">INTELLIGENCE</span>
        </div>

        {/* <SidebarLink icon="analytics" label="Analytics" to="/analytics" active={currentPath === '/analytics'} /> */}
        <SidebarLink icon="map" label="Ward/LGA Map" to="/map" active={currentPath === '/map'} />
        {/* <SidebarLink icon="psychology" label="AI Draft" to="/ai" active={currentPath === '/ai'} /> */}
        <SidebarLink icon="history" label="Historical Analysis" to="/history" active={currentPath === '/history'} />

        <div className="mb-2 mt-6 px-3 pt-2">
          <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] font-semibold">SYSTEM</span>
        </div>

        <SidebarLink icon="settings_input_component" label="TV Control" to="/tv" active={currentPath === '/tv'} />
        <SidebarLink icon="link" label="Public Links" to="/links" active={currentPath === '/links'} />
        <SidebarLink icon="group" label="Team & Permissions" to="/team" active={currentPath === '/team'} />
        <SidebarLink icon="people" label="Members" to="/members" active={currentPath === '/members'} />
        <SidebarLink icon="list_alt" label="Audit Logs" to="/logs" active={currentPath === '/logs'} />
        <SidebarLink icon="settings" label="Settings" to="/settings" active={currentPath === '/settings'} />
      </div>
    </nav>
  );
}

function SidebarLink({ icon, label, active = false, to = "#" }) {
  const activeClasses = active
    ? "bg-[#fff0eb] text-[#ff5a1f] font-bold border-l-[3px] border-[#ff5a1f]"
    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-[3px] border-transparent font-medium";

  return (
    <Link to={to} className={`flex items-center gap-3 pl-[21px] pr-3 py-2.5 transition-colors text-[13px] ${activeClasses}`}>
      <MaterialIcon icon={icon} className="text-[20px]" />
      {label}
    </Link>
  );
}
