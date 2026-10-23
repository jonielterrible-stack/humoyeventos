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
  ShieldCheck,
  PartyPopper,
  Zap,
} from 'lucide-react';

import { ServiceTabType } from './ServicesBento';

interface NavbarProps {
  onOpenConfigurator: () => void;
  onSelectServiceTab?: (tab: ServiceTabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
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

  const handleServiceNavClick = (tab: ServiceTabType) => {
    if (onSelectServiceTab) {
      onSelectServiceTab(tab);
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
      title: '2. Cañones de Confeti (Mariposas & Blanco)',
      desc: 'Lluvia mágica de mariposas de seda o nieve pura',
      icon: <PartyPopper className="w-4 h-4 text-fuchsia-500" />,
      badge: 'Vals & Salida',
    },
    {
      id: 'humo-bajo' as ServiceTabType,
      title: '3. Máquinas de Humo Bajo (Hielo Seco)',
      desc: 'Vals sobre las nubes, 100% limpio y sin manchas',
      icon: <CloudRain className="w-4 h-4 text-sky-500" />,
      badge: 'Cero Residuos',
    },
    {
      id: 'chispas-frias' as ServiceTabType,
      title: '4. Fuentes de Chispas Frías (Sparkulars)',
      desc: 'Fuego frío de titanio de 2 a 5m que no quema la piel',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      badge: 'Seguro en Interior',
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
          
          {/* 1. LADO IZQUIERDO: LOGO NÍTIDO Y PROPORCIONADO */}
          <div className="flex items-center shrink-0">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-neutral-300 hover:text-white rounded-lg sm:rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/90 transition-colors lg:hidden mr-1 sm:mr-2 cursor-pointer shrink-0"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            </button>

            <a
              href="/"
              className="flex items-center transition-all duration-300 hover:opacity-95"
              title="Humo Y Efectos - Efectos Especiales para Eventos"
            >
              <img
                src="/assets/logo-humo-y-efectos-eventos.png?v=7"
                alt="HUMO Y EFECTOS"
                className="h-8 sm:h-12 md:h-16 w-auto max-w-[110px] sm:max-w-[180px] md:max-w-[260px] object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.35)] filter brightness-105"
              />
            </a>
          </div>

          {/* 2. CENTRO: BARRA DE NAVEGACIÓN ENCAJADA Y CENTRADA (DESKTOP) */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            
            {/* ICONO Y DROPDOWN DE SERVICIOS (Soluciona el solapamiento) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  servicesDropdownOpen
                    ? 'bg-neutral-800 text-white shadow-inner'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Servicios</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-neutral-500'}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in divide-y divide-neutral-900">
                  <div className="p-2 text-[10px] uppercase font-black tracking-widest text-neutral-400">
                    Catálogo Oficial (1 a 5)
                  </div>
                  <div className="pt-1 space-y-1">
                    {servicesList.map((s) => (
                      <a
                        key={s.id}
                        href="#servicios"
                        onClick={() => handleServiceNavClick(s.id)}
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

            {/* Enlace Simulador */}
            <a
              href="#simulador"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Simulador</span>
            </a>

            {/* Enlace Paleta & Distancias */}
            <a
              href="#servicios"
              onClick={() => handleServiceNavClick('humo-aereo')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all whitespace-nowrap"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Paleta 10 Colores</span>
            </a>

            {/* Enlace Packs */}
            <a
              href="#packs"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Packs</span>
            </a>

            {/* Enlace Cobertura */}
            <a
              href="#ciudades"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>España</span>
            </a>
          </nav>

          {/* 3. LADO DERECHO: WHATSAPP DIRECTO + CONFIGURAR FX */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Botón WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp al 600082462"
              title="Contactar por WhatsApp (+34 600 08 24 62)"
              className="h-8 sm:h-11 px-2 sm:px-4 rounded-lg sm:rounded-xl font-black text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-md shadow-emerald-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1 sm:gap-2 border border-emerald-400/30 whitespace-nowrap"
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

            {/* Botón Configurador FX (Azul y Rosa) */}
            <button
              onClick={onOpenConfigurator}
              className="h-8 sm:h-11 px-2.5 sm:px-4 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-rose-600 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-rose-500 shadow-md shadow-fuchsia-600/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0"
              title="Configurar presupuesto personalizado"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
              <span>Configurar</span>
            </button>
          </div>

        </div>
      </div>

      {/* Línea de acento degradado neón */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-90 shadow-[0_0_12px_rgba(236,72,153,0.5)]" />

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-5 shadow-2xl animate-fade-in">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mb-2 px-1">
              Servicios Oficiales
            </div>
            <nav className="flex flex-col gap-1.5 text-xs sm:text-sm font-bold">
              {servicesList.map((s) => (
                <a
                  key={s.id}
                  href="#servicios"
                  onClick={() => handleServiceNavClick(s.id)}
                  className="flex items-center justify-between py-2 px-3 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {s.icon}
                    <span>{s.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {s.badge}
                  </span>
                </a>
              ))}

              <div className="pt-2 border-t border-neutral-900 space-y-1">
                <a
                  href="#simulador"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-cyan-300 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Simulador de Escenarios</span>
                </a>
                <a
                  href="#packs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Colección de Packs</span>
                </a>
                <a
                  href="#ciudades"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Cobertura en España</span>
                </a>
              </div>
            </nav>
          </div>

          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Directo · 600 08 24 62</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-rose-600 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Abrir Configurador</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
