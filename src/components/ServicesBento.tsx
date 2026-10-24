import React from 'react';
import {
  Zap,
  PartyPopper,
  Cloud,
  Flame,
  Speaker,
  ArrowUpRight,
  CheckCircle2,
  Bomb,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { AerialSafetyAndPaletteCard } from './AerialSafetyAndPaletteCard';
import { assetUrl } from '../utils/assetUrl';

export type ServiceTabType =
  | 'todos'
  | 'humo-aereo'
  | 'confeti'
  | 'chispas-frias'
  | 'humo-bajo'
  | 'sonido-luces';

interface ServicesBentoProps {
  onSelectService: (serviceName: string) => void;
  activeTab: ServiceTabType;
  onTabChange: (tab: ServiceTabType) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectService,
  activeTab,
  onTabChange,
}) => {
  return (
    <section id="servicios" className="py-20 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header + Service Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
              Especialistas Oficiales Nº 1 en España
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Efectos Especiales y Servicios para Bodas y Eventos
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
              Catálogo oficial ordenado: <strong>1. Humo Aéreo Vertical</strong>, <strong>2. Cañones de Confeti (Multicolor y Mariposas)</strong>, <strong>3. Fuentes de Chispas Frías</strong> y <strong>4. Máquinas de Humo Bajo sobre las Nubes</strong>. Asistencia y disparo presencial con técnicos en fincas de toda España.
            </p>
          </div>

          {/* Interactive Service Tabs (Strictly Ordered 1 to 5) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/80 rounded-2xl border border-neutral-300/80 self-start">
            <button
              type="button"
              onClick={() => onTabChange('todos')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'todos'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Todos los Servicios
            </button>
            <button
              type="button"
              onClick={() => onTabChange('humo-aereo')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'humo-aereo'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>1. Humo Aéreo</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('confeti')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'confeti'
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span>2. Confeti (Multicolor y Mariposas)</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('chispas-frias')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'chispas-frias'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>3. Fuente de Chispas</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('humo-bajo')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'humo-bajo'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>4. Humo Bajo</span>
            </button>
            <button
              type="button"
              onClick={() => onTabChange('sonido-luces')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'sonido-luces'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              <Speaker className="w-3.5 h-3.5" />
              <span>5. Sonido & DJ</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. CAÑONES DE HUMO AÉREO (1 a 9 Cañones, TNT & Bengalas) */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'humo-aereo') && (
          <div id="humo-aereo" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-rose-600">
                  Apartado 01 · Servicio Estrella Nº 1
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  1. Cañones de Humo Aéreo Vertical (1 a 9 Cañones)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Disparo instantáneo vertical que sube a 12-15 metros de altura, abre en abanico y se disipa limpiamente en el aire en pocos segundos.
                </p>
              </div>
            </div>

            {/* Flagship Card: Cañones de Humo Aéreo Vertical (Foto Oficial IMG-20261024-WA0020) */}
            <div className="bg-white border-2 border-rose-200 hover:border-rose-400 rounded-3xl overflow-hidden shadow-lg transition-all group">
              <div className="w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
                <img
                  src={assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg')}
                  alt="¡Humo Aéreo en todos los colores! Cañones de humo aéreo vertical de 1 a 9 disparos simultáneos para bodas y eventos en Talavera de la Reina, Madrid y toda España"
                  title="¡Humo Aéreo en todos los colores! Tú eliges cuánta cantidad de humo quieres - Humo Y Efectos"
                  loading="lazy"
                  className="w-full h-auto max-h-[520px] object-contain block group-hover:scale-101 transition-transform duration-300"
                />
              </div>

              <div className="p-7 sm:p-9">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-600 uppercase">
                        01. SERVICIO ESTRELLA Nº 1 EN ESPAÑA
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        Disparo Instantáneo CE Clase T1
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
                      Humo Aéreo en Todos los Colores: Tú Eliges la Cantidad de Cañones (1 a 9)
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Artificio pirotécnico <strong>Sbruffo Smoke 40 homologado CE Clase T1</strong>. Propulsa columnas verticales ultrarrápidas a <strong>14-15 metros de altura</strong>. Al alcanzar el cenit, abre en un espectacular abanico multicolor para la fotografía cumbre de vuestra boda y <strong>se disipa limpiamente en el aire en pocos segundos</strong> sin dejar rastro, niebla pesada ni residuos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 pt-1">
                      <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
                        <strong className="text-rose-950 block">🚀 Disparo Instantáneo 15m</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Apertura en abanico cenital sincronizada con mando a distancia o detonador por nuestros técnicos.
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1">
                        <strong className="text-amber-950 block">🎨 10 Colores Certificados</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Oro solar, zafiro, blanco nupcial, verde, rosa pastel, rojo pasión, violeta real y más.
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                        <strong className="text-emerald-950 block">🛡️ Sin Residuos ni Manchas</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Fórmula técnica limpia que respeta vestidos de novia, trajes oscuros y el entorno de la finca.
                        </p>
                      </div>

                      <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1">
                        <strong className="text-purple-950 block">📍 Sede Talavera · Madrid · España</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Servicio presencial con técnicos titulados en fincas de Talavera, Madrid, Toledo, Zona Centro y toda España.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-2xl border border-neutral-200/80 space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Garantía Técnica y Seguridad en Finca
                    </h5>

                    <ul className="space-y-2.5 text-xs text-neutral-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Homologación CE 0163-T1-6069</strong> (Sbruffo Smoke 40)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Distancias reglamentarias</strong>: 14,5m vertical, 3m radial, 19m público</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Técnico presencial</strong> en tu finca: montaje, peritaje y detonación</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Coordinación previa</strong> con fotógrafo y videógrafo</span>
                      </li>
                    </ul>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => onSelectService('Humo Aéreo')}
                        className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
                      >
                        <span>Configurar Humo Aéreo (1-9)</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <a
                        href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20los%20Ca%C3%B1ones%20de%20Humo%20A%C3%A9reo%20Vertical%20en%20todos%20los%20colores."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp (+34 600 08 24 62)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-cards: Revelación TNT y Bengalas */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              <div className="md:col-span-7 bg-white border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-amber-400 shadow-sm transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-600">02. REVELACIÓN GÉNERO</span>
                    <Bomb className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="mb-4 h-48 w-full rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900">
                    <img
                      src={assetUrl('/assets/services/disparador-tnt-revelacion-real.jpg')}
                      alt="Caja detonadora TNT retro con palanca para revelación de género con humo rosa o azul en Talavera, Madrid y España"
                      title="Pack Revelación de Género con Disparador TNT Retro - Humo Y Efectos"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2.5 group-hover:text-amber-600 transition-colors font-display">
                    Disparador TNT Retro para Papás
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    Los futuros papás bajan juntos la palanca de nuestra icónica caja detonadora TNT vintage y al instante los
                    cañones estallan hacia el cielo en rosa o azul sorpresa. Embalaje neutro 100% confidencial con código secreto para cómplice o ginecólogo.
                  </p>
                  <div className="space-y-1.5 text-xs text-neutral-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Palanca TNT vintage de madera con muelle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>100% confidencial: el secreto mejor guardado</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">Inalámbrico 80m</span>
                  <button
                    onClick={() => onSelectService('Revelación TNT')}
                    className="font-bold text-amber-700 hover:text-amber-800 cursor-pointer flex items-center gap-1"
                  >
                    <span>Reservar TNT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 bg-white border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-rose-300 shadow-sm transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-400">03. REPORTAJES FOTOGRÁFICOS</span>
                    <Flame className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="mb-4 h-48 w-full rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900">
                    <img
                      src={assetUrl('/assets/services/pack-bengalas-humo-mano-colores.jpg')}
                      alt="Bengalas profesionales de humo de mano en colores para sesiones fotográficas de bodas y eventos"
                      title="Pack Bengalas Profesionales de Mano para Fotografía - Humo Y Efectos"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2.5 group-hover:text-rose-600 transition-colors font-display">
                    Bengalas de Humo de Mano
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                    Activación por anilla sin mechero para sesiones de fotos dinámicas, prebodas y photocalls.
                  </p>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-snug">
                    <strong>Consejo técnico:</strong> Mantener a distancia prudente y vigilar la dirección del viento para cuidar vestidos.
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Ignición por anilla</span>
                  <button
                    onClick={() => onSelectService('Bengalas')}
                    className="font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            </div>

            {/* Official Safety Regulations & 10 Factory Colors Card */}
            <AerialSafetyAndPaletteCard onOpenConfigurator={() => onSelectService('Humo Aéreo')} />
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. CAÑONES DE CONFETI (Multicolor y Mariposas Englobados) */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'confeti') && (
          <div id="confeti" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-fuchsia-600">
                  Apartado 02 · Confeti Multicolor y Mariposas
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  2. Cañones de Confeti para Bodas y Eventos (Multicolor y Mariposas)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Engloba todas las opciones: lluvia de mariposas en suspensión lenta para el vals, papel blanco nieve y estallido multicolor o metalizado para fiestas.
                </p>
              </div>
            </div>

            {/* Unified Comprehensive Confeti Card (Foto Oficial IMG-20261024-WA0018) */}
            <div className="bg-white border-2 border-fuchsia-200 hover:border-fuchsia-400 rounded-3xl overflow-hidden shadow-lg transition-all group">
              <div className="w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
                <img
                  src={assetUrl('/assets/aistudio/IMG-20261024-WA0018_9dfc7d92.jpg')}
                  alt="Cañones de Confeti Multicolor y Confeti de Mariposas de seda para bodas y eventos especiales de Humo Y Efectos"
                  title="Confeti Multicolor y Confeti de Mariposas para Bodas - Humo Y Efectos"
                  loading="lazy"
                  className="w-full h-auto max-h-[520px] object-contain block group-hover:scale-101 transition-transform duration-300"
                />
              </div>

              <div className="p-7 sm:p-9">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-fuchsia-600 uppercase">
                        02. DALE COLOR Y MAGIA A TUS EVENTOS
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-800">
                        Vals &bull; Salida &bull; Fiesta
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
                      Todos los Tipos de Confeti en un Solo Lugar: Mariposas, Nieve y Multicolor
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Ponemos a vuestra disposición la gama completa de cañones neumáticos y eléctricos inalámbricos con todos los acabados disponibles para cada instante del evento:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 pt-1">
                      <div className="p-3 bg-fuchsia-50/60 rounded-xl border border-fuchsia-100 space-y-1">
                        <strong className="text-fuchsia-950 block">🦋 Confeti de Mariposas de Seda</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Troqueladas con forma de mariposas que planean y giran lentamente en el aire (30 a 60 segundos de suspensión) para el vals o la salida.
                        </p>
                      </div>

                      <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
                        <strong className="text-rose-950 block">🎉 Confeti Multicolor & Fiesta</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Estallido masivo de colores vivos para la apertura de la barra libre, festival o corte de tarta con alcance de 8 a 12 metros.
                        </p>
                      </div>

                      <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 space-y-1">
                        <strong className="text-sky-950 block">❄️ Confeti Blanco Efecto Nieve</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Papel blanco mate ultra ligero que recrea una lluvia romántica de nieve cinematográfica.
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1">
                        <strong className="text-amber-950 block">✨ Metalizado Oro y Plata</strong>
                        <p className="text-neutral-600 text-[11px] leading-snug">
                          Destellos metalizados reflectantes que multiplican las luces de la fiesta en momentos de máximo impacto.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-2xl border border-neutral-200/80 space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Garantías Técnicas y Seguridad Oficial
                    </h5>

                    <ul className="space-y-2.5 text-xs text-neutral-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>100% Biodegradable</strong> respetuoso con el medio ambiente</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Ignífugo homologado</strong> según normativa de seguridad en salas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>No resbala ni mancha</strong> suelos de fincas ni vestidos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Disparo inalámbrico sincronizado con la música por técnico</span>
                      </li>
                    </ul>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => onSelectService('Confeti')}
                        className="flex-1 px-4 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-600/20"
                      >
                        <span>Configurar Confeti</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <a
                        href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20los%20Ca%C3%B1ones%20de%20Confeti%20(Mariposas%20y%20Multicolor)%20para%20mi%20evento."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp (+34 600 08 24 62)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. MÁQUINAS DE CHISPAS FRÍAS (Sparkulars)                */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'chispas-frias') && (
          <div id="chispas-frias" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-amber-600">
                  Apartado 03 · Fuego Frío Homologado
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  3. Máquinas de Chispas Frías (Fuentes Sparkulars)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Chorros verticales de luz fría de 2 a 5 metros que no queman, sin pólvora y autorizados en el 100% de salones cerrados y fincas.
                </p>
              </div>
            </div>

            {/* Sparkulars Card con Foto Oficial IMG-20261024-WA0017 */}
            <div className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-3xl overflow-hidden shadow-lg transition-all group">
              <div className="w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
                <img
                  src={assetUrl('/assets/aistudio/IMG-20261024-WA0017_4f707a65.jpg')}
                  alt="Máquinas de Chispas Frías Sparkulars para bodas con columnas de fuego frío brillante iluminando a los novios"
                  title="Máquinas de Chispas Frías (Fuentes Sparkulars) - Humo Y Efectos"
                  loading="lazy"
                  className="w-full h-auto max-h-[520px] object-contain block group-hover:scale-101 transition-transform duration-300"
                />
              </div>

              <div className="p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                      03. EFECTO SPARKULAR PROFESIONAL
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      No Quema la Piel ni la Ropa
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-amber-600 transition-colors font-display">
                    Fuentes de Chispas Frías para Entradas, Baile y Tarta
                  </h4>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    Chorros verticales continuos o ráfagas rítmicas de chispas luminosas basadas en microgránulos de titanio a baja temperatura.
                    <strong> No queman al contacto con la mano, la piel o la ropa</strong>, no utilizan pólvora tradicional, no generan humo denso
                    ni dejan olores desagradables en el salón. Están autorizadas en el 100% de fincas, palacios históricos y salones cerrados de hoteles,
                    y combinan a la perfección con la Máquina de Niebla Baja para crear el baile nupcial más recordado.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-neutral-700 mb-6">
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block mb-1">✓ Fuego Frío Seguro</strong>
                      <p className="text-neutral-600 text-[11px]">Inofensivo al contacto con la mano, vestidos y trajes.</p>
                    </div>
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block mb-1">✓ Sin Pólvora ni Olor</strong>
                      <p className="text-neutral-600 text-[11px]">No activa alarmas y se usa con total tranquilidad en interiores.</p>
                    </div>
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block mb-1">✓ Altura 2 a 5 Metros</strong>
                      <p className="text-neutral-600 text-[11px]">Regulable según la altura del techo del salón o jardín.</p>
                    </div>
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                      <strong className="text-amber-900 block mb-1">✓ De 2 a 8 Fuentes</strong>
                      <p className="text-neutral-600 text-[11px]">Sincronizadas por mando al compás de la música.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectService('Chispas Frías')}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-600/20"
                  >
                    <span>Configurar Chispas Frías</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20las%20Fuentes%20de%20Chispas%20Fr%C3%ADas%20para%20mi%20evento."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar por WhatsApp (+34 600 08 24 62)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. MÁQUINAS DE HUMO BAJO / NIEBLA BAJA (Hielo Seco)      */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'humo-bajo') && (
          <div id="humo-bajo" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-sky-600">
                  Apartado 04 · Vals Nupcial sobre las Nubes
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  4. Máquinas de Humo Bajo / Niebla Baja para Bailes Nupciales
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  El auténtico efecto &quot;Baile sobre las Nubes&quot; con hielo seco y agua caliente: 100% vapor limpio que no mancha trajes oscuros ni activa alarmas.
                </p>
              </div>
            </div>

            {/* Niebla Baja Card con Foto Oficial IMG-20261024-WA0019 */}
            <div className="bg-white border-2 border-sky-200 hover:border-sky-400 rounded-3xl overflow-hidden shadow-lg transition-all group">
              <div className="w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
                <img
                  src={assetUrl('/assets/aistudio/IMG-20261024-WA0019_e63127eb.jpg')}
                  alt="Máquinas de Humo Bajo y Niebla Baja para vals nupcial sobre las nubes en bodas de Humo Y Efectos"
                  title="Máquinas de Humo Bajo / Niebla Baja para Bailes Nupciales - Humo Y Efectos"
                  loading="lazy"
                  className="w-full h-auto max-h-[520px] object-contain block group-hover:scale-101 transition-transform duration-300"
                />
              </div>

              <div className="p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-sky-600 uppercase">
                      04. NIEBLA PESADA LIMPIA A RAS DE SUELO
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      100% Libre de Manchas y Charcos
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-sky-600 transition-colors font-display">
                    Máquina de Niebla Baja (Baile sobre las Nubes para Novios)
                  </h4>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    La máquina profesional de humo bajo sumerge hielo seco en agua a alta temperatura para liberar
                    un manto blanco inmaculado, denso y pesado que se expande a ras de suelo sin subir de las rodillas.
                    Los novios bailan como si estuviesen literalmente <strong>flotando sobre una nube</strong>.
                    Al ser <strong>puro vapor de agua condensado</strong>, es la alternativa más limpia y segura del mercado:
                    <strong> no mancha trajes oscuros ni vestidos de novia, no moja alfombras y no activa los detectores de humo ni alarmas</strong> de
                    salones de fincas ni hoteles.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-neutral-700 mb-6">
                    <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block mb-1">✓ 100% Vapor Limpio</strong>
                      <p className="text-neutral-600 text-[11px]">Cero manchas en trajes oscuros y vestidos de novia.</p>
                    </div>
                    <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block mb-1">✓ No Activa Alarmas</strong>
                      <p className="text-neutral-600 text-[11px]">Se mantiene en el suelo sin subir a detectores de techo.</p>
                    </div>
                    <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block mb-1">✓ Vals Completo 3-5 min</strong>
                      <p className="text-neutral-600 text-[11px]">Duración exacta para la coreografía nupcial entera.</p>
                    </div>
                    <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
                      <strong className="text-sky-900 block mb-1">✓ Hasta 120 m² de Manto</strong>
                      <p className="text-neutral-600 text-[11px]">Cobertura homogénea para pistas de baile amplias.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectService('Niebla Baja')}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-sky-600/20"
                  >
                    <span>Configurar Niebla Baja</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20la%20M%C3%A1quina%20de%20Niebla%20Baja%20(Baile%20sobre%20las%20Nubes)%20para%20mi%20boda."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar por WhatsApp (+34 600 08 24 62)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. SONIDO, ILUMINACIÓN & DISCOTECA MÓVIL                  */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'sonido-luces') && (
          <div id="sonido-luces" className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-indigo-600">
                  Apartado 05 · Servicios Complementarios & Producción
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  5. Alquiler de Sonido Profesional, Iluminación y Discoteca Móvil
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Equipamiento de sonido para ceremonia y cóctel, puentes de luces LED robotizadas y discoteca móvil con DJ para completar la fiesta.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 5: Sonido & Discoteca Móvil (12 cols) */}
              <div className="lg:col-span-12 bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-300 transition-all grid grid-cols-1 lg:grid-cols-12 group">
                <div className="lg:col-span-6 relative h-72 lg:h-full min-h-[300px] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={assetUrl('/assets/services/sonido-iluminacion.jpg')}
                    alt="Cabina DJ profesional con sonido PA e iluminación robotizada para bodas y fiestas"
                    title="Alquiler de Sonido Profesional, Luces y DJ - Humo Y Efectos"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/85 via-neutral-950/25 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-300 block mb-1">
                      Producción Integral &bull; Sonido PA & Iluminación LED
                    </span>
                    <span className="text-sm font-semibold text-neutral-100">
                      Discoteca Móvil con DJ &bull; Microfonía Inalámbrica
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                        05. COMPLETA TU EVENTO
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        Todo en Un Solo Proveedor
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-indigo-600 transition-colors font-display">
                      Alquiler de Sonido, Luces y Discotecas Móviles con DJ
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      Aunque nuestra gran especialidad número uno son los efectos de humo y pirotecnia homologada, ponemos a tu disposición
                      nuestro parque de <strong>equipamiento de sonido profesional PA de alta fidelidad, puentes de iluminación LED robotizada, focos wash ambientales y cabina de DJ con discoteca móvil</strong>.
                      Añadir el pack de sonido y luces te permite tener la tranquilidad de un único equipo técnico de confianza coordinando
                      la música, los micrófonos de la ceremonia, el vals sobre las nubes y el estallido final de la fiesta.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Sistemas PA activos de alta definición para música y voz</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Microfonía inalámbrica profesional para lecturas y ceremonia</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Puente de luces robotizadas y láseres para la pista de baile</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Servicio de DJ y discoteca móvil completa para barra libre</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectService('Sonido y Luces')}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <span>Consultar Pack con Sonido</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <a
                      href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20el%20alquiler%20de%20Sonido,%20Luces%20y%20Discoteca%20M%C3%B3vil%20para%20mi%20boda."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Directo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
