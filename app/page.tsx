import React, { useEffect, useState } from "react";

export default function Home() {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    function handleOrientation(event: DeviceOrientationEvent) {
      const x = event.beta ?? 0;
      const y = event.gamma ?? 0;
      setTiltX(Math.min(Math.max(y, -45), 45));
      setTiltY(Math.min(Math.max(x, -45), 45));
    }

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <div className="w-full h-full">
      <WaterEffect tiltX={tiltX} tiltY={tiltY} />
    </div>
  );
}

function WaterEffect({ tiltX, tiltY }: { tiltX: number; tiltY: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#a00000",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="turbulence">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.01 0.01"
              numOctaves="3"
              seed="1"
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                dur="60s"
                values="0.01 0.01;0.02 0.02;0.01 0.01"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>

          <radialGradient id="waterGradient">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="100%" stopColor="#990000" />
          </radialGradient>
        </defs>

        <g
          style={{
            transform: `translate(${tiltX * 0.5}px, ${tiltY * 0.5}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#waterGradient)"
            filter="url(#turbulence)"
          />
        </g>

        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="2"
            fill="rgba(255,255,255,0.5)"
          >
            <animate
              attributeName="cy"
              values={`${100 + Math.random() * 10}%;-10%`}
              dur={`${Math.random() * 4 + 6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values={`${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${Math.random() * 10 + 10}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
