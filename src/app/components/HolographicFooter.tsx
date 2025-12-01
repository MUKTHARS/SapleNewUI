'use client';

export function HolographicFooter() {

  return (
    <footer className="relative overflow-hidden border-t border-green-400/20">
      <div className="container mx-auto px-4 py-1 relative z-10 text-center text-gray-500 font-mono text-xs tracking-wider h-[45px]">
          <p>SYSTEM STATUS: ONLINE | © {new Date().getFullYear()} SAPLE.AI</p>
          <p className="mt-1">ALL SYSTEMS OPERATIONAL</p>
      </div>
    </footer>
  );
}