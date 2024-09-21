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
    <div className="w-full h-full bg-gray-800">
      <LiquidInCupEffect tiltX={tiltX} tiltY={tiltY} />
    </div>
  );
}

function LiquidInCupEffect({ tiltX, tiltY }: { tiltX: number; tiltY: number }) {
  const liquidHeight = 70 - (Math.abs(tiltX) + Math.abs(tiltY)) * 0.2;
  const liquidRotation = tiltX * 0.5;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="300" height="400" viewBox="0 0 300 400">
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
              numOctaves="2"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.01 0.05;0.02 0.1;0.01 0.05"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>

          <clipPath id="cupClip">
            <path d="M50,100 L70,350 C70,380 230,380 230,350 L250,100 Z" />
          </clipPath>
        </defs>

        {/* Cup */}
        <path
          d="M50,100 L70,350 C70,380 230,380 230,350 L250,100 Z"
          fill="none"
          stroke="white"
          strokeWidth="5"
        />

        {/* Liquid */}
        <g clipPath="url(#cupClip)">
          <rect
            x="0"
            y={400 - liquidHeight + "%"}
            width="300"
            height={liquidHeight + "%"}
            fill="url(#liquidGradient)"
            filter="url(#liquidTurbulence)"
            transform={`rotate(${liquidRotation} 150 ${
              400 - liquidHeight / 2
            })`}
          >
            <animate
              attributeName="y"
              values={`${400 - liquidHeight}%;${405 - liquidHeight}%;${
                400 - liquidHeight
              }%`}
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* Bubbles */}
        {[...Array(10)].map((_, i) => (
          <circle
            key={i}
            cx={75 + Math.random() * 150}
            cy="350"
            r={1 + Math.random() * 2}
            fill="rgba(255,255,255,0.5)"
          >
            <animate
              attributeName="cy"
              from="350"
              to={400 - liquidHeight + 20}
              dur={`${3 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
