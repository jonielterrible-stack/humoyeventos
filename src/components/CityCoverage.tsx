import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, PhoneCall } from 'lucide-react';
import { CITIES_SEO } from '../data/smokeData';

export const CityCoverage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(CITIES_SEO[0]);

  return (
    <section id="ciudades" className="py-20 bg-neutral-50/80 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>Sede Central Talavera · Madrid · Zona Centro · Toda España</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
            Desplazamiento y Disparo Oficial con Técnicos en tu Finca
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            Con base operativa central en <strong>Talavera de la Reina</strong> y servicio técnico prioritario en <strong>Madrid y Zona Centro</strong> (Toledo, Guadalajara, Ávila, Segovia, Ciudad Real y Cáceres), cubrimos enlaces y eventos en <strong>todas las provincias de España</strong>. Para garantizar máxima seguridad, cero problemas y 100% de éxito,
            <strong> acudo yo personalmente o un técnico especialista de mi equipo</strong> directamente a tu finca o espacio para el montaje, peritaje de distancias y detonación en el instante exacto.
          </p>
        </div>

        {/* City Selector Links / Tabs for Search Engines & Users */}
        <nav aria-label="Provincias y Ciudades de Cobertura" className="flex flex-wrap gap-2 mb-8">
          {CITIES_SEO.map((city) => {
            const active = selectedCity.slug === city.slug;
            return (
              <a
                key={city.slug}
                href={`#ciudad-${city.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCity(city);
                }}
                title={`Ver cobertura técnica de efectos especiales en ${city.name}`}
                className={`px-4 py-2.5 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {city.name.split(' (')[0]}
              </a>
            );
          })}
        </nav>

        {/* Active City Detail Panel */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600">
                <MapPin className="w-4 h-4" />
                <span>{selectedCity.badge}</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 font-display">
                Humo Aéreo para Eventos y Bodas en {selectedCity.name}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {selectedCity.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Desplazamiento de técnico oficial con todo el equipamiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Coordinación directa con tu finca y fotógrafo local</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Montaje, anclaje seguro antivuelco y control de distancias</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Detonación en el segundo exacto sin preocupaciones para los novios</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center space-y-4">
              <p className="text-xs text-neutral-600 font-medium">
                ¿Te casas o tienes un evento en <strong className="text-neutral-900">{selectedCity.name.split(' (')[0]}</strong>?
              </p>
              <a
                href={`https://wa.me/34600082462?text=${encodeURIComponent(
                  `Hola, me caso en ${selectedCity.name} y me gustaría saber disponibilidad y opciones de humo aéreo para mi fecha.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/30 transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Consultar Fechas en {selectedCity.name.split(' (')[0]}</span>
              </a>
              <span className="text-[11px] text-neutral-500 block font-medium">
                Respuesta en menos de 15 minutos por WhatsApp
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
