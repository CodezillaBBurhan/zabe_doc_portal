import React from 'react';
import MaterialIcon from '../components/atoms/MaterialIcon';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';

export default function Settings() {
  return (
    <div className="flex flex-col gap-8 w-full pb-10">

      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Configure election operations, security, notifications, integrations, and system policies."
      >
        <div className="flex items-center text-[15px] font-semibold text-gray-600 gap-3">
          <span>8 Configured</span>
          <span className="text-gray-400 font-bold">•</span>
          <span>2 Require Attention</span>
          <span className="text-gray-400 font-bold">•</span>
          <span>3 Integrations Active</span>
        </div>
      </PageHeader>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1: Election Configuration */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-6 flex flex-col hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="how_to_vote" className="text-[#005fb0] text-[18px]" />
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Election Configuration</h2>
          <p className="text-[14px] text-gray-500 mb-6 flex-1">
            Configure active election cycles, regions, and reporting periods.
          </p>
          <div className="text-[13px] text-gray-700 font-medium mb-5">
            2023 General Election — Active
          </div>
          <div className="border-t border-[#e4e7ec] pt-4 mt-auto">
            <Button variant="ghostInfo" iconRight="arrow_forward" className="w-fit">
              Configure
            </Button>
          </div>
        </div>

        {/* Card 2: Security & Access */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-6 flex flex-col hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="security" className="text-[#005fb0] text-[18px]" />
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Security & Access</h2>
          <p className="text-[14px] text-gray-500 mb-6 flex-1">
            Manage authentication policies, MFA, session controls, and administrative security.
          </p>
          <div className="flex items-center text-[13px] font-medium mb-5">
            <div className="flex items-center text-[#12B76A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] mr-2"></span>
              MFA Enabled
            </div>
            <span className="mx-2 text-gray-300 font-bold">•</span>
            <span className="text-[#12B76A]">Session 30 min</span>
          </div>
          <div className="border-t border-[#e4e7ec] pt-4 mt-auto">
            <Button variant="ghostInfo" iconRight="arrow_forward" className="w-fit">
              Configure
            </Button>
          </div>
        </div>

        {/* Card 3: Operational Protocols */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-6 flex flex-col hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="rule" className="text-[#005fb0] text-[18px]" />
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Operational Protocols</h2>
          <p className="text-[14px] text-gray-500 mb-6 flex-1">
            Configure incident thresholds, escalation rules, and response procedures.
          </p>
          <div className="text-[13px] text-gray-700 font-medium mb-5">
            12 Active Rules
          </div>
          <div className="border-t border-[#e4e7ec] pt-4 mt-auto">
            <Button variant="ghostInfo" iconRight="arrow_forward" className="w-fit">
              Configure
            </Button>
          </div>
        </div>

        {/* Card 4: Notifications & Alerts */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-6 flex flex-col hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="campaign" className="text-[#005fb0] text-[18px]" />
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Notifications & Alerts</h2>
          <p className="text-[14px] text-gray-500 mb-6 flex-1">
            Manage critical incident alerts, approval notifications, and communication channels.
          </p>
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center text-[13px] font-medium">
              <div className="flex items-center text-[#12B76A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] mr-2"></span>
                Email Active
              </div>
              <span className="mx-2 text-gray-300 font-bold">•</span>
              <span className="text-[#12B76A]">SMS Active</span>
            </div>
            <div className="flex items-center text-[#f79009] text-[13px] font-medium">
              <MaterialIcon icon="warning_amber" className="text-[16px] mr-1.5" />
              1 Requires Attention
            </div>
          </div>
          <div className="border-t border-[#e4e7ec] pt-4 mt-auto">
            <Button variant="ghostInfo" iconRight="arrow_forward" className="w-fit">
              Configure
            </Button>
          </div>
        </div>

        {/* Card 5: Data & Integrations */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-6 flex flex-col hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="hub" className="text-[#005fb0] text-[18px]" />
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Data & Integrations</h2>
          <p className="text-[14px] text-gray-500 mb-6 flex-1">
            Manage election data sources, APIs, webhooks, and external systems.
          </p>
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center text-[13px] font-medium text-[#12B76A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] mr-2"></span>
              3 Connected
            </div>
            <div className="flex items-center text-[#f79009] text-[13px] font-medium">
              <MaterialIcon icon="warning_amber" className="text-[16px] mr-1.5" />
              1 Requires Attention
            </div>
          </div>
          <div className="border-t border-[#e4e7ec] pt-4 mt-auto">
            <Button variant="ghostInfo" iconRight="arrow_forward" className="w-fit">
              Configure
            </Button>
          </div>
        </div>

        {/* Card 6: Audit & Compliance */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-6 flex flex-col hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
            <MaterialIcon icon="history" className="text-[#005fb0] text-[18px]" />
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Audit & Compliance</h2>
          <p className="text-[14px] text-gray-500 mb-6 flex-1">
            Configure audit logging, retention policies, and compliance controls.
          </p>
          <div className="flex items-center text-[13px] font-medium mb-5">
            <div className="flex items-center text-[#12B76A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] mr-2"></span>
              Logging Enabled
            </div>
            <span className="mx-2 text-gray-300 font-bold">•</span>
            <span className="text-[#12B76A]">365-day Retention</span>
          </div>
          <div className="border-t border-[#e4e7ec] pt-4 mt-auto">
            <Button variant="ghostInfo" iconRight="arrow_forward" className="w-fit">
              Configure
            </Button>
          </div>
        </div>

      </div>

      {/* Bottom Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Public Information */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-5 flex items-center hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mr-4 shrink-0">
            <MaterialIcon icon="public" className="text-[#005fb0] text-[18px]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-gray-900">Public Information</h3>
            <p className="text-[13px] text-gray-700 mt-1 font-medium">142 Active Public Links</p>
          </div>
          <Button variant="ghostInfo" iconRight="arrow_forward" className="shrink-0">
            Manage
          </Button>
        </div>

        {/* Team & Permissions */}
        <div className="bg-white border border-[#e4e7ec] rounded-lg p-5 flex items-center hover:shadow-sm transition-shadow">
          <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center mr-4 shrink-0">
            <MaterialIcon icon="group" className="text-[#005fb0] text-[18px]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-gray-900">Principals</h3>
            <p className="text-[13px] text-gray-700 mt-1 font-medium">126 Users • 18 Roles</p>
          </div>
          <Button variant="ghostInfo" iconRight="arrow_forward" className="shrink-0">
            Manage
          </Button>
        </div>

      </div>

    </div>
  );
}
