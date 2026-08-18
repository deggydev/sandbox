import senatiLogo from '../../assets/senati.png';
import sandboxLogo from '../../assets/sandbox.png';
import oracleLogo from '../../assets/oracle.png';

interface AppLogoProps {
  variant?: 'default' | 'presentation';
}

export function AppLogo({ variant = 'default' }: AppLogoProps) {
  if (variant === 'presentation') {
    return (
      <div className="flex items-center gap-5">
        <img src={sandboxLogo} alt="Sandbox" className="h-7 object-contain drop-shadow-sm" />
        <div className="w-[2px] h-8 bg-[var(--color-app-border)] opacity-60 rounded-full"></div>
        <img src={senatiLogo} alt="Senati" className="h-8 object-contain drop-shadow-sm" />
        <div className="w-[2px] h-8 bg-[var(--color-app-border)] opacity-60 rounded-full"></div>
        <img src={oracleLogo} alt="Oracle" className="h-5 object-contain drop-shadow-sm" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <img src={sandboxLogo} alt="Sandbox" className="h-8 object-contain drop-shadow-sm" />
    </div>
  );
}
