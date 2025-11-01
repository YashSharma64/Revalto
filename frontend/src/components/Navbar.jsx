import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RevaltoLogoIcon from "@/assets/RevaltoLogo";
import LocationIcon from "@/assets/LocationIcon";
import SearchIcon from "@/assets/SearchIcon";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.userName);
    }
  }, []);

  return (
    <>
      {/* Top branding bar */}
      <div className="w-full bg-gray-100 border-b border-gray-200">
        
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <div className="flex items-center gap-4 justify-between py-4 w-full">
            
            {/* Logo Section */}
            <div 
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center gap-2">
                <RevaltoLogoIcon className="h-10 w-10 text-gray-900 flex-shrink-0" />
                <span className="text-2xl font-bold text-gray-900 tracking-tight whitespace-nowrap">
                  Revalto
                </span>
              </div>
            </div>

            {/* Location Button */}
            <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2.5 transition-colors shrink-0 whitespace-nowrap">
              <LocationIcon className="w-[18px] h-[18px] text-gray-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Location</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 min-w-0 max-w-2xl mx-4">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <SearchIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search products here..."
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 hover:bg-white focus:bg-white focus:border-gray-600 transition-colors py-3 pl-12 pr-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-500/20"
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4 shrink-0">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors flex-shrink-0"
                onClick={() => navigate("/login")}
              >
                <img
                  src="/user.png"
                  alt="User"
                  className="h-8 w-8 flex-shrink-0"
                />
                {userName && (
                  <span className="text-sm font-medium text-gray-800 capitalize hidden md:block whitespace-nowrap">
                    {userName}
                  </span>
                )}
              </div>
              <button className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors flex-shrink-0">
                <img
                  src="/shopping-cart.png"
                  alt="Shopping cart"
                  className="h-8 w-8 flex-shrink-0"
                />
              </button>
              <button className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors flex-shrink-0">
                <img
                  src="/loan.png"
                  alt="Loan"
                  className="h-8 w-8 flex-shrink-0"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

