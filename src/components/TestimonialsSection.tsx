import React from 'react';
import { Star, Quote, Heart, ExternalLink, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/smokeData';
import { assetUrl } from '../utils/assetUrl';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="opiniones" aria-label="Opiniones de Parejas 2026" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              <span>Reseñas Verificadas de Bodas y Eventos 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Más de 385 clientes y parejas han confiado en Humo Y Efectos
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Opiniones reales de bodas, revelaciones de género y eventos privados en Talavera de la Reina, Madrid, Toledo y toda España que han vivido su momento inolvidable.
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
                <p className="font-extrabold text-neutral-900 tabular-nums">4.9 / 5.0 (385 valoraciones)</p>
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
          {TESTIMONIALS.map((t) => {
            const hasPhoto = Boolean(t.photo);
            return (
              <article
                key={t.id}
                itemScope
                itemType="https://schema.org/Review"
                className={`rounded-3xl p-7 flex flex-col justify-between shadow-sm transition-all ${
                  hasPhoto
                    ? 'bg-amber-50/20 border-2 border-amber-400/80 hover:border-amber-500 shadow-md md:col-span-2 lg:col-span-1'
                    : 'bg-neutral-50 border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div>
                  {/* Badge if available */}
                  {t.badge && (
                    <div className="mb-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-900 border border-amber-300">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        {t.badge}
                      </span>
                    </div>
                  )}

                  {/* Customer Event Photo (displayed fully without crop) */}
                  {t.photo && (
                    <figure
                      itemProp="image"
                      itemScope
                      itemType="https://schema.org/ImageObject"
                      className="mb-5 h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 p-1.5 shadow-inner flex items-center justify-center group"
                    >
                      <img
                        src={assetUrl(t.photo)}
                        alt={t.photoAlt || `${t.couple} - Evento con Humo Y Efectos`}
                        title={t.photoTitle || `${t.couple} | Humo Y Efectos`}
                        width={700}
                        height={700}
                        loading="lazy"
                        decoding="async"
                        itemProp="contentUrl"
                        className="w-full h-full object-contain mx-auto rounded-xl group-hover:scale-102 transition-transform duration-500"
                      />
                      <meta itemProp="name" content={t.photoTitle || t.couple} />
                      <meta itemProp="description" content={t.photoAlt || t.text} />
                      <figcaption className="sr-only">{t.photoAlt}</figcaption>
                    </figure>
                  )}

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
            );
          })}
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
