import React from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/atoms/MaterialIcon';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';

export default function ManagePermission() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Header */}
      <PageHeader
        title="Manage Permissions"
        description="Configure access control and modules for this operative."
      >
        <Button variant="secondary" onClick={() => navigate('/team')} icon="arrow_back">
          Back to Team
        </Button>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        
        {/* Left Column - User Context */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
          <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm flex flex-col items-center p-8 text-center relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#fff3eb] to-[#ffecd9]"></div>
            
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden relative z-10 mb-4 mt-4">
              <img src="https://cdn.pixabay.com/photo/2021/03/21/13/28/woman-6112091_1280.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            
            <h2 className="text-[22px] font-bold text-[#0f1c2d] mb-1 relative z-10">Chiamaka Adebayo</h2>
            <div className="text-[14px] font-semibold text-[#b35e22] mb-6 relative z-10">Operations Lead</div>
            
            <div className="w-full bg-[#f9fafb] border border-[#e4e7ec] rounded-lg p-4 flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-gray-500">Active Permissions</span>
                <span className="text-[14px] font-bold text-[#0f1c2d]">32</span>
              </div>
              <div className="h-px w-full bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-gray-500">Modules Access</span>
                <span className="text-[14px] font-bold text-[#0f1c2d]">8</span>
              </div>
              <div className="h-px w-full bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-gray-500">Role Level</span>
                <span className="text-[14px] font-bold text-[#0f1c2d]">L4</span>
              </div>
            </div>

            <Button 
              variant="primaryLight"
              onClick={() => navigate('/profile')}
              className="w-full"
              icon="person"
            >
              View Full Profile
            </Button>
          </div>
        </div>

        {/* Right Column - Permissions Matrix */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-[#e4e7ec] bg-[#f9fafb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[18px] font-bold text-[#0f1c2d] mb-1">Assigned Permissions Matrix</h3>
                <p className="text-[13px] text-gray-500">Control exactly which modules and actions this operative can perform.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="secondary">
                  Clear All
                </Button>
                <Button variant="primaryLight">
                  Select All
                </Button>
              </div>
            </div>

            {/* Matrix Content */}
            <div className="p-6 flex flex-col gap-8">
              
              {/* Module Group 1 */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <MaterialIcon icon="dashboard" className="text-gray-400 text-[18px]" />
                  <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">Dashboards & Overview</h4>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <label className="border border-[#ff8c42] bg-[#fff3eb] rounded-lg p-4 flex items-start gap-3 cursor-pointer group transition-colors">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-1">Global Overview Dashboard</div>
                      <div className="text-[13px] text-gray-500 leading-tight">View real-time high-level metrics, turnout, and global system status.</div>
                    </div>
                  </label>

                  <label className="border border-[#e4e7ec] hover:border-[#ffb782] bg-white rounded-lg p-4 flex items-start gap-3 cursor-pointer group transition-colors">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-1 group-hover:text-[#ff8c42] transition-colors">Regional Analytics</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Deep dive into state and LGA level analytical dashboards.</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Module Group 2 */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <MaterialIcon icon="warning" className="text-gray-400 text-[18px]" />
                  <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">Operations & Incidents</h4>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <label className="border border-[#ff8c42] bg-[#fff3eb] rounded-lg p-4 flex items-start gap-3 cursor-pointer group transition-colors">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-1">Incident Management</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Report, escalate, resolve, and close active field incidents.</div>
                    </div>
                  </label>

                  <label className="border border-[#e4e7ec] hover:border-[#ffb782] bg-white rounded-lg p-4 flex items-start gap-3 cursor-pointer group transition-colors">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-1 group-hover:text-[#ff8c42] transition-colors">Dispatch Requests</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Approve or deny requests for field operative deployments.</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Module Group 3 */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <MaterialIcon icon="map" className="text-gray-400 text-[18px]" />
                  <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">Geospatial & Broadcast</h4>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <label className="border border-[#ff8c42] bg-[#fff3eb] rounded-lg p-4 flex items-start gap-3 cursor-pointer group transition-colors">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-1">Ward/LGA Map Data</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Access geospatial polling unit data and regional risk heatmaps.</div>
                    </div>
                  </label>

                  <label className="border border-[#e4e7ec] hover:border-[#ffb782] bg-white rounded-lg p-4 flex items-start gap-3 cursor-pointer group transition-colors">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-1 group-hover:text-[#ff8c42] transition-colors">TV Broadcast Control</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Manage live feeds, lower-third overlays, and studio output signals.</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Module Group 4 (Admin) */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <MaterialIcon icon="admin_panel_settings" className="text-gray-400 text-[18px]" />
                  <h4 className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">Administration</h4>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <label className="border border-[#e4e7ec] bg-[#f9fafb] opacity-70 rounded-lg p-4 flex items-start gap-3 cursor-not-allowed">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" disabled className="rounded border-gray-300 text-gray-400 focus:ring-transparent w-4 h-4 bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[14px] font-bold text-gray-500">Team Settings</div>
                        <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Admin Only</span>
                      </div>
                      <div className="text-[13px] text-gray-400 leading-tight">Modify global access roles, invite members, and edit permissions.</div>
                    </div>
                  </label>

                  <label className="border border-[#e4e7ec] bg-[#f9fafb] opacity-70 rounded-lg p-4 flex items-start gap-3 cursor-not-allowed">
                    <div className="pt-0.5 shrink-0">
                      <input type="checkbox" disabled className="rounded border-gray-300 text-gray-400 focus:ring-transparent w-4 h-4 bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[14px] font-bold text-gray-500">System Logs</div>
                        <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Admin Only</span>
                      </div>
                      <div className="text-[13px] text-gray-400 leading-tight">Access raw audit logs, system performance metrics, and database backups.</div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-[#e4e7ec] bg-[#f9fafb] flex items-center justify-end gap-3 mt-auto">
              <Button variant="secondary" onClick={() => navigate('/team')}>
                Cancel Changes
              </Button>
              <Button icon="save">
                Save Permissions
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
