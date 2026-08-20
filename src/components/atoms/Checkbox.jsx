export default function Checkbox({ id, label }) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        className="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-600 font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
}
