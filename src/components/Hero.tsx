import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Flame, Sparkles } from 'lucide-react';
import { assetUrl } from '../utils/assetUrl';

interface HeroProps {
  onScrollToSimulator: () => void;
  onOpenConfigurator: () => void;
  onOpenEspumaChispas?: () => void;
}

interface HeroSmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  age: number;
  maxAge: number;
  rotation: number;
  vRot: number;
  colorIndex: number;
  spreadDir: number;
}

const HERO_PALETTES = [
  {
    name: 'Multicolor Imperial (6 Cañones)',
    colors: ['#EC4899', '#06B6D4', '#F43F5E', '#8B5CF6', '#EAB308', '#EC4899'],
  },
  {
    name: 'Rosa Fucsia & Turquesa',
    colors: ['#EC4899', '#06B6D4', '#EC4899', '#06B6D4', '#EC4899', '#06B6D4'],
  },
  {
    name: 'Revelación de Género (Rosa / Azul)',
    colors: ['#F43F5E', '#F43F5E', '#F43F5E', '#2563EB', '#2563EB', '#2563EB'],
  },
];

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function createCloudSprite(hex: string): HTMLCanvasElement {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return c;

  const { r, g, b } = hexToRgb(hex);
  const lightR = Math.min(255, r + 52);
  const lightG = Math.min(255, g + 52);
  const lightB = Math.min(255, b + 52);
  const darkR = Math.max(0, Math.round(r * 0.68));
  const darkG = Math.max(0, Math.round(g * 0.68));
  const darkB = Math.max(0, Math.round(b * 0.68));

  const lobes = [
    { x: 64, y: 64, rad: 46, a: 0.62 },
    { x: 48, y: 52, rad: 34, a: 0.50 },
    { x: 80, y: 54, rad: 32, a: 0.48 },
    { x: 52, y: 78, rad: 33, a: 0.48 },
    { x: 78, y: 76, rad: 34, a: 0.46 },
  ];

  lobes.forEach((lobe) => {
    const grad = ctx.createRadialGradient(
      lobe.x - lobe.rad * 0.22,
      lobe.y - lobe.rad * 0.22,
      lobe.rad * 0.08,
      lobe.x,
      lobe.y,
      lobe.rad
    );
    grad.addColorStop(0, `rgba(${lightR}, ${lightG}, ${lightB}, ${lobe.a})`);
    grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${lobe.a * 0.85})`);
    grad.addColorStop(0.82, `rgba(${darkR}, ${darkG}, ${darkB}, ${lobe.a * 0.38})`);
    grad.addColorStop(1, `rgba(${darkR}, ${darkG}, ${darkB}, 0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(lobe.x, lobe.y, lobe.rad, 0, Math.PI * 2);
    ctx.fill();
  });

  return c;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToSimulator,
  onOpenConfigurator,
  onOpenEspumaChispas,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const triggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = canvas.offsetWidth || 1280);
    let height = (canvas.height = canvas.offsetHeight || 720);

    const handleResize = () => {
      if (!canvas) return;
      const newWidth = canvas.offsetWidth || 1280;
      const newHeight = canvas.offsetHeight || 720;
      if (Math.abs(newWidth - width) > 8 || Math.abs(newHeight - height) > 15) {
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Pre-build sprites for all unique colors
    const spriteMap = new Map<string, HTMLCanvasElement>();
    HERO_PALETTES.forEach((p) => {
      p.colors.forEach((hex) => {
        if (!spriteMap.has(hex)) {
          spriteMap.set(hex, createCloudSprite(hex));
        }
      });
    });

    const particles: HeroSmokeParticle[] = [];
    let currentPaletteIndex = paletteIdx;
    let shotStartTime = performance.now();
    let lastFrameTime = performance.now();
    let emitAccumulator = 0;
    const EMIT_DURATION = 2800; // 2.8s powerful vertical burst
    const CYCLE_DURATION = 6800; // Auto-repeat every 6.8s

    const triggerNewBurst = (nextIdx?: number) => {
      if (typeof nextIdx === 'number') {
        currentPaletteIndex = nextIdx;
      } else {
        currentPaletteIndex = (currentPaletteIndex + 1) % HERO_PALETTES.length;
        setPaletteIdx(currentPaletteIndex);
      }
      shotStartTime = performance.now();
      emitAccumulator = 0;
    };

    triggerRef.current = () => {
      const next = (currentPaletteIndex + 1) % HERO_PALETTES.length;
      setPaletteIdx(next);
      triggerNewBurst(next);
    };

    const render = (now: number) => {
      const rawDt = (now - lastFrameTime) / 16.667;
      const dt = Math.min(2.2, Math.max(0.4, rawDt));
      lastFrameTime = now;

      const elapsed = now - shotStartTime;
      if (elapsed > CYCLE_DURATION) {
        triggerNewBurst();
      }

      ctx.clearRect(0, 0, width, height);

      const activeColors = HERO_PALETTES[currentPaletteIndex].colors;
      const cannonCount = activeColors.length;
      // Launch from ground level right behind the bride and groom
      const baseY = height * 0.84;
      // Center battery on the right-center stage (where the couple stands on desktop, or center on mobile)
      const isDesktop = width >= 1024;
      const stageCenterX = isDesktop ? width * 0.68 : width * 0.50;
      const span = isDesktop ? Math.min(width * 0.46, 580) : Math.min(width * 0.82, 340);
      const startX = stageCenterX - span / 2;

      // Spawn particles smoothly during active burst window
      if (elapsed < EMIT_DURATION) {
        const emitProgress = elapsed / EMIT_DURATION;
        const intensity = Math.sin(emitProgress * Math.PI);

        for (let i = 0; i < cannonCount; i++) {
          const cx = startX + (span / (cannonCount - 1)) * i;

          // Smooth mortar glow behind the couple
          const flashGrad = ctx.createRadialGradient(cx, baseY, 2, cx, baseY, 28);
          const { r, g, b } = hexToRgb(activeColors[i]);
          flashGrad.addColorStop(0, `rgba(255,255,255,${0.65 * intensity})`);
          flashGrad.addColorStop(0.45, `rgba(${r},${g},${b},${0.42 * intensity})`);
          flashGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = flashGrad;
          ctx.beginPath();
          ctx.arc(cx, baseY, 28, 0, Math.PI * 2);
          ctx.fill();
        }

        emitAccumulator += dt;
        while (emitAccumulator >= 1.15) {
          emitAccumulator -= 1.15;
          for (let i = 0; i < cannonCount; i++) {
            const cx = startX + (span / (cannonCount - 1)) * i;
            const fanAngle = ((i - (cannonCount - 1) / 2) / ((cannonCount - 1) / 2)) * 0.16;
            const speed = (height / 540) * (7.6 + Math.random() * 2.4);
            particles.push({
              x: cx + (Math.random() - 0.5) * 4,
              y: baseY - Math.random() * 6,
              vx: Math.sin(fanAngle) * speed + (Math.random() - 0.5) * 0.45,
              vy: -Math.cos(fanAngle) * speed,
              radius: 18 + Math.random() * 7,
              maxRadius: (height / 540) * (78 + Math.random() * 38),
              alpha: 0.62 + Math.random() * 0.18,
              age: 0,
              maxAge: 145 + Math.random() * 45,
              rotation: Math.random() * Math.PI * 2,
              vRot: (Math.random() - 0.5) * 0.014,
              colorIndex: i,
              spreadDir: (Math.random() - 0.5) * 1.8 + fanAngle * 2.4,
            });
          }
        }
      }

      // Update & draw particles smoothly without any horizontal jitter
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          particles.splice(i, 1);
          continue;
        }

        const t = p.age / p.maxAge;
        // Fast vertical jet that decelerates smoothly and opens into a wide canopy above the couple
        p.vy *= Math.pow(0.968, dt);
        const heightRatio = Math.max(0, (baseY - p.y) / (height * 0.62));
        if (heightRatio > 0.32) {
          const canopyFactor = (heightRatio - 0.32) / 0.68;
          p.vx += p.spreadDir * 0.055 * canopyFactor * dt;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.vRot * dt;

        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(t, 0.62);
        const fadeIn = Math.min(1, p.age / 8);
        const fadeOut = Math.pow(1 - t, 1.35);
        const currentAlpha = p.alpha * fadeIn * fadeOut;

        if (currentAlpha <= 0.01) continue;

        const hex = activeColors[p.colorIndex] || activeColors[0];
        const sprite = spriteMap.get(hex);
        if (sprite) {
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(sprite, -currentRadius, -currentRadius, currentRadius * 2, currentRadius * 2);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full flex flex-col lg:flex-row lg:items-center lg:h-[calc(100svh-5.5rem)] lg:min-h-[640px] lg:max-h-[960px] overflow-hidden bg-neutral-950 border-b border-neutral-900">
      
      {/* VISUAL SHOWCASE STAGE:
          - On mobile: top section (h-[50vh]) where couple & smoke blast are 100% visible and unobstructed
          - On desktop: fills the entire hero background (absolute inset-0) */}
      <div className="relative w-full h-[52vh] min-h-[360px] max-h-[480px] lg:h-full lg:max-h-none lg:absolute lg:inset-0 overflow-hidden select-none">
        
        {/* 1. REAL VIDEO BACKGROUND OF THE LUXURY ESTATE */}
        <video
          src={assetUrl('/assets/videos/humo-aereo-real.mp4')}
          poster={assetUrl('/assets/venues/palacio.jpg')}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center brightness-105 contrast-105 pointer-events-none z-0 transform-gpu"
        />

        {/* 2. LIVE VOLUMETRIC AERIAL SMOKE EFFECT LAYER */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* 3. BRIDE & GROOM IN FOREGROUND (Centered on mobile, right-anchored on desktop) */}
        <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-20 flex items-end justify-center lg:justify-end lg:pr-[6%] xl:pr-[10%]">
          <div className="relative h-[85%] sm:h-[88%] lg:h-[82%] max-h-[380px] sm:max-h-[440px] lg:max-h-[700px] flex items-end select-none">
            <img
              src={assetUrl('/assets/novios-hero.png')}
              alt="Novios celebrando su boda delante de un espectacular disparo instantáneo de humo aéreo vertical de Humo Y Efectos"
              title="Disparo Instantáneo de Humo Aéreo para Bodas - Humo Y Efectos"
              referrerPolicy="no-referrer"
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_14px_36px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>

        {/* 4. BALANCED ATMOSPHERIC GRADIENTS */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-black/30 z-20 pointer-events-none hidden lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-25 pointer-events-none lg:hidden" />

        {/* 5. FLOATING INTERACTIVE CONTROLS (Mobile top overlay) */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between gap-2 pointer-events-auto lg:hidden">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/70 backdrop-blur-md border border-rose-500/30 text-rose-300 text-[10px] font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>Nº1 Bodas & Eventos</span>
          </span>

          <button
            onClick={() => triggerRef.current?.()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/75 backdrop-blur-md hover:bg-neutral-900 border border-white/20 text-white text-[10px] font-bold transition-all cursor-pointer shadow-md active:scale-95"
            title="Cambiar color del disparo de humo"
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Humo: {HERO_PALETTES[paletteIdx].name.split(' (')[0]}</span>
          </button>
        </div>
      </div>

      {/* MOBILE HERO CARD: Sits neatly BELOW the visual stage ("sale abajo en móvil") */}
      <div className="relative z-30 px-3.5 sm:px-6 pb-10 pt-1 -mt-4 w-full max-w-xl mx-auto lg:hidden pointer-events-auto">
        <div className="bg-neutral-950/90 backdrop-blur-md border border-white/15 p-5 sm:p-7 rounded-3xl shadow-2xl space-y-3.5">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight font-display drop-shadow-md">
            Humo Aéreo y Efectos para Bodas en España
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Disparo instantáneo vertical a 15 metros, lluvia poética de mariposas de seda, vals sobre las nubes con hielo seco y fuentes de chispas frías 100% seguras.
          </p>

          <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-neutral-300 pt-0.5">
            <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300">
              📍 Talavera · Madrid · España
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/10 text-white">
              ✓ 10 Colores Oficiales
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/10 text-white">
              ✓ Homologado CE
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/10 text-white">
              ✓ Montaje por Técnicos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1.5">
            <a
              href="#simulador"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSimulator();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/40 cursor-pointer active:scale-98 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Visualiza Tu Momento (Simulador)</span>
            </a>

            <a
              href="#configurador"
              onClick={(e) => {
                e.preventDefault();
                onOpenConfigurator();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs rounded-xl cursor-pointer active:scale-98 transition-all"
            >
              <span>Pedir Presupuesto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* DESKTOP CONTENT LAYER: Perfectly balanced side-by-side (Card Left, Novios Right) */}
      <div className="hidden lg:flex relative z-30 max-w-7xl mx-auto px-6 w-full h-full items-center py-10 pointer-events-none">
        <div className="grid grid-cols-12 gap-8 items-center w-full">
          <div className="col-span-8 xl:col-span-7 pointer-events-auto">
            <div className="bg-neutral-950/65 backdrop-blur-md border border-white/15 p-8 md:p-10 rounded-3xl shadow-2xl space-y-5 max-w-2xl">
              
              {/* Badge + Color Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nº1 en Efectos para Bodas & Eventos</span>
                </span>

                <button
                  onClick={() => triggerRef.current?.()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                  title="Cambiar color del disparo de humo en el fondo"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Humo: {HERO_PALETTES[paletteIdx].name.split(' (')[0]}</span>
                </button>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-display drop-shadow-md">
                Humo Aéreo y Efectos para Bodas en España
              </h1>

              {/* Subheading */}
              <p className="text-xs sm:text-base text-neutral-200 leading-relaxed drop-shadow-xs">
                Disparo instantáneo vertical a 15 metros, lluvia poética de mariposas de seda, vals sobre las nubes con hielo seco y fuentes de chispas frías 100% seguras.
              </p>

              {/* Key Features Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-neutral-300 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-extrabold">
                  📍 Sede Talavera · Madrid · España
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white">
                  ✓ 10 Colores Oficiales en Stock
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white">
                  ✓ Homologado CE Cat. T1
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-white">
                  ✓ Montaje por Técnicos
                </span>
              </div>

              {/* Dual CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#simulador"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSimulator();
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Visualiza Tu Momento (Simulador)</span>
                </a>

                <a
                  href="#configurador"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenConfigurator();
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs sm:text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <span>Pedir Presupuesto</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
