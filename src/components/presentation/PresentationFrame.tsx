import type { ReactNode } from 'react';
import { Icon } from '@iconify/react';
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-40" aria-hidden="true">
          <Icon icon="mdi:code-braces" className="absolute -right-8 top-[8%] text-[clamp(7rem,14vw,13rem)] text-[var(--color-app-primary)] opacity-[0.025] rotate-6" />
          <Icon icon="mdi:xml" className="absolute -left-5 bottom-[5%] text-[clamp(5rem,10vw,9rem)] text-[var(--color-app-primary)] opacity-[0.025] -rotate-6" />
          <span className="absolute left-[7%] top-[16%] font-mono font-black text-[clamp(5rem,12vw,11rem)] tracking-[-0.12em] text-[var(--color-app-primary)] opacity-[0.028] -rotate-6 select-none">
            {'{;)}'}
          </span>
          <Icon icon="mdi:console-line" className="absolute right-[7%] bottom-[7%] text-[clamp(3rem,6vw,5.5rem)] text-[var(--color-app-primary)] opacity-[0.03] rotate-6" />
          <Icon icon="mdi:code-json" className="absolute left-[42%] top-[7%] text-[clamp(2.5rem,4vw,4rem)] text-[var(--color-app-primary)] opacity-[0.03] rotate-12" />
          <Icon icon="mdi:language-javascript" className="absolute right-[34%] top-[42%] text-[clamp(2rem,3vw,3.25rem)] text-[var(--color-app-primary)] opacity-[0.025] -rotate-12" />
          <div className="absolute right-[15%] bottom-[12%] grid grid-cols-4 gap-2 opacity-[0.035]">
            {Array.from({ length: 16 }).map((_, index) => (
              <span key={index} className="w-1.5 h-1.5 rounded-full bg-[var(--color-app-primary)]" />
            ))}
          </div>
          <div className="absolute left-[8%] top-[12%] w-16 h-16 border border-[var(--color-app-primary)] opacity-[0.035] rotate-12" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          {children}
        </div>
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

