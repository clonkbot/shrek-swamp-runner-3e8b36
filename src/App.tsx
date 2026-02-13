import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  vx: number;
  vy: number;
}

interface Footprint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}

interface Firefly {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

function Shrek({ position, direction, isRunning }: { position: Position; direction: number; isRunning: boolean }) {
  return (
    <div
      className="absolute transition-transform duration-75 pointer-events-none z-20"
      style={{
        left: position.x,
        top: position.y,
        transform: `scaleX(${direction})`,
      }}
    >
      {/* Shrek SVG Character */}
      <svg width="80" height="100" viewBox="0 0 80 100" className={isRunning ? 'animate-bounce' : ''}>
        {/* Body */}
        <ellipse cx="40" cy="70" rx="25" ry="28" fill="#5D8A3E" />

        {/* Vest */}
        <path d="M20 55 Q40 50 60 55 L55 90 Q40 95 25 90 Z" fill="#8B6914" />
        <line x1="40" y1="55" x2="40" y2="90" stroke="#6B4F0F" strokeWidth="2" />

        {/* Head */}
        <ellipse cx="40" cy="30" rx="22" ry="25" fill="#6B9B4A" />

        {/* Ears */}
        <ellipse cx="12" cy="20" rx="8" ry="12" fill="#6B9B4A" transform="rotate(-20 12 20)" />
        <ellipse cx="12" cy="20" rx="5" ry="8" fill="#4A7A34" transform="rotate(-20 12 20)" />
        <ellipse cx="68" cy="20" rx="8" ry="12" fill="#6B9B4A" transform="rotate(20 68 20)" />
        <ellipse cx="68" cy="20" rx="5" ry="8" fill="#4A7A34" transform="rotate(20 68 20)" />

        {/* Eyes */}
        <ellipse cx="30" cy="25" rx="8" ry="9" fill="#FFFEF0" />
        <ellipse cx="50" cy="25" rx="8" ry="9" fill="#FFFEF0" />
        <circle cx="32" cy="26" r="4" fill="#5D4E37" />
        <circle cx="52" cy="26" r="4" fill="#5D4E37" />
        <circle cx="33" cy="25" r="1.5" fill="#FFF" />
        <circle cx="53" cy="25" r="1.5" fill="#FFF" />

        {/* Eyebrows */}
        <path d="M22 18 Q30 14 38 18" stroke="#4A7A34" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M42 18 Q50 14 58 18" stroke="#4A7A34" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <ellipse cx="40" cy="35" rx="6" ry="5" fill="#5A8A3A" />
        <circle cx="36" cy="35" r="2" fill="#4A7A34" />
        <circle cx="44" cy="35" r="2" fill="#4A7A34" />

        {/* Mouth */}
        <path d="M30 45 Q40 52 50 45" stroke="#4A7A34" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Arms */}
        <ellipse cx="12" cy="65" rx="8" ry="12" fill="#5D8A3E" className={isRunning ? 'animate-pulse' : ''} />
        <ellipse cx="68" cy="65" rx="8" ry="12" fill="#5D8A3E" className={isRunning ? 'animate-pulse' : ''} />

        {/* Legs */}
        <ellipse cx="30" cy="95" rx="10" ry="6" fill="#5D4037" />
        <ellipse cx="50" cy="95" rx="10" ry="6" fill="#5D4037" />
      </svg>
    </div>
  );
}

function Footprints({ footprints }: { footprints: Footprint[] }) {
  return (
    <>
      {footprints.map((fp) => (
        <div
          key={fp.id}
          className="absolute pointer-events-none z-10 transition-opacity duration-1000"
          style={{
            left: fp.x,
            top: fp.y,
            opacity: fp.opacity,
            transform: `rotate(${fp.rotation}deg)`,
          }}
        >
          <svg width="30" height="20" viewBox="0 0 30 20">
            <ellipse cx="15" cy="12" rx="10" ry="6" fill="rgba(59, 42, 28, 0.4)" />
            <circle cx="8" cy="5" r="3" fill="rgba(59, 42, 28, 0.3)" />
            <circle cx="15" cy="3" r="3" fill="rgba(59, 42, 28, 0.3)" />
            <circle cx="22" cy="5" r="3" fill="rgba(59, 42, 28, 0.3)" />
          </svg>
        </div>
      ))}
    </>
  );
}

