import { Link } from 'react-router-dom';
import MaterialIcon from '../atoms/MaterialIcon';

export default function Sidebar() {
  return (
    <nav className="w-[230px] h-screen fixed left-0 top-0 bg-surface-container-lowest dark:bg-inverse-surface flex flex-col py-4 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-on-surface flex items-center justify-center">
          <MaterialIcon icon="flag" className="text-white text-sm" />
        </div>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">Election Center</h1>
          <p className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px]">NATIONAL COMMAND</p>
        </div>
      </div>
      
      <div className="px-4 mb-4">
        <div className="bg-surface-bright rounded px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse"></div>
          <span className="font-label-md text-label-md text-secondary">System Operational</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
        <div className="mb-2 px-3 pt-2">
          <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] font-semibold">OPERATIONS</span>
        </div>
        
        <SidebarLink icon="dashboard" label="Overview" />
        <SidebarLink icon="inbox" label="Requests" />
        <SidebarLink icon="fact_check" label="Approvals" />
        <SidebarLink icon="report_problem" label="Incidents" />
        
        <div className="mb-2 mt-6 px-3 pt-2">
          <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] font-semibold">INTELLIGENCE</span>
        </div>
        
        <SidebarLink icon="analytics" label="Analytics" />
        <SidebarLink icon="map" label="Ward/LGA Map" />
        <SidebarLink icon="psychology" label="AI Draft" />
        <SidebarLink icon="history" label="Historical Analysis" />
        
        <div className="mb-2 mt-6 px-3 pt-2">
          <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider text-[10px] font-semibold">SYSTEM</span>
        </div>
        
        <SidebarLink icon="settings_input_component" label="TV Control" />
        <SidebarLink icon="link" label="Public Links" />
        <SidebarLink icon="group" label="Team & Permissions" active />
        <SidebarLink icon="list_alt" label="Audit Logs" />
        <SidebarLink icon="settings" label="Settings" />
      </div>
    </nav>
  );
}

function SidebarLink({ icon, label, active = false, to = "#" }) {
  const activeClasses = active 
    ? "bg-surface-container text-tertiary font-semibold opacity-80" 
    : "text-secondary hover:text-on-surface hover:bg-surface-container-low";

  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-label-md text-label-md ${activeClasses}`}>
      <MaterialIcon icon={icon} />
      {label}
    </Link>
  );
}
