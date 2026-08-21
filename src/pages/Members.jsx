import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MembersAPI, RolesAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Avatar from '../components/atoms/Avatar';
import Input from '../components/atoms/Input';
import PageHeader from '../components/molecules/PageHeader';
import { formatDate } from '../utils/formatters';


const PAGE_SIZE = 10;

export default function Members() {
  const [members, setMembers] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await RolesAPI.getAll();
      setRolesList(data.map(r => r.name));
    } catch (e) {
      console.error(e);
    }
  };

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
    role: ''
  });
  const [errors, setErrors] = useState({});

  // Filter Options
  const roleOptions = ['All', ...rolesList];
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
      designation: rolesList.length > 0 ? rolesList[0] : '',
      role: rolesList.length > 0 ? rolesList[0] : ''
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
      designation: member.role || '',
      role: member.role || ''
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
      designation: member.role || '',
      role: member.role || ''
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

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setIsLoading(true);
    try {
      if (drawerMode === 'add') {
        const newMember = await MembersAPI.create({
          name: formData.name,
          email: formData.email,
          designation: formData.designation,
          role: formData.designation,
          status: 'Active',
          addedOn: dateStr // renamed from createdDate based on mock db structure
        });
        setMembers([...members, newMember]);
      } else if (drawerMode === 'edit') {
        const updatedMember = await MembersAPI.update(selectedMember.id, {
          name: formData.name,
          email: formData.email,
          designation: formData.designation,
          role: formData.designation
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
      <PageHeader
        title="Users"
        description="Manage users and roles."
      >
        <Button variant="primary" icon="add" onClick={handleOpenAdd}>
          Add User
        </Button>
      </PageHeader>

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

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col w-full mb-6">
        <GlobalTable minWidth="900px" wrapperClassName="rounded-xl">
          <thead>
            <tr className="border-b border-t border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
              <th className="px-5 py-4 text-left w-[280px]">NAME & EMAIL</th>
              <th className="px-5 py-4 text-left w-[160px]">DESIGNATION</th>
              <th className="px-5 py-4 text-left w-[140px]">ROLE</th>
              <th className="px-5 py-4 text-left w-[100px]">STATUS</th>
              <th className="px-5 py-4 text-left w-[140px]">CREATED DATE</th>
              <th className="px-5 py-4 text-right w-[160px]">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12">
                  <Spinner />
                </td>
              </tr>
            ) : paginatedMembers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12">
                  <EmptyState title="No users found" description="There are no users matching your current filters." />
                </td>
              </tr>
            ) : (
              paginatedMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-on-surface leading-snug truncate">{member.name}</span>
                        <span className="text-[12px] text-gray-500 truncate">{member.email || `${member.name.toLowerCase().replace(' ', '')}@zabe.app`}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[14px] font-semibold text-gray-700">{member.designation || '-'}</td>
                  <td className="px-5 py-4 text-[14px] font-semibold text-gray-700">{member.role}</td>
                  <td className="px-5 py-4">
                    <Badge status={member.status} />
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-600">
                    {formatDate(member.addedOn || member.createdDate)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3 text-gray-500 relative pr-4">
                      <button
                        onClick={() => handleOpenView(member)}
                        className="group/btn relative hover:text-blue-700 transition-colors"
                      >
                        <MaterialIcon icon="visibility" className="text-[20px]" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded shadow-sm opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50">
                          View Details
                        </span>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="group/btn relative hover:text-gray-800 transition-colors"
                      >
                        <MaterialIcon icon="edit" className="text-[18px]" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded shadow-sm opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50">
                          Edit Member
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(member)}
                        className="group/btn relative hover:text-red-500 transition-colors"
                      >
                        <MaterialIcon icon="delete" className="text-[18px]" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded shadow-sm opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50">
                          Delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </GlobalTable>

        {/* Pagination / Footer */}
        {!isLoading && filteredMembers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-gray-200">
            <div className="text-[14px] text-gray-600 font-medium">
              Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filteredMembers.length)} of {filteredMembers.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1.5 rounded text-[13px] font-medium border border-[#e4e7ec] text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className="px-4 py-1.5 rounded text-[13px] font-medium border border-[#e4e7ec] text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User?"
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ zIndex: 201 }}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#e4e7ec] shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-[#0f1c2d] mb-1">
              {drawerMode === 'add' ? 'Add New User' : drawerMode === 'edit' ? 'Edit User' : 'User Details'}
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
            <Input
              label="FULL NAME"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={drawerMode === 'view'}
              error={errors.name}
            />

            {/* Email Address */}
            <Input
              label="EMAIL ADDRESS"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={drawerMode === 'view'}
              error={errors.email}
            />

            {/* Designation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider">
                  DESIGNATION
                </label>
                {drawerMode !== 'view' && (
                  <Link to="/permissions" className="text-[11px] font-semibold text-[#ea580c] hover:text-[#c2410c] flex items-center">
                    <MaterialIcon icon="add" className="text-[12px] mr-0.5" />
                    Create Designation
                  </Link>
                )}
              </div>
              <div className="relative">
                <select
                  value={formData.designation}
                  disabled={drawerMode === 'view'}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value, role: e.target.value })}
                  className={`w-full px-3 py-2.5 pr-10 text-[14px] border ${errors.designation ? 'border-red-500' : 'border-[#e4e7ec]'} rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 appearance-none bg-white ${drawerMode === 'view' ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : ''}`}
                >
                  <option value="">Select Designation</option>
                  {rolesList.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {drawerMode !== 'view' && <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
              </div>
              {errors.designation && <p className="text-red-500 text-[12px] mt-1">{errors.designation}</p>}
            </div>



          </form>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#e4e7ec] flex items-center justify-end gap-3 bg-white shrink-0">
          {drawerMode === 'view' ? (
            <Button variant="secondary" onClick={handleCloseDrawer}>
              Close
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCloseDrawer}>
                Cancel
              </Button>
              <Button type="submit" form="member-form" variant="primary">
                {drawerMode === 'add' ? 'Create User' : 'Save Changes'}
              </Button>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
