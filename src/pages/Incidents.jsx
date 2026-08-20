import { useState } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import ReportIncidentDrawer from '../components/organisms/ReportIncidentDrawer';
import IncidentDetailDrawer from '../components/organisms/IncidentDetailDrawer';

/* ── Data ── */
const INCIDENTS = [
  { id: 'INC-2024-892', severity: 'Critical', category: 'Security',   detail: 'Unauthorized access to results portal',        location: 'Abuja',  sub: 'AMAC',        time: '10:42 AM', tab: 'Critical' },
  { id: 'INC-2024-891', severity: 'High',     category: 'Technical',  detail: 'Connectivity loss at results collation center', location: 'Lagos',  sub: 'Ikeja',       time: '10:15 AM', tab: 'Active'   },
  { id: 'INC-2024-889', severity: 'Medium',   category: 'Logistics',  detail: 'Ballot box delay due to vehicle breakdown',     location: 'Kano',   sub: 'Dala',        time: '09:30 AM', tab: 'Active'   },
  { id: 'INC-2024-890', severity: 'Low',      category: 'Results',    detail: 'Minor discrepancy in ward results',             location: 'Rivers', sub: 'Obio-Akpor',  time: '09:12 AM', tab: 'Pending'  },
  { id: 'INC-2024-888', severity: 'High',     category: 'Security',   detail: 'Voter intimidation reported',                  location: 'Kaduna', sub: 'Zaria',       time: '08:45 AM', tab: 'Active'   },
  { id: 'INC-2024-887', severity: 'Medium',   category: 'Logistics',  detail: 'IEC material shortage at polling unit',         location: 'Kwara',  sub: 'Ilorin West', time: '08:20 AM', tab: 'Active'   },
  { id: 'INC-2024-886', severity: 'Low',      category: 'Technical',  detail: 'TV screen not updating',                       location: 'Enugu',  sub: 'Enugu North', time: '08:05 AM', tab: 'Pending'  },
];

const SEVERITY = {
  Critical: { bg: '#FEE2E2', color: '#DC2626' },
  High:     { bg: '#FFEDD5', color: '#EA580C' },
  Medium:   { bg: '#FEF9C3', color: '#CA8A04' },
  Low:      { bg: '#F0FDF4', color: '#16A34A' },
};

const CAT_ICON = {
  Security:  { icon: 'security',       color: '#EF4444', bg: '#FEE2E2' },
  Technical: { icon: 'settings',       color: '#8B5CF6', bg: '#EDE9FE' },
  Logistics: { icon: 'local_shipping', color: '#22C55E', bg: '#DCFCE7' },
  Results:   { icon: 'description',    color: '#3B82F6', bg: '#DBEAFE' },
  Others:    { icon: 'more_horiz',     color: '#6B7280', bg: '#F3F4F6' },
};

const TABS = ['All Incidents', 'Active', 'Critical', 'Pending', 'Resolved'];

