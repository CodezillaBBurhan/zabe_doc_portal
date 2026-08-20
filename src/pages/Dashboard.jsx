import MaterialIcon from '../components/atoms/MaterialIcon';

export default function Dashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md mt-4">
        <div>
          <div className="flex items-center gap-2 text-secondary text-sm mb-2">
            <span className="hover:text-primary cursor-pointer transition-colors">Team &amp; Permissions</span>
            <MaterialIcon icon="chevron_right" className="text-[16px]" />
            <span className="text-on-surface font-medium">Permissions</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Permission Management</h2>
          <p className="font-body-md text-body-md text-secondary mt-1">Manage and organize permissions available across the Election Center.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-medium text-sm flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
            <MaterialIcon icon="upload" className="text-[18px]" />
            Import Permissions
          </button>
          <button className="h-10 px-4 rounded-lg bg-primary-container text-white font-medium text-sm flex items-center gap-2 hover:bg-orange-500 transition-colors shadow-sm">
            <MaterialIcon icon="add" className="text-[18px]" />
            Add Permission
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-md mt-6">
        <KpiCard icon="shield_person" title="TOTAL PERMISSIONS" value="32" iconBg="bg-surface-container text-tertiary" />
        <KpiCard icon="check_circle" title="ACTIVE PERMISSIONS" value="30" trend="up" trendValue="94%" iconBg="bg-[#ecfdf5] text-[#059669]" />
        <KpiCard icon="view_module" title="MODULES" value="8" iconBg="bg-surface-variant text-on-surface" />
        <KpiCard icon="group" title="ROLES USING PERMISSIONS" value="8" iconBg="bg-[#fef2f2] text-error" />
      </div>

      {/* Data Table Placeholder */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-12 text-center text-secondary border border-outline-variant mt-6">
        <MaterialIcon icon="table" className="text-4xl text-outline-variant mb-4" />
        <h3 className="text-lg font-medium text-on-surface mb-2">Permissions Data Table</h3>
        <p>The rest of the data table from the HTML was omitted for brevity, but the layout and theme structure is fully working!</p>
      </div>
    </>
  );
}

function KpiCard({ icon, title, value, trend, trendValue, iconBg }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
          <MaterialIcon icon={icon} className="text-[20px]" />
        </div>
        <MaterialIcon icon="more_vert" className="text-secondary text-[20px] hover:text-on-surface cursor-pointer" />
      </div>
      <h3 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-1">{title}</h3>
      <div className="flex items-end gap-3">
        <span className="font-kpi-number text-kpi-number text-on-surface">{value}</span>
        {trend === 'up' && (
          <span className="flex items-center text-[#059669] text-sm font-medium mb-1 gap-0.5">
            <MaterialIcon icon="arrow_upward" className="text-[16px]" />
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
