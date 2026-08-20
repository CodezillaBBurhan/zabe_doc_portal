import React from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/atoms/MaterialIcon';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <MaterialIcon icon="explore_off" className="text-[48px] text-gray-400" />
      </div>
      <h1 className="text-[48px] font-bold text-gray-900 mb-2 leading-none">404</h1>
      <h2 className="text-[20px] font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-6 py-3 bg-[#ff5a1f] hover:bg-[#e84c12] text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
      >
        <MaterialIcon icon="arrow_back" className="text-[18px]" />
        Return to Dashboard
      </button>
    </div>
  );
}