/* ── Tiny sparkline SVG ── */
function Sparkline({ color, up }) {
  const pts = up
    ? '0,20 8,16 16,12 24,14 32,8 40,4'
    : '0,4 8,8 16,12 24,10 32,14 40,18';
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
      <polyline points={pts} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Donut chart ── */
function DonutChart() {
  const data = [
    { pct: 2.1,  color: '#EF4444' },
    { pct: 19.7, color: '#F97316' },
    { pct: 29.6, color: '#EAB308' },
    { pct: 48.6, color: '#3B82F6' },
  ];
  const r = 52, cx = 64, cy = 64, stroke = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.map((d) => {
    const dash = (d.pct / 100) * circ;
    const gap  = circ - dash;
    const s    = { strokeDasharray: `${dash} ${gap}`, strokeDashoffset: -offset, stroke: d.color };
    offset += dash;
    return s;
  });
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      {slices.map((s, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" strokeWidth={stroke} {...s}
          style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }} />
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="18" fontWeight="700" fill="#111827">142</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#9CA3AF">Total</text>
    </svg>
  );
}

/* ── Category bar ── */
function CatBar({ label, count, pct, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#374151', marginBottom: 4 }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{ color: '#6B7280' }}>{count} ({pct}%)</span>
      </div>
      <div style={{ height: 5, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  );
}

const cell = { padding: '14px 12px', verticalAlign: 'middle', fontSize: 13 };
const hd   = { padding: '10px 12px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', textAlign: 'left', background: '#FAFAFA', borderBottom: '1px solid #F3F4F6' };

export default function Incidents() {
  const [activeTab, setActiveTab] = useState('All Incidents');
  const [search, setSearch]       = useState('');
  const [severity, setSeverity]   = useState('All');
  const [category, setCategory]   = useState('All');
  const [reportOpen, setReportOpen]     = useState(false);
  const [detailIncident, setDetailIncident] = useState(null);

  const filtered = INCIDENTS.filter((r) => {
    const matchTab = activeTab === 'All Incidents' || r.tab === activeTab;
    const matchSev = severity === 'All' || r.severity === severity;
    const matchCat = category === 'All' || r.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || r.id.toLowerCase().includes(q) || r.detail.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
    return matchTab && matchSev && matchCat && matchSearch;
  });

  return (
    <div style={{ width: '100%', minWidth: 0 }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>Incidents</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6B7280' }}>Monitor, manage, and resolve election incidents in real-time.</p>
        </div>
        <button onClick={() => setReportOpen(true)} style={{ height: 36, padding: '0 18px', borderRadius: 8, background: '#FF5A1F', color: '#fff', fontWeight: 600, fontSize: 13, border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,90,31,0.35)', flexShrink: 0 }}>
          <MaterialIcon icon="add" className="text-[16px]" />
          Report Incident
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { title: 'TOTAL INCIDENTS', value: '142', sub: '↑ 18% from last 24h', subColor: '#16A34A', icon: 'list_alt',    iconBg: '#EFF6FF', iconFg: '#3B82F6', spark: '#3B82F6', up: true  },
          { title: 'ACTIVE INCIDENTS', value: '12',  sub: '↓ 3 from last 24h',  subColor: '#EA580C', icon: 'bolt',        iconBg: '#FFF7ED', iconFg: '#F97316', spark: '#F97316', up: false },
          { title: 'CRITICAL',         value: '3',   sub: '↑ 1 from last 24h',  subColor: '#DC2626', icon: 'warning_amber',iconBg: '#FEF2F2', iconFg: '#EF4444', spark: '#EF4444', up: true  },
          { title: 'RESOLVED',         value: '127', sub: '↑ 15% from last 24h',subColor: '#16A34A', icon: 'check_circle', iconBg: '#F0FDF4', iconFg: '#22C55E', spark: '#22C55E', up: true  },
        ].map((c) => (
          <div key={c.title} style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcon icon={c.icon} className="text-[14px]" style={{ color: c.iconFg }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.04em' }}>{c.title}</span>
              </div>
              <Sparkline color={c.spark} up={c.up} />
            </div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: 11.5, marginTop: 4, fontWeight: 500, color: c.subColor }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

            {/* ── Top Charts & Widgets ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5 w-full">
        {/* Incidents by Severity */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 14 }}>Incidents by Severity</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <DonutChart />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {[
                  { label: 'Critical', count: 3,  pct: '2.1%',  color: '#EF4444' },
                  { label: 'High',     count: 28, pct: '19.7%', color: '#F97316' },
                  { label: 'Medium',   count: 42, pct: '29.6%', color: '#EAB308' },
                  { label: 'Low',      count: 69, pct: '48.6%', color: '#3B82F6' },
                ].map((s) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 'auto' }}>{s.count} ({s.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Incident Categories */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 14 }}>Top Incident Categories</div>
            <CatBar label="Security"  count={45} pct={31.7} color="#EF4444" />
            <CatBar label="Technical" count={32} pct={22.5} color="#8B5CF6" />
            <CatBar label="Logistics" count={26} pct={18.3} color="#22C55E" />
            <CatBar label="Results"   count={22} pct={15.5} color="#3B82F6" />
            <CatBar label="Others"    count={17} pct={12.0} color="#9CA3AF" />
          </div>

          {/* Quick Actions */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 14 }}>Quick Actions</div>
            {[
              { icon: 'add_circle',  iconBg: '#FFF5F2', iconFg: '#FF5A1F', label: 'Report New Incident', sub: 'Create a new incident report' },
              { icon: 'location_on', iconBg: '#EFF6FF',  iconFg: '#3B82F6', label: 'Incident Map',        sub: 'View incidents on Ward/LGA map' },
              { icon: 'trending_up', iconBg: '#F0FDF4',  iconFg: '#22C55E', label: 'Incident Analytics',  sub: 'View trends and analysis' },
              { icon: 'download',    iconBg: '#FEF3C7',  iconFg: '#D97706', label: 'Export Report',       sub: 'Download incident report' },
            ].map((a) => (
              <button key={a.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #F9FAFB', textAlign: 'left' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: a.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MaterialIcon icon={a.icon} className="text-[15px]" style={{ color: a.iconFg }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{a.sub}</div>
                </div>
              </button>
            ))}
          </div>
      </div>

      {/* ── Bottom: Filter + Table ── */}
      <div className="w-full min-w-0 flex flex-col gap-4">
          {/* Filter bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 flex flex-col sm:flex-row sm:items-center flex-wrap gap-3">
            <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 1 }}>
                <MaterialIcon icon="search" className="text-[16px]" />
              </span>
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search incidents by ID, detail or location..."
                style={{ height: 34, paddingLeft: 34, paddingRight: 12, width: '100%', fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 8, outline: 'none', boxSizing: 'border-box', color: '#374151' }}
              />
            </div>
            {[
              { label: 'Severity', value: severity, set: setSeverity, opts: ['All', 'Critical', 'High', 'Medium', 'Low'] },
              { label: 'Category', value: category, set: setCategory, opts: ['All', 'Security', 'Technical', 'Logistics', 'Results'] },
              { label: 'Status', value: 'All', set: () => {}, opts: ['All', 'Active', 'Pending', 'Resolved'] },
            ].map((f) => (
              <div key={f.label} style={{ position: 'relative' }}>
                <select value={f.value} onChange={(e) => f.set(e.target.value)} style={{ height: 34, padding: '0 28px 0 10px', fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 8, cursor: 'pointer', appearance: 'none', color: '#374151', background: '#fff', outline: 'none' }}>
                  {f.opts.map((o) => <option key={o}>{f.label !== 'Status' || o === 'All' ? `${f.label}: ${o}` : o}</option>)}
                </select>
                <MaterialIcon icon="expand_more" className="text-[14px]" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
              </div>
            ))}
            <button style={{ height: 34, padding: '0 14px', border: '1px solid #E5E7EB', borderRadius: 8, background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <MaterialIcon icon="tune" className="text-[15px]" style={{ color: '#6B7280' }} />
              More Filters
            </button>
          </div>

          {/* Table card */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-100 px-4 custom-scrollbar">
              {TABS.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ position: 'relative', padding: '12px 14px', fontSize: 13, fontWeight: active ? 600 : 500, color: active ? '#FF5A1F' : '#6B7280', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {tab}
                    {active && <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#FF5A1F', borderRadius: '2px 2px 0 0' }} />}
                  </button>
                );
              })}
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ ...hd, width: '13%' }}>Incident ID ↕</th>
                    <th style={{ ...hd, width: '10%' }}>Severity ↕</th>
                    <th style={{ ...hd, width: '13%' }}>Category ↕</th>
                    <th style={{ ...hd, width: '26%' }}>Detail ↕</th>
                    <th style={{ ...hd, width: '14%' }}>Location ↕</th>
                    <th style={{ ...hd, width: '12%' }}>Reported Time ↕</th>
                    <th style={{ ...hd, width: '12%', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => {
                    const sev  = SEVERITY[row.severity] || SEVERITY.Low;
                    const cat  = CAT_ICON[row.category] || CAT_ICON.Others;
                    return (
                      <tr key={row.id} style={{ borderBottom: '1px solid #F9FAFB' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                      >
                        <td style={{ ...cell, fontWeight: 600, color: '#374151' }}>{row.id}</td>
                        <td style={cell}>
                          <span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: sev.bg, color: sev.color, whiteSpace: 'nowrap' }}>
                            {row.severity}
                          </span>
                        </td>
                        <td style={cell}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 5, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <MaterialIcon icon={cat.icon} className="text-[11px]" style={{ color: cat.color }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{row.category}</span>
                          </div>
                        </td>
                        <td style={{ ...cell, color: '#374151', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row.detail}
                        </td>
                        <td style={cell}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{row.location}</div>
                          <div style={{ fontSize: 11, color: '#9CA3AF' }}>{row.sub}</div>
                        </td>
                        <td style={cell}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{row.time}</div>
                          <div style={{ fontSize: 11, color: '#9CA3AF' }}>Today</div>
                        </td>
                        <td style={{ ...cell, textAlign: 'right' }}>
                          <button onClick={() => setDetailIncident(row)} style={{ height: 30, padding: '0 12px', border: '1px solid #FDBA74', borderRadius: 7, background: '#fff', fontSize: 12, fontWeight: 600, color: '#EA580C', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '40px 0', textAlign: 'center', fontSize: 13, color: '#9CA3AF' }}>
                        No incidents match your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>
                Showing <strong style={{ color: '#111827' }}>1 to {filtered.length}</strong> of <strong style={{ color: '#111827' }}>142</strong> entries
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button disabled style={{ height: 30, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 7, background: '#fff', fontSize: 12, color: '#D1D5DB', cursor: 'not-allowed' }}>
                  ‹ Previous
                </button>
                {[1, 2, 3].map((n) => (
                  <button key={n} style={{ width: 30, height: 30, border: n === 1 ? '1px solid #FF5A1F' : '1px solid #E5E7EB', borderRadius: 7, background: n === 1 ? '#FFF5F2' : '#fff', fontSize: 12, fontWeight: n === 1 ? 700 : 400, color: n === 1 ? '#FF5A1F' : '#374151', cursor: 'pointer' }}>
                    {n}
                  </button>
                ))}
                <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 4px' }}>…</span>
                <button style={{ width: 30, height: 30, border: '1px solid #E5E7EB', borderRadius: 7, background: '#fff', fontSize: 12, color: '#374151', cursor: 'pointer' }}>20</button>
                <button style={{ height: 30, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 7, background: '#fff', fontSize: 12, color: '#374151', cursor: 'pointer' }}>
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* ── Drawers ── */}
      <ReportIncidentDrawer open={reportOpen} onClose={() => setReportOpen(false)} />
      <IncidentDetailDrawer incident={detailIncident} onClose={() => setDetailIncident(null)} />
    </div>
  );
}
