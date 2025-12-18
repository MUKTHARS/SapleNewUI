'use client';

export function HolographicFooter() {
  return (
    <footer className="relative overflow-hidden bg-black/80 backdrop-blur-md border-t border-[#0C7075]/20">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0C7075] to-transparent opacity-30"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left side - Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-white/60 tracking-wide">
              SYSTEM STATUS: <span className="text-green-400">ONLINE</span>
            </span>
          </div>

          {/* Center - Copyright */}
          <div className="text-white/40 text-xs tracking-wide">
            © {new Date().getFullYear()} <span className="text-[#0C7075] font-medium">SAPLE.AI</span>
          </div>

          {/* Right side - All Systems */}
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
