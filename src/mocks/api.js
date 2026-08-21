import { db, saveData } from './db';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API Service structure
class MockApiService {
  constructor(resourceName) {
    this.resourceName = resourceName;
  }

  async getAll() {
    await delay();
    return [...db[this.resourceName]];
  }

  async getById(id) {
    await delay();
    const item = db[this.resourceName].find(i => i.id === id);
    if (!item) throw new Error(`${this.resourceName} not found`);
    return { ...item };
  }

  async create(data) {
    await delay();
    const newItem = { 
      ...data, 
      id: Date.now() // Mock ID generation 
    };
    db[this.resourceName].push(newItem);
    saveData();
    return { ...newItem };
  }

  async update(id, data) {
    await delay();
    const index = db[this.resourceName].findIndex(i => i.id === id);
    if (index === -1) throw new Error(`${this.resourceName} not found`);
    db[this.resourceName][index] = { ...db[this.resourceName][index], ...data };
    saveData();
    return { ...db[this.resourceName][index] };
  }

  async delete(id) {
    await delay();
    const index = db[this.resourceName].findIndex(i => i.id === id);
    if (index === -1) throw new Error(`${this.resourceName} not found`);
    db[this.resourceName].splice(index, 1);
    saveData();
    return { success: true };
  }
}

export const MembersAPI = new MockApiService('members');
export const RequestsAPI = new MockApiService('requests');
export const IncidentsAPI = new MockApiService('incidents');
export const AuditLogsAPI = new MockApiService('auditLogs');
export const PublicLinksAPI = new MockApiService('publicLinks');
export const RolesAPI = new MockApiService('roles');
export const PermissionsAPI = new MockApiService('permissions');

export default {
  Members: MembersAPI,
  Requests: RequestsAPI,
  Incidents: IncidentsAPI,
  AuditLogs: AuditLogsAPI,
  PublicLinks: PublicLinksAPI,
  Roles: RolesAPI,
  Permissions: PermissionsAPI
};
