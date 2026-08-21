// 📚 See COMPONENTS.md in the project root for usage guidelines and variants.
import React, { useState } from 'react';

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const [error, setError] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return '?';
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const AVATAR_COLORS = [
    'bg-teal-500 text-gray-900 border-transparent',
    'bg-red-300 text-gray-900 border-transparent',
    'bg-blue-100 text-gray-900 border-transparent',
    'bg-lime-400 text-gray-900 border-transparent',
    'bg-slate-200 text-gray-900 border-transparent',
    'bg-green-100 text-gray-900 border-transparent',
    'bg-orange-300 text-gray-900 border-transparent',
    'bg-purple-200 text-gray-900 border-transparent',
    'bg-pink-300 text-gray-900 border-transparent',
    'bg-cyan-200 text-gray-900 border-transparent',
    'bg-yellow-300 text-gray-900 border-transparent'
  ];

  const getColorClass = (str) => {
    if (!str) return 'bg-surface-container text-on-surface border-gray-200';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  };

  const sizes = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-14 h-14 text-[16px]',
    xl: 'w-20 h-20 text-[22px]',
  };

  const sizeClass = sizes[size] || sizes.md;

  if (!src || error) {
    return (
      <div 
        className={`rounded-full font-bold flex items-center justify-center shrink-0 border overflow-hidden ${getColorClass(name)} ${sizeClass} ${className}`}
        aria-label={`Avatar for ${name || 'User'}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={`rounded-full shrink-0 overflow-hidden border border-gray-200 bg-gray-100 ${sizeClass} ${className}`}>
      <img 
        src={src} 
        alt={`Avatar of ${name || 'User'}`} 
        onError={() => setError(true)}
        className="w-full h-full object-cover" 
      />
    </div>
  );
}
