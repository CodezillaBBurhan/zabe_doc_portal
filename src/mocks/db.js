// src/mocks/db.js
// Centralized mock data store for the application

export const db = {
  members: [
    { id: 1, name: 'Adamu Abubakar', role: 'State Supervisor', email: 'adamu@zabe.app', designation: 'Senior Supervisor', status: 'Active', addedOn: '2023-01-15', viewTo: 'Kano State', publicLink: 'zabe.app/kano-state' },
    { id: 2, name: 'Ngozi Eze', role: 'Ward Collation Officer', email: 'ngozi@zabe.app', designation: 'Collation Officer', status: 'Inactive', addedOn: '2023-01-20', viewTo: 'Lagos Central', publicLink: 'zabe.app/lagos-central' },
    { id: 3, name: 'Chukwudi Okafor', role: 'Field Agent', email: 'chukwudi@zabe.app', designation: 'Field Agent I', status: 'Active', addedOn: '2023-02-05', viewTo: 'Rivers LGA', publicLink: '' },
    { id: 4, name: 'Aisha Bello', role: 'Data Analyst', email: 'aisha@zabe.app', designation: 'Data Specialist', status: 'Active', addedOn: '2023-03-10', viewTo: 'National', publicLink: 'zabe.app/national' },
    { id: 5, name: 'Oluwaseun Adebayo', role: 'LGA Coordinator', email: 'oluwaseun@zabe.app', designation: 'Coordinator', status: 'Pending', addedOn: '2023-04-12', viewTo: 'Oyo State', publicLink: '' },
    { id: 6, name: 'Zainab Usman', role: 'Field Agent', email: 'zainab@zabe.app', designation: 'Field Agent II', status: 'Active', addedOn: '2023-05-22', viewTo: 'FCT Abuja', publicLink: 'zabe.app/abuja' },
  ],
  requests: [
    { id: 'REQ-101', type: 'Result Submission', submitter: 'Adamu Abubakar', date: '2023-06-01T10:30:00Z', status: 'Pending', priority: 'High', location: 'Kano - Ward 1' },
    { id: 'REQ-102', type: 'Incident Report', submitter: 'Chukwudi Okafor', date: '2023-06-01T11:45:00Z', status: 'Approved', priority: 'Critical', location: 'Rivers - LGA 4' },
    { id: 'REQ-103', type: 'Equipment Request', submitter: 'Oluwaseun Adebayo', date: '2023-06-02T09:15:00Z', status: 'Rejected', priority: 'Low', location: 'Oyo - Ward 12' },
    { id: 'REQ-104', type: 'General Query', submitter: 'Aisha Bello', date: '2023-06-02T14:20:00Z', status: 'Pending', priority: 'Medium', location: 'FCT Abuja' },
  ],
  incidents: [
    { id: 'INC-201', title: 'Ballot Box Snatching', category: 'Security', location: 'Lagos - Polling Unit 004', reportedBy: 'Ngozi Eze', time: '2023-06-01T08:15:00Z', status: 'Investigating', severity: 'High' },
    { id: 'INC-202', title: 'BVAS Malfunction', category: 'Technical', location: 'Kano - Polling Unit 012', reportedBy: 'Adamu Abubakar', time: '2023-06-01T09:30:00Z', status: 'Resolved', severity: 'Medium' },
    { id: 'INC-203', title: 'Late Arrival of Materials', category: 'Logistics', location: 'Kaduna - Polling Unit 002', reportedBy: 'Zainab Usman', time: '2023-06-01T07:45:00Z', status: 'Open', severity: 'Low' },
  ],
  auditLogs: [
    { id: 1, action: 'Data_Sync', user: 'System_Service', role: 'Automation', module: 'Voter_DB', target: 'tbl_precinct', timestamp: '2023-06-01T10:42:15Z' },
    { id: 2, action: 'Override_Config', user: 'A. Mitchell', role: 'Lead Ops', module: 'Core_Routing', target: 'node_alpha_config', timestamp: '2023-06-01T10:38:02Z' },
    { id: 3, action: 'Export_Report', user: 'J. Harrison', role: 'Analyst', module: 'Reports', target: 'turnout_Q3_config', timestamp: '2023-06-01T10:15:44Z' },
    { id: 4, action: 'Modify_Perms', user: 'S. Vance', role: 'Admin', module: 'Auth_Control', target: 'usr_grp_field', timestamp: '2023-06-01T09:55:10Z' },
    { id: 5, action: 'Health_Check', user: 'System_Service', role: 'Automation', module: 'Infrastructure', target: 'cluster_node', timestamp: '2023-06-01T09:12:05Z' },
  ],
  publicLinks: [
    { id: 'LNK-001', name: 'Lagos Election Results 2023', url: 'https://zabe.app/p/lagos-2023', createdBy: 'Admin', views: 1250, status: 'Active', createdOn: '2023-05-01' },
    { id: 'LNK-002', name: 'National Turnout Live', url: 'https://zabe.app/p/nat-turnout', createdBy: 'Aisha Bello', views: 8400, status: 'Active', createdOn: '2023-05-15' },
    { id: 'LNK-003', name: 'Kano Incident Heatmap', url: 'https://zabe.app/p/kano-incidents', createdBy: 'Admin', views: 320, status: 'Inactive', createdOn: '2023-05-20' },
  ],
  roles: [
    { id: 1, name: 'Admin', description: 'Full system access', membersCount: 3, status: 'Active', permissions: ['overview', 'incident', 'map', 'tv', 'team'] },
    { id: 2, name: 'State Supervisor', description: 'Regional management and approval', membersCount: 12, status: 'Active', permissions: ['overview', 'incident', 'map'] },
    { id: 3, name: 'Data Analyst', description: 'Read-only access to analytics', membersCount: 8, status: 'Active', permissions: ['overview', 'map'] },
    { id: 4, name: 'Field Agent', description: 'Incident reporting only', membersCount: 150, status: 'Active', permissions: ['incident'] },
  ],
  permissions: [
    { id: 'perm_1', key: 'overview', title: 'Overview Dashboard', module: 'Analytics', desc: 'View real-time high-level metrics.', status: 'Active' },
    { id: 'perm_2', key: 'incident', title: 'Incident Management', module: 'Operations', desc: 'Report, escalate, and resolve active field incidents.', status: 'Active' },
    { id: 'perm_3', key: 'map', title: 'Ward/LGA Map Data', module: 'Geospatial', desc: 'Access geospatial polling unit data and regional stats.', status: 'Active' },
    { id: 'perm_4', key: 'tv', title: 'TV Broadcast Control', module: 'Media', desc: 'Manage live feeds and lower-third graphic overlays.', status: 'Active' },
    { id: 'perm_5', key: 'team', title: 'Team Settings', module: 'Administration', desc: 'Modify global access roles and invite new members.', status: 'Active' }
  ]
};

// Helper function to persist data to localStorage
export const loadData = () => {
  const stored = localStorage.getItem('zabe_mock_db_v3');
  if (stored) {
    try {
      Object.assign(db, JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse mock DB from localStorage');
    }
  } else {
    saveData(); // Initial save
  }
};

export const saveData = () => {
  localStorage.setItem('zabe_mock_db_v3', JSON.stringify(db));
};

// Initialize on load
loadData();
