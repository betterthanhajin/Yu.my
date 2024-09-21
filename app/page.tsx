"use client";
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
        backgroundColor: "#4B0082", // Indigo background
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="waterGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4169E1" /> {/* Royal Blue */}
            <stop offset="50%" stopColor="#8A2BE2" /> {/* Blue Violet */}
            <stop offset="100%" stopColor="#4169E1" /> {/* Royal Blue */}
          </linearGradient>

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
                dur="30s"
                values="0.01 0.01;0.02 0.02;0.01 0.01"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>

          <mask id="liquidMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <path d={`M0,50 Q50,${50 + tiltY} 100,50 V100 H0 Z`} fill="black">
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values={`
                  M0,50 Q50,${50 + tiltY} 100,50 V100 H0 Z;
                  M0,55 Q50,${55 + tiltY} 100,55 V100 H0 Z;
                  M0,50 Q50,${50 + tiltY} 100,50 V100 H0 Z
                `}
              />
            </path>
          </mask>
        </defs>

        <g
          style={{
            transform: `rotate(${tiltX * 0.2}deg)`,
            transformOrigin: "center",
            transition: "transform 0.3s ease-out",
          }}
        >
          <rect
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            fill="url(#waterGradient)"
            filter="url(#turbulence)"
            mask="url(#liquidMask)"
          />
        </g>

        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="1"
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
