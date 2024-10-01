import React, { useEffect, useState } from "react";

export default function Home() {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    function handleOrientation(event: DeviceOrientationEvent) {
      const x = event.gamma ?? 0; // Left to right tilt
      const y = event.beta ?? 0; // Front to back tilt
      setTiltX(Math.min(Math.max(x, -45), 45));
      setTiltY(Math.min(Math.max(y, -45), 45));
    }

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <div className="w-full h-full bg-black">
      <FlowingLiquidEffect tiltX={tiltX} tiltY={tiltY} />
    </div>
  );
}

function FlowingLiquidEffect({
  tiltX,
  tiltY,
}: {
  tiltX: number;
  tiltY: number;
}) {
  const liquidHeight = 50 - Math.abs(tiltX) * 0.5 - Math.max(0, tiltY) * 0.5;
  const liquidLeft = 50 + tiltX * 0.8;

  return (
    <div className="w-full h-full overflow-hidden relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="orangeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>

        {/* Main liquid body */}
        <path
          d={`
            M0,100
            L0,${100 - liquidHeight}
            Q${liquidLeft},${95 - liquidHeight} 100,${100 - liquidHeight}
            L100,100
            Z
          `}
          fill="url(#orangeGradient)"
        />

        {/* Liquid flowing over the top */}
        {Math.abs(tiltX) > 20 && (
          <path
            d={`
              M${tiltX > 0 ? 100 : 0},0
              Q${50 + tiltX * 1.5},10 ${tiltX > 0 ? 0 : 100},0
              Z
            `}
            fill="url(#orangeGradient)"
            opacity={Math.min(Math.abs(tiltX) * 0.02, 0.8)}
          />
        )}
      </svg>

      {/* Bubbles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-50"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${100 - liquidHeight + Math.random() * liquidHeight}%`,
            transition: "all 0.5s ease-out",
            transform: `translate(${tiltX * 0.2}px, ${
              -Math.abs(tiltX) * 0.5
            }px)`,
          }}
        />
      ))}
    </div>
  );
}
