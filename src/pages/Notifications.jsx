import React from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';

export default function Notifications() {
  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Page Header */}
      <PageHeader
        title="Notifications"
        description="Stay updated on requests, approvals, incidents and system events."
      >
        <Button variant="ghostPrimary" className="h-auto p-2" icon="done_all">
          Mark all as read
        </Button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
        <button className="px-1 py-3 text-[14px] font-semibold text-orange-700 border-b-2 border-orange-700 mr-6 shrink-0">
          All
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 mr-6 shrink-0">
          Requests
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 mr-6 shrink-0">
          Approvals
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 mr-6 shrink-0">
          Incidents
        </button>
        <button className="px-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 shrink-0">
          System
        </button>
      </div>

      {/* TODAY Section */}
      <div className="mb-10">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">TODAY</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col w-full overflow-hidden">
          
          {/* Notification 1 */}
          <div className="flex items-start p-5 border-b border-gray-200 bg-blue-50 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange"></div>
            
            <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="warning_amber" className="text-red-600 text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-on-surface mb-1 truncate">
                Critical Incident Reported: Polling Unit 042
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Equipment failure reported at Polling Unit 042. Immediate technical support required. Backup BVAS requested by Presiding Officer.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">10:45 AM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-orange ring-4 ring-brand-orange/20"></div>
            </div>
          </div>
          
          {/* Notification 2 */}
          <div className="flex items-start p-5 border-b border-gray-200 bg-blue-50 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange"></div>
            
            <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="fact_check" className="text-green-600 text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-on-surface mb-1 truncate">
                Approval Required: Personnel Deployment
              </h3>
              <p className="text-[14px] text-gray-500 leading-snug">
                Regional Commander has requested approval for emergency deployment of 50 additional security personnel to Zone C.
              </p>
            </div>
            
            <div className="flex items-center shrink-0 pt-1">
              <span className="text-[12px] text-gray-400 mr-3">09:12 AM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-orange ring-4 ring-brand-orange/20"></div>
            </div>
          </div>
          
          {/* Notification 3 */}
          <div className="flex items-start p-5 bg-white relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent"></div>
            
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="inbox" className="text-secondary text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-secondary mb-1 truncate">
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
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col w-full overflow-hidden">
          
          {/* Notification 4 */}
          <div className="flex items-start p-5 border-b border-gray-200 bg-white relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent"></div>
            
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="settings" className="text-blue-700 text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-secondary mb-1 truncate">
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
            
            <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0 mr-4">
              <MaterialIcon icon="fact_check" className="text-green-600 text-[20px]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-[14px] font-semibold text-secondary mb-1 truncate">
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
