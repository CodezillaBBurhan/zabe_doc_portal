import { useState } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';

/* ── UI Components ── */
function DropdownFilter({ label, value, options, onChange, isActive, onClick, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, position: 'relative' }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>{label}</label>
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F0F4F8', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', border: isActive ? '1px solid #FF5A1F' : '1px solid transparent' }}>
        <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value}</span>
        <MaterialIcon icon="expand_more" className="text-[16px] text-gray-400" />
      </div>
      {isActive && (
        <>
          <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100 }} />
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 101, minWidth: '100%', padding: 4 }}>
            {options.map(opt => (
              <div 
                key={opt} 
                onClick={() => { onChange(opt); onClose(); }} 
                style={{ padding: '8px 12px', fontSize: 13, cursor: 'pointer', borderRadius: 6, background: value === opt ? '#F3F4F6' : 'transparent', color: '#111827', fontWeight: value === opt ? 600 : 400 }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.background = value === opt ? '#F3F4F6' : 'transparent'}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, value, title, badgeText, badgeType }) {
  const isUp = badgeText.includes('↑') || badgeText.includes('+');
  const isDown = badgeText.includes('↓') || badgeText.includes('-');
  
  let badgeStyle = { background: '#F3F4F6', color: '#6B7280' }; // default/gray
  if (badgeType === 'green') badgeStyle = { background: '#DCFCE7', color: '#16A34A' };
  
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcon icon={icon} className="text-[16px] text-gray-600" />
        </div>
        <MaterialIcon icon="more_horiz" className="text-[16px] text-gray-400 cursor-pointer" />
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{value}</div>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{title}</div>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, alignSelf: 'flex-start', ...badgeStyle }}>
        {(isUp || isDown) && <MaterialIcon icon={isUp ? "arrow_upward" : "arrow_downward"} className="text-[12px]" />}
        {!isUp && !isDown && badgeType === 'gray' && <MaterialIcon icon="schedule" className="text-[12px]" />}
        {badgeText.replace(/[↑↓]/g, '').trim()}
      </div>
    </div>
  );
}

const TABLE_DATA = [
  { cycle: '2023', type: 'General', total: '24,965,218', valid: '24,025,940', rejected: '939,278', turnout: '26.71%', party: 'APC', change: '↓ 8.04%', status: 'Audited' },
  { cycle: '2019', type: 'General', total: '28,614,190', valid: '27,324,583', rejected: '1,289,607', turnout: '34.75%', party: 'APC', change: '↓ 8.90%', status: 'Archived' },
  { cycle: '2015', type: 'General', total: '29,432,083', valid: '28,587,584', rejected: '844,519', turnout: '43.65%', party: 'APC', change: '↓ 10.03%', status: 'Archived' },
  { cycle: '2011', type: 'General', total: '39,469,484', valid: '38,209,978', rejected: '1,259,506', turnout: '53.68%', party: 'PDP', change: '-', status: 'Archived' },
];

