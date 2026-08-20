export default function Button({ children, variant = 'primary', icon: Icon, className = '', ...props }) {
  const baseStyle = "w-full flex justify-center items-center py-3 px-4 rounded-md shadow-sm text-sm font-semibold focus:outline-none transition-colors duration-200";
  const variants = {
    primary: "text-white bg-brand-orange hover:bg-[#e04a15] focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon className="mr-2 h-5 w-5 text-gray-400" />}
      {children}
    </button>
  );
}
