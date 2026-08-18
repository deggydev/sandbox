import type { ReactNode } from 'react';
import { AppLogo } from '../app/AppLogo';

interface PresentationFrameProps {
  children: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
}

export function PresentationFrame({ 
  children,
  headerLeft,
  headerRight,
  footerLeft,
  footerRight
}: PresentationFrameProps) {
  return (
    <div className="presentation-frame bg-[var(--color-app-bg)] w-full max-w-[177.78vh] flex flex-col relative text-[var(--color-app-text)] shadow-2xl transition-colors">
      {/* Header */}
      <header className="h-20 px-10 flex items-center justify-between shrink-0 z-10 relative">
        <div>{headerLeft || <AppLogo variant="presentation" />}</div>
        <div className="text-base font-semibold text-[var(--color-app-muted)]">{headerRight}</div>
      </header>

      {/* Canvas */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-16 px-10 flex items-center justify-between shrink-0 border-t border-[var(--color-app-border)] z-10 relative bg-[var(--color-app-surface)]">
        <div className="text-sm font-semibold tracking-wider text-[var(--color-app-muted)] uppercase">
          {footerLeft}
        </div>
        <div className="text-sm font-bold text-[var(--color-app-muted)] tracking-widest">
          {footerRight}
        </div>
      </footer>
    </div>
  );
}
