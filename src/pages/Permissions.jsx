import React from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';

export default function Permissions() {
  return (
    <div className="flex flex-col w-full pb-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-[13px] mb-4">
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
          Team & Permissions
        </span>
        <MaterialIcon icon="chevron_right" className="text-gray-400 mx-1 text-[18px]" />
        <span className="text-gray-900 font-semibold">
          Permissions
        </span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#0f1c2d] leading-tight mb-2">Permission Management</h1>
          <p className="text-[15px] text-gray-500">
            Manage and organize permissions available across the Election Center.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm">
            <MaterialIcon icon="upload" className="mr-2 text-[18px]" />
            Import Permissions
          </button>
          <button className="flex items-center text-[14px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] rounded-md px-4 py-2 transition-colors shadow-sm">
            <MaterialIcon icon="add" className="mr-1.5 text-[18px]" />
            Add Permission
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
        {/* Card 1 */}
        <div className="bg-white border border-[#e4e7ec] rounded-xl p-5 shadow-sm flex flex-col relative w-full">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <MaterialIcon icon="more_vert" className="text-[20px]" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="local_police" className="text-[#005fb0] text-[20px]" />
          </div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            TOTAL PERMISSIONS
          </div>
          <div className="text-[32px] font-bold text-[#0f1c2d] leading-none mt-1">
            32
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#e4e7ec] rounded-xl p-5 shadow-sm flex flex-col relative w-full">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <MaterialIcon icon="more_vert" className="text-[20px]" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center mb-4">
            <MaterialIcon icon="check_circle" className="text-[#039855] text-[20px]" />
          </div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            ACTIVE PERMISSIONS
          </div>
          <div className="flex items-end gap-2 mt-1">
            <div className="text-[32px] font-bold text-[#0f1c2d] leading-none">
              30
            </div>
            <div className="flex items-center text-[13px] font-bold text-[#039855] mb-1">
              <MaterialIcon icon="arrow_upward" className="text-[14px]" />
              94%
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#e4e7ec] rounded-xl p-5 shadow-sm flex flex-col relative w-full">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <MaterialIcon icon="more_vert" className="text-[20px]" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="grid_view" className="text-[#005fb0] text-[20px]" />
          </div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            MODULES
          </div>
          <div className="text-[32px] font-bold text-[#0f1c2d] leading-none mt-1">
            8
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#e4e7ec] rounded-xl p-5 shadow-sm flex flex-col relative w-full">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <MaterialIcon icon="more_vert" className="text-[20px]" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#fef3f2] flex items-center justify-center mb-4">
            <MaterialIcon icon="group" className="text-[#d92d20] text-[20px]" />
          </div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            ROLES USING PERMISSIONS
          </div>
          <div className="text-[32px] font-bold text-[#0f1c2d] leading-none mt-1">
            8
          </div>
        </div>
      </div>

      {/* Toolbar & Table Section */}
      <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm overflow-hidden flex flex-col w-full">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-[#e4e7ec] gap-4 w-full">
          {/* Search */}
          <div className="relative w-full sm:w-[320px]">
            <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
            <input 
              type="text"
              placeholder="Search permissions..."
              className="w-full pl-10 pr-4 py-2 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700"
            />
          </div>
          
          {/* Filters & Columns */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex justify-center items-center text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors">
              <MaterialIcon icon="filter_list" className="mr-2 text-[18px]" />
              Filters
            </button>
            <button className="flex-1 sm:flex-none flex justify-center items-center text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2 hover:bg-gray-50 transition-colors">
              <MaterialIcon icon="view_column" className="mr-2 text-[18px]" />
              Columns
            </button>
          </div>
        </div>

        {/* Table Container */}
        <GlobalTable minWidth="800px" className="text-[14px]">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e4e7ec] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-4 w-[50px] text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange w-4 h-4 cursor-pointer" />
                </th>
                <th className="px-5 py-4">PERMISSION</th>
                <th className="px-5 py-4">MODULE</th>
                <th className="px-5 py-4">ACCESS TYPE</th>
                <th className="px-5 py-4">STATUS</th>
                <th className="px-5 py-4">ROLES</th>
                <th className="px-5 py-4 w-[80px] text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-5 py-4 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange w-4 h-4 cursor-pointer" />
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-[#0f1c2d] mb-0.5">Approve Content</div>
                  <div className="text-[13px] text-gray-500">Approve reviewed content before publication</div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#eef4ff] text-[#3538cd] uppercase tracking-wide">
                    APPROVALS
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">Action</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a] mr-1.5"></span>
                    Active
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">3 roles</td>
                <td className="px-5 py-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MaterialIcon icon="more_vert" className="text-[20px]" />
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-5 py-4 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange w-4 h-4 cursor-pointer" />
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-[#0f1c2d] mb-0.5">View Analytics Dashboard</div>
                  <div className="text-[13px] text-gray-500">Access and view the main analytics dashboard</div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#eef4ff] text-[#3538cd] uppercase tracking-wide">
                    ANALYTICS
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">Read</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a] mr-1.5"></span>
                    Active
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">8 roles</td>
                <td className="px-5 py-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MaterialIcon icon="more_vert" className="text-[20px]" />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-5 py-4 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange w-4 h-4 cursor-pointer" />
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-[#0f1c2d] mb-0.5">Manage Incidents</div>
                  <div className="text-[13px] text-gray-500">Create, update, and resolve operational incidents</div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#fef3f2] text-[#b42318] uppercase tracking-wide">
                    INCIDENTS
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">Write</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a] mr-1.5"></span>
                    Active
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">2 roles</td>
                <td className="px-5 py-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MaterialIcon icon="more_vert" className="text-[20px]" />
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-5 py-4 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange w-4 h-4 cursor-pointer" />
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-[#0f1c2d] mb-0.5">Delete Historical Data</div>
                  <div className="text-[13px] text-gray-500">Permanently remove historical analysis records</div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#f2f4f7] text-[#344054] uppercase tracking-wide">
                    HISTORY
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">Delete</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#f2f4f7] text-[#344054] border border-[#e4e7ec]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#98a2b3] mr-1.5"></span>
                    Inactive
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">0 roles</td>
                <td className="px-5 py-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MaterialIcon icon="more_vert" className="text-[20px]" />
                  </button>
                </td>
              </tr>

            </tbody>
          </GlobalTable>

        {/* Footer & Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-t border-[#e4e7ec] bg-white gap-4 w-full">
          <div className="text-[14px] text-gray-600 font-medium">
            Showing <span className="font-bold text-[#0f1c2d]">1–15</span> of <span className="font-bold text-[#0f1c2d]">32</span> permissions
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-8 h-8 rounded border border-[#e4e7ec] text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
              <MaterialIcon icon="chevron_left" className="text-[20px]" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded bg-[#ff8c42] text-white font-medium shadow-sm">
              1
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded border border-[#e4e7ec] text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              2
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded border border-[#e4e7ec] text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              3
            </button>
            <span className="flex items-center justify-center w-8 h-8 text-gray-500">
              ...
            </span>
            <button className="flex items-center justify-center w-8 h-8 rounded border border-[#e4e7ec] text-gray-600 hover:bg-gray-50 transition-colors">
              <MaterialIcon icon="chevron_right" className="text-[20px]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
