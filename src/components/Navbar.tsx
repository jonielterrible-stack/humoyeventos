import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Menu,
  X,
  PhoneCall,
  Layers,
  Flame,
  CloudRain,
  ChevronDown,
  PartyPopper,
  Zap,
  Home,
  ShoppingBag,
  Heart,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ShieldCheck,
  Search,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { ServiceTabType } from './ServicesBento';
import { PageView } from '../types/navigation';
import { SMOKE_PACKS } from '../data/smokeData';
import { assetUrl } from '../utils/assetUrl';

interface NavbarProps {
  currentView?: PageView;
  onNavigate?: (view: PageView) => void;
  onOpenConfigurator: () => void;
  onSelectServiceTab?: (tab: ServiceTabType) => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Servicio' | 'Pack' | 'Seguridad' | 'Sección';
  keywords: string;
  badge?: string;
  targetView: PageView;
  serviceTab?: ServiceTabType;
  scrollTargetId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'inicio',
  onNavigate,
  onOpenConfigurator,
  onSelectServiceTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const whatsappUrl =
    'https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20informaci%C3%B3n%20sobre%20vuestros%20efectos%20especiales%20para%20un%20evento';

  // Close dropdowns on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setServicesDropdownOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (view: PageView) => {
    if (onNavigate) {
      onNavigate(view);
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const handleServiceItemClick = (tab: ServiceTabType, scrollId?: string) => {
    if (onSelectServiceTab) {
      onSelectServiceTab(tab);
    }
    if (onNavigate) {
      onNavigate('servicios');
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);

    if (scrollId) {
      setTimeout(() => {
        const el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 220);
    }
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
    {
      id: 'fiesta-espuma' as ServiceTabType,
      title: '6. Fiesta de la Espuma (Blanca y de Colores)',
      desc: 'Espuma blanca clásica para eventos y de colores para revelación',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      badge: 'Todos los Eventos',
    },
  ];

  // Comprehensive Real-Time Search Index (Services, Packs, Safety Information & Tools)
  const searchIndex = useMemo<SearchResultItem[]>(() => {
    const baseItems: SearchResultItem[] = [
      // Servicios Oficiales
      {
        id: 'srv-humo-aereo',
        title: '1. Cañones de Humo Aéreo Vertical (1 a 9 Cañones)',
        subtitle: 'Disparo instantáneo a 15m en 10 colores oficiales CE Clase T1',
        category: 'Servicio',
        keywords: 'humo aereo vertical canones colores boda salida ceremonia sbruffo smoke 40 15 metros',
        badge: 'Nº1 Especialidad',
        targetView: 'servicios',
        serviceTab: 'humo-aereo',
        scrollTargetId: 'humo-aereo',
      },
      {
        id: 'srv-tnt',
        title: 'Disparador TNT Retro para Revelación de Género',
        subtitle: 'Caja detonadora TNT con palanca, humo aéreo y confeti a 15 metros',
        category: 'Servicio',
        keywords: 'detonador disparador tnt retro revelacion genero bebe nino nina rosa azul palanca sorpresa',
        badge: 'Revelación Género',
        targetView: 'servicios',
        serviceTab: 'humo-aereo',
        scrollTargetId: 'humo-aereo',
      },
      {
        id: 'srv-bengalas',
        title: 'Bengalas de Humo de Mano (Ignición por Anilla)',
        subtitle: 'Activación sin mechero Wire-Pull para reportajes fotográficos y preboda',
        category: 'Servicio',
        keywords: 'bengalas humo mano botes anilla fotos reportaje fotografico preboda photocall',
        badge: 'Fotografía',
        targetView: 'servicios',
        serviceTab: 'humo-aereo',
        scrollTargetId: 'humo-aereo',
      },
      {
        id: 'srv-confeti',
        title: '2. Cañones de Confeti (Multicolor y Mariposas de Seda)',
        subtitle: 'Lluvia de mariposas blancas para el vals, efecto nieve y fiesta multicolor',
        category: 'Servicio',
        keywords: 'confeti mariposas seda blanco nieve multicolor metalizado oro plata vals fiesta biodegradable',
        badge: 'Vals & Fiesta',
        targetView: 'servicios',
        serviceTab: 'confeti',
        scrollTargetId: 'confeti',
      },
      {
        id: 'srv-chispas',
        title: '3. Fuentes de Chispas Frías (Máquinas Sparkulars)',
        subtitle: 'Fuego frío de titanio de 2 a 5 metros que no quema ni produce humo',
        category: 'Servicio',
        keywords: 'chispas frias sparkulars fuego frio interior baile tarta titanio no quema sin polvora',
        badge: 'Seguro Interior',
        targetView: 'servicios',
        serviceTab: 'chispas-frias',
        scrollTargetId: 'chispas-frias',
      },
      {
        id: 'srv-humo-bajo',
        title: '4. Máquinas de Humo Bajo / Niebla Baja (Vals sobre las Nubes)',
        subtitle: 'Hielo seco y agua caliente: vapor limpio a ras de suelo que no mancha',
        category: 'Servicio',
        keywords: 'humo bajo niebla baja hielo seco vals sobre las nubes baile nupcial vapor limpio',
        badge: 'Baile Nupcial',
        targetView: 'servicios',
        serviceTab: 'humo-bajo',
        scrollTargetId: 'humo-bajo',
      },
      {
        id: 'srv-sonido',
        title: '5. Alquiler de Sonido Profesional, Iluminación y DJ',
        subtitle: 'Equipos PA, microfonía inalámbrica, luces robotizadas y discoteca móvil',
        category: 'Servicio',
        keywords: 'sonido iluminacion luces dj discoteca movil altavoces microfonos barra libre',
        badge: 'Producción',
        targetView: 'servicios',
        serviceTab: 'sonido-luces',
        scrollTargetId: 'sonido-luces',
      },
      {
        id: 'srv-espuma',
        title: '6. Fiesta de la Espuma (Espuma Blanca Clásica y Espuma de Colores)',
        subtitle: '1º Espuma blanca normal para cumpleaños, colegios y fiestas · 2º Espuma de colores para revelación de género y bodas',
        category: 'Servicio',
        keywords: 'fiesta espuma blanca normal clasica toda la vida espuma colores revelacion genero cumpleanos colegios comuniones bautizos fiestas privadas bodas eventos',
        badge: '¡Nuevo! Blanca y Colores',
        targetView: 'servicios',
        serviceTab: 'fiesta-espuma',
        scrollTargetId: 'fiesta-espuma',
      },

      // Información de Seguridad y Normativa Técnica
      {
        id: 'seg-dossier',
        title: 'Dossier Técnico de Seguridad y Homologación CE Clase T1',
        subtitle: 'Certificado CE 0163-T1-6069 (EN 16263), fichas técnicas y normas para fincas',
        category: 'Seguridad',
        keywords: 'seguridad dossier tecnico homologacion ce clase t1 0163 normativa fincas wedding planner',
        badge: 'CE Clase T1',
        targetView: 'seguridad',
      },
      {
        id: 'seg-distancias',
        title: 'Distancias de Seguridad Reglamentarias y Uso Libre (+18 años)',
        subtitle: '14,5m vertical, 3m radial, 19m público · Uso libre mayores de 18 años sin licencias ni ADR',
        category: 'Seguridad',
        keywords: 'distancias seguridad 15m 14,5m 3m 19m uso libre mayores 18 anos sin licencia sin adr normas uso',
        badge: 'Normas de Uso',
        targetView: 'seguridad',
      },
      {
        id: 'seg-vestidos-espuma',
        title: 'Seguridad en Vestidos, Salones e Inocuidad de Espuma y Fuego Frío',
        subtitle: 'Humo sin manchas, chispas frías que no queman y espuma pH neutro hipoalergénica',
        category: 'Seguridad',
        keywords: 'mancha vestidos novia trajes fuego frio quema alarmas humo espuma ph neutro ojos biodegradable',
        badge: 'Garantía Total',
        targetView: 'seguridad',
      },

      // Secciones y Herramientas Interactivas
      {
        id: 'sec-simulador',
        title: 'Simulador de Cañones de Humo Aéreo en Directo',
        subtitle: 'Prueba combinaciones de 1 a 9 cañones con la cámara o foto de tu finca',
        category: 'Sección',
        keywords: 'simulador visualizador camara probar colores directo foto finca',
        badge: 'Interactivo',
        targetView: 'simulador',
      },
      {
        id: 'sec-opiniones',
        title: 'Opiniones Reales de Parejas y Apartado para Dejar tu Reseña',
        subtitle: 'Lee las valoraciones verificadas o publica la reseña de tu evento',
        category: 'Sección',
        keywords: 'opiniones resenas valoraciones clientes parejas jonathan maria jose dejar opinion',
        badge: '4.9 / 5.0 ★',
        targetView: 'opiniones',
      },
      {
        id: 'sec-contacto',
        title: 'Contacto Oficial, Cobertura y Presupuesto a Medida',
        subtitle: 'Sede en Talavera de la Reina con servicio en Madrid, Toledo y toda España',
        category: 'Sección',
        keywords: 'contacto presupuesto precio whatsapp telefono talavera madrid toledo espana',
        badge: 'Respuesta < 2h',
        targetView: 'contacto',
      },
    ];

    const packItems: SearchResultItem[] = SMOKE_PACKS.map((pack) => ({
      id: `pack-${pack.id}`,
      title: pack.name,
      subtitle: pack.tagline,
      category: 'Pack',
      keywords: `${pack.name} ${pack.tagline} ${pack.description} ${pack.idealMoment} ${pack.includes.join(' ')} ${pack.colors.join(' ')}`,
      badge: pack.badge || 'Pack Oficial',
      targetView: 'packs',
      scrollTargetId: pack.id,
    }));

    return [...baseItems, ...packItems];
  }, []);

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // Show top featured shortcuts when opened with empty query
      return searchIndex.slice(0, 7);
    }
    const terms = q
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    return searchIndex.filter((item) => {
      const haystack = `${item.title} ${item.subtitle} ${item.keywords} ${item.category}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return terms.every((term) => haystack.includes(term));
    });
  }, [searchQuery, searchIndex]);

  const handleSelectSearchResult = (item: SearchResultItem) => {
    setSearchOpen(false);
    setMobileMenuOpen(false);

    if (item.targetView === 'servicios' && item.serviceTab) {
      handleServiceItemClick(item.serviceTab, item.scrollTargetId);
      return;
    }

    if (onNavigate) {
      onNavigate(item.targetView);
    }

    if (item.scrollTargetId) {
      setTimeout(() => {
        const el = document.getElementById(item.scrollTargetId!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 220);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/98 backdrop-blur-md border-b border-neutral-900 text-white shadow-2xl transition-all">
      {/* BARRA DE NAVEGACIÓN PRINCIPAL ÚNICA */}
      <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-6" ref={searchContainerRef}>
        <div className="relative flex items-center justify-between h-15 sm:h-18 md:h-20 w-full gap-1 sm:gap-2">
          {/* 1. LADO IZQUIERDO: TOGGLE MÓVIL + LOGO NÍTIDO */}
          <div className="flex items-center shrink-0 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-neutral-300 hover:text-white rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/90 transition-colors lg:hidden mr-1.5 sm:mr-2 cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              title={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            </button>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className="flex items-center transition-all duration-300 hover:opacity-95 shrink-0"
              title="Humo Y Efectos - Ir a la Página Principal"
            >
              <img
                src={assetUrl('/assets/logo-humo-y-efectos-eventos.png?v=7')}
                alt="HUMO Y EFECTOS - Efectos de Boda Personalizados, Bengalas de Humo de Mano y Humo Aéreo"
                className="h-6 sm:h-10 md:h-12 xl:h-13 w-auto max-w-[84px] sm:max-w-[145px] md:max-w-[170px] xl:max-w-[200px] object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.35)] filter brightness-105"
              />
            </a>
          </div>

          {/* 2. CENTRO: BARRA DE NAVEGACIÓN DE ESCRITORIO */}
          <nav aria-label="Navegación Principal" className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio');
              }}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'inicio'
                  ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-rose-400 shrink-0" />
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
                  className={`flex items-center gap-1 pl-2 xl:pl-2.5 pr-1 py-1.5 rounded-l-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    currentView === 'servicios'
                      ? 'bg-neutral-800 text-cyan-300 shadow-inner'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Servicios</span>
                </a>
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`px-1 py-1.5 rounded-r-xl text-xs transition-all cursor-pointer ${
                    servicesDropdownOpen
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                  aria-label="Desplegar catálogo de servicios"
                  title="Desplegar los 6 servicios oficiales"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
              </div>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-84 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in divide-y divide-neutral-900">
                  <div className="p-2 flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-neutral-400">
                    <span>Catálogo Oficial (1 a 6)</span>
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
                          handleServiceItemClick(s.id, s.id);
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

                  <div className="p-2 pt-2.5 border-t border-neutral-900 bg-neutral-900/40 rounded-b-xl flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                      <span>Fincas & Normas:</span>
                    </div>
                    <a
                      href="/seguridad"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('seguridad');
                      }}
                      className="font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                    >
                      <span>Dossier Técnico CE T1 →</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/packs"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('packs');
              }}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'packs'
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Packs</span>
            </a>

            <a
              href="/simulador"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('simulador');
              }}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'simulador'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Simulador</span>
            </a>

            <a
              href="/opiniones"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('opiniones');
              }}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'opiniones'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Opiniones</span>
            </a>

            <a
              href="/seguridad"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('seguridad');
              }}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'seguridad'
                  ? 'bg-rose-600/30 text-rose-200 border border-rose-500/50'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
              title="Dossier Técnico Oficial de Seguridad y Homologación CE Clase T1 para Fincas"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Seguridad</span>
            </a>

            <a
              href="/contacto"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contacto');
              }}
              className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                currentView === 'contacto'
                  ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Contacto</span>
            </a>
          </nav>

          {/* 3. LADO DERECHO: ICONO DE BÚSQUEDA + WHATSAPP + BOTÓN CONFIGURAR */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Botón de Búsqueda en la Barra de Navegación (la barra solo se abre al hacer clic) */}
            <button
              type="button"
              onClick={() => {
                const next = !searchOpen;
                setSearchOpen(next);
                if (next) {
                  setTimeout(() => searchInputRef.current?.focus(), 50);
                }
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                searchOpen
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 hover:border-cyan-500/50 text-cyan-400'
              }`}
              aria-label="Abrir barra de búsqueda"
              title="Buscar servicios, packs o información de seguridad"
            >
              {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>

            {/* Social Links (Instagram & Facebook) */}
            <div className="hidden 2xl:flex items-center gap-1.5">
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
              className="h-8 sm:h-9 md:h-10 px-2 sm:px-3 rounded-lg sm:rounded-xl font-black text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-md shadow-emerald-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 border border-emerald-400/30 whitespace-nowrap shrink-0"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">WhatsApp</span>
                <span className="hidden md:inline text-[10px] font-medium text-emerald-100/90 tracking-normal tabular-nums">600 08 24 62</span>
              </div>
            </a>

            {/* Botón Configurador FX */}
            <a
              href="#configurador"
              onClick={(e) => {
                e.preventDefault();
                onOpenConfigurator();
              }}
              className="h-8 sm:h-9 md:h-10 px-2 sm:px-3.5 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-rose-600 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-rose-500 shadow-md shadow-fuchsia-600/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
              title="Configurar presupuesto personalizado online"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
              <span>Configurar</span>
            </a>
          </div>

          {/* BARRA DE BÚSQUEDA EN LA PROPIA BARRA DE NAVEGACIÓN (SOLO SE MUESTRA AL HACER CLIC) */}
          {searchOpen && (
            <div className="absolute inset-x-0 top-0 h-full bg-neutral-950/98 backdrop-blur-md z-50 flex items-center px-1 sm:px-2 animate-fade-in">
              <div className="relative w-full">
                <div className="flex items-center bg-neutral-900 border border-cyan-500/60 focus-within:border-cyan-400 rounded-xl px-3 h-10 sm:h-11 w-full shadow-lg">
                  <Search className="w-4 h-4 text-cyan-400 shrink-0 mr-2.5" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar servicios, packs, fiesta de la espuma, bengalas de mano, TNT o seguridad..."
                    aria-label="Buscar servicios, packs o información de seguridad en tiempo real"
                    className="bg-transparent text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none w-full"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-neutral-400 hover:text-white px-1.5 cursor-pointer"
                      aria-label="Limpiar texto"
                    >
                      Limpiar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-1.5 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Cerrar barra de búsqueda"
                    title="Cerrar barra de búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Resultados en Tiempo Real debajo de la barra al estar abierta */}
                <div className="absolute left-0 right-0 top-full mt-2 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-3 py-2 bg-neutral-900/60 border-b border-neutral-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
                      Sugerencias:
                    </span>
                    {['Fiesta Espuma', 'Pack Boda 360°', 'Bengalas de Mano', 'Humo Aéreo', 'Detonador TNT', 'Seguridad CE'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setSearchQuery(chip)}
                        className="px-2 py-0.5 rounded-full bg-neutral-800 hover:bg-cyan-600/30 text-[10px] font-semibold text-neutral-200 hover:text-cyan-300 border border-neutral-700 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-900/80 p-1.5">
                    {filteredResults.length === 0 ? (
                      <div className="py-8 px-4 text-center space-y-2">
                        <p className="text-xs font-bold text-neutral-300">
                          No hemos encontrado resultados para &ldquo;{searchQuery}&rdquo;
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          Prueba buscando &ldquo;humo aéreo&rdquo;, &ldquo;espuma&rdquo;, &ldquo;bengalas&rdquo;, &ldquo;TNT&rdquo; o &ldquo;seguridad&rdquo;.
                        </p>
                      </div>
                    ) : (
                      filteredResults.map((item) => {
                        const badgeColors: Record<SearchResultItem['category'], string> = {
                          Servicio: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
                          Pack: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                          Seguridad: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
                          Sección: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                        };
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectSearchResult(item)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-900 transition-colors flex items-start justify-between gap-2.5 group cursor-pointer"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span
                                  className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${badgeColors[item.category]}`}
                                >
                                  {item.category}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-mono text-neutral-400 truncate">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                                {item.subtitle}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 shrink-0 mt-2 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Línea de acento degradado neón */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-90 shadow-[0_0_12px_rgba(236,72,153,0.5)]" />

      {/* MENÚ MÓVIL DESPLEGABLE ESTRUCTURADO */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-5 py-6 space-y-6 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          {/* SECCIÓN 1: APARTADOS PRINCIPALES DE LA WEB */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400 px-1 flex items-center justify-between">
              <span>Secciones Principales</span>
              <span className="text-rose-400 font-bold">Navegación</span>
            </div>

            <nav className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm font-bold">
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
                  6 Servicios
                </span>
              </a>

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
                  Bodas, TNT & Espuma
                </span>
              </a>

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
                  <span>Opiniones de Clientes</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-rose-300">
                  4.9 ★
                </span>
              </a>

              <a
                href="/seguridad"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('seguridad');
                }}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-2xl transition-all ${
                  currentView === 'seguridad'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 bg-neutral-900/60 border border-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span>Dossier Técnico & Seguridad</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-rose-300">
                  CE Clase T1
                </span>
              </a>

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

          {/* SECCIÓN 2: ACCESO RÁPIDO A LOS 6 SERVICIOS INDIVIDUALES */}
          <div className="space-y-1.5 pt-4 border-t border-neutral-900">
            <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400 px-1 mb-1">
              Catálogo de Servicios Individuales (1 a 6)
            </div>
            <nav className="flex flex-col gap-1 text-xs">
              {servicesList.map((s) => (
                <a
                  key={s.id}
                  href="/servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceItemClick(s.id, s.id);
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

          {/* SECCIÓN 4: REDES SOCIALES OFICIALES */}
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

          {/* SECCIÓN 5: ACCIONES PRINCIPALES */}
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
