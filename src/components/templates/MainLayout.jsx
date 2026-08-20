import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="flex-1 mt-[64px] overflow-y-auto overflow-x-hidden py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 pb-32">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
