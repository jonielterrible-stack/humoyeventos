import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  Palette,
  Layers,
  Bomb,
  Radio,
  Upload,
  Camera,
  Trash2,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { SMOKE_COLORS, SmokeColor } from '../data/smokeData';
import { TntDetonatorBox } from './TntDetonatorBox';

interface SmokeParticle {
  x: number;
  y: number;
  originX: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  spreadRate: number;
}

export type VenueSceneType = 'jardines' | 'lago' | 'palacio' | 'vinedo' | 'custom';

export const VENUE_PHOTOS: Record<
  'jardines' | 'lago' | 'palacio' | 'vinedo',
  { url: string; name: string; tag: string }
> = {
  jardines: {
    url: '/assets/venues/jardines.jpg',
    name: 'Jardines de Finca Nupcial',
    tag: 'Finca Nupcial',
  },
  lago: {
    url: '/assets/venues/lago.jpg',
    name: 'Paseo del Lago',
    tag: 'Paseo Romántico',
  },
  palacio: {
    url: '/assets/venues/palacio.jpg',
    name: 'Palacio Señorial / Masía',
    tag: 'Casona Histórica',
  },
  vinedo: {
    url: '/assets/venues/vinedo.jpg',
    name: 'Viñedo al Atardecer',
    tag: 'Golden Hour',
  },
};

