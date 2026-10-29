import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  Heart,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ZoomIn,
  X,
  Share2,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, Testimonial } from '../data/smokeData';
import { assetUrl } from '../utils/assetUrl';

export const TestimonialsSection: React.FC = () => {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
    title: string;
    couple: string;
    location?: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Show 3 featured cards by default (fits 3 cards per screen on desktop cleanly without lateral cutoffs), expandable downwards
  const displayedTestimonials = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalImage]);

  // Handle direct hash navigation e.g. #opinion-1
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#opinion-')) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 350);
      }
    }
  }, []);

  const handleShare = async (t: Testimonial) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const shareUrl = `${origin}${pathname}#opinion-${t.id}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(t.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  return (
    <section id="opiniones" aria-label="Opiniones de Parejas 2026" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              <span>Reseñas Verificadas de Bodas y Eventos 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Más de 385 clientes y parejas han confiado en Humo Y Efectos
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Experiencias reales de bodas y eventos con humo aéreo y efectos especiales en Talavera de la Reina, Madrid, Toledo y toda España.
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

        {/* Responsive Grid Layout: 3 cards side-by-side on desktop, vertical downward scroll on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {displayedTestimonials.map((t, index) => {
            const hasPhoto = Boolean(t.photo);
            const isCopied = copiedId === t.id;

            return (
              <motion.article
                key={t.id}
                id={`opinion-${t.id}`}
                itemScope
                itemType="https://schema.org/Review"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className={`w-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all ${
                  hasPhoto
                    ? 'bg-amber-50/25 border-2 border-amber-300 hover:border-amber-400 shadow-md ring-1 ring-amber-200/50'
                    : 'bg-neutral-50 border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div>
                  {/* Top Bar with Badge & Share Button */}
                  <div className="mb-3.5 flex items-center justify-between gap-2">
                    {t.badge ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-900 border border-amber-300">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        {t.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-neutral-400 font-mono uppercase tracking-wider">
                        Cliente Verificado
                      </span>
                    )}

                    {/* Share Button (Clipboard API) */}
                    <button
                      type="button"
                      onClick={() => handleShare(t)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 border border-neutral-200 shadow-2xs'
                      }`}
                      title="Copiar enlace directo a esta opinión"
                      aria-label="Compartir y copiar enlace a esta opinión"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Compartir</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Customer Event Photo (compact thumbnail with click-to-expand) */}
                  {t.photo && (
                    <figure
                      itemProp="image"
                      itemScope
                      itemType="https://schema.org/ImageObject"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        setModalImage({
                          src: assetUrl(t.photo!),
                          alt: t.photoAlt || `${t.couple} - Evento con Humo Y Efectos`,
                          title: t.photoTitle || `${t.couple} | Humo Y Efectos`,
                          couple: t.couple,
                          location: t.location,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setModalImage({
                            src: assetUrl(t.photo!),
                            alt: t.photoAlt || `${t.couple} - Evento con Humo Y Efectos`,
                            title: t.photoTitle || `${t.couple} | Humo Y Efectos`,
                            couple: t.couple,
                            location: t.location,
                          });
                        }
                      }}
                      title="Haz clic para ver la foto en grande"
                      className="mb-4 h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 p-1 shadow-inner flex items-center justify-center group cursor-pointer relative transition-transform hover:scale-[1.01]"
                    >
                      <img
                        src={assetUrl(t.photo)}
                        alt={t.photoAlt || `${t.couple} - Evento con Humo Y Efectos`}
                        title={t.photoTitle || `${t.couple} | Humo Y Efectos`}
                        width={400}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        itemProp="contentUrl"
                        className="w-full h-full object-contain mx-auto rounded-xl transition-all duration-300 group-hover:opacity-90"
                      />
                      {/* Zoom Indicator Overlay on Hover */}
                      <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 text-white text-[11px] font-bold rounded-xl shadow-lg border border-white/20">
                          <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ver en grande</span>
                        </span>
                      </div>
                      <meta itemProp="name" content={t.photoTitle || t.couple} />
                      <meta itemProp="description" content={t.photoAlt || t.text} />
                      <figcaption className="sr-only">{t.photoAlt}</figcaption>
                    </figure>
                  )}

                  {/* Rating Stars & Quote Icon */}
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

                  {/* Review Text */}
                  <p itemProp="reviewBody" className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-6 font-medium">
                    "{t.text}"
                  </p>
                </div>

                {/* Footer with Author, Location & Date */}
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
              </motion.article>
            );
          })}
        </div>

        {/* Toggle to expand more reviews downwards */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>{showAll ? 'Mostrar menos opiniones' : 'Ver más opiniones reales de parejas (385 valoraciones)'}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showAll ? '-rotate-90' : 'rotate-90'}`} />
          </button>
        </div>

        {/* Internal Cross-Link Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-neutral-50 to-amber-50 border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
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

      {/* Lightbox Modal for Full-Size Photo View */}
      {modalImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto de ${modalImage.couple}`}
          className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-neutral-900 rounded-3xl p-3 sm:p-4 border border-neutral-800 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close Button */}
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-neutral-800 mb-3">
              <div>
                <p className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{modalImage.couple}</span>
                </p>
                {modalImage.location && (
                  <p className="text-[11px] text-neutral-400">{modalImage.location}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Cerrar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Full-Size Image Container (100% visible, no crop) */}
            <div className="w-full max-h-[75vh] flex items-center justify-center bg-neutral-950 rounded-2xl overflow-hidden p-2 border border-neutral-800/80">
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                title={modalImage.title}
                className="max-h-[72vh] max-w-full w-auto h-auto object-contain mx-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Caption & Close Action */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-3 pt-3 mt-1 text-xs text-neutral-400">
              <p className="text-center sm:text-left text-neutral-300 italic">
                Revelación de género con disparador TNT retro y columna de humo aéreo rosa a 15 metros.
              </p>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Cerrar imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
