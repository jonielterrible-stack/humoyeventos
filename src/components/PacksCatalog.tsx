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
import { assetUrl } from '../utils/assetUrl';

interface PacksCatalogProps {
  onSelectPack: (pack: SmokePack) => void;
}

type PackFilterTab =
  | 'all'
  | 'humo_aereo'
  | 'confeti'
  | 'chispas_frias'
  | 'humo_bajo'
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
              Elige tu pack ideal: <strong>1. Cañones de humo aéreo</strong>, <strong>2. Confeti (multicolor y mariposas)</strong>, <strong>3. Fuentes de chispas frías</strong>, <strong>4. Humo bajo sobre las nubes</strong>, o <strong>5. Sonido profesional con DJ</strong>.
            </p>
          </div>

          {/* Filter tabs strictly ordered 1 to 5 */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-neutral-200 shadow-xs shrink-0 max-w-full">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'humo_aereo', label: '1. Humo Aéreo' },
              { id: 'confeti', label: '2. Confeti' },
              { id: 'chispas_frias', label: '3. Chispas Frías' },
              { id: 'humo_bajo', label: '4. Humo Bajo' },
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
            const isChispas = pack.category === 'chispas_frias';
            const isHumoBajo = pack.category === 'humo_bajo';
            const isSonido = pack.category === 'sonido_luces';

            let cardTheme = 'border-neutral-200 hover:border-neutral-300 bg-white';
            let badgeColor = 'text-rose-600';

            if (isTnt) {
              cardTheme = 'border-2 border-amber-500 shadow-xl shadow-amber-500/10 bg-amber-50/20';
              badgeColor = 'text-amber-800';
            } else if (isConfeti) {
              cardTheme = 'border-2 border-fuchsia-400 shadow-xl shadow-fuchsia-500/10 bg-fuchsia-50/20';
              badgeColor = 'text-fuchsia-700';
            } else if (isChispas) {
              cardTheme = 'border-2 border-amber-400 shadow-xl shadow-amber-500/10 bg-amber-50/20';
              badgeColor = 'text-amber-700';
            } else if (isHumoBajo) {
              cardTheme = 'border-2 border-sky-400 shadow-xl shadow-sky-500/10 bg-sky-50/20';
              badgeColor = 'text-sky-700';
            } else if (isSonido) {
              cardTheme = 'border-2 border-indigo-400 shadow-xl shadow-indigo-500/10 bg-indigo-50/20';
              badgeColor = 'text-indigo-700';
            } else if (isHighlight) {
              cardTheme = 'border-2 border-rose-500 shadow-xl shadow-rose-500/10 bg-white';
              badgeColor = 'text-rose-600';
            }

            // Dedicated photo for every single pack with SEO alt and titles
            let imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg');
            let imageAlt = pack.name;
            let imageBadge = 'Efecto Homologado CE';

            if (pack.id === 'pack-revelacion-tnt') {
              imageSrc = assetUrl('/assets/services/disparador-tnt-revelacion-real.jpg');
              imageAlt = 'Pedestal de Madera Blanco con Disparador TNT Retro para Revelación de Género sorpresa';
              imageBadge = 'Pedestal TNT Original para Papás';
            } else if (pack.id === 'pack-revelacion-mando') {
              imageSrc = assetUrl('/assets/services/pack-revelacion-rosa-azul.jpg');
              imageAlt = 'Revelación de género sorpresa con columnas de humo vertical rosa o azul';
              imageBadge = '100% Secreto y Sorpresa (Rosa o Azul)';
            } else if (pack.id === 'pack-salida-ceremonia') {
              imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg');
              imageAlt = 'Disparo instantáneo vertical de humo aéreo para salida de ceremonia de novios';
              imageBadge = 'Disparo Instantáneo a 15m';
            } else if (pack.id === 'pack-entrada-triunfal') {
              imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg');
              imageAlt = 'Apertura en abanico multicolor de humo aéreo para entrada nupcial en finca';
              imageBadge = 'Abanico Cúpula de Colores';
            } else if (pack.id === 'pack-confeti-mariposas-blanco' || pack.id === 'pack-confeti-fiesta-colores' || isConfeti) {
              // User official image for Confeti (Multicolor y Mariposas)
              imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0018_9dfc7d92.jpg');
              imageAlt = 'Cañones de confeti multicolor y confeti de mariposas de seda para bodas';
              imageBadge = 'Multicolor & Mariposas Homologadas';
            } else if (pack.id === 'pack-chispas-frias-sparkulars' || isChispas) {
              // User official image for Chispas Frías (Fuentes Sparkulars)
              imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0017_4f707a65.jpg');
              imageAlt = 'Máquinas de chispas frías Sparkulars sin humo ni quemaduras para bodas';
              imageBadge = 'Fuego Frío Inocuo (Titanio)';
            } else if (pack.id === 'pack-humo-bajo-nubes' || isHumoBajo) {
              // User official image for Humo Bajo / Niebla Baja
              imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0019_e63127eb.jpg');
              imageAlt = 'Máquinas de humo bajo y niebla baja para vals sobre las nubes con hielo seco';
              imageBadge = '100% Vapor Limpio · No Mancha';
            } else if (pack.id === 'pack-sonido-iluminacion-discoteca' || isSonido) {
              imageSrc = assetUrl('/assets/services/sonido-iluminacion.jpg');
              imageAlt = 'Sonido profesional PA, iluminación LED y discoteca móvil con DJ para bodas';
              imageBadge = 'Sonido PA & Luces Robotizadas';
            } else if (pack.id === 'pack-boda-total') {
              imageSrc = assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg');
              imageAlt = 'Pack Boda Total 360° con humo aéreo, confeti, niebla baja y chispas frías';
              imageBadge = 'Experiencia Total 360°';
            } else if (pack.id === 'pack-bengalas-humo-mano') {
              imageSrc = assetUrl('/assets/services/pack-humo-aereo-ceremonia.jpg');
              imageAlt = 'Bengalas profesionales de humo con anilla Wire-Pull para fotografía';
              imageBadge = 'Sesión Fotográfica Dinámica';
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
                    {isChispas && <Flame className="w-5 h-5 text-amber-600 shrink-0" />}
                    {isHumoBajo && <CloudRain className="w-5 h-5 text-sky-600 shrink-0" />}
                    {isSonido && <Speaker className="w-5 h-5 text-indigo-600 shrink-0" />}
                    <span>{pack.name}</span>
                  </h3>
                  <p className="text-xs text-neutral-600 min-h-[34px] leading-relaxed mb-4">{pack.tagline}</p>

                  {/* Photo with optimized clean uncropped display */}
                  {imageSrc && (
                    <div className="relative mb-4 rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-950 flex items-center justify-center group">
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        title={imageAlt}
                        className="w-full h-auto max-h-52 object-contain block group-hover:scale-101 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Height and Duration Chips */}
                  <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
                    <div>
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase">Alcance / Altura</span>
                      <span className="font-semibold text-neutral-900">{pack.height}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase">Duración</span>
                      <span className="font-semibold text-neutral-900">{pack.duration}</span>
                    </div>
                  </div>

                  {/* Includes list */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Incluye:</p>
                    <ul className="space-y-1.5">
                      {pack.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onSelectPack(pack)}
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Personalizar este Pack</span>
                  </button>
                  <a
                    href={`https://wa.me/34600082462?text=${encodeURIComponent(
                      `¡Hola Humo Y Efectos! 👋 Quiero consultar presupuesto y disponibilidad para el ${pack.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-200"
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
