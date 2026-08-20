export default function Input({ rightIcon: RightIcon, ...props }) {
  return (
    <div className="relative">
      <input
        className={`w-full border border-gray-300 text-gray-900 placeholder-gray-500 rounded-md py-[11px] shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange text-[14px] pl-3.5 ${
          RightIcon ? 'pr-10' : 'pr-3.5'
        }`}
        {...props}
      />
      {RightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer">
          <RightIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}
