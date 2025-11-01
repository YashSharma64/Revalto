export default function BagIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 7l1.5-3h9L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="4" y="7" width="16" height="13" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="11" width="6" height="4" rx="1" fill="currentColor"/>
    </svg>
  );
}

