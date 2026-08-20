import React from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';

export default function Notifications() {
  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#0f1c2d] leading-tight mb-2">Notifications</h1>
          <p className="text-[15px] text-gray-500">
            Stay updated on requests, approvals, incidents and system events.
          </p>
        </div>
        <button className="flex items-center text-[14px] font-semibold text-[#9b4500] hover:text-[#7a3600] transition-colors mt-2">
          <MaterialIcon icon="done_all" className="mr-2 text-[18px]" />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#e4e7ec] mb-8">
        <button className="px-1 py-3 text-[14px] font-semibold text-[#9b4500] border-b-2 border-[#9b4500] mr-6">
          All
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 mr-6">
          Requests
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 mr-6">
          Approvals
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 mr-6">
          Incidents
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700">
          System
        </button>
      </div>

      {/* TODAY Section */}
      <div className="mb-10">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">TODAY</h2>
        
        <div className="bg-white border border-[#e4e7ec] rounded-lg shadow-sm flex flex-col w-full overflow-hidden">
          
          {/* Notification 1 */}
          <div className="flex items-start p-5 border-b border-[#e4e7ec] bg-[#f9fbff] relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff8c42]"></div>
            
            <div className="w-10 h-10 rounded-lg bg-[#fef3f2] border border-[#fecdca] flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="warning_amber" className="text-[#d92d20] text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-[#0f1c2d] mb-1 truncate">
                Critical Incident Reported: Polling Unit 042
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Equipment failure reported at Polling Unit 042. Immediate technical support required. Backup BVAS requested by Presiding Officer.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">10:45 AM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff8c42] ring-4 ring-[#ff8c42]/20"></div>
            </div>
          </div>
          
          {/* Notification 2 */}
          <div className="flex items-start p-5 border-b border-[#e4e7ec] bg-[#f9fbff] relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff8c42]"></div>
            
            <div className="w-10 h-10 rounded-lg bg-[#ecfdf3] border border-[#a6f4c5] flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="fact_check" className="text-[#039855] text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-[#0f1c2d] mb-1 truncate">
                Approval Required: Personnel Deployment
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Regional Commander has requested approval for emergency deployment of 50 additional security personnel to Zone C.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">09:12 AM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff8c42] ring-4 ring-[#ff8c42]/20"></div>
            </div>
          </div>
          
          {/* Notification 3 */}
          <div className="flex items-start p-5 bg-white relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent"></div>
            
            <div className="w-10 h-10 rounded-lg bg-[#f2f4f7] border border-[#e4e7ec] flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="inbox" className="text-[#475467] text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-[#475467] mb-1 truncate">
                New Information Request: Media Briefing
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Public Relations team requested latest turnout statistics for the 10:00 AM press briefing. Data package generated and awaiting review.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">07:30 AM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-transparent"></div>
            </div>
          </div>
          
        </div>
      </div>

      {/* YESTERDAY Section */}
      <div className="mb-10">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">YESTERDAY</h2>
        
        <div className="bg-white border border-[#e4e7ec] rounded-lg shadow-sm flex flex-col w-full overflow-hidden">
          
          {/* Notification 4 */}
          <div className="flex items-start p-5 border-b border-[#e4e7ec] bg-white relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent"></div>
            
            <div className="w-10 h-10 rounded-lg bg-[#eff8ff] border border-[#b2ddff] flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="settings" className="text-[#175cd3] text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-[#475467] mb-1 truncate">
                System Update Completed
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Database synchronization v2.4.1 has been successfully deployed across all regional command nodes. No downtime reported.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">Yesterday, 11:45 PM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-transparent"></div>
            </div>
          </div>
          
          {/* Notification 5 */}
          <div className="flex items-start p-5 bg-white relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent"></div>
            
            <div className="w-10 h-10 rounded-lg bg-[#ecfdf3] border border-[#a6f4c5] flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="fact_check" className="text-[#039855] text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-[#475467] mb-1 truncate">
                Logistics Plan Approved
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Final logistics distribution plan for Northern Sector has been approved by the Director of Operations. Dispatch begins at 0600 hrs.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">Yesterday, 04:20 PM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-transparent"></div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
