import MaterialIcon from '../components/atoms/MaterialIcon';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Col (Geographic Distribution) */}
        <div className="flex-[2] bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] font-bold text-gray-900">Geographic Distribution</h3>
            <div className="flex bg-gray-50 rounded-md border border-gray-200 p-0.5">
              <button className="px-3 py-1.5 bg-white text-gray-900 text-[12px] font-semibold rounded shadow-sm border border-gray-200/50">Turnout %</button>
              <button className="px-3 py-1.5 text-gray-500 text-[12px] font-medium hover:text-gray-700">Total Votes</button>
            </div>
          </div>
          
          <div className="flex-1 border-[1.5px] border-dashed border-gray-200 bg-[#fdfdfd] rounded-lg flex flex-col items-center justify-center text-center">
            <MaterialIcon icon="map" className="text-[40px] text-[#8c7a72] mb-3 opacity-80" />
            <h4 className="text-[15px] font-medium text-gray-600 mb-1">Interactive Map View: Nigeria Region-Based Turnout</h4>
            <p className="text-[12px] text-gray-400 font-medium">Live Data Overlay</p>
          </div>
        </div>

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
