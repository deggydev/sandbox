import { Outlet } from 'react-router-dom';

export function PresentationLayout() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <Outlet />
    </div>
  );
}
