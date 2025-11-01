import BagIcon from "@/assets/BagIcon";

export default function HeroSection() {
  return (
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
  );
}

