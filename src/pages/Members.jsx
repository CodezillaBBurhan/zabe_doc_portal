import React, { useState } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';

// Mock initial data
const initialMembers = [
  { id: 1, name: 'John Doe', email: 'john.doe@election.gov', designation: 'DEO', role: 'L1', publicLink: 'Kano North', status: 'Active', createdDate: 'Oct 24, 2023' },
  { id: 2, name: 'Michael Smith', email: 'michael.smith@election.gov', designation: 'DEO', role: 'L2', publicLink: 'Abuja Central', status: 'Active', createdDate: 'Oct 23, 2023' },
  { id: 3, name: 'Sarah Williams', email: 'sarah.williams@election.gov', designation: 'DEO', role: 'L3', publicLink: 'Lagos Mainland', status: 'Active', createdDate: 'Oct 22, 2023' },
];

export default function Members() {
  const [members, setMembers] = useState(initialMembers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add'); // 'add' | 'edit'
  const [selectedMember, setSelectedMember] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    role: 'Level 1 (L1)',
    publicLink: 'Select Existing Link'
  });
  const [errors, setErrors] = useState({});

  const handleOpenAdd = () => {
    setDrawerMode('add');
    setSelectedMember(null);
    setFormData({
      name: '',
      email: '',
      designation: '',
      role: 'Level 1 (L1)',
      publicLink: 'Select Existing Link'
    });
    setErrors({});
    setDrawerOpen(true);
  };

  const handleOpenEdit = (member) => {
    setDrawerMode('edit');
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      designation: member.designation,
      role: member.role === 'L1' ? 'Level 1 (L1)' : member.role === 'L2' ? 'Level 2 (L2)' : 'Level 3 (L3)',
      publicLink: member.publicLink
    });
    setErrors({});
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert role formatting back to code for table display (L1, L2, L3)
    const roleCode = formData.role.includes('L1') ? 'L1' : formData.role.includes('L2') ? 'L2' : 'L3';
    
    // Format date for mock data
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (drawerMode === 'add') {
      const newMember = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
        role: roleCode,
        publicLink: formData.publicLink === 'Select Existing Link' ? '-' : formData.publicLink,
        status: 'Active',
        createdDate: dateStr
      };
      setMembers([...members, newMember]);
    } else {
      setMembers(members.map(m => m.id === selectedMember.id ? {
        ...m,
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
        role: roleCode,
        publicLink: formData.publicLink === 'Select Existing Link' ? '-' : formData.publicLink
      } : m));
    }
    handleClose();
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
            Manage users, roles and public access links.
          </p>
        </div>
        <div className="shrink-0">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center text-[14px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] rounded-md px-4 py-2 transition-colors shadow-sm"
          >
            <MaterialIcon icon="add" className="mr-1.5 text-[18px]" />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <button className="flex justify-between items-center w-full sm:w-[160px] text-[14px] font-medium text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2.5 hover:bg-gray-50 transition-colors shadow-sm">
          <span>Role: All</span>
          <MaterialIcon icon="expand_more" className="text-gray-400 text-[18px]" />
        </button>
        <button className="flex justify-between items-center w-full sm:w-[160px] text-[14px] font-medium text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2.5 hover:bg-gray-50 transition-colors shadow-sm">
          <span>Status: All</span>
          <MaterialIcon icon="expand_more" className="text-gray-400 text-[18px]" />
        </button>
        <button className="flex justify-between items-center w-full sm:w-[200px] text-[14px] font-medium text-gray-700 bg-white border border-[#e4e7ec] rounded-md px-4 py-2.5 hover:bg-gray-50 transition-colors shadow-sm">
          <span>Public Link: All</span>
          <MaterialIcon icon="expand_more" className="text-gray-400 text-[18px]" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm overflow-hidden flex flex-col w-full mb-6">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[900px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#e4e7ec] bg-white text-[13px] font-medium text-gray-500 tracking-wide">
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Designation</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Public Link</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Created Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {members.map(member => (
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
                  <td className="px-6 py-4 text-gray-600">{member.designation}</td>
                  <td className="px-6 py-4 text-gray-600">{member.role}</td>
                  <td className="px-6 py-4 text-gray-600">{member.publicLink}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-[14px] text-[#027a48]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a] mr-2"></span>
                      {member.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{member.createdDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-gray-600 transition-colors">
                        <MaterialIcon icon="visibility" className="text-[20px]" />
                      </button>
                      <button 
                        onClick={() => handleOpenEdit(member)}
                        className="hover:text-gray-600 transition-colors"
                      >
                        <MaterialIcon icon="edit" className="text-[18px]" />
                      </button>
                      <button className="hover:text-gray-600 transition-colors">
                        <MaterialIcon icon="more_vert" className="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination / Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div className="text-[13px] text-gray-500">
          Showing 1 to {members.length} of {members.length} entries
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center justify-center w-7 h-7 rounded border border-[#e4e7ec] text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-not-allowed" disabled>
            <MaterialIcon icon="chevron_left" className="text-[18px]" />
          </button>
          <button className="flex items-center justify-center w-7 h-7 rounded border border-[#e4e7ec] text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-not-allowed" disabled>
            <MaterialIcon icon="chevron_right" className="text-[18px]" />
          </button>
        </div>
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-40 transition-opacity"
          onClick={handleClose}
        ></div>
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 transform ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#e4e7ec] shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-[#0f1c2d] mb-1">
              {drawerMode === 'add' ? 'Add New Member' : 'Edit Member'}
            </h2>
            <p className="text-[13px] text-gray-500">
              {drawerMode === 'add' 
                ? 'Create a new user and assign their role and public access link.' 
                : 'Update user details, role and public access link.'}
            </p>
          </div>
          <button 
            onClick={handleClose}
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
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2.5 text-[14px] border ${errors.name ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 placeholder:text-gray-400`}
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
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-3 py-2.5 text-[14px] border ${errors.email ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 placeholder:text-gray-400`}
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
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                className={`w-full px-3 py-2.5 text-[14px] border ${errors.designation ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 placeholder:text-gray-400`}
              />
              {errors.designation && <p className="text-red-500 text-[12px] mt-1">{errors.designation}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">
                ROLE SELECTION
              </label>
              <div className="relative">
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2.5 pr-10 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 appearance-none bg-white"
                >
                  <option>Level 1 (L1)</option>
                  <option>Level 2 (L2)</option>
                  <option>Level 3 (L3)</option>
                </select>
                <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Public Link Assignment */}
            <div>
              <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">
                PUBLIC LINK ASSIGNMENT
              </label>
              <div className="relative">
                <select 
                  value={formData.publicLink}
                  onChange={(e) => setFormData({...formData, publicLink: e.target.value})}
                  className="w-full px-3 py-2.5 pr-10 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 appearance-none bg-white"
                >
                  <option>Select Existing Link</option>
                  <option>Kano North</option>
                  <option>Abuja Central</option>
                  <option>Lagos Mainland</option>
                </select>
                <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

          </form>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#e4e7ec] flex items-center justify-end gap-3 bg-white shrink-0">
          <button 
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-md text-[14px] font-semibold text-gray-700 bg-white border border-[#e4e7ec] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="member-form"
            className="px-4 py-2 rounded-md text-[14px] font-semibold text-white bg-[#ff8c42] hover:bg-[#ff7a22] transition-colors shadow-sm"
          >
            {drawerMode === 'add' ? 'Create Member' : 'Save Changes'}
          </button>
        </div>

      </div>

    </div>
  );
}
