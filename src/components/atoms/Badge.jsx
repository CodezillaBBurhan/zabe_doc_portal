// 📚 See COMPONENTS.md in the project root for usage guidelines and variants.
import React from 'react';

export default function Badge({ status, text, className = '' }) {
  const variants = {
    Active: 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]',
    Success: 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]',
    Inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    Error: 'bg-[#fef3f2] text-[#b42318] border-[#fecdca]',
    Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Info: 'bg-[#eff4ff] text-[#005fb0] border-[#d1e0ff]',
    Default: 'bg-gray-100 text-gray-700 border-gray-200',
    Critical: 'bg-red-100 text-red-700 border-red-200',
    High: 'bg-orange-100 text-orange-700 border-orange-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
    Audited: 'bg-blue-100 text-blue-800 border-blue-200',
    Archived: 'bg-gray-100 text-gray-600 border-gray-200',
    Expiring: 'bg-[#fef7e0] text-[#f29900] border-yellow-200',
    Revoked: 'bg-[#fce8e6] text-[#d93025] border-red-200'
  };

  const currentStatus = variants[status] || variants.Default;
  const displayLabel = text || status;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${currentStatus} ${className}`}>
      {displayLabel}
    </span>
  );
}
