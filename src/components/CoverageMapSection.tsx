import React from 'react';
import {
  MapPin,
  ShieldCheck,
  Truck,
  PhoneCall,
  Clock,
  Building2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CoverageMapSection: React.FC = () => {
  return (
    <section
      id="sede-talavera"
      aria-label="Sede Central Talavera de la Reina y Cobertura"
      className="py-16 md:py-24 bg-white border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header: Sede Central Talavera */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Sede Central & Cobertura Oficial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight font-display">
            Sede Central en <span className="text-rose-600">Talavera de la Reina</span> (Toledo)
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            Nuestra base operativa central, almacén de material pirotécnico y taller oficial están ubicados en <strong>Talavera de la Reina</strong>. Desde aquí coordinamos nuestros furgones técnicos propios con rutas diarias y semanales hacia <strong>Madrid, Toledo, Zona Centro y cualquier punto de España</strong>.
          </p>
        </div>

        {/* 4 Clean Strategic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1: Talavera HQ */}
          <div className="bg-gradient-to-b from-rose-50/60 to-white border-2 border-rose-300 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  ⭐ Base Central
                </span>
                <span className="text-xs font-bold text-rose-700 font-mono">0 km</span>
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900 font-display mb-2">
                Talavera de la Reina
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Sede física y taller de montaje. Máxima disponibilidad de fechas, cero recargo de kilometraje en la comarca y atención presencial directa.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Stock permanente 10 colores Sbruffo 40</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Disparadores TNT Retro disponibles</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cazalegas, Pepino, La Jara y La Vera</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-rose-200/80">
              <a
                href="https://maps.google.com/?q=Talavera+de+la+Reina,+Toledo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-rose-700 hover:text-rose-800 inline-flex items-center gap-1.5 group"
                title="Ver ubicación de Talavera de la Reina en Google Maps"
              >
                <span>Ver en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 2: Madrid */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white">
                  🔥 Alta Demanda
                </span>
                <span className="text-xs font-bold text-neutral-500 font-mono">50 - 70 min</span>
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900 font-display mb-2">
                Madrid & Sierra
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Furgón técnico semanal en fincas de la Comunidad de Madrid. Protocolos de seguridad certificados aptos para zonas de protección forestal.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sierra Guadarrama y El Escorial</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pozuelo, Las Rozas, Boadilla</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Niebla baja de hielo seco para salones</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-500">
                120+ fincas madrileñas cubiertas
              </span>
            </div>
          </div>

          {/* Card 3: Toledo */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-600 text-white">
                  🏰 Cigarrales
                </span>
                <span className="text-xs font-bold text-neutral-500 font-mono">40 min</span>
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900 font-display mb-2">
                Toledo & Cigarrales
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Especialistas en cigarrales históricos con vistas panorámicas sobre el Tajo, bodegas de Méntrida y cortijos toledanos.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Control de viento para apertura en cúpula</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Chispas frías para patios y salones</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Torrijos, Fuensalida, Illescas, Mora</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-500">
                Desplazamiento exprés directo
              </span>
            </div>
          </div>

          {/* Card 4: Zona Centro & España */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-600 text-white">
                  🇪🇸 Toda España
                </span>
                <span className="text-xs font-bold text-neutral-500 font-mono">Península</span>
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900 font-display mb-2">
                Zona Centro & Nacional
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Cobertura directa en Ávila, Segovia, Guadalajara, Cáceres, Ciudad Real y bodas de gran formato en toda la Península Ibérica.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valle del Tiétar, Gredos y La Granja</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Levante, Cataluña, Andalucía y Norte</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Técnico titulado en tu finca</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-500">
                Seguro de Responsabilidad Civil T1
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Location Strip */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <Building2 className="w-4 h-4 text-rose-600" />
              <span>Atención Directa desde Nuestra Sede:</span>
            </p>
            <p className="text-sm text-neutral-600">
              ¿Quieres comprobar disponibilidad para tu fecha o consultar desplazamientos?
            </p>
            <p className="text-xs text-neutral-500">
              Sede: Talavera de la Reina (Toledo) · Teléfono & WhatsApp: <strong>+34 600 08 24 62</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://maps.google.com/?q=Talavera+de+la+Reina,+Toledo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-bold transition-all shadow-xs"
              title="Abrir ubicación de la sede en Google Maps"
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20consultar%20disponibilidad%20desde%20vuestra%20sede%20en%20Talavera%20de%20la%20Reina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Directo 600 08 24 62</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
