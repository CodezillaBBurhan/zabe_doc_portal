import Input from '../atoms/Input';

export default function FormField({ label, id, icon: Icon, rightIcon, ...inputProps }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="flex items-center text-[13px] font-bold text-[#1f2937] mb-2">
        {Icon && <Icon className="w-4 h-4 mr-2 text-[#2563eb]" strokeWidth={2.5} />}
        {label}
      </label>
      <Input id={id} rightIcon={rightIcon} {...inputProps} />
    </div>
  );
}
