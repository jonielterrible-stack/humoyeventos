import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento, ServiceTabType } from './components/ServicesBento';
import { SmokeSimulator } from './components/SmokeSimulator';
import { Configurator } from './components/Configurator';
import { PacksCatalog } from './components/PacksCatalog';
import { QualityComparison } from './components/QualityComparison';
import { CityCoverage } from './components/CityCoverage';
import { CoverageMapSection } from './components/CoverageMapSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIChatBot } from './components/AIChatBot';
import { DiscountCouponModal } from './components/DiscountCouponModal';
import { AerialSafetyAndPaletteCard } from './components/AerialSafetyAndPaletteCard';
import { TechnicalSafetyDossier } from './components/TechnicalSafetyDossier';
import { SmokePack } from './data/smokeData';
import { PageView } from './types/navigation';
import {
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  PartyPopper,
  Flame,
  CloudRain,
  Speaker,
  ShoppingBag,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Mail,
  Heart,
  Palette,
  ShieldCheck,
} from 'lucide-react';

const PAGE_META: Record<PageView, { title: string; desc: string; path: string }> = {
  inicio: {
    title: 'Humo Y Efectos | Humo Aéreo y Efectos para Bodas en España',
    desc: 'Humo aéreo, confeti, chispas frías y niebla baja para bodas. Sede en Talavera y servicio en Madrid y toda España.',
    path: '/',
  },
  servicios: {
    title: 'Servicios Oficiales de Efectos Especiales para Bodas | Humo Y Efectos',
    desc: 'Catálogo de 5 efectos para bodas: humo aéreo vertical, confeti nupcial, chispas frías Sparkulars y humo bajo de hielo seco.',
    path: '/servicios',
  },
  packs: {
    title: 'Catálogo de Packs y Precios para Bodas y Eventos | Humo Y Efectos',
    desc: 'Precios y packs oficiales de efectos especiales para bodas: salida de ceremonia, vals sobre las nubes, chispas y detonador TNT.',
    path: '/packs',
  },
  simulador: {
    title: 'Simulador de Cañones de Humo Aéreo en Directo | Humo Y Efectos',
    desc: 'Prueba el disparo instantáneo de 1 a 9 cañones de humo aéreo en directo con la cámara de tu móvil o la foto de vuestra finca.',
    path: '/simulador',
  },
  opiniones: {
    title: 'Opiniones y Reseñas Reales de Bodas 2026 | Humo Y Efectos',
    desc: 'Opiniones 2026 de novios y parejas sobre cañones de humo aéreo y efectos especiales para bodas en Talavera, Madrid y España.',
    path: '/opiniones',
  },
  contacto: {
    title: 'Contacto Oficial y Presupuesto para Bodas | Humo Y Efectos',
    desc: 'Solicita presupuesto para tu boda o evento con Humo Y Efectos. Sede en Talavera con servicio en Madrid, Toledo y toda España.',
    path: '/contacto',
  },
  seguridad: {
    title: 'Dossier Técnico de Seguridad y Normas de Uso | Humo Y Efectos',
    desc: 'Dossier oficial de seguridad para fincas: homologación CE Clase T1 (EN 16263), distancias certificadas y material de uso libre (+18 años) sin licencias ni ADR.',
    path: '/seguridad',
  },
};

function getInitialView(): PageView {
  try {
    // 1. Check pathname (e.g. /servicios, /contacto, /seguridad)
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '');
    if (rawPath === 'servicios') return 'servicios';
    if (rawPath === 'packs') return 'packs';
    if (rawPath === 'simulador') return 'simulador';
    if (rawPath === 'opiniones') return 'opiniones';
    if (rawPath === 'contacto') return 'contacto';
    if (rawPath === 'seguridad' || rawPath === 'dossier' || rawPath === 'normas') return 'seguridad';

    // 2. Check query parameter fallback (e.g. ?p=servicios)
    const urlParams = new URLSearchParams(window.location.search);
    const pParam = urlParams.get('p')?.toLowerCase();
    if (pParam === 'servicios') return 'servicios';
    if (pParam === 'packs') return 'packs';
    if (pParam === 'simulador') return 'simulador';
    if (pParam === 'opiniones') return 'opiniones';
    if (pParam === 'contacto') return 'contacto';
    if (pParam === 'seguridad' || pParam === 'dossier' || pParam === 'normas') return 'seguridad';

    // 3. Check hash fallback (e.g. #servicios)
    const hash = window.location.hash.toLowerCase().replace('#', '').replace(/^\/+/, '');
    if (hash === 'servicios') return 'servicios';
    if (hash === 'packs') return 'packs';
    if (hash === 'simulador') return 'simulador';
    if (hash === 'opiniones') return 'opiniones';
    if (hash === 'contacto') return 'contacto';
    if (hash === 'seguridad' || hash === 'dossier' || hash === 'normas') return 'seguridad';
  } catch (e) {
    // Fallback safe
  }
  return 'inicio';
}

