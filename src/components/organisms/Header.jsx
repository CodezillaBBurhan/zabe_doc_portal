import MaterialIcon from '../atoms/MaterialIcon';

export default function Header() {
  return (
    <header className="h-[64px] bg-surface-container-lowest dark:bg-inverse-surface flex justify-between items-center px-[24px] fixed top-0 right-0 w-[calc(100%-230px)] z-40">
      <div className="flex items-center gap-4">
        <div className="relative">
          <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm" />
          <input 
            type="text"
            className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-[13px] w-72 focus:outline-none focus:ring-1 focus:ring-brand-orange bg-white placeholder-gray-400 shadow-sm" 
            placeholder="Search commands, reports..." 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 h-full">
        <nav className="flex h-full">
          <a href="#" className="h-full flex items-center px-4 font-body-md text-body-md text-secondary hover:text-primary transition-colors border-b-2 border-transparent">Reports</a>
          <a href="#" className="h-full flex items-center px-4 font-body-md text-body-md text-secondary hover:text-primary transition-colors border-b-2 border-transparent">Logs</a>
        </nav>
        
        <div className="flex items-center gap-3 pl-6">
          <button className="flex items-center gap-1.5 text-error font-label-md text-label-md">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            LIVE STATUS
          </button>
          
          <button className="text-secondary hover:text-on-surface ml-2 relative">
            <MaterialIcon icon="notifications" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF8C42] rounded-full border border-white"></span>
          </button>
          
          <button className="text-secondary hover:text-on-surface ml-2">
            <MaterialIcon icon="account_circle" />
          </button>
        </div>
      </div>
    </header>
  );
}
