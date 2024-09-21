"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [tiltX, setTiltX] = useState(0);

  useEffect(() => {
    function handleOrientation(event: DeviceOrientationEvent) {
      const x = event.gamma ?? 0; // Left to right tilt
      // const y = event.beta ?? 0; // Front to back tilt
      setTiltX(Math.min(Math.max(x, -45), 45));
      // setTiltY(Math.min(Math.max(y, -45), 45));
    }

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <div className="w-full h-full bg-orange-400">
      <FlowingLiquidEffect tiltX={tiltX} />
    </div>
  );
}

function FlowingLiquidEffect({ tiltX }: { tiltX: number }) {
  // const liquidHeight = 50 - Math.abs(tiltX) * 0.5 - Math.max(0, tiltY) * 0.5;
  return (
    <div className="w-full h-full overflow-hidden relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orangeJuice" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
        {/* Liquid flowing over the top */}
        {Math.abs(tiltX) > 20 && (
          <path
            d={`
              M${tiltX > 0 ? 100 : 0},0
              Q${250 + tiltX * 1.5},10 ${tiltX > 0 ? 0 : 100},0
              Z
            `}
            fill="url(#orangeJuice)"
            opacity={Math.min(Math.abs(tiltX) * 0.02, 0.8)}
          />
        )}

        <g id="bubbles">
          <circle cx="5" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="15" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="9s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="25" cy="100" r="0.4" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="7s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="35" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="45" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="55" cy="100" r="0.4" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="8.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="65" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="7.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="75" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="9.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="85" cy="100" r="0.4" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="95" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="10" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="7.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="20" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="8.7s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="30" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="6.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="40" cy="100" r="0.4" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="9.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="7.7s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="8.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="70" cy="100" r="0.4" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="6.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="9.7s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="90" cy="100" r="0.2" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="7.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="100" cy="100" r="0.3" fill="rgba(255,255,255,0.5)">
            <animate
              attributeName="cy"
              values="100;20;100"
              dur="8.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
