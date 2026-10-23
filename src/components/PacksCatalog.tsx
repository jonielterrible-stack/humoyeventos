import React, { useState } from 'react';
import {
  Check,
  ArrowUp,
  ShoppingBag,
  MessageSquare,
  Layers,
  Zap,
  Bomb,
  CloudRain,
  PartyPopper,
  Flame,
  Speaker,
  Sparkles,
} from 'lucide-react';
import { SMOKE_PACKS, SmokePack } from '../data/smokeData';

interface PacksCatalogProps {
  onSelectPack: (pack: SmokePack) => void;
}

type PackFilterTab =
  | 'all'
  | 'humo_aereo'
  | 'confeti'
  | 'humo_bajo'
  | 'chispas_frias'
  | 'sonido_luces'
  | 'revelacion_genero';

export const PacksCatalog: React.FC<PacksCatalogProps> = ({ onSelectPack }) => {
  const [filterCategory, setFilterCategory] = useState<PackFilterTab>('all');

  const filteredPacks =
    filterCategory === 'all'
      ? SMOKE_PACKS
      : SMOKE_PACKS.filter((p) => {
          if (filterCategory === 'humo_aereo') {
            return p.category === 'humo_aereo' || p.category === 'bodas';
          }
          return p.category === filterCategory;
        });

  return (
    <section id="packs" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
              Packs y Colecciones Homologadas
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Catálogo de Packs por Efecto y Servicio
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2">
              Elige tu pack ideal: 1. Cañones de humo aéreo, 2. Confeti romántico y mariposas, 3. Humo bajo sobre las nubes,
              4. Chispas frías, o 5. Sonido profesional con discoteca móvil.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-neutral-200 shadow-xs shrink-0 max-w-full">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'humo_aereo', label: '1. Humo Aéreo' },
              { id: 'confeti', label: '2. Confeti' },
              { id: 'humo_bajo', label: '3. Humo Bajo' },
              { id: 'chispas_frias', label: '4. Chispas Frías' },
              { id: 'sonido_luces', label: '5. Sonido & DJ' },
              { id: 'revelacion_genero', label: 'Revelación TNT' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as PackFilterTab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterCategory === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPacks.map((pack) => {
            const isHighlight = pack.highlight;
            const isTnt = pack.id === 'pack-revelacion-tnt';
            const isConfeti = pack.category === 'confeti';
            const isHumoBajo = pack.category === 'humo_bajo';
            const isChispas = pack.category === 'chispas_frias';
            const isSonido = pack.category === 'sonido_luces';

            let cardTheme = 'border-neutral-200 hover:border-neutral-300 bg-white';
            let badgeColor = 'text-rose-600';

            if (isTnt) {
              cardTheme = 'border-2 border-amber-500 shadow-xl shadow-amber-500/10 bg-amber-50/20';
              badgeColor = 'text-amber-800';
            } else if (isConfeti) {
              cardTheme = 'border-2 border-fuchsia-400 shadow-xl shadow-fuchsia-500/10 bg-fuchsia-50/20';
              badgeColor = 'text-fuchsia-700';
            } else if (isHumoBajo) {
              cardTheme = 'border-2 border-sky-400 shadow-xl shadow-sky-500/10 bg-sky-50/20';
              badgeColor = 'text-sky-700';
            } else if (isChispas) {
              cardTheme = 'border-2 border-amber-400 shadow-xl shadow-amber-500/10 bg-amber-50/20';
              badgeColor = 'text-amber-700';
            } else if (isSonido) {
              cardTheme = 'border-2 border-indigo-400 shadow-xl shadow-indigo-500/10 bg-indigo-50/20';
              badgeColor = 'text-indigo-700';
            } else if (isHighlight) {
              cardTheme = 'border-2 border-rose-500 shadow-xl shadow-rose-500/10 bg-white';
              badgeColor = 'text-rose-600';
            }

            // Dedicated photo for every single pack
            let imageSrc = '/assets/services/humo-aereo.jpg';
            let imageAlt = pack.name;
            let imageBadge = 'Efecto Homologado CE';

            if (pack.id === 'pack-revelacion-tnt') {
              imageSrc = '/assets/services/disparador-tnt-revelacion-real.jpg';
              imageAlt = 'Pedestal de Madera Blanco con Disparador TNT Retro para Revelación de Género';
              imageBadge = 'Pedestal TNT Original para Papás';
            } else if (pack.id === 'pack-revelacion-mando') {
              imageSrc = '/assets/services/pack-revelacion-rosa-azul.jpg';
              imageAlt = 'Revelación de género sorpresa con columnas de humo vertical rosa o azul';
              imageBadge = '100% Secreto y Sorpresa (Rosa o Azul)';
            } else if (pack.id === 'pack-salida-ceremonia') {
              imageSrc = '/assets/services/pack-humo-aereo-ceremonia.jpg';
              imageAlt = 'Disparo instantáneo vertical de humo aéreo para salida de ceremonia';
              imageBadge = 'Disparo Instantáneo a 15m';
            } else if (pack.id === 'pack-entrada-triunfal') {
              imageSrc = '/assets/services/pack-humo-aereo-entrada.jpg';
              imageAlt = 'Apertura en abanico multicolor de humo aéreo para entrada nupcial';
              imageBadge = 'Abanico Cúpula de Colores';
            } else if (pack.id === 'pack-confeti-mariposas-blanco') {
              imageSrc = '/assets/services/canones-confeti.jpg';
              imageAlt = 'Cañones de confeti con lluvia de mariposas de seda y nieve blanca';
              imageBadge = 'Mariposas de Seda & Nieve Pura';
            } else if (pack.id === 'pack-confeti-fiesta-colores') {
              imageSrc = '/assets/services/canones-confeti.jpg';
              imageAlt = 'Lluvia de confeti multicolor y metalizado para apertura de fiesta';
              imageBadge = 'Lluvia Fiesta Multicolor & Metalizada';
            } else if (pack.id === 'pack-humo-bajo-nubes') {
              imageSrc = '/assets/services/novios-baile-nubes-humo-bajo.jpg';
              imageAlt = 'Vals nupcial sobre las nubes con niebla baja de hielo seco';
              imageBadge = '100% Vapor Limpio · No Mancha';
            } else if (pack.id === 'pack-chispas-frias-sparkulars') {
              imageSrc = '/assets/services/chispas-frias.jpg';
              imageAlt = 'Fuentes de chispas frías Sparkulars sin humo ni olor';
              imageBadge = 'Fuego Frío Inocuo (Titanio)';
            } else if (pack.id === 'pack-sonido-iluminacion-discoteca') {
              imageSrc = '/assets/services/sonido-iluminacion.jpg';
              imageAlt = 'Sonido profesional PA, iluminación LED y discoteca móvil con DJ';
              imageBadge = 'Sonido PA & Luces Robotizadas';
            } else if (pack.id === 'pack-boda-total') {
              imageSrc = '/assets/services/novios-baile-nubes-humo-bajo.jpg';
              imageAlt = 'Pack Boda Total 360° con humo aéreo, confeti, niebla baja y chispas frías';
              imageBadge = 'Experiencia Total 360°';
            } else if (pack.id === 'pack-bengalas-humo-mano') {
              imageSrc = '/assets/services/pack-humo-aereo-ceremonia.jpg';
              imageAlt = 'Bengalas profesionales de humo con anilla Wire-Pull para fotos';
              imageBadge = 'Sesión Fotográfica Dinámica';
            } else if (isConfeti) {
              imageSrc = '/assets/services/canones-confeti.jpg';
              imageAlt = 'Cañones de confeti y mariposas para bodas';
              imageBadge = 'Confeti Homologado CE';
            } else if (isHumoBajo) {
              imageSrc = '/assets/services/novios-baile-nubes-humo-bajo.jpg';
              imageAlt = 'Niebla baja de hielo seco';
              imageBadge = '100% Vapor Limpio';
            } else if (isChispas) {
              imageSrc = '/assets/services/chispas-frias.jpg';
              imageAlt = 'Fuentes de chispas frías Sparkulars';
              imageBadge = 'Fuego Frío Titanio';
            } else if (isSonido) {
              imageSrc = '/assets/services/sonido-iluminacion.jpg';
              imageAlt = 'Sonido e iluminación profesional';
              imageBadge = 'Producción Integral';
            }

            return (
              <div
                key={pack.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all ${cardTheme}`}
              >
                {/* Header Badge */}
                {pack.badge && (
                  <div className="mb-4">
                    <span className={`text-[11px] font-bold tracking-wider uppercase ${badgeColor}`}>
                      ★ {pack.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 font-display mb-1.5 flex items-center gap-2">
                    {isTnt && <Bomb className="w-5 h-5 text-amber-600 shrink-0" />}
                    {isConfeti && <PartyPopper className="w-5 h-5 text-fuchsia-600 shrink-0" />}
                    {isHumoBajo && <CloudRain className="w-5 h-5 text-sky-600 shrink-0" />}
                    {isChispas && <Flame className="w-5 h-5 text-amber-600 shrink-0" />}
                    {isSonido && <Speaker className="w-5 h-5 text-indigo-600 shrink-0" />}
                    <span>{pack.name}</span>
                  </h3>
                  <p className="text-xs text-neutral-600 min-h-[34px] leading-relaxed mb-4">{pack.tagline}</p>

                  {/* Photo if available */}
                  {imageSrc && (
                    <div className="relative mb-4 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm group">
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex items-end p-3">
                        <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>{imageBadge}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Recommendation row */}
                  <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                      <Layers className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{pack.tubesRecommendation}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                      A medida
                    </span>
                  </div>

                  {/* Quick specs */}
                  <div className="grid grid-cols-2 gap-2 py-3 text-xs text-neutral-700 border-b border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <ArrowUp className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className="font-medium">{pack.height}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-medium">Homologado CE</span>
                    </div>
                  </div>

                  {/* What's included checklist */}
                  <div className="py-4 space-y-2.5">
                    <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Qué incluye este pack:
                    </p>
                    {pack.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA buttons */}
                <div className="pt-6 border-t border-neutral-100 mt-6 flex flex-col gap-2.5">
                  <button
                    onClick={() => onSelectPack(pack)}
                    className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Configurar Este Pack</span>
                  </button>

                  <a
                    href={`https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20consultar%20disponibilidad%20y%20presupuesto%20para%20el%20${encodeURIComponent(
                      pack.name
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
