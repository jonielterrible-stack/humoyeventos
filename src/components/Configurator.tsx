import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Send,
  MessageCircle,
  ShieldCheck,
  Truck,
  UserCheck,
  Layers,
  Palette,
  Zap,
  Bomb,
  Flame,
  Plus,
  Minus,
  Gift,
  AlertCircle,
  X,
  Tag,
  Check,
  Activity,
  PartyPopper,
} from 'lucide-react';
import { SMOKE_COLORS, SmokeColor } from '../data/smokeData';
import { dispatchLead } from '../utils/leadService';
import { assetUrl } from '../utils/assetUrl';

export type ConfigEffectType =
  | 'aereo_clasico'
  | 'confeti'
  | 'humo_bajo'
  | 'chispas_frias'
  | 'sonido_luces'
  | 'boda_completa';

export interface EffectOption {
  id: ConfigEffectType;
  title: string;
  desc: string;
  badge: string;
}

export const EFFECT_OPTIONS: EffectOption[] = [
  {
    id: 'aereo_clasico',
    title: '1. Humo Aéreo Vertical (1 a 9 Cañones)',
    desc: 'Disparo instantáneo vertical a 15m con apertura en cúpula cromática y disipación limpia en segundos.',
    badge: 'Nuestra Especialidad Nº1',
  },
  {
    id: 'chispas_frias',
    title: '2. Fuentes de Chispas Frías / Bengalas (Sparkulars)',
    desc: 'Chorro vertical luminoso de fuego frío de titanio de 2 a 5m que no quema la piel ni la ropa. Sin pólvora ni olor.',
    badge: 'Fuego Frío Inocuo',
  },
  {
    id: 'confeti',
    title: '3. Cañones de Confeti (Multicolor y Mariposas)',
    desc: 'Lluvia mágica de mariposas troqueladas que planean en el aire, papel blanco nieve o fiesta multicolor.',
    badge: 'Especial Baile & Salida',
  },
  {
    id: 'humo_bajo',
    title: '4. Máquina de Niebla Baja (Vals sobre las Nubes)',
    desc: 'Hielo seco con agua caliente: nube densa a ras de suelo que no mancha, no moja y no activa alarmas.',
    badge: '100% Vapor Limpio',
  },
  {
    id: 'sonido_luces',
    title: '5. Alquiler de Sonido, Luces & Discoteca Móvil (con DJ)',
    desc: 'Equipos de sonido PA para ceremonia/banquete, puentes de iluminación LED robotizada y DJ para barra libre.',
    badge: 'Producción Integral',
  },
  {
    id: 'boda_completa',
    title: 'Pack Boda Total 360° (Todo Incluido)',
    desc: 'Disparo de humo aéreo exterior + Cañones de confeti + Niebla baja en el vals + Chispas frías.',
    badge: 'Experiencia Total',
  },
];

export interface GuestAccessoryItem {
  id: string;
  name: string;
  shortDesc: string;
  unitPrice: number;
  minQty: number;
  stepQty: number;
  defaultQty: number;
  popularQtyPresets: number[];
  badge?: string;
  unitLabel: string;
  icon: 'flame' | 'confeti' | 'chispas' | 'pulseras' | 'gafas' | 'suelo';
}

