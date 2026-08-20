import React from 'react';
import MaterialIcon from '../atoms/MaterialIcon';

export default function EmptyState({ title = 'No data found', description = 'There are no items matching your criteria.', icon = 'inbox' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[250px]">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MaterialIcon icon={icon} className="text-gray-400 text-3xl" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
}
