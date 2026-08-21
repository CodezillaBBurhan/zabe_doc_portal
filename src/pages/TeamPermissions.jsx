import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import { MembersAPI, RolesAPI } from '../mocks/api';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Avatar from '../components/atoms/Avatar';
import Input from '../components/atoms/Input';
import PageHeader from '../components/molecules/PageHeader';
import { formatDate } from '../utils/formatters';

const PERMISSIONS_DEF = [
  { key: 'overview', title: 'Overview Dashboard', desc: 'View real-time high-level metrics and system status.' },
  { key: 'incident', title: 'Incident Management', desc: 'Report, escalate, and resolve active field incidents.' },
  { key: 'map', title: 'Ward/LGA Map Data', desc: 'Access geospatial polling unit data and regional stats.' },
  { key: 'tv', title: 'TV Broadcast Control', desc: 'Manage live feeds and lower-third graphic overlays.' },
  { key: 'team', title: 'Team Settings', desc: 'Modify global access roles and invite new members.', adminOnly: true }
];

export default function TeamPermissions() {
  const navigate = useNavigate();

  // Data State
  const [members, setMembers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Drawer / Selection State
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  // Edit Permissions State
  const [isEditing, setIsEditing] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [discardModalOpen, setDiscardModalOpen] = useState(false);
  const [pendingMemberToSelect, setPendingMemberToSelect] = useState(null);

  // Assign Member Form State
  const [assignForm, setAssignForm] = useState({
    memberId: '',
    name: '',
    designation: '',
    publicLink: ''
  });

  const handleAssignMemberSelect = (e) => {
    const memId = e.target.value;
    const mem = members.find(m => m.id.toString() === memId);
    setAssignForm(prev => ({
      ...prev,
      memberId: memId,
      designation: mem ? mem.role : '',
      name: ''
    }));
  };

  useEffect(() => {
    fetchMembers();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesData = await RolesAPI.getAll();
      setAllRoles(rolesData);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const data = await MembersAPI.getAll();
      // Initialize any missing fields for this view
      const initialized = data.map(m => ({
        ...m,
        email: m.email || `${m.name.toLowerCase().replace(' ', '.')}@election.gov`,
        permissions: m.permissions || {
          overview: true,
          incident: true,
          map: true,
          tv: false,
          team: m.role === 'Admin'
        },
        lastLogin: m.lastLogin || 'Yesterday',
        lastLoginTime: m.lastLoginTime || '14:30 PM',
        avatar: m.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random`
      }));
      setMembers(initialized);

      // Auto-select first if none selected
      if (initialized.length > 0 && !selectedMemberId) {
        setSelectedMemberId(initialized[0].id);
        setEditedPermissions(initialized[0].permissions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Derived state
  const selectedMember = useMemo(() => {
    return members.find(m => m.id === selectedMemberId) || null;
  }, [members, selectedMemberId]);

  const uniqueRoles = ['All', ...new Set(members.map(m => m.role))];

  // Filtering
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const s = searchTerm.toLowerCase();
      const matchSearch = !s || m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.role.toLowerCase().includes(s);
      const matchRole = roleFilter === 'All' || m.role === roleFilter;
      const matchStatus = statusFilter === 'All' || m.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [members, searchTerm, roleFilter, statusFilter]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  // Pagination
  const totalEntries = filteredMembers.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSelectMember = (member) => {
    if (isEditing) {
      setPendingMemberToSelect(member);
      setDiscardModalOpen(true);
      return;
    }
    executeSelectMember(member);
  };

  const executeSelectMember = (member) => {
    setSelectedMemberId(member.id);
    setEditedPermissions(member.permissions);
    setIsEditing(false);
    setSuccessMessage('');
    setIsProfileDrawerOpen(true);
  };

  const confirmDiscard = () => {
    setDiscardModalOpen(false);
    if (pendingMemberToSelect) {
      executeSelectMember(pendingMemberToSelect);
      setPendingMemberToSelect(null);
    }
  };

  // Permission Handlers
  const handleTogglePermission = (key, adminOnly) => {
    if (!isEditing) return;
    if (adminOnly && selectedMember?.role !== 'Admin') return; // Enforce admin check

    setEditedPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePermissions = async () => {
    if (!selectedMember) return;
    setIsSaving(true);
    setSuccessMessage('');
    try {
      await MembersAPI.update(selectedMember.id, { permissions: editedPermissions });
      // Update local state
      setMembers(members.map(m => m.id === selectedMember.id ? { ...m, permissions: editedPermissions } : m));
      setIsEditing(false);
      setSuccessMessage('Permissions updated successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (e) {
      console.error("Failed to save permissions", e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelPermissions = () => {
    if (selectedMember) {
      setEditedPermissions(selectedMember.permissions);
    }
    setIsEditing(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('All');
    setStatusFilter('All');
    setShowFilterDropdown(false);
  };

  return (
    <div className="flex flex-col w-full pb-10">

      {/* Page Header */}
      <PageHeader
        title="Principals"
        description="Manage access control and user roles for the Election Center."
      >
        <Button variant="primary" icon="add" onClick={() => setIsAssignDrawerOpen(true)}>
          Assign Principal
        </Button>
      </PageHeader>

      {/* Main Content Layout */}
      <div className="flex flex-col w-full items-start">

        {/* Table */}
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden overflow-x-auto relative">

          {/* Table Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 gap-4 relative z-20">
            <div className="relative w-full sm:w-[320px]">
              <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 text-[14px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700"
              />
            </div>

            <div className="flex items-center gap-3">
              {(searchTerm || roleFilter !== 'All' || statusFilter !== 'All') && (
                <Button variant="ghost" onClick={clearFilters} className="px-2 py-1">Clear</Button>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className={`flex justify-center items-center text-[14px] font-semibold text-gray-700 bg-white border rounded-md px-4 py-2 transition-colors shrink-0 ${showFilterDropdown ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <MaterialIcon icon="filter_list" className="mr-2 text-[18px]" />
                  Filter
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 top-[110%] w-64 bg-white border border-gray-200 shadow-lg rounded-xl z-50 p-4">
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Role</label>
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-md p-2 outline-none focus:border-brand-orange"
                      >
                        {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Status</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-md p-2 outline-none focus:border-brand-orange"
                      >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table Wrapper */}
          {isLoading ? (
            <div className="p-12 flex justify-center"><Spinner /></div>
          ) : paginatedMembers.length === 0 ? (
            <EmptyState title="No members found" description="Adjust your search or filters to see more members." />
          ) : (
            <GlobalTable minWidth="1100px">
              <thead>
                <tr className="border-b border-t border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                  <th className="px-5 py-4 w-[280px]">NAME & EMAIL</th>
                  <th className="px-5 py-4 w-[140px]">ROLE</th>
                  <th className="px-5 py-4 w-[100px]">STATUS</th>
                  <th className="px-5 py-4 w-[120px]">LAST LOGIN</th>
                  <th className="px-5 py-4 w-[140px]">VIEW TO</th>
                  <th className="px-5 py-4 w-[140px]">PUBLIC LINK</th>
                  <th className="px-5 py-4 w-[120px]">CREATED DATE</th>
                  <th className="px-5 py-4 w-[160px] text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedMembers.map((member) => {
                  const isSelected = selectedMemberId === member.id;
                  return (
                    <tr
                      key={member.id}
                      onClick={() => handleSelectMember(member)}
                      className={`transition-colors group cursor-pointer ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={member.avatar} name={member.name} />
                          <div className="min-w-0">
                            <div className="font-semibold text-on-surface mb-0.5 truncate">{member.name}</div>
                            <div className="text-[13px] text-gray-500 truncate">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-on-surface font-medium">
                        {member.role}
                      </td>
                      <td className="px-5 py-4">
                        <Badge status={member.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-on-surface">{member.lastLogin}</div>
                        <div className="text-[12px] text-gray-500">{member.lastLoginTime}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {member.viewTo || '—'}
                      </td>
                      <td className="px-5 py-4">
                        {member.publicLink ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 truncate max-w-[120px]">
                            {member.publicLink}
                          </span>
                        ) : (
                          <span className="text-[12px] text-gray-400 italic">Not Assigned</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(member.addedOn || member.createdDate || '2023-01-01')}
                      </td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-3 text-gray-500 relative pr-4">
                          <button
                            onClick={() => {
                              if (member.publicLink) console.log('View Link for:', member.id);
                            }}
                            disabled={!member.publicLink}
                            className={`group/btn relative transition-colors ${member.publicLink ? 'hover:text-blue-700 text-gray-500' : 'text-gray-300 opacity-50 cursor-not-allowed'}`}
                          >
                            <MaterialIcon icon="open_in_new" className="text-[18px]" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded shadow-sm opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50">
                              Preview Link
                            </span>
                          </button>
                          <button
                            onClick={() => handleSelectMember(member)}
                            className="group/btn relative hover:text-blue-700 transition-colors"
                          >
                            <MaterialIcon icon="visibility" className="text-[20px]" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded shadow-sm opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50">
                              View Details
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              handleSelectMember(member);
                              setIsEditing(true);
                            }}
                            className="group/btn relative hover:text-gray-800 transition-colors"
                          >
                            <MaterialIcon icon="edit" className="text-[18px]" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded shadow-sm opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50">
                              Edit Permissions
                            </span>
                          </button>
                          <button
                            onClick={() => console.log('Delete member:', member.id)}
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
                  );
                })}
              </tbody>
            </GlobalTable>
          )}

          {/* Table Footer / Pagination */}
          {!isLoading && filteredMembers.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-gray-200">
              <div className="text-[14px] text-gray-600 font-medium">
                Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalEntries)} of {totalEntries} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-4 py-1.5 rounded text-[13px] font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-4 py-1.5 rounded text-[13px] font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Profile Drawer Overlay */}
      {isProfileDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 z-[100] transition-opacity"
          onClick={() => setIsProfileDrawerOpen(false)}
        ></div>
      )}

      {/* Profile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-2xl flex flex-col transition-transform duration-300 transform overflow-y-auto ${isProfileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between shrink-0 sticky top-0 bg-white z-20">
          <h2 className="text-[20px] font-bold text-gray-900">User Profile</h2>
          <Button variant="ghost" icon="close" onClick={() => setIsProfileDrawerOpen(false)} className="p-1" />
        </div>

        <div className="flex-1 flex flex-col relative p-6">

          {successMessage && (
            <div className="mb-4 w-full bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm font-medium flex items-center justify-between shadow-sm">
              <span className="flex items-center gap-2">
                <MaterialIcon icon="check_circle" className="text-green-600 text-[18px]" />
                {successMessage}
              </span>
              <button onClick={() => setSuccessMessage('')}>
                <MaterialIcon icon="close" className="text-[16px]" />
              </button>
            </div>
          )}

          <div className="flex flex-col h-full">
            {selectedMember ? (
              <>
                {/* Profile Header */}
                <div className="pb-6 border-b border-gray-200 relative">
                  {!isEditing && (
                    <button
                      onClick={() => navigate('/profile')}
                      className="absolute top-0 right-0 text-[13px] font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Edit Profile
                    </button>
                  )}
                  <div className="flex items-center gap-4">
                  <Avatar src={selectedMember.avatar} name={selectedMember.name} size="lg" />
                    <div>
                      <h2 className="text-[18px] font-bold text-on-surface mb-0.5">{selectedMember.name}</h2>
                      <div className="text-[14px] text-gray-500">{selectedMember.role}</div>
                    </div>
                  </div>
                </div>

                <div className="py-6 flex flex-col flex-1">
                  {/* Access Permissions Block */}
                  {!isEditing && (
                    <div className="mb-6">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                        ACCESS PERMISSIONS
                      </div>
                      <div className="bg-blue-50 rounded-md py-2.5 px-4 text-center text-[11px] font-bold text-secondary tracking-wider mb-3">
                        {Object.values(selectedMember.permissions || {}).filter(Boolean).length} PERMISSIONS ASSIGNED
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center text-[14px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <MaterialIcon icon="edit" className="mr-2 text-[16px]" />
                        Manage Permissions
                      </button>
                    </div>
                  )}

                  {/* Assigned Permissions Summary */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                      {isEditing ? "EDIT PERMISSIONS" : "ASSIGNED PERMISSIONS SUMMARY"}
                    </div>
                    <div className="flex flex-col gap-3">

                      {PERMISSIONS_DEF.map(perm => {
                        const adminDisabled = perm.adminOnly && selectedMember.role !== 'Admin';
                        const isChecked = editedPermissions ? !!editedPermissions[perm.key] : false;

                        return (
                          <div
                            key={perm.key}
                            className={`border rounded-lg p-3 flex items-start gap-3 transition-colors ${adminDisabled ? 'bg-surface-container-lowest opacity-75 border-gray-200' : 'bg-white border-gray-200'
                              } ${isEditing && !adminDisabled ? 'hover:border-gray-300 cursor-pointer' : ''}`}
                            onClick={() => {
                              if (isEditing && !adminDisabled) {
                                handleTogglePermission(perm.key, perm.adminOnly);
                              }
                            }}
                          >
                            <div className="pt-0.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => { }} // handled by parent div onClick
                                disabled={!isEditing || adminDisabled}
                                className={`rounded focus:ring-brand-orange w-4 h-4 cursor-pointer ${!isEditing || adminDisabled ? 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-gray-300 text-brand-orange'
                                  }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <div className={`text-[14px] font-bold ${adminDisabled ? 'text-gray-500' : 'text-on-surface'}`}>
                                  {perm.title}
                                </div>
                                {perm.adminOnly && (
                                  <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">Admin Only</span>
                                )}
                              </div>
                              <div className={`text-[13px] leading-tight ${adminDisabled ? 'text-gray-400' : 'text-gray-500'}`}>
                                {perm.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>

                {/* Panel Footer */}
                {isEditing && (
                  <div className="pt-5 border-t border-gray-200 bg-white flex items-center justify-end gap-3 mt-auto sticky bottom-0">
                    <Button variant="secondary" onClick={handleCancelPermissions} disabled={isSaving}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSavePermissions} disabled={isSaving} isLoading={isSaving}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <MaterialIcon icon="group" className="text-[48px] text-gray-300 mb-4" />
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">No Member Selected</h3>
                <p className="text-[14px] text-gray-500">Select a member from the table to view or manage their permissions.</p>
              </div>
            )}

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
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-2xl flex flex-col transition-transform duration-300 transform ${isAssignDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-on-surface mb-1">Assign Principal</h2>
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
              <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">SELECT MEMBER</label>
              <Link to="/members" className="text-[11px] font-semibold text-brand-orange hover:text-orange-700 flex items-center">
                <MaterialIcon icon="add" className="text-[12px] mr-0.5" />
                Create Member
              </Link>
            </div>
            <div className="relative">
              <select
                value={assignForm.memberId}
                onChange={handleAssignMemberSelect}
                className="w-full px-3 py-2.5 pr-10 text-[14px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 appearance-none bg-white cursor-pointer"
              >
                <option value="">Select Existing Member</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Designation (Role) */}
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-2">DESIGNATION</label>
            <div className="relative">
              <select
                value={assignForm.designation}
                disabled
                className="w-full px-3 py-2.5 pr-10 text-[14px] border border-gray-200 rounded-md focus:outline-none text-gray-500 appearance-none bg-gray-50 cursor-not-allowed"
              >
                <option value="">Select Designation</option>
                {[...new Set([...allRoles.map(r => r.name), ...members.map(m => m.role).filter(Boolean)])].map(roleName => (
                  <option key={roleName} value={roleName}>{roleName}</option>
                ))}
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Name Input */}
          <Input
            label="VIEW TO"
            value={assignForm.name}
            onChange={(e) => setAssignForm({ ...assignForm, name: e.target.value })}
          />

          {/* Public Link Assignment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">PUBLIC LINK ASSIGNMENT</label>
              <Link to="/links/create" className="text-[11px] font-semibold text-brand-orange hover:text-orange-700 flex items-center">
                <MaterialIcon icon="add" className="text-[12px] mr-0.5" />
                Create Public Link
              </Link>
            </div>
            <div className="relative">
              <select className="w-full px-3 py-2.5 pr-10 text-[14px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700 appearance-none bg-white cursor-pointer">
                <option>Select Existing Link</option>
                <option>Kano North</option>
                <option>Lagos Central</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white shrink-0 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsAssignDrawerOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsAssignDrawerOpen(false)}>
            Assign
          </Button>
        </div>
      </div>

      {/* Discard Changes Confirmation Modal */}
      <ConfirmDialog
        isOpen={discardModalOpen}
        onClose={() => { setDiscardModalOpen(false); setPendingMemberToSelect(null); }}
        onConfirm={confirmDiscard}
        title="Discard Unsaved Changes?"
        message="You have unsaved changes to this member's permissions. Are you sure you want to discard them and view another member?"
        confirmText="Discard"
        confirmColor="red"
      />

    </div>
  );
}
