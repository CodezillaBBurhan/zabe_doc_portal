import React from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/atoms/MaterialIcon';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Avatar from '../components/atoms/Avatar';
import PageHeader from '../components/molecules/PageHeader';
export default function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Header */}
      <PageHeader 
        title="User Profile" 
        description="Manage access, roles, and permissions for this operative."
      >
        <Button variant="secondary" icon="edit">
          Edit Profile
        </Button>
        <Button variant="primary" icon="sync">
          Change Role
        </Button>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column - Profile Card */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            
            <div className="p-8 flex flex-col items-center border-b border-gray-200 relative">
              <div className="relative mb-4">
                <Avatar src="https://cdn.pixabay.com/photo/2021/03/21/13/28/woman-6112091_1280.jpg" name="Chiamaka Adebayo" size="xl" />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <h2 className="text-[22px] font-bold text-on-surface mb-1">Chiamaka Adebayo</h2>
              <div className="text-[14px] font-semibold text-orange-700">Operations Lead</div>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="mail" className="mr-2 text-[16px]" />
                  Email
                </div>
                <div className="text-[13px] font-semibold text-on-surface">
                  s.jenkins@command.gov
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="verified_user" className="mr-2 text-[16px]" />
                  Clearance
                </div>
                <Badge status="Info" text="Level 4" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="schedule" className="mr-2 text-[16px]" />
                  Last Login
                </div>
                <div className="text-[13px] font-semibold text-on-surface">
                  Today, 08:42 AM
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[13px]">
                  <MaterialIcon icon="location_on" className="mr-2 text-[16px]" />
                  Location
                </div>
                <div className="text-[13px] font-semibold text-on-surface">
                  National HQ
                </div>
              </div>
            </div>

            <div className="p-6 pt-2 flex flex-col gap-3">
              <Button variant="secondary" icon="lock_reset" className="w-full">
                Reset Password
              </Button>
              <Button variant="dangerLight" icon="block" className="w-full">
                Suspend User
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          
          {/* Active Permissions */}
          <div className="bg-surface-container-lowest border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center shrink-0">
                  <MaterialIcon icon="tune" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-on-surface mb-0.5">Active Permissions</h3>
                  <p className="text-[13px] text-gray-500">Role-based access control assignments.</p>
                </div>
              </div>
              <div className="text-[24px] font-bold text-on-surface flex items-baseline gap-1">
                12 <span className="text-[14px] font-medium text-gray-500">/ 32</span>
              </div>
            </div>

            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-green-600 text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-on-surface mb-0.5">View Operations Dashboard</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Read-only access to global operational metrics.</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-green-600 text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-on-surface mb-0.5">Manage Incident Reports</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Create, edit, and resolve priority incidents.</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-green-600 text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-on-surface mb-0.5">Access Historical Data</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Query past election cycle databases.</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <MaterialIcon icon="check_circle" className="text-green-600 text-[18px] mt-0.5" />
                <div>
                  <div className="text-[13px] font-bold text-on-surface mb-0.5">Approve Dispatch Requests</div>
                  <div className="text-[12px] text-gray-500 leading-tight">Authorization for field agent deployment.</div>
                </div>
              </div>

            </div>

            <div className="bg-blue-50 border-t border-gray-200 p-3 flex justify-center">
              <button className="text-[13px] font-semibold text-blue-700 hover:text-blue-800">
                View All 12 Permissions
              </button>
            </div>
          </div>

          {/* Recent System Activity */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-[16px] font-bold text-on-surface">Recent System Activity</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 text-[12px] font-bold text-gray-500 bg-white">
                    <th className="px-6 py-4 font-bold">Action</th>
                    <th className="px-6 py-4 font-bold">Target Module</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e7ec]">
                  
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
                        <MaterialIcon icon="login" className="text-[16px] text-gray-400" />
                        Authenticated
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      National Command Portal
                    </td>
                    <td className="px-6 py-4">
                      <Badge status="Success" />
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right">
                      Today, 08:42 AM
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
                        <MaterialIcon icon="description" className="text-[16px] text-gray-400" />
                        Updated Report
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      Incident #INC-4029
                    </td>
                    <td className="px-6 py-4">
                      <Badge status="Success" />
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right leading-tight">
                      Yesterday, 16:15<br/>PM
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
                        <MaterialIcon icon="download" className="text-[16px] text-gray-400" />
                        Exported Data
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500 leading-tight">
                      Ward Map Overlay<br/>(CSV)
                    </td>
                    <td className="px-6 py-4">
                      <Badge status="Success" />
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-500 text-right leading-tight">
                      Yesterday, 14:02<br/>PM
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
                        <MaterialIcon icon="api" className="text-[16px] text-gray-400" />
                        API Query Failed
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">
                      Historical Analysis
                    </td>
                    <td className="px-6 py-4">
                      <Badge status="Error" text="Timeout" />
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
