import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Menu,
  X,
  PhoneCall,
  Calendar,
  Layers,
  Flame,
  CheckCircle2,
  CloudRain,
  ChevronDown,
  Palette,
  PartyPopper,
  Zap,
  Home,
  ShoppingBag,
  Heart,
  Mail,
  MapPin,
  ExternalLink,
  Instagram,
  Facebook,
} from 'lucide-react';
import { ServiceTabType } from './ServicesBento';
import { PageView } from '../types/navigation';
import { assetUrl } from '../utils/assetUrl';

interface NavbarProps {
  currentView?: PageView;
  onNavigate?: (view: PageView) => void;
  onOpenConfigurator: () => void;
  onSelectServiceTab?: (tab: ServiceTabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'inicio',
  onNavigate,
  onOpenConfigurator,
  onSelectServiceTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const whatsappUrl =
    'https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20vuestros%20efectos%20especiales%20para%20un%20evento';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: PageView) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServiceItemClick = (tab: ServiceTabType) => {
    if (onSelectServiceTab) {
      onSelectServiceTab(tab);
    }
    if (onNavigate) {
      onNavigate('servicios');
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const servicesList = [
    {
      id: 'humo-aereo' as ServiceTabType,
      title: '1. Humo Aéreo Vertical (1-9 cañones)',
      desc: 'Disparo instantáneo a 15m con apertura en abanico',
      icon: <Zap className="w-4 h-4 text-rose-500" />,
      badge: 'Nº1 Especialidad',
    },
    {
      id: 'confeti' as ServiceTabType,
      title: '2. Cañones de Confeti (Multicolor & Mariposas)',
      desc: 'Mariposas de seda para el vals y fiesta multicolor',
      icon: <PartyPopper className="w-4 h-4 text-fuchsia-500" />,
      badge: 'Vals & Fiesta',
    },
    {
      id: 'chispas-frias' as ServiceTabType,
      title: '3. Fuentes de Chispas Frías (Sparkulars)',
      desc: 'Fuego frío de titanio de 2 a 5m que no quema la piel',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      badge: 'Seguro en Interior',
    },
    {
      id: 'humo-bajo' as ServiceTabType,
      title: '4. Máquinas de Humo Bajo (Hielo Seco)',
      desc: 'Vals sobre las nubes, 100% limpio y sin manchas',
      icon: <CloudRain className="w-4 h-4 text-sky-500" />,
      badge: 'Cero Residuos',
    },
    {
      id: 'sonido-luces' as ServiceTabType,
      title: '5. Sonido, Iluminación & Discoteca con DJ',
      desc: 'Producción técnica completa para ceremonia y fiesta',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      badge: 'Producción Total',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/98 backdrop-blur-md border-b border-neutral-900 text-white shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6">
        {/* Main Balanced Navbar Flex: Logo Left, Menu Center, Actions Right */}
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-22 w-full gap-1.5 sm:gap-4">
          
          {/* 1. LADO IZQUIERDO: TOGGLE MÓVIL + LOGO NÍTIDO */}
          <div className="flex items-center shrink-0">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-neutral-300 hover:text-white rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/90 transition-colors lg:hidden mr-2 cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              title={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
            </button>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className="flex items-center transition-all duration-300 hover:opacity-95"
              title="Humo Y Efectos - Ir a la Página Principal"
            >
              <img
                src={assetUrl('/assets/logo-humo-y-efectos-eventos.png?v=7')}
                alt="HUMO Y EFECTOS - Especialistas en Humo Aéreo y Efectos Especiales para Bodas"
                className="h-8 sm:h-12 md:h-16 w-auto max-w-[110px] sm:max-w-[180px] md:max-w-[260px] object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.35)] filter brightness-105"
              />
            </a>
          </div>

          {/* 2. CENTRO: BARRA DE NAVEGACIÓN DE ESCRITORIO (DESKTOP CON RUTAS REALES) */}
          <nav aria-label="Navegación Principal" className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {/* Enlace Inicio */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'inicio'
                  ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-rose-400" />
              <span>Inicio</span>
            </a>

            {/* Dropdown Servicios Oficiales */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <a
                  href="/servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('servicios');
                  }}
                  className={`flex items-center gap-1.5 pl-3 pr-1 py-2 rounded-l-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    currentView === 'servicios'
                      ? 'bg-neutral-800 text-cyan-300 shadow-inner'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Servicios</span>
                </a>
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`px-1.5 py-2 rounded-r-xl text-xs transition-all cursor-pointer ${
                    servicesDropdownOpen
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                  aria-label="Desplegar catálogo de servicios"
                  title="Desplegar los 5 servicios oficiales"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
              </div>

              {/* Dropdown Menu Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in divide-y divide-neutral-900">
                  <div className="p-2 flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-neutral-400">
                    <span>Catálogo Oficial (1 a 5)</span>
                    <a
                      href="/servicios"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('servicios');
                      }}
                      className="text-cyan-400 hover:underline"
                    >
                      Ver todos →
                    </a>
                  </div>
                  <div className="pt-1 space-y-1">
                    {servicesList.map((s) => (
                      <a
                        key={s.id}
                        href="/servicios"
                        onClick={(e) => {
                          e.preventDefault();
                          handleServiceItemClick(s.id);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900 transition-colors group cursor-pointer text-left"
                      >
                        <div className="mt-0.5 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700">
                          {s.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {s.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                            {s.desc}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enlace Packs */}
            <a
              href="/packs"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('packs');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'packs'
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Packs</span>
            </a>

            {/* Enlace Simulador */}
            <a
              href="/simulador"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('simulador');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'simulador'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulador</span>
            </a>

            {/* Enlace Opiniones */}
            <a
              href="/opiniones"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('opiniones');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'opiniones'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Opiniones 2026</span>
            </a>

            {/* Enlace Contacto */}
            <a
              href="/contacto"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contacto');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'contacto'
                  ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contacto</span>
            </a>
          </nav>

          {/* 3. LADO DERECHO: REDES SOCIALES + WHATSAPP DIRECTO + CONFIGURAR FX */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Social Links (Instagram & Facebook for SEO and visitors) */}
            <div className="hidden xl:flex items-center gap-1.5">
              <a
                href="https://www.instagram.com/humoyefectos/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-pink-950/60 border border-neutral-800 hover:border-pink-500/50 flex items-center justify-center text-neutral-300 hover:text-pink-400 transition-all group"
                title="Perfil Oficial de Instagram @humoyefectos"
                aria-label="Instagram Oficial Humo Y Efectos"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/humoyefectos/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-blue-950/60 border border-neutral-800 hover:border-blue-500/50 flex items-center justify-center text-neutral-300 hover:text-blue-400 transition-all group"
                title="Página Oficial de Facebook @humoyefectos"
                aria-label="Facebook Oficial Humo Y Efectos"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Botón WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp al 600082462"
              title="Contactar por WhatsApp (+34 600 08 24 62)"
              className="h-8 sm:h-11 px-2.5 sm:px-4 rounded-lg sm:rounded-xl font-black text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-md shadow-emerald-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 border border-emerald-400/30 whitespace-nowrap"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-white shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">WhatsApp</span>
                <span className="hidden sm:inline text-[10px] font-medium text-emerald-100/90 tracking-normal tabular-nums">600 08 24 62</span>
              </div>
            </a>

            {/* Botón Configurador FX */}
            <a
              href="#configurador"
              onClick={(e) => {
                e.preventDefault();
                onOpenConfigurator();
              }}
              className="h-8 sm:h-11 px-2.5 sm:px-4 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-rose-600 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-rose-500 shadow-md shadow-fuchsia-600/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0"
              title="Configurar presupuesto personalizado online"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
              <span>Configurar</span>
            </a>
          </div>

        </div>
      </div>

      {/* Línea de acento degradado neón */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-90 shadow-[0_0_12px_rgba(236,72,153,0.5)]" />

      {/* MENÚ MÓVIL DESPLEGABLE ESTRUCTURADO Y MEJORADO (Screenshot Fix) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-5 py-6 space-y-6 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          
          {/* SECCIÓN 1: APARTADOS PRINCIPALES DE LA WEB */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400 px-1 flex items-center justify-between">
              <span>Secciones Principales</span>
              <span className="text-rose-400 font-bold">Navegación</span>
            </div>

            <nav className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm font-bold">
              {/* Inicio */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('inicio');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'inicio'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-rose-400" />
                  <span>Inicio (Web Principal)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-neutral-300">
                  Portada & Humo
                </span>
              </a>

              {/* Servicios */}
              <a
                href="/servicios"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('servicios');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'servicios'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Servicios Oficiales</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-cyan-300">
                  5 Efectos
                </span>
              </a>

              {/* Catálogo de Packs */}
              <a
                href="/packs"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('packs');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'packs'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Catálogo de Packs</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-amber-300">
                  Bodas & TNT
                </span>
              </a>

              {/* Simulador de Escenarios */}
              <a
                href="/simulador"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('simulador');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'simulador'
                    ? 'bg-fuchsia-600 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                  <span>Simulador de Escenarios</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-fuchsia-300">
                  En Directo
                </span>
              </a>

              {/* Opiniones 2026 */}
              <a
                href="/opiniones"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('opiniones');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'opiniones'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Opiniones de Novios 2026</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-rose-300">
                  4.9 ★
                </span>
              </a>

              {/* Contacto & Presupuesto */}
              <a
                href="/contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contacto');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'contacto'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contacto & Presupuesto</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-emerald-300">
                  Formulario
                </span>
              </a>
            </nav>
          </div>

          {/* SECCIÓN 2: ACCESO RÁPIDO A LOS 5 SERVICIOS INDIVIDUALES */}
          <div className="space-y-1.5 pt-4 border-t border-neutral-900">
            <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400 px-1 mb-1">
              Catálogo de Servicios Individuales
            </div>
            <nav className="flex flex-col gap-1 text-xs">
              {servicesList.map((s) => (
                <a
                  key={s.id}
                  href="/servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceItemClick(s.id);
                  }}
                  className="flex items-center justify-between py-2 px-3 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    {s.icon}
                    <span className="truncate">{s.title}</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 shrink-0">
                    {s.badge}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* SECCIÓN 3: SEDE CENTRAL TALAVERA INFO BAR */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs space-y-1.5">
            <p className="font-bold text-neutral-200 flex items-center gap-1.5 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Sede Central: Talavera de la Reina (Toledo)</span>
            </p>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Desplazamiento técnico directo en Madrid, Toledo, Zona Centro y toda España.
            </p>
          </div>

          {/* SECCIÓN 4: REDES SOCIALES OFICIALES (INSTAGRAM & FACEBOOK) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900 to-blue-950/40 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Síguenos en Redes</span>
              <span className="text-[10px] text-neutral-400">Vídeos y fotos semanales</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://www.instagram.com/humoyefectos/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-pink-950/60 hover:bg-pink-900/70 border border-pink-500/40 text-pink-200 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5"
                title="Instagram Oficial @humoyefectos"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/humoyefectos/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/70 border border-blue-500/40 text-blue-200 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5"
                title="Facebook Oficial @humoyefectos"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* SECCIÓN 5: ACCIONES PRINCIPALES (WHATSAPP + CONFIGURADOR) */}
          <div className="pt-2 border-t border-neutral-900 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 text-center text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 fill-white" />
              <span>WhatsApp Directo · 600 08 24 62</span>
            </a>
            <a
              href="#configurador"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-rose-600 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Abrir Configurador de Presupuesto</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
