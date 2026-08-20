import React from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';

export default function AuditLogs() {
  const auditData = [
    { time: '10:42:15 AM', user: 'System_Service', role: 'Automation', action: 'Data_Sync', module: 'Voter_DB', target: 'tbl_precinct' },
    { time: '10:38:02 AM', user: 'A. Mitchell', role: 'Lead Ops', action: 'Override_Config', module: 'Core_Routing', target: 'node_alpha_config' },
    { time: '10:15:44 AM', user: 'J. Harrison', role: 'Analyst', action: 'Export_Report', module: 'Reports', target: 'turnout_Q3_config' },
    { time: '09:55:10 AM', user: 'S. Vance', role: 'Admin', action: 'Modify_Perms', module: 'Auth_Control', target: 'usr_grp_field' },
    { time: '09:12:05 AM', user: 'System_Service', role: 'Automation', action: 'Health_Check', module: 'Infrastructure', target: 'cluster_node' },
  ];

  const chartBars = Array.from({ length: 24 }).map((_, i) => {
    // Generate random heights, make one red
    const isCritical = i === 14;
    const height = isCritical ? '40%' : `${Math.random() * 40 + 10}%`;
    return { height, isCritical };
  });
  
  // Overwrite some to match image vaguely
  const barHeights = [10, 15, 20, 10, 30, 45, 30, 60, 65, 55, 40, 25, 15, 35, 40, 30, 50, 60, 55, 40, 20, 20];
  const actualBars = Array.from({length: 22}).map((_, i) => ({
    height: `${barHeights[i]}%`,
    isCritical: i === 13,
    topBlue: [4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19].includes(i) // some bars have a top darker line in image
  }));

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
      
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] leading-tight">Audit Logs</h1>
          <p className="text-[14px] text-gray-500 mt-1">Track every important action performed across the Election Center.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <MaterialIcon icon="filter_list" className="text-gray-500 text-[20px]" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ff8c42] hover:bg-[#ff7a22] text-white rounded-md shadow-sm text-sm font-medium">
            <MaterialIcon icon="download" className="text-white text-[20px]" />
            Export
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="relative flex-1 min-w-[280px]">
            <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
            <input 
              type="text" 
              placeholder="Search users, actions, targets..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
            />
          </div>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer">
              <option>Date Range: Last 24h</option>
            </select>
            <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer">
              <option>User: All</option>
            </select>
            <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
          </div>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 ml-auto font-medium">
            <MaterialIcon icon="close" className="text-[18px]" />
            Clear Filters
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer">
              <option>Severity: All</option>
            </select>
            <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer">
              <option>Status: All</option>
            </select>
            <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
            Date: Last 24h
            <MaterialIcon icon="close" className="text-[14px] cursor-pointer hover:text-gray-900" />
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-xs font-medium text-red-700">
            Severity: Critical
            <MaterialIcon icon="close" className="text-[14px] cursor-pointer hover:text-red-900" />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Table & Chart) */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Audit Log Table Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-semibold tracking-wider text-[11px] uppercase">
                    <th className="px-5 py-4">TIMESTAMP</th>
                    <th className="px-5 py-4">USER</th>
                    <th className="px-5 py-4">ROLE</th>
                    <th className="px-5 py-4">ACTION</th>
                    <th className="px-5 py-4">MODULE</th>
                    <th className="px-5 py-4">TARGET</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auditData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 text-gray-600">
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500">{row.time}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-900">{row.user}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500">{row.role}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-900">{row.action}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500">{row.module}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-mono text-[12px] text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                          {row.target}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="border-t border-gray-200 px-5 py-3 flex items-center justify-between text-[13px] text-gray-500 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <span>Showing 1-25 of 1,248</span>
                <div className="flex items-center gap-2">
                  <span>Rows per page:</span>
                  <div className="relative">
                    <select className="appearance-none bg-transparent pr-5 font-medium text-gray-700 focus:outline-none cursor-pointer">
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                    <MaterialIcon icon="expand_more" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-[16px] pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 bg-gray-100 font-medium">1</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50">2</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50">3</button>
                <span className="px-2">...</span>
                <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50">50</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-500 hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">AUDIT ACTIVITY — LAST 24 HOURS</h3>
            
            <div className="h-40 flex items-end justify-between gap-1 mb-2 border-b border-gray-100 pb-2">
              {actualBars.map((bar, i) => (
                <div key={i} className="w-full flex flex-col justify-end h-full relative group">
                  <div 
                    className={`w-full rounded-t-sm transition-all ${bar.isCritical ? 'bg-red-50' : 'bg-[#f0f5fc]'}`} 
                    style={{ height: bar.height }}
                  >
                    {bar.isCritical && (
                      <div className="w-full h-1 bg-red-500 rounded-t-sm absolute top-0" style={{top: `calc(100% - ${bar.height})`}}></div>
                    )}
                    {!bar.isCritical && bar.topBlue && (
                      <div className="w-full h-1 bg-blue-400 rounded-t-sm absolute top-0" style={{top: `calc(100% - ${bar.height})`}}></div>
                    )}
                    {!bar.isCritical && !bar.topBlue && (
                      <div className="w-full h-1 bg-blue-300 rounded-t-sm absolute top-0" style={{top: `calc(100% - ${bar.height})`}}></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>12:00 PM (Yesterday)</span>
              <span>12:00 AM</span>
              <span>12:00 PM (Today)</span>
            </div>
          </div>
          
        </div>
        
        {/* Right Column (Cards) */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Today's Activity */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">TODAY'S ACTIVITY</h3>
            
            <div className="mb-5">
              <div className="text-[13px] text-gray-500 mb-1">Total Events</div>
              <div className="flex items-baseline gap-3">
                <div className="text-[36px] font-bold text-gray-900 leading-none">1,248</div>
                <div className="flex items-center text-[#12B76A] text-[13px] font-medium">
                  <MaterialIcon icon="trending_up" className="text-[16px] mr-0.5" />
                  +12%
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-5 flex justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">FAILED</div>
                <div className="text-[20px] font-bold text-[#d92d20]">14</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">BLOCKED</div>
                <div className="text-[20px] font-bold text-[#d92d20]">3</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">CRITICAL</div>
                <div className="text-[20px] font-bold text-[#d92d20]">8</div>
              </div>
            </div>
          </div>
          
          {/* Critical Events */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="warning_amber" className="text-[#d92d20] text-[20px]" />
              <h3 className="text-[11px] font-bold text-[#d92d20] uppercase tracking-wider">CRITICAL EVENTS</h3>
            </div>
            
            <div className="flex flex-col">
              {/* Event 1 */}
              <div className="relative pl-5 py-3 border-b border-gray-100 last:border-0">
                <div className="absolute left-0 top-[18px] w-2 h-2 rounded-full bg-[#d92d20]"></div>
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-[13px] text-gray-900">Override Configuration</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">10:38 AM</div>
                </div>
                <div className="text-[12px] text-gray-500 leading-relaxed">
                  A. Mitchell attempted Core_Routing override.
                </div>
              </div>
              
              {/* Event 2 */}
              <div className="relative pl-5 py-3 border-b border-gray-100 last:border-0">
                <div className="absolute left-0 top-[18px] w-2 h-2 rounded-full bg-[#d92d20]"></div>
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-[13px] text-gray-900">DB Connection Failed</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">08:14 AM</div>
                </div>
                <div className="text-[12px] text-gray-500 leading-relaxed">
                  System_Service failed to connect to Replica_3.
                </div>
              </div>
              
              {/* Event 3 */}
              <div className="relative pl-5 py-3 border-b border-gray-100 last:border-0">
                <div className="absolute left-0 top-[18px] w-2 h-2 rounded-full bg-[#d92d20]"></div>
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-[13px] text-gray-900">Mass Permission Alter</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">02:11 AM</div>
                </div>
                <div className="text-[12px] text-gray-500 leading-relaxed">
                  S. Vance modified 42 user roles in batch.
                </div>
              </div>
            </div>
          </div>
          
          {/* Most Active Users */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="group" className="text-gray-500 text-[20px]" />
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">MOST ACTIVE USERS</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* User 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e6eeff] text-[#005fb0] flex items-center justify-center text-[14px] font-bold shrink-0">
                    SS
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-gray-900">System_Service</div>
                    <div className="text-[11px] text-gray-500">Automation</div>
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 flex flex-col items-end">
                  <span className="font-semibold text-gray-700 text-[13px]">842</span>
                  acts
                </div>
              </div>
              
              {/* User 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffeddf] text-[#9b4500] flex items-center justify-center text-[14px] font-bold shrink-0">
                    SV
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-gray-900">S. Vance</div>
                    <div className="text-[11px] text-gray-500">Admin</div>
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 flex flex-col items-end">
                  <span className="font-semibold text-gray-700 text-[13px]">156</span>
                  acts
                </div>
              </div>
              
              {/* User 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f3e8ff] text-[#6b21a8] flex items-center justify-center text-[14px] font-bold shrink-0">
                    AM
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-gray-900">A. Mitchell</div>
                    <div className="text-[11px] text-gray-500">Lead Ops</div>
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 flex flex-col items-end">
                  <span className="font-semibold text-gray-700 text-[13px]">89</span>
                  acts
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
