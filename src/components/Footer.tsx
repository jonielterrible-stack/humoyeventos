import React from 'react';
import { ShieldCheck, MessageSquare, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs">
      {/* Top Banner with SEO Trust */}
      <div className="border-b border-neutral-100 py-6 bg-neutral-50/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-rose-600" />
            <span className="text-neutral-800 font-semibold text-xs">
              Humo Y Efectos: Disparo instantáneo homologado CE Clase T1 en toda la Unión Europea.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-500 font-medium">
            <span>Envíos Península 24/48h</span>
            <span aria-hidden="true">·</span>
            <span>Dispersión limpia y segura</span>
            <span aria-hidden="true">·</span>
            <span>Disipación en segundos</span>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-extrabold text-neutral-950 tracking-tight font-display block">
              <span className="text-rose-600">HUMO</span> Y EFECTOS
            </span>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Líderes en España en disparo instantáneo de humo aéreo vertical de colores para bodas y eventos.
              De 1 a 9 cañones con apertura en altura y disipación limpia sin niebla persistente.
            </p>
            <p className="text-[11px] text-neutral-400">
              Sede Central en Talavera de la Reina (Toledo) · Servicio Directo en Madrid, Zona Centro y Toda España.
            </p>
          </div>

          {/* Col 2: Efectos & Servicios */}
          <div>
            <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Servicios en Orden</p>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a href="#servicios" className="hover:text-rose-600 transition-colors">
                  1. Cañones de Humo Aéreo (1 a 9)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-fuchsia-600 transition-colors">
                  2. Cañones de Confeti (Multicolor & Mariposas)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-amber-600 transition-colors">
                  3. Fuentes de Chispas Frías (Sparkulars)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-sky-600 transition-colors">
                  4. Máquinas de Humo Bajo (Hielo Seco)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-indigo-600 transition-colors">
                  5. Alquiler de Sonido & Discoteca Móvil
                </a>
              </li>
              <li>
                <a href="#packs" className="hover:text-amber-600 transition-colors">
                  Revelación de Género (TNT Retro)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Cobertura y Enlaces */}
          <div>
            <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Cobertura & Guías</p>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a href="#ciudades" className="hover:text-rose-600 transition-colors">
                  Humo Aéreo Talavera de la Reina (Sede Central)
                </a>
              </li>
              <li>
                <a href="#ciudades" className="hover:text-rose-600 transition-colors">
                  Humo Aéreo Madrid y Fincas de la Sierra
                </a>
              </li>
              <li>
                <a href="#ciudades" className="hover:text-rose-600 transition-colors">
                  Humo Aéreo Toledo y Cigarrales
                </a>
              </li>
              <li>
                <a href="#ciudades" className="hover:text-rose-600 transition-colors">
                  Efectos Especiales Zona Centro y España
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-rose-600 transition-colors">
                  Preguntas Frecuentes y Normativa CE
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-rose-600 transition-colors">
                  Visualiza Tu Momento (Finca, Lago, Palacio)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto directo */}
          <div>
            <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">Contacto Directo</p>
            <ul className="space-y-2 text-xs">
              <li className="text-neutral-900 font-bold">WhatsApp / Teléfono:</li>
              <li className="text-neutral-700 font-mono font-medium">+34 600 08 24 62</li>
              <li className="text-neutral-900 font-bold mt-3">Email Oficial:</li>
              <li>
                <a
                  href="mailto:humoyefectos@gmail.com"
                  className="text-neutral-700 hover:text-rose-600 transition-colors"
                >
                  humoyefectos@gmail.com
                </a>
              </li>
              <li className="mt-3">
                <a
                  href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20vuestros%20efectos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors text-[11px] font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp 600 08 24 62</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Humo Y Efectos. Todos los derechos reservados. Disparo instantáneo de humo aéreo.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-600 cursor-pointer">Aviso Legal</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Política de Privacidad</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Homologación CE Clase T1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
