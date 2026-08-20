export const CatIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 22C6.477 22 2 17.523 2 12V4l5 2 5-2 5 2 5-2v8c0 5.523-4.477 10-10 10zm-2.5-7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

export function TopLeftLogo() {
  return (
    <div className="w-6 h-6 bg-brand-orange rounded-[4px] flex items-center justify-center shadow-md">
      <CatIcon className="w-3.5 h-3.5 text-white" />
    </div>
  );
}

export function SidebarShieldLogo() {
  return (
    <div className="w-[72px] h-[90px] bg-gradient-to-br from-[#2f4a86] via-[#1a2b5a] to-[#0a183d] rounded-b-[2.2rem] rounded-t-sm flex items-center justify-center relative shadow-2xl">
       <div className="absolute inset-0 border-[1.5px] border-white/5 rounded-b-[2.2rem] rounded-t-sm pointer-events-none"></div>
       <CatIcon className="w-10 h-10 text-brand-orange drop-shadow-[0_0_8px_rgba(255,90,31,0.5)] z-10" />
    </div>
  );
}

export function FormLogo() {
  return (
    <div className="w-[52px] h-[52px] bg-[#1e3a8a] rounded-[14px] flex items-center justify-center shadow-md">
      <CatIcon className="w-[26px] h-[26px] text-white" />
    </div>
  );
}
