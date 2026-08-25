import senatiLogo from '../../assets/senati.png';
import sandboxLogo from '../../assets/sandbox.png';
import oracleLogo from '../../assets/oracle.png';

interface AppLogoProps {
  variant?: 'default' | 'presentation';
}

export function AppLogo({ variant = 'default' }: AppLogoProps) {
  if (variant === 'presentation') {
    return (
      <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
        <img src={sandboxLogo} alt="Sandbox" className="h-5 sm:h-6 md:h-7 object-contain drop-shadow-sm" />
        <div className="w-[1.5px] sm:w-[2px] h-5 sm:h-6 md:h-8 bg-[var(--color-app-border)] opacity-60 rounded-full"></div>
        <img src={senatiLogo} alt="Senati" className="h-5 sm:h-7 md:h-8 object-contain drop-shadow-sm" />
        <div className="w-[1.5px] sm:w-[2px] h-5 sm:h-6 md:h-8 bg-[var(--color-app-border)] opacity-60 rounded-full hidden xs:block sm:block"></div>
        <img src={oracleLogo} alt="Oracle" className="h-4 sm:h-4.5 md:h-5 object-contain drop-shadow-sm hidden xs:block sm:block" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <img src={sandboxLogo} alt="Sandbox" className="h-6 sm:h-8 object-contain drop-shadow-sm" />
    </div>
  );
}

