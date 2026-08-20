import MaterialIcon from '../atoms/MaterialIcon';
import { useState, useEffect } from 'react';

export default function HistoryFilterDrawer({ 
  isOpen, 
  onClose, 
  currentFilters,
  onApply
}) {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  // Sync local filters when drawer opens
  useEffect(() => {
    if (isOpen) setLocalFilters(currentFilters);
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters({
      dateRange: 'All',
      electionType: 'All',
      region: 'All States',
      status: 'All'
    });
  };

  const FilterSelect = ({ label, value, options, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#F9FAFB', fontSize: 13, color: '#111827', outline: 'none', cursor: 'pointer' }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999, transition: 'opacity 0.3s' }} 
      />
      
      {/* Drawer */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 360, background: '#fff', zIndex: 1000, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>Advanced Filters</h2>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3F4F6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4B5563' }}>
            <MaterialIcon icon="close" className="text-[18px]" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <FilterSelect 
            label="Date Range" 
            options={['All', '2019 - 2023', '2011 - 2015']} 
            value={localFilters.dateRange} 
            onChange={(val) => setLocalFilters({ ...localFilters, dateRange: val })} 
          />
          <FilterSelect 
            label="Election Type" 
            options={['All', 'General', 'Gubernatorial', 'Local']} 
            value={localFilters.electionType} 
            onChange={(val) => setLocalFilters({ ...localFilters, electionType: val })} 
          />
          <FilterSelect 
            label="Region" 
            options={['All States', 'Lagos', 'Kano', 'Abuja (FCT)']} 
            value={localFilters.region} 
            onChange={(val) => setLocalFilters({ ...localFilters, region: val })} 
          />
          <FilterSelect 
            label="Audit Status" 
            options={['All', 'Audited', 'Archived']} 
            value={localFilters.status} 
            onChange={(val) => setLocalFilters({ ...localFilters, status: val })} 
          />
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #E5E7EB', background: '#F9FAFB', display: 'flex', gap: 12 }}>
          <button onClick={handleClear} style={{ flex: 1, height: 40, borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
            Clear All
          </button>
          <button onClick={handleApply} style={{ flex: 1, height: 40, borderRadius: 8, border: 'none', background: '#026AA2', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            Apply Filters
          </button>
        </div>

      </div>
    </>
  );
}
