import React, { useState, useEffect, useMemo } from 'react';
import MaterialIcon from '../atoms/MaterialIcon';
import Button from '../atoms/Button';
import DashboardWidget from '../molecules/DashboardWidget';
import { 
  getVoteTrendsData, 
  getTurnoutByRegionData, 
  getWinProbabilityData, 
  getSentimentAnalysisData, 
  getPollingUnitIssuesData 
} from '../../utils/dummyChartData';

const DATA_SOURCES = [
  { id: 'vote_trends', title: 'Vote Trends Over Time', getData: getVoteTrendsData, defaultType: 'line' },
  { id: 'turnout', title: 'Turnout by Region', getData: getTurnoutByRegionData, defaultType: 'bar' },
  { id: 'win_prob', title: 'Win Probability', getData: getWinProbabilityData, defaultType: 'pie' },
  { id: 'sentiment', title: 'Sentiment Analysis', getData: getSentimentAnalysisData, defaultType: 'pie' },
  { id: 'issues', title: 'Polling Unit Issues', getData: getPollingUnitIssuesData, defaultType: 'bar' },
];

const CHART_TYPES = [
  { id: 'bar', label: 'Bar Chart', icon: 'bar_chart' },
  { id: 'line', label: 'Line Chart', icon: 'show_chart' },
  { id: 'pie', label: 'Pie / Donut', icon: 'pie_chart' },
  { id: 'area', label: 'Area Chart', icon: 'area_chart' },
  { id: 'scatter', label: 'Scatter', icon: 'scatter_plot' },
];

export default function AddWidgetModal({ open, onClose, onAddWidget }) {
  const [selectedSource, setSelectedSource] = useState(DATA_SOURCES[0]);
  const [selectedType, setSelectedType] = useState(DATA_SOURCES[0].defaultType);

  // When source changes, optionally reset to default chart type for best fit
  useEffect(() => {
    setSelectedType(selectedSource.defaultType);
  }, [selectedSource]);

  // Generate preview data
  const previewData = useMemo(() => {
    return selectedSource.getData();
  }, [selectedSource]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <MaterialIcon icon="dashboard_customize" className="text-[18px] text-brand-orange" />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Add New Widget</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <MaterialIcon icon="close" className="text-[20px]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row min-h-0">
          
          {/* Left Panel: Configuration */}
          <div className="w-full md:w-[40%] border-r border-gray-200 p-6 flex flex-col gap-6 bg-white overflow-y-auto">
            
            {/* Data Source Picker */}
            <div>
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                1. Select Data Source
              </label>
              <div className="relative">
                <select
                  value={selectedSource.id}
                  onChange={(e) => setSelectedSource(DATA_SOURCES.find(s => s.id === e.target.value))}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-[14px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange shadow-sm cursor-pointer"
                >
                  {DATA_SOURCES.map(source => (
                    <option key={source.id} value={source.id}>{source.title}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                  <MaterialIcon icon="unfold_more" className="text-[18px]" />
                </div>
              </div>
            </div>

            {/* Chart Type Picker */}
            <div>
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                2. Select Chart Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {CHART_TYPES.map(type => {
                  const isActive = selectedType === type.id;
                  return (
                    <div 
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isActive 
                          ? 'border-brand-orange bg-orange-50/50 shadow-sm' 
                          : 'border-gray-100 bg-white hover:border-brand-orange/30 hover:bg-orange-50/10'
                      }`}
                    >
                      <MaterialIcon 
                        icon={type.icon} 
                        className={`text-[24px] ${isActive ? 'text-brand-orange' : 'text-gray-400'}`} 
                      />
                      <span className={`text-[12px] font-semibold ${isActive ? 'text-brand-orange' : 'text-gray-600'}`}>
                        {type.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Panel: Live Preview */}
          <div className="w-full md:w-[60%] p-6 bg-gray-50 flex flex-col min-h-[400px]">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">
              Live Preview
            </label>
            <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200 border-dashed p-4 shadow-sm relative">
              <div className="w-full max-w-[500px]">
                <DashboardWidget 
                  title={selectedSource.title}
                  type={selectedType}
                  data={previewData}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              onAddWidget({
                id: `w-${Date.now()}`,
                type: selectedType,
                title: selectedSource.title,
                dataSourceId: selectedSource.id,
                data: previewData
              });
              onClose();
            }}
          >
            Add Widget to Dashboard
          </Button>
        </div>

      </div>
    </div>
  );
}
