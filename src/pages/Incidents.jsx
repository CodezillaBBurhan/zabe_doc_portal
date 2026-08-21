import React, { useState, useEffect } from 'react';
import { IncidentsAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import MaterialIcon from '../components/atoms/MaterialIcon';
import ReportIncidentDrawer from '../components/organisms/ReportIncidentDrawer';
import IncidentDetailDrawer from '../components/organisms/IncidentDetailDrawer';
import GlobalTable from '../components/organisms/GlobalTable';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Input from '../components/atoms/Input';
import { formatTime } from '../utils/formatters';

/* ── Data (now fetched from API) ── */


const CAT_ICON = {
  Security: { icon: 'security', color: '#EF4444', bg: '#FEE2E2' },
  Technical: { icon: 'settings', color: '#8B5CF6', bg: '#EDE9FE' },
  Logistics: { icon: 'local_shipping', color: '#22C55E', bg: '#DCFCE7' },
  Results: { icon: 'description', color: '#3B82F6', bg: '#DBEAFE' },
  Others: { icon: 'more_horiz', color: '#6B7280', bg: '#F3F4F6' },
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
    { pct: 2.1, color: '#EF4444' },
    { pct: 19.7, color: '#F97316' },
    { pct: 29.6, color: '#EAB308' },
    { pct: 48.6, color: '#3B82F6' },
  ];
  const r = 52, cx = 64, cy = 64, stroke = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.map((d) => {
    const dash = (d.pct / 100) * circ;
    const gap = circ - dash;
    const s = { strokeDasharray: `${dash} ${gap}`, strokeDashoffset: -offset, stroke: d.color };
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
const hd = { padding: '10px 12px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', textAlign: 'left', background: '#FAFAFA', borderBottom: '1px solid #F3F4F6' };

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('All Incidents');
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('All');
  const [category, setCategory] = useState('All');
  const [reportOpen, setReportOpen] = useState(false);
  const [detailIncident, setDetailIncident] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setIsLoading(true);
    try {
      const data = await IncidentsAPI.getAll();
      const mapped = data.map(i => ({
        ...i,
        detail: i.title,
        sub: i.location.split(' - ')[1] || '',
        location: i.location.split(' - ')[0] || '',
        time: formatTime(i.time),
        tab: i.status === 'Resolved' ? 'Resolved' : i.severity === 'Critical' ? 'Critical' : i.status === 'Open' ? 'Pending' : 'Active'
      }));
      setIncidents(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = incidents.filter((r) => {
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
      <PageHeader
        title="Incidents"
        description="Monitor, manage, and resolve election incidents in real-time."
      />

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { title: 'TOTAL INCIDENTS', value: '142', sub: '↑ 18% from last 24h', subColor: 'text-emerald-600', icon: 'list_alt', iconBg: 'bg-blue-50', iconFg: 'text-blue-500', spark: '#3B82F6', up: true },
          { title: 'ACTIVE INCIDENTS', value: '12', sub: '↓ 3 from last 24h', subColor: 'text-orange-600', icon: 'bolt', iconBg: 'bg-orange-50', iconFg: 'text-orange-500', spark: '#F97316', up: false },
          { title: 'CRITICAL', value: '3', sub: '↑ 1 from last 24h', subColor: 'text-red-600', icon: 'warning_amber', iconBg: 'bg-red-50', iconFg: 'text-red-500', spark: '#EF4444', up: true },
          { title: 'RESOLVED', value: '127', sub: '↑ 15% from last 24h', subColor: 'text-emerald-600', icon: 'check_circle', iconBg: 'bg-emerald-50', iconFg: 'text-emerald-500', spark: '#22C55E', up: true },
        ].map((c) => (
          <div key={c.title} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.iconBg}`}>
                  <MaterialIcon icon={c.icon} className={`text-[14px] ${c.iconFg}`} />
                </div>
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{c.title}</span>
              </div>
              <Sparkline color={c.spark} up={c.up} />
            </div>
            <div>
              <div className="text-[32px] font-bold text-gray-900 leading-none">{c.value}</div>
              <div className={`text-[11.5px] mt-1 font-medium ${c.subColor}`}>{c.sub}</div>
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
                { label: 'Critical', count: 3, pct: '2.1%', color: '#EF4444' },
                { label: 'High', count: 28, pct: '19.7%', color: '#F97316' },
                { label: 'Medium', count: 42, pct: '29.6%', color: '#EAB308' },
                { label: 'Low', count: 69, pct: '48.6%', color: '#3B82F6' },
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
          <CatBar label="Security" count={45} pct={31.7} color="#EF4444" />
          <CatBar label="Technical" count={32} pct={22.5} color="#8B5CF6" />
          <CatBar label="Logistics" count={26} pct={18.3} color="#22C55E" />
          <CatBar label="Results" count={22} pct={15.5} color="#3B82F6" />
          <CatBar label="Others" count={17} pct={12.0} color="#9CA3AF" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="text-[13px] font-bold text-gray-900 mb-4">Quick Actions</div>
          <div className="flex flex-col">
            {[
              { icon: 'add_circle', iconBg: 'bg-orange-50', iconFg: 'text-brand-orange', label: 'Report New Incident', sub: 'Create a new incident report' },
              { icon: 'location_on', iconBg: 'bg-blue-50', iconFg: 'text-blue-500', label: 'Incident Map', sub: 'View incidents on Ward/LGA map' },
              { icon: 'trending_up', iconBg: 'bg-emerald-50', iconFg: 'text-emerald-500', label: 'Incident Analytics', sub: 'View trends and analysis' },
              { icon: 'download', iconBg: 'bg-amber-50', iconFg: 'text-amber-500', label: 'Export Report', sub: 'Download incident report' },
            ].map((a, i, arr) => (
              <Button key={a.label} variant="ghost" className={`w-full !justify-start rounded-none py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mr-3 ${a.iconBg}`}>
                  <MaterialIcon icon={a.icon} className={`text-[15px] ${a.iconFg}`} />
                </div>
                <div className="text-left">
                  <div className="text-[12px] font-semibold text-gray-900">{a.label}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{a.sub}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Filter + Table ── */}
      <div className="w-full min-w-0 flex flex-col gap-4">
        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 flex flex-col sm:flex-row sm:items-center flex-wrap gap-3">
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <Input
              icon="search"
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incidents by ID, detail or location..."
            />
          </div>
          {[
            { label: 'Severity', value: severity, set: setSeverity, opts: ['All', 'Critical', 'High', 'Medium', 'Low'] },
            { label: 'Category', value: category, set: setCategory, opts: ['All', 'Security', 'Technical', 'Logistics', 'Results'] },
            { label: 'Status', value: 'All', set: () => { }, opts: ['All', 'Active', 'Pending', 'Resolved'] },
          ].map((f) => (
            <div key={f.label} style={{ position: 'relative' }}>
              <select value={f.value} onChange={(e) => f.set(e.target.value)} style={{ height: 34, padding: '0 28px 0 10px', fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 8, cursor: 'pointer', appearance: 'none', color: '#374151', background: '#fff', outline: 'none' }}>
                {f.opts.map((o) => <option key={o}>{f.label !== 'Status' || o === 'All' ? `${f.label}: ${o}` : o}</option>)}
              </select>
              <MaterialIcon icon="expand_more" className="text-[14px]" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
            </div>
          ))}
          <Button variant="secondary" icon="tune">
            More Filters
          </Button>
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
          <GlobalTable minWidth="900px" tableLayout="fixed">
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '48px 0', textAlign: 'center' }}>
                    <Spinner />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '48px 0', textAlign: 'center' }}>
                    <EmptyState title="No incidents found" description="There are no incidents matching your filters." />
                  </td>
                </tr>
              ) : filtered.map((row) => {
                const cat = CAT_ICON[row.category] || CAT_ICON.Others;
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid #F9FAFB' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <td style={{ ...cell, fontWeight: 600, color: '#374151' }}>{row.id}</td>
                    <td style={cell}>
                      <Badge status={row.severity} />
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
                      <Button variant="secondary" onClick={() => setDetailIncident(row)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </GlobalTable>

          {/* Pagination */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: '#6B7280' }}>
              Showing <strong style={{ color: '#111827' }}>1 to {filtered.length}</strong> of <strong style={{ color: '#111827' }}>142</strong> entries
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Button variant="secondary" disabled>
                ‹ Previous
              </Button>
              {[1, 2, 3].map((n) => (
                <Button key={n} variant={n === 1 ? 'primary' : 'secondary'} className="w-8 h-8 p-0 flex items-center justify-center">
                  {n}
                </Button>
              ))}
              <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 4px' }}>…</span>
              <Button variant="secondary" className="w-8 h-8 p-0 flex items-center justify-center">20</Button>
              <Button variant="secondary">
                Next ›
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Drawers ── */}
      {/* ── Drawers ── */}
      <ReportIncidentDrawer open={reportOpen} onClose={() => setReportOpen(false)} onSubmit={fetchIncidents} />
      <IncidentDetailDrawer incident={detailIncident} onClose={() => setDetailIncident(null)} />
    </div>
  );
}
