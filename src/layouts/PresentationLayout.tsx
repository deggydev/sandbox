import { Outlet } from 'react-router-dom';

export function PresentationLayout() {
  return (
    <div className="w-full h-[100dvh] min-h-[100dvh] bg-black overflow-hidden flex items-center justify-center">
      <Outlet />
    </div>
  );
}

