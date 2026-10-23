import React, { useState, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

interface TntDetonatorBoxProps {
  onDetonate: () => void;
  tubeCount: number;
  disabled?: boolean;
  soundEnabled?: boolean;
}

export const TntDetonatorBox: React.FC<TntDetonatorBoxProps> = ({
  onDetonate,
  tubeCount,
  disabled = false,
  soundEnabled = true,
}) => {
  // plungerProgress: 0 (top, fully extended) to 1 (bottom, fully pushed down)
  const [plungerProgress, setPlungerProgress] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasDetonatedThisStroke, setHasDetonatedThisStroke] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [boxShake, setBoxShake] = useState<boolean>(false);

  const startYRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mechanical clack sound on bottom contact
  const playClackSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Heavy mechanical wood & metal thud
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(220, now);
      thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      thudGain.gain.setValueAtTime(0.7, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudOsc.start(now);
      thudOsc.stop(now + 0.15);

      // 2. High metallic click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(1400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      clickGain.gain.setValueAtTime(0.4, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.07);
    } catch {
      // Audio fallback
    }
  }, [soundEnabled]);

  // Trigger detonation when handle reaches the bottom (progress = 1)
  const triggerDetonation = useCallback(() => {
    playClackSound();
    setBoxShake(true);
    setTimeout(() => setBoxShake(false), 250);
    onDetonate();

    // Smoothly spring back up after detonation so user can push it again immediately
    setTimeout(() => {
      setPlungerProgress(0);
      currentProgressRef.current = 0;
      setHasDetonatedThisStroke(false);
      setIsAnimating(false);
    }, 700);
  }, [onDetonate, playClackSound]);

  // Handle click / tap on handle or box to plunge down smoothly
  const handlePlungeClick = () => {
    if (isAnimating || isDragging || disabled) return;
    setIsAnimating(true);
    setHasDetonatedThisStroke(false);

    const startTime = performance.now();
    const duration = 320; // 320ms smooth down stroke

    const animateDown = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = t * t * t; // smooth accelerating plunge

      setPlungerProgress(eased);
      currentProgressRef.current = eased;

      if (t < 1) {
        requestAnimationFrame(animateDown);
      } else {
        setPlungerProgress(1);
        currentProgressRef.current = 1;
        triggerDetonation();
      }
    };

    requestAnimationFrame(animateDown);
  };

  // Dragging support
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimating || disabled) return;
    setIsDragging(true);
    startYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const maxTravelPx = 36; // compact travel distance
    const deltaY = e.clientY - startYRef.current;
    const progress = Math.max(0, Math.min(1, deltaY / maxTravelPx));

    setPlungerProgress(progress);
    currentProgressRef.current = progress;

    if (progress >= 0.94 && !hasDetonatedThisStroke) {
      setHasDetonatedThisStroke(true);
      setIsDragging(false);
      setPlungerProgress(1);
      currentProgressRef.current = 1;
      triggerDetonation();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (currentProgressRef.current > 0.55 && !hasDetonatedThisStroke) {
      setPlungerProgress(1);
      triggerDetonation();
    } else {
      setPlungerProgress(0);
      currentProgressRef.current = 0;
    }
  };

  // Max visual travel for compact size
  const maxTravelPx = 30;
  const currentTranslateY = plungerProgress * maxTravelPx;

  return (
    <div
      className={`relative flex flex-col items-center select-none cursor-pointer group pb-1 ${
        boxShake ? 'translate-y-0.5' : ''
      }`}
      onClick={handlePlungeClick}
      title="Empuja o pulsa la palanca hacia abajo para detonar"
    >
      {/* Interactive Plunger Assembly (Handle + Shaft) */}
      <div
        className="relative z-20 flex flex-col items-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translateY(${currentTranslateY}px)`,
          transition: isDragging ? 'none' : 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Floating tiny hint badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/85 backdrop-blur-sm text-amber-200 text-[9px] font-extrabold shadow-sm whitespace-nowrap pointer-events-none group-hover:scale-105 transition-transform animate-pulse">
          <ArrowDown className="w-2.5 h-2.5 text-amber-400 animate-bounce" />
          <span>EMPUJAR PALANCA</span>
        </div>

        {/* T-Bar Horizontal Grip Bar (Compact) */}
        <div className="w-24 sm:w-28 h-4 rounded-full bg-gradient-to-r from-amber-900 via-amber-600 to-amber-950 border border-amber-950 shadow-md flex items-center justify-between px-1.5 group-hover:brightness-110 transition-all">
          <span className="w-1.5 h-2.5 rounded-xs bg-amber-400 border border-amber-600" />
          <span className="text-[8px] font-mono font-bold text-amber-200/80 tracking-wider">
            TNT FX
          </span>
          <span className="w-1.5 h-2.5 rounded-xs bg-amber-400 border border-amber-600" />
        </div>

        {/* Vertical Wooden Shaft that enters the box */}
        <div className="w-2.5 h-9 sm:h-10 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-900 border-x border-amber-950 shadow-inner flex flex-col items-center justify-end">
          <div className="w-full h-px bg-amber-950/60 mb-2" />
          <div className="w-full h-px bg-amber-950/60 mb-2" />
        </div>
      </div>

      {/* The White Pedestal Column (Sitting firmly on the ground) */}
      <div className="relative z-10 w-16 sm:w-20 h-24 sm:h-28 bg-white rounded-xl border border-neutral-300 shadow-xl flex flex-col items-center justify-between p-1.5 overflow-hidden group-hover:border-amber-400 transition-colors">
        {/* Top rim collar */}
        <div className="w-full h-2 bg-neutral-100 rounded-t-sm border-b border-neutral-200 flex items-center justify-center">
          <div className="w-4 h-1.5 bg-gradient-to-b from-amber-500 to-amber-800 rounded-full border border-amber-900" />
        </div>

        {/* Golden 3D Vertical Letters: T - N - T (matches photo exactly) */}
        <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 my-auto select-none">
          <span
            className="text-lg sm:text-xl font-black tracking-widest font-display text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 leading-none"
            style={{ textShadow: '0 1px 2px rgba(180, 83, 9, 0.4)' }}
          >
            T
          </span>
          <span
            className="text-lg sm:text-xl font-black tracking-widest font-display text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 leading-none"
            style={{ textShadow: '0 1px 2px rgba(180, 83, 9, 0.4)' }}
          >
            N
          </span>
          <span
            className="text-lg sm:text-xl font-black tracking-widest font-display text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 leading-none"
            style={{ textShadow: '0 1px 2px rgba(180, 83, 9, 0.4)' }}
          >
            T
          </span>
        </div>

        {/* Base lip */}
        <div className="w-full h-1.5 bg-neutral-100 rounded-b-sm border-t border-neutral-200" />
      </div>

      {/* Round Esparto / Jute Mat resting flat on the ground */}
      <div className="relative -mt-2.5 z-0 w-28 sm:w-34 h-5 sm:h-6 rounded-[100%] bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 border border-dashed border-amber-400/80 shadow-md flex items-center justify-center">
        <div className="w-22 sm:w-28 h-3 sm:h-4 rounded-[100%] border border-amber-300/80 bg-amber-50/60" />
      </div>
    </div>
  );
};
