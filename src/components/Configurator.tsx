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
} from 'lucide-react';
import { SMOKE_COLORS, SmokeColor } from '../data/smokeData';
import { dispatchLead } from '../utils/leadService';

export type ConfigEffectType =
  | 'aereo_clasico'
  | 'confeti'
  | 'humo_bajo'
  | 'chispas_frias'
  | 'sonido_luces'
  | 'boda_completa';

export const Configurator: React.FC = () => {
  const [eventType, setEventType] = useState<'boda' | 'reveal' | 'festival' | 'corporativo'>('boda');
  const [effectType, setEffectType] = useState<ConfigEffectType>('aereo_clasico');
  const [tubes, setTubes] = useState<number>(4);
  const [confettiType, setConfettiType] = useState<'mariposas' | 'blanco' | 'colores'>('mariposas');
  const [colorMode, setColorMode] = useState<'uniform' | 'mix'>('uniform');
  const [singleColor, setSingleColor] = useState<SmokeColor>(SMOKE_COLORS[9]); // Rosa Pastel
  const [mixDescription, setMixDescription] = useState<string>('2 Rosa Pastel y 2 Azul Eléctrico');
  const [hasTntTrigger, setHasTntTrigger] = useState<boolean>(false);
  const [hasBengalas, setHasBengalas] = useState<boolean>(true);
  const [hasSparklers, setHasSparklers] = useState<boolean>(false);
  const [serviceMode, setServiceMode] = useState<'tecnico'>('tecnico');
  const [province, setProvince] = useState<string>('Madrid');
  const [eventDate, setEventDate] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('hye_discount_coupon_claimed');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.couponCode) {
          setCouponCode(parsed.couponCode);
          setDiscountApplied(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code.includes('10') || code.includes('5') || code.includes('BODA') || code.length >= 4) {
      setCouponCode(code || 'BODA10MAGIA');
      setDiscountApplied(true);
    }
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

    const effectLabel =
      effectType === 'aereo_clasico'
        ? '1. Humo Aéreo Vertical (Disparo instantáneo de 1 a 9 cañones a 15m)'
        : effectType === 'confeti'
        ? `2. Cañones de Confeti (${
            confettiType === 'mariposas'
              ? 'Lluvia de Mariposas de seda para el baile/salida'
              : confettiType === 'blanco'
              ? 'Papel Blanco Mate efecto Nieve pura'
              : 'Confeti Fiesta Multicolor y Metalizado'
          })`
        : effectType === 'humo_bajo'
        ? '3. Máquina de Niebla Baja / Humo Bajo (Vals sobre las Nubes con Hielo Seco - 100% vapor limpio, cero manchas)'
        : effectType === 'chispas_frias'
        ? '4. Fuentes de Chispas Frías Sparkulars (Fuego frío que no quema)'
        : effectType === 'sonido_luces'
        ? '5. Alquiler de Sonido Profesional, Iluminación LED & Discoteca Móvil con DJ'
        : 'Pack Boda Total 360° (Humo Aéreo + Confeti + Niebla Baja + Chispas Frías)';

    const discountText = discountApplied
      ? `\n🎁 *Cupón de Descuento 10%:* Aplicado con código *${couponCode || 'BODA10MAGIA'}* (-10% en presupuesto)`
      : '';

    const text = `¡Hola Humo Y Efectos! 👋 Quiero consultar disponibilidad y presupuesto personalizado para mi ${eventLabel.toUpperCase()}:
· Servicio / Efecto principal: ${effectLabel}
${
  effectType === 'aereo_clasico' || effectType === 'boda_completa'
    ? `· Cañones seleccionados: ${tubes} Cañones (Disparo simultáneo instantáneo de 1 a 9)\n· Colores humo: ${colorText}`
    : ''
}
${
  effectType === 'confeti'
    ? `· Tipo de confeti: ${confettiType === 'mariposas' ? 'Mariposas de seda románticas' : confettiType === 'blanco' ? 'Papel blanco nieve' : 'Multicolor fiesta'}\n· Número de cañones confeti: ${tubes} cañones`
    : ''
}
· Disparador TNT Retro para papás: ${hasTntTrigger ? 'Sí (Caja TNT vintage)' : 'Mando inalámbrico estándar'}
· Complemento bengalas de mano: ${hasBengalas ? 'Sí' : 'No'}
· Complemento chispas frías: ${hasSparklers ? 'Sí (Sparkulars)' : 'No'}
· Modalidad: Asistencia y Disparo Presencial en Finca (Técnico Oficial / Nuestro Equipo)${discountText}
· Lugar / Finca / Provincia: ${province}
· Fecha estimada: ${eventDate || 'Por confirmar'}
· Contacto: ${clientName || 'Cliente'} (${clientPhone || 'WhatsApp'})

¿Podríais confirmarme disponibilidad y presupuesto con el 10% de descuento aplicado? Muchas gracias.`;

    return `https://wa.me/34600082462?text=${encodeURIComponent(text)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (clientName.trim() || clientPhone.trim()) {
      dispatchLead({
        tipo: 'configurador',
        name: clientName.trim(),
        phone: clientPhone.trim(),
        date: eventDate,
        venue: province,
        eventType,
        couponCode: discountApplied ? couponCode : undefined,
        effects: `${tubes} Cañones (${colorMode === 'uniform' ? singleColor.name : mixDescription})`,
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
          Personaliza tu Disparo Instantáneo (1 a 9 Cañones)
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-2">
          Un solo disparo instantáneo sincronizado que abre en el cielo a 15 metros y se disipa en segundos.
          Elige si prefieres todos de un color o repartir varios colores entre los cañones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 space-y-6">
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
                    setEventType(t.id as any);
                    if (t.id === 'reveal') {
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

          {/* Step 2: Effect */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
              2. Modalidad de Efecto o Servicio (Orden de Especialidad)
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'aereo_clasico',
                  title: '1. Humo Aéreo Vertical (1 a 9 Cañones)',
                  desc: 'Disparo instantáneo vertical a 15m con apertura en cúpula cromática y disipación limpia en segundos.',
                  badge: 'Nuestra Especialidad Nº1',
                },
                {
                  id: 'confeti',
                  title: '2. Cañones de Confeti (Mariposas, Nieve Blanca o Fiesta)',
                  desc: 'Lluvia mágica de mariposas troqueladas que planean en el aire, papel blanco nieve o fiesta multicolor.',
                  badge: 'Especial Baile & Salida',
                },
                {
                  id: 'humo_bajo',
                  title: '3. Máquina de Niebla Baja (Vals sobre las Nubes)',
                  desc: 'Hielo seco con agua caliente: nube densa a ras de suelo que no mancha, no moja y no activa alarmas.',
                  badge: '100% Vapor Limpio',
                },
                {
                  id: 'chispas_frias',
                  title: '4. Fuentes de Chispas Frías (Sparkulars)',
                  desc: 'Chorro vertical de fuego frío de titanio de 2 a 5m que no quema la piel ni la ropa. Sin pólvora ni olor.',
                  badge: 'Fuego Frío Inocuo',
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
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setEffectType(item.id as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    effectType === item.id
                      ? 'bg-rose-50/60 border-rose-500 text-neutral-900 shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">{item.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">{item.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      effectType === item.id ? 'border-rose-600 bg-rose-600 text-white' : 'border-neutral-300'
                    }`}
                  >
                    {effectType === item.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opciones especiales para Confeti */}
          {effectType === 'confeti' && (
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

          {/* Step 3: Number of Cannons (1 to 9) */}
          {(effectType === 'aereo_clasico' || effectType === 'boda_completa' || effectType === 'confeti') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>
                    3. Número de Cañones ({effectType === 'confeti' ? 'de Confeti' : 'de Humo Aéreo'})
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

              {/* Color Mode Selection */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Distribución de Colores:</span>
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
                      src="/assets/aistudio/IMG-20261023-WA0001_76527510.jpg"
                      alt="Paleta oficial 10 colores de fábrica"
                      className="w-16 h-10 object-cover rounded-lg border border-neutral-700 shrink-0"
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
            </div>
          )}

          {/* Step 4: Complementos & Disparador TNT */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
              4. Opciones Especiales y Complementos
            </label>
            <div className="space-y-3">
              {/* TNT Trigger Option Card */}
              <label
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                  hasTntTrigger ? 'bg-amber-50 border-amber-400' : 'bg-neutral-50 border-neutral-200'
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                    hasBengalas ? 'bg-rose-50/60 border-rose-300' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={hasBengalas}
                      onChange={(e) => setHasBengalas(e.target.checked)}
                      className="accent-rose-600 w-4 h-4 rounded cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Pack Bengalas de Mano</span>
                      <span className="text-[11px] text-neutral-500">Anilla Wire-Pull de ignición fría</span>
                    </div>
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                    hasSparklers ? 'bg-rose-50/60 border-rose-300' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={hasSparklers}
                      onChange={(e) => setHasSparklers(e.target.checked)}
                      className="accent-rose-600 w-4 h-4 rounded cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Fuentes Fuego Frío</span>
                      <span className="text-[11px] text-neutral-500">Chispas sin humo para salón de baile</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Step 5: Service Mode */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
              5. Modalidad de Servicio Oficial (Exclusivo en Finca)
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

        {/* Right Summary Box */}
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
                Sin precios fijos: adaptado a la fecha, cañones seleccionados y provincia.
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

              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Efecto:</span>
                <span className="font-bold text-neutral-900 text-right">
                  {effectType === 'aereo_clasico'
                    ? '1. Humo Aéreo Vertical'
                    : effectType === 'confeti'
                    ? `2. Confeti (${confettiType === 'mariposas' ? 'Mariposas' : confettiType === 'blanco' ? 'Papel Blanco' : 'Multicolor'})`
                    : effectType === 'humo_bajo'
                    ? '3. Máquina de Niebla Baja'
                    : effectType === 'chispas_frias'
                    ? '4. Fuentes de Chispas Frías'
                    : effectType === 'sonido_luces'
                    ? '5. Sonido & Discoteca Móvil'
                    : 'Pack Boda Total 360°'}
                </span>
              </div>

              {effectType !== 'humo_bajo' && (
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

              {hasBengalas && (
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-neutral-500">Bengalas de mano:</span>
                  <span className="font-semibold text-emerald-600">Incluidas en la propuesta</span>
                </div>
              )}

              {hasSparklers && (
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-neutral-500">Fuego frío Sparkulars:</span>
                  <span className="font-semibold text-emerald-600">Incluidas en la propuesta</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Modalidad:</span>
                <span className="font-bold text-rose-700">Técnico presencial en finca</span>
              </div>

              {/* 10% Discount Coupon Row in Summary */}
              {discountApplied ? (
                <div className="flex justify-between items-center py-2 px-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 rounded-xl mt-2">
                  <span className="text-emerald-900 font-bold flex items-center gap-1.5 text-xs">
                    <span>🎁 Cupón 10% Descuento:</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-black text-emerald-700 text-xs tracking-wider">
                      {couponCode || 'BODA10MAGIA'}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                      -10% OK
                    </span>
                  </div>
                </div>
              ) : (
                <div className="pt-1 mt-1">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Código Cupón (ej. BODA10MAGIA)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-rose-500 uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      Aplicar 10%
                    </button>
                  </div>
                </div>
              )}
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
                  <option value="Asturias">Asturias</option>
                  <option value="Zaragoza">Zaragoza</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Barcelona">Barcelona</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Sevilla">Sevilla</option>
                  <option value="Cantabria">Cantabria</option>
                  <option value="Galicia">Galicia</option>
                  <option value="País Vasco">País Vasco</option>
                  <option value="Otra provincia">Otra provincia</option>
                </select>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs">
                  ✓ ¡Configuración guardada! Haz clic en WhatsApp abajo para hablar con un especialista.
                </div>
              )}

              {/* Direct WhatsApp Action */}
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
                Te enviamos la cotización en menos de 15 minutos sin compromiso.
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
