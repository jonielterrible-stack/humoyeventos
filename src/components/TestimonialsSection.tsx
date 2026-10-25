import React from 'react';
import { Star, Quote, Heart, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/smokeData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="opiniones" aria-label="Opiniones de Parejas 2026" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              <span>Reseñas Verificadas de Bodas 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Más de 380 parejas han confiado en Humo Y Efectos
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Opiniones reales de parejas y wedding planners en Talavera de la Reina, Madrid, Toledo y toda España que han vivido su momento inolvidable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 shrink-0 shadow-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-neutral-900 tabular-nums">4.9 / 5.0 (384 valoraciones)</p>
                <p className="text-neutral-500 text-[11px] font-medium">Temporada 2026 en Bodas.net & Google Reviews</p>
              </div>
            </div>

            <a
              href="https://www.bodas.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-neutral-700 hover:text-rose-600 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 transition-colors shadow-xs"
              title="Consultar directorio oficial en Bodas.net"
            >
              <span>Ver en Bodas.net</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Testimonial Cards on White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              itemScope
              itemType="https://schema.org/Review"
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 flex flex-col justify-between hover:border-neutral-300 shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex text-amber-400"
                    itemProp="reviewRating"
                    itemScope
                    itemType="https://schema.org/Rating"
                  >
                    <meta itemProp="ratingValue" content={String(t.rating)} />
                    <meta itemProp="bestRating" content="5" />
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-300" />
                </div>

                <p itemProp="reviewBody" className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-6 font-medium">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <p itemProp="author" itemScope itemType="https://schema.org/Person" className="text-sm font-bold text-neutral-900 font-display">
                  <span itemProp="name">{t.couple}</span>
                </p>
                <p className="text-xs text-neutral-500 font-medium">{t.location}</p>
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-neutral-150">
                  <span className="text-[11px] text-rose-600 font-bold font-mono">
                    {t.pack}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-semibold tabular-nums" itemProp="datePublished">
                    {t.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Internal Cross-Link Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-neutral-50 to-amber-50 border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-neutral-700">
              ¿Quieres recrear estos momentos en vuestro enlace? <strong>Descubre el pack más recomendado</strong> para vuestra finca o espacio.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#packs"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <span>Ver Packs para Bodas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#configurador"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <span>Configurar Presupuesto</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
