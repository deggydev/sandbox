import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SlideProps {
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  code?: string;
  language?: string;
  items?: string[];
  calloutType?: 'info' | 'warning' | 'tip';
  question?: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  functionsToUse?: string[];
  citations?: string[];
}

function Citations({ citations }: { citations?: string[] }) {
  if (!citations || citations.length === 0) return null;
  return (
    <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10 text-sm text-gray-300 text-right z-50 shadow-xl">
      {citations.map((cite, i) => (
        <p key={i} className="italic text-[13px] leading-tight opacity-80">{cite}</p>
      ))}
    </div>
  );
}

export function CoverSlide({ title, subtitle }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center h-full">
      <div className="max-w-4xl space-y-6">
        {subtitle && (
          <h2 className="text-2xl font-semibold tracking-widest uppercase text-[var(--color-app-primary)]">
            {subtitle}
          </h2>
        )}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          {title || "Título del Tema"}
        </h1>
        <div className="w-24 h-2 bg-[var(--color-app-primary)] mx-auto mt-8 rounded-full" />
      </div>
    </div>
  );
}

export function TitleSlide({ title, content }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col justify-center p-16 h-full">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {content && (
          <p className="text-2xl text-[var(--color-app-muted)] leading-relaxed">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

export function TextSlide({ title, content, image, code, language, citations }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-16 h-full">
      <h2 className="text-4xl font-extrabold mb-8 text-[var(--color-app-text)] border-b-4 border-[var(--color-app-primary)] pb-4 w-max shrink-0">
        {title}
      </h2>
      
      <div className={`flex-1 flex ${code ? 'flex-col gap-8' : 'gap-12'} min-h-0`}>
        {/* Parte superior (texto o texto + imagen) */}
        <div className={`flex ${code ? 'shrink-0' : 'flex-1'} gap-12 overflow-auto items-start`}>
          <div 
            className="flex-1 text-2xl leading-relaxed text-[var(--color-app-text)]/90 whitespace-pre-wrap font-medium"
            dangerouslySetInnerHTML={{ __html: content || "Contenido de texto aquí..." }}
          />
          {image && (
            <div className="flex-1 h-full max-h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group">
              <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>

        {/* Parte inferior: Bloque de código */}
        {code && (
          <div className="flex-1 min-h-0 rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-app-border)] bg-[#1E1E1E] flex flex-col">
            <div className="bg-[#2D2D2D] px-6 py-2 border-b border-gray-700 flex items-center gap-3 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <span className="ml-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{language || 'python'}</span>
            </div>
            <div className="p-4 flex-1 overflow-auto text-lg">
              <SyntaxHighlighter 
                language={language || 'python'} 
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: 0, background: 'transparent' }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>

      <Citations citations={citations} />
    </div>
  );
}

export function ImageSlide({ title, image }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-16 h-full">
      {title && <h2 className="text-3xl font-bold mb-8 shrink-0">{title}</h2>}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-[var(--color-app-surface-sec)] flex items-center justify-center border border-[var(--color-app-border)]">
        {image ? (
          <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
        ) : (
          <span className="text-[var(--color-app-muted)] text-xl font-medium">Espacio para imagen</span>
        )}
      </div>
    </div>
  );
}

export function CodeSlide({ title, code, language, subtitle }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-16 h-full bg-[var(--color-app-surface)]">
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-[var(--color-app-text)]">{title}</h2>
        {subtitle && <p className="text-2xl text-[var(--color-app-primary)] font-semibold mt-2">{subtitle}</p>}
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-app-border)] bg-[#1E1E1E] flex flex-col">
        <div className="bg-[#2D2D2D] px-6 py-3 border-b border-gray-700 flex items-center gap-3 shrink-0">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-sm"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-sm"></div>
          <span className="ml-4 text-sm font-bold text-gray-400 uppercase tracking-widest">{language || 'python'}</span>
        </div>
        <div className="p-4 h-full overflow-auto text-xl flex-1">
          <SyntaxHighlighter 
            language={language || 'python'} 
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '1rem', background: 'transparent', height: '100%' }}
            showLineNumbers={true}
          >
            {code || "# Ingrese el código aquí"}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export function ExerciseSlide({ title, subtitle, content, code, language, functionsToUse, citations }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-16 h-full bg-[var(--color-app-surface-sec)]">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <div className="px-4 py-1.5 bg-[var(--color-app-primary)] text-white text-sm font-bold uppercase tracking-widest rounded-full">
          Práctica
        </div>
        <h2 className="text-4xl font-extrabold text-[var(--color-app-text)]">{title}</h2>
      </div>
      {subtitle && <h3 className="text-2xl font-semibold mb-5 text-[var(--color-app-muted)] shrink-0">{subtitle}</h3>}
      
      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left panel: enunciado + functionsToUse */}
        <div className="flex-1 flex flex-col bg-[var(--color-app-surface)] rounded-xl border border-[var(--color-app-border)] shadow-sm overflow-hidden">
          {/* Enunciado */}
          <div
            className="flex-1 text-xl leading-relaxed p-8 overflow-auto"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />

          {/* Deberías utilizar — chips compactos */}
          {functionsToUse && functionsToUse.length > 0 && (
            <div className="px-6 py-4 border-t border-[var(--color-app-border)] bg-[var(--color-app-surface-sec)] shrink-0">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-app-muted)] mb-3 flex items-center gap-2">
                <Icon icon="mdi:tools" className="text-[var(--color-app-primary)]" />
                Deberías utilizar
              </p>
              <div className="flex flex-wrap gap-2">
                {functionsToUse.map((fn, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm font-mono font-semibold bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] border border-[var(--color-app-primary)]/20 rounded-lg"
                  >
                    {fn}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right panel: Punto de partida */}
        {code && (
          <div className="flex-1 rounded-2xl overflow-hidden shadow-xl border border-[var(--color-app-border)] bg-[#1E1E1E] flex flex-col">
            <div className="bg-[#2D2D2D] px-4 py-2 border-b border-gray-700 flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Icon icon="mdi:code-braces" className="text-lg" />
                Punto de partida
              </span>
            </div>
            <div className="p-4 flex-1 overflow-auto text-lg">
              <SyntaxHighlighter language={language || 'python'} style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
      <Citations citations={citations} />
    </div>
  );
}


export function ClosingSlide({ title, subtitle }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-16 text-center h-full">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight">
          {title || "¡Gracias!"}
        </h1>
        {subtitle && (
          <h2 className="text-3xl font-medium text-[var(--color-app-muted)]">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
}

export function CalloutSlide({ title, content, calloutType = 'info', image, code, language, citations }: SlideProps) {
  const styles = {
    info: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400',
    warning: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-400',
    tip: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400'
  };
  const icons = {
    info: 'mdi:information-outline',
    warning: 'mdi:alert-outline',
    tip: 'mdi:lightbulb-on-outline'
  };
  
  return (
    <div className="flex-1 flex flex-col p-16 h-full bg-[var(--color-app-surface)]">
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <Icon icon={icons[calloutType]} className={`text-6xl ${calloutType==='warning'?'text-amber-500':calloutType==='tip'?'text-emerald-500':'text-blue-500'}`} />
        <h2 className="text-5xl font-extrabold uppercase tracking-widest text-[var(--color-app-text)]">{title}</h2>
      </div>
      
      <div className={`flex-1 rounded-[2.5rem] p-12 ${styles[calloutType]} shadow-2xl relative overflow-hidden flex flex-col justify-center`}>
         <div className="absolute -right-20 -bottom-20 opacity-20 transform rotate-12 pointer-events-none">
           <Icon icon={icons[calloutType]} className="text-[400px]" />
         </div>
         <div className="relative z-10 max-w-5xl w-full mx-auto space-y-8 flex flex-col h-full justify-center">
           {content && <p className="text-3xl leading-relaxed font-semibold drop-shadow-md" dangerouslySetInnerHTML={{ __html: content }}></p>}
           
           {code && (
              <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#1E1E1E] text-left text-lg">
                <div className="bg-[#2D2D2D]/80 px-4 py-2 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <SyntaxHighlighter 
                  language={language || 'python'} 
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
           )}
           {image && (
              <div className="mt-8 flex justify-center">
                <img src={image} className="rounded-2xl shadow-2xl border-4 border-white/20 max-h-[400px] object-cover" />
              </div>
           )}
         </div>
      </div>
      <Citations citations={citations} />
    </div>
  );
}

export function InteractiveListSlide({ title, items, citations }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-16 h-full">
      <h2 className="text-5xl font-extrabold mb-12 text-[var(--color-app-text)] tracking-tight">
        {title}
      </h2>
      <div className="flex-1 grid gap-6 content-start overflow-auto pb-8 pr-4">
        {items?.map((item, i) => (
          <div key={i} className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 group">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] flex items-center justify-center text-2xl font-black group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 shadow-inner">
              {i + 1}
            </div>
            <div 
              className="text-xl text-[var(--color-app-text)] font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </div>
        ))}
      </div>
      <Citations citations={citations} />
    </div>
  );
}

export function QuizSlide({ title, question, options, answer, explanation, code, language, citations }: SlideProps) {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
        <Icon icon="mdi:help-circle" className="text-[400px]" />
      </div>

      {/* Header — fixed height */}
      <div className="flex items-center gap-3 px-10 pt-7 pb-4 border-b border-white/10 shrink-0 relative z-10">
        <Icon icon="mdi:frequently-asked-questions" className="text-4xl text-purple-300 shrink-0" />
        <h2 className="text-3xl font-extrabold uppercase tracking-widest text-purple-100 truncate">
          {title || "Trivia"}
        </h2>
      </div>

      {/* Body — two-row layout */}
      <div className="flex-1 flex flex-col min-h-0 relative z-10">

        {/* Question panel */}
        <div className={`px-10 pt-5 pb-3 shrink-0 overflow-y-auto ${code ? 'max-h-[55%]' : 'max-h-[38%]'}`}>
          {/* Question text */}
          {question && (
            <div
              className="text-xl md:text-2xl font-bold leading-snug text-center text-white drop-shadow mb-4"
              dangerouslySetInnerHTML={{ __html: question }}
            />
          )}

          {/* Code block inside the question */}
          {code && (
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#1E1E1E] text-left">
              <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {language || 'python'}
                </span>
              </div>
              <SyntaxHighlighter
                language={language || 'python'}
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1rem 1.25rem', background: 'transparent', fontSize: '1rem' }}
                showLineNumbers={true}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-10 border-t border-white/10 shrink-0" />

        {/* Options + action panel — takes remaining space */}
        <div className="flex-1 px-10 py-4 flex flex-col justify-between min-h-0">

          {/* Answer options grid */}
          {options && (
            <div className="grid grid-cols-2 gap-3 flex-1 content-start">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center p-4 rounded-2xl border-2 text-xl font-bold transition-all duration-500 shadow-lg text-center ${
                    revealed && opt === answer
                      ? 'bg-emerald-500 border-emerald-400 scale-[1.03] text-white shadow-emerald-500/40 shadow-xl'
                      : revealed
                      ? 'bg-white/5 border-white/10 opacity-25 text-white/40'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  }`}
                >
                  <span className="mr-2 text-white/40 font-black">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </div>
              ))}
            </div>
          )}

          {/* Reveal button or answer explanation */}
          <div className="mt-3 shrink-0">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="w-full py-4 bg-purple-500 hover:bg-purple-400 text-white rounded-2xl text-2xl font-black shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all"
              >
                Revelar Respuesta
              </button>
            ) : (
              <div className="p-5 bg-emerald-500/20 border-2 border-emerald-500 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon icon="mdi:check-decagram" className="text-3xl text-emerald-400" />
                  <h4 className="text-2xl font-black text-emerald-300">¡Respuesta Correcta!</h4>
                  <span className="ml-2 text-xl font-bold text-white bg-emerald-600/50 px-3 py-0.5 rounded-full">{answer}</span>
                </div>
                {explanation && (
                  <p
                    className="text-base text-emerald-100 font-medium text-center leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: explanation }}
                  />
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      <Citations citations={citations} />
    </div>
  );
}


export function SolutionSlide({ title, subtitle, functionsToUse, code, language, citations }: SlideProps) {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="flex-1 flex flex-col p-16 h-full bg-[var(--color-app-surface)]">
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-[var(--color-app-text)] flex items-center gap-3">
          <Icon icon="mdi:lightbulb-on" className="text-amber-500" />
          {title || "Solución Esperada"}
        </h2>
        {subtitle && <p className="text-2xl text-[var(--color-app-primary)] font-semibold mt-2">{subtitle}</p>}
      </div>
      
      <div className="flex-1 grid grid-cols-3 gap-8 overflow-hidden h-full">
        <div className="col-span-1 bg-[var(--color-app-surface-sec)] p-8 rounded-3xl border border-[var(--color-app-border)] shadow-xl flex flex-col">
          <h3 className="text-2xl font-bold mb-8 text-[var(--color-app-text)] flex items-center gap-3 border-b border-[var(--color-app-border)] pb-4">
            <Icon icon="mdi:tools" className="text-[var(--color-app-primary)] text-3xl" />
            Deberás utilizar:
          </h3>
          <ul className="space-y-4 flex-1 overflow-auto pr-2">
            {functionsToUse?.map((fn, i) => (
              <li key={i} className="flex items-center gap-4 text-xl font-mono text-[var(--color-app-text)] bg-[var(--color-app-surface)] p-4 rounded-2xl border border-[var(--color-app-border)] shadow-sm hover:-translate-y-1 transition-transform">
                <Icon icon="mdi:code-tags" className="text-[var(--color-app-primary)] shrink-0 text-2xl" />
                {fn}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-app-border)] bg-[#1E1E1E] flex flex-col">
          <div className="bg-[#2D2D2D] px-6 py-3 border-b border-gray-700 flex items-center gap-3 shrink-0">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm font-bold text-gray-400 uppercase tracking-widest">{language || 'python'}</span>
          </div>
          
          {!revealed ? (
             <div className="flex-1 flex flex-col items-center justify-center bg-[#1E1E1E] p-8 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGM1LjUtNS41IDUuNS0xNC41IDAtMjAtNS41IDUuNS0xNC41IDUuNS0yMCAwIDUuNSA1LjUgNS41IDE0LjUgMCAyMCA1LjUtNS41IDE0LjUtNS41IDIwIDB6IiBmaWxsPSIjMmQyZDJkIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii40Ii8+PC9zdmc+')] opacity-20"></div>
               <Icon icon="mdi:eye-off-outline" className="text-8xl text-gray-500 mb-8 relative z-10" />
               <h3 className="text-3xl font-bold text-gray-300 mb-10 relative z-10">El código está oculto para evitar spoilers</h3>
               <button 
                 onClick={() => setRevealed(true)}
                 className="px-10 py-5 bg-[var(--color-app-primary)] hover:brightness-110 text-white rounded-full text-2xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-2 relative z-10"
               >
                 Revelar Fragmento de Solución
               </button>
             </div>
          ) : (
             <div className="p-4 h-full overflow-auto text-xl flex-1 animate-in fade-in zoom-in-95 duration-500">
               <SyntaxHighlighter 
                 language={language || 'python'} 
                 style={vscDarkPlus}
                 customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', height: '100%' }}
                 showLineNumbers={true}
               >
                 {code || "# Código"}
               </SyntaxHighlighter>
             </div>
          )}
        </div>
      </div>
      <Citations citations={citations} />
    </div>
  );
}
