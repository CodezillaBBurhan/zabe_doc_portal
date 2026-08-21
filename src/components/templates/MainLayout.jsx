import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';
import Spinner from '../atoms/Spinner';

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Show global centered loader on location change
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500); // 500ms fake loading for smooth visual transition
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full bg-background text-on-surface font-body-md antialiased overflow-hidden">
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main className="flex-1 lg:ml-[230px] w-full flex flex-col h-full relative overflow-hidden transition-all duration-300">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        {/* Main Content Area */}
        <div className="flex-1 mt-[64px] overflow-y-auto overflow-x-hidden relative">
          
          {/* Content Loader */}
          {isNavigating && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-opacity duration-300">
              <Spinner size="lg" />
            </div>
          )}

          <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 pb-32 min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
