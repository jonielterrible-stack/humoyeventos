import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, Clock, MessageSquare, Sparkles } from 'lucide-react';

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
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.phone) {
      setErrorMsg('Por favor completa al menos tu nombre y teléfono de contacto.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

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
              Trabajamos con un cupo limitado de eventos por fin de semana en toda España para garantizar el asesoramiento
              directo con vuestro fotógrafo y videógrafo en el disparo instantáneo.
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
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 shadow-lg">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 font-display">¡Solicitud recibida correctamente!</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Gracias <strong className="text-neutral-900">{formState.name}</strong>. Hemos recibido los detalles para el{' '}
                    <strong className="text-neutral-900">{formState.date || 'tu evento'}</strong>. Te contactaremos en menos de 2 horas con la confirmación de fecha.
                  </p>
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
                        placeholder="nombre@gmail.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Fecha aproximada del evento
                      </label>
                      <input
                        type="date"
                        value={formState.date}
                        onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-rose-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Cañones deseados (1 a 9)
                      </label>
                      <select
                        value={formState.tubes}
                        onChange={(e) => setFormState({ ...formState, tubes: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-rose-500 shadow-xs"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <option key={n} value={`${n} Cañones`}>
                            {n} {n === 1 ? 'Cañón' : 'Cañones (Disparo instantáneo)'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Preferencia de Colores
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Todos Rosa Fucsia o 2 Azul + 2 Dorado"
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
                      placeholder="Indícanos finca o detalles de la boda..."
                      value={formState.notes}
                      onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Solicitar Propuesta Humo Y Efectos</span>
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
