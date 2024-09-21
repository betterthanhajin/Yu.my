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
    <div className="w-full h-full bg-black">
      <PhoneLiquidEffect tiltX={tiltX} tiltY={tiltY} />
    </div>
  );
}

function PhoneLiquidEffect({ tiltX, tiltY }: { tiltX: number; tiltY: number }) {
  const adjustedTiltY = tiltY * -1; // Invert Y-axis for more intuitive movement

  return (
    <div className="w-full h-full overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="liquidGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4169E1" />
            <stop offset="50%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#4169E1" />
          </linearGradient>

          <filter id="liquidTurbulence">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.01 0.05"
              numOctaves="3"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.01 0.05;0.02 0.07;0.01 0.05"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
        </defs>

        {/* Liquid */}
        <g filter="url(#liquidTurbulence)">
          <path
            d={`
              M0,100
              C${25 + tiltX * 0.5},${90 + adjustedTiltY * 0.5}
               ${75 - tiltX * 0.5},${90 + adjustedTiltY * 0.5}
               100,100
              V100 H0 Z
            `}
            fill="url(#liquidGradient)"
          >
            <animate
              attributeName="d"
              dur="3s"
              repeatCount="indefinite"
              values={`
                M0,100
                C${25 + tiltX * 0.5},${90 + adjustedTiltY * 0.5}
                 ${75 - tiltX * 0.5},${90 + adjustedTiltY * 0.5}
                 100,100
                V100 H0 Z;
                
                M0,100
                C${25 + tiltX * 0.5},${92 + adjustedTiltY * 0.5}
                 ${75 - tiltX * 0.5},${92 + adjustedTiltY * 0.5}
                 100,100
                V100 H0 Z;
                
                M0,100
                C${25 + tiltX * 0.5},${90 + adjustedTiltY * 0.5}
                 ${75 - tiltX * 0.5},${90 + adjustedTiltY * 0.5}
                 100,100
                V100 H0 Z;
              `}
            />
          </path>
        </g>

        {/* Bubbles */}
        {[...Array(15)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100}
            cy={100 + Math.random() * 10}
            r={0.5 + Math.random() * 1}
            fill="rgba(255,255,255,0.5)"
          >
            <animate
              attributeName="cy"
              from={100 + Math.random() * 10}
              to={80 + adjustedTiltY * 0.5}
              dur={`${3 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              from={Math.random() * 100}
              to={Math.random() * 100 + tiltX * 0.2}
              dur={`${3 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