export const GUEST_ACCESSORIES_LIST: GuestAccessoryItem[] = [
  {
    id: 'bengalas_humo_invitados',
    name: 'Bengalas de Humo de Mano de Colores (60s)',
    shortDesc: 'Anilla Wire-Pull de ignición fría y 60 segundos de humo denso. Pasillo de honor vibrante al salir.',
    unitPrice: 5.5,
    minQty: 5,
    stepQty: 5,
    defaultQty: 10,
    popularQtyPresets: [10, 20, 30, 50],
    badge: '★ Top Pasillo Nupcial',
    unitLabel: 'bengalas',
    icon: 'flame',
  },
  {
    id: 'canones_confeti_manuales',
    name: 'Cañones Manuales de Confeti para Amigos (40cm)',
    shortDesc: 'Tubo de disparo por giro con mariposas de seda o blanco nieve para el grupo de amigos.',
    unitPrice: 7.0,
    minQty: 2,
    stepQty: 2,
    defaultQty: 4,
    popularQtyPresets: [4, 6, 8, 12],
    badge: 'Disparo Grupal',
    unitLabel: 'cañones',
    icon: 'confeti',
  },
  {
    id: 'bengalas_chispas_largas',
    name: 'Bengalas Largas de Chispas (45cm)',
    shortDesc: 'Fuego frío luminoso de 45cm sin humo denso. Mágico para el corte de tarta y el vals.',
    unitPrice: 1.5,
    minQty: 10,
    stepQty: 10,
    defaultQty: 30,
    popularQtyPresets: [20, 30, 50, 100],
    badge: 'Corte de Tarta & Vals',
    unitLabel: 'bengalas',
    icon: 'chispas',
  },
  {
    id: 'pulseras_led_fiesta',
    name: 'Pulseras LED Luminosas Interactivas',
    shortDesc: 'Pulseras con luces LED multicolores para los invitados en la barra libre y discoteca.',
    unitPrice: 2.0,
    minQty: 20,
    stepQty: 10,
    defaultQty: 50,
    popularQtyPresets: [30, 50, 80, 120],
    badge: 'Fiesta & Barra Libre',
    unitLabel: 'pulseras',
    icon: 'pulseras',
  },
  {
    id: 'gafas_difraccion_corazones',
    name: 'Gafas de Difracción Visual Efecto Corazones',
    shortDesc: 'Transforman cada foco de luz, bengala y chispa en miles de corazones brillantes.',
    unitPrice: 2.5,
    minQty: 10,
    stepQty: 5,
    defaultQty: 20,
    popularQtyPresets: [15, 25, 40, 60],
    badge: 'Efecto Óptico Viral',
    unitLabel: 'gafas',
    icon: 'gafas',
  },
  {
    id: 'botes_humo_suelo',
    name: 'Botes de Humo de Suelo de Seguridad (90s)',
    shortDesc: 'Base ignífuga estable con activación por mecha para fotos de grupo y exteriores.',
    unitPrice: 9.0,
    minQty: 2,
    stepQty: 2,
    defaultQty: 4,
    popularQtyPresets: [2, 4, 6, 8],
    badge: 'Fotos de Grupo',
    unitLabel: 'botes',
    icon: 'suelo',
  },
];

