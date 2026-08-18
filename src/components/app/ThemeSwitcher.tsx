import { Icon } from '@iconify/react';
import { useTheme } from '../../hooks/useTheme';
import { IconButton } from '../ui/IconButton';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('sandbox');
    else if (theme === 'sandbox') setTheme('rose');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'light') return 'mdi:white-balance-sunny';
    if (theme === 'dark') return 'mdi:moon-and-stars';
    if (theme === 'sandbox') return 'mdi:code-braces-box';
    return 'mdi:palette'; // Rose mode
  };

  return (
    <IconButton onClick={handleToggle} aria-label="Toggle Theme" title={`Current theme: ${theme}`}>
      <Icon icon={getIcon()} className="text-xl" />
    </IconButton>
  );
}
