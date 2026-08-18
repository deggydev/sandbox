import { useState } from 'react';
import { Icon } from '@iconify/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Breadcrumbs } from './Breadcrumbs';
import { IconButton } from '../ui/IconButton';
import { Drawer } from '../ui/Drawer';
import { AppSidebar } from './AppSidebar'; // For mobile drawer contents

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="h-16 border-b border-[var(--color-app-border)] bg-[var(--color-app-surface)] flex items-center px-4 justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 min-w-0">
        <IconButton 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Icon icon="mdi:menu" className="text-2xl" />
        </IconButton>
        
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-4">
        <ThemeSwitcher />
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        position="left"
      >
        <div className="flex flex-col h-full" onClick={() => setIsMobileMenuOpen(false)}>
          {/* We reuse the sidebar but make sure it takes full space and removes its hidden class */}
          <div className="w-full flex-1 [&>aside]:w-full [&>aside]:border-none [&>aside]:flex [&>aside]:md:flex">
             <AppSidebar />
          </div>
        </div>
      </Drawer>
    </header>
  );
}
