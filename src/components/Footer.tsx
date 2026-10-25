import React from 'react';
import { ShieldCheck, MessageSquare, PhoneCall, ExternalLink, ChevronRight, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageView } from '../types/navigation';

interface FooterProps {
  onNavigate?: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (view: PageView, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      {/* 1. Breadcrumb Semantic Navigation */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/60 py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-[11px] text-neutral-400">
          <span className="text-neutral-500 font-bold uppercase tracking-wider text-[10px]">Estás en:</span>
          <nav aria-label="Migas de pan" className="flex items-center flex-wrap gap-1.5">
            <a href="#inicio" onClick={(e) => handleNav('inicio', e)} className="hover:text-white transition-colors">Inicio</a>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <a href="#servicios" onClick={(e) => handleNav('servicios', e)} className="hover:text-rose-400 transition-colors">Servicios Oficiales</a>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">Catálogo de Packs</a>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <a href="#contacto" onClick={(e) => handleNav('contacto', e)} className="hover:text-emerald-400 transition-colors">Contacto & Presupuesto</a>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <span className="text-neutral-200 font-bold">Sede Talavera · Madrid · España</span>
          </nav>
        </div>
      </div>

      {/* 2. Top Trust & Certification Banner */}
      <div className="border-b border-neutral-900 py-6 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-950/70 border border-rose-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <span className="text-white font-bold text-xs block">
                Humo Y Efectos · Artificios Pirotécnicos Homologados CE Clase T1 (EN 16263)
              </span>
              <p className="text-[11px] text-neutral-400">
                Aprobados para bodas al aire libre e interiores de salones en toda la Unión Europea.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Desplazamiento Técnico Propio</span>
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Seguro de Responsabilidad Civil</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. High Demand Local SEO Coverage Fast Links Bar */}
      <div className="bg-neutral-900 text-white py-4 px-6 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-rose-400">
              Lugares de Mayor Demanda & Cobertura Local:
            </span>
          </div>

          <nav aria-label="Cobertura Local Rápida" className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href="#sede-talavera"
              className="px-3 py-1 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 transition-colors font-bold flex items-center gap-1.5"
            >
              <span>⭐ Talavera de la Reina</span>
              <span className="text-[10px] bg-rose-500 px-1.5 py-0.2 rounded-full text-white">Sede HQ</span>
            </a>
            <a
              href="#ciudades"
              className="px-3 py-1 rounded-xl bg-neutral-800 hover:bg-amber-600 text-neutral-200 hover:text-white border border-neutral-700 transition-colors font-semibold flex items-center gap-1.5"
            >
              <span>🔥 Madrid & Sierra</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-full">Top Fincas</span>
            </a>
            <a
              href="#ciudades"
              className="px-3 py-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 transition-colors font-semibold flex items-center gap-1.5"
            >
              <span>🏰 Toledo & Cigarrales</span>
            </a>
            <a
              href="#ciudades"
              className="px-3 py-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 transition-colors font-semibold flex items-center gap-1.5"
            >
              <span>📍 Zona Centro (Ávila, Segovia, Guadalajara, Cáceres)</span>
            </a>
            <a
              href="#ciudades"
              className="px-3 py-1 rounded-xl bg-neutral-800 hover:bg-emerald-600 text-neutral-200 hover:text-white border border-neutral-700 transition-colors font-semibold flex items-center gap-1.5"
            >
              <span>🇪🇸 Toda España</span>
            </a>
          </nav>
        </div>
      </div>

      {/* 4. Main Multi-Column Internal Links Architecture */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3.5 lg:col-span-1">
            <span className="text-xl font-extrabold text-white tracking-tight font-display block">
              <span className="text-rose-500">HUMO</span> Y EFECTOS
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Empresa Nº 1 en España especializada en disparo sincronizado de humo aéreo vertical, confeti para bodas, máquinas de niebla baja sobre las nubes y fuentes de chispas frías.
            </p>
            <div className="pt-1 text-[11px] text-neutral-500 space-y-1">
              <p className="flex items-center gap-1.5 text-neutral-300 font-bold">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Sede Central: Talavera de la Reina (Toledo)</span>
              </p>
              <p>Rutas técnicas semanales en Madrid, Toledo y Zona Centro.</p>
            </div>
          </div>

          {/* Col 2: Servicios Oficiales */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Servicios Oficiales</span>
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#servicios" onClick={(e) => handleNav('servicios', e)} className="hover:text-rose-400 transition-colors flex items-center gap-1">
                  <span>1. Humo Aéreo Vertical (1-9 cañones)</span>
                </a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => handleNav('servicios', e)} className="hover:text-fuchsia-400 transition-colors">
                  2. Cañones de Confeti (Multicolor & Mariposas)
                </a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => handleNav('servicios', e)} className="hover:text-amber-400 transition-colors">
                  3. Fuentes de Chispas Frías (Sparkulars)
                </a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => handleNav('servicios', e)} className="hover:text-sky-400 transition-colors">
                  4. Máquinas de Humo Bajo (Hielo Seco)
                </a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => handleNav('servicios', e)} className="hover:text-indigo-400 transition-colors">
                  5. Sonido, Iluminación & Discoteca con DJ
                </a>
              </li>
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-rose-400 transition-colors">
                  Revelación de Género con Detonador TNT Retro
                </a>
              </li>
              <li>
                <a href="#simulador" onClick={(e) => handleNav('simulador', e)} className="hover:text-amber-400 transition-colors">
                  Simulador de Efectos en Directo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Packs del Catálogo */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Packs para Bodas</span>
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">
                  Pack Salida de Ceremonia Signature
                </a>
              </li>
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">
                  Pack Confeti Romántico (Mariposas de Seda)
                </a>
              </li>
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">
                  Pack Cañones Fiesta & Barra Libre
                </a>
              </li>
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">
                  Pack Baile Nupcial sobre las Nubes
                </a>
              </li>
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">
                  Pack Fuentes de Chispas Frías Titanio
                </a>
              </li>
              <li>
                <a href="#packs" onClick={(e) => handleNav('packs', e)} className="hover:text-amber-400 transition-colors">
                  Pack Boda Total 360° Multiefecto
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={(e) => handleNav('contacto', e)} className="hover:text-rose-400 font-bold transition-colors">
                  Solicitar Presupuesto Personalizado
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Fincas y Cobertura */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>Cobertura en Fincas</span>
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#ciudad-talavera" className="hover:text-white transition-colors">
                  Fincas en Talavera de la Reina y Comarca
                </a>
              </li>
              <li>
                <a href="#ciudad-madrid" className="hover:text-white transition-colors">
                  Fincas en Madrid y Sierra de Guadarrama
                </a>
              </li>
              <li>
                <a href="#ciudad-toledo" className="hover:text-white transition-colors">
                  Cigarrales y Palacios en Toledo
                </a>
              </li>
              <li>
                <a href="#ciudad-avila" className="hover:text-white transition-colors">
                  Fincas en Ávila y Valle del Tiétar
                </a>
              </li>
              <li>
                <a href="#ciudad-segovia" className="hover:text-white transition-colors">
                  Bodas en Segovia y La Granja
                </a>
              </li>
              <li>
                <a href="#ciudad-guadalajara" className="hover:text-white transition-colors">
                  Guadalajara, Cuenca y Ciudad Real
                </a>
              </li>
              <li>
                <a href="#ciudad-caceres" className="hover:text-white transition-colors">
                  Extremadura: Cáceres, Trujillo y Badajoz
                </a>
              </li>
              <li>
                <a href="#ciudades" className="hover:text-white transition-colors font-bold">
                  Servicio Técnico en Toda España
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Normativa Oficial & Contacto Directo */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Normativa & Contacto</span>
            </h3>
            <div className="space-y-3">
              {/* External Authoritative Links */}
              <div>
                <p className="text-[11px] font-bold text-neutral-300 mb-1.5">Enlaces de Interés & Autoridad:</p>
                <ul className="space-y-1.5 text-[11px]">
                  <li>
                    <a
                      href="https://maps.google.com/?q=Talavera+de+la+Reina,+Toledo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                      title="Ubicación de la sede central en Google Maps"
                    >
                      <span>Sede Talavera (Google Maps)</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.bodas.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                      title="Portal oficial de bodas Bodas.net"
                    >
                      <span>Perfil en Bodas.net (4.9 ★)</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32013L0029"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                      title="Directiva 2013/29/UE sobre artículos pirotécnicos en EUR-Lex"
                    >
                      <span>Directiva 2013/29/UE (UE)</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11933"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                      title="Reglamento de artículos pirotécnicos Real Decreto 989/2015 en el BOE"
                    >
                      <span>Real Decreto 989/2015 (BOE)</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.guardiacivil.es/es/servicios/armasyexplosivos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                      title="Intervención Central de Armas y Explosivos de la Guardia Civil"
                    >
                      <span>Guardia Civil · ICAE T1</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.aemet.es/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                      title="Agencia Estatal de Meteorología para previsión de viento en eventos"
                    >
                      <span>AEMET (Meteorología Eventos)</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </li>
                  <li>
                    <a href="#seguridad" className="text-emerald-400 hover:underline font-semibold block pt-1">
                      Ver dossier de seguridad para fincas →
                    </a>
                  </li>
                </ul>
              </div>

              {/* Direct Channels */}
              <div className="pt-2 border-t border-neutral-800">
                <p className="text-[11px] font-bold text-white mb-1">Atención Inmediata:</p>
                <div className="space-y-1 text-xs">
                  <p>
                    <a href="tel:+34600082462" className="text-neutral-300 hover:text-white font-mono font-bold">
                      +34 600 08 24 62
                    </a>
                  </p>
                  <p>
                    <a href="mailto:humoyefectos@gmail.com" className="text-neutral-400 hover:text-rose-400">
                      humoyefectos@gmail.com
                    </a>
                  </p>
                </div>
                <a
                  href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20vuestros%20efectos%20especiales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp 600 08 24 62</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Copyright & Legal Links */}
        <div className="pt-8 mt-10 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Humo Y Efectos. Especialistas en Cañones de Humo Aéreo y Efectos para Bodas en España.</p>
          <div className="flex items-center gap-4">
            <a href="#seguridad" className="hover:text-neutral-300 transition-colors">
              Homologación CE Clase T1
            </a>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <a href="#faq" className="hover:text-neutral-300 transition-colors">
              Preguntas Frecuentes FAQ
            </a>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <a href="#contacto" className="hover:text-neutral-300 transition-colors">
              Contacto y Reservas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
