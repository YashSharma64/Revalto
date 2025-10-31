import React, { useEffect, useState } from "react";


export default function Homepage() {
  const [userName, setUserName] = useState("");
    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.userName); 
    }
  }, []);
  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900">
      <div className="w-full bg-gray-100">
        <div className="mx-auto flex max-w-7xl items-center gap-1  text-lg text-gray-700">
         
          <img
            src="/Revalto.png"
            alt="Revalto logo"
            className="h-20 w-auto sm:20 md:h-25 shrink-0"
          />
          <span className=" sm:block">- Buy Smart. Sell Fast. Revalto’s got your back. Everything is in one Place...</span>
        </div>
      </div>

      {/* Header: location, search, actions ek hi me*/}
      <div className="mx-auto mb-5 w-full">
        <div className="flex flex-row flex-nowrap items-center gap-3 justify-between bg-white px-4 py-7 ">
      
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2 shrink-0 ml-10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M12 22s7-5.686 7-12a7 7 0 10-14 0c0 6.314 7 12 7 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span className="text-sm">Location</span>
          </button>

          {/* Search */}
          <div className="flex-1 min-w-0 ml-5">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products here..."
                className=" min-w-[800px] rounded-xl border border-gray-300 bg-white py-3.5 pl-16 pr-4 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-center items-center gap-15 shrink-0 mr-20 ml-10">
            <div className="flex items-center gap-2">
              <img
                src="/user.png"
                alt="Header actions"
                className="h-10 w-auto sm:h-8"
              />
              {userName && (
                <span className="text-lg font-medium text-gray-800 capitalize">
                  {userName}
                </span>
              )}
            </div>
            <img
              src="/shopping-cart.png"
              alt="Header actions"
              className="h-10 w-auto sm:h-8"
            />
            <img
              src="/loan.png"
              alt="Header actions"
              className="h-10 w-auto sm:h-8"
            />
          </div>
        </div>
      </div>

      {/* Ye slider hai */}
      <div className="w-full mt-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-[28px]">
            <div className="grid grid-cols-[90px_1fr_90px] items-stretch sm:grid-cols-[130px_1fr_130px]">
           
              <div className="grid place-items-center bg-rose-300 text-white">
                <span className="text-5xl font-medium">&lt;</span>
              </div>
              <div className="flex items-center justify-center gap-6 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 px-8 py-20 text-white sm:py-28">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/20 sm:h-24 sm:w-24">
                  <BagIcon className="h-12 w-12 text-white sm:h-14 sm:w-14" />
                </div>
                <div className="text-center text-7xl font-bold tracking-tight sm:text-8xl">Revalto</div>
              </div>
        
              <div className="grid place-items-center bg-rose-300 text-white">
                <span className="text-5xl font-medium">&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

function BagIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 7l1.5-3h9L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="4" y="7" width="16" height="13" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="11" width="6" height="4" rx="1" fill="currentColor"/>
    </svg>
  );
}