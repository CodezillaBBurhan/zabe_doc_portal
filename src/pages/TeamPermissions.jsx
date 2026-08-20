import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from '../components/atoms/MaterialIcon';

export default function TeamPermissions() {
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0f1c2d] leading-tight mb-2">Team & Permissions</h1>
          <p className="text-[15px] text-gray-500">
            Manage access control and user roles for the Election Center.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none justify-center flex items-center text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm">
            <MaterialIcon icon="settings" className="mr-2 text-[18px]" />
            Manage Permissions
          </button>
          <button 
            onClick={() => setIsAssignDrawerOpen(true)}
            className="flex-1 sm:flex-none justify-center flex items-center text-[14px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] rounded-md px-4 py-2 transition-colors shadow-sm"
          >
            <MaterialIcon icon="add" className="mr-1.5 text-[18px]" />
            Assign Member
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
        
        {/* Left Column (Table) */}
        <div className="flex-1 min-w-0 bg-white border border-[#e4e7ec] rounded-xl shadow-sm flex flex-col overflow-hidden w-full">
          
          {/* Table Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 gap-4">
            <div className="relative w-full sm:w-[320px]">
              <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
              <input 
                type="text"
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff8c42] text-gray-700"
              />
            </div>
            
            <button className="flex justify-center items-center text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors shrink-0">
              <MaterialIcon icon="filter_list" className="mr-2 text-[18px]" />
              Filter
            </button>
          </div>

          {/* Table Wrapper (Scrollable) */}
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[700px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-t border-[#e4e7ec] text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                  <th className="px-5 py-4 w-[280px]">NAME & EMAIL</th>
                  <th className="px-5 py-4 w-[160px]">ROLE</th>
                  <th className="px-5 py-4 w-[100px]">STATUS</th>
                  <th className="px-5 py-4 w-[140px]">LAST LOGIN</th>
                  <th className="px-5 py-4 w-[120px] text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e7ec]">
                
                {/* Row 1 (Selected) */}
                <tr className="bg-[#f0f5fc] border-l-2 border-l-[#005fb0] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                        <img src="https://i.pravatar.cc/150?u=sarah" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0f1c2d] mb-0.5 truncate">Sarah Jenkins</div>
                        <div className="text-[13px] text-gray-500 truncate">s.jenkins@election.gov</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#0f1c2d] font-semibold">
                    Operations Lead
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[#0f1c2d]">Today</div>
                    <div className="text-[12px] text-gray-500">08:42 AM</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center justify-center w-8 h-8 rounded text-gray-500 border border-[#e4e7ec] bg-white hover:bg-gray-50">
                        <MaterialIcon icon="visibility" className="text-[16px]" />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 rounded text-gray-500 border border-[#e4e7ec] bg-white hover:bg-gray-50">
                        <MaterialIcon icon="edit" className="text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50 transition-colors group border-l-2 border-l-transparent">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#005fb0] font-bold text-[14px] flex items-center justify-center shrink-0">
                        MR
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0f1c2d] mb-0.5 truncate">Marcus Rodriguez</div>
                        <div className="text-[13px] text-gray-500 truncate">m.rodriguez@election.gov</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#0f1c2d]">
                    Data Analyst
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[#0f1c2d]">Yesterday</div>
                    <div className="text-[12px] text-gray-500">14:30 PM</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center justify-center w-8 h-8 rounded text-gray-500 border border-[#e4e7ec] bg-white hover:bg-gray-50">
                        <MaterialIcon icon="visibility" className="text-[16px]" />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 rounded text-gray-500 border border-[#e4e7ec] bg-white hover:bg-gray-50">
                        <MaterialIcon icon="edit" className="text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-gray-50 transition-colors group border-l-2 border-l-transparent">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                        <img src="https://i.pravatar.cc/150?u=elena" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0f1c2d] mb-0.5 truncate">Elena Rostova</div>
                        <div className="text-[13px] text-gray-500 truncate">e.rostova@election.gov</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#0f1c2d]">
                    Broadcast Manager
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#fef3f2] text-[#b42318] border border-[#fecdca]">
                      Inactive
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[#0f1c2d]">Oct 12, 2023</div>
                    <div className="text-[12px] text-gray-500">-</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center justify-center w-8 h-8 rounded text-gray-500 border border-[#e4e7ec] bg-white hover:bg-gray-50">
                        <MaterialIcon icon="visibility" className="text-[16px]" />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 rounded text-gray-500 border border-[#e4e7ec] bg-white hover:bg-gray-50">
                        <MaterialIcon icon="edit" className="text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-[#e4e7ec]">
            <div className="text-[14px] text-gray-600 font-medium">
              Showing 1 to 3 of 24 entries
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 rounded text-[13px] font-medium border border-[#e4e7ec] text-gray-400 bg-gray-50 cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-1.5 rounded text-[13px] font-medium border border-[#e4e7ec] text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
          
        </div>

        {/* Right Column (Details Panel) */}
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6">
          <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm flex flex-col overflow-hidden">
            
            {/* Profile Header */}
            <div className="p-6 border-b border-[#e4e7ec] relative">
              <button className="absolute top-6 right-6 text-[13px] font-semibold text-[#005fb0] hover:text-[#004786]">
                Edit Profile
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 overflow-hidden border border-gray-200">
                  <img src="https://i.pravatar.cc/150?u=sarah" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#0f1c2d] mb-0.5">Sarah Jenkins</h2>
                  <div className="text-[14px] text-gray-500">Operations Lead</div>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col">
              {/* Access Permissions Block */}
              <div className="mb-6">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                  ACCESS PERMISSIONS
                </div>
                <div className="bg-[#f0f5fc] rounded-md py-2.5 px-4 text-center text-[11px] font-bold text-[#475467] tracking-wider mb-3">
                  32 PERMISSIONS &bull; 8 MODULES &bull; 24 MEMBERS
                </div>
                <button className="w-full flex items-center justify-center text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors">
                  <MaterialIcon icon="edit" className="mr-2 text-[16px]" />
                  Manage Permissions
                </button>
              </div>

              {/* Assigned Permissions Summary */}
              <div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                  ASSIGNED PERMISSIONS SUMMARY
                </div>
                <div className="flex flex-col gap-3">
                  
                  {/* Permission 1 */}
                  <div className="border border-[#e4e7ec] rounded-lg p-3 flex items-start gap-3 bg-white">
                    <div className="pt-0.5">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">Overview Dashboard</div>
                      <div className="text-[13px] text-gray-500 leading-tight">View real-time high-level metrics and system status.</div>
                    </div>
                  </div>

                  {/* Permission 2 */}
                  <div className="border border-[#e4e7ec] rounded-lg p-3 flex items-start gap-3 bg-white">
                    <div className="pt-0.5">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">Incident Management</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Report, escalate, and resolve active field incidents.</div>
                    </div>
                  </div>

                  {/* Permission 3 */}
                  <div className="border border-[#e4e7ec] rounded-lg p-3 flex items-start gap-3 bg-white">
                    <div className="pt-0.5">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">Ward/LGA Map Data</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Access geospatial polling unit data and regional stats.</div>
                    </div>
                  </div>

                  {/* Permission 4 */}
                  <div className="border border-[#e4e7ec] rounded-lg p-3 flex items-start gap-3 bg-white">
                    <div className="pt-0.5">
                      <input type="checkbox" className="rounded border-gray-300 text-[#ff8c42] focus:ring-[#ff8c42] w-4 h-4 cursor-pointer" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">TV Broadcast Control</div>
                      <div className="text-[13px] text-gray-500 leading-tight">Manage live feeds and lower-third graphic overlays.</div>
                    </div>
                  </div>

                  {/* Permission 5 */}
                  <div className="border border-[#e4e7ec] rounded-lg p-3 flex items-start gap-3 bg-[#f9fafb] opacity-75">
                    <div className="pt-0.5">
                      <input type="checkbox" disabled className="rounded border-gray-200 text-gray-400 focus:ring-transparent w-4 h-4 cursor-not-allowed bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-[14px] font-bold text-gray-500">Team Settings</div>
                        <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">Admin Only</span>
                      </div>
                      <div className="text-[13px] text-gray-400 leading-tight">Modify global access roles and invite new members.</div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-5 border-t border-[#e4e7ec] bg-[#f9fafb] flex items-center justify-end gap-3 mt-auto">
              <button className="px-4 py-2 rounded-md text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md text-[14px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
            
          </div>
        </div>

      </div>

      {/* Drawer Overlay */}
      {isAssignDrawerOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-[100] transition-opacity"
          onClick={() => setIsAssignDrawerOpen(false)}
        ></div>
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-2xl flex flex-col transition-transform duration-300 transform ${
          isAssignDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#e4e7ec] flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-[#0f1c2d] mb-1">Assign Member</h2>
            <p className="text-[13px] text-gray-500">Create a new user and assign their role and public access link.</p>
          </div>
          <button onClick={() => setIsAssignDrawerOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
            <MaterialIcon icon="close" className="text-[22px]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          {/* Select Member */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-[#475467] uppercase tracking-wider">SELECT MEMBER</label>
              <button className="text-[11px] font-semibold text-[#ff8c42] hover:text-[#ff7a22] flex items-center">
                <MaterialIcon icon="add" className="text-[12px] mr-0.5" />
                Create Member
              </button>
            </div>
            <div className="relative">
              <select className="w-full px-3 py-2.5 pr-10 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff8c42] text-gray-700 appearance-none bg-white cursor-pointer">
                <option>Select Existing Member</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">DESIGNATION</label>
            <div className="relative">
              <select className="w-full px-3 py-2.5 pr-10 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff8c42] text-gray-700 appearance-none bg-white cursor-pointer">
                <option>Select Designation</option>
                <option>DEO</option>
                <option>Returning Officer</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Role Level */}
          <div>
            <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-3">ROLE LEVEL</label>
            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="pt-0.5">
                  <input type="radio" name="role_level" defaultChecked className="w-4 h-4 text-[#ff8c42] border-gray-300 focus:ring-[#ff8c42] cursor-pointer" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">Level 1 (L1)</div>
                  <div className="text-[12px] text-gray-500">Basic data entry and viewing.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="pt-0.5">
                  <input type="radio" name="role_level" className="w-4 h-4 text-[#ff8c42] border-gray-300 focus:ring-[#ff8c42] cursor-pointer" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">Level 2 (L2)</div>
                  <div className="text-[12px] text-gray-500">Regional oversight and approvals.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="pt-0.5">
                  <input type="radio" name="role_level" className="w-4 h-4 text-[#ff8c42] border-gray-300 focus:ring-[#ff8c42] cursor-pointer" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#0f1c2d] mb-0.5">Level 3 (L3)</div>
                  <div className="text-[12px] text-gray-500">Full administrative access.</div>
                </div>
              </label>
            </div>
          </div>

          {/* Public Link Assignment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-[#475467] uppercase tracking-wider">PUBLIC LINK ASSIGNMENT</label>
              <button className="text-[11px] font-semibold text-[#ff8c42] hover:text-[#ff7a22] flex items-center">
                <MaterialIcon icon="add" className="text-[12px] mr-0.5" />
                Create Public Link
              </button>
            </div>
            <div className="relative">
              <select className="w-full px-3 py-2.5 pr-10 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff8c42] text-gray-700 appearance-none bg-white cursor-pointer">
                <option>Select Existing Link</option>
                <option>Kano North</option>
                <option>Lagos Central</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e4e7ec] bg-white shrink-0 flex items-center justify-end gap-3">
          <button onClick={() => setIsAssignDrawerOpen(false)} className="px-4 py-2 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2 text-[14px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] rounded-md transition-colors shadow-sm">
            Create Member
          </button>
        </div>
      </div>

    </div>
  );
}
