import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { IconButton } from './IconButton';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
}

export function Drawer({ isOpen, onClose, children, position = 'left' }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer content */}
      <div 
        className={`relative w-80 max-w-[80vw] bg-[var(--color-app-surface)] shadow-xl flex flex-col transition-transform transform ${
          position === 'left' ? 'mr-auto' : 'ml-auto'
        }`}
      >
        <div className="flex items-center justify-end p-4 border-b border-[var(--color-app-border)]">
          <IconButton onClick={onClose} size="sm" aria-label="Close menu">
            <Icon icon="mdi:close" className="text-xl" />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
