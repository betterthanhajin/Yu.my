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
          <filter id="turbulence">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.01"
              numOctaves="2"
              result="turbulence"
            />
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* 물결 효과 */}
        <path
          d={`
          M0,50
          Q25,${45 + Math.sin(Date.now() / 1000) * 5} 50,50
          T100,50
          V100 H0 Z
          `}
          fill="url(#orangeJuice)"
          filter="url(#turbulence)"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values={`
            M0,50 Q25,${45 + Math.sin(0) * 5} 50,50 T100,50 V100 H0 Z;
            M0,50 Q25,${45 + Math.sin(Math.PI / 2) * 5} 50,50 T100,50 V100 H0 Z;
            M0,50 Q25,${45 + Math.sin(Math.PI) * 5} 50,50 T100,50 V100 H0 Z;
            M0,50 Q25,${
              45 + Math.sin((3 * Math.PI) / 2) * 5
            } 50,50 T100,50 V100 H0 Z;
            M0,50 Q25,${45 + Math.sin(2 * Math.PI) * 5} 50,50 T100,50 V100 H0 Z
            `}
          />
        </path>
        {/* Liquid flowing over the top */}
        {Math.abs(tiltX) > 20 && (
          <path
            d={`
            M${tiltX > 0 ? 100 : 0},0
            Q${50 + tiltX * 4.5},30 ${tiltX > 0 ? 0 : 100},0
            Z
            `}
            fill="url(#orangeJuice)"
            opacity={Math.min(Math.abs(tiltX) * 0.03, 1)}
          />
        )}

        {/* 버블 효과 */}
        <g id="bubbles">
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100}
              cy={100 + Math.random() * 20}
              r={0.5 + Math.random() * 1.5}
              fill="rgba(255,255,255,0.7)"
            >
              <animate
                attributeName="cy"
                values={`${100 + Math.random() * 20};-10`}
                dur={`${5 + Math.random() * 5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={`${0.5 + Math.random() * 1.5};${0.2 + Math.random()}`}
                dur={`${5 + Math.random() * 5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
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
