import React, { useState, useEffect, useMemo, useRef } from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import GlobalTable from '../components/organisms/GlobalTable';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import Avatar from '../components/atoms/Avatar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- Helper to Generate Mock Data ---
const generateMockLogs = () => {
  const users = [
    { name: 'System_Service', role: 'Automation' },
    { name: 'A. Abubakar', role: 'Lead Ops' },
    { name: 'C. Okafor', role: 'Analyst' },
    { name: 'N. Eze', role: 'Admin' },
    { name: 'O. Adebayo', role: 'Operator' },
    { name: 'Z. Usman', role: 'Auditor' }
  ];
  const actions = ['Data_Sync', 'Override_Config', 'Export_Report', 'Modify_Perms', 'Health_Check', 'Login_Attempt', 'Purge_Logs'];
  const modules = ['Voter_DB', 'Core_Routing', 'Reports', 'Auth_Control', 'Infrastructure', 'System'];
  const targets = ['tbl_precinct', 'node_alpha_config', 'turnout_Q3_config', 'usr_grp_field', 'cluster_node', 'api_gateway', 'db_replica'];

  const logs = [];
  const now = new Date();

  for (let i = 0; i < 300; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    // Bias towards last 24h
    const timeOffset = Math.random() > 0.4
      ? Math.random() * 24 * 60 * 60 * 1000 // last 24h
      : Math.random() * 30 * 24 * 60 * 60 * 1000; // last 30d

    const timestamp = new Date(now.getTime() - timeOffset);

    // Create some logical correlation
    const isError = Math.random() > 0.85;
    const severity = isError ? (Math.random() > 0.5 ? 'Critical' : 'High') : (Math.random() > 0.5 ? 'Low' : 'Medium');
    const status = isError ? (Math.random() > 0.3 ? 'Failed' : 'Blocked') : 'Success';

    logs.push({
      id: i.toString(),
      timestamp: timestamp.toISOString(),
      user: user.name,
      role: user.role,
      action: actions[Math.floor(Math.random() * actions.length)],
      module: modules[Math.floor(Math.random() * modules.length)],
      target: targets[Math.floor(Math.random() * targets.length)],
      severity,
      status
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

const initialLogs = generateMockLogs();

export default function AuditLogs() {
  const [logs] = useState(initialLogs);

  // Filter States
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All'); // '24h', '7d', '30d', 'All'
  const [userFilter, setUserFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Export Menu State
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuRef = useRef(null);

  // Close export menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setExportMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Search
      const s = searchTerm.toLowerCase();
      const searchMatch = !s || [log.user, log.action, log.module, log.target, log.role].some(val => val.toLowerCase().includes(s));

      // User
      const userMatch = userFilter === 'All' || log.user === userFilter;

      // Severity
      const severityMatch = severityFilter === 'All' || log.severity === severityFilter;

      // Status
      const statusMatch = statusFilter === 'All' || log.status === statusFilter;

      // Date
      const now = new Date();
      const logTime = new Date(log.timestamp);
      let dateMatch = true;
      if (dateFilter === '24h') dateMatch = (now - logTime) <= 24 * 60 * 60 * 1000;
      if (dateFilter === '7d') dateMatch = (now - logTime) <= 7 * 24 * 60 * 60 * 1000;
      if (dateFilter === '30d') dateMatch = (now - logTime) <= 30 * 24 * 60 * 60 * 1000;

      return searchMatch && userMatch && severityMatch && statusMatch && dateMatch;
    });
  }, [logs, searchTerm, dateFilter, userFilter, severityFilter, statusFilter]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, userFilter, severityFilter, statusFilter, rowsPerPage]);

  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Derived options for filters
  const uniqueUsers = ['All', ...new Set(logs.map(l => l.user))];

  // Active filter chips
  const activeFilters = [];
  if (dateFilter !== 'All') activeFilters.push({ label: `Date: Last ${dateFilter}`, type: 'date' });
  if (userFilter !== 'All') activeFilters.push({ label: `User: ${userFilter}`, type: 'user' });
  if (severityFilter !== 'All') activeFilters.push({ label: `Severity: ${severityFilter}`, type: 'severity', isRed: severityFilter === 'Critical' || severityFilter === 'High' });
  if (statusFilter !== 'All') activeFilters.push({ label: `Status: ${statusFilter}`, type: 'status', isRed: statusFilter === 'Failed' || statusFilter === 'Blocked' });
  if (searchTerm) activeFilters.push({ label: `Search: "${searchTerm}"`, type: 'search' });

  const clearFilter = (type) => {
    if (type === 'date') setDateFilter('All');
    if (type === 'user') setUserFilter('All');
    if (type === 'severity') setSeverityFilter('All');
    if (type === 'status') setStatusFilter('All');
    if (type === 'search') setSearchTerm('');
  };

  const clearAllFilters = () => {
    setDateFilter('All');
    setUserFilter('All');
    setSeverityFilter('All');
    setStatusFilter('All');
    setSearchTerm('');
  };

  // Stats calculation
  const totalEvents = filteredLogs.length;
  const failedEvents = filteredLogs.filter(l => l.status === 'Failed').length;
  const blockedEvents = filteredLogs.filter(l => l.status === 'Blocked').length;
  const criticalEvents = filteredLogs.filter(l => l.severity === 'Critical').length;

  // Critical events list (latest 3)
  const latestCritical = [...filteredLogs]
    .filter(l => l.severity === 'Critical')
    .slice(0, 3);

  // User activity stats
  const userStats = useMemo(() => {
    const counts = {};
    filteredLogs.forEach(l => {
      if (!counts[l.user]) counts[l.user] = { count: 0, role: l.role };
      counts[l.user].count++;
    });
    return Object.entries(counts)
      .map(([user, data]) => ({ user, count: data.count, role: data.role }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [filteredLogs]);

  // Chart calculation (last 24h)
  const chartBars = useMemo(() => {
    const now = new Date();
    const bars = Array.from({ length: 24 }).map((_, i) => {
      const bucketStart = new Date(now.getTime() - (24 - i) * 60 * 60 * 1000);
      const bucketEnd = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      const eventsInBucket = filteredLogs.filter(l => {
        const t = new Date(l.timestamp);
        return t >= bucketStart && t < bucketEnd;
      });
      const cCount = eventsInBucket.filter(l => l.severity === 'Critical').length;
      return { count: eventsInBucket.length, isCritical: cCount > 0 };
    });

    const maxCount = Math.max(...bars.map(b => b.count), 1); // prevent /0

    return bars.map(b => ({
      height: `${(b.count / maxCount) * 100}%`,
      isCritical: b.isCritical,
      count: b.count
    }));
  }, [filteredLogs]);

  // Exports
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Module', 'Target'];
    const rows = filteredLogs.map(log => [
      `"${new Date(log.timestamp).toLocaleString()}"`,
      `"${log.user}"`,
      `"${log.role}"`,
      `"${log.action}"`,
      `"${log.module}"`,
      `"${log.target}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "audit-logs.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  const handleExportPDF = async () => {
    setExportMenuOpen(false);
    const element = document.getElementById('audit-dashboard');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('audit-logs-report.pdf');
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF. See console for details.");
    }
  };

  const formatTimeOnly = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatTimeWithSeconds = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDateTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name) => {
    return name.split(/[_ ]/).map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getColorClass = (index) => {
    const colors = [
      'bg-blue-50 text-blue-700',
      'bg-orange-50 text-orange-700',
      'bg-purple-50 text-purple-700'
    ];
    return colors[index % colors.length];
  };

  return (
    <div id="audit-dashboard" className="flex flex-col gap-6 w-full pb-10 bg-gray-50 min-h-screen">

      {/* Page Header */}
      <PageHeader 
        title="Audit Logs"
        description="Track every important action performed across the Election Center."
      >
        <div className="relative w-full sm:w-auto" ref={exportMenuRef}>
          <Button 
            variant="primary" 
            icon="download" 
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            className="w-full sm:w-auto"
          >
            Export
          </Button>

          {/* Export Dropdown */}
          {exportMenuOpen && (
            <div className="absolute right-0 top-[110%] w-48 bg-white border border-gray-200 shadow-xl rounded-md z-50 overflow-hidden">
              <Button variant="ghost" onClick={handleExportCSV} icon="grid_on" className="w-full justify-start rounded-none border-b border-gray-100 px-4 py-3 text-gray-700">
                CSV Spreadsheet
              </Button>
              <Button variant="ghost" onClick={handleExportPDF} icon="picture_as_pdf" className="w-full justify-start rounded-none px-4 py-3 text-gray-700">
                Screenshot (PDF)
              </Button>
            </div>
          )}
        </div>
      </PageHeader>

      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="relative flex-1 w-full sm:w-[40%]">
              <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users, actions, targets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>

            <div className="relative w-full sm:w-[20%]">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
              >
                <option value="All">Date Range: All Time</option>
                <option value="24h">Date Range: Last 24h</option>
                <option value="7d">Date Range: Last 7 days</option>
                <option value="30d">Date Range: Last 30 days</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-[20%]">
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
              >
                {uniqueUsers.map(u => (
                  <option key={u} value={u}>User: {u}</option>
                ))}
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
            </div>

            <Button
              variant="ghost"
              icon="close"
              onClick={clearAllFilters}
              className="hidden sm:flex ml-auto text-gray-500"
            >
              Clear Filters
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-full sm:w-[20%]">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
              >
                <option value="All">Severity: All</option>
                <option value="Low">Severity: Low</option>
                <option value="Medium">Severity: Medium</option>
                <option value="High">Severity: High</option>
                <option value="Critical">Severity: Critical</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-[20%]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange cursor-pointer"
              >
                <option value="All">Status: All</option>
                <option value="Success">Status: Success</option>
                <option value="Failed">Status: Failed</option>
                <option value="Blocked">Status: Blocked</option>
              </select>
              <MaterialIcon icon="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none" />
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              {activeFilters.map(filter => (
                <div
                  key={filter.type}
                  className={`flex items-center gap-1 px-3 py-1 border rounded-full text-xs font-medium ${filter.isRed
                      ? 'bg-red-50 border-red-100 text-red-700'
                      : 'bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                >
                  {filter.label}
                  <button
                    type="button"
                    onClick={() => clearFilter(filter.type)}
                    className="flex items-center justify-center p-0.5 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
                    aria-label="Remove filter"
                  >
                    <MaterialIcon
                      icon="close"
                      className={`text-[14px] cursor-pointer ${filter.isRed ? 'hover:text-red-900' : 'hover:text-gray-900'}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-6 w-full">

        {/* Left Column (Table & Chart) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">

          {/* Audit Log Table Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <GlobalTable className="text-[13px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold tracking-wider text-[11px] uppercase bg-gray-50/50">
                  <th className="px-5 py-4 text-left">TIMESTAMP</th>
                  <th className="px-5 py-4 text-left">USER</th>
                  <th className="px-5 py-4 text-left">ROLE</th>
                  <th className="px-5 py-4 text-left">ACTION</th>
                  <th className="px-5 py-4 text-left">MODULE</th>
                  <th className="px-5 py-4 text-left">TARGET</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-gray-500">
                      <MaterialIcon icon="search_off" className="text-[48px] text-gray-300 mb-3" />
                      <p className="text-[14px] font-medium text-gray-700">No logs found matching your criteria</p>
                      <p className="text-[13px] mt-1">Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 text-gray-600 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500">{formatTimeWithSeconds(row.timestamp)}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-900">{row.user}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500">{row.role}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-900">{row.action}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500">{row.module}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-mono text-[12px] text-gray-600 px-1.5 py-0.5">
                          {row.target}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </GlobalTable>

            {/* Pagination */}
            <div className="border-t border-gray-200 px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[13px] text-gray-500 bg-gray-50/50 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <span>
                  Showing {filteredLogs.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}-
                  {Math.min(currentPage * rowsPerPage, filteredLogs.length)} of {filteredLogs.length.toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="ml-0 sm:ml-4">Rows per page:</span>
                  <div className="relative">
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-transparent pr-5 font-medium text-gray-700 focus:outline-none cursor-pointer"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <MaterialIcon icon="expand_more" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-[16px] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1.5"
                >
                  Prev
                </Button>

                {/* Simplified page numbers rendering for brevity */}
                <Button variant="secondary" className="px-2 sm:px-3 py-1.5 bg-gray-100">
                  {currentPage}
                </Button>
                <span className="px-1 sm:px-2 text-gray-400">/ {totalPages}</span>

                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2 sm:px-3 py-1.5"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">AUDIT ACTIVITY — LAST 24 HOURS</h3>

            <div className="h-48 flex items-end justify-between gap-1 mb-6 border-b border-gray-100 pb-2">
              {chartBars.map((bar, i) => (
                <div key={i} className="w-full flex flex-col justify-end h-full relative group" title={`Events: ${bar.count}`}>
                  <div
                    className={`w-full rounded-t-sm transition-all ${bar.isCritical ? 'bg-red-50' : 'bg-blue-50'}`}
                    style={{ height: bar.height }}
                  >
                    {bar.isCritical && (
                      <div className="w-full h-1 bg-red-500 rounded-t-sm absolute top-0" style={{ top: `calc(100% - ${bar.height})` }}></div>
                    )}
                    {!bar.isCritical && bar.count > 0 && (
                      <div className="w-full h-1 bg-blue-400 rounded-t-sm absolute top-0" style={{ top: `calc(100% - ${bar.height})` }}></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>12:00 PM (Yesterday)</span>
              <span>12:00 AM</span>
              <span>12:00 PM (Today)</span>
            </div>
          </div>

        </div>

        {/* Right Column (Cards) */}
        <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">

          {/* Log Summary */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">TODAY'S ACTIVITY</h3>

            <div className="mb-5">
              <div className="text-[13px] text-gray-500 mb-1">Total Events</div>
              <div className="flex items-baseline gap-3">
                <div className="text-[36px] font-bold text-gray-900 leading-none">{totalEvents.toLocaleString()}</div>
                <div className="flex items-center text-green-600 text-[13px] font-medium">
                  <MaterialIcon icon="trending_up" className="text-[16px] mr-0.5" />
                  +12%
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">FAILED</div>
                <div className="text-[20px] font-bold text-red-600">{failedEvents}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">BLOCKED</div>
                <div className="text-[20px] font-bold text-red-600">{blockedEvents}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">CRITICAL</div>
                <div className="text-[20px] font-bold text-red-600">{criticalEvents}</div>
              </div>
            </div>
          </div>

          {/* Critical Events */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="warning_amber" className="text-red-600 text-[20px]" />
              <h3 className="text-[11px] font-bold text-red-600 uppercase tracking-wider">CRITICAL EVENTS</h3>
            </div>

            <div className="flex flex-col">
              {latestCritical.length === 0 ? (
                <div className="text-sm text-gray-500 italic py-4">No critical events found in current filter.</div>
              ) : (
                latestCritical.map((event, idx) => (
                  <div key={idx} className="relative pl-5 py-3 border-b border-gray-100 last:border-0">
                    <div className="absolute left-0 top-[18px] w-2 h-2 rounded-full bg-red-600"></div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-semibold text-[13px] text-gray-900">{event.action.replace(/_/g, ' ')}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{formatTimeOnly(event.timestamp)}</div>
                    </div>
                    <div className="text-[12px] text-gray-500 leading-relaxed">
                      {event.user} triggered on {event.target}.
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Most Active Users */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="group" className="text-gray-500 text-[20px]" />
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">MOST ACTIVE USERS</h3>
            </div>

            <div className="flex flex-col gap-4">
              {userStats.length === 0 ? (
                <div className="text-sm text-gray-500 italic py-2">No active users in current filter.</div>
              ) : (
                userStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={stat.user} size="md" />
                      <div>
                        <div className="text-[13px] font-semibold text-gray-900">{stat.user}</div>
                        <div className="text-[11px] text-gray-500">{stat.role}</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-500 flex flex-col items-end">
                      <span className="font-semibold text-gray-700 text-[13px]">{stat.count}</span>
                      acts
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
