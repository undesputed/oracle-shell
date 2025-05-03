"use client"

export function SynthwaveGrid() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="grid-bg h-full w-full"></div>

      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(to right, rgba(255, 0, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.2) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center bottom;
          height: 100%;
          width: 100%;
          position: absolute;
          bottom: -40%;
          animation: grid-move 15s linear infinite;
        }
        
        @keyframes grid-move {
          0% {
            background-position: center 0;
          }
          100% {
            background-position: center 40px;
          }
        }
      `}</style>
    </div>
  )
}