export default function History() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dateRange, setDateRange] = useState('All');
  const [electionType, setElectionType] = useState('All');
  const [region, setRegion] = useState('All States');
  const [metricFocus, setMetricFocus] = useState('Turnout');

  const filteredData = TABLE_DATA.filter(row => {
    let match = true;
    if (dateRange !== 'All') {
      const [start, end] = dateRange.split(' - ').map(Number);
      const y = Number(row.cycle);
      if (y < start || y > end) match = false;
    }
    if (electionType !== 'All' && row.type !== electionType) match = false;
    return match;
  });

  const handleExportCSV = () => {
    const headers = ['CYCLE', 'TYPE', 'TOTAL VOTES', 'VALID VOTES', 'REJECTED', 'TURNOUT %', 'WINNING PARTY', 'CHANGE VS PREV', 'STATUS'];
    const rows = filteredData.map(r => [r.cycle, r.type, `"${r.total}"`, `"${r.valid}"`, `"${r.rejected}"`, `"${r.turnout}"`, r.party, `"${r.change}"`, r.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historical_analysis_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>Historical Analysis</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6B7280' }}>Retrospective insights and trend analysis for previous election cycles.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleExportCSV} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MaterialIcon icon="file_download" className="text-[16px]" />
            Export Report
          </button>
          <button style={{ height: 36, padding: '0 16px', borderRadius: 8, border: 'none', background: '#FF5A1F', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MaterialIcon icon="compare_arrows" className="text-[16px]" />
            Compare Cycles
          </button>
        </div>
      </div>

      {/* Filters Container */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #E5E7EB', display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <DropdownFilter label="Date Range" options={['All', '2019 - 2023', '2011 - 2015']} value={dateRange} onChange={setDateRange} isActive={activeDropdown === 'date'} onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')} onClose={() => setActiveDropdown(null)} />
        <DropdownFilter label="Election Type" options={['All', 'General', 'Gubernatorial', 'Local']} value={electionType} onChange={setElectionType} isActive={activeDropdown === 'type'} onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')} onClose={() => setActiveDropdown(null)} />
        <DropdownFilter label="Region" options={['All States', 'Lagos', 'Kano', 'Abuja (FCT)']} value={region} onChange={setRegion} isActive={activeDropdown === 'region'} onClick={() => setActiveDropdown(activeDropdown === 'region' ? null : 'region')} onClose={() => setActiveDropdown(null)} />
        <DropdownFilter label="Metric Focus" options={['Turnout', 'Incidents', 'Votes Cast']} value={metricFocus} onChange={setMetricFocus} isActive={activeDropdown === 'metric'} onClick={() => setActiveDropdown(activeDropdown === 'metric' ? null : 'metric')} onClose={() => setActiveDropdown(null)} />
        <button style={{ height: 38, padding: '0 16px', borderRadius: 8, border: 'none', background: '#DBEAFE', color: '#1E40AF', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}>
          <MaterialIcon icon="filter_list" className="text-[16px]" />
          Filters
        </button>
      </div>

      {/* Active Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: -12, minHeight: 26 }}>
        {dateRange !== 'All' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 999, fontSize: 12, color: '#374151' }}>
            <span style={{ color: '#6B7280' }}>Date:</span> {dateRange}
            <MaterialIcon icon="close" onClick={() => setDateRange('All')} className="text-[14px] text-gray-400 cursor-pointer hover:text-gray-600" style={{ marginLeft: 4 }} />
          </div>
        )}
        {electionType !== 'All' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 999, fontSize: 12, color: '#374151' }}>
            <span style={{ color: '#6B7280' }}>Type:</span> {electionType}
            <MaterialIcon icon="close" onClick={() => setElectionType('All')} className="text-[14px] text-gray-400 cursor-pointer hover:text-gray-600" style={{ marginLeft: 4 }} />
          </div>
        )}
        {region !== 'All States' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 999, fontSize: 12, color: '#374151' }}>
            <span style={{ color: '#6B7280' }}>Region:</span> {region}
            <MaterialIcon icon="close" onClick={() => setRegion('All States')} className="text-[14px] text-gray-400 cursor-pointer hover:text-gray-600" style={{ marginLeft: 4 }} />
          </div>
        )}
        {(dateRange !== 'All' || electionType !== 'All' || region !== 'All States') && (
          <button onClick={() => { setDateRange('All'); setElectionType('All'); setRegion('All States'); }} style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 600, color: '#D97706', cursor: 'pointer' }}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard icon="group" value="64.2%" title="Historical Turnout" badgeText="↑ +2.1% Avg" badgeType="green" />
        <StatCard icon="how_to_vote" value="93.4M" title="Total Registered Voters" badgeText="↑ +11.4M vs 2019" badgeType="green" />
        <StatCard icon="warning_amber" value="2.4%" title="Incident Rate Trends" badgeText="↓ -12% vs 2019" badgeType="green" />
        <StatCard icon="layers" value="1.4M" title="Data Points Analyzed" badgeText="Across 4 cycles" badgeType="gray" />
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        
        {/* Bar Chart */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>Voter Turnout Comparison</h3>
            <MaterialIcon icon="more_vert" className="text-[16px] text-gray-400 cursor-pointer" />
          </div>
          
          <div style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'flex-end', gap: 40, paddingLeft: 40, paddingBottom: 30 }}>
            {/* Grid Lines */}
            {[100, 75, 50, 25, 0].map((val, i) => (
              <div key={val} style={{ position: 'absolute', left: 0, right: 0, bottom: 30 + (i * 42.5), display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 10, color: '#9CA3AF', width: 25, textAlign: 'right' }}>{val}%</span>
                <div style={{ flex: 1, borderTop: '1px dashed #E5E7EB' }} />
              </div>
            ))}
            
            {/* Bars */}
            {[
              { year: '2011', h: '53.6%', color: '#E0E7FF' },
              { year: '2015', h: '43.6%', color: '#E0E7FF' },
              { year: '2019', h: '34.7%', color: '#E0E7FF' },
              { year: '2023', h: '26.7%', color: '#FF8A4C', label: '27%' }
            ].filter(b => {
              if (dateRange === 'All') return true;
              const [start, end] = dateRange.split(' - ').map(Number);
              const y = Number(b.year);
              return y >= start && y <= end;
            }).map(b => (
              <div key={b.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <div style={{ width: '100%', maxWidth: 40, height: `calc(${b.h} * 1.7)`, background: b.color, position: 'relative' }}>
                  {b.label && <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: '#EA580C' }}>{b.label}</div>}
                </div>
                <div style={{ position: 'absolute', bottom: 6, fontSize: 11, fontWeight: b.year === '2023' ? 700 : 500, color: b.year === '2023' ? '#111827' : '#6B7280' }}>
                  {b.year}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280', fontWeight: 500 }}>
              <div style={{ width: 10, height: 10, background: '#FF8A4C', borderRadius: 2 }} />
              Latest Cycle
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280', fontWeight: 500 }}>
              <div style={{ width: 10, height: 10, background: '#E0E7FF', borderRadius: 2 }} />
              Previous Cycles
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>Incident Heatmap Summary</h3>
              <p style={{ margin: '4px 0 0', fontSize: 11, color: '#6B7280' }}>Geographic distribution of reported anomalies across all cycles.</p>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', background: '#F3F4F6', padding: '4px 10px', borderRadius: 6, height: 'fit-content' }}>
              Nigeria
            </div>
          </div>
          
          <div style={{ width: '100%', height: 210, background: '#F8FAFC', borderRadius: 8, border: '1px solid #F3F4F6', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Abstract map shape */}
            <svg width="200" height="180" viewBox="0 0 200 180" style={{ opacity: 0.8 }}>
              <path d="M 100 20 L 160 60 L 180 120 L 130 160 L 70 160 L 20 110 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            
            {/* Heatmap blur circles */}
            <div style={{ position: 'absolute', top: 90, left: '42%', width: 50, height: 50, background: 'radial-gradient(circle, rgba(220,38,38,0.7) 0%, rgba(220,38,38,0) 70%)', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', top: 92, left: '42%', width: 8, height: 8, background: '#991B1B', borderRadius: '50%' }} />

            <div style={{ position: 'absolute', top: 130, left: '60%', width: 40, height: 40, background: 'radial-gradient(circle, rgba(185,28,28,0.5) 0%, rgba(185,28,28,0) 70%)', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', top: 130, left: '60%', width: 6, height: 6, background: '#7F1D1D', borderRadius: '50%' }} />

            <div style={{ position: 'absolute', top: 70, left: '65%', width: 30, height: 30, background: 'radial-gradient(circle, rgba(234,88,12,0.4) 0%, rgba(234,88,12,0) 70%)', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', top: 70, left: '65%', width: 5, height: 5, background: '#C2410C', borderRadius: '50%' }} />

            <div style={{ position: 'absolute', top: 120, left: '30%', width: 30, height: 30, background: 'radial-gradient(circle, rgba(234,88,12,0.4) 0%, rgba(234,88,12,0) 70%)', transform: 'translate(-50%, -50%)' }} />
            <div style={{ position: 'absolute', top: 120, left: '30%', width: 5, height: 5, background: '#C2410C', borderRadius: '50%' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <span style={{ fontSize: 10, color: '#6B7280' }}>Low Density</span>
            <div style={{ flex: 1, height: 4, background: 'linear-gradient(90deg, #E2E8F0 0%, #FCA5A5 50%, #991B1B 100%)', margin: '0 12px', borderRadius: 2 }} />
            <span style={{ fontSize: 10, color: '#6B7280' }}>High Density</span>
          </div>
        </div>

      </div>

      {/* Table Section */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #F3F4F6' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>Election Cycle Comparison</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <MaterialIcon icon="filter_list" className="text-[18px] text-gray-400 cursor-pointer" />
            <MaterialIcon icon="more_horiz" className="text-[18px] text-gray-400 cursor-pointer" />
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['CYCLE', 'TOTAL VOTES', 'VALID VOTES', 'REJECTED', 'TURNOUT %', 'WINNING PARTY', 'CHANGE VS PREV', 'STATUS'].map((h, i) => (
                  <th key={h} style={{ padding: '12px 24px', fontSize: 10, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #F3F4F6' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={row.cycle} style={{ borderBottom: i === filteredData.length - 1 ? 'none' : '1px solid #F9FAFB' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: row.cycle === '2023' ? '#FF8A4C' : '#DBEAFE' }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{row.cycle}</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#4B5563' }}>{row.type}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: 12, color: '#374151' }}>{row.total}</td>
                  <td style={{ padding: '16px 24px', fontSize: 12, color: '#374151' }}>{row.valid}</td>
                  <td style={{ padding: '16px 24px', fontSize: 12, color: '#DC2626' }}>{row.rejected}</td>
                  <td style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: '#111827' }}>{row.turnout}</td>
                  <td style={{ padding: '16px 24px', fontSize: 12, color: '#374151' }}>{row.party}</td>
                  <td style={{ padding: '16px 24px', fontSize: 12, color: row.change.includes('↓') ? '#DC2626' : '#6B7280', fontWeight: row.change !== '-' ? 600 : 400 }}>{row.change}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: row.status === 'Audited' ? '#DBEAFE' : '#F3F4F6', color: row.status === 'Audited' ? '#1E40AF' : '#4B5563' }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>Showing {filteredData.length} of {TABLE_DATA.length} cycles</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <MaterialIcon icon="chevron_left" className="text-[16px] text-gray-300 cursor-not-allowed" />
            <MaterialIcon icon="chevron_right" className="text-[16px] text-gray-300 cursor-not-allowed" />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 16 }}>
        Data source: Election Archive | Last updated: 18 Aug 2026
      </div>

    </div>
  );
}
