import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ 
  children, 
  variant = 'ghost', 
  size = 'md',
  className = '',
  ...props 
}: IconButtonProps) {
  const baseStyle = "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-app-bg)] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-app-primary)] text-white hover:bg-[var(--color-app-secondary)]",
    secondary: "bg-[var(--color-app-surface-sec)] text-[var(--color-app-text)] hover:bg-[var(--color-app-border)]",
    ghost: "text-[var(--color-app-muted)] hover:text-[var(--color-app-text)] hover:bg-[var(--color-app-surface-sec)]"
  };

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
