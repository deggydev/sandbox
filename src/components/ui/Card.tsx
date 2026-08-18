import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({ children, className = '', onClick, interactive = false }: CardProps) {
  const baseStyle = "bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-2xl shadow-sm overflow-hidden transition-all duration-300 relative group";
  const interactiveStyle = interactive 
    ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--color-app-primary)] hover:shadow-[var(--color-app-primary)]/10" 
    : "hover:-translate-y-1 hover:shadow-lg";

  return (
    <div 
      className={`${baseStyle} ${interactiveStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
