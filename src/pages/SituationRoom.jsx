import React from 'react';
import { 
  ChevronRight, 
  Lock, 
  RefreshCw, 
  Power, 
  Clock, 
  Maximize, 
  Monitor, 
  Presentation, 
  Wifi
} from 'lucide-react';

const SituationRoom = () => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center font-body-sm text-body-sm text-secondary mb-2">
            <span>TV Control</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-on-surface font-medium">Situation Room Screen 01</span>
          </div>
          
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display-lg text-display-lg text-on-surface">Situation Room Screen 01</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-700">Online</span>
            </div>
          </div>
          
          <p className="font-body-md text-body-md text-secondary">Abuja Situation Room • ID: ABU-SIT-01</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-[4px] font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
            <Lock className="w-4 h-4" />
            Lock Screen
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-[4px] font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-error rounded-[4px] font-label-md text-label-md text-error hover:bg-error-container transition-colors">
            <Power className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      </div>

      {/* Main Broadcast Preview Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-[16px] mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Current Broadcast Preview</h2>
          <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-secondary">
            <Clock className="w-4 h-4" />
            <span>Last Updated: Just now</span>
          </div>
        </div>

        {/* Video/Map Container */}
        <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video md:aspect-[21/9]">
          {/* Background Map Placeholder */}
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80")' }}
          ></div>
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col p-6">
            <div className="flex justify-end">
              <button className="p-2 bg-black/20 hover:bg-black/40 rounded-lg text-white/80 hover:text-white backdrop-blur-sm transition-all">
                <Maximize className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center -mt-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center drop-shadow-md">
                National Incident Overview
              </h3>
              <p className="text-white/90 text-sm md:text-base font-medium drop-shadow mb-12">
                Slide 02 • Auto-advancing in 14s
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl px-4">
                {/* Metric 1 */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2">Total Verified</span>
                  <span className="text-4xl font-bold text-white">1,248</span>
                </div>
                {/* Metric 2 */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2">Critical</span>
                  <span className="text-4xl font-bold text-[#FF6B6B]">42</span>
                </div>
                {/* Metric 3 */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2">Resolved</span>
                  <span className="text-4xl font-bold text-[#4ADE80]">89%</span>
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 rounded border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse"></div>
                <span className="text-xs font-bold text-white tracking-wider uppercase">Live Feed Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest rounded-[4px] shadow-sm p-6 flex flex-col items-start border-t-2 border-t-transparent hover:border-t-brand-orange transition-all">
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center mb-6">
            <Monitor className="w-4 h-4 text-brand-orange" />
          </div>
          <h4 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Screen Status</h4>
          <p className="font-headline-sm text-headline-sm text-on-surface">Active /<br/>Displaying</p>
        </div>

        <div className="bg-surface-container-lowest rounded-[4px] shadow-sm p-6 flex flex-col items-start border-t-2 border-t-transparent hover:border-t-brand-orange transition-all">
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center mb-6">
            <Presentation className="w-4 h-4 text-brand-orange" />
          </div>
          <h4 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Current Slide</h4>
          <p className="font-headline-sm text-headline-sm text-on-surface">National Overview</p>
        </div>

        <div className="bg-surface-container-lowest rounded-[4px] shadow-sm p-6 flex flex-col items-start border-t-2 border-t-transparent hover:border-t-[#12B76A] transition-all">
          <div className="w-8 h-8 rounded-full bg-[#12B76A]/10 flex items-center justify-center mb-6">
            <Wifi className="w-4 h-4 text-[#12B76A]" />
          </div>
          <h4 className="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Connection Status</h4>
          <p className="font-headline-sm text-headline-sm text-on-surface">Excellent (12ms)</p>
        </div>
      </div>
    </div>
  );
};

export default SituationRoom;
