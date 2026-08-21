// 📚 See COMPONENTS.md in the project root for usage guidelines and variants.
import React from 'react';
import MaterialIcon from './MaterialIcon';
import Spinner from './Spinner';

export default function Button({
  children,
  variant = 'primary',
  icon,
  iconRight,
  isLoading,
  disabled,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-orange disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-[14px]';
  
  const variants = {
    primary: 'bg-brand-orange hover:bg-[#e64a10] text-white border border-transparent',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-error hover:bg-red-700 text-white border border-transparent',
    dangerLight: 'bg-[#fef3f2] hover:bg-[#fee4e2] text-[#d92d20] border border-[#fecdca]',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent shadow-none',
    primaryLight: 'bg-[#fff3eb] hover:bg-[#ffecd9] text-brand-orange border border-[#ffdbba]',
    ghostPrimary: 'bg-transparent hover:bg-orange-50 text-brand-orange border border-transparent shadow-none',
    ghostInfo: 'bg-transparent hover:bg-blue-50 text-[#005fb0] border border-transparent shadow-none'
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <Spinner className="w-4 h-4 mr-2" />
      ) : icon ? (
        <MaterialIcon icon={icon} className={`text-[18px] ${children ? 'mr-1.5' : ''}`} />
      ) : null}
      
      {children}
      
      {!isLoading && iconRight && (
        <MaterialIcon icon={iconRight} className="text-[18px] ml-1.5" />
      )}
    </button>
  );
}
