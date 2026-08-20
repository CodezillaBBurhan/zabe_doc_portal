export default function Divider({ text, className = '' }) {
  return (
    <div className={`relative my-6 ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}
