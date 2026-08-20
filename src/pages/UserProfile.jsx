import React from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/atoms/MaterialIcon';

export default function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#0f1c2d] leading-tight mb-1">User Profile</h1>
          <p className="text-[14px] text-gray-500">
            Manage access, roles, and permissions for this operative.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center text-[13px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm">
            <MaterialIcon icon="edit" className="mr-2 text-[16px]" />
            Edit Profile
          </button>
          <button className="flex items-center text-[13px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] rounded-md px-4 py-2 transition-colors shadow-sm">
            <MaterialIcon icon="sync" className="mr-1.5 text-[16px]" />
            Change Role
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column - Profile Card */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm overflow-hidden flex flex-col">
            
            <div className="p-8 flex flex-col items-center border-b border-[#e4e7ec] relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden relative mb-4">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[88px] right-[125px] w-4 h-4 bg-[#12b76a] border-2 border-white rounded-full"></div>
              
              <h2 className="text-[22px] font-bold text-[#0f1c2d] mb-1">Sarah Jenkins</h2>
              <div className="text-[14px] font-semibold text-[#b35e22]">Operations Lead</div>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="mail" className="mr-2 text-[16px]" />
                  Email
                </div>
                <div className="text-[13px] font-semibold text-[#0f1c2d]">
                  s.jenkins@command.gov
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="verified_user" className="mr-2 text-[16px]" />
                  Clearance
                </div>
                <div className="bg-[#eff4ff] text-[#005fb0] text-[11px] font-bold px-2 py-0.5 rounded">
                  Level 4
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="schedule" className="mr-2 text-[16px]" />
                  Last Login
                </div>
                <div className="text-[13px] font-semibold text-[#0f1c2d]">
                  Today, 08:42 AM
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="location_on" className="mr-2 text-[16px]" />
                  Location
                </div>
                <div className="text-[13px] font-semibold text-[#0f1c2d]">
                  National HQ
                </div>
              </div>
            </div>

            <div className="p-6 pt-2 flex flex-col gap-3">
              <button className="w-full flex items-center justify-center text-[13px] font-semibold text-[#344054] bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors">
                <MaterialIcon icon="lock_reset" className="mr-2 text-[18px]" />
                Reset Password
              </button>
              <button className="w-full flex items-center justify-center text-[13px] font-semibold text-[#d92d20] bg-[#fef3f2] border border-[#fecdca] rounded-md px-4 py-2 hover:bg-[#fee4e2] transition-colors">
                <MaterialIcon icon="block" className="mr-2 text-[16px]" />
                Suspend User
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          
          {/* Active Permissions */}
          <div className="bg-[#f8f9fa] border border-[#e4e7ec] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#eff4ff] text-[#005fb0] rounded-lg flex items-center justify-center shrink-0">
                  <MaterialIcon icon="tune" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f1c2d] mb-0.5">Active Permissions</h3>
                  <p className="text-[13px] text-gray-500">Role-based access control assignments.</p>
                </div>
              </div>
              <div className="text-[24px] font-bold text-[#0f1c2d] flex items-baseline gap-1">
                12 <span className="text-[14px] font-medium text-gray-500">/ 32</span>
              </div>
            </div>

            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-white border border-[#e4e7ec] rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-[#12b76a] text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">View Operations Dashboard</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Read-only access to global operational metrics.</div>
                </div>
              </div>

              <div className="bg-white border border-[#e4e7ec] rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-[#12b76a] text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">Manage Incident Reports</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Create, edit, and resolve priority incidents.</div>
                </div>
              </div>

              <div className="bg-white border border-[#e4e7ec] rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-[#12b76a] text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">Access Historical Data</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Query past election cycle databases.</div>
                </div>
              </div>

              <div className="bg-white border border-[#e4e7ec] rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-[#12b76a] text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">Approve Dispatch Requests</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Authorization for field agent deployment.</div>
                </div>
              </div>

            </div>

            <div className="bg-[#eff4ff] border-t border-[#e4e7ec] p-3 flex justify-center">
              <button className="text-[13px] font-semibold text-[#005fb0] hover:text-[#004786]">
                View All 12 Permissions
              </button>
            </div>
          </div>

          {/* Recent System Activity */}
          <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#e4e7ec]">
              <h3 className="text-[16px] font-bold text-[#0f1c2d]">Recent System Activity</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#e4e7ec] text-[12px] font-bold text-gray-500 bg-white">
                    <th className="px-6 py-4 font-bold">Action</th>
                    <th className="px-6 py-4 font-bold">Target Module</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e7ec]">
                  
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-[#344054]">
                        <MaterialIcon icon="login" className="text-[16px] text-gray-400" />
                        Authenticated
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      National Command Portal
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#ecfdf3] text-[#027a48]">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right">
                      Today, 08:42 AM
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-[#344054]">
                        <MaterialIcon icon="description" className="text-[16px] text-gray-400" />
                        Updated Report
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      Incident #INC-4029
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#ecfdf3] text-[#027a48]">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right leading-tight">
                      Yesterday, 16:15<br/>PM
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-[#344054]">
                        <MaterialIcon icon="download" className="text-[16px] text-gray-400" />
                        Exported Data
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500 leading-tight">
                      Ward Map Overlay<br/>(CSV)
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#ecfdf3] text-[#027a48]">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right leading-tight">
                      Yesterday, 14:02<br/>PM
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-[#344054]">
                        <MaterialIcon icon="api" className="text-[16px] text-gray-400" />
                        API Query Failed
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      Historical Analysis
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#fef3f2] text-[#b42318]">
                        Timeout
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right leading-tight">
                      Yesterday, 11:30<br/>AM
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
