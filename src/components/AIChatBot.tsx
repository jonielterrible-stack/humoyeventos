import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Calendar,
  MessageSquare,
  PhoneCall,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  Flame,
  ChevronRight,
  Gift,
} from 'lucide-react';
import { dispatchLead } from '../utils/leadService';
import { queryKnowledgeBase } from '../utils/chatRagEngine';

interface ChatTurn {
  id: string;
  role: 'user' | 'model';
  text: string;
  bookingDraft?: BookingDraft | null;
}

interface BookingDraft {
  nombre?: string;
  telefono?: string;
  fechaEvento?: string;
  ciudadFinca?: string;
  tipoEvento?: string;
  efectos?: string;
  horarioCita?: string;
  notas?: string;
}

interface ConfirmedBooking extends BookingDraft {
  id: string;
  createdAt: string;
  tipoGestion: 'reserva_evento' | 'cita_asesoramiento';
}

const QUICK_QUESTIONS = [
  '🎁 ¿Cómo consigo el 10% de descuento?',
  '¿Mancha el humo aéreo o la niebla baja?',
  '¿Cómo son los cañones de confeti y mariposas?',
  '¿El vals con niebla baja y chispas frías?',
  'Quiero reservar fecha o pedir cita',
];

const EFFECT_OPTIONS = [
  '1. Humo Aéreo Vertical (1-9 cañones)',
  '2. Cañones de Confeti (Multicolor y Mariposas)',
  '3. Fuentes de Chispas Frías (Sparkulars)',
  '4. Máquina de Niebla Baja (Vals sobre las Nubes)',
  '5. Sonido, Iluminación & Discoteca Móvil (con DJ)',
  'Revelación Género Caja TNT Retro',
  'Pack Boda Total 360°',
];

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'booking'>('chat');

  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy Aura, del equipo de Humo Y Efectos ✨. Pregúntame sobre nuestros cañones de humo aéreo (1 a 9), confeti de mariposas/blanco, vals sobre las nubes, chispas frías o sonido y discoteca móvil, o dime tu fecha para mirarte disponibilidad y agendarte una llamada.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Booking / Appointment Form State
  const [tipoGestion, setTipoGestion] = useState<'reserva_evento' | 'cita_asesoramiento'>('reserva_evento');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [ciudadFinca, setCiudadFinca] = useState('');
  const [tipoEvento, setTipoEvento] = useState('Boda');
  const [selectedEffects, setSelectedEffects] = useState<string[]>(['Humo Aéreo Vertical (1-9 cañones)']);
  const [horarioCita, setHorarioCita] = useState('Tarde (16:00 - 20:00)');
  const [notas, setNotas] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  const toggleEffectOption = (effect: string) => {
    setSelectedEffects((prev) =>
      prev.includes(effect) ? prev.filter((item) => item !== effect) : [...prev, effect]
    );
  };

  const buildWhatsAppBookingUrl = (booking: ConfirmedBooking) => {
    const tipoLabel =
      booking.tipoGestion === 'reserva_evento'
        ? 'PRE-RESERVA DE FECHA / EVENTO'
        : 'CITA DE ASESORAMIENTO TELEFÓNICO';
    const message = [
      `Hola Humo Y Efectos, acabo de hablar con Aura en la web y quiero agendar mi reserva (Ref: *${booking.id}*):`,
      ``,
      `📌 *Gestión:* ${tipoLabel}`,
      `👤 *Nombre:* ${booking.nombre || 'Cliente Web'}`,
      `📞 *Teléfono:* ${booking.telefono || 'Desde este WhatsApp'}`,
      `🎉 *Tipo de evento:* ${booking.tipoEvento || 'Boda / Evento'}`,
      `📅 *Fecha del evento:* ${booking.fechaEvento || 'Por concretar'}`,
      `📍 *Ciudad / Finca:* ${booking.ciudadFinca || 'Por concretar'}`,
      `✨ *Efectos de interés:* ${booking.efectos || 'Asesoramiento personalizado'}`,
      `🕒 *Horario preferido:* ${booking.horarioCita || 'Cualquier horario'}`,
      booking.notas ? `📝 *Notas:* ${booking.notas}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/34600082462?text=${encodeURIComponent(message)}`;
  };

  const triggerDirectWhatsApp = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buildBookingFromDraft = (draft: BookingDraft, customId?: string): ConfirmedBooking => ({
    id: customId || `HYE-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    tipoGestion: 'reserva_evento',
    nombre: draft.nombre || nombre.trim() || 'Cliente Web',
    telefono: draft.telefono || telefono.trim() || 'Por WhatsApp',
    fechaEvento: draft.fechaEvento || fechaEvento.trim() || 'Por concretar',
    ciudadFinca: draft.ciudadFinca || ciudadFinca.trim() || 'Por concretar',
    tipoEvento: draft.tipoEvento || tipoEvento || 'Boda',
    efectos: draft.efectos || selectedEffects.join(', ') || 'Asesoramiento personalizado',
    horarioCita: draft.horarioCita || horarioCita || 'Tarde (16:00 - 20:00)',
    notas: draft.notas || notas.trim(),
  });

  const prefillBookingFromDraft = (draft: BookingDraft) => {
    if (draft.nombre) setNombre(draft.nombre);
    if (draft.telefono) setTelefono(draft.telefono);
    if (draft.fechaEvento) setFechaEvento(draft.fechaEvento);
    if (draft.ciudadFinca) setCiudadFinca(draft.ciudadFinca);
    if (draft.tipoEvento) setTipoEvento(draft.tipoEvento);
    if (draft.efectos) {
      setSelectedEffects([draft.efectos]);
    }
    if (draft.horarioCita) setHorarioCita(draft.horarioCita);
    if (draft.notas) setNotas(draft.notas);
    setActiveTab('booking');
  };

  const logBookingInBackground = (bookingPayload: ConfirmedBooking) => {
    dispatchLead({
      tipo: bookingPayload.tipoGestion === 'reserva_evento' ? 'reserva_evento' : 'contacto_presupuesto',
      name: bookingPayload.nombre,
      phone: bookingPayload.telefono,
      date: bookingPayload.fechaEvento,
      venue: bookingPayload.ciudadFinca,
      eventType: bookingPayload.tipoEvento,
      effects: bookingPayload.efectos,
      notes: bookingPayload.notas,
    }).catch(() => {});
  };

  const getAuraResponse = (
    userText: string,
    history: ChatTurn[]
  ): { reply: string; bookingDraft?: BookingDraft | null } => {
    const raw = userText.trim();
    const norm = raw
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Extract potential contact info
    const phoneMatch = raw.match(/(?:(?:\+|00)34[\s.-]*)?(?:6\d{2}|7\d{2}|9\d{2})[\s.-]*\d{3}[\s.-]*\d{3}/);
    const dateMatch = raw.match(
      /\b(?:\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{2,4})?|\d{1,2}\s+de\s+[a-z]+(?:\s+de\s+\d{2,4})?)\b/i
    );

    let draft: BookingDraft | null = null;
    if (phoneMatch || dateMatch) {
      draft = {
        telefono: phoneMatch ? phoneMatch[0] : undefined,
        fechaEvento: dateMatch ? dateMatch[0] : undefined,
        tipoEvento: norm.includes('revela') ? 'Revelación de Género' : norm.includes('fiesta') ? 'Fiesta' : 'Boda',
        ciudadFinca: norm.includes('talavera')
          ? 'Talavera de la Reina'
          : norm.includes('madrid')
          ? 'Madrid'
          : norm.includes('toledo')
          ? 'Toledo'
          : undefined,
      };
    }

    // Direct booking intent check
    if (
      (norm.includes('reserva') || norm.includes('cita') || norm.includes('agendar') || norm.includes('disponibilidad')) &&
      !norm.includes('como') &&
      !norm.includes('mancha') &&
      !norm.includes('precio')
    ) {
      return {
        reply:
          '¡Con mucho gusto te ayudo a bloquear tu fecha! Trabajamos con un cupo limitado de eventos por fin de semana para garantizar que un técnico oficial de nuestro equipo acuda personalmente a vuestra finca con todo el equipamiento.\n\nPuedes entrar en la pestaña "Agendar Cita / Evento" de arriba para facilitarnos los datos o escribirnos directamente a nuestro WhatsApp oficial (+34 600 08 24 62) y te confirmamos disponibilidad en menos de 15 minutos.',
        bookingDraft: draft,
      };
    }

    // Query RAG Knowledge Base (grounded in index.html, smokeData and services catalog)
    const ragResult = queryKnowledgeBase(raw);
    return {
      reply: ragResult.reply,
      bookingDraft: draft,
    };
  };

  const sendMessage = async (textToSend?: string) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed || isLoading) return;

    const userTurn: ChatTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const updatedHistory = [...messages, userTurn];
    setMessages(updatedHistory);
    if (!textToSend) setInput('');
    setIsLoading(true);

    let replyText = '';
    let bookingDraft: BookingDraft | null = null;

    try {
      // Create controller with timeout to avoid keeping user waiting
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (data && data.reply) {
            replyText = data.reply;
            bookingDraft = data.bookingDraft || null;
          }
        }
      }
    } catch {
      // Server offline or static Vercel rewrite to HTML: perfectly handled below!
    }

    // Fallback to our intelligent Aura expert engine if backend did not reply
    if (!replyText) {
      const localResult = getAuraResponse(trimmed, updatedHistory);
      replyText = localResult.reply;
      bookingDraft = localResult.bookingDraft || null;
    }

    const botTurn: ChatTurn = {
      id: `bot-${Date.now()}`,
      role: 'model',
      text: replyText,
      bookingDraft,
    };

    setMessages((prev) => [...prev, botTurn]);
    setIsLoading(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    setIsSubmittingBooking(true);

    const immediateBooking: ConfirmedBooking = {
      id: `HYE-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      tipoGestion,
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      fechaEvento: fechaEvento.trim() || 'Por concretar',
      ciudadFinca: ciudadFinca.trim() || 'Por concretar',
      tipoEvento,
      efectos: selectedEffects.join(', ') || 'Asesoramiento personalizado',
      horarioCita,
      notas: notas.trim(),
    };

    // Open WhatsApp immediately on the user's single click
    const whatsappUrl = buildWhatsAppBookingUrl(immediateBooking);
    triggerDirectWhatsApp(whatsappUrl);

    // Save state & log in background without blocking the redirect
    setConfirmedBooking(immediateBooking);
    logBookingInBackground(immediateBooking);
    setIsSubmittingBooking(false);
  };

  return (
    <>
      {/* Unified Floating Action Bar (Bottom Right) - Single Clean Chat Trigger */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center">
        {/* Chat Trigger Button - Icon Only */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all cursor-pointer ${
            isOpen
              ? 'bg-neutral-900 text-white border border-white/15 hover:bg-neutral-800'
              : 'bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 text-white shadow-rose-600/40 hover:scale-105 active:scale-95'
          }`}
          title="Hablar con nosotros / Agendar cita"
          aria-label="Abrir chat de atención y reservas"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <MessageSquare className="w-5 h-5 fill-current" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-neutral-950" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat & Booking Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[78vh] bg-neutral-950 text-white rounded-3xl border border-white/15 shadow-2xl shadow-black/80 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-md shadow-rose-500/20 font-extrabold text-sm text-white">
                A
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold tracking-tight text-white">
                    Aura · Humo Y Efectos
                  </h3>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">
                  En línea · Coordinación de Bodas y Eventos
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar ventana de chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-neutral-900 border-b border-white/10 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Directo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('booking')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'booking'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Cita / Evento</span>
            </button>
          </div>

          {/* TAB 1: DIRECT CHAT */}
          {activeTab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[290px] max-h-[48vh]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[87%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-rose-600 text-white rounded-br-sm'
                          : 'bg-neutral-900 border border-white/10 text-neutral-100 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* If booking draft detected from conversation */}
                    {msg.bookingDraft && (
                      <div className="mt-2 w-[90%] rounded-2xl bg-gradient-to-br from-rose-950/90 to-neutral-900 border border-rose-500/40 p-3 text-xs space-y-2">
                        <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Datos anotados para tu reserva</span>
                        </div>
                        <div className="text-[11px] text-neutral-200 space-y-0.5">
                          {msg.bookingDraft.nombre && <p>• Nombre: {msg.bookingDraft.nombre}</p>}
                          {msg.bookingDraft.telefono && <p>• Teléfono: {msg.bookingDraft.telefono}</p>}
                          {msg.bookingDraft.fechaEvento && (
                            <p>• Fecha: {msg.bookingDraft.fechaEvento}</p>
                          )}
                          {msg.bookingDraft.ciudadFinca && (
                            <p>• Lugar: {msg.bookingDraft.ciudadFinca}</p>
                          )}
                          {msg.bookingDraft.efectos && <p>• Efectos: {msg.bookingDraft.efectos}</p>}
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <a
                            href={buildWhatsAppBookingUrl(
                              buildBookingFromDraft(msg.bookingDraft, `HYE-${ msg.id.slice(-4) }`)
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              const draftBooking = buildBookingFromDraft(msg.bookingDraft!);
                              setConfirmedBooking(draftBooking);
                              logBookingInBackground(draftBooking);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/40 transition-colors cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Reservar ahora directo por WhatsApp</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => prefillBookingFromDraft(msg.bookingDraft!)}
                            className="w-full py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Revisar o completar más datos</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* If discount registration CTA is relevant */}
                    {msg.role === 'model' &&
                      (msg.text.includes('ventana de registro') ||
                        msg.text.includes('registrarte con tu email') ||
                        msg.text.includes('cupón oficial del 10%')) && (
                        <div className="mt-2 w-[90%]">
                          <button
                            type="button"
                            onClick={() => {
                              window.dispatchEvent(new CustomEvent('hye_open_discount_modal'));
                              setIsOpen(false);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 transition-transform active:scale-95 cursor-pointer"
                          >
                            <Gift className="w-4 h-4 shrink-0" />
                            <span>🎁 Abrir Registro para Recibir mi Cupón 10%</span>
                          </button>
                        </div>
                      )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-xs text-neutral-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:300ms]" />
                      <span className="text-[11px] text-neutral-400 ml-1">Aura está escribiendo...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div className="px-3.5 py-2 bg-neutral-900/70 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      if (q.includes('reservar')) {
                        setActiveTab('booking');
                      } else {
                        sendMessage(q);
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-[11px] text-neutral-200 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="p-3 bg-neutral-900 border-t border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu duda o fecha de tu boda..."
                  className="flex-1 bg-neutral-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* TAB 2: DIRECT APPOINTMENT & EVENT BOOKING */}
          {activeTab === 'booking' && (
            <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
              {confirmedBooking ? (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                      Enviando a WhatsApp · Ref #{confirmedBooking.id}
                    </p>
                    <h4 className="text-base font-extrabold text-white">
                      ¡Abriendo WhatsApp, {confirmedBooking.nombre}!
                    </h4>
                    <p className="text-xs text-neutral-300">
                      Te hemos redirigido directamente a nuestro WhatsApp con tu reserva lista para enviar. Si no se ha abierto automáticamente, pulsa aquí abajo:
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-900 border border-white/10 text-xs space-y-1.5 text-neutral-200">
                    <p>
                      <strong className="text-white">Evento:</strong> {confirmedBooking.tipoEvento} (
                      {confirmedBooking.fechaEvento})
                    </p>
                    <p>
                      <strong className="text-white">Ciudad / Finca:</strong>{' '}
                      {confirmedBooking.ciudadFinca}
                    </p>
                    <p>
                      <strong className="text-white">Efectos:</strong> {confirmedBooking.efectos}
                    </p>
                    <p>
                      <strong className="text-white">Teléfono:</strong> {confirmedBooking.telefono} (
                      {confirmedBooking.horarioCita})
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppBookingUrl(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Abrir WhatsApp (600 08 24 62)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setConfirmedBooking(null)}
                    className="w-full py-2 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Modificar datos o hacer otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  {/* Tipo de gestión */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-900 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setTipoGestion('reserva_evento')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        tipoGestion === 'reserva_evento'
                          ? 'bg-white text-neutral-950'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Reservar Fecha Evento
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoGestion('cita_asesoramiento')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        tipoGestion === 'cita_asesoramiento'
                          ? 'bg-white text-neutral-950'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Cita Telefónica / Vídeo
                    </button>
                  </div>

                  {/* Nombre y Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Tu Nombre *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Ej: Laura y David"
                          className="w-full bg-neutral-900 border border-white/15 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          placeholder="Ej: 600 00 00 00"
                          className="w-full bg-neutral-900 border border-white/15 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fecha y Ciudad/Finca */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Fecha del Evento
                      </label>
                      <input
                        type="date"
                        value={fechaEvento}
                        onChange={(e) => setFechaEvento(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Ciudad o Finca
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={ciudadFinca}
                          onChange={(e) => setCiudadFinca(e.target.value)}
                          placeholder="Ej: Madrid, Asturias..."
                          className="w-full bg-neutral-900 border border-white/15 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tipo de Evento */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Tipo de Celebración
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['Boda', 'Revelación Género', 'Fiesta / Evento'].map((tipo) => (
                        <button
                          key={tipo}
                          type="button"
                          onClick={() => setTipoEvento(tipo)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                            tipoEvento === tipo
                              ? 'bg-rose-600/25 border-rose-500 text-white'
                              : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {tipo}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Efectos deseados */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>Efectos que te interesan</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {EFFECT_OPTIONS.map((effect) => {
                        const active = selectedEffects.includes(effect);
                        return (
                          <button
                            key={effect}
                            type="button"
                            onClick={() => toggleEffectOption(effect)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                              active
                                ? 'bg-rose-600 text-white border-rose-500'
                                : 'bg-neutral-900 text-neutral-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {effect}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horario preferido de contacto */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Preferencia para llamarte o escribirte</span>
                    </label>
                    <select
                      value={horarioCita}
                      onChange={(e) => setHorarioCita(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="Mañana (10:00 - 14:00)">Por la mañana (10:00 - 14:00)</option>
                      <option value="Tarde (16:00 - 20:00)">Por la tarde (16:00 - 20:00)</option>
                      <option value="Prefiero hablar por WhatsApp">Prefiero hablar por WhatsApp</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                  >
                    {isSubmittingBooking
                      ? 'Generando reserva...'
                      : tipoGestion === 'reserva_evento'
                      ? 'Bloquear Disponibilidad / Pre-Reservar'
                      : 'Agendar Cita de Asesoramiento'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
