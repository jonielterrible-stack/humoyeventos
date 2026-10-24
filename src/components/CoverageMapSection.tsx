import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  Truck,
  PhoneCall,
  Clock,
  Compass,
  Building2,
  CheckCircle2,
  Navigation,
  Flame,
  Award,
} from 'lucide-react';

interface CoverageHub {
  id: string;
  name: string;
  badge: string;
  demandTag: string;
  demandLevel: 'Maxima' | 'Alta' | 'Preferente' | 'Nacional';
  isHQ?: boolean;
  distanceTime: string;
  zones: string[];
  description: string;
  techFeatures: string[];
  fincasDestacadas: string[];
  whatsappPrompt: string;
  coordinates: { x: number; y: number }; // Percentage for map pin
}

const COVERAGE_HUBS: CoverageHub[] = [
  {
    id: 'talavera',
    name: 'Talavera de la Reina',
    badge: '⭐ SEDE CENTRAL & TALLER OFICIAL',
    demandTag: 'Mayor Demanda · Desplazamiento 0 km',
    demandLevel: 'Maxima',
    isHQ: true,
    distanceTime: 'Base Operativa Central · 0 min',
    zones: [
      'Talavera casco urbano y fincas perimetrales',
      'Cazalegas, Pepino y Embalse',
      'Comarca de la Jara y Los Navalmorales',
      'Sierra de San Vicente y Castillo de Bayuela',
      'Comarca de La Vera y Arenas de San Pedro',
    ],
    description:
      'Nuestra sede física y almacén pirotécnico principal está ubicado en Talavera de la Reina. Ofrecemos respuesta inmediata, máxima disponibilidad de fechas sin costes de kilometraje y montaje supervisado por el equipo fundador.',
    techFeatures: [
      'Entrega y montaje exprés sin recargos de desplazamiento',
      'Stock permanente de los 10 colores oficiales Sbruffo Smoke 40',
      'Disparador TNT Retro para papás en revelación de género disponible en tienda física',
      'Asesoramiento directo en la propia finca con vuestro fotógrafo',
    ],
    fincasDestacadas: [
      'Fincas de Cazalegas y pantano',
      'Dehesas de La Jara',
      'Fincas rústicas de La Vera',
      'Espacios para bodas en comarca de Talavera',
    ],
    whatsappPrompt:
      '¡Hola Humo Y Efectos! 👋 Os contacto desde Talavera de la Reina / comarca para consultar disponibilidad de humo aéreo y efectos en nuestra finca.',
    coordinates: { x: 44, y: 53 },
  },
  {
    id: 'madrid',
    name: 'Madrid & Sierra de Guadarrama',
    badge: '🔥 ALTA DEMANDA SEMANAL',
    demandTag: 'Furgón Técnico Diario · 120+ Fincas',
    demandLevel: 'Alta',
    distanceTime: 'Servicio Diario · 50 - 75 min',
    zones: [
      'Madrid Capital y fincas periurbanas',
      'Pozuelo de Alarcón, Las Rozas, Majadahonda y Boadilla',
      'Sierra de Guadarrama, Navacerrada y San Lorenzo de El Escorial',
      'Aranjuez, Chinchón y Vega del Tajuña',
      'Alcalá de Henares, Torrejón y Corredor del Henares',
    ],
    description:
      'Madrid es una de nuestras zonas con mayor volumen de bodas y rodajes. Nuestros técnicos oficiales se desplazan semanalmente con furgón técnico propio, conociendo de primera mano las normativas y espacios de las fincas más exclusivas.',
    techFeatures: [
      'Furgones técnicos propios equipados con doble sistema de disparo inalámbrico',
      'Protocolos aprobados para fincas madrileñas con normativas de protección forestal',
      'Niebla Baja para vals sobre las nubes con hielo seco (100% vapor limpio, cero manchas)',
      'Coordinación técnica directa con wedding planners y fotógrafos de Madrid',
    ],
    fincasDestacadas: [
      'Fincas exclusivas en Sierra de Guadarrama y El Escorial',
      'Cortijos y palacetes en Aranjuez',
      'Fincas de bodas en Pozuelo, Boadilla y Las Rozas',
      'Hoteles y espacios singulares de Madrid',
    ],
    whatsappPrompt:
      '¡Hola Humo Y Efectos! 👋 Os contacto para una boda / evento en la Comunidad de Madrid y me gustaría confirmar disponibilidad y presupuesto.',
    coordinates: { x: 53, y: 48 },
  },
  {
    id: 'toledo',
    name: 'Toledo & Cigarrales',
    badge: '🏰 ALTA DEMANDA HISTÓRICA',
    demandTag: 'Especialistas en Cigarrales y Cortijos',
    demandLevel: 'Alta',
    distanceTime: 'Desplazamiento Exprés · 40 - 50 min',
    zones: [
      'Cigarrales con vistas panorámicas sobre Toledo',
      'Bodegas de Méntrida y comarca vinícola',
      'Torrijos, Fuensalida e Illescas',
      'Mora, Consuegra y Montes de Toledo',
      'Ocaña y Mancha toledana',
    ],
    description:
      'Especialistas en bodas y celebraciones en los emblemáticos cigarrales y bodegas de Toledo. Controlamos las corrientes de aire del valle del Tajo y las distancias reglamentarias para un disparo seguro y espectacular.',
    techFeatures: [
      'Especialización en terrazas panorámicas y jardines de cigarrales',
      'Control milimétrico del viento para aperturas en cúpula nupcial impecables',
      'Fuentes de chispas frías Sparkulars para patios toledanos y cortes de tarta',
      'Presencia técnica de inicio a fin del disparo',
    ],
    fincasDestacadas: [
      'Cigarrales históricos del Tajo',
      'Bodegas y viñedos de Méntrida',
      'Cortijos rústicos toledanos',
      'Palacios y dehesas de la provincia',
    ],
    whatsappPrompt:
      '¡Hola Humo Y Efectos! 👋 Nos casamos en un cigarral / finca de Toledo y queremos consultar disponibilidad de humo aéreo para nuestra fecha.',
    coordinates: { x: 50, y: 55 },
  },
  {
    id: 'zona-centro',
    name: 'Zona Centro (Ávila, Segovia, Guadalajara, Cáceres)',
    badge: '📍 COBERTURA TÉCNICA DIRECTA',
    demandTag: 'Ruta Preferente Furgón Técnico',
    demandLevel: 'Preferente',
    distanceTime: 'Rutas Directas · 60 - 90 min',
    zones: [
      'Ávila Capital y fincas del Valle del Tiétar',
      'Segovia, La Granja y Tierra de Pinares',
      'Guadalajara, Alcarria y Sigüenza',
      'Ciudad Real, Daimiel y Campo de Criptana',
      'Cáceres, Trujillo, Plasencia y Valle del Jerte',
    ],
    description:
      'Por nuestra estratégica ubicación entre Castilla-La Mancha, Castilla y León, Madrid y Extremadura, conectamos directamente en menos de hora y media con todas las provincias limítrofes sin intermediarios.',
    techFeatures: [
      'Flota técnica propia con generadores autónomos de disparo',
      'Packs combinados de Humo Aéreo + Confeti de Mariposas + Niebla Baja',
      'Atención telefónica directa con el técnico asignado a tu evento',
      'Seguro de Responsabilidad Civil específico para pirotecnia T1',
    ],
    fincasDestacadas: [
      'Fincas del Valle del Tiétar y Gredos',
      'Palacetes y conventos en Segovia',
      'Dehesas de Cáceres y Trujillo',
      'Fincas y casas señoriales de Guadalajara y Ciudad Real',
    ],
    whatsappPrompt:
      '¡Hola Humo Y Efectos! 👋 Os escribo para consultar cobertura y presupuesto para una celebración en la Zona Centro (Ávila/Segovia/Guadalajara/Cáceres/Ciudad Real).',
    coordinates: { x: 42, y: 44 },
  },
  {
    id: 'espana',
    name: 'Toda España (Nivel Nacional)',
    badge: '🇪🇸 COBERTURA NACIONAL PENINSULAR',
    demandTag: 'Nº 1 en Bodas y Festivales en España',
    demandLevel: 'Nacional',
    distanceTime: 'Desplazamiento Programado Península',
    zones: [
      'Comunidad Valenciana, Alicante y Castellón',
      'Andalucía (Sevilla, Málaga, Córdoba, Granada)',
      'Cataluña y Aragón (Zaragoza, Huesca)',
      'Norte de España (Galicia, Asturias, Cantabria, País Vasco)',
      'Castilla y León, Murcia y resto de provincias',
    ],
    description:
      'Para bodas de gran formato, revelaciones de género virales y festivales en cualquier rincón de España, nuestro equipo técnico viaja con todo el material homologado para asegurar una detonación perfecta.',
    techFeatures: [
      'Planificación logística y peritaje previo de la finca a distancia',
      'Disparos sincronizados de gran escala de 1 a 9 cañones',
      'Certificados de homologación CE 0163 listos para la dirección del espacio',
      'Asistencia presencial con técnico titulado',
    ],
    fincasDestacadas: [
      'Masías catalanas y fincas del Empordà',
      'Cortijos andaluces y haciendas sevillanas',
      'Pazos gallegos y casonas asturianas',
      'Alquerías valencianas y bodegas de La Rioja',
    ],
    whatsappPrompt:
      '¡Hola Humo Y Efectos! 👋 Me pongo en contacto desde fuera de la zona centro para consultar disponibilidad y opciones de desplazamiento para mi evento.',
    coordinates: { x: 50, y: 48 },
  },
];

