import BagIcon from "@/assets/BagIcon";

export default function HeroSection() {
  return (
    <div className="w-full mt-2 sm:mt-4">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="overflow-hidden rounded-2xl sm:rounded-[28px]">
          <div className="grid grid-cols-[60px_1fr_60px] sm:grid-cols-[90px_1fr_90px] md:grid-cols-[130px_1fr_130px] items-stretch">
           
            <div className="grid place-items-center bg-rose-300 text-white hover:bg-rose-400 transition-colors cursor-pointer">
              <span className="text-3xl sm:text-4xl md:text-5xl font-medium">&lt;</span>
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-28 text-white">
              <div className="grid h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 place-items-center rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm">
                <BagIcon className="h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 text-white" />
              </div>
              <div className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">Revalto</div>
            </div>
      
            <div className="grid place-items-center bg-rose-300 text-white hover:bg-rose-400 transition-colors cursor-pointer">
              <span className="text-3xl sm:text-4xl md:text-5xl font-medium">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

