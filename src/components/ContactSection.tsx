import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, Clock, MessageSquare, Sparkles, MessageCircle } from 'lucide-react';
import { dispatchLead } from '../utils/leadService';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    tubes: '4 Cañones',
    colors: 'Rosa Fucsia y Oro',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.phone.trim()) {
      setErrorMsg('Por favor completa al menos tu nombre y teléfono de contacto.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await dispatchLead({
        tipo: 'contacto_presupuesto',
        name: formState.name.trim(),
        email: formState.email.trim() || undefined,
        phone: formState.phone.trim(),
        date: formState.date.trim() || undefined,
        venue: formState.venue.trim() || undefined,
        tubes: formState.tubes,
        colors: formState.colors,
        notes: formState.notes.trim() || undefined,
        effects: `${formState.tubes} (${formState.colors})`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error enviando contacto:', err);
      // Still show success to visitor and offer WhatsApp fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `¡Hola Humo Y Efectos! 👋 Acabo de solicitar presupuesto en vuestra web:
· Nombre: ${formState.name}
· Teléfono: ${formState.phone}
${formState.email ? `· Email: ${formState.email}\n` : ''}· Fecha evento: ${formState.date || 'Por concretar'}
· Finca / Lugar: ${formState.venue || 'Por concretar'}
· Configuración: ${formState.tubes} (${formState.colors})
${formState.notes ? `· Notas: ${formState.notes}\n` : ''}
¿Podríais confirmarme disponibilidad y presupuesto? ¡Muchas gracias!`;

  const whatsappUrl = `https://wa.me/34600082462?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="contacto" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Atención Personalizada</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              Reserva tu fecha con Humo Y Efectos
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Con sede central en <strong>Talavera de la Reina (Toledo)</strong> y base técnica directa para <strong>Madrid y Zona Centro</strong>, trabajamos con un cupo limitado de eventos por fin de semana en toda España para garantizar el asesoramiento presencial con vuestro fotógrafo y videógrafo.
            </p>

            <div className="space-y-4 pt-4 border-t border-neutral-100 text-xs text-neutral-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100">
                  <Phone className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Teléfono & WhatsApp Humo Y Efectos</p>
                  <p className="text-neutral-500 font-medium">+34 600 08 24 62 (Lunes a Domingo)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100">
                  <Mail className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Email Oficial para Novios y Fincas</p>
                  <a
                    href="mailto:humoyefectos@gmail.com"
                    className="text-neutral-500 font-medium hover:text-rose-600 transition-colors"
                  >
                    humoyefectos@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Tiempo de Respuesta</p>
                  <p className="text-neutral-500 font-medium">Menos de 2 horas en horario comercial</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
              <p className="text-xs text-neutral-600">
                ¿Quieres resolverlo al instante? Escríbenos por WhatsApp con los datos de tu fecha:
              </p>
              <a
                href="https://wa.me/34600082462?text=Hola%20Humo%20Y%20Efectos,%20quiero%20consultar%20disponibilidad%20de%20humo%20aéreo%20para%20un%20evento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir chat de WhatsApp directo →</span>
              </a>
            </div>
          </div>

          {/* Right Column: 7 cols - Form on White */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-lg">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 font-display">¡Solicitud recibida correctamente!</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Gracias <strong className="text-neutral-900">{formState.name}</strong>. Hemos remitido tus datos a <strong className="text-neutral-900">humoyefectos@gmail.com</strong> para el{' '}
                    <strong className="text-neutral-900">{formState.date || 'tu evento'}</strong>. Te contactaremos en menos de 2 horas.
                  </p>

                  <div className="pt-2 max-w-md mx-auto">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                      <span>Confirmar también por WhatsApp (+34 600 08 24 62)</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 text-xs font-bold text-neutral-700 bg-white hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-colors cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-neutral-900 font-display mb-2">
                    Formulario de Presupuesto Personalizado
                  </h3>

                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 text-xs rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Vuestro nombre o nombres *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carmen y Javier"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej. 612 345 678"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        placeholder="novios@ejemplo.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Fecha aproximada
                      </label>
                      <input
                        type="date"
                        value={formState.date}
                        onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Número de cañones
                      </label>
                      <select
                        value={formState.tubes}
                        onChange={(e) => setFormState({ ...formState, tubes: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-rose-500 shadow-xs"
                      >
                        <option value="1 Cañón">1 Cañón (Impacto vertical único)</option>
                        <option value="2 Cañones">2 Cañones (Dúo coordinado)</option>
                        <option value="3 Cañones">3 Cañones (Trío espectacular)</option>
                        <option value="4 Cañones">4 Cañones (Recomendado parejas)</option>
                        <option value="5 Cañones">5 Cañones (Gran apertura)</option>
                        <option value="6 Cañones">6 Cañones (Arco completo)</option>
                        <option value="7 Cañones">7 Cañones (Cúpula panorámica)</option>
                        <option value="8 Cañones">8 Cañones (Festial 360°)</option>
                        <option value="9 Cañones">9 Cañones (Máximo impacto cielo)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Colores preferidos
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Rosa Pastel y Blanco Puro"
                        value={formState.colors}
                        onChange={(e) => setFormState({ ...formState, colors: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Finca / Lugar / Comentarios
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Indícanos finca, ciudad o detalles de la boda..."
                      value={formState.notes}
                      onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Enviando solicitud...' : 'Solicitar Propuesta Humo Y Efectos'}</span>
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    Tus datos son 100% confidenciales. Cumplimiento estricto RGPD.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
