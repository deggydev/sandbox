import { useState } from 'react';
import { Icon } from '@iconify/react';
import { CodeBlock } from '../ui/CodeBlock';

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
    <div className="mt-8 pt-4 border-t border-[var(--color-app-border)]/40 w-full flex flex-col items-end gap-1.5 shrink-0 select-none">
      {citations.map((cite, i) => (
        <div key={i} className="inline-flex items-center gap-1.5 bg-[var(--color-app-surface-sec)]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[var(--color-app-border)] text-xs sm:text-sm text-[var(--color-app-muted)] shadow-sm">
          <Icon icon="mdi:format-quote-close" className="text-xs text-[var(--color-app-primary)] opacity-80" />
          <span className="italic font-medium">{cite}</span>
        </div>
      ))}
    </div>
  );
}

export function CoverSlide({ title, subtitle }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 md:p-16 text-center h-full min-h-[280px]">
      <div className="max-w-4xl space-y-4 sm:space-y-6">
        {subtitle && (
          <h2 className="text-xs sm:text-lg md:text-2xl font-semibold tracking-widest uppercase text-[var(--color-app-primary)]">
            {subtitle}
          </h2>
        )}
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          {title || "Título del Tema"}
        </h1>
        <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-[var(--color-app-primary)] mx-auto mt-4 sm:mt-8 rounded-full" />
      </div>
    </div>
  );
}

