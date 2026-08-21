// 📚 See COMPONENTS.md in the project root for usage guidelines and variants.
import React from 'react';

export default function PageHeader({ title, description, children, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 w-full ${className}`}>
      <div>
        <h1 className="text-headline-md font-bold text-on-surface leading-tight mb-1 sm:mb-2">{title}</h1>
        {description && (
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
}
