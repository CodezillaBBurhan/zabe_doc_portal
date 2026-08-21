import React, { useState, useEffect } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import { RolesAPI, PermissionsAPI } from '../mocks/api';

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

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab === 'roles' ? 'role' : 'permission'}?`)) return;
    try {
      if (activeTab === 'roles') {
        await RolesAPI.delete(id);
        setRoles(roles.filter(r => r.id !== id));
      } else {
        await PermissionsAPI.delete(id);
        setPermissions(permissions.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error(e);
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
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">Team & Permissions</span>
        <MaterialIcon icon="chevron_right" className="text-gray-400 mx-1 text-[18px]" />
        <span className="text-gray-900 font-semibold">Roles & Permissions</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#0f1c2d] leading-tight mb-2">Roles & Permissions</h1>
          <p className="text-[15px] text-gray-500">Manage organizational roles and create system permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleOpenCreate} className="flex items-center text-[14px] font-semibold text-white bg-[#ff5a1f] hover:bg-[#e64a10] rounded-md px-4 py-2 transition-colors shadow-sm">
            <MaterialIcon icon="add" className="mr-1.5 text-[18px]" />
            {activeTab === 'roles' ? 'Create Role' : 'Create Permission'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 gap-6">
        <button 
          onClick={() => { setActiveTab('roles'); setSearch(''); }}
          className={`pb-3 text-[14px] font-semibold transition-colors relative ${activeTab === 'roles' ? 'text-[#ff5a1f]' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Roles
          {activeTab === 'roles' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5a1f] rounded-t" />}
        </button>
        <button 
          onClick={() => { setActiveTab('permissions'); setSearch(''); }}
          className={`pb-3 text-[14px] font-semibold transition-colors relative ${activeTab === 'permissions' ? 'text-[#ff5a1f]' : 'text-gray-500 hover:text-gray-800'}`}
        >
          System Permissions
          {activeTab === 'permissions' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5a1f] rounded-t" />}
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#e4e7ec] rounded-xl shadow-sm overflow-hidden flex flex-col w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-[#e4e7ec] gap-4 w-full">
          <div className="relative w-full sm:w-[320px]">
            <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
            <input 
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={activeTab === 'roles' ? "Search roles..." : "Search permissions..."}
              className="w-full pl-10 pr-4 py-2 text-[14px] border border-[#e4e7ec] rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-gray-700"
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
                <tr className="bg-[#f9fafb] border-b border-[#e4e7ec] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
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
                    <td className="px-5 py-4"><div className="font-semibold text-[#0f1c2d]">{role.name}</div></td>
                    <td className="px-5 py-4 text-[13px] text-gray-500">{role.description}</td>
                    <td className="px-5 py-4 text-gray-600 font-medium">{role.membersCount}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions?.slice(0, 2).map(p => {
                          const def = permissions.find(pl => pl.key === p);
                          return <span key={p} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#eef4ff] text-[#3538cd] uppercase">{def ? def.title : p}</span>;
                        })}
                        {role.permissions?.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">+{role.permissions.length - 2} MORE</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {role.status === 'Active' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">Active</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#fef3f2] text-[#b42318] border border-[#fecdca]">Inactive</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => handleOpenEdit(role)} className="text-gray-400 hover:text-[#005fb0] transition-colors p-1" title="Edit"><MaterialIcon icon="edit" className="text-[18px]" /></button>
                      <button onClick={() => handleDelete(role.id)} className="text-gray-400 hover:text-red-600 transition-colors p-1 ml-2" title="Delete"><MaterialIcon icon="delete" className="text-[18px]" /></button>
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
                <tr className="bg-[#f9fafb] border-b border-[#e4e7ec] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
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
                      <div className="font-semibold text-[#0f1c2d]">{perm.title}</div>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">{perm.key}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#f3f4f6] text-gray-700 uppercase">{perm.module}</span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-gray-500">{perm.desc}</td>
                    <td className="px-5 py-4">
                      {perm.status === 'Active' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]">Active</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#fef3f2] text-[#b42318] border border-[#fecdca]">Inactive</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => handleOpenEdit(perm)} className="text-gray-400 hover:text-[#005fb0] transition-colors p-1" title="Edit"><MaterialIcon icon="edit" className="text-[18px]" /></button>
                      <button onClick={() => handleDelete(perm.id)} className="text-gray-400 hover:text-red-600 transition-colors p-1 ml-2" title="Delete"><MaterialIcon icon="delete" className="text-[18px]" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </GlobalTable>
          )
        )}
      </div>

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
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Role Name</label>
                    <input 
                      value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]"
                      placeholder="e.g. Data Analyst"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] min-h-[80px]"
                      placeholder="Role description..."
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                    <select 
                      value={formData.status || 'Active'} onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]"
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
                          <div key={perm.key} onClick={() => toggleRolePermission(perm.key)} className={`p-4 border rounded-xl cursor-pointer transition-colors ${isChecked ? 'border-[#ff5a1f] bg-[#fff5f2]' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                            <div className="flex items-start gap-3">
                              <input type="checkbox" checked={isChecked} readOnly className="mt-1 w-4 h-4 text-[#ff5a1f] border-gray-300 focus:ring-[#ff5a1f] rounded" />
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
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Permission Title</label>
                    <input 
                      value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]"
                      placeholder="e.g. Delete Reports"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Permission Key</label>
                    <input 
                      value={formData.key || ''} onChange={e => setFormData({...formData, key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_')})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] font-mono text-[13px]"
                      placeholder="e.g. delete_reports"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Module</label>
                    <select 
                      value={formData.module || ''} onChange={e => setFormData({...formData, module: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]"
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
                      value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f] min-h-[80px]"
                      placeholder="What does this permission allow?"
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                    <select 
                      value={formData.status || 'Active'} onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
              <button onClick={() => setIsDrawerOpen(false)} className="px-5 py-2.5 text-[14px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 text-[14px] font-semibold text-white bg-[#ff5a1f] rounded-lg hover:bg-[#e64a10] disabled:opacity-70 flex items-center gap-2">
                {isSaving && <Spinner className="w-4 h-4" />}
                {editingItem ? 'Save Changes' : (activeTab === 'roles' ? 'Create Role' : 'Create Permission')}
              </button>
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
