import { CheckCircle2, UserCog, Clock } from 'lucide-react';
import FeatureItem from '../molecules/FeatureItem';
import { TopLeftLogo, SidebarShieldLogo } from '../atoms/Logo';

export default function SidebarInfo() {
  return (
    <div className="relative flex flex-col justify-between h-full w-full p-10 lg:p-12 text-white">
      {/* Top Header */}
      {/* <div className="flex items-center space-x-3 z-10">
        <TopLeftLogo />
        <div className="flex items-center text-[13px]">
          <span className="font-bold tracking-wide">Secure Login</span>
          <span className="text-[#334155] mx-3">|</span>
          <span className="text-[#64748b] font-medium tracking-wide">Refined Operational State</span>
        </div>
      </div> */}

      {/* Center Content */}
      <div className="z-10 flex flex-col justify-center mt-auto mb-auto w-full max-w-[460px]">
        {/* Shield logo */}
        <div className="mb-6">
          <SidebarShieldLogo />
        </div>

        <h1 className="text-[46px] font-bold leading-[1.05] tracking-tight mb-5">
          Digital Operations<br />Center (DOC)
        </h1>

        <p className="text-[11px] font-bold text-[#94a3b8] tracking-[0.16em] leading-[1.8] mb-6">
          REAL-TIME INTELLIGENCE. SECURE<br />
          OPERATIONS.<br />
          ELECTION INTEGRITY.
        </p>

        <div className="w-10 h-[3px] bg-[#ff5a1f] mb-12 rounded-full"></div>

        {/* Feature grid */}
        <div className="bg-[#0b1329]/80 backdrop-blur-md border border-[#1e293b]/80 rounded-[20px] p-6 px-4 flex justify-between w-full shadow-2xl">
          <FeatureItem
            icon={CheckCircle2}
            title="Secure Access"
            description="Enterprise-grade protection"
          />
          <FeatureItem
            icon={UserCog}
            title={<>Authorized Personnel<br />Only</>}
            description="Restricted command center access"
          />
          <FeatureItem
            icon={Clock}
            title="Real-Time Operations"
            description="Live data. Informed decisions."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="z-10 mt-auto text-[11px] text-[#64748b] font-semibold tracking-wide">
        © 2027 Digital Operations Center (DOC). All rights reserved.
      </div>
    </div>
  );
}
