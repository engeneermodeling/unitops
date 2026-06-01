export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle with gradient */}
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="url(#gradient)"
        strokeWidth="5"
        fill="none"
      />
      
      {/* Simple thermometer */}
      <g stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="30" x2="50" y2="60" />
        <circle cx="50" cy="65" r="6" fill="url(#gradient)" stroke="none" />
      </g>
      
      {/* Simple flame */}
      <path
        d="M50 45 Q47 40 50 35 Q53 40 50 45"
        fill="url(#gradient)"
      />
      
      {/* Gradient */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
    </svg>
  );
}