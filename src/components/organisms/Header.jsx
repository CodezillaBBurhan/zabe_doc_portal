import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MaterialIcon from '../atoms/MaterialIcon';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <header className="h-[64px] bg-surface-container-lowest dark:bg-inverse-surface flex justify-between items-center px-4 md:px-[24px] fixed top-0 right-0 w-full lg:w-[calc(100%-230px)] z-30 shadow-sm lg:shadow-none">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1.5 text-secondary hover:text-primary rounded-md transition-colors"
        >
          <MaterialIcon icon="menu" className="text-[24px]" />
        </button>
        
        <div className="relative hidden sm:block">
          <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm" />
          <input 
            type="text"
            className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-[13px] w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-brand-orange bg-white placeholder-gray-400 shadow-sm transition-all" 
            placeholder="Search commands, reports..." 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-6 h-full">
        <nav className="hidden md:flex h-full">
          <a href="#" className="h-full flex items-center px-4 font-body-md text-body-md text-secondary hover:text-primary transition-colors border-b-2 border-transparent">Reports</a>
          <a href="#" className="h-full flex items-center px-4 font-body-md text-body-md text-secondary hover:text-primary transition-colors border-b-2 border-transparent">Logs</a>
        </nav>
        
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-6 border-l sm:border-l-0 border-gray-200 h-8 sm:h-auto">
          <button className="flex items-center gap-1.5 text-error font-label-md text-[10px] sm:text-label-md">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-error animate-pulse"></span>
            <span className="hidden xs:inline">LIVE STATUS</span>
            <span className="xs:hidden">LIVE</span>
          </button>
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsUserMenuOpen(false);
              }}
              className={`text-secondary hover:text-on-surface ml-1 sm:ml-2 relative p-1.5 rounded-md transition-colors ${isNotificationsOpen ? 'bg-gray-100' : ''}`}
            >
              <MaterialIcon icon="notifications" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff8c42] rounded-full border border-white"></span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute top-[48px] right-0 w-[320px] bg-white border border-[#e4e7ec] rounded-xl shadow-xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-[#e4e7ec] flex justify-between items-center bg-[#f9fafb]">
                  <h3 className="font-bold text-[#0f1c2d] text-[15px]">Notifications</h3>
                  <button className="text-[12px] font-semibold text-[#005fb0] hover:text-[#004786]">Mark all as read</button>
                </div>
                <div className="flex flex-col max-h-[360px] overflow-y-auto">
                  
                  {/* Notification Item */}
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 opacity-100">
                    <div className="w-8 h-8 rounded-full bg-[#fef3f2] flex items-center justify-center shrink-0 mt-0.5">
                      <MaterialIcon icon="warning" className="text-[#d92d20] text-[16px]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">Critical Incident #INC-4029</div>
                      <div className="text-[12px] text-gray-500 leading-tight mb-1">Violence reported at Kano Polling Unit 014. Immediate dispatch required.</div>
                      <div className="text-[11px] font-semibold text-[#ff8c42]">10 mins ago</div>
                    </div>
                  </div>

                  {/* Notification Item */}
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 opacity-100">
                    <div className="w-8 h-8 rounded-full bg-[#ecfdf3] flex items-center justify-center shrink-0 mt-0.5">
                      <MaterialIcon icon="check_circle" className="text-[#039855] text-[16px]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">System Update Complete</div>
                      <div className="text-[12px] text-gray-500 leading-tight mb-1">Electoral boundaries have been synchronized successfully.</div>
                      <div className="text-[11px] text-gray-400">1 hour ago</div>
                    </div>
                  </div>

                  {/* Notification Item */}
                  <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 opacity-100">
                    <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0 mt-0.5">
                      <MaterialIcon icon="person_add" className="text-[#005fb0] text-[16px]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#0f1c2d] mb-0.5">New Operative Joined</div>
                      <div className="text-[12px] text-gray-500 leading-tight mb-1">John Doe has joined the National Command team.</div>
                      <div className="text-[11px] text-gray-400">2 hours ago</div>
                    </div>
                  </div>
                  
                </div>
                <div className="p-3 border-t border-[#e4e7ec] flex justify-center bg-gray-50">
                  <button className="text-[13px] font-semibold text-[#005fb0] hover:text-[#004786]">View All Notifications</button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile Dropdown */}
          <div className="relative" ref={userRef}>
            <button 
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotificationsOpen(false);
              }}
              className={`text-secondary hover:text-on-surface ml-0.5 sm:ml-2 p-1.5 rounded-md transition-colors ${isUserMenuOpen ? 'bg-gray-100' : ''}`}
            >
              <MaterialIcon icon="account_circle" className="text-[24px] sm:text-[28px]" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute top-[48px] right-0 w-[240px] bg-white border border-[#e4e7ec] rounded-xl shadow-xl z-50 flex flex-col py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#e4e7ec] mb-1">
                  <div className="text-[14px] font-bold text-[#0f1c2d]">Admin User</div>
                  <div className="text-[12px] text-gray-500">admin@zabe.app</div>
                </div>
                
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-colors">
                  <MaterialIcon icon="person" className="text-[18px] text-gray-400" />
                  My Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-colors">
                  <MaterialIcon icon="settings" className="text-[18px] text-gray-400" />
                  Account Settings
                </Link>
                
                <div className="h-px bg-[#e4e7ec] my-1 w-full"></div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#fef3f2] text-[13px] font-semibold text-[#d92d20] transition-colors w-full text-left"
                >
                  <MaterialIcon icon="logout" className="text-[18px]" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
