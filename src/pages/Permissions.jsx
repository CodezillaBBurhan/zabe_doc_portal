import React, { useState, useEffect } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import { RolesAPI, PermissionsAPI } from '../mocks/api';
import PageHeader from '../components/molecules/PageHeader';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';

export default function Permissions() {
  const [activeTab, setActiveTab] = useState('roles'); // 'roles' or 'permissions'
  const [search, setSearch] = useState('');

  // Roles State
  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  // Permissions State
  const [permissions, setPermissions] = useState([]);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    setIsLoadingRoles(true);
    try {
      const data = await RolesAPI.getAll();
      setRoles(data);
    } catch (e) { console.error(e); } finally { setIsLoadingRoles(false); }
  };

  const fetchPermissions = async () => {
    setIsLoadingPermissions(true);
    try {
      const data = await PermissionsAPI.getAll();
      setPermissions(data);
    } catch (e) { console.error(e); } finally { setIsLoadingPermissions(false); }
  };

  const filteredRoles = roles.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPermissions = permissions.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.module.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingItem(null);
    if (activeTab === 'roles') {
      setFormData({ name: '', description: '', status: 'Active', permissions: [] });
    } else {
      setFormData({ key: '', title: '', module: 'Analytics', desc: '', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'roles') {
      setFormData({ name: item.name, description: item.description, status: item.status, permissions: item.permissions || [] });
    } else {
      setFormData({ key: item.key, title: item.title, module: item.module, desc: item.desc, status: item.status });
    }
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (activeTab === 'roles') {
        await RolesAPI.delete(itemToDelete.id);
        setRoles(roles.filter(r => r.id !== itemToDelete.id));
      } else {
        await PermissionsAPI.delete(itemToDelete.id);
        setPermissions(permissions.filter(p => p.id !== itemToDelete.id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeTab === 'roles') {
        if (!formData.name.trim()) return alert("Role name is required");
        if (editingItem) {
          const updated = await RolesAPI.update(editingItem.id, formData);
          setRoles(roles.map(r => r.id === updated.id ? updated : r));
        } else {
          const created = await RolesAPI.create({ ...formData, membersCount: 0 });
          setRoles([...roles, created]);
        }
      } else {
        if (!formData.title.trim() || !formData.key.trim()) return alert("Title and Key are required");
        if (editingItem) {
          const updated = await PermissionsAPI.update(editingItem.id, formData);
          setPermissions(permissions.map(p => p.id === updated.id ? updated : p));
        } else {
          const created = await PermissionsAPI.create(formData);
          setPermissions([...permissions, created]);
        }
      }
      setIsDrawerOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleRolePermission = (key) => {
    setFormData(prev => {
      const has = prev.permissions.includes(key);
      return { ...prev, permissions: has ? prev.permissions.filter(p => p !== key) : [...prev.permissions, key] };
    });
  };

  return (
    <div className="flex flex-col w-full pb-10 relative min-h-screen">

      {/* Breadcrumb */}
      <div className="flex items-center text-[13px] mb-4">
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">Principal</span>
        <MaterialIcon icon="chevron_right" className="text-gray-400 mx-1 text-[18px]" />
        <span className="text-gray-900 font-semibold">Roles & Permissions</span>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Roles & Permissions"
        description="Manage organizational roles and create system permissions."
      >
        <Button onClick={handleOpenCreate} icon="add">
          {activeTab === 'roles' ? 'Create Role' : 'Create Permission'}
        </Button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 gap-6">
        <button
          onClick={() => { setActiveTab('roles'); setSearch(''); }}
          className={`pb-3 text-[14px] font-semibold transition-colors relative ${activeTab === 'roles' ? 'text-brand-orange' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Roles
          {activeTab === 'roles' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange rounded-t" />}
        </button>
        <button
          onClick={() => { setActiveTab('permissions'); setSearch(''); }}
          className={`pb-3 text-[14px] font-semibold transition-colors relative ${activeTab === 'permissions' ? 'text-brand-orange' : 'text-gray-500 hover:text-gray-800'}`}
        >
          System Permissions
          {activeTab === 'permissions' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange rounded-t" />}
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 gap-4 w-full">
          <div className="relative w-full sm:w-[320px]">
            <Input
              icon="search"
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              placeholder={activeTab === 'roles' ? "Search roles..." : "Search permissions..."}
              className="w-full"
            />
          </div>
        </div>

        {activeTab === 'roles' ? (
          /* ROLES TABLE */
          isLoadingRoles ? (
            <div className="p-16 flex justify-center"><Spinner /></div>
          ) : filteredRoles.length === 0 ? (
            <EmptyState title="No roles found" description="Create a new role to get started." />
          ) : (
            <GlobalTable minWidth="800px" className="text-[14px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-4 text-left">ROLE NAME</th>
                  <th className="px-5 py-4 text-left">DESCRIPTION</th>
                  <th className="px-5 py-4 text-left">MEMBERS</th>
                  <th className="px-5 py-4 text-left">PERMISSIONS</th>
                  <th className="px-5 py-4 text-left">STATUS</th>
                  <th className="px-5 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e7ec]">
                {filteredRoles.map(role => (
                  <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4"><div className="font-semibold text-on-surface">{role.name}</div></td>
                    <td className="px-5 py-4 text-[13px] text-gray-500">{role.description}</td>
                    <td className="px-5 py-4 text-gray-600 font-medium">{role.membersCount}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions?.slice(0, 2).map(p => {
                          const def = permissions.find(pl => pl.key === p);
                          return <span key={p} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 uppercase">{def ? def.title : p}</span>;
                        })}
                        {role.permissions?.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">+{role.permissions.length - 2} MORE</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge status={role.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button variant="ghost" onClick={() => handleOpenEdit(role)} className="text-gray-400 hover:text-blue-700 p-1 h-auto" title="Edit"><MaterialIcon icon="edit" className="text-[18px]" /></Button>
                      <Button variant="ghost" onClick={() => handleDeleteClick(role)} className="text-gray-400 hover:text-red-600 p-1 h-auto ml-2" title="Delete"><MaterialIcon icon="delete" className="text-[18px]" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </GlobalTable>
          )
        ) : (
          /* PERMISSIONS TABLE */
          isLoadingPermissions ? (
            <div className="p-16 flex justify-center"><Spinner /></div>
          ) : filteredPermissions.length === 0 ? (
            <EmptyState title="No permissions found" description="Create a new permission." />
          ) : (
            <GlobalTable minWidth="800px" className="text-[14px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-4 text-left">TITLE (KEY)</th>
                  <th className="px-5 py-4 text-left">MODULE</th>
                  <th className="px-5 py-4 text-left">DESCRIPTION</th>
                  <th className="px-5 py-4 text-left">STATUS</th>
                  <th className="px-5 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e7ec]">
                {filteredPermissions.map(perm => (
                  <tr key={perm.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-on-surface">{perm.title}</div>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">{perm.key}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-700 uppercase">{perm.module}</span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-gray-500">{perm.desc}</td>
                    <td className="px-5 py-4">
                      <Badge status={perm.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button variant="ghost" onClick={() => handleOpenEdit(perm)} className="text-gray-400 hover:text-blue-700 p-1 h-auto" title="Edit"><MaterialIcon icon="edit" className="text-[18px]" /></Button>
                      <Button variant="ghost" onClick={() => handleDeleteClick(perm)} className="text-gray-400 hover:text-red-600 p-1 h-auto ml-2" title="Delete"><MaterialIcon icon="delete" className="text-[18px]" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </GlobalTable>
          )
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={`Delete ${activeTab === 'roles' ? 'Role' : 'Permission'}?`}
        message={`Are you sure you want to delete "${itemToDelete?.name || itemToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
      />

      {/* CRUD Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-slideInRight">

            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-[20px] font-bold text-gray-900">
                {editingItem
                  ? (activeTab === 'roles' ? 'Edit Role' : 'Edit Permission')
                  : (activeTab === 'roles' ? 'Create Role' : 'Create Permission')
                }
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-gray-600">
                <MaterialIcon icon="close" className="text-[24px]" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">

              {activeTab === 'roles' ? (
                <>
                  <div className="mb-5">
                    <Input
                      label="Role Name"
                      value={formData.name || ''} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Data Analyst"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange min-h-[80px]"
                      placeholder="Role description..."
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                    <select
                      value={formData.status || 'Active'} onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">Assign Permissions</label>
                    <div className="flex flex-col gap-3">
                      {permissions.map(perm => {
                        const isChecked = formData.permissions?.includes(perm.key);
                        return (
                          <div key={perm.key} onClick={() => toggleRolePermission(perm.key)} className={`p-4 border rounded-xl cursor-pointer transition-colors ${isChecked ? 'border-brand-orange bg-orange-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                            <div className="flex items-start gap-3">
                              <input type="checkbox" checked={isChecked} readOnly className="mt-1 w-4 h-4 text-brand-orange border-gray-300 focus:ring-brand-orange rounded" />
                              <div>
                                <div className="text-[14px] font-bold text-gray-900 mb-0.5">{perm.title}</div>
                                <div className="text-[12px] text-gray-500">{perm.desc}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-5">
                    <Input
                      label="Permission Title"
                      value={formData.title || ''} 
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Delete Reports"
                    />
                  </div>
                  <div className="mb-5">
                    <Input
                      label="Permission Key"
                      value={formData.key || ''} 
                      onChange={e => setFormData({ ...formData, key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                      className="font-mono text-[13px]"
                      placeholder="e.g. delete_reports"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Module</label>
                    <select
                      value={formData.module || ''} onChange={e => setFormData({ ...formData, module: e.target.value })}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    >
                      <option value="Analytics">Analytics</option>
                      <option value="Operations">Operations</option>
                      <option value="Geospatial">Geospatial</option>
                      <option value="Media">Media</option>
                      <option value="Administration">Administration</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      value={formData.desc || ''} onChange={e => setFormData({ ...formData, desc: e.target.value })}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange min-h-[80px]"
                      placeholder="What does this permission allow?"
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                    <select
                      value={formData.status || 'Active'} onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Spinner className="w-4 h-4 mr-2" />}
                {editingItem ? 'Save Changes' : (activeTab === 'roles' ? 'Create Role' : 'Create Permission')}
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
