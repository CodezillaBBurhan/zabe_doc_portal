import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-background text-on-surface font-body-md antialiased overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-[230px] flex flex-col h-full relative overflow-hidden">
        <Header />
        <div className="flex-1 mt-[64px] overflow-y-auto overflow-x-hidden py-8 px-0 pb-32">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
