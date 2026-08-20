import { Info } from 'lucide-react';

export default function InfoAlert({ message }) {
  return (
    <div className="bg-[#eff6ff] rounded-md p-3.5 mb-5 flex items-start">
      <div className="flex-shrink-0">
        <Info className="h-[18px] w-[18px] text-[#2563eb] mt-0.5" strokeWidth={2.5} />
      </div>
      <div className="ml-3">
        <p className="text-[12.5px] text-[#1e293b] font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
