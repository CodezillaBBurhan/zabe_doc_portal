import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import MaterialIcon from '../atoms/MaterialIcon';
import { CHART_COLORS } from '../../utils/dummyChartData';

export default function DashboardWidget({ title, type, data, onRemove, onChangeType }) {
  
  const renderChart = () => {
    if (!data || data.length === 0) return <div className="text-gray-400 text-sm">No data available</div>;
    
    // For scatter, we need x, y, z properties. Since our dummy data isn't perfectly structured for scatter, we'll adapt on the fly or just use a generic format.
    const keys = Object.keys(data[0]).filter(k => k !== 'name' && k !== 'time' && k !== 'fill');
    
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey={data[0].time ? 'time' : 'name'} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              {keys.length > 1 && <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />}
              {keys.map((key, i) => (
                <Line key={key} type="monotone" dataKey={key} stroke={Object.values(CHART_COLORS)[i % 5]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey={data[0].time ? 'time' : 'name'} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              {keys.length > 1 && <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />}
              {keys.map((key, i) => (
                <Area key={key} type="monotone" dataKey={key} fill={Object.values(CHART_COLORS)[i % 5]} stroke={Object.values(CHART_COLORS)[i % 5]} fillOpacity={0.2} strokeWidth={2} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey={data[0].time ? 'time' : 'name'} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              {keys.length > 1 && <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />}
              {keys.map((key, i) => (
                <Bar key={key} dataKey={key} fill={Object.values(CHART_COLORS)[i % 5]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        const isGauge = data.length === 2 && data[1].name === 'Remaining';
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy={isGauge ? "75%" : "50%"}
                startAngle={isGauge ? 180 : 90}
                endAngle={isGauge ? 0 : -270}
                innerRadius={isGauge ? "70%" : "60%"}
                outerRadius={isGauge ? "90%" : "80%"}
                paddingAngle={2}
                dataKey={keys[0] || "value"}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || Object.values(CHART_COLORS)[index % 5]} />
                ))}
              </Pie>
              {/* Tooltip removed to prevent scaling bugs */}
              {isGauge && (
                <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-900">
                  {data[0].value}%
                </text>
              )}
            </PieChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey={data[0].time ? 'time' : 'name'} type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis dataKey={keys[0]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              {/* Tooltip removed */}
              <Scatter name={title} data={data} fill={CHART_COLORS.secondary} />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col p-5 w-full h-full relative group hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MaterialIcon icon="drag_indicator" className="drag-handle text-[18px] text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
          <h3 className="text-[14px] font-bold text-gray-900">{title}</h3>
        </div>
        
        {/* ... Menu (visible on hover) */}
        {(onRemove || onChangeType) && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4">
            <div className="relative group/menu">
              <button className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <MaterialIcon icon="more_horiz" className="text-[20px]" />
              </button>
              
              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20 overflow-hidden flex flex-col">
                {onChangeType && (
                  <button onClick={onChangeType} className="w-full text-left px-4 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <MaterialIcon icon="dashboard_customize" className="text-[16px] text-gray-400" />
                    Change Type
                  </button>
                )}
                {onRemove && (
                  <button onClick={onRemove} className="w-full text-left px-4 py-2 text-[12px] font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100">
                    <MaterialIcon icon="delete" className="text-[16px] text-red-400" />
                    Remove Widget
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        {renderChart()}
      </div>
    </div>
  );
}
