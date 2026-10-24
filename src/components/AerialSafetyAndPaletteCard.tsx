import React, { useState } from 'react';
import {
  Ruler,
  Compass,
  ShieldCheck,
  Palette,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
  Eye,
  Layers,
} from 'lucide-react';
import { OFFICIAL_SAFETY_SPECS, SMOKE_COLORS, SmokeColor } from '../data/smokeData';
import { assetUrl } from '../utils/assetUrl';

interface AerialSafetyAndPaletteCardProps {
  onSelectColor?: (color: SmokeColor) => void;
  onOpenConfigurator?: () => void;
}

export const AerialSafetyAndPaletteCard: React.FC<AerialSafetyAndPaletteCardProps> = ({
  onSelectColor,
  onOpenConfigurator,
}) => {
  const [activeColor, setActiveColor] = useState<SmokeColor>(SMOKE_COLORS[9]); // Rosa Pastel default
  const [activePhotoTab, setActivePhotoTab] = useState<'poster' | 'tubos'>('poster');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden my-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Homologación Oficial CE Cat. T1 · Montaje con Técnico</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Esta es Nuestra Paleta de Colores Oficial
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Disponemos de stock real garantizado en estos <strong>10 colores exclusivos de fábrica</strong>.
              Nuestros técnicos profesionales se encargan de todo el montaje, anclaje y disparo inalámbrico en tu evento respetando las distancias de seguridad.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 border border-white/10 px-3.5 py-2 rounded-2xl shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>10 Tonos en Stock Real</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* ========================================================= */}
        {/* 1. PALETA OFICIAL VISUAL CON CARTEL Y FOTOGRAFÍA REAL     */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-rose-600" />
              <h4 className="text-base font-extrabold text-neutral-900 font-display">
                Paleta Oficial de Fábrica (10 Colores Disponibles)
              </h4>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Gama Oficial Homologada CE</span>
            </div>
          </div>

          {/* FOTO PRINCIPAL DESTACADA */}
          <div className="rounded-3xl border border-neutral-200 overflow-hidden bg-neutral-950 relative shadow-md group">
            <div className="relative flex items-center justify-center p-2 sm:p-4 bg-neutral-950">
              <img
                src={assetUrl('/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg')}
                alt="¡Humo Aéreo en todos los colores! Tú eliges cuánta cantidad de humo quieres - Paleta Oficial 10 Colores Humo Y Efectos"
                title="Paleta Oficial de Colores Humo Aéreo - Humo Y Efectos"
                className="w-full h-auto max-h-[580px] sm:max-h-[640px] object-contain rounded-2xl mx-auto shadow-2xl transition-transform duration-300 group-hover:scale-[1.005]"
              />
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 bg-neutral-900/90 hover:bg-neutral-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Ver en Pantalla Completa</span>
              </button>
            </div>
          </div>

          {/* 10 Interactive Color Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
            {SMOKE_COLORS.map((c) => {
              const isSelected = activeColor.id === c.id;

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveColor(c);
                    if (onSelectColor) onSelectColor(c);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-sm'
                      : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-neutral-500">
                      Nº {c.tubeIndex}
                    </span>
                    <span
                      className="w-4 h-4 rounded-full border border-neutral-300 shadow-xs shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-neutral-900 block leading-tight truncate">
                      {c.name.split('/')[0].trim()}
                    </span>
                    <span className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                      {c.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Color Info Strip */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span
                className="w-7 h-7 rounded-full border border-neutral-300 shadow-xs shrink-0"
                style={{ backgroundColor: activeColor.hex }}
              />
              <div>
                <span className="font-extrabold text-neutral-900">
                  Tono seleccionado: {activeColor.name} (Tubo Nº {activeColor.tubeIndex})
                </span>
                <p className="text-neutral-500 text-[11px] mt-0.5">
                  {activeColor.description}
                </p>
              </div>
            </div>

            {onOpenConfigurator && (
              <button
                type="button"
                onClick={onOpenConfigurator}
                className="w-full sm:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pedir este color en mi presupuesto</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DISTANCIAS TÉCNICAS DE SEGURIDAD (SOLO DISTANCIAS)     */}
        {/* ========================================================= */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <h4 className="text-base font-extrabold text-neutral-900 font-display">
                Distancias de Seguridad Técnicas (CE Cat. T1)
              </h4>
            </div>
            <span className="text-xs font-medium text-neutral-500">
              Normativa Europea Sbruffo Smoke 40 (0163-T1-6069)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Distancia Vertical */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 relative overflow-hidden group hover:border-rose-300 transition-colors">
              <div className="absolute top-3.5 right-3.5 text-rose-300">
                <Ruler className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase text-rose-700 tracking-wider">
                Efecto en Vertical
              </span>
              <div className="text-3xl font-black text-rose-950 mt-1 mb-1 font-display">
                {OFFICIAL_SAFETY_SPECS.distances.vertical}
              </div>
              <p className="text-xs text-rose-900/80 leading-relaxed font-medium">
                {OFFICIAL_SAFETY_SPECS.distances.verticalLabel}. Altura donde el humo abre en cúpula para la foto perfecta.
              </p>
            </div>

            {/* 2. Distancia Radial */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 relative overflow-hidden group hover:border-amber-300 transition-colors">
              <div className="absolute top-3.5 right-3.5 text-amber-300">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase text-amber-700 tracking-wider">
                Perímetro Radial
              </span>
              <div className="text-3xl font-black text-amber-950 mt-1 mb-1 font-display">
                {OFFICIAL_SAFETY_SPECS.distances.radial}
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                {OFFICIAL_SAFETY_SPECS.distances.radialLabel}. Espacio perimetral técnico limpio alrededor de los cañones.
              </p>
            </div>

            {/* 3. Distancia al Público */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 relative overflow-hidden group hover:border-emerald-300 transition-colors">
              <div className="absolute top-3.5 right-3.5 text-emerald-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase text-emerald-700 tracking-wider">
                Distancia al Público
              </span>
              <div className="text-3xl font-black text-emerald-950 mt-1 mb-1 font-display">
                {OFFICIAL_SAFETY_SPECS.distances.public}
              </div>
              <p className="text-xs text-emerald-900/80 leading-relaxed font-medium">
                {OFFICIAL_SAFETY_SPECS.distances.publicLabel}. Garantiza una panorámica fotográfica espectacular y 100% cómoda para los invitados.
              </p>
            </div>
          </div>

          {/* Tranquility Box for Clients (Handled by Technicians) */}
          <div className="p-4 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Tranquilidad Total: Montaje y Coordinación por Técnicos Especialistas
                </span>
                <p className="text-[11px] text-neutral-300 mt-0.5">
                  Nuestros técnicos se ocupan personalmente de medir el espacio en la finca, anclar los cañones y realizar la detonación inalámbrica controlada a distancia.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-xl shrink-0">
              CE 0163-T1-6069 · 35g NEC
            </span>
          </div>
        </div>
      </div>

      {/* MODAL LIGHTBOX PANTALLA COMPLETA */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar vista completa"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={assetUrl('/assets/aistudio/Humo_A_reo_en_Todos_los_Colores_b74ac735.png')}
              alt="Cartel Visual Oficial de Humo Aéreo en todos los colores"
              title="Cartel Oficial Humo Aéreo Sbruffo Smoke 40"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
