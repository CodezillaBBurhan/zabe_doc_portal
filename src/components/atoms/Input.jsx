// 📚 See COMPONENTS.md in the project root for usage guidelines and variants.
import React from 'react';
import MaterialIcon from './MaterialIcon';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  disabled = false,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-[11px] font-bold text-[#475467] uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <MaterialIcon 
            icon={icon} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none" 
          />
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-2.5 text-[14px] border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-gray-700 transition-shadow ${
            icon ? 'pl-10 pr-4' : 'px-3'
          } ${
            error 
              ? 'border-error bg-error-container/10' 
              : 'border-[#e4e7ec] bg-white placeholder:text-gray-400'
          } ${
            disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : ''
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-error text-[12px] mt-1.5 font-medium">{error}</p>}
    </div>
  );
}
