import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/app/AppHeader';
import { AppSidebar } from '../components/app/AppSidebar';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-[var(--color-app-bg)] overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
