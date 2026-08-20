export default function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center flex-1 px-1">
      <div className="w-10 h-10 bg-transparent border-[1.5px] border-[#1e293b] rounded-full mb-3.5 flex items-center justify-center">
        <Icon className="w-[18px] h-[18px] text-[#60a5fa]" strokeWidth={1.5} />
      </div>
      <h3 className="text-white text-[11.5px] font-bold mb-1.5 leading-[1.3] max-w-[110px]">{title}</h3>
      <p className="text-[#64748b] text-[9.5px] font-medium leading-[1.4] max-w-[110px]">{description}</p>
    </div>
  );
}
