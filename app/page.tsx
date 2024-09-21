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
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((permissionState: string) => {
            if (permissionState === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
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

        <g
          id="wave-layers"
          style={{
            transform: `translateY(${tiltY * 0.2}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
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

        <g
          id="bubbles"
          style={{
            transform: `translate(${tiltX * 0.2}px, ${tiltY * 0.2}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
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
