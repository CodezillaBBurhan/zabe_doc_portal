import React from 'react';

export default function GlobalTable({ 
  children, 
  minWidth = '100%', 
  maxHeight = '500px',
  tableLayout = 'auto',
  className = '',
  wrapperClassName = ''
}) {
  return (
    <div 
      className={`w-full overflow-auto custom-scrollbar relative ${wrapperClassName}`} 
      style={{ maxHeight }}
    >
      <table 
        className={`w-full text-left global-table-container ${className}`} 
        style={{ minWidth, borderCollapse: 'collapse', tableLayout }}
      >
        {children}
      </table>
    </div>
  );
}