function Fireflies({ fireflies }: { fireflies: Firefly[] }) {
  return (
    <>
      {fireflies.map((ff) => (
        <div
          key={ff.id}
          className="absolute rounded-full pointer-events-none animate-pulse"
          style={{
            left: `${ff.x}%`,
            top: `${ff.y}%`,
            width: ff.size,
            height: ff.size,
            backgroundColor: '#FFFACD',
            boxShadow: `0 0 ${ff.size * 2}px ${ff.size}px rgba(255, 250, 100, 0.6)`,
            animationDelay: `${ff.delay}s`,
            animationDuration: `${ff.duration}s`,
          }}
        />
      ))}
    </>
  );
}

function SwampBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2f1a] via-[#0d1f0d] to-[#0a1a0a]" />

      {/* Fog layers */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-[#2d4a2d] to-transparent top-1/4 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-[#3d5a3d] to-transparent top-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute w-full h-40 bg-gradient-to-r from-transparent via-[#1d3a1d] to-transparent top-3/4 animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      {/* Swamp water at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#1a3020] via-[#1a3020]/80 to-transparent" />

      {/* Lily pads */}
      <svg className="absolute bottom-4 left-[10%] w-16 h-12 opacity-40" viewBox="0 0 64 48">
        <ellipse cx="32" cy="24" rx="28" ry="18" fill="#2d5a2d" />
        <path d="M32 6 L32 24" stroke="#1a3a1a" strokeWidth="2" />
      </svg>
      <svg className="absolute bottom-8 right-[20%] w-20 h-14 opacity-30" viewBox="0 0 64 48">
        <ellipse cx="32" cy="24" rx="28" ry="18" fill="#2d5a2d" />
        <path d="M32 6 L32 24" stroke="#1a3a1a" strokeWidth="2" />
      </svg>
      <svg className="absolute bottom-2 left-[60%] w-12 h-10 opacity-35" viewBox="0 0 64 48">
        <ellipse cx="32" cy="24" rx="28" ry="18" fill="#3d6a3d" />
        <path d="M32 6 L32 24" stroke="#2a4a2a" strokeWidth="2" />
      </svg>

      {/* Trees silhouettes */}
      <svg className="absolute left-0 bottom-0 w-32 h-64 opacity-60" viewBox="0 0 128 256">
        <path d="M64 0 L20 180 L50 180 L50 256 L78 256 L78 180 L108 180 Z" fill="#0a150a" />
      </svg>
      <svg className="absolute right-0 bottom-0 w-40 h-72 opacity-50" viewBox="0 0 160 288">
        <path d="M80 0 L20 200 L55 200 L55 288 L105 288 L105 200 L140 200 Z" fill="#0a150a" />
      </svg>
      <svg className="absolute left-1/4 bottom-0 w-24 h-48 opacity-40" viewBox="0 0 96 192">
        <path d="M48 0 L12 140 L36 140 L36 192 L60 192 L60 140 L84 140 Z" fill="#0a150a" />
      </svg>

      {/* Moon */}
      <div className="absolute top-8 right-12 md:top-12 md:right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#FFFACD] to-[#F0E68C] opacity-70 blur-[1px]"
           style={{ boxShadow: '0 0 60px 20px rgba(255, 250, 100, 0.2)' }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
           }}
      />
    </div>
  );
}

