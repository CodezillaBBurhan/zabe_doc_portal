import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MembersAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';


const PAGE_SIZE = 10;

export default function Members() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const data = await MembersAPI.getAll();
      setMembers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [selectedMember, setSelectedMember] = useState(null);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Filter State
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    role: 'Level 1 (L1)'
  });
  const [errors, setErrors] = useState({});

  // Filter Options
  const roleOptions = ['All', 'L1', 'L2', 'L3'];
  const statusOptions = ['All', 'Active', 'Inactive'];

  // Apply Filters
  const filteredMembers = members.filter(member => {
    const matchesRole = filterRole === 'All' || member.role === filterRole;
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  const hasActiveFilters = filterRole !== 'All' || filterStatus !== 'All';

  const clearFilters = () => {
    setFilterRole('All');
    setFilterStatus('All');
    setCurrentPage(1);
  };

  // Calculate Pagination
  const totalPages = Math.ceil(filteredMembers.length / PAGE_SIZE) || 1;
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Sync currentPage if out of bounds after filtering or deletion
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1); // Reset pagination on filter change
  };

  // Drawer Handlers
  const handleOpenAdd = () => {
    setDrawerMode('add');
    setSelectedMember(null);
    setFormData({
      name: '',
      email: '',
      designation: '',
      role: 'Level 1 (L1)'
    });
    setErrors({});
    setDrawerOpen(true);
  };

  const handleOpenEdit = (member) => {
    setDrawerMode('edit');
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email || '',
      designation: member.designation,
      role: member.role === 'L1' ? 'Level 1 (L1)' : member.role === 'L2' ? 'Level 2 (L2)' : 'Level 3 (L3)'
    });
    setErrors({});
    setDrawerOpen(true);
  };

  const handleOpenView = (member) => {
    setDrawerMode('view');
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email || '',
      designation: member.designation,
      role: member.role === 'L1' ? 'Level 1 (L1)' : member.role === 'L2' ? 'Level 2 (L2)' : 'Level 3 (L3)'
    });
    setErrors({});
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Validation & Submit
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (drawerMode === 'view') return;
    if (!validate()) return;

    const roleCode = formData.role.includes('L1') ? 'L1' : formData.role.includes('L2') ? 'L2' : 'L3';
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setIsLoading(true);
    try {
      if (drawerMode === 'add') {
        const newMember = await MembersAPI.create({
          name: formData.name,
          email: formData.email,
          designation: formData.designation,
          role: roleCode,
          status: 'Active',
          addedOn: dateStr // renamed from createdDate based on mock db structure
        });
        setMembers([...members, newMember]);
      } else if (drawerMode === 'edit') {
        const updatedMember = await MembersAPI.update(selectedMember.id, {
          name: formData.name,
          email: formData.email,
          designation: formData.designation,
          role: roleCode
        });
        setMembers(members.map(m => m.id === selectedMember.id ? updatedMember : m));
      }
      handleCloseDrawer();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Handlers
  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      setIsLoading(true);
      try {
        await MembersAPI.delete(memberToDelete.id);
        setMembers(members.filter(m => m.id !== memberToDelete.id));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    setDeleteModalOpen(false);
    setMemberToDelete(null);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col w-full pb-10 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#0f1c2d] leading-tight mb-2">Members</h1>
          <p className="text-[15px] text-gray-500">
            Manage users and roles.
          </p>
        </div>
        <div className="shrink-0">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center text-[14px] font-semibold text-white bg-[#ff5a1f] hover:bg-[#e64a10] rounded-md px-4 py-2 transition-colors shadow-sm"
          >
            <MaterialIcon icon="add" className="mr-1.5 text-[18px]" />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 flex-wrap">
        
        {/* Role Filter */}
        <div className="relative w-full sm:w-[160px]">
          <select
            value={filterRole}
            onChange={(e) => handleFilterChange(setFilterRole, e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-[14px] font-medium text-gray-700 bg-white border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff8c42] appearance-none shadow-sm cursor-pointer"
          >
            {roleOptions.map(opt => (
              <option key={opt} value={opt}>Role: {opt}</option>
            ))}
          </select>
          <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[18px]" />
        </div>

        {/* Status Filter */}
        <div className="relative w-full sm:w-[160px]">
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(setFilterStatus, e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-[14px] font-medium text-gray-700 bg-white border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff8c42] appearance-none shadow-sm cursor-pointer"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>Status: {opt}</option>
            ))}
          </select>
          <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[18px]" />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center justify-center text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent rounded-md px-3 py-2.5 transition-colors"
          >
            <MaterialIcon icon="filter_alt_off" className="mr-1.5 text-[16px]" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm flex flex-col w-full mb-6">
        <GlobalTable minWidth="900px" wrapperClassName="rounded-xl">
            <thead>
              <tr className="border-b border-[#e4e7ec] bg-white text-[13px] font-medium text-gray-500 tracking-wide">
                <th className="px-6 py-5 text-left">User</th>
                <th className="px-6 py-5 text-left">Designation</th>
                <th className="px-6 py-5 text-left">Role</th>
                <th className="px-6 py-5 text-left">Status</th>
                <th className="px-6 py-5 text-left">Created Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12">
                    <Spinner />
                  </td>
                </tr>
              ) : paginatedMembers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12">
                    <EmptyState title="No members found" description="There are no members matching your current filters." />
                  </td>
                </tr>
              ) : (
                paginatedMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#f0f5fc] text-[#475467] font-bold text-[13px] flex items-center justify-center shrink-0">
                          {getInitials(member.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#0f1c2d] truncate">{member.name}</div>
                          {member.email && <div className="text-[13px] text-gray-500 truncate hidden">{member.email}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{member.designation || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{member.role}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center text-[14px] ${member.status === 'Active' ? 'text-[#027a48]' : 'text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${member.status === 'Active' ? 'bg-[#12b76a]' : 'bg-gray-400'}`}></span>
                        {member.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{member.addedOn || member.createdDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 text-gray-400 relative">
                        <button 
                          onClick={() => handleOpenView(member)}
                          className="hover:text-[#005fb0] transition-colors" 
                          title="View"
                        >
                          <MaterialIcon icon="visibility" className="text-[20px]" />
                        </button>
                        <button 
                          onClick={() => handleOpenEdit(member)}
                          className="hover:text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <MaterialIcon icon="edit" className="text-[18px]" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(member)}
                          className="hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <MaterialIcon icon="delete" className="text-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </GlobalTable>
      </div>

      {/* Pagination / Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div className="text-[13px] text-gray-500">
          Showing {filteredMembers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filteredMembers.length)} of {filteredMembers.length} entries
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-7 h-7 rounded border border-[#e4e7ec] bg-white transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed opacity-70' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <MaterialIcon icon="chevron_left" className="text-[18px]" />
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className={`flex items-center justify-center w-7 h-7 rounded border border-[#e4e7ec] bg-white transition-colors ${currentPage >= totalPages ? 'text-gray-300 cursor-not-allowed opacity-70' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <MaterialIcon icon="chevron_right" className="text-[18px]" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        title="Delete Member?"
        message={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
      />

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 transition-opacity"
          style={{ zIndex: 200, backdropFilter: 'blur(1px)' }}
          onClick={handleCloseDrawer}
        ></div>
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 201 }}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#e4e7ec] shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-[#0f1c2d] mb-1">
              {drawerMode === 'add' ? 'Add New Member' : drawerMode === 'edit' ? 'Edit Member' : 'Member Details'}
            </h2>
            <p className="text-[13px] text-gray-500">
              {drawerMode === 'add' 
                ? 'Create a new user and assign their role.' 
                : drawerMode === 'edit' 
                ? 'Update user details and role.'
                : 'Review user profile and access configuration.'}
            </p>
          </div>
          <button 
            onClick={handleCloseDrawer}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <MaterialIcon icon="close" className="text-[22px]" />
          </button>
        </div>

        {/* Drawer Body (Form) */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="member-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">
                FULL NAME
              </label>
              <input 
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                disabled={drawerMode === 'view'}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2.5 text-[14px] border ${errors.name ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 placeholder:text-gray-400 ${drawerMode === 'view' ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <input 
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                disabled={drawerMode === 'view'}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-3 py-2.5 text-[14px] border ${errors.email ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 placeholder:text-gray-400 ${drawerMode === 'view' ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
            </div>

            {/* Designation */}
            <div>
              <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">
                DESIGNATION
              </label>
              <input 
                type="text"
                placeholder="e.g. DEO"
                value={formData.designation}
                disabled={drawerMode === 'view'}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                className={`w-full px-3 py-2.5 text-[14px] border ${errors.designation ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 placeholder:text-gray-400 ${drawerMode === 'view' ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : ''}`}
              />
              {errors.designation && <p className="text-red-500 text-[12px] mt-1">{errors.designation}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-[#475467] uppercase tracking-wider">
                  ROLE SELECTION
                </label>
                {drawerMode !== 'view' && (
                  <Link to="/permissions" className="text-[11px] font-semibold text-[#ea580c] hover:text-[#c2410c] flex items-center">
                    <MaterialIcon icon="add" className="text-[12px] mr-0.5" />
                    Create Role
                  </Link>
                )}
              </div>
              <div className="relative">
                <select 
                  value={formData.role}
                  disabled={drawerMode === 'view'}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className={`w-full px-3 py-2.5 pr-10 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 appearance-none bg-white ${drawerMode === 'view' ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : ''}`}
                >
                  <option>Level 1 (L1)</option>
                  <option>Level 2 (L2)</option>
                  <option>Level 3 (L3)</option>
                </select>
                {drawerMode !== 'view' && <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
              </div>
            </div>



          </form>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#e4e7ec] flex items-center justify-end gap-3 bg-white shrink-0">
          {drawerMode === 'view' ? (
            <button 
              type="button"
              onClick={handleCloseDrawer}
              className="px-6 py-2 rounded-md text-[14px] font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          ) : (
            <>
              <button 
                type="button"
                onClick={handleCloseDrawer}
                className="px-4 py-2 rounded-md text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="member-form"
                className="px-4 py-2 rounded-md text-[14px] font-semibold text-white bg-[#ff5a1f] hover:bg-[#e64a10] transition-colors shadow-sm"
              >
                {drawerMode === 'add' ? 'Create Member' : 'Save Changes'}
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
