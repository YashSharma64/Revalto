export default function RevaltoLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Minimal marketplace logo - overlapping squares representing exchange/trade */}
      <rect x="5" y="5" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="11" y="11" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
      <path 
        d="M9 9l6 6M9 15l6-6" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.8"
      />
    </svg>
  );
}

