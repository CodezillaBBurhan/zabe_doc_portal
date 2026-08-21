import React, { useState, useEffect } from 'react';
import { RequestsAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import MaterialIcon from '../components/atoms/MaterialIcon';
import ManualEntryDrawer from '../components/organisms/ManualEntryDrawer';
import RequestDetailDrawer from '../components/organisms/RequestDetailDrawer';
import GlobalTable from '../components/organisms/GlobalTable';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   DATA (now fetched from API)
───────────────────────────────────────── */
const TAB_COUNTS = { All: 124, Pending: 89, Assigned: 28, Resolved: 7 };

/* ─────────────────────────────────────────
   BADGE STYLE MAPS  (exactly like Figma)
───────────────────────────────────────── */
const PRIORITY_STYLES = {
  Critical: { bg: '#FEE2E2', color: '#DC2626' },
  High: { bg: '#FFEDD5', color: '#EA580C' },
  Medium: { bg: '#FEF9C3', color: '#CA8A04' },
  Low: { bg: '#F1F5F9', color: '#475569' },
};

const STATUS_STYLES = {
  Pending: { bg: '#F1F5F9', color: '#6B7280' },
  Assigned: { bg: '#DBEAFE', color: '#2563EB' },
  'In Progress': { bg: '#EDE9FE', color: '#7C3AED' },
  Resolved: { bg: '#DCFCE7', color: '#16A34A' },
};

/* ─────────────────────────────────────────
   KPI CARDS  (Figma spec)
───────────────────────────────────────── */
const KPI_CARDS = [
  {
    title: 'Pending Requests',
    value: '124',
    sub: '↑ +12% from last shift',
    subColor: '#16A34A',
    icon: 'inbox',
    iconBg: '#F8FAFC',
    iconFg: '#94A3B8',
    danger: false,
  },
  {
    title: 'High Priority',
    value: '12',
    sub: '↑ Action Required',
    subColor: '#EF4444',
    icon: 'warning_amber',
    iconBg: '#FEE2E2',
    iconFg: '#EF4444',
    danger: true,
  },
  {
    title: 'In Progress',
    value: '45',
    sub: 'Active Deployments',
    subColor: '#9CA3AF',
    icon: 'sync',
    iconBg: '#EFF6FF',
    iconFg: '#3B82F6',
    danger: false,
  },
  {
    title: 'Avg Response Time',
    value: '14 m',
    sub: '↓ -2m from avg',
    subColor: '#16A34A',
    icon: 'schedule',
    iconBg: '#F0FDF4',
    iconFg: '#22C55E',
    danger: false,
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [detailRequest, setDetailRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await RequestsAPI.getAll();
      // Map API data to component structure if needed
      const mapped = data.map(r => ({
        ...r,
        typeIcon: r.type === 'Security' ? 'security' : r.type === 'Logistical' ? 'local_shipping' : 'computer',
        locationSub: r.location,
        requester: r.submitter,
        time: new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeSub: 'Today',
        tab: r.status === 'Resolved' || r.status === 'Rejected' ? 'Resolved' : r.status === 'Pending' ? 'Pending' : 'Assigned'
      }));
      setRequests(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = requests.filter((r) => {
    const matchTab = activeTab === 'All' || r.tab === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q
      || String(r.id || '').toLowerCase().includes(q)
      || String(r.location || '').toLowerCase().includes(q)
      || String(r.type || '').toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const allSelected = filtered.length > 0 && selected.length === filtered.length;
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map((r) => r.id));
  const toggleRow = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div style={{ width: '100%', minWidth: 0 }}>

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px', margin: 0, lineHeight: 1.3 }}>
            Request Queue
          </h1>
          <p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>
            Manage and assign incoming deployment requests.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Filter button */}
          <button style={{
            height: 36, padding: '0 16px', borderRadius: 8,
            border: '1px solid #D1D5DB', background: '#fff',
            color: '#374151', fontWeight: 500, fontSize: 13,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}>
            <MaterialIcon icon="filter_list" className="text-[16px]" style={{ color: '#6B7280' }} />
            Filter
          </button>
          {/* Manual Entry button */}
          {/* <button onClick={() => setDrawerOpen(true)} style={{
            height: 36, padding: '0 18px', borderRadius: 8,
            background: '#FF5A1F', color: '#fff',
            fontWeight: 600, fontSize: 13, border: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,90,31,0.35)',
          }}>
            <MaterialIcon icon="add" className="text-[16px]" />
            Manual Entry
          </button> */}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {KPI_CARDS.map((c) => (
          <div
            key={c.title}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              border: c.danger ? '2px solid #FCA5A5' : '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              minHeight: 110,
            }}
          >
            {/* Top row: title + icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', lineHeight: 1.4 }}>
                {c.title}
              </span>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: c.iconBg, color: c.iconFg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MaterialIcon icon={c.icon} className="text-[18px]" />
              </div>
            </div>
            {/* Bottom row: value + sub */}
            <div>
              <div style={{ fontSize: 30, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
                {c.value}
              </div>
              <div style={{ fontSize: 11.5, marginTop: 4, fontWeight: 500, color: c.subColor }}>
                {c.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}>

        {/* ── Tabs + Search bar ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between px-5 border-b border-gray-100 min-h-[50px] gap-4 py-2 md:py-0">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1 md:pb-0 md:h-full">
            {Object.entries(TAB_COUNTS).map(([tab, count]) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    position: 'relative',
                    height: '100%',
                    padding: '0 14px',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FF5A1F' : '#6B7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'color .15s',
                  }}
                >
                  {tab}
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1,
                    padding: '2px 6px',
                    borderRadius: 999,
                    background: isActive ? '#FF5A1F' : '#E5E7EB',
                    color: isActive ? '#fff' : '#4B5563',
                    transition: 'all .15s',
                  }}>
                    {count}
                  </span>
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: 2, background: '#FF5A1F', borderRadius: '2px 2px 0 0',
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto md:max-w-[340px] flex-1">
            <span style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              color: '#9CA3AF', fontSize: 17, display: 'flex', alignItems: 'center',
            }}>
              <MaterialIcon icon="search" className="text-[17px]" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, Location..."
              style={{
                height: 34, paddingLeft: 34, paddingRight: 12, width: '100%',
                fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 8,
                background: '#fff', outline: 'none', color: '#374151',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* ── Bulk action bar (shown only when rows selected) ── */}
        {selected.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 20px', background: '#FFF7F5', borderBottom: '1px solid #FED7AA',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#FF5A1F' }}>
              {selected.length} selected
            </span>
            <button style={bulkBtn}>Assign</button>
            <button style={bulkBtn}>Escalate</button>
            <button style={{ ...bulkBtn, color: '#DC2626', borderColor: '#FECACA' }}>Dismiss</button>
            <button
              onClick={() => setSelected([])}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
            >
              <MaterialIcon icon="close" className="text-[18px]" />
            </button>
          </div>
        )}

        {/* ── Table ── */}
        <GlobalTable minWidth="1000px" tableLayout="fixed">
          <thead>
            <colgroup>
              <col style={{ width: 44 }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '28%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <tr style={{ borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
              <th style={th({ w: 44 })}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  style={{ accentColor: '#FF5A1F', width: 15, height: 15, cursor: 'pointer' }}
                />
              </th>
              <th style={th()}>REQ ID</th>
              <th style={th()}>TYPE</th>
              <th style={th()}>LOCATION</th>
              <th style={th()}>SUBMITTED</th>
              <th style={th()}>PRIORITY</th>
              <th style={th()}>STATUS</th>
              <th style={{ ...th(), textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" style={{ padding: '48px 0', textAlign: 'center' }}>
                  <Spinner />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '48px 0', textAlign: 'center' }}>
                  <EmptyState title="No requests found" description="There are no requests matching your filters." />
                </td>
              </tr>
            ) : filtered.map((row) => {
              const isChecked = selected.includes(row.id);
              const pStyle = PRIORITY_STYLES[row.priority] || PRIORITY_STYLES.Low;
              const sStyle = STATUS_STYLES[row.status] || STATUS_STYLES.Pending;

              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: '1px solid #F9FAFB',
                    background: isChecked ? '#FFF7F5' : '#fff',
                    transition: 'background .12s',
                  }}
                  onMouseEnter={(e) => { if (!isChecked) e.currentTarget.style.background = '#FAFAFA'; }}
                  onMouseLeave={(e) => { if (!isChecked) e.currentTarget.style.background = '#fff'; }}
                >
                  {/* Checkbox */}
                  <td style={td({ pl: 20, w: 44 })}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRow(row.id)}
                      style={{ accentColor: '#FF5A1F', width: 15, height: 15, cursor: 'pointer' }}
                    />
                  </td>

                  {/* Req ID */}
                  <td style={td()}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{row.id}</span>
                  </td>

                  {/* Type */}
                  <td style={td()}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: 6,
                        background: '#F1F5F9', color: '#64748B',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <MaterialIcon icon={row.typeIcon} className="text-[13px]" />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{row.type}</span>
                    </div>
                  </td>

                  {/* Location */}
                  <td style={td()}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.location}
                    </div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.locationSub} · {row.requester}
                    </div>
                  </td>

                  {/* Submitted */}
                  <td style={td()}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#111827', lineHeight: 1.3 }}>
                      {row.time}
                    </div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{row.timeSub}</div>
                  </td>

                  {/* Priority Badge */}
                  <td style={td()}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      background: pStyle.bg,
                      color: pStyle.color,
                      whiteSpace: 'nowrap',
                    }}>
                      {row.priority}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td style={td()}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      background: sStyle.bg,
                      color: sStyle.color,
                      whiteSpace: 'nowrap',
                    }}>
                      {row.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ ...td(), textAlign: 'right', paddingRight: 20 }}>
                    <button
                      style={{
                        width: 32, height: 32,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid #E5E7EB', borderRadius: 8,
                        background: '#fff', color: '#6B7280',
                        cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        transition: 'all .15s',
                      }}
                      title="View Detail"
                      onClick={() => setDetailRequest(row)}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#FF5A1F'; e.currentTarget.style.borderColor = '#FDBA74'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                    >
                      <MaterialIcon icon="open_in_new" className="text-[14px]" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '48px 0', textAlign: 'center', fontSize: 13, color: '#9CA3AF' }}>
                  No requests match your current filter.
                </td>
              </tr>
            )}
          </tbody>
        </GlobalTable>

        {/* ── Pagination Footer ── */}
        <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white gap-3">
          <span style={{ fontSize: 13, color: '#6B7280' }}>
            Showing <strong style={{ color: '#111827' }}>1 to {filtered.length}</strong> of{' '}
            <strong style={{ color: '#111827' }}>124</strong> requests
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button disabled style={paginationBtn(true)}>
              Previous
            </button>
            <button style={paginationBtn(false)}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Manual Entry Drawer ── */}
      <ManualEntryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={fetchRequests} />

      {/* ── Request Detail Drawer ── */}
      <RequestDetailDrawer
        request={detailRequest}
        onClose={() => setDetailRequest(null)}
        onApprove={(r) => console.log('Approved:', r.id)}
        onReject={(r) => console.log('Rejected:', r.id)}
      />
    </div>
  );
}

/* ─── Style helpers ─── */
function th({ w } = {}) {
  return {
    padding: '10px 18px',
    fontSize: 11,
    fontWeight: 600,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
    width: w || 'auto',
    textAlign: 'left',
  };
}

function td({ pl, w } = {}) {
  return {
    padding: `14px ${pl || 14}px`,
    verticalAlign: 'middle',
    width: w || 'auto',
  };
}

const bulkBtn = {
  height: 28, padding: '0 12px',
  borderRadius: 6, border: '1px solid #FED7AA',
  background: '#fff', fontSize: 12, fontWeight: 500,
  color: '#EA580C', cursor: 'pointer',
};

function paginationBtn(disabled) {
  return {
    height: 32, padding: '0 14px',
    borderRadius: 8, border: '1px solid #E5E7EB',
    background: '#fff', fontSize: 12, fontWeight: 500,
    color: disabled ? '#D1D5DB' : '#374151',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 4,
  };
}
