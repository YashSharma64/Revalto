import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RevaltoLogoIcon from "@/assets/RevaltoLogo";

export default function SellPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUserName(u?.userName || u?.name || "");
      } catch (_) {
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="w-full bg-gradient-to-b from-[#3b82f6] to-[#60a5f] text-white">
        <div className="mx-auto max-w-6xl px-3">
          <div className="flex items-center justify-between h-24">
            <button
              onClick={() => navigate(-1)}
              className="font-poppins text-white/90 hover:text-white text-sm font-medium"
            >
              Back
            </button>
            <div className="flex items-center gap-3 ml-4">
              <RevaltoLogoIcon className="w-6 h-6 text-white" />
              <span className="text-xl font-bold">Revalto</span>
            </div>
            <div className="flex items-center gap-2">
              
              
              <span className="text-sm font-medium truncate max-w-[140px]">
                {userName || "Welcome Guest"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Add krne ke liye products to sell */}
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center ">
          <h1 className="font-poppins text-xs sm:text-lg font-semibold text-gray-800 mb-10 pb-10">
            Turn your unused items into cash — start selling now!

          </h1>

          <button
            className="font-poppins mx-auto inline-flex items-center justify-center rounded-lg bg-blue-700 hover:bg-green-500 text-white px-10 py-2 text-sm font-semibold shadow "
          >
            Add Now
          </button>

          <div className="my-8 border-t border-gray-300/70" />

          <p className="text-gray-500 py-20">Looks empty! Time to sell your first product!</p>
        </div>
      </div>
    </div>
  );
}

 