export const CoverageMapSection: React.FC = () => {
  const [activeHubId, setActiveHubId] = useState<string>('talavera');
  const activeHub = COVERAGE_HUBS.find((h) => h.id === activeHubId) || COVERAGE_HUBS[0];

  return (
    <section
      id="mapa-cobertura"
      aria-label="Mapa de Cobertura Humo Y Efectos"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-neutral-50/70 to-white border-b border-neutral-200 relative overflow-hidden"
    >
      {/* Background Subtle Map Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e11d48_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Mapa de Cobertura Oficial & Estrategia Local</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight font-display">
            Puntos de Mayor Demanda en <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Talavera, Madrid, Toledo & España</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            Con base operativa central en <strong>Talavera de la Reina</strong> y ruta técnica diaria en <strong>Madrid y Toledo</strong>, garantizamos cobertura prioritaria y desplazamiento presencial con técnicos propios en toda la <strong>Zona Centro</strong> y el territorio peninsular.
          </p>
        </div>

        {/* Demand Quick Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {COVERAGE_HUBS.map((hub) => {
            const isSelected = hub.id === activeHubId;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => setActiveHubId(hub.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-500 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/10'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        hub.demandLevel === 'Maxima'
                          ? 'bg-rose-600 text-white'
                          : hub.demandLevel === 'Alta'
                          ? 'bg-amber-500 text-white'
                          : hub.demandLevel === 'Preferente'
                          ? 'bg-sky-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {hub.demandLevel === 'Maxima'
                        ? '⭐ Sede Central'
                        : hub.demandLevel === 'Alta'
                        ? '🔥 Alta Demanda'
                        : hub.demandLevel === 'Preferente'
                        ? '📍 Zona Centro'
                        : '🇪🇸 Toda España'}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />}
                  </div>

                  <p className="font-extrabold text-neutral-900 text-xs sm:text-sm tracking-tight">
                    {hub.name.split(' (')[0]}
                  </p>
                </div>

                <p className="text-[11px] text-neutral-500 font-medium mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span className="truncate">{hub.distanceTime.split(' · ')[0]}</span>
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Hub Detail Card */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Hub Information & Strategic Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeHub.badge}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                    ✓ {activeHub.demandTag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display tracking-tight">
                  Disparo Oficial de Humo Aéreo y Efectos en {activeHub.name}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mt-2">
                  {activeHub.description}
                </p>
              </div>

              {/* Technical Advantages */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>Garantías Técnicas y Operativas en {activeHub.name.split(' (')[0]}:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  {activeHub.techFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Fincas and Zones */}
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-neutral-700" />
                  <span>Zonas y Fincas con Mayor Demanda Habitual:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeHub.zones.map((zone, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800 text-[11px] font-medium"
                    >
                      📍 {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Map Visual Representation & Direct CTA */}
            <div className="lg:col-span-5 space-y-5">
              {/* Illustrated Map Graphic Box */}
              <div className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-3xl p-6 border border-neutral-800 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-rose-400 animate-spin" />
                    <span className="text-xs font-black text-neutral-200 uppercase tracking-wider">
                      Red Central & Logística
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                    Técnico en Finca
                  </span>
                </div>

                {/* Stylized Iberian Center Diagram */}
                <div className="relative h-56 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-4 flex flex-col justify-between overflow-hidden">
                  {/* Radar Circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-rose-500/15 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-rose-500/25 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-rose-500/40 pointer-events-none" />

                  {/* Hub Pins on Visual Board */}
                  <div className="relative w-full h-full">
                    {/* Talavera Pin */}
                    <div
                      onClick={() => setActiveHubId('talavera')}
                      className="absolute top-[52%] left-[38%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                    >
                      <span className="flex h-4 w-4 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white shadow-md shadow-rose-950" />
                      </span>
                      <span className="absolute left-5 top-0 whitespace-nowrap text-[10px] font-black bg-rose-950/90 text-rose-200 px-1.5 py-0.5 rounded border border-rose-500/50 shadow-md">
                        ⭐ Talavera (HQ)
                      </span>
                    </div>

                    {/* Madrid Pin */}
                    <div
                      onClick={() => setActiveHubId('madrid')}
                      className="absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                    >
                      <span className="flex h-3.5 w-3.5 relative">
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white shadow-md" />
                      </span>
                      <span className="absolute left-4 top-0 whitespace-nowrap text-[10px] font-bold bg-neutral-900/90 text-amber-300 px-1.5 py-0.5 rounded border border-neutral-700 shadow-md">
                        🔥 Madrid
                      </span>
                    </div>

                    {/* Toledo Pin */}
                    <div
                      onClick={() => setActiveHubId('toledo')}
                      className="absolute top-[62%] left-[52%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                    >
                      <span className="flex h-3.5 w-3.5 relative">
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white shadow-md" />
                      </span>
                      <span className="absolute left-4 top-0 whitespace-nowrap text-[10px] font-bold bg-neutral-900/90 text-amber-200 px-1.5 py-0.5 rounded border border-neutral-700 shadow-md">
                        🏰 Toledo
                      </span>
                    </div>

                    {/* Zona Centro Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      <line x1="38%" y1="52%" x2="58%" y2="38%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="38%" y1="52%" x2="52%" y2="62%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="58%" y1="38%" x2="52%" y2="62%" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                    </svg>

                    {/* National Indicators */}
                    <div className="absolute bottom-1 right-2 text-[10px] text-neutral-400 flex items-center gap-1">
                      <span>Rutas a toda España: Norte · Levante · Sur</span>
                    </div>
                  </div>
                </div>

                {/* Hub Highlights Footer */}
                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div className="text-neutral-300">
                    <span className="text-neutral-400 block text-[10px]">Tiempo Estimado de Salida:</span>
                    <strong className="text-white font-mono">{activeHub.distanceTime}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[10px]">Desplazamiento:</span>
                    <strong className="text-emerald-400 font-bold">Técnico Oficial Incluido</strong>
                  </div>
                </div>
              </div>

              {/* WhatsApp Availability CTA */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-300 text-neutral-900 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                    Disponibilidad en {activeHub.name.split(' (')[0]}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 leading-snug">
                  Consultamos la disponibilidad de tu fecha en {activeHub.name.split(' (')[0]} y te enviamos la propuesta con el <strong>10% de descuento oficial</strong> aplicado.
                </p>

                <a
                  href={`https://wa.me/34600082462?text=${encodeURIComponent(activeHub.whatsappPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>Consultar Fecha en {activeHub.name.split(' (')[0]} por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
