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
    <div className="presentation-frame bg-[var(--color-app-bg)] w-full flex flex-col relative text-[var(--color-app-text)] transition-colors">
      {/* Header */}
      <header className="h-14 sm:h-16 lg:h-20 px-3 sm:px-6 lg:px-10 flex items-center justify-between shrink-0 z-10 relative border-b border-[var(--color-app-border)]/40 lg:border-b-0">
        <div className="shrink-0">{headerLeft || <AppLogo variant="presentation" />}</div>
        {headerRight && (
          <div className="flex items-center justify-end shrink-0 ml-2 z-20">
            {headerRight}
          </div>
        )}
      </header>

      {/* Canvas */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col custom-slide-scroll pb-16 sm:pb-20 lg:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-12 sm:h-14 lg:h-16 px-3 sm:px-6 lg:px-10 flex items-center justify-between shrink-0 border-t border-[var(--color-app-border)] z-10 relative bg-[var(--color-app-surface)]">
        <div className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--color-app-muted)] uppercase truncate max-w-[60%]">
          {footerLeft}
        </div>
        <div className="text-xs sm:text-sm font-bold text-[var(--color-app-muted)] tracking-widest shrink-0 ml-2">
          {footerRight}
        </div>
      </footer>
    </div>
  );
}

