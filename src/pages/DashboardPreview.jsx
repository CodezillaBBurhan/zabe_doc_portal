import React, { useEffect, useState } from 'react';
import DashboardWidget from '../components/molecules/DashboardWidget';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function DashboardPreview() {
  const [data, setData] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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

  const { linkName, slides, widgets } = data;
  const displaySlides = slides || [{ id: 1, name: 'Slide 1', widgets: widgets || [] }];
  const activeWidgets = displaySlides[activeSlideIndex]?.widgets || [];

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
          {activeWidgets.length === 0 ? (
            <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-gray-400 font-semibold mb-2">Slide is empty</p>
            </div>
          ) : (
            <GridLayout
              key={`slide-${activeSlideIndex}`}
              className="layout"
              layout={activeWidgets.map(w => ({ i: w.id, ...w.grid, static: true }))}
              cols={12}
              rowHeight={140}
              width={1208}
              isResizable={false}
              isDraggable={false}
              margin={[16, 16]}
            >
              {activeWidgets.map(w => (
                <div key={w.id}>
                  <DashboardWidget 
                    title={w.title} 
                    type={w.type} 
                    data={w.data}
                    onRemove={null}
                    onChangeType={null}
                  />
                </div>
              ))}
            </GridLayout>
          )}
        </div>

        {/* Slides Navigation */}
        {displaySlides.length > 1 && (
          <div className="flex justify-center items-center gap-6 mt-8 pb-8">
            <button 
              onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
              disabled={activeSlideIndex === 0}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="flex gap-3">
              {displaySlides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeSlideIndex === i ? 'bg-teal-500 ring-4 ring-teal-500/20' : 'bg-gray-300 hover:bg-gray-400'}`}
                  title={s.name}
                />
              ))}
            </div>
            <button 
              onClick={() => setActiveSlideIndex(Math.min(displaySlides.length - 1, activeSlideIndex + 1))}
              disabled={activeSlideIndex === displaySlides.length - 1}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