export const Configurator: React.FC = () => {
  const [eventType, setEventType] = useState<'boda' | 'reveal' | 'festival' | 'corporativo'>('boda');
  // Multi-Selection of Effects in Section 2
  const [selectedEffects, setSelectedEffects] = useState<ConfigEffectType[]>(['aereo_clasico']);
  const [tubes, setTubes] = useState<number>(4);
  const [confettiType, setConfettiType] = useState<'mariposas' | 'blanco' | 'colores'>('mariposas');
  const [colorMode, setColorMode] = useState<'uniform' | 'mix'>('uniform');
  const [singleColor, setSingleColor] = useState<SmokeColor>(SMOKE_COLORS[9]); // Rosa Pastel
  const [mixDescription, setMixDescription] = useState<string>('2 Rosa Pastel y 2 Azul Eléctrico');
  const [hasTntTrigger, setHasTntTrigger] = useState<boolean>(false);
  const [province, setProvince] = useState<string>('Madrid');
  const [eventDate, setEventDate] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Multi-Selection of Guest Accessories & Extras
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, number>>({});

  // Coupon State: NEVER applied automatically
  const [couponInput, setCouponInput] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccessInfo, setCouponSuccessInfo] = useState<{ email?: string; name?: string } | null>(null);

  // Listen for verified coupon event from popup modal if user clicked "Usar mi código"
  React.useEffect(() => {
    const handleApplyFromModal = (e: any) => {
      const code = e.detail?.code;
      if (code) {
        setCouponInput(code);
        verifyAndApplyCoupon(code);
      }
    };
    window.addEventListener('hye_apply_verified_coupon', handleApplyFromModal);
    return () => window.removeEventListener('hye_apply_verified_coupon', handleApplyFromModal);
  }, []);

  // Multi-Effect Toggle in Section 2
  const toggleEffect = (id: ConfigEffectType) => {
    setSelectedEffects((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least one selected
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const hasAerialSmoke = selectedEffects.includes('aereo_clasico') || selectedEffects.includes('boda_completa');
  const hasConfetti = selectedEffects.includes('confeti') || selectedEffects.includes('boda_completa');
  const hasColdSparks = selectedEffects.includes('chispas_frias') || selectedEffects.includes('boda_completa');
  const hasLowSmoke = selectedEffects.includes('humo_bajo') || selectedEffects.includes('boda_completa');

  // Multi-Accessory Helpers
  const toggleAccessory = (id: string, defaultQty: number) => {
    setSelectedAccessories((prev) => {
      const next = { ...prev };
      if (next[id] !== undefined) {
        delete next[id];
      } else {
        next[id] = defaultQty;
      }
      return next;
    });
  };

  const updateAccessoryQty = (id: string, delta: number, min: number, step: number) => {
    setSelectedAccessories((prev) => {
      const current = prev[id] || min;
      const nextVal = Math.max(min, current + delta * step);
      return { ...prev, [id]: nextVal };
    });
  };

  const setAccessoryDirectQty = (id: string, qty: number) => {
    setSelectedAccessories((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  const selectedAccessoryEntries = Object.entries(selectedAccessories).filter(([_, qty]) => qty > 0);
  const totalAccessoriesCount = selectedAccessoryEntries.reduce((sum, [_, qty]) => sum + qty, 0);

  // Strict Coupon Verification against Registered Leads Database
  const verifyAndApplyCoupon = async (rawCode?: string) => {
    const code = (rawCode || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError('Por favor introduce el código que recibiste por correo electrónico.');
      return;
    }
    setIsVerifyingCoupon(true);
    setCouponError(null);

    try {
      const res = await fetch(`/api/discount-leads/verify-coupon?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (data.valid) {
        setCouponCode(data.couponCode);
        setDiscountApplied(true);
        setCouponSuccessInfo({ email: data.email, name: data.name });
        setCouponError(null);
      } else {
        // Fallback local verification if browser stored registration
        try {
          const localMap = JSON.parse(localStorage.getItem('hye_registered_emails') || '{}');
          const matchedEmail = Object.keys(localMap).find(
            (k) => localMap[k]?.toUpperCase() === code
          );
          if (matchedEmail) {
            setCouponCode(code);
            setDiscountApplied(true);
            setCouponSuccessInfo({ email: matchedEmail });
            setCouponError(null);
            setIsVerifyingCoupon(false);
            return;
          }
        } catch {
          // ignore
        }

        setDiscountApplied(false);
        setCouponCode('');
        setCouponSuccessInfo(null);
        setCouponError(
          data.message ||
            `El código "${code}" no está registrado. Para obtener tu 10% de descuento debes registrarte previamente con tu correo.`
        );
      }
    } catch (err) {
      console.error('Error verificando cupón:', err);
      // Fallback local check
      try {
        const localMap = JSON.parse(localStorage.getItem('hye_registered_emails') || '{}');
        const matchedEmail = Object.keys(localMap).find(
          (k) => localMap[k]?.toUpperCase() === code
        );
        if (matchedEmail) {
          setCouponCode(code);
          setDiscountApplied(true);
          setCouponSuccessInfo({ email: matchedEmail });
          setCouponError(null);
          setIsVerifyingCoupon(false);
          return;
        }
      } catch {
        // ignore
      }
      setCouponError('Error al validar el cupón en el servidor. Comprueba tu código.');
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountApplied(false);
    setCouponCode('');
    setCouponInput('');
    setCouponSuccessInfo(null);
    setCouponError(null);
  };

  const generateWhatsAppMessage = () => {
    const colorText =
      colorMode === 'uniform'
        ? `Todos del color: ${singleColor.name}`
        : `Combinación personalizada: ${mixDescription}`;

    const eventLabel =
      eventType === 'boda'
        ? 'Boda Nupcial'
        : eventType === 'reveal'
        ? 'Revelación de Género'
        : eventType === 'festival'
        ? 'Festival / Fiesta'
        : 'Evento Corporativo / Rodaje';

    const effectsFormattedList = selectedEffects
      .map((eff) => {
        const opt = EFFECT_OPTIONS.find((o) => o.id === eff);
        return opt ? opt.title : eff;
      })
      .join('\n  + ');

    // Accessories Section for WhatsApp (No prices displayed, as requested: the team quotes upon contact)
    let accessoriesSection = '';
    if (selectedAccessoryEntries.length > 0) {
      const itemsList = selectedAccessoryEntries
        .map(([id, qty]) => {
          const item = GUEST_ACCESSORIES_LIST.find((a) => a.id === id);
          if (!item) return '';
          return `  • ${qty} ${item.unitLabel} - ${item.name}`;
        })
        .filter(Boolean)
        .join('\n');
      accessoriesSection = `\n· Accesorios y Extras para Invitados (${totalAccessoriesCount} unidades seleccionadas):\n${itemsList}`;
    } else {
      accessoriesSection = '\n· Accesorios para invitados: Ninguno seleccionado (solo efecto principal en finca)';
    }

    // Discount Text for WhatsApp: ONLY if legitimately applied
    let discountText = '';
    if (discountApplied && couponCode) {
      discountText = `\n🎁 *Cupón 10% Oficial Aplicado:* Código verificado *${couponCode}* (Registrado a nombre de ${couponSuccessInfo?.email || 'mi correo'}) (-10% de descuento en presupuesto final)`;
    } else {
      discountText = '\n· Cupón 10% de descuento: No aplicado (sin cupón registrado)';
    }

    const text = `¡Hola Humo Y Efectos! 👋 Quiero consultar disponibilidad y presupuesto personalizado para mi ${eventLabel.toUpperCase()}:
· Efectos / Servicios seleccionados (${selectedEffects.length}):
  + ${effectsFormattedList}
${
  hasAerialSmoke
    ? `· Cañones de humo aéreo: ${tubes} Cañones (Disparo simultáneo instantáneo de 1 a 9)\n· Colores humo: ${colorText}\n`
    : ''
}${
  hasConfetti
    ? `· Carga de confeti: ${confettiType === 'mariposas' ? 'Mariposas de seda románticas' : confettiType === 'blanco' ? 'Papel blanco nieve' : 'Multicolor fiesta'}\n· Cañones confeti: ${tubes} cañones\n`
    : ''
}· Disparador TNT Retro para papás: ${hasTntTrigger ? 'Sí (Caja TNT vintage con palanca)' : 'Mando inalámbrico estándar'}${accessoriesSection}
· Modalidad: Asistencia y Disparo Presencial en Finca (Técnico Oficial / Nuestro Equipo)${discountText}
· Lugar / Finca / Provincia: ${province}
· Fecha estimada: ${eventDate || 'Por confirmar'}
· Contacto: ${clientName || 'Cliente'} (${clientPhone || 'WhatsApp'})

¿Podríais confirmarme disponibilidad y presupuesto personalizado con esta selección? Muchas gracias.`;

    return `https://wa.me/34600082462?text=${encodeURIComponent(text)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (clientName.trim() || clientPhone.trim()) {
      const accessoriesSummary = selectedAccessoryEntries
        .map(([id, qty]) => {
          const item = GUEST_ACCESSORIES_LIST.find((a) => a.id === id);
          return item ? `${qty}x ${item.name}` : '';
        })
        .filter(Boolean)
        .join(', ');

      const effectsSummary = selectedEffects
        .map((eff) => {
          const opt = EFFECT_OPTIONS.find((o) => o.id === eff);
          return opt ? opt.title : eff;
        })
        .join(' + ');

      dispatchLead({
        tipo: 'configurador',
        name: clientName.trim(),
        phone: clientPhone.trim(),
        date: eventDate,
        venue: province,
        eventType,
        couponCode: discountApplied ? couponCode : undefined,
        effects: `${effectsSummary}${hasAerialSmoke ? ` (${tubes} Cañones: ${colorMode === 'uniform' ? singleColor.name : mixDescription})` : ''}${accessoriesSummary ? ` + Extras: ${accessoriesSummary}` : ''}`,
      }).catch(console.error);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-10 shadow-xl">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 tracking-wide uppercase mb-2">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Configurador Oficial Humo Y Efectos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
          Personaliza tu Efecto Principal y Accesorios para Invitados
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-2">
          Combina los efectos que sueñas para tu gran día (puedes elegir varios: humo, bengalas, confeti, etc.) y añade accesorios para que tus invitados participen. Solicita tu cotización personalizada directamente por WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 space-y-7">
          {/* Step 1: Event Type */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
              1. Tipo de Celebración
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'boda', label: 'Boda Nupcial' },
                { id: 'reveal', label: 'Revelación de Género' },
                { id: 'festival', label: 'Festival / Fiesta' },
                { id: 'corporativo', label: 'Marca / Rodaje' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    const newType = t.id as any;
                    setEventType(newType);
                    if (newType === 'reveal') {
                      setHasTntTrigger(true);
                    }
                  }}
                  className={`p-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    eventType === t.id
                      ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Effect Multi-Selection */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
                2. Modalidad de Efecto o Servicio (Puedes seleccionar varias opciones)
              </label>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Multi-selección activa ({selectedEffects.length} seleccionados)
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              Puedes marcar <strong>dos o más opciones</strong> a la vez para combinarlas (ej. Humo Aéreo + Bengalas / Chispas Frías + Confeti):
            </p>
            <div className="space-y-2.5">
              {EFFECT_OPTIONS.map((item) => {
                const isSelected = selectedEffects.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleEffect(item.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-rose-50/70 border-rose-500 text-neutral-900 shadow-xs ring-2 ring-rose-500/20'
                        : 'bg-neutral-50/80 border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-neutral-900">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">{item.desc}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Confetti options */}
          {hasConfetti && (
            <div className="p-4 bg-fuchsia-50/60 border border-fuchsia-200 rounded-2xl space-y-3">
              <label className="block text-xs font-bold text-fuchsia-950 uppercase tracking-wider">
                Selecciona la Carga de Confeti:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'mariposas', title: 'Mariposas de Seda', sub: 'Vuelo lento en suspensión' },
                  { id: 'blanco', title: 'Papel Blanco Mate', sub: 'Efecto lluvia de nieve' },
                  { id: 'colores', title: 'Multicolor / Metalizado', sub: 'Para barra libre y fiesta' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setConfettiType(c.id as any)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      confettiType === c.id
                        ? 'bg-white border-fuchsia-600 shadow-sm ring-1 ring-fuchsia-500/30'
                        : 'bg-white/60 border-fuchsia-200 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-900">{c.title}</div>
                    <div className="text-[11px] text-neutral-500">{c.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Number of Cannons & Colors (Visible if Aerial Smoke or Confetti is chosen) */}
          {(hasAerialSmoke || hasConfetti) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>
                    3. Número de Cañones ({hasAerialSmoke && hasConfetti ? 'Humo Aéreo y Confeti' : hasConfetti ? 'Confeti' : 'Humo Aéreo'})
                  </span>
                </label>
                <span className="text-xs font-bold text-rose-600">{tubes} Cañones</span>
              </div>

              <div className="grid grid-cols-9 gap-1.5 sm:gap-2 mb-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setTubes(n)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      tubes === n
                        ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              {/* Color Mode Selection (Visible when smoke is active) */}
              {hasAerialSmoke && (
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800">Distribución de Colores de Humo:</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setColorMode('uniform')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          colorMode === 'uniform' ? 'bg-white text-rose-600 shadow-sm border border-neutral-200' : 'text-neutral-500'
                        }`}
                      >
                        Todos de un color
                      </button>
                      <button
                        type="button"
                        onClick={() => setColorMode('mix')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          colorMode === 'mix' ? 'bg-white text-rose-600 shadow-sm border border-neutral-200' : 'text-neutral-500'
                        }`}
                      >
                        Varios colores
                      </button>
                    </div>
                  </div>

                  {/* Factory Palette 10 Colors Banner */}
                  <div className="p-3 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg')}
                        alt="Paleta oficial 10 colores de fábrica certificados para disparo vertical"
                        className="w-16 h-10 object-cover object-center rounded-lg border border-neutral-700 shrink-0 shadow-sm"
                      />
                      <div>
                        <span className="text-xs font-bold text-rose-400 block">
                          Gama Oficial de Fábrica (10 Colores Certificados)
                        </span>
                        <p className="text-[11px] text-neutral-300">
                          Disponemos exclusivamente de estos 10 colores homologados (Sbruffo Smoke 40). No se admiten colores fuera de esta paleta oficial.
                        </p>
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/80 shrink-0 self-start sm:self-auto">
                      Stock Permanente 10 Tonos
                    </div>
                  </div>

                  {colorMode === 'uniform' ? (
                    <div>
                      <p className="text-[11px] text-neutral-500 mb-2">
                        Selecciona cuál de los 10 colores oficiales tendrán los {tubes} cañones:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {SMOKE_COLORS.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSingleColor(c)}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                              singleColor.id === c.id
                                ? 'bg-rose-50/80 border-rose-500 shadow-sm ring-1 ring-rose-500'
                                : 'bg-white/70 border-neutral-200 hover:bg-white hover:border-neutral-300'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-neutral-300 shrink-0 shadow-xs"
                              style={{ backgroundColor: c.hex }}
                            />
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-neutral-800 truncate block">
                                {c.name.split('/')[0].trim()}
                              </span>
                              <span className="text-[9px] text-neutral-500 font-mono">Tubo Nº {c.tubeIndex}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Indícanos cuántos cañones de cada uno de los 10 colores oficiales te gustaría (ej: "2 Rosa Pastel y 2 Azul Eléctrico"):
                      </label>
                      <input
                        type="text"
                        value={mixDescription}
                        onChange={(e) => setMixDescription(e.target.value)}
                        placeholder="Ej: 2 Rosa Pastel, 2 Azul Eléctrico y 1 Amarillo Oro"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-rose-500"
                      />
                      <p className="text-[10px] text-neutral-500 mt-1">
                        Recuerda que solo se pueden combinar los 10 colores oficiales mostrados en la paleta de fábrica.
                      </p>
                    </div>
                  )}

                  {/* Safety Regulations Badge under cannons */}
                  <div className="p-2.5 bg-neutral-100 rounded-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-600">
                    <span className="flex items-center gap-1.5 font-bold text-neutral-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                      Normas Técnicas y Distancias Obligatorias (CE Cat. T1):
                    </span>
                    <span className="font-medium text-neutral-700">
                      14,5 m vertical · 3 m radial · 19 m al público · Exteriores en soporte firme
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Disparador TNT Retro */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
              4. Opciones de Disparo Especial
            </label>
            <label
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                hasTntTrigger ? 'bg-amber-50 border-amber-400' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={hasTntTrigger}
                  onChange={(e) => setHasTntTrigger(e.target.checked)}
                  className="accent-amber-600 w-4 h-4 rounded cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Bomb className="w-4 h-4 text-amber-600" />
                    Disparador TNT Retro con Palanca de Empuje
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Caja vintage con palanca para bajar juntos. ¡El efecto más viral y fotogénico para Revelación de Género!
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Step 5: ACCESORIOS Y EXTRAS MULTI-SELECCIÓN PARA INVITADOS (SIN PRECIOS EN LA WEB) */}
          <div className="p-5 bg-gradient-to-b from-rose-50/40 via-white to-neutral-50 rounded-3xl border-2 border-rose-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black text-rose-600 uppercase tracking-wider mb-0.5">
                  <PartyPopper className="w-3.5 h-3.5 text-rose-500" />
                  <span>5. Accesorios & Extras para Invitados</span>
                </div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  Selecciona varios accesorios y cantidades para tus invitados
                </h3>
                <p className="text-xs text-neutral-600">
                  Puedes marcar todos los que desees. Se añadirán a tu cotización personalizada sin compromiso por WhatsApp.
                </p>
              </div>
              {selectedAccessoryEntries.length > 0 && (
                <div className="text-right shrink-0 bg-white px-3 py-1.5 rounded-xl border border-rose-200 shadow-xs">
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase">Accesorios elegidos</span>
                  <span className="text-sm font-black text-rose-600">{totalAccessoriesCount} uds seleccionadas</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {GUEST_ACCESSORIES_LIST.map((acc) => {
                const isSelected = selectedAccessories[acc.id] !== undefined;
                const currentQty = selectedAccessories[acc.id] || acc.defaultQty;

                return (
                  <div
                    key={acc.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-white border-rose-400 shadow-sm ring-1 ring-rose-400/30'
                        : 'bg-white/80 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <label className="flex items-start gap-3 cursor-pointer flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAccessory(acc.id, acc.defaultQty)}
                          className="mt-1 accent-rose-600 w-4 h-4 rounded cursor-pointer shrink-0"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900">{acc.name}</span>
                            {acc.badge && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 shrink-0">
                                {acc.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 leading-snug">{acc.shortDesc}</p>
                          <div className="text-[11px] font-semibold text-rose-700 pt-0.5 flex items-center gap-1.5">
                            <span>Precio incluido en presupuesto a medida</span>
                            <span className="text-neutral-400 font-normal">· Consultar directamente</span>
                          </div>
                        </div>
                      </label>

                      {/* Right Selected Indicator */}
                      {isSelected && (
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 block">
                            {currentQty} {acc.unitLabel}
                          </span>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">
                            En cotización
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Quantity Selector when Checked */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/80 p-2.5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-neutral-700">Cantidad para invitados:</span>
                          <div className="inline-flex items-center bg-white border border-neutral-300 rounded-lg shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateAccessoryQty(acc.id, -1, acc.minQty, acc.stepQty)}
                              className="p-1.5 text-neutral-600 hover:text-rose-600 hover:bg-neutral-100 rounded-l-lg transition-colors cursor-pointer"
                              title="Restar cantidad"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min={acc.minQty}
                              step={acc.stepQty}
                              value={currentQty}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val >= 1) {
                                  setAccessoryDirectQty(acc.id, val);
                                }
                              }}
                              className="w-12 text-center text-xs font-bold text-neutral-900 border-x border-neutral-200 py-1 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateAccessoryQty(acc.id, 1, acc.minQty, acc.stepQty)}
                              className="p-1.5 text-neutral-600 hover:text-rose-600 hover:bg-neutral-100 rounded-r-lg transition-colors cursor-pointer"
                              title="Sumar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Quick Presets for Invitados */}
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-neutral-400 font-medium mr-1">Rápido:</span>
                          {acc.popularQtyPresets.map((qty) => (
                            <button
                              key={qty}
                              type="button"
                              onClick={() => setAccessoryDirectQty(acc.id, qty)}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                currentQty === qty
                                  ? 'bg-rose-600 text-white shadow-2xs'
                                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              {qty}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 6: Service Mode */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
              6. Modalidad de Servicio Oficial (Exclusivo en Finca)
            </label>
            <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50/80 via-white to-rose-50/40 rounded-2xl border-2 border-rose-500/40 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-neutral-900">
                      Montaje y Disparo Exclusivo con Técnico en Finca
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      100% Cero Problemas
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    <strong>No enviamos cañones por paquetería:</strong> Para garantizar la máxima seguridad, cumplimiento estricto de distancias reglamentarias (CE Cat. T1) y cero fallos en el momento cumbre, <strong>acudo personalmente yo o un técnico especialista cualificado de nuestro equipo</strong> directamente a la finca o lugar de la celebración.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-neutral-700 font-medium border-t border-rose-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> Montaje y anclaje antivuelco
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> Coordinación con fotógrafo / DJ
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> Detonación en el segundo exacto
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Box: 5 cols */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-neutral-50 border border-neutral-200 rounded-3xl p-6 shadow-md space-y-5">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                Resumen de Configuración
              </span>
              <p className="text-xl font-extrabold text-neutral-900 tracking-tight font-display mt-1">
                Presupuesto a Medida
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Efectos seleccionados + Accesorios para invitados. Consulta cotización directa y disponibilidad por WhatsApp.
              </p>
            </div>

            {/* Config Specs */}
            <div className="space-y-2.5 text-xs text-neutral-700">
              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Celebración:</span>
                <span className="font-bold text-neutral-900">
                  {eventType === 'boda'
                    ? 'Boda Nupcial'
                    : eventType === 'reveal'
                    ? 'Revelación de Género'
                    : eventType === 'festival'
                    ? 'Festival / Fiesta'
                    : 'Marca / Rodaje'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Tipo de disparo:</span>
                <span className="font-bold text-neutral-900">Disparo instantáneo único</span>
              </div>

              {hasTntTrigger && (
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-neutral-500">Disparador:</span>
                  <span className="font-bold text-amber-800">Caja TNT Retro con Palanca</span>
                </div>
              )}

              <div className="py-2 border-b border-neutral-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Efectos seleccionados:</span>
                  <span className="font-bold text-rose-600 text-xs">
                    {selectedEffects.length} {selectedEffects.length === 1 ? 'efecto' : 'efectos combinados'}
                  </span>
                </div>
                <div className="space-y-1 pl-1">
                  {selectedEffects.map((eff) => {
                    const opt = EFFECT_OPTIONS.find((o) => o.id === eff);
                    return (
                      <div key={eff} className="flex items-center gap-1.5 text-xs text-neutral-900 font-bold">
                        <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{opt ? opt.title : eff}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {hasAerialSmoke && (
                <>
                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">Número de cañones:</span>
                    <span className="font-bold text-rose-600">{tubes} Cañones simultáneos</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-neutral-200">
                    <span className="text-neutral-500">Color / Colores:</span>
                    <span className="font-bold text-neutral-900 text-right max-w-[200px] truncate">
                      {colorMode === 'uniform' ? singleColor.name : mixDescription}
                    </span>
                  </div>
                </>
              )}

              {hasConfetti && !hasAerialSmoke && (
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-neutral-500">Carga confeti:</span>
                  <span className="font-bold text-rose-600">
                    {confettiType === 'mariposas' ? 'Mariposas de Seda' : confettiType === 'blanco' ? 'Papel Blanco' : 'Multicolor'} ({tubes} cañones)
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Modalidad:</span>
                <span className="font-bold text-rose-700">Técnico presencial en finca</span>
              </div>

              {/* LISTA DESGLOSADA DE ACCESORIOS PARA INVITADOS EN EL RESUMEN (SIN PRECIOS) */}
              {selectedAccessoryEntries.length > 0 && (
                <div className="p-3 bg-white border border-rose-200 rounded-2xl space-y-2 mt-2 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                    <span className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                      <PartyPopper className="w-3.5 h-3.5 text-rose-500" />
                      Accesorios para Invitados:
                    </span>
                    <span className="font-bold text-rose-600 text-xs">{totalAccessoriesCount} uds en total</span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedAccessoryEntries.map(([id, qty]) => {
                      const item = GUEST_ACCESSORIES_LIST.find((a) => a.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-[11px]">
                          <span className="text-neutral-700 truncate max-w-[190px]">
                            {item.name}
                          </span>
                          <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-[10px]">
                            {qty} {item.unitLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GESTIÓN ESTRICTA DEL CUPÓN DEL 10%: NUNCA AUTOMÁTICO */}
              <div className="pt-2">
                {discountApplied ? (
                  <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-400 rounded-2xl space-y-2 shadow-sm animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-950 font-black flex items-center gap-1.5 text-xs">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Cupón 10% Oficial Verificado</span>
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950 border border-emerald-300">
                        -10% APLICADO
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="font-mono font-black text-emerald-800 text-sm tracking-wider">
                          {couponCode}
                        </div>
                        {couponSuccessInfo?.email && (
                          <div className="text-[10px] text-emerald-700">
                            Registrado a: <span className="font-medium">{couponSuccessInfo.email}</span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-[10px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-red-200"
                        title="Quitar este cupón"
                      >
                        <X className="w-3 h-3" />
                        <span>Quitar</span>
                      </button>
                    </div>

                    <div className="pt-1.5 border-t border-emerald-200/60 flex justify-between text-[11px] text-emerald-900 font-medium">
                      <span>Descuento verificado:</span>
                      <span className="font-bold text-emerald-800">-10% en tu presupuesto final oficial</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-neutral-100/80 border border-neutral-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-rose-500" />
                        <span>¿Tienes un Cupón del 10%?</span>
                      </span>
                      <span className="text-[10px] text-neutral-500 font-medium">
                        * Requiere registro
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="Código recibido por email"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          if (couponError) setCouponError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            verifyAndApplyCoupon();
                          }
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 uppercase font-mono tracking-wider"
                      />
                      <button
                        type="button"
                        disabled={isVerifyingCoupon}
                        onClick={() => verifyAndApplyCoupon()}
                        className="px-3.5 py-1.5 bg-neutral-900 hover:bg-black disabled:bg-neutral-400 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
                      >
                        {isVerifyingCoupon ? 'Verificando...' : 'Aplicar'}
                      </button>
                    </div>

                    {couponError && (
                      <div className="p-2 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-700 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{couponError}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-0.5">
                      <span>Solo códigos enviados por nuestro sistema.</span>
                      <button
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('hye_open_discount_modal'))}
                        className="text-rose-600 font-bold hover:underline cursor-pointer"
                      >
                        ¿No lo tienes? Regístrate aquí
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder="Vuestro nombre (ej. Elena y David)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-rose-500"
                />

                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-rose-500"
                >
                  <option value="Madrid">Madrid (Zona Centro)</option>
                  <option value="Toledo">Toledo (Zona Centro)</option>
                  <option value="Talavera de la Reina">Talavera de la Reina (Sede Central)</option>
                  <option value="Ávila">Ávila</option>
                  <option value="Guadalajara">Guadalajara</option>
                  <option value="Segovia">Segovia</option>
                  <option value="Ciudad Real">Ciudad Real</option>
                  <option value="Cuenca">Cuenca</option>
                  <option value="Cáceres">Cáceres</option>
                  <option value="Barcelona">Barcelona</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Sevilla">Sevilla</option>
                  <option value="Asturias">Asturias</option>
                  <option value="Cantabria">Cantabria</option>
                  <option value="Galicia">Galicia</option>
                  <option value="País Vasco">País Vasco</option>
                  <option value="Zaragoza">Zaragoza</option>
                  <option value="Otra provincia">Otra provincia de España</option>
                </select>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs">
                  ✓ ¡Configuración guardada! Haz clic en WhatsApp abajo para hablar con un especialista.
                </div>
              )}

              {/* Direct WhatsApp Action Button */}
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pedir Presupuesto por WhatsApp (1 Clic)</span>
              </a>

              <p className="text-[11px] text-neutral-500 text-center">
                Te enviamos la cotización detallada en menos de 15 minutos sin compromiso.
              </p>
            </form>

            {/* Trust checkmarks */}
            <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-[11px] text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Niebla baja de hielo seco 100% vapor limpio que no moja ni mancha el salón.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cañones aéreos con disipación limpia en altura respetando distancia de seguridad.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
