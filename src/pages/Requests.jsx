import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequestsAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import MaterialIcon from '../components/atoms/MaterialIcon';
import ManualEntryDrawer from '../components/organisms/ManualEntryDrawer';
import RequestDetailDrawer from '../components/organisms/RequestDetailDrawer';
import GlobalTable from '../components/organisms/GlobalTable';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import Input from '../components/atoms/Input';
import { formatTime } from '../utils/formatters';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   DATA (now fetched from API)
───────────────────────────────────────── */


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
  const [publicLinks, setPublicLinks] = useState([]);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [detailRequest, setDetailRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
    setPublicLinks(JSON.parse(localStorage.getItem('metabase_public_links') || '[]'));
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await RequestsAPI.getAll();
      // Map API data to component structure if needed
      const mapped = data.map(r => {
        const mappedStatus = r.status === 'Resolved' || r.status === 'Rejected' ? 'Resolved' : r.status === 'Pending' ? 'Pending' : 'Assigned';
        const hasLink = mappedStatus === 'Assigned' || mappedStatus === 'Resolved';
        return {
          ...r,
          typeIcon: r.type === 'Security' ? 'security' : r.type === 'Logistical' ? 'local_shipping' : 'computer',
          locationSub: r.location,
          requester: r.submitter,
          time: formatTime(r.date),
          timeSub: 'Today',
          tab: mappedStatus,
          publicLink: hasLink ? `zabe.app/req-${String(r.id).replace('REQ-', '').toLowerCase()}` : null
        };
      });
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

  const tabCounts = {
    All: requests.length,
    Pending: requests.filter(r => r.tab === 'Pending').length,
    Assigned: requests.filter(r => r.tab === 'Assigned').length,
    Resolved: requests.filter(r => r.tab === 'Resolved').length
  };

  const allSelected = filtered.length > 0 && selected.length === filtered.length;
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map((r) => r.id));
  const toggleRow = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div style={{ width: '100%', minWidth: 0 }}>

      {/* ── Page Header ── */}
      <PageHeader
        title="Request Queue"
        description="Manage and assign incoming deployment requests."
      >
        <Button variant="secondary" icon="filter_list">
          Filter
        </Button>
      </PageHeader>

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
        <div className="flex flex-col md:flex-row md:items-center justify-between px-5 border-b border-gray-100 min-h-[60px] gap-4 py-3 md:py-0 bg-white">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto custom-scrollbar">
            <div className="flex p-1 bg-gray-100/80 rounded-lg border border-gray-200/60">
              {Object.entries(tabCounts).map(([tab, count]) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-1.5 text-[13px] font-semibold rounded-md flex items-center gap-2.5 transition-all duration-200 ease-in-out shrink-0 group ${
                      isActive 
                        ? 'bg-white text-brand-orange shadow-sm ring-1 ring-gray-200/50' 
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
                    }`}
                  >
                    {tab}
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-brand-orange ring-1 ring-brand-orange/20' 
                        : 'bg-gray-200/70 text-gray-500 group-hover:bg-gray-300/50'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto md:max-w-[340px] flex-1">
            <Input
              icon="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, Location..."
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
            <Button variant="secondary" size="sm">Assign</Button>
            <Button variant="secondary" size="sm">Escalate</Button>
            <Button variant="dangerLight" size="sm">Dismiss</Button>
            <Button
              variant="ghost"
              icon="close"
              onClick={() => setSelected([])}
              className="ml-auto text-gray-500 hover:text-gray-900"
            />
          </div>
        )}

        {/* ── Table ── */}
        <GlobalTable minWidth="1000px" tableLayout="fixed">
          <thead>
            <colgroup>
              <col style={{ width: 44 }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '9%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '14%' }} />
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
              <th style={th()}>ASSIGNED LINK</th>
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
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block' }}>{row.id}</span>
                    {publicLinks.find(l => l.requestId === row.id) && (
                      <span 
                        onClick={() => {
                          const link = publicLinks.find(l => l.requestId === row.id);
                          navigate(`/links/view/${link.id}`, { state: { from: '/requests' } });
                        }} 
                        style={{ fontSize: 11, fontWeight: 500, color: '#FF5A1F', cursor: 'pointer', marginTop: 4, display: 'inline-block' }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        View Dashboard
                      </span>
                    )}
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

                  {/* Assigned Link */}
                  <td style={td()}>
                    {row.publicLink ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 8px', borderRadius: 6, background: '#EFF6FF', color: '#2563EB', fontSize: 11, fontWeight: 500, border: '1px solid #BFDBFE' }}>
                        <MaterialIcon icon="link" className="text-[12px] mr-1" />
                        {row.publicLink}
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>Unassigned</span>
                    )}
                  </td>

                  {/* Priority Badge */}
                  <td style={td()}>
                    <Badge status={row.priority} />
                  </td>

                  {/* Status Badge */}
                  <td style={td()}>
                    <Badge status={row.status} />
                  </td>

                  {/* Action */}
                  <td style={{ ...td(), textAlign: 'right', paddingRight: 20 }}>
                    <div className="flex items-center justify-end gap-2 text-gray-500">
                      <Button 
                        variant="ghost" 
                        onClick={() => row.publicLink ? window.open(`https://${row.publicLink}`, '_blank') : null}
                        title="Preview Link"
                        className={`w-8 h-8 p-0 flex items-center justify-center transition-colors ${row.publicLink ? 'hover:text-blue-600 hover:bg-blue-50' : 'opacity-30 cursor-not-allowed'}`}
                        disabled={!row.publicLink}
                      >
                        <MaterialIcon icon="open_in_new" className="text-[16px]" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setDetailRequest(row)}
                        title="View Detail"
                        className="w-8 h-8 p-0 flex items-center justify-center hover:text-brand-orange hover:bg-orange-50 transition-colors"
                      >
                        <MaterialIcon icon="visibility" className="text-[16px]" />
                      </Button>
                    </div>
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
            <strong style={{ color: '#111827' }}>{filtered.length}</strong> requests
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button variant="secondary" disabled>
              Previous
            </Button>
            <Button variant="secondary">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* ── Manual Entry Drawer ── */}
      <ManualEntryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={fetchRequests} />

      {/* ── Request Detail Drawer ── */}
      <RequestDetailDrawer
        request={detailRequest}
        onClose={() => {
          setDetailRequest(null);
          setPublicLinks(JSON.parse(localStorage.getItem('metabase_public_links') || '[]'));
        }}
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
