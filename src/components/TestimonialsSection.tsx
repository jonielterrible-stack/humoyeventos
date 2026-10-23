import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/smokeData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              <span>Experiencias Reales de Novios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Más de 380 parejas han llenado su cielo de color
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Descubre por qué las mejores parejas y wedding planners de España eligen el Humo Aéreo de Smoke Eventos.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 shrink-0 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs">
              <p className="font-extrabold text-neutral-900 tabular-nums">4.9 / 5.0</p>
              <p className="text-neutral-500 text-[11px] font-medium">En Bodas.net y Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Testimonial Cards on White */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-neutral-300 shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-300" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-6 font-medium">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <p className="text-sm font-bold text-neutral-900 font-display">{t.couple}</p>
                <p className="text-xs text-neutral-500 font-medium">{t.location}</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-rose-600 font-bold font-mono">
                  <span>{t.pack}</span>
                  <span>·</span>
                  <span>{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
