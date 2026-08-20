import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, X, Copy, Edit, Trash2 } from 'lucide-react';
import GlobalTable from '../components/organisms/GlobalTable';
import { useNavigate } from 'react-router-dom';

const PublicLinks = () => {
  const navigate = useNavigate();
  const linksData = [
    {
      id: 1,
      name: 'National Result Dashboard',
      url: 'elec.tn/nat-res-24',
      destination: '/dashboards/national',
      createdBy: 'J. Smith',
      views: '450k',
      created: 'Oct 12, 2024',
      expiry: 'Never',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Lagos Incident Map',
      url: 'elec.tn/lag-inc-map',
      destination: '/maps/incident-lagos',
      createdBy: 'M. Johnson',
      views: '12k',
      created: 'Oct 15, 2024',
      expiry: 'Oct 20, 2024',
      status: 'Expiring'
    },
    {
      id: 3,
      name: 'Press Briefing Deck',
      url: 'elec.tn/press-brief-1',
      destination: '/docs/briefing-v1.pdf',
      createdBy: 'A. Davis',
      views: '850',
      created: 'Oct 10, 2024',
      expiry: 'Oct 11, 2024',
      status: 'Revoked'
    }
  ];

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
    switch(status) {
      case 'Active':
        return <span className="px-2.5 py-1 text-xs font-medium bg-[#e6f4ea] text-[#1e8e3e] rounded-full">Active</span>;
      case 'Expiring':
        return <span className="px-2.5 py-1 text-xs font-medium bg-[#fef7e0] text-[#f29900] rounded-full">Expiring</span>;
      case 'Revoked':
        return <span className="px-2.5 py-1 text-xs font-medium bg-[#fce8e6] text-[#d93025] rounded-full">Revoked</span>;
      default:
        return null;
    }
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
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Public Links</h1>
          <p className="font-body-md text-body-md text-secondary">Manage secure public-facing election information links.</p>
        </div>
        <button 
          onClick={() => navigate('/links/create')}
          className="flex items-center gap-2 bg-brand-orange hover:opacity-90 text-white px-4 py-2.5 rounded-lg font-label-md text-label-md transition-opacity shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Public Link
        </button>
      </div>

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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search links..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest shadow-sm rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-on-surface placeholder:text-secondary border-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface">
              <X className="w-4 h-4" />
            </button>
          )}
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
            <button 
              onClick={clearFilters}
              className="font-body-md text-body-md text-secondary hover:text-on-surface whitespace-nowrap px-2"
            >
              Clear Filters
            </button>
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
            <tbody className="divide-y divide-outline-variant/30">
              {filteredLinks.length > 0 ? (
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
                        <button className="p-1.5 text-secondary hover:text-brand-orange hover:bg-brand-orange/10 rounded-md transition-colors" title="Copy Link">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-secondary hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Link">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-secondary hover:text-error hover:bg-error/10 rounded-md transition-colors" title="Delete Link">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 px-6 text-center text-secondary font-body-md">
                    No links found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </GlobalTable>
      </div>
    </div>
  );
};

export default PublicLinks;
