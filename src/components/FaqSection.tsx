import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQS } from '../data/smokeData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', 'Revelación de Género', 'Colores y Cañones', 'Seguridad', 'Normativa', 'Funcionamiento', 'Envíos'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCat === 'all' || faq.category === selectedCat;
    const matchesQuery =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>Guía Completa para Novios y Organizadores</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
            Preguntas Frecuentes sobre Humo Aéreo
          </h2>
          <p className="text-sm text-neutral-600 mt-3">
            Todo lo que necesitas saber sobre cañones, combinaciones de color, vestidos, seguridad y fincas.
          </p>

          {/* Search bar inside FAQ */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar duda (ej: cañones, vestidos, permisos, colores...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 shadow-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat === 'all' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-neutral-900 font-display pr-2">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-rose-50 text-rose-600' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    <p>{faq.a}</p>
                    <span className="inline-block mt-3 text-[11px] font-mono text-rose-600 font-bold">
                      Categoría: {faq.category} · Garantía Humo Y Efectos (Certificado CE Clase T1)
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border border-neutral-200">
              <p className="text-xs text-neutral-500">No encontramos respuestas para "{searchTerm}".</p>
              <a
                href={`https://wa.me/34600082462?text=${encodeURIComponent(
                  `Hola, tengo una pregunta sobre el humo aéreo: ${searchTerm}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                Pregúntanos directamente por WhatsApp →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