export function TitleSlide({ title, content }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 md:p-16 h-full min-h-[280px]">
      <div className="max-w-4xl space-y-4 sm:space-y-8">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {content && (
          <p className="text-base sm:text-xl md:text-2xl text-[var(--color-app-muted)] leading-relaxed">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

export function TextSlide({ title, content, image, code, language, citations }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full relative overflow-y-auto custom-slide-scroll">
      {title && (
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-[var(--color-app-text)] border-b-2 sm:border-b-4 border-[var(--color-app-primary)] pb-2 sm:pb-4 w-max shrink-0 max-w-full">
          {title}
        </h2>
      )}
      
      <div className={`flex-1 flex flex-col ${code ? 'gap-6 md:gap-8' : 'lg:flex-row gap-6 md:gap-12'}`}>
        {/* Parte superior o lateral (texto o texto + imagen) */}
        <div className={`flex flex-col ${image ? 'lg:flex-row' : ''} gap-4 sm:gap-6 md:gap-12 items-start`}>
          <div 
            className="flex-1 text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed text-[var(--color-app-text)]/90 whitespace-pre-wrap font-medium w-full"
            dangerouslySetInnerHTML={{ __html: content || "Contenido de texto aquí..." }}
          />
          {image && (
            <div className="w-full lg:flex-1 h-48 sm:h-64 md:h-80 lg:h-full max-h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/10 relative group shrink-0">
              <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>

        {/* Parte inferior: Bloque de código reutilizable */}
        {code && (
          <CodeBlock
            code={code}
            language={language}
            size="md"
          />
        )}
      </div>

      <Citations citations={citations} />
    </div>
  );
}

export function ImageSlide({ title, image }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full overflow-y-auto custom-slide-scroll">
      {title && <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 shrink-0">{title}</h2>}
      <div className="flex-1 relative rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--color-app-surface-sec)] flex items-center justify-center border border-[var(--color-app-border)] min-h-[220px]">
        {image ? (
          <img src={image} alt={title} className="max-w-full max-h-full object-contain p-2" />
        ) : (
          <span className="text-[var(--color-app-muted)] text-base sm:text-xl font-medium">Espacio para imagen</span>
        )}
      </div>
    </div>
  );
}

export function CodeSlide({ title, code, language, subtitle }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full bg-[var(--color-app-surface)] overflow-y-auto custom-slide-scroll">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-app-text)]">{title}</h2>
        {subtitle && <p className="text-base sm:text-xl md:text-2xl text-[var(--color-app-primary)] font-semibold mt-1 sm:mt-2">{subtitle}</p>}
      </div>
      <CodeBlock
        code={code || "# Ingrese el código aquí"}
        language={language}
        showLineNumbers={true}
        size="lg"
      />
    </div>
  );
}

export function ExerciseSlide({ title, subtitle, content, code, language, functionsToUse, citations }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full bg-[var(--color-app-surface-sec)] relative overflow-y-auto custom-slide-scroll">
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6 shrink-0 flex-wrap">
        <div className="px-3 py-1 sm:px-4 sm:py-1.5 bg-[var(--color-app-primary)] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full">
          Práctica
        </div>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-app-text)]">{title}</h2>
      </div>
      {subtitle && <h3 className="text-sm sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-5 text-[var(--color-app-muted)] shrink-0">{subtitle}</h3>}
      
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Left panel: enunciado + functionsToUse */}
        <div className="flex-1 flex flex-col bg-[var(--color-app-surface)] rounded-xl border border-[var(--color-app-border)] shadow-sm overflow-hidden min-h-[160px]">
          {/* Enunciado */}
          <div
            className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed p-4 sm:p-6 md:p-8"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />

          {/* Deberías utilizar — chips compactos */}
          {functionsToUse && functionsToUse.length > 0 && (
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-[var(--color-app-border)] bg-[var(--color-app-surface-sec)] shrink-0">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-app-muted)] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <Icon icon="mdi:tools" className="text-[var(--color-app-primary)] text-sm sm:text-base" />
                Deberías utilizar
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {functionsToUse.map((fn, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-mono font-semibold bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] border border-[var(--color-app-primary)]/20 rounded-lg"
                  >
                    {fn}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right panel: Punto de partida con componente reutilizable */}
        {code && (
          <div className="flex-1 flex flex-col shrink-0">
            <CodeBlock
              code={code}
              language={language}
              title="Punto de partida"
              size="sm"
            />
          </div>
        )}
      </div>
      <Citations citations={citations} />
    </div>
  );
}

export function ClosingSlide({ title, subtitle }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 md:p-16 text-center h-full min-h-[280px]">
      <div className="max-w-3xl space-y-4 sm:space-y-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          {title || "¡Gracias!"}
        </h1>
        {subtitle && (
          <h2 className="text-base sm:text-2xl md:text-3xl font-medium text-[var(--color-app-muted)]">
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
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full bg-[var(--color-app-surface)] relative overflow-y-auto custom-slide-scroll">
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8 shrink-0">
        <Icon icon={icons[calloutType]} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl shrink-0 ${calloutType==='warning'?'text-amber-500':calloutType==='tip'?'text-emerald-500':'text-blue-500'}`} />
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-widest text-[var(--color-app-text)] truncate">{title}</h2>
      </div>
      
      <div className={`w-full my-auto rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 ${styles[calloutType]} shadow-2xl relative overflow-hidden flex flex-col shrink-0 min-h-max`}>
         <div className="absolute -right-16 -bottom-16 sm:-right-20 sm:-bottom-20 opacity-15 transform rotate-12 pointer-events-none">
           <Icon icon={icons[calloutType]} className="text-[200px] sm:text-[300px] md:text-[400px]" />
         </div>
         <div className="relative z-10 max-w-5xl w-full mx-auto space-y-4 sm:space-y-6 flex flex-col">
           {content && <p className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-semibold drop-shadow-md" dangerouslySetInnerHTML={{ __html: content }}></p>}
           
           {code && (
              <div className="mt-4 sm:mt-6">
                <CodeBlock
                  code={code}
                  language={language}
                  size="md"
                />
              </div>
           )}
           {image && (
              <div className="mt-4 sm:mt-6 flex justify-center">
                <img src={image} className="rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white/20 max-h-[220px] sm:max-h-[320px] md:max-h-[400px] object-cover" />
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
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full relative overflow-y-auto custom-slide-scroll">
      <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-8 md:mb-12 text-[var(--color-app-text)] tracking-tight">
        {title}
      </h2>
      <div className="flex-1 grid gap-3 sm:gap-4 md:gap-6 content-start pb-6 sm:pb-8 pr-2 sm:pr-4">
        {items?.map((item, i) => (
          <div key={i} className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 sm:gap-4 md:gap-6 group">
            <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] flex items-center justify-center text-sm sm:text-lg md:text-2xl font-black group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-inner">
              {i + 1}
            </div>
            <div 
              className="text-xs sm:text-base md:text-lg lg:text-xl text-[var(--color-app-text)] font-medium leading-relaxed"
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
        <Icon icon="mdi:help-circle" className="text-[200px] sm:text-[300px] md:text-[400px]" />
      </div>

      {/* Header — fixed height */}
      <div className="flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 md:px-10 md:pt-7 md:pb-4 border-b border-white/10 shrink-0 relative z-10">
        <Icon icon="mdi:frequently-asked-questions" className="text-2xl sm:text-3xl md:text-4xl text-purple-300 shrink-0" />
        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-purple-100 truncate">
          {title || "Trivia"}
        </h2>
      </div>

      {/* Body — responsive layout with slide-level scroll */}
      <div className="flex-1 flex flex-col min-h-0 relative z-10 overflow-y-auto custom-slide-scroll">

        {/* Question panel */}
        <div className="px-4 sm:px-6 md:px-10 pt-3 sm:pt-5 pb-2 sm:pb-3 shrink-0">
          {/* Question text */}
          {question && (
            <div
              className="text-base sm:text-xl md:text-2xl font-bold leading-snug text-center text-white drop-shadow mb-3 sm:mb-4"
              dangerouslySetInnerHTML={{ __html: question }}
            />
          )}

          {/* Code block inside the question */}
          {code && (
            <div className="mt-3">
              <CodeBlock
                code={code}
                language={language}
                size="sm"
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-10 border-t border-white/10 shrink-0 my-2" />

        {/* Options + action panel */}
        <div className="flex-1 px-4 sm:px-6 md:px-10 py-2 sm:py-4 flex flex-col justify-between min-h-0">

          {/* Answer options grid */}
          {options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 flex-1 content-start">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-start sm:justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-all duration-500 shadow-md ${
                    revealed && opt === answer
                      ? 'bg-emerald-500 border-emerald-400 scale-[1.01] sm:scale-[1.03] text-white shadow-emerald-500/40 shadow-xl'
                      : revealed
                      ? 'bg-white/5 border-white/10 opacity-25 text-white/40'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  }`}
                >
                  <span className="mr-2.5 text-white/40 font-black shrink-0">{String.fromCharCode(65 + i)}.</span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reveal button or answer explanation */}
          <div className="mt-4 shrink-0 pb-2">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="w-full py-3.5 sm:py-4 bg-purple-500 hover:bg-purple-400 text-white rounded-xl sm:rounded-2xl text-base sm:text-xl md:text-2xl font-black shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-[1.01] transition-all"
              >
                Revelar Respuesta
              </button>
            ) : (
              <div className="p-3.5 sm:p-5 bg-emerald-500/20 border-2 border-emerald-500 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                  <Icon icon="mdi:check-decagram" className="text-xl sm:text-3xl text-emerald-400" />
                  <h4 className="text-base sm:text-xl md:text-2xl font-black text-emerald-300">¡Respuesta Correcta!</h4>
                  <span className="text-sm sm:text-lg font-bold text-white bg-emerald-600/50 px-3 py-0.5 rounded-full">{answer}</span>
                </div>
                {explanation && (
                  <p
                    className="text-xs sm:text-sm md:text-base text-emerald-100 font-medium text-center leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: explanation }}
                  />
                )}
              </div>
            )}
          </div>

          <Citations citations={citations} />
        </div>
      </div>
    </div>
  );
}

