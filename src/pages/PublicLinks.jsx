import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Plus, X, Copy, Edit, Trash2 } from 'lucide-react';
import { PublicLinksAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import GlobalTable from '../components/organisms/GlobalTable';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';

const PublicLinks = () => {
  const navigate = useNavigate();
  const [linksData, setLinksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Delete state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const data = await PublicLinksAPI.getAll();
      const mapped = data.map(link => ({
        ...link,
        destination: '/dashboards/national', // mock destination
        views: typeof link.views === 'number' ? `${link.views.toLocaleString()}` : link.views,
        created: link.createdOn || link.created,
        expiry: 'Never' // mock expiry
      }));
      setLinksData(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (linkToDelete) {
      setIsLoading(true);
      try {
        await PublicLinksAPI.delete(linkToDelete.id);
        setLinksData(linksData.filter(l => l.id !== linkToDelete.id));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    setDeleteModalOpen(false);
    setLinkToDelete(null);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    Status: 'All',
    'Created By': 'All',
    Expiry: 'All',
    'Link Type': 'All'
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  const filterOptions = {
    Status: ['All', 'Active', 'Expiring', 'Revoked'],
    'Created By': ['All', 'J. Smith', 'M. Johnson', 'A. Davis'],
    Expiry: ['All', 'Never', 'Next 7 Days', 'Next 30 Days'],
    'Link Type': ['All', 'Dashboard', 'Map', 'Document']
  };

  const getStatusBadge = (status) => {
    return <Badge status={status} />;
  };

  const handleFilterSelect = (filterName, value) => {
    setActiveFilters({ ...activeFilters, [filterName]: value });
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilters({ Status: 'All', 'Created By': 'All', Expiry: 'All', 'Link Type': 'All' });
  };

  const filteredLinks = useMemo(() => {
    return linksData.filter((link) => {
      const matchesSearch = 
        link.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.destination.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = activeFilters.Status !== 'All' ? link.status === activeFilters.Status : true;
      const matchesCreatedBy = activeFilters['Created By'] !== 'All' ? link.createdBy === activeFilters['Created By'] : true;
      
      return matchesSearch && matchesStatus && matchesCreatedBy;
    });
  }, [searchQuery, activeFilters, linksData]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <PageHeader
        title="Public Links"
        description="Manage secure public-facing election information links."
      >
        <Button onClick={() => navigate('/links/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Public Link
        </Button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Active Links */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Active Links</h3>
          <p className="font-display-lg text-display-lg text-on-surface mb-2 leading-none">142</p>
          <p className="font-body-sm text-body-sm text-secondary mt-auto">138 healthy · 4 need attention</p>
        </div>

        {/* Total Views */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Total Views</h3>
          <p className="font-display-lg text-display-lg text-on-surface mb-2 leading-none">1.2M</p>
        </div>

        {/* Expiring Soon */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Expiring Soon</h3>
          <p className="font-display-lg text-display-lg text-on-surface mb-2 leading-none">12</p>
        </div>

        {/* Revoked */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Revoked</h3>
          <p className="font-display-lg text-display-lg text-on-surface mb-2 leading-none">8</p>
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Input 
            icon="search"
            type="text" 
            placeholder="Search links..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto overflow-visible relative">
          {Object.keys(filterOptions).map((filter) => (
            <div key={filter} className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === filter ? null : filter)}
                className={`flex items-center gap-2 px-3 py-2 shadow-sm rounded-lg font-body-md text-body-md whitespace-nowrap transition-colors ${
                  activeFilters[filter] !== 'All' 
                    ? 'bg-brand-orange/10 text-brand-orange' 
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                {activeFilters[filter] !== 'All' ? `${filter}: ${activeFilters[filter]}` : filter}
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              
              {openDropdown === filter && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface-container-lowest rounded-lg shadow-lg z-10 py-1">
                  {filterOptions[filter].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect(filter, option)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${
                        activeFilters[filter] === option ? 'text-brand-orange font-medium bg-brand-orange/5' : 'text-on-surface'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {(searchQuery || Object.values(activeFilters).some(v => v !== 'All')) && (
            <Button 
              variant="ghost"
              onClick={clearFilters}
              className="text-secondary hover:text-on-surface"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <GlobalTable className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container font-label-md text-label-md text-secondary">
                <th className="py-4 px-6 font-medium">Link Name</th>
                <th className="py-4 px-6 font-medium">Destination</th>
                <th className="py-4 px-6 font-medium">Created By</th>
                <th className="py-4 px-6 font-medium">Views</th>
                <th className="py-4 px-6 font-medium">Created</th>
                <th className="py-4 px-6 font-medium">Expiry</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/30">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-12 px-6 text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-headline-sm text-headline-sm text-on-surface leading-tight">{link.name}</div>
                      <div className="font-body-sm text-body-sm text-secondary mt-1">{link.url}</div>
                    </td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{link.destination}</td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{link.createdBy}</td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{link.views}</td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{link.created}</td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{link.expiry}</td>
                    <td className="py-4 px-6">{getStatusBadge(link.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" className="p-1.5 h-auto text-secondary hover:text-brand-orange hover:bg-brand-orange/10" title="Copy Link">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" className="p-1.5 h-auto text-secondary hover:text-blue-600 hover:bg-blue-50" title="Edit Link">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" onClick={() => { setLinkToDelete(link); setDeleteModalOpen(true); }} className="p-1.5 h-auto text-secondary hover:text-error hover:bg-error/10" title="Delete Link">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 px-6 text-center">
                    <EmptyState title="No links found" description="No public links match your filters." />
                  </td>
                </tr>
              )}
            </tbody>
          </GlobalTable>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        title="Delete Public Link?"
        message={`Are you sure you want to delete the link "${linkToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
      />
    </div>
  );
};

export default PublicLinks;