function updateSeoMeta(view: PageView) {
  try {
    const meta = PAGE_META[view] || PAGE_META.inicio;
    document.title = meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', meta.desc);

    const baseUrl =
      window.location.origin &&
      (window.location.origin.includes('humoyefectos.es') || window.location.origin.includes('localhost'))
        ? 'https://humoyefectos.es'
        : window.location.origin;

    const fullUrl = baseUrl + meta.path;
    const can = document.getElementById('canonical-url');
    if (can) can.setAttribute('href', fullUrl);
    const h1 = document.getElementById('hreflang-es');
    if (h1) h1.setAttribute('href', fullUrl);
    const h2 = document.getElementById('hreflang-es-es');
    if (h2) h2.setAttribute('href', fullUrl);
    const h3 = document.getElementById('hreflang-default');
    if (h3) h3.setAttribute('href', fullUrl);
  } catch (e) {
    // Non-critical
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>(getInitialView);
  const [serviceTab, setServiceTab] = useState<ServiceTabType>('todos');
  const configuratorRef = useRef<HTMLDivElement | null>(null);
  const simulatorRef = useRef<HTMLDivElement | null>(null);

  // Sync state and meta on initial mount and browser navigation (Back / Forward)
  useEffect(() => {
    const initial = getInitialView();
    updateSeoMeta(initial);

    const handleLocationChange = () => {
      const view = getInitialView();
      setCurrentView(view);
      updateSeoMeta(view);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    const meta = PAGE_META[view] || PAGE_META.inicio;
    
    // Real HTML5 History API URL path change (e.g. /servicios, /contacto)
    try {
      window.history.pushState({ view }, '', meta.path);
    } catch (e) {
      window.location.hash = '#' + view;
    }

    updateSeoMeta(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToConfigurator = () => {
    if (currentView !== 'inicio') {
      navigateTo('inicio');
      setTimeout(() => {
        configuratorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      configuratorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSimulator = () => {
    if (currentView !== 'inicio') {
      navigateTo('simulador');
    } else {
      simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenServiceTab = (tab: ServiceTabType) => {
    setServiceTab(tab);
    navigateTo('servicios');
  };

  const handleSelectService = (_serviceName: string) => {
    scrollToConfigurator();
  };

  const handleSelectPack = (_pack: SmokePack) => {
    scrollToConfigurator();
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* 1. Top Bar Navigation with Structured Dropdown & Page Switcher */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenConfigurator={scrollToConfigurator}
        onSelectServiceTab={handleOpenServiceTab}
      />

      {/* Main Content Rendered According to Current View */}
      <main className="flex-1">

        {/* ========================================================= */}
        {/* VISTA 1: INICIO (Página Principal)                         */}
        {/* ========================================================= */}
        {currentView === 'inicio' && (
          <div className="animate-fade-in">
            {/* 1.1 Portada con vídeo real, controles de humo aéreo y llamadas a la acción */}
            <Hero
              onScrollToSimulator={scrollToSimulator}
              onOpenConfigurator={scrollToConfigurator}
            />

            {/* 1.2 Humo Aéreo Vertical con su Paleta Oficial de 10 Colores y Distancias de Seguridad */}
            <section id="paleta-humo" className="py-16 md:py-20 bg-neutral-50/70 border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <Palette className="w-3.5 h-3.5 text-rose-600" />
                    <span>Nuestra Especialidad Nº1 en España</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight font-display">
                    Humo Aéreo con Paleta de 10 Colores Oficiales
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
                    Un disparo instantáneo vertical que asciende a 15 metros a gran velocidad, abre en abanico en el punto más alto para la fotografía perfecta y se disipa limpiamente en pocos segundos. Selecciona tus tonos preferidos y consulta las distancias reglamentarias certificadas.
                  </p>
                </div>

                <AerialSafetyAndPaletteCard
                  onOpenConfigurator={scrollToConfigurator}
                  onNavigate={navigateTo}
                />
              </div>
            </section>

            {/* 1.3 Visualizador / Simulador de Escenarios Reales */}
            <section id="simulador" ref={simulatorRef} className="py-20 bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Visualizador de Escenarios Reales</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
                    Imagina y Siente la Magia en Vuestro Espacio
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 mt-2">
                    Experimenta en directo cómo lucirá vuestra combinación de colores: <strong>dispara con la cámara de tu móvil en el sitio</strong> o sube una foto de vuestra finca para ver los cañones integrados en vuestro escenario.
                  </p>
                </div>

                <SmokeSimulator />
              </div>
            </section>

            {/* 1.4 Resumen de Servicios Oficiales con Enlace Interno a la Página de Servicios */}
            <section id="servicios-resumen" className="py-20 bg-neutral-50/70 border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>Catálogo Completo de Efectos</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
                      Nuestros 5 Efectos Especiales para Bodas
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 mt-2">
                      Además del humo aéreo, ofrecemos una gama completa de efectos profesionales homologados para cada momento clave del enlace.
                    </p>
                  </div>

                  <button
                    onClick={() => navigateTo('servicios')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <span>Ver Catálogo Completo de Servicios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 5 Service Quick Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    {
                      id: 'humo-aereo' as ServiceTabType,
                      title: '1. Humo Aéreo',
                      desc: 'Disparo vertical a 15 metros en 10 colores oficiales.',
                      badge: 'Nº1 Especialidad',
                      icon: <Zap className="w-5 h-5 text-rose-500" />,
                      color: 'border-rose-200 hover:border-rose-400',
                    },
                    {
                      id: 'confeti' as ServiceTabType,
                      title: '2. Confeti Nupcial',
                      desc: 'Mariposas de seda blanca y lluvia multicolor.',
                      badge: 'Vals & Fiesta',
                      icon: <PartyPopper className="w-5 h-5 text-fuchsia-500" />,
                      color: 'border-fuchsia-200 hover:border-fuchsia-400',
                    },
                    {
                      id: 'chispas-frias' as ServiceTabType,
                      title: '3. Chispas Frías',
                      desc: 'Fuentes Sparkulars de 2 a 5m que no queman la ropa.',
                      badge: 'Seguro en Interior',
                      icon: <Flame className="w-5 h-5 text-amber-500" />,
                      color: 'border-amber-200 hover:border-amber-400',
                    },
                    {
                      id: 'humo-bajo' as ServiceTabType,
                      title: '4. Niebla Baja',
                      desc: 'Vals sobre las nubes con hielo seco sin residuos.',
                      badge: 'Cero Manchas',
                      icon: <CloudRain className="w-5 h-5 text-sky-500" />,
                      color: 'border-sky-200 hover:border-sky-400',
                    },
                    {
                      id: 'sonido-luces' as ServiceTabType,
                      title: '5. Sonido & DJ',
                      desc: 'Equipos de sonido, microfonía e iluminación.',
                      badge: 'Producción Total',
                      icon: <Speaker className="w-5 h-5 text-indigo-500" />,
                      color: 'border-indigo-200 hover:border-indigo-400',
                    },
                  ].map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleOpenServiceTab(service.id)}
                      className={`bg-white p-5 rounded-2xl border ${service.color} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-xl bg-neutral-50 group-hover:scale-110 transition-transform">
                            {service.icon}
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-bold">
                            {service.badge}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-neutral-900 text-sm font-display mb-1">
                          {service.title}
                        </h3>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-rose-600 mt-4 flex items-center gap-1 group-hover:underline">
                        <span>Ver detalles</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 1.5 Reseñas y Testimonios de Parejas 2026 */}
            <TestimonialsSection />

            {/* 1.6 Sede Central en Talavera de la Reina (Toledo) */}
            <CoverageMapSection />

            {/* 1.7 Configurador Interactivo de Presupuesto con 10% de Descuento */}
            <section id="configurador" ref={configuratorRef} className="py-20 bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-6">
                <Configurator />
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 2: SERVICIOS OFICIALES Y CATÁLOGO                   */}
        {/* ========================================================= */}
        {currentView === 'servicios' && (
          <div className="animate-fade-in">
            {/* Breadcrumb Header */}
            <div className="bg-neutral-900 text-white py-12 px-6 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto">
                <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <button onClick={() => navigateTo('inicio')} className="hover:text-white transition-colors cursor-pointer">
                    Inicio
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-rose-400 font-bold">Servicios Oficiales</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight">
                  Servicios y Efectos Especiales para Bodas
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-3 max-w-3xl leading-relaxed">
                  Alojamientos técnicos, disparos sincronizados y efectos de alta gama para ceremonias, cócteles, vals nupcial y barra libre en Talavera de la Reina, Madrid, Toledo y toda España.
                </p>
              </div>
            </div>

            {/* 5 Official Services Bento with Tabs */}
            <ServicesBento
              onSelectService={handleSelectService}
              activeTab={serviceTab}
              onTabChange={setServiceTab}
              onNavigate={navigateTo}
            />

            {/* Full Catalog of Pack Types */}
            <PacksCatalog onSelectPack={handleSelectPack} />

            {/* Safety & Legal Standards CE */}
            <QualityComparison onNavigate={navigateTo} />

            {/* Comprehensive FAQs */}
            <FaqSection />

            {/* CTA to Request Budget */}
            <div className="bg-neutral-50 py-16 px-6 border-t border-neutral-200">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
                  ¿Tienes dudas sobre qué servicio encaja mejor en tu finca?
                </h3>
                <p className="text-sm text-neutral-600 max-w-xl mx-auto">
                  Consúltanos directamente por WhatsApp o utiliza nuestro formulario para recibir una propuesta en menos de 2 horas.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => navigateTo('contacto')}
                    className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Ir al Formulario de Contacto</span>
                  </button>
                  <a
                    href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20vuestros%20servicios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>WhatsApp 600 08 24 62</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 3: CATÁLOGO DE PACKS                                */}
        {/* ========================================================= */}
        {currentView === 'packs' && (
          <div className="animate-fade-in">
            {/* Breadcrumb Header */}
            <div className="bg-neutral-900 text-white py-12 px-6 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto">
                <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <button onClick={() => navigateTo('inicio')} className="hover:text-white transition-colors cursor-pointer">
                    Inicio
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-amber-400 font-bold">Catálogo de Packs</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight">
                  Catálogo Oficial de Packs para Bodas & Eventos
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-3 max-w-3xl leading-relaxed">
                  Todos nuestros packs incluyen artificios homologados CE Clase T1, bases pesadas antivuelco y asistencia directa con técnicos en finca.
                </p>
              </div>
            </div>

            <PacksCatalog onSelectPack={handleSelectPack} />
            <QualityComparison />
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 4: SIMULADOR DE ESCENARIOS                          */}
        {/* ========================================================= */}
        {currentView === 'simulador' && (
          <div className="animate-fade-in">
            {/* Breadcrumb Header */}
            <div className="bg-neutral-900 text-white py-12 px-6 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto">
                <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <button onClick={() => navigateTo('inicio')} className="hover:text-white transition-colors cursor-pointer">
                    Inicio
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-cyan-400 font-bold">Simulador de Escenarios</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight">
                  Simulador de Efectos en Directo
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-3 max-w-3xl leading-relaxed">
                  Prueba de 1 a 9 cañones con combinaciones cromáticas reales en la foto de tu finca o directamente con la cámara de tu móvil.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
              <SmokeSimulator />
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16">
              <AerialSafetyAndPaletteCard
                onOpenConfigurator={scrollToConfigurator}
                onNavigate={navigateTo}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 5: OPINIONES Y RESEÑAS 2026                         */}
        {/* ========================================================= */}
        {currentView === 'opiniones' && (
          <div className="animate-fade-in">
            {/* Breadcrumb Header */}
            <div className="bg-neutral-900 text-white py-12 px-6 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto">
                <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <button onClick={() => navigateTo('inicio')} className="hover:text-white transition-colors cursor-pointer">
                    Inicio
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-rose-400 font-bold">Opiniones de Parejas 2026</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight">
                  Opiniones Reales de Parejas 2026
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-3 max-w-3xl leading-relaxed">
                  Más de 380 bodas y eventos iluminados con humo aéreo, confeti, fuegos fríos y vals sobre las nubes en toda España.
                </p>
              </div>
            </div>

            <TestimonialsSection />
            <CoverageMapSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 6: CONTACTO Y PRESUPUESTO                           */}
        {/* ========================================================= */}
        {currentView === 'contacto' && (
          <div className="animate-fade-in">
            {/* Breadcrumb Header */}
            <div className="bg-neutral-900 text-white py-12 px-6 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto">
                <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <button onClick={() => navigateTo('inicio')} className="hover:text-white transition-colors cursor-pointer">
                    Inicio
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-emerald-400 font-bold">Contacto & Presupuesto</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight">
                  Contacto Oficial & Solicitud de Presupuesto
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-3 max-w-3xl leading-relaxed">
                  Sede central en <strong>Talavera de la Reina (Toledo)</strong> con servicio técnico presencial en <strong>Madrid, Toledo, Zona Centro y toda España</strong>. Respuesta garantizada en menos de 2 horas.
                </p>
              </div>
            </div>

            {/* Contact Form & Direct Channels */}
            <ContactSection onNavigate={navigateTo} />

            {/* Clean Sede Central in Talavera de la Reina with Google Maps link */}
            <CoverageMapSection />

            {/* Regional Coverage in Spain */}
            <CityCoverage />
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 7: DOSSIER TÉCNICO DE SEGURIDAD & NORMAS DE USO     */}
        {/* ========================================================= */}
        {currentView === 'seguridad' && (
          <div className="animate-fade-in">
            <TechnicalSafetyDossier onNavigate={navigateTo} />
          </div>
        )}

      </main>

      {/* Footer & Floating AI Assistant + WhatsApp + 10% Discount Coupon Modal */}
      <Footer onNavigate={navigateTo} />
      <AIChatBot />
      <DiscountCouponModal />
    </div>
  );
}
