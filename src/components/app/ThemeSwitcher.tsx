import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '../../hooks/useTheme';

type Theme = 'light' | 'dark' | 'rose' | 'sandbox';

interface ThemeOption {
  id: Theme;
  label: string;
  icon: string;
  colorClass: string;
  badgeBg: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'light',
    label: 'Modo Claro',
    icon: 'mdi:white-balance-sunny',
    colorClass: 'text-amber-500',
    badgeBg: 'bg-amber-500/10'
  },
  {
    id: 'dark',
    label: 'Modo Oscuro',
    icon: 'mdi:moon-and-stars',
    colorClass: 'text-blue-400',
    badgeBg: 'bg-blue-500/10'
  },
  {
    id: 'rose',
    label: 'Modo Rose',
    icon: 'mdi:flower-tulip-outline',
    colorClass: 'text-pink-500',
    badgeBg: 'bg-pink-500/10'
  },
  {
    id: 'sandbox',
    label: 'Modo Sandbox',
    icon: 'mdi:code-braces-box',
    colorClass: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10'
  }
];

export function ThemeSwitcher({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Combo trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-[var(--color-app-border)] bg-[var(--color-app-surface)] hover:bg-[var(--color-app-surface-sec)] text-[var(--color-app-text)] shadow-sm hover:shadow transition-all text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)]/40 ${
          isOpen ? 'ring-2 ring-[var(--color-app-primary)]/40 border-[var(--color-app-primary)]' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Cambiar tema de la aplicación"
      >
        <span className={`flex items-center justify-center w-5 h-5 rounded-md ${currentTheme.badgeBg} ${currentTheme.colorClass}`}>
          <Icon icon={currentTheme.icon} className="text-base" />
        </span>
        
        {variant !== 'compact' && (
          <span className="hidden sm:inline font-semibold">{currentTheme.label}</span>
        )}

        <Icon
          icon="mdi:chevron-down"
          className={`text-base text-[var(--color-app-muted)] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[var(--color-app-primary)]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-2xl bg-[var(--color-app-surface)] border border-[var(--color-app-border)] shadow-2xl z-50 p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-app-muted)] border-b border-[var(--color-app-border)]/60 flex items-center justify-between">
            <span>Seleccionar Tema</span>
            <Icon icon="mdi:palette" className="text-xs text-[var(--color-app-primary)]" />
          </div>

          <div className="space-y-1 mt-1">
            {THEMES.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-[var(--color-app-primary)] text-white shadow-md shadow-[var(--color-app-primary)]/20'
                      : 'text-[var(--color-app-text)] hover:bg-[var(--color-app-surface-sec)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20 text-white' : `${t.badgeBg} ${t.colorClass}`}`}>
                      <Icon icon={t.icon} className="text-sm sm:text-base" />
                    </span>
                    <span>{t.label}</span>
                  </div>

                  {isSelected && (
                    <Icon icon="mdi:check-bold" className="text-xs text-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
