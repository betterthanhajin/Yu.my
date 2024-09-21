"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOrientationSupported, setIsOrientationSupported] = useState(true);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    let orientationHandler: ((event: DeviceOrientationEvent) => void) | null =
      null;

    function requestOrientationPermission() {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    function handleOrientation(event: DeviceOrientationEvent) {
      const x = event.beta ?? 0;
      const y = event.gamma ?? 0;

      setTiltX(Math.min(Math.max(y, -45), 45));
      setTiltY(Math.min(Math.max(x, -45), 45));
    }

    orientationHandler = handleOrientation;

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      requestOrientationPermission();
    } else {
      console.log("Device orientation not supported");
      setIsOrientationSupported(false);
    }

    return () => {
      if (orientationHandler) {
        window.removeEventListener("deviceorientation", orientationHandler);
      }
    };
  }, []);

  if (!isOrientationSupported) {
    return <div>Device orientation not supported on this device.</div>;
  }

  return (
    <section className="w-full h-full relative" ref={containerRef}>
      <WineEffect tiltX={tiltX} tiltY={tiltY} />
    </section>
  );
}

function WineEffect({ tiltX, tiltY }: { tiltX: number; tiltY: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#b40000b3",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${tiltX}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <defs>
          <linearGradient id="wineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(180,0,0,0.7)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(160,0,0,0.6)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        <g
          style={{
            transform: `translate(${tiltX * 0.5}px, ${tiltY * 0.5}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <path
            d={`M0 20 
               Q${50 + tiltX} ${20 + tiltY * 0.5}, 100 20 
               V100 H0 Z`}
            fill="url(#wineGradient)"
          />
        </g>

        <g
          id="bubbles"
          style={{
            transform: `translate(${tiltX * 0.8}px, ${tiltY * 0.8}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100}
              cy={100}
              r={Math.random() * 0.3 + 0.1}
              fill="rgba(255,255,255,0.5)"
            >
              <animate
                attributeName="cy"
                values={`100;${20 + Math.random() * 60};100`}
                dur={`${Math.random() * 4 + 6}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}
