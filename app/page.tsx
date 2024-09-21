"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const WineEffectRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOrientationSupported, setIsOrientationSupported] = useState(true);

  useEffect(() => {
    let orientationHandler: ((event: DeviceOrientationEvent) => void) | null =
      null;

    function requestOrientationPermission() {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    function handleOrientation(event: DeviceOrientationEvent) {
      let x = event.beta ?? 0;
      let y = event.gamma ?? 0;

      let maxX = 0;
      let maxY = 0;

      // if (x > 90) {
      //   x = 90;
      // }
      // if (x < -90) {
      //   x = -90;
      // }

      x += 40;
      y += 10;

      if (
        WineEffectRef.current &&
        typeof window !== "undefined" &&
        containerRef.current
      ) {
        maxX = containerRef.current.clientWidth;
        maxY = containerRef.current.clientHeight;
        WineEffectRef.current.style.left = `${(maxX * x) / 90 - 10}px`;
        WineEffectRef.current.style.top = `${(maxY * y) / 180 - 10}px`;
        // alert(WineEffectRef.current.style.left);
        // alert(WineEffectRef.current.style.top);
      }
    }

    orientationHandler = handleOrientation;

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      requestOrientationPermission();
    } else {
      alert("Device orientation not supported");
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
      <WineEffect WineEffectRef={WineEffectRef} />
    </section>
  );
}

function WineEffect({
  WineEffectRef,
}: {
  WineEffectRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#a00000cc",
      }}
      ref={WineEffectRef}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 80">
        <defs>
          <linearGradient id="wineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: "rgba(180,0,0,0.7)",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgba(160,0,0,0.6)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <filter id="waveEffect">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <rect
          x="0"
          y="20"
          width="100%"
          height="100%"
          fill="url(#wineGradient)"
        />

        <g id="wave-layers">
          <rect
            x="0"
            y="20"
            width="100%"
            height="100%"
            fill="rgba(190,0,0,0.3)"
            filter="url(#waveEffect)"
          >
            <animate
              attributeName="y"
              values="10;25;10"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="0"
            y="20"
            width="100%"
            height="100%"
            fill="rgba(200,0,0,0.2)"
            filter="url(#waveEffect)"
          >
            <animate
              attributeName="y"
              values="25;10;25"
              dur="5s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="0"
            y="20"
            width="100%"
            height="100%"
            fill="rgba(210,50,50,0.15)"
            filter="url(#waveEffect)"
          >
            <animate
              attributeName="y"
              values="15;30;15"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

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
    </div>
  );
}
