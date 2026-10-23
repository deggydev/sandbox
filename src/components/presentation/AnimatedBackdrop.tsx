export function AnimatedBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-[var(--color-app-primary)]"
      >
        <defs>
          <pattern id="ab-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          </pattern>
          <linearGradient id="ab-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#ab-grid)" />

        <g
          className="ab-float"
          fill="none"
          stroke="url(#ab-fade)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        >
          <path className="ab-trace" pathLength="100" d="M90 760H360L470 650H760" />
          <path className="ab-trace" pathLength="100" style={{ animationDelay: '1.2s' }} d="M1180 130h180l90 90h160" />
          <path className="ab-trace" pathLength="100" style={{ animationDelay: '2.4s' }} d="M60 200h150v120h190" />
          <path className="ab-trace" pathLength="100" style={{ animationDelay: '0.6s' }} d="M1440 720h-120l-90-90" />
        </g>

        <g fill="currentColor" opacity="0.45">
          <circle className="ab-pulse" cx="760" cy="650" r="6" />
          <circle className="ab-pulse" cx="1180" cy="130" r="6" style={{ animationDelay: '0.8s' }} />
          <circle className="ab-pulse" cx="400" cy="320" r="6" style={{ animationDelay: '1.6s' }} />
          <circle className="ab-pulse" cx="1440" cy="720" r="6" style={{ animationDelay: '2.2s' }} />
          <circle cx="160" cy="560" r="3" />
          <circle cx="1320" cy="420" r="3" />
        </g>
      </svg>
    </div>
  );
}