export default function App() {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState<Velocity>({ vx: 3, vy: 2 });
  const [direction, setDirection] = useState(1);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const footprintId = useRef(0);
  const lastFootprint = useRef(0);
  const animationRef = useRef<number>(0);

  // Generate fireflies on mount
  useEffect(() => {
    const flies: Firefly[] = [];
    for (let i = 0; i < 20; i++) {
      flies.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 70 + 10,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        size: 3 + Math.random() * 4,
      });
    }
    setFireflies(flies);
  }, []);

  const addFootprint = useCallback((x: number, y: number, vx: number) => {
    const now = Date.now();
    if (now - lastFootprint.current < 200) return;
    lastFootprint.current = now;

    const newFootprint: Footprint = {
      id: footprintId.current++,
      x: x + 25,
      y: y + 90,
      rotation: vx > 0 ? 0 : 180,
      opacity: 0.6,
    };

    setFootprints((prev) => [...prev.slice(-15), newFootprint]);

    // Fade out footprint
    setTimeout(() => {
      setFootprints((prev) =>
        prev.map((fp) =>
          fp.id === newFootprint.id ? { ...fp, opacity: 0 } : fp
        )
      );
    }, 2000);
  }, []);

  useEffect(() => {
    const shrekWidth = 80;
    const shrekHeight = 100;
    const footerHeight = 60;

    const animate = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.vx;
        let newY = prev.y + velocity.vy;
        let newVx = velocity.vx;
        let newVy = velocity.vy;

        const maxX = window.innerWidth - shrekWidth;
        const maxY = window.innerHeight - shrekHeight - footerHeight;

        // Bounce off walls with slight randomization
        if (newX <= 0 || newX >= maxX) {
          newVx = -velocity.vx * (0.9 + Math.random() * 0.2);
          newX = newX <= 0 ? 0 : maxX;
          // Add some vertical variation on bounce
          newVy = velocity.vy + (Math.random() - 0.5) * 2;
        }
        if (newY <= 0 || newY >= maxY) {
          newVy = -velocity.vy * (0.9 + Math.random() * 0.2);
          newY = newY <= 0 ? 0 : maxY;
          // Add some horizontal variation on bounce
          newVx = velocity.vx + (Math.random() - 0.5) * 2;
        }

        // Speed limits
        const maxSpeed = 6;
        const minSpeed = 2;
        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        if (speed > maxSpeed) {
          newVx = (newVx / speed) * maxSpeed;
          newVy = (newVy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          newVx = (newVx / speed) * minSpeed;
          newVy = (newVy / speed) * minSpeed;
        }

        setVelocity({ vx: newVx, vy: newVy });
        setDirection(newVx > 0 ? 1 : -1);
        addFootprint(newX, newY, newVx);

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, addFootprint]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 80),
        y: Math.min(prev.y, window.innerHeight - 160),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full overflow-hidden relative font-serif">
      <SwampBackground />
      <Fireflies fireflies={fireflies} />

      {/* Title */}
      <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 z-30 text-center px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#8FBC8F] drop-shadow-lg tracking-wide"
            style={{
              textShadow: '0 0 20px rgba(50, 100, 50, 0.5), 2px 2px 0 #2d4a2d',
              fontFamily: "'Fraunces', serif"
            }}>
          GET OUT OF MY SWAMP!
        </h1>
        <p className="text-sm md:text-base text-[#6B8E6B] mt-2 opacity-80" style={{ fontFamily: "'Crimson Pro', serif" }}>
          (Shrek is just vibing... leave him alone)
        </p>
      </div>

      {/* Shrek and Footprints */}
      <Footprints footprints={footprints} />
      <Shrek position={position} direction={direction} isRunning={true} />

      {/* Speech bubble that occasionally appears */}
      <SpeechBubble position={position} direction={direction} />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 py-3 md:py-4 text-center bg-gradient-to-t from-[#0a1a0a] to-transparent">
        <p className="text-[10px] md:text-xs text-[#4a6a4a] opacity-60" style={{ fontFamily: "'Crimson Pro', serif" }}>
          Requested by <span className="text-[#6B8E6B]">@trustnoneisakey</span> · Built by <span className="text-[#6B8E6B]">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

function SpeechBubble({ position, direction }: { position: Position; direction: number }) {
  const [visible, setVisible] = useState(false);
  const [quote, setQuote] = useState('');

  const quotes = [
    "DONKEY!",
    "What are ye doin' in mah swamp?!",
    "Ogres are like onions",
    "Better out than in!",
    "This is the part where you run away",
    "I'm making waffles!",
    "Do the roar",
  ];

  useEffect(() => {
    const showBubble = () => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    };

    const interval = setInterval(showBubble, 5000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="absolute z-30 bg-[#FFFEF0] rounded-2xl px-3 py-2 md:px-4 md:py-2 max-w-[150px] md:max-w-[200px] shadow-lg pointer-events-none animate-bounce"
      style={{
        left: position.x + (direction > 0 ? 70 : -120),
        top: position.y - 20,
        fontFamily: "'Fraunces', serif",
      }}
    >
      <p className="text-xs md:text-sm text-[#3d2a1c] font-bold">{quote}</p>
      <div
        className="absolute w-0 h-0 border-8 border-transparent border-t-[#FFFEF0]"
        style={{
          bottom: -14,
          left: direction > 0 ? 10 : 'auto',
          right: direction > 0 ? 'auto' : 10,
        }}
      />
    </div>
  );
}
