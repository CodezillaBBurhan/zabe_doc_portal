import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import MaterialIcon from '../components/atoms/MaterialIcon';

const REGIONAL_DATA = [
  { state: "Kano", registered: 5921370, accredited: 3951201, valid: 3890122, turnout: 66.7 },
  { state: "Lagos", registered: 7060195, accredited: 4102931, valid: 4010212, turnout: 58.1 },
  { state: "Kaduna", registered: 4335208, accredited: 2450123, valid: 2400192, turnout: 55.4 },
  { state: "Katsina", registered: 3516719, accredited: 1920310, valid: 1890111, turnout: 54.6 },
  { state: "Rivers", registered: 3537190, accredited: 1819301, valid: 1780444, turnout: 51.4 },
  { state: "Oyo", registered: 3270100, accredited: 1610992, valid: 1580231, turnout: 49.3 },
  { state: "Delta", registered: 3221697, accredited: 1502123, valid: 1480199, turnout: 46.6 },
  { state: "FCT", registered: 1570307, accredited: 820133, valid: 799011, turnout: 52.2 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight mb-1">
            Welcome back, Sarah
          </h2>
          <p className="text-[14px] text-gray-500 font-medium">
            Nigeria Election 2027 <span className="mx-2 text-gray-300">|</span> Real-time national election metrics.
          </p>
        </div>
        <div>
          <button className="h-10 px-4 rounded-md border border-gray-200 bg-white text-gray-600 font-medium text-[13px] flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <MaterialIcon icon="refresh" className="text-[18px]" />
            Last updated: Just now
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        <KpiCard 
          icon="group" 
          iconBg="bg-blue-50 text-blue-600" 
          title="REGISTERED VOTERS" 
          value="93,469,008" 
          footerText="Verified Registry"
          footerIcon="check_circle"
          footerIconColor="text-gray-400"
        />
        <KpiCard 
          icon="how_to_reg" 
          iconBg="bg-indigo-50 text-indigo-600" 
          title="ACCREDITED VOTERS" 
          value="54,120,433" 
          trend="up"
          trendValue="+1.2%"
          footerText="vs last hour"
        />
        <KpiCard 
          icon="fact_check" 
          iconBg="bg-emerald-50 text-emerald-600" 
          title="VALID VOTES" 
          value="52,980,101" 
          footerText="Processed Data"
          footerIcon="filter_alt"
          footerIconColor="text-gray-400"
        />
        <KpiCard 
          icon="pie_chart" 
          iconBg="bg-[#fff0eb] text-[#ff5a1f]" 
          title="NATIONAL TURNOUT" 
          value="58.4%" 
          trend="up"
          trendValue="+3.1%"
          footerText="projected final"
          borderLeft="border-l-4 border-l-[#ff5a1f]"
        />
      </div>

      {/* Middle Section */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Col (Geographic Distribution) */}
        <GeographicDistribution />

        {/* Right Col */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Live Vote Counts */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
            <h3 className="text-[16px] font-bold text-gray-900 mb-6">Live Vote Counts</h3>
            
            <div className="space-y-6">
              <VoteProgress candidate="Candidate A" votes="22,100,432 (41.7%)" percentage={41.7} color="bg-[#1e40af]" />
              <VoteProgress candidate="Candidate B" votes="19,845,110 (37.4%)" percentage={37.4} color="bg-[#ff5a1f]" />
              <VoteProgress candidate="Candidate C" votes="8,400,201 (15.8%)" percentage={15.8} color="bg-[#10b981]" />
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-[16px] font-bold text-gray-900">Live Activity</h3>
               <div className="w-2 h-2 rounded-full bg-[#a16207]"></div>
            </div>
            
            <div className="space-y-7">
              <ActivityItem 
                icon="sync" 
                iconBg="bg-blue-50 text-blue-500" 
                title="Data sync completed: Lagos State" 
                time="2 mins ago" 
              />
              <ActivityItem 
                icon="warning" 
                iconBg="bg-orange-50 text-orange-500" 
                title="Incident Report: BVAS delay in Ward 4, Kano" 
                time="15 mins ago" 
              />
              <ActivityItem 
                icon="check" 
                iconBg="bg-emerald-50 text-emerald-500" 
                title="Accreditation target reached: FCT" 
                time="42 mins ago" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon, title, value, trend, trendValue, footerText, footerIcon, footerIconColor, iconBg, borderLeft = '' }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between h-[145px] ${borderLeft}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-9 h-9 rounded-md flex items-center justify-center ${iconBg}`}>
          <MaterialIcon icon={icon} className="text-[18px]" />
        </div>
        <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase leading-tight max-w-[100px]">{title}</h3>
      </div>
      
      <div>
        <div className="text-[28px] font-bold text-gray-900 mb-2.5 tracking-tight leading-none">{value}</div>
        
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400">
          {trend === 'up' && (
            <span className="flex items-center text-[#10b981] gap-0.5 font-bold">
              <MaterialIcon icon="trending_up" className="text-[14px]" />
              {trendValue}
            </span>
          )}
          {footerIcon && (
            <MaterialIcon icon={footerIcon} className={`text-[14px] ${footerIconColor}`} />
          )}
          <span>{footerText}</span>
        </div>
      </div>
    </div>
  );
}

function VoteProgress({ candidate, votes, percentage, color }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-[13px] font-bold text-gray-900">{candidate}</span>
        <span className="text-[12px] font-medium text-gray-500">{votes}</span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, iconBg, title, time }) {
  return (
    <div className="flex gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        <MaterialIcon icon={icon} className="text-[16px]" />
      </div>
      <div>
        <p className="text-[13px] font-medium text-gray-900 leading-snug mb-0.5">{title}</p>
        <p className="text-[11px] font-medium text-gray-400">{time}</p>
      </div>
    </div>
  );
}

function GeographicDistribution() {
  const [viewType, setViewType] = useState('turnout');
  const [hoveredState, setHoveredState] = useState(null);

  const sortedData = [...REGIONAL_DATA].sort((a, b) => 
    viewType === 'turnout' ? b.turnout - a.turnout : b.valid - a.valid
  );
  
  const maxVal = viewType === 'turnout' ? 100 : Math.max(...REGIONAL_DATA.map(d => d.valid));

  return (
    <div className="flex-[2] bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex flex-col min-h-[500px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-[18px] font-bold text-gray-900">Geographic Distribution</h3>
        <div className="flex bg-gray-50 rounded-md border border-gray-200 p-0.5 w-full sm:w-auto shrink-0">
          <button 
            onClick={() => setViewType('turnout')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-[12px] font-semibold rounded shadow-sm transition-colors ${viewType === 'turnout' ? 'bg-white text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Turnout %
          </button>
          <button 
            onClick={() => setViewType('total')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-[12px] font-semibold rounded shadow-sm transition-colors ${viewType === 'total' ? 'bg-white text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Total Votes
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-8 mt-2">
        {/* Left Side: Bars */}
        <div className="flex-[2] flex flex-col justify-center h-full min-h-[380px] -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={sortedData} 
              layout="vertical" 
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis 
                type="number" 
                domain={[0, viewType === 'turnout' ? 100 : 'dataMax + 200000']} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
                tickFormatter={(value) => viewType === 'turnout' ? `${value}%` : (value / 1000000).toFixed(1) + 'M'}
              />
              <YAxis 
                type="category" 
                dataKey="state" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} 
                width={70} 
              />
              <RechartsTooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-900 text-white rounded-lg p-3 shadow-xl flex flex-col gap-1 min-w-[150px] z-50 relative">
                        <div className="text-[13px] font-bold text-gray-100 border-b border-gray-700 pb-1 mb-1">{data.state} Stats</div>
                        <div className="flex justify-between text-[11px] gap-4"><span className="text-gray-400">Turnout:</span> <span className="font-semibold text-[#10b981]">{data.turnout}%</span></div>
                        <div className="flex justify-between text-[11px] gap-4"><span className="text-gray-400">Total Valid:</span> <span className="font-semibold">{data.valid.toLocaleString()}</span></div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey={viewType === 'turnout' ? 'turnout' : 'valid'} 
                radius={[0, 4, 4, 0]}
                barSize={18}
                onMouseEnter={(data) => setHoveredState(data)}
                onMouseLeave={() => setHoveredState(null)}
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={hoveredState?.state === entry.state ? '#ff5a1f' : '#1e40af'} 
                    style={{ transition: 'fill 0.2s ease' }} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Right Side: Details Panel */}
        <div className="flex-1 bg-[#f8fafc] rounded-xl p-5 border border-gray-100 flex flex-col min-w-[200px]">
          {hoveredState ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center shrink-0">
                  <MaterialIcon icon="location_on" className="text-[20px]" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-gray-900">{hoveredState.state}</h4>
                  <p className="text-[11px] font-medium text-gray-500">Live Election Stats</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Registered Voters</div>
                  <div className="text-[16px] font-bold text-gray-900">{hoveredState.registered.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Accredited Voters</div>
                  <div className="text-[16px] font-bold text-gray-900">{hoveredState.accredited.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Valid Votes</div>
                  <div className="text-[16px] font-bold text-gray-900">{hoveredState.valid.toLocaleString()}</div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Voter Turnout</div>
                  <div className="text-[24px] font-bold text-[#10b981] leading-none">{hoveredState.turnout}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <MaterialIcon icon="touch_app" className="text-[24px] text-gray-500" />
              </div>
              <p className="text-[13px] font-bold text-gray-700 mb-1">Hover for Details</p>
              <p className="text-[11px] font-medium text-gray-500 px-2 leading-relaxed">Move your cursor over a state to see its full election statistics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
