import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Ruler,
  Wind,
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Flame,
  CloudRain,
  PartyPopper,
  Zap,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  Send,
} from 'lucide-react';
import { OFFICIAL_SAFETY_SPECS } from '../data/smokeData';
import { PageView } from '../types/navigation';

interface TechnicalSafetyDossierProps {
  onNavigate?: (view: PageView) => void;
}

export const TechnicalSafetyDossier: React.FC<TechnicalSafetyDossierProps> = ({ onNavigate }) => {
  const [copiedRef, setCopiedRef] = useState(false);
  const [fincaName, setFincaName] = useState('');
  const [coupleName, setCoupleName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [requestedCustomDossier, setRequestedCustomDossier] = useState(false);

  const dossierRefCode = 'DOSSIER-SEG-2026-HYE';

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(dossierRefCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fincaName.trim()) return;

    const msg = `Hola Humo Y Efectos, necesito solicitar el Dossier de Seguridad y Certificado CE Clase T1 sellado y personalizado para nuestra finca:
· Finca / Espacio: ${fincaName}
· Novios / Cliente: ${coupleName || 'Por concretar'}
· Fecha del evento: ${eventDate || 'Por concretar'}
· Ref: ${dossierRefCode}
¿Podríais enviármelo en PDF para el metre y la dirección del espacio? Gracias.`;

    const url = `https://wa.me/34600082462?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setRequestedCustomDossier(true);
  };

  return (
    <div className="bg-neutral-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-neutral-900 print:bg-white print:p-0 print:min-h-0">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-neutral-500 print:hidden">
          <button
            onClick={() => onNavigate?.('inicio')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <button
            onClick={() => onNavigate?.('servicios')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Servicios Oficiales
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-rose-600 font-bold">Dossier Técnico de Seguridad</span>
        </nav>

        {/* Top Action Toolbar (Print, Download, Share) */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                Documento Técnico Acreditativo Oficial
              </span>
              <p className="text-sm font-extrabold text-neutral-900">
                Normativa CE Clase T1 · Reglamento Pirotécnico RD 989/2015
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={handleCopyRef}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
              title="Copiar código de referencia del documento"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
              <span>{copiedRef ? 'Ref. Copiada' : dossierRefCode}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DOCUMENTO PRINCIPAL / DOSSIER TÉCNICO FORMAL              */}
        {/* ========================================================= */}
        <article className="bg-white rounded-3xl border border-neutral-200 shadow-md p-6 sm:p-10 lg:p-12 space-y-10 print:shadow-none print:border-none print:p-0 print:space-y-6">
          
          {/* Header del Dossier Formal */}
          <header className="border-b-2 border-neutral-900 pb-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dossier Técnico Aprobado para Fincas y Salones</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 font-display tracking-tight">
                  Dossier de Seguridad Técnica y Normas de Uso Oficiales
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
                  Protocolo operativo de seguridad, homologación europea de artículos pirotécnicos para eventos (Cat. T1) y guía técnica para metres, directores de fincas y coordinadores de boda.
                </p>
              </div>

              {/* Sello Oficial Empresa */}
              <div className="p-4 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shrink-0 text-right space-y-1 sm:min-w-[220px]">
                <span className="text-[10px] font-mono font-bold tracking-widest text-rose-400 block uppercase">
                  Empresa Operadora Autorizada
                </span>
                <p className="font-extrabold text-base tracking-tight font-display">HUMO Y EFECTOS</p>
                <p className="text-xs text-neutral-300">Sede Central: Talavera de la Reina (Toledo)</p>
                <p className="text-[11px] text-neutral-400 font-mono">Ref. {dossierRefCode}</p>
                <div className="pt-2 text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Venta y Uso Libre (+18 Años)</span>
                </div>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 font-mono text-[10px] block uppercase">Directiva Aplicable</span>
                <strong className="text-neutral-900 block mt-0.5">Directiva 2013/29/UE</strong>
                <span className="text-[10px] text-neutral-500">Unión Europea</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 font-mono text-[10px] block uppercase">Reglamento Nacional</span>
                <strong className="text-neutral-900 block mt-0.5">Real Decreto 989/2015</strong>
                <span className="text-[10px] text-neutral-500">BOE / Artículos Pirotécnicos</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 font-mono text-[10px] block uppercase">Categoría Pirotécnica</span>
                <strong className="text-neutral-900 block mt-0.5">Clase T1 (Escenario / Bodas)</strong>
                <span className="text-[10px] text-neutral-500">CE 0163-T1-6069</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 font-mono text-[10px] block uppercase">Régimen Legal</span>
                <strong className="text-neutral-900 block mt-0.5">Venta y Uso Libre (+18)</strong>
                <span className="text-[10px] text-neutral-500">Sin licencias, cursos ni ADR</span>
              </div>
            </div>
          </header>

          {/* ========================================================= */}
          {/* SECCIÓN 1: RESUMEN EJECUTIVO PARA LA FINCA Y EL METRE     */}
          {/* ========================================================= */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display">
                1. Resumen Ejecutivo para la Dirección de la Finca y el Metre
              </h2>
            </div>
            
            <p className="text-sm text-neutral-700 leading-relaxed">
              El material pirotécnico utilizado en nuestros servicios pertenece estrictamente a la <strong>Categoría Europea T1 (artificios para uso escénico y eventos)</strong>, regulado bajo la Directiva 2013/29/UE y el Real Decreto 989/2015. Se trata de artículos catalogados de <strong>venta y utilización legalmente libre para cualquier persona mayor de 18 años (+18)</strong>: no se requiere carnet de pirotécnico, no se exigen cursos ni titulaciones especiales, no precisa permisos gubernativos para su uso en fincas privadas y está exento de normativa de transporte de mercancías peligrosas ADR. Proporcionamos sistemas de anclaje seguros y módulos de disparo remoto codificados para mayor comodidad y tranquilidad del espacio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sin Residuos en el Suelo</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  El humo aéreo se proyecta a 15 metros y se disipa en el aire en pocos segundos. No mancha baldosas, césped, adoquines ni vestidos de novia.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Sin Humo Tóxico ni Olor</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Fórmula libre de azufre tradicional y sin combustión persistente. No genera niebla baja molesta durante el cóctel ni molesta a los invitados.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div className="flex items-center gap-2 text-purple-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Disparo Seguro y Accesible (+18)</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Ignición electrónica por radiofrecuencia con botón de seguridad y alcance de 80 metros, fácil y seguro de activar por cualquier mayor de edad.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECCIÓN 2: IDENTIFICACIÓN DEL MATERIAL HOMOLOGADO          */}
          {/* ========================================================= */}
          <section className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display">
                2. Ficha Técnica Certificada del Artificio Sbruffo Smoke 40
              </h2>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              Los datos técnicos a continuación han sido extraídos de las etiquetas oficiales del fabricante registradas ante el Organismo Notificado Europeo 0163:
            </p>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 text-neutral-800 font-bold uppercase tracking-wider text-[11px] border-b border-neutral-200">
                  <tr>
                    <th className="py-3 px-4">Parámetro Técnico</th>
                    <th className="py-3 px-4">Especificación Certificada</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Normativa / Registro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold text-neutral-900">Denominación del Modelo</td>
                    <td className="py-3 px-4 text-rose-600 font-bold font-mono">SBRUFFO SMOKE 40 (Pirotecnica Manna)</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">CE 0163 Cat. T1</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-neutral-900">Número de Registro CE</td>
                    <td className="py-3 px-4 font-mono">0163-T1-6069</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">Directiva 2013/29/UE</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-neutral-900">Lote y Año de Fabricación</td>
                    <td className="py-3 px-4 font-mono">Lote COL/MIN/I25/13 · 2025/2026</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">Trazabilidad oficial de fábrica</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-neutral-900">Materia Reglamentada (NEC)</td>
                    <td className="py-3 px-4">35 gramos de materia activa por cañón</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">Límite controlado Clase T1</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-neutral-900">Nivel de Presión Sonora</td>
                    <td className="py-3 px-4">115,41 dB(AI) a 8 metros (disparo seco técnico, sin detonación atronadora)</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">Apto cercanía de caballos / fauna</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-neutral-900">Edad Mínima Legal</td>
                    <td className="py-3 px-4 text-red-600 font-bold">18 años (Uso exclusivo técnico profesional)</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">RD 989/2015</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECCIÓN 3: PLANO Y DISTANCIAS DE SEGURIDAD EN FINCA       */}
          {/* ========================================================= */}
          <section className="space-y-5 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display">
                3. Plano de Seguridad y Distancias Técnicas Obligatorias
              </h2>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              El cumplimiento de las siguientes distancias de seguridad es preceptivo según la homologación CE y es supervisado personalmente por el técnico in situ:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-900 text-white border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <Ruler className="w-5 h-5 text-rose-400" />
                  <span className="text-2xl font-black font-mono text-rose-400">14,5 m</span>
                </div>
                <strong className="text-sm font-bold block">Distancia Vertical Libre</strong>
                <p className="text-xs text-neutral-300 leading-snug">
                  Espacio aéreo libre hacia el cielo por encima de la boca del cañón, sin ramas bajas ni cables aéreos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 text-white border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span className="text-2xl font-black font-mono text-amber-400">3,0 m</span>
                </div>
                <strong className="text-sm font-bold block">Radio Perimetral del Cañón</strong>
                <p className="text-xs text-neutral-300 leading-snug">
                  Círculo perimetral inmediato alrededor de la base libre de manteles, cortinas o decoración inflamable.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 text-white border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-2xl font-black font-mono text-emerald-400">19,0 m</span>
                </div>
                <strong className="text-sm font-bold block">Distancia Obligatoria a Comensales</strong>
                <p className="text-xs text-neutral-300 leading-snug">
                  Separación reglamentaria a zonas de mesas del banquete y público no coordinado con la organización.
                </p>
              </div>
            </div>

            {/* Diagrama Visual de Seguridad */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block">
                Disposición Operativa Tipo para la Salida de Ceremonia o Cóctel:
              </span>
              <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 space-y-2 font-mono">
                <p>📍 [FINCA / EDIFICIO] ── (3m libres) ── [BATERÍA DE CAÑONES CON BASE ANTIVUELCO] ── (12m altura vertical limpia) ──☁️ [CÚPULA DE HUMO]</p>
                <p>📸 [PAREJA & FOTÓGRAFO]: Posicionados a 4 - 6 metros frente a los cañones, coordinados con el técnico mediante cuenta atrás.</p>
                <p>👥 [INVITADOS & CÓCTEL]: Situados lateralmente o a distancia prudencial recomendada respetando el campo de visión fotográfico.</p>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECCIÓN 4: PROTOCOLO POR CADA EFECTO ESPECIAL             */}
          {/* ========================================================= */}
          <section className="space-y-6 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display">
                4. Normas de Seguridad Específicas por Efecto
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Efecto 1: Humo Aéreo Vertical */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 font-display">
                    1. Cañones de Humo Aéreo Vertical (Sbruffo 40)
                  </h3>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Disparo Único Instantáneo:</strong> El artificio no arde durante minutos; suelta toda la carga en 1 segundo a 15m.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sin Manchas:</strong> Partículas micronizadas que se dispersan en suspensión sin teñir textiles ni suelos.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Condiciones de Viento:</strong> No se dispara si el viento sostenido supera los 30 km/h en dirección a comensales.</span>
                  </li>
                </ul>
              </div>

              {/* Efecto 2: Fuentes de Chispas Frías Sparkulars */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                    <Flame className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 font-display">
                    2. Fuentes de Chispas Frías Sparkulars
                  </h3>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>100% Sin Pólvora:</strong> Tecnología patentada a base de microgránulos de aleación de titanio y circonio.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Tacto Frío Inofensivo:</strong> Las chispas pueden tocar la mano o vestidos sin quemar ni dejar marcas.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Aptas en Interior de Hoteles:</strong> Cero humo denso, cero olores desagradables y cero activación de alarmas.</span>
                  </li>
                </ul>
              </div>

              {/* Efecto 3: Máquina de Niebla Baja (Hielo Seco) */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-600">
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 font-display">
                    3. Máquina de Niebla Baja (Vals sobre las Nubes)
                  </h3>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Puro Vapor de Agua Condensado:</strong> Sublimación de hielo seco (CO2 sólido alimentario) en agua caliente a 85°C.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Suelo Totalmente Seco:</strong> No resbala ni deja charcos en tarimas de madera ni alfombras de fincas.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Manto Pesado a Ras de Suelo:</strong> No asciende por encima de 40 cm y no activa detectores ópticos en techos.</span>
                  </li>
                </ul>
              </div>

              {/* Efecto 4: Cañones de Confeti Homologado */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-fuchsia-100 text-fuchsia-600">
                    <PartyPopper className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 font-display">
                    4. Confeti Biodegradable e Ignífugo M1
                  </h3>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>100% Biodegradable:</strong> Papel de seda que se descompone con el rocío de agua o lluvia sin perjudicar jardines.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Certificación Ignífuga Clase M1:</strong> No propaga llama ni combustión ante contacto accidental con velas o focos.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Disparo Neumático / Eléctrico:</strong> Propulsión por aire comprimido o cartucho homologado CE.</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* ========================================================= */}
          {/* SECCIÓN 5: CLASIFICACIÓN LEGAL: MATERIAL DE USO LIBRE (+18) */}
          {/* ========================================================= */}
          <section className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display">
                5. Régimen Legal Oficial: Venta y Uso Libre para Mayores de 18 Años
              </h2>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              De acuerdo con la legislación vigente europea (Directiva 2013/29/UE) y española (Real Decreto 989/2015), los artículos pirotécnicos de <strong>Categoría T1</strong> cuentan con un régimen legal extraordinariamente claro y favorable para eventos:
            </p>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3.5 text-xs text-neutral-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block text-sm">Apto para Cualquier Persona Mayor de 18 Años (+18):</strong>
                  <span>Este tipo de material lo puede adquirir y tirar cualquier persona mayor de 18 años de forma 100% legal en celebraciones, fincas y espacios privados.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block text-sm">Sin Licencias Especiales ni Carnet de Pirotécnico:</strong>
                  <span>No requiere licencias de operador, ni carnet de pirotécnico, ni cursos ni permisos de la delegación del gobierno para su uso en bodas y eventos.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block text-sm">Sin Normativa ni Transporte ADR:</strong>
                  <span>Al ser artificios escénicos catalogados en Categoría T1, no están sujetos a la normativa de transporte de mercancías peligrosas ADR ni requieren vehículos especiales.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block text-sm">Normas Básicas de Seguridad del Fabricante:</strong>
                  <span>Basta con ser mayor de edad (+18), asentar los cañones en suelo firme en posición vertical hacia el cielo y respetar el perímetro de seguridad reglamentario (14,5 m de altura libre y 3 m radiales).</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECCIÓN 6: ENLACES A NORMATIVAS OFICIALES EXTERNAS        */}
          {/* ========================================================= */}
          <section className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-display">
                6. Enlaces y Fuentes Legislativas de Autoridad
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <a
                href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32013L0029"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between group"
                title="Consultar Directiva 2013/29/UE en EUR-Lex"
              >
                <div>
                  <span className="text-[10px] font-mono text-rose-600 font-bold block mb-1">Unión Europea</span>
                  <strong className="text-neutral-900 block group-hover:text-rose-600 transition-colors">Directiva 2013/29/UE</strong>
                  <p className="text-[11px] text-neutral-500 mt-1">Armonización de comercialización de artificios pirotécnicos.</p>
                </div>
                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-700 font-bold mt-2 flex items-center gap-1">
                  Ver documento <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11933"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between group"
                title="Consultar Real Decreto 989/2015 en el BOE"
              >
                <div>
                  <span className="text-[10px] font-mono text-rose-600 font-bold block mb-1">España (BOE)</span>
                  <strong className="text-neutral-900 block group-hover:text-rose-600 transition-colors">Real Decreto 989/2015</strong>
                  <p className="text-[11px] text-neutral-500 mt-1">Reglamento de artículos pirotécnicos y cartuchería.</p>
                </div>
                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-700 font-bold mt-2 flex items-center gap-1">
                  Ver en el BOE <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://www.guardiacivil.es/es/servicios/armasyexplosivos/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between group"
                title="Intervención Central de Armas y Explosivos de la Guardia Civil"
              >
                <div>
                  <span className="text-[10px] font-mono text-rose-600 font-bold block mb-1">Autoridad</span>
                  <strong className="text-neutral-900 block group-hover:text-rose-600 transition-colors">Guardia Civil (ICAE)</strong>
                  <p className="text-[11px] text-neutral-500 mt-1">Inspección Central de Armas y Explosivos en España.</p>
                </div>
                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-700 font-bold mt-2 flex items-center gap-1">
                  Portal ICAE <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://www.aemet.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between group"
                title="Agencia Estatal de Meteorología AEMET"
              >
                <div>
                  <span className="text-[10px] font-mono text-rose-600 font-bold block mb-1">Meteorología</span>
                  <strong className="text-neutral-900 block group-hover:text-rose-600 transition-colors">AEMET España</strong>
                  <p className="text-[11px] text-neutral-500 mt-1">Previsión y velocidad del viento para seguridad de eventos.</p>
                </div>
                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-700 font-bold mt-2 flex items-center gap-1">
                  AEMET oficial <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECCIÓN 7: FORMULARIO PARA SOLICITAR DOSSIER SELLADO      */}
          {/* ========================================================= */}
          <section className="p-6 sm:p-8 rounded-3xl bg-neutral-950 text-white border border-neutral-800 space-y-4 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-rose-400 block mb-1">
                  Atención Directa a Fincas y Novios
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  ¿Tu finca te solicita el Dossier Sellado con sus datos?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1 leading-relaxed">
                  Completa los datos de tu finca y fecha. Te remitiremos el documento oficial en formato PDF firmado y sellado por nuestro departamento técnico para entregar directamente al metre.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <a
                  href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20necesito%20el%20dossier%20técnico%20de%20seguridad%20sellado%20para%20mi%20finca."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp 600 08 24 62</span>
                </a>
              </div>
            </div>

            <form onSubmit={handleCustomRequest} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">Nombre de la Finca o Palacio *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Finca El Tomillar"
                  value={fincaName}
                  onChange={(e) => setFincaName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">Nombres de los Novios</label>
                <input
                  type="text"
                  placeholder="Ej. Laura y Carlos"
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">Fecha del Evento</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Pedir</span>
                  </button>
                </div>
              </div>
            </form>

            {requestedCustomDossier && (
              <p className="text-xs text-emerald-400 font-medium">
                ✓ Se ha abierto WhatsApp para remitirte el dossier sellado. ¡Te responderemos en menos de 2 horas!
              </p>
            )}
          </section>

          {/* Footer del Documento */}
          <footer className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              <p className="font-bold text-neutral-800">Humo Y Efectos · Departamento de Seguridad Técnica</p>
              <p>Sede Central: Talavera de la Reina (Toledo) · Servicio en Madrid, Toledo y toda España</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[11px]">Ref. Verificación: {dossierRefCode}</p>
              <p className="text-[11px]">Documento vigente para la temporada 2026</p>
            </div>
          </footer>

        </article>

      </div>
    </div>
  );
};
