"use client"

export function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-screen w-screen overflow-hidden">
      <div className="scanlines absolute inset-0 bg-scanline opacity-10"></div>
      <div className="crt-flicker absolute inset-0 opacity-20"></div>
      <div className="vignette absolute inset-0 rounded-[50%] shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]"></div>

      <style jsx>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 51%
          );
          background-size: 100% 4px;
          animation: scanline 0.2s linear infinite;
        }
        
        .crt-flicker {
          background: rgba(255, 255, 255, 0.1);
          animation: flicker 0.3s infinite alternate;
        }
        
        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 4px;
          }
        }
        
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.2;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
