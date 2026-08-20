export default function AuthLayout({ sidebarContent, mainContent }) {
  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      {/* Left Sidebar */}
      <div className="relative hidden lg:flex w-[50%] bg-[#080d1e] overflow-hidden">
        
        {/* Abstract map lines */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Constellation web of lines matching Nigeria structure loosely */}
            <path d="M 25 21 L 55 10 L 72 32 L 65 42 L 45 52 L 25 21 Z" fill="none" stroke="#60a5fa" strokeWidth="0.15" />
            <path d="M 25 21 L 35 42 L 45 52" fill="none" stroke="#60a5fa" strokeWidth="0.15" />
            <path d="M 55 10 L 85 20" fill="none" stroke="#60a5fa" strokeWidth="0.1" />
            <path d="M 65 42 L 85 55" fill="none" stroke="#60a5fa" strokeWidth="0.1" />
            <path d="M 35 42 L 15 50 L 5 70" fill="none" stroke="#60a5fa" strokeWidth="0.1" />
            <path d="M 45 52 L 30 75 L 50 85" fill="none" stroke="#60a5fa" strokeWidth="0.1" />
            
            {/* Background nodes */}
            <circle cx="55" cy="10" r="0.4" fill="#60a5fa" />
            <circle cx="85" cy="20" r="0.3" fill="#60a5fa" />
            <circle cx="85" cy="55" r="0.3" fill="#60a5fa" />
            <circle cx="15" cy="50" r="0.3" fill="#60a5fa" />
            <circle cx="5" cy="70" r="0.3" fill="#60a5fa" />
            <circle cx="30" cy="75" r="0.3" fill="#60a5fa" />
            <circle cx="50" cy="85" r="0.3" fill="#60a5fa" />
            <circle cx="75" cy="48" r="0.6" fill="#93c5fd" opacity="0.6" />
          </svg>
        </div>

        {/* Highlighted Map Nodes (Cities) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle large glow blobs */}
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-[#ff5a1f]/5 rounded-full blur-[80px]"></div>
          
          {/* Sokoto */}
          <div className="absolute top-[21%] left-[25%] flex items-center">
             <div className="w-[5px] h-[5px] bg-[#93c5fd] rounded-full shadow-[0_0_8px_#93c5fd]"></div>
             <span className="ml-2.5 text-[#64748b] text-[11px] font-bold tracking-wide">Sokoto</span>
          </div>
          {/* Kano */}
          <div className="absolute top-[32%] right-[28%] flex items-center">
             <div className="w-[5px] h-[5px] bg-[#93c5fd] rounded-full shadow-[0_0_8px_#93c5fd]"></div>
             <span className="ml-2.5 text-[#64748b] text-[11px] font-bold tracking-wide">Kano</span>
          </div>
          {/* Kaduna */}
          <div className="absolute top-[42%] left-[35%] flex items-center">
             <div className="w-[5px] h-[5px] bg-[#93c5fd] rounded-full shadow-[0_0_8px_#93c5fd]"></div>
             <span className="ml-2.5 text-[#64748b] text-[11px] font-bold tracking-wide">Kaduna</span>
          </div>
          {/* Abuja */}
          <div className="absolute top-[52%] left-[45%] flex items-center">
             <div className="w-[7px] h-[7px] bg-[#ff5a1f] rounded-full shadow-[0_0_12px_#ff5a1f]"></div>
             <span className="ml-2.5 text-[#cbd5e1] text-[11px] font-bold tracking-wide">Abuja</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full z-10 flex">
          {sidebarContent}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-[#f8fafc]">
        {mainContent}
      </div>
    </div>
  );
}
