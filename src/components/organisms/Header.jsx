import MaterialIcon from '../atoms/MaterialIcon';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-[64px] bg-surface-container-lowest dark:bg-inverse-surface flex justify-between items-center px-4 md:px-[24px] fixed top-0 right-0 w-full lg:w-[calc(100%-230px)] z-30 shadow-sm lg:shadow-none">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1.5 text-secondary hover:text-primary rounded-md transition-colors"
        >
          <MaterialIcon icon="menu" className="text-[24px]" />
        </button>
        
        <div className="relative hidden sm:block">
          <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm" />
          <input 
            type="text"
            className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-[13px] w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-brand-orange bg-white placeholder-gray-400 shadow-sm transition-all" 
            placeholder="Search commands, reports..." 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-6 h-full">
        <nav className="hidden md:flex h-full">
          <a href="#" className="h-full flex items-center px-4 font-body-md text-body-md text-secondary hover:text-primary transition-colors border-b-2 border-transparent">Reports</a>
          <a href="#" className="h-full flex items-center px-4 font-body-md text-body-md text-secondary hover:text-primary transition-colors border-b-2 border-transparent">Logs</a>
        </nav>
        
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-6 border-l sm:border-l-0 border-gray-200 h-8 sm:h-auto">
          <button className="flex items-center gap-1.5 text-error font-label-md text-[10px] sm:text-label-md">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-error animate-pulse"></span>
            <span className="hidden xs:inline">LIVE STATUS</span>
            <span className="xs:hidden">LIVE</span>
          </button>
          
          <button className="text-secondary hover:text-on-surface ml-1 sm:ml-2 relative p-1 rounded-md">
            <MaterialIcon icon="notifications" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#FF8C42] rounded-full border border-white"></span>
          </button>
          
          <button className="text-secondary hover:text-on-surface ml-0.5 sm:ml-2 p-1 rounded-md">
            <MaterialIcon icon="account_circle" className="text-[24px] sm:text-[28px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
