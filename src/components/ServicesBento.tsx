import React from 'react';
import {
  Zap,
  PartyPopper,
  Cloud,
  Flame,
  Music,
  Speaker,
  ArrowUpRight,
  CheckCircle2,
  Bomb,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Wind,
} from 'lucide-react';
import { AerialSafetyAndPaletteCard } from './AerialSafetyAndPaletteCard';

export type ServiceTabType =
  | 'todos'
  | 'humo-aereo'
  | 'confeti'
  | 'humo-bajo'
  | 'chispas-frias'
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
              Catálogo Oficial por Orden de Especialidad
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Efectos Especiales y Servicios para Eventos Inolvidables
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
              Somos especialistas líderes en <strong>efectos y humos</strong>. Explora nuestro catálogo ordenado de servicios:
              desde cañones de humo y confeti hasta niebla baja, chispas frías y producción completa de sonido con discoteca móvil.
            </p>
          </div>

          {/* Interactive Service Tabs (Ordered 1 to 5) */}
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
              <span>2. Cañones de Confeti</span>
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
              <span>3. Máquinas Humo Bajo</span>
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
              <span>4. Chispas Frías</span>
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
              <span>5. Sonido & Discoteca</span>
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
                  Apartado 01 · Servicio Principal
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  1. Cañones de Humo Aéreo Vertical (1 a 9 Cañones)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Disparo instantáneo vertical que sube a 12-15 metros, abre en abanico y se disipa en segundos sin dejar rastro.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Card 1A: Cañones de Humo Aéreo Vertical (5 cols) */}
              <div className="md:col-span-5 bg-white border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-rose-400 shadow-sm transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-rose-600">01. DISPARO INSTANTÁNEO</span>
                    <Zap className="w-5 h-5 text-rose-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-rose-600 transition-colors font-display">
                    Humo Aéreo Vertical de 1 a 9 Cañones
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    Morteros profesionales diseñados específicamente para eventos. Propulsan columnas verticales a 12-15 metros de altura.
                    Al alcanzar el cenit, el humo abre en abanico para la foto perfecta y se disipa limpiamente en el aire en pocos segundos,
                    respetando siempre las distancias técnicas de seguridad (2 a 3 metros en exteriores) y la dirección del viento.
                  </p>
                  <div className="space-y-1.5 text-xs text-neutral-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Elección personalizada de 1 a 9 cañones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Monocolor o mezcla de colores por cañón</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Disparo inalámbrico con mando a 80 metros</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService('Humo Aéreo')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Configurar Humo Aéreo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20los%20Ca%C3%B1ones%20de%20Humo%20A%C3%A9reo%20Vertical."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Card 1B: Revelación de Género con Disparador TNT Retro (4 cols) */}
              <div className="md:col-span-4 bg-white border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-amber-400 shadow-sm transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-600">02. REVELACIÓN GÉNERO</span>
                    <Bomb className="w-5 h-5 text-amber-600" />
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

              {/* Card 1C: Bengalas Profesionales de Mano (3 cols) */}
              <div className="md:col-span-3 bg-white border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-neutral-300 shadow-sm transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-400">03. REPORTAJES FOTOGRÁFICOS</span>
                    <Flame className="w-5 h-5 text-rose-500" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2.5 group-hover:text-rose-600 transition-colors font-display">
                    Bengalas de Humo de Mano
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                    Activación por anilla sin mechero para sesiones de fotos y reportajes.
                  </p>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-snug">
                    <strong>Consejo técnico:</strong> Al contener tintes y pólvora, mantener siempre a distancia prudente y vigilar la dirección del viento para que las partículas no rocen los tejidos de los vestidos.
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Ignición fría por anilla</span>
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
        {/* 2. CAÑONES DE CONFETI (Colores, Blanco Nieve y Mariposas) */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'confeti') && (
          <div id="confeti" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-fuchsia-600">
                  Apartado 02 · Especial Baile de Novios y Salidas
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  2. Cañones de Confeti para Bodas, Bailes y Fiestas
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Desde la romántica lluvia de mariposas en suspensión hasta la nieve blanca y el estallido multicolor para barra libre.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 2A: Confeti de Mariposas & Nieve Blanca Romántica (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:border-fuchsia-400 transition-all flex flex-col justify-between group">
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                    <img
                      src="/assets/services/canones-confeti.jpg"
                      alt="Novios celebrando bajo una lluvia romántica de confeti de mariposas y papel blanco"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-fuchsia-300">
                        01. Vals Romántico & Salida Nupcial
                      </span>
                      <span className="text-xs font-semibold text-neutral-200">
                        Mariposas en Suspensión Aérea
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h4 className="text-2xl font-bold text-neutral-900 mb-2.5 group-hover:text-fuchsia-600 transition-colors font-display">
                      Confeti de Mariposas y Papel Blanco (Lluvia de Nieve)
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                      El efecto más poético y visualmente sobrecogedor para el <strong>primer baile nupcial de los novios</strong> o la salida
                      de la ceremonia: cientos de <strong>mariposas de papel de seda</strong> especialmente troqueladas para planear y girar
                      lentamente en el aire durante casi un minuto, combinables con <strong>confeti de papel blanco mate</strong> para crear una
                      auténtica lluvia de nieve cinematográfica.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                        <span>Mariposas troqueladas de vuelo lento</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                        <span>Confeti de papel blanco (efecto nieve pura)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                        <span>100% biodegradable e ignífugo homologado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                        <span>No resbala ni mancha suelos ni vestidos</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-7 py-5 bg-neutral-50 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectService('Confeti Mariposas')}
                    className="px-4 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Configurar Confeti Romántico</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20presupuesto%20para%20los%20Ca%C3%B1ones%20de%20Confeti%20de%20Mariposas%20y%20Papel%20Blanco%20para%20mi%20boda."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Card 2B: Cañones de Confeti de Colores y Metalizados Fiesta (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-fuchsia-400 shadow-sm transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-fuchsia-600">02. FIESTA & BARRA LIBRE</span>
                    <PartyPopper className="w-5 h-5 text-fuchsia-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-fuchsia-600 transition-colors font-display">
                    Confeti Multicolor y Metalizado (Oro y Plata)
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    El gran estallido para romper la pista de baile en la apertura de la barra libre o en el corte de tarta.
                    Cañones eléctricos o neumáticos de disparo inalámbrico sincronizado que proyectan un manto de colores vivos,
                    o destellos metalizados en oro y plata que multiplican el brillo de las luces de la fiesta.
                  </p>

                  <div className="space-y-2 text-xs text-neutral-700 mb-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                      <span>Cañones de gran presión (alcance 8 a 12 metros)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                      <span>Confeti multicolor festival o metalizado brillante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                      <span>Disparo remoto sincronizado al drop de la música</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                      <span>Ignífugo según normativa de seguridad en salas</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService('Confeti Fiesta')}
                    className="font-bold text-xs text-fuchsia-700 hover:text-fuchsia-800 cursor-pointer flex items-center gap-1"
                  >
                    <span>Ver Opciones de Confeti</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-neutral-500 font-medium">De 2 a 6 cañones</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. MÁQUINAS DE HUMO BAJO / NIEBLA BAJA (Hielo Seco)      */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'humo-bajo') && (
          <div id="humo-bajo" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-sky-600">
                  Apartado 03 · Vals Nupcial sobre las Nubes
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  3. Máquinas de Humo Bajo / Niebla Baja para Bailes Nupciales
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  El auténtico efecto &quot;Baile sobre las Nubes&quot; con hielo seco y agua caliente: 100% vapor limpio que no mancha ni activa alarmas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 3: Máquina de Niebla Baja (12 cols) */}
              <div className="lg:col-span-12 bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:border-sky-300 transition-all grid grid-cols-1 lg:grid-cols-12 group">
                <div className="lg:col-span-6 relative h-72 lg:h-full min-h-[300px] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/assets/services/novios-baile-nubes-humo-bajo.jpg"
                    alt="Novios bailando el vals nupcial flotando sobre una nube densa y blanca de humo bajo y niebla pesada"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/85 via-neutral-950/25 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-300 block mb-1">
                      Vals Nupcial &bull; Baile sobre las Nubes
                    </span>
                    <span className="text-sm font-semibold text-neutral-100">
                      Hielo Seco (CO2 sólido) &bull; Agua Caliente de Alta Temperatura
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-sky-600 uppercase">
                        03. NIEBLA PESADA LIMPIA
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        100% Libre de Manchas
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-sky-600 transition-colors font-display">
                      Máquina de Niebla Baja (Baile sobre las Nubes)
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      La máquina profesional de humo bajo sumerge hielo seco en agua a alta temperatura para liberar
                      un manto blanco inmaculado, denso y pesado que se expande a ras de suelo sin subir de las rodillas.
                      Los novios bailan como si estuviesen literalmente <strong>flotando sobre una nube</strong>.
                      Al ser <strong>vapor de agua puro condensado</strong>, es la alternativa más limpia y segura:
                      <strong> no mancha trajes oscuros ni vestidos de novia, no deja charcos y no activa los detectores de humo ni alarmas</strong> de
                      salones de fincas ni hoteles.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>100% vapor limpio de agua (cero manchas)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>No sube ni activa alarmas contra incendios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Duración del vals completo (3 a 5 minutos)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Cobertura homogénea de pistas de hasta 120 m²</span>
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
                      <span>Consultar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. MÁQUINAS DE CHISPAS FRÍAS (Sparkulars)                */}
        {/* ======================================================== */}
        {(activeTab === 'todos' || activeTab === 'chispas-frias') && (
          <div id="chispas-frias" className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-amber-600">
                  Apartado 04 · Fuego Frío Homologado
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display mt-0.5">
                  4. Máquinas de Chispas Frías (Fuentes Sparkulars)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Chorros verticales de luz fría de 2 a 5 metros que no queman, sin pólvora y autorizados en el 100% de salones cerrados.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 4: Fuentes de Chispas Frías (12 cols) */}
              <div className="lg:col-span-12 bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:border-amber-300 transition-all grid grid-cols-1 lg:grid-cols-12 group">
                <div className="lg:col-span-6 relative h-72 lg:h-full min-h-[300px] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/assets/services/chispas-frias.jpg"
                    alt="Fuentes de Chispas Frías Sparkulars iluminando el baile nupcial y la entrada de novios sin quemaduras ni humo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/85 via-neutral-950/25 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300 block mb-1">
                      Fuego Frío Inocuo &bull; Electrónica de Titanio
                    </span>
                    <span className="text-sm font-semibold text-neutral-100">
                      Altura Regulable de 2 a 5 Metros &bull; Sincronización Musical
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                        04. EFECTO SPARKULAR
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        No Quema la Piel ni la Ropa
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-amber-600 transition-colors font-display">
                      Fuentes de Chispas Frías (Sparkulars)
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      Chorro vertical continuo o ráfagas rítmicas de chispas brillantes basadas en microgránulos de titanio a baja temperatura.
                      <strong> No queman al contacto con la mano, la piel o la ropa</strong>, no utilizan pólvora tradicional, no generan humo denso
                      ni dejan olores desagradables en el salón. Están autorizadas en el 100% de fincas, palacios y salones cerrados de hoteles,
                      y se combinan de forma espectacular con la Máquina de Niebla Baja en el vals o en el corte de tarta.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Chispa fría a baja temperatura (inofensiva)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Sin pólvora, sin humo molesto ni olor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>De 2 a 8 máquinas sincronizadas por mando</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Certificación CE para salones interiores</span>
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
                      <span>Consultar por WhatsApp</span>
                    </a>
                  </div>
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
                    src="/assets/services/sonido-iluminacion.jpg"
                    alt="Cabina DJ profesional con sonido PA e iluminación robotizada para bodas y fiestas"
                    referrerPolicy="no-referrer"
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
                      Alquiler de Sonido, Luces y Discotecas Móviles
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      Aunque nuestra gran pasión y especialidad número uno son los efectos especiales y el humo, ponemos a tu disposición
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
