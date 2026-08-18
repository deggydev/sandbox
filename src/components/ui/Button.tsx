import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-colors rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-app-bg)] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-app-primary)] text-white hover:bg-[var(--color-app-secondary)]",
    secondary: "bg-[var(--color-app-surface-sec)] text-[var(--color-app-text)] hover:bg-[var(--color-app-border)]",
    outline: "border border-[var(--color-app-border)] text-[var(--color-app-text)] hover:bg-[var(--color-app-surface-sec)]",
    ghost: "text-[var(--color-app-muted)] hover:text-[var(--color-app-text)] hover:bg-[var(--color-app-surface-sec)]"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