export const SmokeSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [tubeCount, setTubeCount] = useState<number>(4);
  const [colorMode, setColorMode] = useState<'uniform' | 'custom'>('uniform');
  const [uniformColor, setUniformColor] = useState<SmokeColor>(SMOKE_COLORS[9]); // Rosa Pastel

  // Custom colors for tubes 1..9 from the 10 official factory colors
  const [tubeColors, setTubeColors] = useState<SmokeColor[]>([
    SMOKE_COLORS[9], // Rosa Pastel
    SMOKE_COLORS[2], // Azul Eléctrico
    SMOKE_COLORS[0], // Amarillo Oro
    SMOKE_COLORS[7], // Morado Violeta
    SMOKE_COLORS[9],
    SMOKE_COLORS[2],
    SMOKE_COLORS[0],
    SMOKE_COLORS[7],
    SMOKE_COLORS[3], // Blanco Puro
  ]);

  const [activeEditingTube, setActiveEditingTube] = useState<number>(0);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [venueScene, setVenueScene] = useState<VenueSceneType>('jardines');
  const [useTntTrigger, setUseTntTrigger] = useState<boolean>(true); // Active by default!
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Custom User Venue Photo Upload State
  const [customVenueUrl, setCustomVenueUrl] = useState<string | null>(null);
  const [customVenueName, setCustomVenueName] = useState<string>('');
  const [groundOffset, setGroundOffset] = useState<number>(0); // Allows fine-tuning cannon ground position ±50px
  const [showGroundAdjuster, setShowGroundAdjuster] = useState<boolean>(false);
  const [showPhotoSourceModal, setShowPhotoSourceModal] = useState<boolean>(false);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  const particlesRef = useRef<SmokeParticle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  // File Upload Handlers (FileReader -> persistent Data URL)
  const processUploadedFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomVenueUrl(result);
        const rawName = file.name ? file.name.replace(/\.[^/.]+$/, '') : '';
        const isFromCamera = !file.name || file.name === 'image.jpg' || file.name === 'photo.jpg' || /^(image|captured|camera|photo)/i.test(rawName);
        const isUuidOrHash = rawName.length > 18 || /^[0-9a-f-]{10,}/i.test(rawName);
        const displayName = isFromCamera
          ? 'Foto en Directo'
          : (isUuidOrHash ? 'Vuestra Foto' : (rawName.length > 16 ? `${rawName.slice(0, 16)}...` : rawName));
        setCustomVenueName(displayName);
        setVenueScene('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
    // Reset so the user can select/capture again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const removeCustomPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomVenueUrl(null);
    setCustomVenueName('');
    setVenueScene('jardines');
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Audio synthesis: punchy acoustic mortar explosion
  const playMortarShot = () => {
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

      // 1. Initial deep boom
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);

      oscGain.gain.setValueAtTime(0.5, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      // 2. Ascending launch whoosh
      const bufferSize = ctx.sampleRate * 2.0;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.0;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4);
      filter.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 1.8);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.12);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  };

  // Trigger ONE single instantaneous shot that goes from less to more ("va de menos a más") and fades smoothly.
  // Can be triggered repeatedly at any time without needing to reset!
  const fireSingleInstantShot = () => {
    setIsFiring(true);
    setTimeRemaining(4);
    playMortarShot();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const groundY = height - 40 - groundOffset;

    const tubeSpacing = width / (tubeCount + 1);
    const newParticles: SmokeParticle[] = [];

    // Dense organic cloud particles per tube
    for (let i = 1; i <= tubeCount; i++) {
      const tx = i * tubeSpacing;
      const tubeColor = colorMode === 'uniform' ? uniformColor : tubeColors[i - 1] || uniformColor;

      // 140 soft volumetric puffs per tube
      const count = 140;
      for (let p = 0; p < count; p++) {
        const speedRatio = Math.random(); // creates continuous vertical column from base to summit
        const initialVy = -(4.5 + speedRatio * 13.5); // high velocity up to 18px/frame
        const horizontalFlutter = (Math.random() - 0.5) * 0.35;

        newParticles.push({
          x: tx + (Math.random() - 0.5) * 6,
          y: groundY - 26,
          originX: tx,
          vx: horizontalFlutter,
          vy: initialVy,
          radius: 6 + Math.random() * 4, // starts compact at the bottom
          maxRadius: 32 + Math.random() * 26, // "VA DE MENOS A MÁS": opens into wide plume at top!
          color: tubeColor.hex,
          alpha: 0.95,
          maxAlpha: 0.95,
          life: 0,
          maxLife: 210 + Math.random() * 50, // lasts ~3.5 to 4.5 seconds
          spreadRate: 0.45 + Math.random() * 0.35,
        });
      }
    }

    particlesRef.current = newParticles;

    let secondsLeft = 4;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      secondsLeft -= 1;
      setTimeRemaining(Math.max(0, secondsLeft));
      if (secondsLeft <= 0) {
        clearInterval(timerRef.current);
        setIsFiring(false);
      }
    }, 1000);
  };

  const handleColorSelect = (color: SmokeColor) => {
    if (colorMode === 'uniform') {
      setUniformColor(color);
    } else {
      setTubeColors((prev) => {
        const updated = [...prev];
        updated[activeEditingTube] = color;
        return updated;
      });
    }
  };

  const applyDuoPreset = (col1: SmokeColor, col2: SmokeColor) => {
    setColorMode('custom');
    setTubeColors((prev) => prev.map((_, i) => (i % 2 === 0 ? col1 : col2)));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const groundY = height - 40 - groundOffset;

      ctx.clearRect(0, 0, width, height);

      // Individual contact shadow under each mortar tube without any black banner over the photo
      const tubeSpacing = width / (tubeCount + 1);
      for (let i = 1; i <= tubeCount; i++) {
        const tx = i * tubeSpacing;
        const tubeColor = colorMode === 'uniform' ? uniformColor : tubeColors[i - 1] || uniformColor;

        // Faint contact shadow right under each tube base plate (no full-width banner)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(tx, groundY + 1, 15, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Base plate on the ground
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(tx - 15, groundY - 4, 30, 5);

        // Heavy steel cylinder body
        const cylinderGrad = ctx.createLinearGradient(tx - 7, 0, tx + 7, 0);
        cylinderGrad.addColorStop(0, '#334155');
        cylinderGrad.addColorStop(0.5, '#64748b');
        cylinderGrad.addColorStop(1, '#1e293b');
        ctx.fillStyle = cylinderGrad;
        ctx.fillRect(tx - 7, groundY - 26, 14, 22);

        // Top color propellant seal
        ctx.fillStyle = tubeColor.hex;
        ctx.fillRect(tx - 8, groundY - 29, 16, 4);

        // Cannon number indicator
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${i}`, tx, groundY + 12);
      }

      // ========================================================
      // PARTICLE ENGINE: "VA DE MENOS A MÁS Y SE VA DIFUMINANDO"
      // NO SPARKLES / NO GLITTER! PURE ORGANIC VELVETY SMOKE!
      // ========================================================
      const remaining: SmokeParticle[] = [];
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.life++;

        // Vertical deceleration as it climbs to 15m
        pt.vy *= 0.94;
        pt.y += pt.vy;

        // "VA DE MENOS A MÁS": calculate altitude progress (0 at base, 1 at peak)
        const altitudeProgress = Math.max(0, Math.min(1, (groundY - pt.y) / (groundY - 55)));

        if (altitudeProgress > 0.35) {
          // As it climbs above 35% height, open outward horizontally in fan shape!
          const expansionRatio = (altitudeProgress - 0.35) * 2.5;
          pt.x += pt.vx * (1 + expansionRatio * 2.2);
          pt.radius = Math.min(pt.maxRadius, pt.radius + pt.spreadRate * expansionRatio);
        } else {
          // Bottom stays compact and focused
          pt.x += pt.vx * 0.3;
          pt.radius = Math.min(pt.maxRadius * 0.45, pt.radius + 0.1);
        }

        // "A LA VEZ SE VA DIFUMINANDO":
        // Begins gentle dissipation after initial climb, vanishing completely in 3.5 to 4s
        if (pt.life > 75) {
          pt.alpha -= 0.011; // smooth fade-out leaving clean sky
        }

        if (pt.alpha > 0 && pt.life < pt.maxLife) {
          remaining.push(pt);

          ctx.save();
          ctx.globalAlpha = Math.max(0, pt.alpha);

          // Soft volumetric cloud gradient (no harsh circle edges!)
          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.radius);
          grad.addColorStop(0, pt.color);
          grad.addColorStop(0.4, pt.color);
          grad.addColorStop(0.75, `${pt.color}88`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      particlesRef.current = remaining;

      // Clean altitude scale on the right
      ctx.save();
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'right';

      const marks = [
        { label: '15m (Apertura)', y: 55 },
        { label: '10m', y: height * 0.42 },
        { label: '5m', y: height * 0.68 },
        { label: '0m', y: groundY - 4 },
      ];

      marks.forEach((m) => {
        ctx.beginPath();
        ctx.moveTo(width - 50, m.y);
        ctx.lineTo(width - 15, m.y);
        ctx.stroke();
        ctx.fillText(m.label, width - 55, m.y + 4);
      });
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [tubeCount, colorMode, uniformColor, tubeColors, venueScene, groundOffset]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xl">
      {/* Hidden File Input for Camera (Direct Mobile Shutter) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Hidden File Input for Gallery / Device Files */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border-b border-neutral-200 bg-neutral-50/80">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
          <div>
            <h3 className="font-extrabold text-xs sm:text-sm text-neutral-900 font-display flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>Visualiza la Magia: Diseña el Disparo de Vuestro Gran Día</span>
            </h3>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              Haz una foto en directo en vuestra finca o sube vuestra imagen y siente la emoción del disparo instantáneo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Quick upload / camera button in header */}
          <button
            onClick={() => setShowPhotoSourceModal(true)}
            className="h-8 px-2.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer bg-white border-neutral-200 text-neutral-700 hover:border-rose-300 hover:text-rose-600 shadow-2xs"
            title="Hacer foto con la cámara o subir de la galería"
          >
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span className="text-xs">Foto / Cámara</span>
          </button>

          {/* TNT trigger toggle */}
          <button
            onClick={() => setUseTntTrigger(!useTntTrigger)}
            className={`h-8 px-2.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
              useTntTrigger
                ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
            title={useTntTrigger ? 'Palanca TNT activa' : 'Activar detonador TNT'}
          >
            <Bomb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-xs">{useTntTrigger ? 'TNT Activa' : 'Activar TNT'}</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-8 w-8 flex items-center justify-center text-xs rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-colors cursor-pointer"
            title={soundEnabled ? 'Sonido activado' : 'Sonido silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-600" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Direct Detonate Button */}
          <button
            onClick={fireSingleInstantShot}
            className="h-8 flex items-center gap-1.5 px-3.5 text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Detonar</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport with Real Photo Scenery or Custom Upload */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative w-full h-[470px] md:h-[550px] overflow-hidden bg-neutral-900 rounded-t-3xl"
      >
        {/* Real Venue Photo Background with smooth transition */}
        {venueScene === 'custom' && customVenueUrl ? (
          <img
            key="custom-venue"
            src={customVenueUrl}
            alt={customVenueName || 'Vuestra Finca'}
            className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none transition-all duration-500 ease-in-out"
          />
        ) : venueScene === 'custom' && !customVenueUrl ? (
          /* Empty state prompt for custom photo upload */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-800 text-center px-6 pointer-events-auto">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-500 shadow-lg">
              <Camera className="w-8 h-8" />
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-display">
              Vuestra Finca, Palacio o Jardín
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mb-6 leading-relaxed">
              Haz una foto en directo si estás ahora en el lugar del evento o sube una imagen de tu galería para ver el disparo exacto sobre vuestro espacio.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Hacer Foto con la Cámara</span>
              </button>
              <button
                onClick={() => galleryInputRef.current?.click()}
                className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/25 backdrop-blur-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Subir de la Galería</span>
              </button>
              <button
                onClick={() => setVenueScene('jardines')}
                className="px-4 py-2.5 bg-black/40 hover:bg-black/60 text-neutral-300 font-semibold text-xs sm:text-sm rounded-xl border border-white/10 cursor-pointer transition-all"
              >
                Ver Escenarios de Muestra
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-4">
              O arrastra y suelta cualquier foto directamente aquí
            </p>
          </div>
        ) : (
          <img
            key={venueScene}
            src={VENUE_PHOTOS[venueScene as keyof typeof VENUE_PHOTOS]?.url}
            alt={VENUE_PHOTOS[venueScene as keyof typeof VENUE_PHOTOS]?.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-500 ease-in-out"
          />
        )}

        {/* Real photo atmospheric overlay: 100% transparent at bottom so photos remain crisp and clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Drag & Drop Visual Indicator Overlay */}
        {isDraggingFile && (
          <div className="absolute inset-0 z-30 bg-rose-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white border-4 border-dashed border-rose-500 m-2 rounded-2xl pointer-events-none animate-pulse">
            <Upload className="w-12 h-12 text-rose-400 mb-3" />
            <h4 className="text-xl font-black">Suelta aquí la foto de vuestra finca o palacio</h4>
            <p className="text-sm text-rose-200">Se adaptará automáticamente al suelo del simulador</p>
          </div>
        )}

        {/* Transparent Canvas drawing ONLY smoke columns & mortar tubes */}
        <canvas
          ref={canvasRef}
          onClick={fireSingleInstantShot}
          title="Haz clic para detonar el disparo"
          className="relative z-10 w-full h-full block cursor-pointer"
        />

        {/* Unified Top In-Canvas Bar (Flex container: Left HUD & Right Altitude Adjuster never collide!) */}
        <div className="absolute top-3 left-3 right-16 flex items-start justify-between gap-2 z-20 pointer-events-none">
          {/* Left: Compact info badge */}
          <div className="flex flex-col gap-1 min-w-0 max-w-[70%]">
            <div className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur border border-neutral-200 text-[11px] font-bold text-neutral-800 shadow-sm flex items-center gap-1.5 w-fit">
              <span className="text-rose-600">{tubeCount} Cañones</span>
              <span className="text-neutral-400">·</span>
              <span className="truncate">{colorMode === 'uniform' ? uniformColor.name.split(' ')[0] : 'Multicolor'}</span>
            </div>
            {venueScene === 'custom' && customVenueUrl && (
              <div className="px-2 py-0.5 rounded-lg bg-emerald-600/95 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 w-fit">
                <Camera className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[150px]">{customVenueName || 'Vuestra Foto'}</span>
              </div>
            )}
          </div>

          {/* Right: Height Fine-tuner Toggle (Clean, compact, leaving room for altitude marks on far right) */}
          {venueScene === 'custom' && customVenueUrl && (
            <div className="pointer-events-auto shrink-0 relative">
              <button
                onClick={() => setShowGroundAdjuster(!showGroundAdjuster)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors whitespace-nowrap ${
                  showGroundAdjuster || groundOffset > 0
                    ? 'bg-rose-600 text-white shadow-rose-600/30'
                    : 'bg-neutral-900/85 hover:bg-neutral-900 text-white backdrop-blur border border-white/20'
                }`}
                title="Ajustar altura de los cañones en vuestra foto"
              >
                <Sliders className="w-3 h-3 text-rose-300" />
                <span>{groundOffset > 0 ? `${groundOffset}px` : 'Altura'}</span>
              </button>

              {showGroundAdjuster && (
                <div className="absolute right-0 mt-2 p-3 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-2xl shadow-2xl w-56 text-white space-y-2 z-30">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-300">Nivel de Suelo:</span>
                    <span className="font-mono text-rose-400 font-bold">{groundOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="140"
                    step="2"
                    value={groundOffset}
                    onChange={(e) => setGroundOffset(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px] text-neutral-400">
                    <span>En la base</span>
                    <button
                      onClick={() => setGroundOffset(0)}
                      className="text-rose-400 hover:underline cursor-pointer"
                    >
                      Restablecer
                    </button>
                    <span>Más arriba</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Firing Alert Toast: positioned below the top bar so it never collides */}
        {isFiring && (
          <div className="absolute top-14 left-3 right-16 z-20 pointer-events-none">
            <div className="px-3 py-1 rounded-xl bg-rose-600 text-white text-[11px] font-bold shadow-md animate-pulse w-fit max-w-full truncate">
              DISPARO EN CURSO · Empuja la palanca TNT cuando quieras repetir
            </div>
          </div>
        )}

        {/* Foreground TNT Pedestal Box: sitting firmly in front of the cannons, synchronized with cannon ground height */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-[bottom] duration-150"
          style={{ bottom: `${Math.max(0, groundOffset)}px` }}
        >
          {useTntTrigger ? (
            /* Compact White Pedestal TNT Plunger firmly at ground level in front of cannons */
            <TntDetonatorBox
              onDetonate={fireSingleInstantShot}
              tubeCount={tubeCount}
              soundEnabled={soundEnabled}
            />
          ) : (
            /* Standard Single Instant Shot Button */
            <div className="pb-3">
              <button
                onClick={fireSingleInstantShot}
                className="flex items-center gap-2.5 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>¡Detonar Disparo! ({tubeCount} Cañones)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulator Control Panel */}
      <div className="p-6 bg-white border-t border-neutral-200 space-y-6">
        {/* Step 1: Venue scenery selector for couples (with Custom Photo Upload Option) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
              1. Escenario del Disparo:
            </label>
            {customVenueUrl && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 w-fit">
                ✓ Foto personalizada activa
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {/* 1. Custom Upload Card */}
            <div
              onClick={() => {
                if (!customVenueUrl) {
                  setShowPhotoSourceModal(true);
                } else {
                  setVenueScene('custom');
                }
              }}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative group flex items-center gap-2.5 ${
                venueScene === 'custom'
                  ? 'bg-rose-50/90 border-rose-500 text-neutral-900 shadow-sm ring-2 ring-rose-500/20'
                  : 'bg-gradient-to-br from-rose-50/40 to-neutral-50 border-dashed border-2 border-rose-300 text-neutral-700 hover:border-rose-400 hover:bg-rose-50/60'
              }`}
            >
              {customVenueUrl ? (
                <div className="relative shrink-0">
                  <img
                    src={customVenueUrl}
                    alt="Vuestra Finca"
                    className="w-11 h-11 rounded-xl object-cover border border-rose-300 shadow-xs"
                  />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" />
                  </span>
                </div>
              ) : (
                <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 group-hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <span className="text-xs font-black text-neutral-900 block truncate">
                  {customVenueUrl ? 'Vuestra Foto' : '📸 Foto / Cámara'}
                </span>
                <p className="text-[10px] text-neutral-500 leading-tight truncate">
                  {customVenueUrl ? (customVenueName || 'Personalizada') : 'En directo o galería'}
                </p>

                {customVenueUrl && (
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPhotoSourceModal(true);
                      }}
                      className="text-[10px] text-rose-600 hover:underline font-bold cursor-pointer"
                    >
                      Cambiar
                    </button>
                    <span className="text-neutral-300 text-[10px]">·</span>
                    <button
                      type="button"
                      onClick={removeCustomPhoto}
                      className="text-[10px] text-neutral-400 hover:text-rose-600 font-semibold cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2 to 5: Preset Real Spanish Venues */}
            {[
              {
                id: 'jardines',
                name: 'Jardines de Finca',
                desc: 'Césped esmeralda y arco floral',
                img: VENUE_PHOTOS.jardines.url,
              },
              {
                id: 'lago',
                name: 'Paseo del Lago',
                desc: 'Muelle de madera y agua azul',
                img: VENUE_PHOTOS.lago.url,
              },
              {
                id: 'palacio',
                name: 'Palacio Señorial / Masía',
                desc: 'Fachada noble y escalinata',
                img: VENUE_PHOTOS.palacio.url,
              },
              {
                id: 'vinedo',
                name: 'Viñedo al Atardecer',
                desc: 'Golden hour y colinas cálidas',
                img: VENUE_PHOTOS.vinedo.url,
              },
            ].map((v) => {
              const active = venueScene === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setVenueScene(v.id as any)}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    active
                      ? 'bg-rose-50 border-rose-500 text-neutral-900 shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={v.img}
                    alt={v.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-neutral-200 shadow-xs"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-neutral-900 block truncate">{v.name}</span>
                    <p className="text-[10px] text-neutral-500 leading-tight truncate">{v.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Ground Height Calibration Bar for Custom Photo */}
          {venueScene === 'custom' && customVenueUrl && (
            <div className="mt-3.5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">
                    Ajustar altura de los cañones en vuestra foto:
                  </span>
                  <p className="text-[11px] text-neutral-500 leading-tight">
                    Sube o baja los cañones para alinearlos exactamente con el césped, bordillo o terraza de la imagen
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <input
                  type="range"
                  min="0"
                  max="140"
                  step="2"
                  value={groundOffset}
                  onChange={(e) => setGroundOffset(Number(e.target.value))}
                  className="w-32 sm:w-44 accent-rose-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-rose-600 w-10 text-right">{groundOffset}px</span>
                <button
                  onClick={() => setGroundOffset(0)}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-neutral-200 rounded-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer transition-colors shadow-2xs"
                >
                  Base
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Cannons 1 to 9 */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-rose-500" />
              <span>2. Número de Cañones para el disparo (1 a 9 cañones):</span>
            </label>
            <span className="text-xs font-bold text-rose-600">{tubeCount} Cañones sincronizados</span>
          </div>

          <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setTubeCount(n);
                  if (activeEditingTube >= n) setActiveEditingTube(0);
                }}
                className={`py-2.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                  tubeCount === n
                    ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Color Mode & Distribution */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-rose-500" />
              <span>3. Elección de Color: ¿Todos de un color o varios colores?</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setColorMode('uniform')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                colorMode === 'uniform'
                  ? 'bg-rose-50 border-rose-500 text-neutral-900 shadow-sm ring-1 ring-rose-500/20'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-neutral-900">Todos del mismo color</span>
                <span
                  className="w-4 h-4 rounded-full border border-neutral-300 shadow-xs"
                  style={{ backgroundColor: uniformColor.hex }}
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                Los {tubeCount} cañones dispararán el tono: {uniformColor.name}
              </p>
            </button>

            <button
              onClick={() => setColorMode('custom')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                colorMode === 'custom'
                  ? 'bg-rose-50 border-rose-500 text-neutral-900 shadow-sm ring-1 ring-rose-500/20'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-neutral-900">Varios colores / Personalizado</span>
                <div className="flex -space-x-1">
                  {tubeColors.slice(0, Math.min(tubeCount, 4)).map((c, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-white shadow-xs inline-block"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">
                Elige qué color dispara cada cañón (combinación multicolor a tu gusto)
              </p>
            </button>
          </div>

          {/* Official Factory Palette & Stock Notice */}
          <div className="mb-4 p-3 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-neutral-800">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/IMG-20261023-WA0001_76527510.jpg"
                alt="Paleta oficial de fábrica 10 colores"
                className="w-16 h-10 object-cover rounded-lg border border-neutral-700 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-rose-400 uppercase tracking-wide">
                    Paleta Oficial de Fábrica (10 Colores Certificados)
                  </span>
                  <span className="text-[10px] bg-emerald-900/80 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-700">
                    Stock Real
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-0.5">
                  Solo están disponibles estos 10 colores oficiales Sbruffo Smoke 40 (Cat. T1). No se admiten colores fuera de esta gama certificada.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono bg-neutral-800 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
              Distancias: 14,5m vert · 3m rad · 19m público
            </div>
          </div>

          {/* Quick presets */}
          {colorMode === 'custom' && (
            <div className="mb-4 p-3 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-neutral-700">Combinaciones recomendadas:</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => applyDuoPreset(SMOKE_COLORS[9], SMOKE_COLORS[2])}
                  className="px-2.5 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-100 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F472B6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                  <span>Revelación Género (Rosa + Azul)</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyDuoPreset(SMOKE_COLORS[3], SMOKE_COLORS[0])}
                  className="px-2.5 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-100 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] border border-neutral-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15]" />
                  <span>Boda Real (Blanco + Oro)</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyDuoPreset(SMOKE_COLORS[6], SMOKE_COLORS[4])}
                  className="px-2.5 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-100 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  <span>Romance (Carmín + Esmeralda)</span>
                </button>
              </div>
            </div>
          )}

          {/* Individual tube picker if custom */}
          {colorMode === 'custom' && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-neutral-600 mb-2">
                Pulsa en un cañón para asignarle su color:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {Array.from({ length: tubeCount }).map((_, idx) => {
                  const assigned = tubeColors[idx] || uniformColor;
                  const isEditing = activeEditingTube === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveEditingTube(idx)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        isEditing
                          ? 'bg-rose-50 border-rose-500 shadow-sm ring-2 ring-rose-500/20'
                          : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-neutral-700">Cañón {idx + 1}</span>
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-300 shadow-xs"
                        style={{ backgroundColor: assigned.hex }}
                      />
                      <span className="text-[10px] font-semibold text-neutral-800 truncate w-full text-center">
                        {assigned.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Swatches Grid (Pure organic velvety colors, no glitter dots) */}
          <div>
            <p className="text-xs font-semibold text-neutral-600 mb-2">
              {colorMode === 'uniform'
                ? 'Color para todos los cañones:'
                : `Color para el Cañón ${activeEditingTube + 1}:`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {SMOKE_COLORS.map((c) => {
                const currentSelected =
                  colorMode === 'uniform' ? uniformColor.id === c.id : tubeColors[activeEditingTube]?.id === c.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => handleColorSelect(c)}
                    className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                      currentSelected
                        ? 'bg-rose-50 border-rose-500 shadow-xs ring-1 ring-rose-500'
                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-neutral-300 shrink-0 shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-800 truncate">{c.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Direct Detonation Footer Bar (No reset needed) */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
          <div className="text-xs text-neutral-700">
            <span className="font-bold text-neutral-900">Listo para probar:</span>{' '}
            {tubeCount} {tubeCount === 1 ? 'Cañón' : 'Cañones'} ·{' '}
            {colorMode === 'uniform' ? `Todo ${uniformColor.name}` : 'Combinación personalizada'} ·{' '}
            {venueScene === 'custom' && customVenueUrl ? (
              <span className="text-emerald-700 font-bold">Sobre vuestra foto propia</span>
            ) : (
              'Sin necesidad de reiniciar'
            )}
          </div>
          <button
            onClick={() => {
              canvasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              fireSingleInstantShot();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-rose-600/25 hover:scale-102 active:scale-98 transition-all cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>¡Detonar Disparo Ahora! ({tubeCount} Cañones)</span>
          </button>
        </div>
      </div>

      {/* Photo Source Chooser Modal (Dual: Camera on site OR Gallery upload) */}
      {showPhotoSourceModal && (
        <div
          onClick={() => setShowPhotoSourceModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-neutral-900 font-display">
                    Personalizar Escenario
                  </h4>
                  <p className="text-[11px] text-neutral-500">¿Cómo prefieres añadir la foto de vuestro lugar?</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPhotoSourceModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-5">
              {/* Option 1: Live Mobile Camera (Opens Camera Shutter directly on Mobile) */}
              <button
                type="button"
                onClick={() => {
                  setShowPhotoSourceModal(false);
                  cameraInputRef.current?.click();
                }}
                className="group flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-rose-500 hover:bg-rose-50/50 transition-all text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-sm text-neutral-900 group-hover:text-rose-600 transition-colors">
                      Hacer foto ahora con la cámara
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-rose-100 text-rose-700">
                      En el sitio
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Si estás ahora en la finca, jardín o palacio, abre la cámara de tu móvil para fotografiar el lugar y ver los cañones situados al instante.
                  </p>
                </div>
              </button>

              {/* Option 2: Gallery / Local Files */}
              <button
                type="button"
                onClick={() => {
                  setShowPhotoSourceModal(false);
                  galleryInputRef.current?.click();
                }}
                className="group flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-600/30 group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-extrabold text-sm text-neutral-900 group-hover:text-sky-600 transition-colors block">
                    Subir foto de la galería
                  </span>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Selecciona una imagen que ya tengas guardada en el carrete de tu móvil o en los archivos de tu dispositivo.
                  </p>
                </div>
              </button>

              {/* Option 3 (if photo already uploaded): Remove custom photo */}
              {customVenueUrl && (
                <button
                  type="button"
                  onClick={(e) => {
                    removeCustomPhoto(e);
                    setShowPhotoSourceModal(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quitar foto personalizada y volver a escenarios de muestra</span>
                </button>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Formatos: JPG, PNG, HEIC, WebP</span>
              <button
                type="button"
                onClick={() => setShowPhotoSourceModal(false)}
                className="text-neutral-500 hover:text-neutral-800 font-semibold cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
