import React, { useState, useEffect } from 'react';
import {
  Gift,
  X,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  MessageCircle,
  Mail,
  User,
  Phone,
  Percent,
  ShieldCheck,
  Download,
  FileCheck2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { downloadCouponPdf } from '../utils/generateCouponPdf';
import { dispatchLead } from '../utils/leadService';

interface DiscountLead {
  email: string;
  name?: string;
  phone?: string;
  eventType?: string;
  couponCode: string;
  acceptedTermsAndMarketing: boolean;
  createdAt: string;
}

export function getEventCouponPrefix(type: string): string {
  const norm = (type || '').toLowerCase();
  if (norm.includes('revela') || norm.includes('genero') || norm.includes('género')) {
    return 'REVELACION10';
  }
  if (norm.includes('fiesta') || norm.includes('cumple') || norm.includes('barra')) {
    return 'FIESTA10';
  }
  if (norm.includes('corporativo') || norm.includes('empresa') || norm.includes('marca')) {
    return 'EVENTO10';
  }
  return 'BODA10';
}

export function generateEventCouponCode(type: string): string {
  const prefix = getEventCouponPrefix(type);
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${randomSuffix}`;
}

export const DiscountCouponModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Boda Nupcial');
  const [acceptTermsAndMarketing, setAcceptTermsAndMarketing] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState('BODA10MAGIA');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registeredCouponCode, setRegisteredCouponCode] = useState<string | null>(null);

  useEffect(() => {
    // Check if dismissed previously during the current browsing session
    const isDismissed = sessionStorage.getItem('hye_popup_closed_session');
    if (isDismissed) return;

    // Delay 18 seconds (between 15 and 20 seconds) so visitors can browse the web first
    const timer = setTimeout(() => {
      setIsOpen(true);
      setIsSubmitted(false);
    }, 18000); // 18 seconds

    return () => clearTimeout(timer);
  }, []);

  // Listen for Escape key to easily close modal on any keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for custom trigger if user clicks any promotional button on the site
  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
      setIsSubmitted(false);
    };
    window.addEventListener('hye_open_discount_modal', handleOpenModal);
    return () => window.removeEventListener('hye_open_discount_modal', handleOpenModal);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('hye_popup_closed_session', 'true');
    } catch {
      // non-blocking
    }
  };

  const checkEmailInDatabase = async (targetEmail: string) => {
    const cleanEmail = targetEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return false;
    }
    try {
      const res = await fetch(`/api/discount-leads/check?email=${encodeURIComponent(cleanEmail)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.exists) {
          setAlreadyRegistered(true);
          setRegisteredCouponCode(data.couponCode || null);
          return true;
        }
      }
    } catch {
      // non-blocking
    }
    return false;
  };

  const handleEmailBlur = async () => {
    if (email) {
      await checkEmailInDatabase(email);
    }
  };

  const resetEmailForm = () => {
    setAlreadyRegistered(false);
    setEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;

    if (!acceptTermsAndMarketing) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setIsSubmitting(true);

    try {
      // 1. Verificación previa en Base de Datos: Bloquear duplicados si el servidor responde
      const exists = await checkEmailInDatabase(cleanEmail);
      if (exists) {
        setIsSubmitting(false);
        return;
      }

      // 2. Generar código único dinámico según el tipo de celebración seleccionada:
      // Boda -> BODA10-XXX | Revelación -> REVELACION10-XXX | Fiesta -> FIESTA10-XXX | Corporativo -> EVENTO10-XXX
      const generatedCode = generateEventCouponCode(eventType);
      setCouponCode(generatedCode);

      const leadPayload: DiscountLead = {
        email: cleanEmail,
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        eventType,
        couponCode: generatedCode,
        acceptedTermsAndMarketing: true,
        createdAt: new Date().toISOString(),
      };

      // 3. Envío multi-transporte inmediato (Notifica a humoyefectos@gmail.com + CC jonielterrible@gmail.com)
      await dispatchLead({
        tipo: 'cupon_10',
        email: cleanEmail,
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        eventType,
        couponCode: generatedCode,
        acceptedTerms: true,
      });

      // 4. Guardar copia local en el navegador
      localStorage.setItem('hye_discount_coupon_claimed', JSON.stringify(leadPayload));

      // 5. Descarga de PDF client-side (solo auto-descarga en PC para no bloquear navegación en Safari/iPhone)
      const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        try {
          downloadCouponPdf({
            couponCode: generatedCode,
            email: cleanEmail,
            name: name.trim() || undefined,
            phone: phone.trim() || undefined,
            eventType,
            discountPercent: 10,
          });
        } catch (pdfErr) {
          console.warn('PDF auto-download skipped or failed:', pdfErr);
        }
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error procesando lead de cupón:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappDiscountUrl = `https://wa.me/34600082462?text=${encodeURIComponent(
    `¡Hola Humo Y Efectos! 👋 Me acabo de registrar en vuestra web con el email ${email || 'mi email'} y quiero aplicar mi CUPÓN DEL 10% DE DESCUENTO (CÓDIGO: ${couponCode}) para mi ${eventType.toUpperCase()}.\n\nNombre: ${name || 'Por concretar'}\nTeléfono: ${phone || 'Este WhatsApp'}\n\n¿Podríais confirmarme disponibilidad de fecha y presupuesto con el 10% de descuento aplicado? ¡Gracias!`
  )}`;

  // Pop-up version only: if not open, render nothing
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        // Close on clicking backdrop outside the card
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border border-rose-500/40 rounded-3xl p-4 sm:p-6 text-white shadow-2xl shadow-rose-950/70 max-h-[92dvh] overflow-y-auto transform-gpu">
        {/* Ambient Background Glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* ❌ Cruz para cerrar SIEMPRE VISIBLE con alto contraste y click garantizado */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-neutral-800/95 hover:bg-rose-600 text-neutral-300 hover:text-white border border-neutral-600 hover:border-rose-400 flex items-center justify-center transition-all cursor-pointer z-50 shadow-xl active:scale-90"
          aria-label="Cerrar ventana emergente"
          title="Cerrar (Esc)"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-black uppercase tracking-wider mb-2">
              <Gift className="w-3 h-3 text-rose-400" />
              <span>Oferta Especial de Bienvenida</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight font-display text-white mb-1 leading-snug pr-8">
              ¡Consigue un <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">10% de Descuento</span> en tu Evento!
            </h3>

            <p className="text-xs text-neutral-300 leading-snug mb-3">
              Introduce tu email y desbloquea al instante tu cupón oficial del 10% aplicable a <strong>humo aéreo, confeti, vals nupcial o fuegos fríos</strong>.
            </p>

            {/* CASO A: SI EL CORREO YA ESTÁ REGISTRADO -> VISTA DEDICADA COMPACTA SIN SCROLL */}
            {alreadyRegistered ? (
              <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                {/* 🛑 LETRERO ROJO DESTACADO */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-red-950/95 via-red-950/80 to-neutral-950 border-2 border-red-500 text-white shadow-2xl shadow-red-950/80">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500/60 flex items-center justify-center text-red-300 shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-xs font-black uppercase tracking-wider text-red-300">
                        ⚠ AVISO: CORREO YA REGISTRADO EN LA BASE DE DATOS
                      </h4>
                      <p className="text-xs text-red-100 leading-snug">
                        El correo <strong className="text-white underline decoration-red-400">{email}</strong> ya figura en nuestra base de datos y ya ha recibido su cupón oficial del 10%.
                      </p>

                      <div className="p-2 rounded-xl bg-red-900/40 border border-red-500/30 text-[11px] text-red-200 leading-relaxed">
                        <p>
                          📩 <strong>Revisa tu bandeja de entrada</strong> (o tu carpeta de spam o correo no deseado).
                        </p>
                        {registeredCouponCode && (
                          <p className="font-mono text-white text-[11px] pt-1">
                            Tu código asignado: <strong className="bg-black/60 px-2 py-0.5 rounded text-rose-300 font-extrabold">{registeredCouponCode}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTÓN WHATSAPP DESTACADO */}
                <a
                  href={`https://wa.me/34600082462?text=${encodeURIComponent(
                    `¡Hola Humo Y Efectos! 👋 Mi correo ${email} ya figura como registrado en vuestra web pero necesito asistencia con mi cupón del 10% de descuento o consultar presupuesto para mi evento.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Contactar con Soporte vía WhatsApp (+34 600 08 24 62)</span>
                </a>

                {/* ACCIONES DE SALIDA Y CAMBIO DE EMAIL */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={resetEmailForm}
                    className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-neutral-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Probar con otro email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-neutral-800"
                  >
                    <span>Cerrar ventana</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CASO B: FORMULARIO NORMAL COMPACTO Y AJUSTADO A CUALQUIER PANTALLA */
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Tu Email donde recibir el cupón <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-2.5 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleEmailBlur}
                      placeholder="tu-email@gmail.com"
                      className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                    />
                  </div>
                </div>

                {/* 2-Columns grid for Name & Phone on all screens */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1 truncate">
                      Nombre / Pareja
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Laura y Carlos"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1 truncate">
                      Teléfono / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="600 00 00 00"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Tipo de Celebración
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setEventType(newType);
                      const prefix = getEventCouponPrefix(newType);
                      setCouponCode(`${prefix}MAGIA`);
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value="Boda Nupcial">Boda Nupcial (Vals, Salida, Entrada)</option>
                    <option value="Revelación de Género">Revelación de Género TNT Retro</option>
                    <option value="Fiesta / Barra Libre">Fiesta de Cumpleaños / Barra Libre</option>
                    <option value="Evento Corporativo">Evento de Marca / Corporativo</option>
                  </select>
                </div>

                {/* Casilla de Términos */}
                <div className="pt-0.5">
                  <label
                    className={`flex items-start gap-2 p-2 rounded-xl border transition-all cursor-pointer ${
                      termsError
                        ? 'bg-rose-950/40 border-rose-500 ring-1 ring-rose-500'
                        : acceptTermsAndMarketing
                        ? 'bg-rose-950/20 border-rose-500/50'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={acceptTermsAndMarketing}
                      onChange={(e) => {
                        setAcceptTermsAndMarketing(e.target.checked);
                        if (e.target.checked) setTermsError(false);
                      }}
                      className="mt-0.5 accent-rose-600 w-3.5 h-3.5 rounded cursor-pointer shrink-0"
                    />
                    <span className="text-[10px] text-neutral-300 leading-tight">
                      Acepto los <strong>términos</strong> y autorizo expresamente el envío constante de información y ofertas exclusivas. <span className="text-rose-400">*</span>
                    </span>
                  </label>
                  {termsError && (
                    <p className="text-[10px] font-bold text-rose-400 mt-1 pl-1">
                      ⚠ Debes marcar esta casilla para activar tu 10% de descuento.
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 shadow-xl shadow-rose-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Percent className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Comprobando datos...' : 'Obtener Mi 10% de Descuento'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-neutral-400 text-center">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Datos protegidos · Puedes darte de baja en cualquier momento con un clic.</span>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Step 2: Congratulations & 10% Coupon Code */
          <div className="text-center space-y-3 py-1">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                ¡Cupón del 10% Activado con Éxito!
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white mt-0.5">
                Aquí tienes tu 10% de Descuento
              </h3>
              <p className="text-xs text-neutral-300 mt-0.5 max-w-sm mx-auto">
                Registrado para <strong>{email}</strong>. Puedes canjearlo directamente por WhatsApp:
              </p>
            </div>

            {/* Visual Coupon Card */}
            <div className="relative p-4 rounded-2xl bg-white text-neutral-900 border-2 border-dashed border-rose-500 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left relative z-10">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    CÓDIGO EXCLUSIVO · 10% DTO:
                  </span>
                </div>
                <span className="text-2xl font-mono font-black text-rose-700 tracking-wider">
                  {couponCode}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">
                  ✓ Válido para descuento directo en tu presupuesto
                </span>
              </div>

              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-md relative z-10"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            {/* Status of PDF Generation */}
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-left flex items-start gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-emerald-200 leading-snug">
                <strong className="text-white font-bold">✓ Certificado PDF Oficial Descargado</strong>:
                Guarda este certificado para presentarlo al confirmar tu fecha.
              </div>
            </div>

            {/* Re-download PDF Button */}
            <button
              type="button"
              onClick={() =>
                downloadCouponPdf({
                  couponCode,
                  email,
                  name,
                  phone,
                  eventType,
                  discountPercent: 10,
                })
              }
              className="w-full py-2 px-3 rounded-xl font-bold text-[11px] uppercase tracking-wider text-rose-200 bg-rose-950/60 border border-rose-500/50 hover:bg-rose-900/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              <span>Descargar de nuevo Cupón en PDF</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <div className="space-y-1.5 pt-0.5">
              <a
                href={whatsappDiscountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Canjear 10% por WhatsApp (+34 600 08 24 62)</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-1.5 text-[11px] font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Continuar navegando en la web
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
