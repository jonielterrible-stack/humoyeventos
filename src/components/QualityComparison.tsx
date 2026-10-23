import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { COMPARISON_DATA } from '../data/smokeData';

export const QualityComparison: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>Seguridad y Garantía Nupcial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
            ¿Por qué somos el Nº1 en Humo Aéreo en España?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            Un disparo instantáneo de alta precisión frente al humo barato y continuo que llena de niebla y olores
            el cóctel. Cañones verticales que disipan limpiamente a 15 metros a distancia de seguridad y niebla baja de hielo seco 100% limpia para el salón.
          </p>
        </div>

        {/* Comparison Table on White */}
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-200 bg-neutral-50 p-4 md:p-6 text-sm font-bold">
            <div className="md:col-span-4 text-neutral-800">Aspecto Crítico de Seguridad</div>
            <div className="md:col-span-4 text-rose-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-rose-600" />
              <span>Humo Y Efectos (Gama Profesional)</span>
            </div>
            <div className="md:col-span-4 text-neutral-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Humo Barato / Marketplaces</span>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {COMPARISON_DATA.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-6 text-xs sm:text-sm items-center gap-3 md:gap-4 hover:bg-neutral-50/80 transition-colors"
              >
                <div className="md:col-span-4 font-bold text-neutral-900">{row.feature}</div>
                <div className="md:col-span-4 text-neutral-800 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{row.smokeEventos}</span>
                </div>
                <div className="md:col-span-4 text-neutral-500 flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{row.lowCost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Callout Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-neutral-50 to-amber-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 font-display">
                Compromiso Humo Y Efectos: Dossier Aprobado para Fincas
              </h4>
              <p className="text-xs text-neutral-600">
                Disparo instantáneo que se disipa en segundos. Entregamos certificado CE Clase T1 y seguro de
                responsabilidad civil para el metre de la finca.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quisiera%20solicitar%20el%20dossier%20técnico%20y%20certificado%20CE%20para%20mi%20finca."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Solicitar Dossier Técnico CE
          </a>
        </div>
      </div>
    </section>
  );
};