export function SolutionSlide({ title, subtitle, functionsToUse, code, language, citations }: SlideProps) {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 h-full bg-[var(--color-app-surface)] relative overflow-y-auto custom-slide-scroll">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-app-text)] flex items-center gap-2 sm:gap-3">
          <Icon icon="mdi:lightbulb-on" className="text-amber-500 shrink-0" />
          <span className="truncate">{title || "Solución Esperada"}</span>
        </h2>
        {subtitle && <p className="text-base sm:text-xl md:text-2xl text-[var(--color-app-primary)] font-semibold mt-1 sm:mt-2">{subtitle}</p>}
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {functionsToUse && functionsToUse.length > 0 && (
          <div className="col-span-1 bg-[var(--color-app-surface-sec)] p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-app-border)] shadow-xl flex flex-col shrink-0">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-3 sm:mb-6 text-[var(--color-app-text)] flex items-center gap-2 sm:gap-3 border-b border-[var(--color-app-border)] pb-2 sm:pb-4">
              <Icon icon="mdi:tools" className="text-[var(--color-app-primary)] text-xl sm:text-3xl" />
              Deberás utilizar:
            </h3>
            <ul className="space-y-2 sm:space-y-4 flex-1 overflow-y-auto pr-1 sm:pr-2">
              {functionsToUse.map((fn, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-4 text-xs sm:text-base md:text-xl font-mono text-[var(--color-app-text)] bg-[var(--color-app-surface)] p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[var(--color-app-border)] shadow-sm">
                  <Icon icon="mdi:code-tags" className="text-[var(--color-app-primary)] shrink-0 text-base sm:text-2xl" />
                  <span className="truncate">{fn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className={`${functionsToUse && functionsToUse.length > 0 ? 'col-span-1 lg:col-span-2' : 'col-span-1 lg:col-span-3'} rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#3e3d32] bg-[#272822] flex flex-col shrink-0`}>
          <div className="bg-[#1e1f1c] px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#3e3d32] flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500"></div>
            <span className="ml-2 sm:ml-4 text-xs sm:text-sm font-bold text-yellow-300/80 uppercase tracking-widest">{language || 'python'}</span>
          </div>
          
          {!revealed ? (
             <div className="flex-1 flex flex-col items-center justify-center bg-[#272822] p-6 sm:p-12 text-center relative overflow-hidden min-h-[220px]">
               <Icon icon="mdi:eye-off-outline" className="text-5xl sm:text-7xl md:text-8xl text-gray-500 mb-3 sm:mb-6 relative z-10" />
               <h3 className="text-base sm:text-2xl md:text-3xl font-bold text-gray-300 mb-4 sm:mb-8 relative z-10">El código está oculto para evitar spoilers</h3>
               <button 
                 onClick={() => setRevealed(true)}
                 className="px-6 py-3 sm:px-10 sm:py-4 bg-[var(--color-app-primary)] hover:brightness-110 text-white rounded-full text-sm sm:text-xl md:text-2xl font-bold shadow-lg transition-all hover:scale-105 relative z-10"
               >
                 Revelar Fragmento de Solución
               </button>
             </div>
          ) : (
             <div className="p-4 sm:p-6 overflow-x-auto text-sm sm:text-base md:text-lg lg:text-xl font-mono leading-snug flex-1 animate-in fade-in duration-300">
               <CodeBlock
                 code={code || "# Código"}
                 language={language}
                 showLineNumbers={true}
                 size="md"
                 className="border-0 shadow-none rounded-none bg-transparent"
               />
             </div>
          )}
        </div>
      </div>
      <Citations citations={citations} />
    </div>
  );
}

