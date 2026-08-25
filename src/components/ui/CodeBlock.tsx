import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  className?: string;
  copyable?: boolean;
}

const sizeClasses = {
  sm: 'text-xs sm:text-sm md:text-base',
  md: 'text-sm sm:text-base md:text-lg lg:text-xl',
  lg: 'text-base sm:text-lg md:text-xl lg:text-2xl'
};

export function CodeBlock({
  code,
  language = 'python',
  showLineNumbers = false,
  size = 'md',
  title,
  className = '',
  copyable = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[#3e3d32] bg-[#272822] flex flex-col shrink-0 ${className}`}>
      {/* Header bar estilo ventana de código Monokai */}
      <div className="bg-[#1e1f1c] px-3.5 sm:px-5 py-2 border-b border-[#3e3d32] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-sm" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 shadow-sm" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-sm" />
          </div>
          {title ? (
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Icon icon="mdi:code-braces" className="text-base text-[var(--color-app-primary)]" />
              {title}
            </span>
          ) : (
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-bold text-yellow-300/90 uppercase tracking-widest font-mono">
              {language}
            </span>
          )}
        </div>

        {/* Action buttons (Copy) */}
        <div className="flex items-center gap-2">
          {title && (
            <span className="hidden sm:inline-block text-[11px] font-bold text-yellow-300/80 uppercase tracking-widest font-mono mr-1">
              {language}
            </span>
          )}
          {copyable && (
            <button
              onClick={handleCopy}
              title="Copiar código"
              className="px-2 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1 border border-white/5"
            >
              <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className={copied ? 'text-emerald-400' : 'text-gray-400'} />
              <span className="text-[11px] hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Code container */}
      <div className={`p-3.5 sm:p-5 overflow-x-auto font-mono leading-snug ${sizeClasses[size]}`}>
        <SyntaxHighlighter
          language={language}
          style={okaidia}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: 'inherit',
            lineHeight: '1.3'
          }}
          showLineNumbers={showLineNumbers}
        >
          {code || '# Ingrese código aquí'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
