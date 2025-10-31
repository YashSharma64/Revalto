import LoginForm from "@/components/login-form.jsx"; // Adjust path if needed

function BrandLogo() {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-transparent">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-zinc-300" 
      >
        <path d="M7.74 13.31l1.51 1.51a3.02 3.02 0 004.27 0l5.88-5.88a1 1 0 000-1.41l-4.27-4.27a1 1 0 00-1.41 0l-5.88 5.88a3.02 3.02 0 000 4.27z" />
        <path d="M12.91 5.92L6.03 12.8" />
        <path d="M5.21 17.02a1 1 0 01-1.42 0L1.75 14.99a1 1 0 010-1.41l6.18-6.18a1 1 0 011.41 0l2.03 2.03a1 1 0 010 1.41l-6.18 6.18z" />
        <circle cx="8.5" cy="8.5" r="1.5" /> 
      </svg>
      
      <span className="font-extrabold text-2xl tracking-tight text-zinc-300">
        Revelto.
      </span>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      
      <div className="absolute left-8 top-8 z-20">
        <BrandLogo />
      </div>

      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
        
        <div className="relative z-10 flex items-center justify-center bg-zinc-900 p-8">
          <div className="w-full max-w-md">
            <LoginForm className="text-white" mode="Sign up"/>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div 
            className="absolute inset-0 h-full w-full bg-cover bg-center pointer-events-none"
            style={{ 
              backgroundImage: "url('https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg')" 
            }}
            role="img"
            aria-label="Dark abstract technology background"
          >
            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
}