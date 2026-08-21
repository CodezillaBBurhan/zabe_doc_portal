import React, { useEffect, useState } from 'react';
import DashboardWidget from '../components/molecules/DashboardWidget';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function DashboardPreview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dashboard_preview');
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-500">
        No preview data found.
      </div>
    );
  }

  const { linkName, widgets } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[1240px] px-4 py-8 flex flex-col h-full flex-1">
        
        {/* Header Row */}
        <div className="flex justify-between items-start gap-4 mb-6">
          {/* Title & Progress */}
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-gray-800 tracking-tight flex items-center gap-2">
              2027 Presidential Election <span className="text-gray-400 font-normal">— Live Collation</span>
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">October 26, 2027 | 22:14:30 WAT</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-3 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[86%]"></div>
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div className="flex gap-2">
            {[1, 2, 3].map((c) => (
              <div key={c} className="bg-white rounded-lg p-3 border border-gray-100 flex items-center gap-3 min-w-[120px] shadow-sm">
                <div className={`w-6 h-6 rounded-full ${c === 1 ? 'bg-blue-100' : 'bg-green-100'} border border-gray-200`}></div>
                <div>
                  <div className="text-[9px] text-gray-400 font-bold uppercase leading-tight">Candidate {c}</div>
                  <div className="text-[14px] font-bold text-gray-700 leading-tight">19,228{c}</div>
                </div>
              </div>
            ))}
            <div className="bg-teal-500 text-white rounded-lg p-3 flex items-center justify-center min-w-[100px] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wide">Leading</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 ml-4">
            <div className="w-8 h-8 bg-white border border-gray-200 shadow-sm rounded flex items-center justify-center"><span className="block w-4 h-4 border-[3px] border-gray-400 rounded-full border-t-transparent"></span></div>
            <div className="px-3 py-1.5 bg-red-100 text-red-500 rounded text-[10px] font-bold border border-red-200 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> LIVE
            </div>
          </div>
        </div>

        {/* Dynamic Grid Area */}
        <div className="flex-1 mt-4">
          {widgets.length === 0 ? (
            <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-gray-400 font-semibold mb-2">Dashboard is empty</p>
            </div>
          ) : (
            <GridLayout
              className="layout"
              layout={widgets.map(w => ({ i: w.id, ...w.grid, static: true }))}
              cols={12}
              rowHeight={140}
              width={1208}
              isResizable={false}
              isDraggable={false}
              margin={[16, 16]}
            >
              {widgets.map(w => (
                <div key={w.id}>
                  <DashboardWidget 
                    title={w.title} 
                    type={w.type} 
                    data={w.data}
                    // Pass empty functions to hide the edit/delete buttons if you want, 
                    // or just let them be there for 'preview' feel. We'll leave them inactive.
                    onRemove={null}
                    onChangeType={null}
                  />
                </div>
              ))}
            </GridLayout>
          )}
        </div>
      </div>
    </div>
  );
}
