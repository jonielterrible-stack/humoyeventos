import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent File Storage paths
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const LEADS_FILE = path.join(DATA_DIR, 'discount-leads.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const SMTP_CONFIG_FILE = path.join(DATA_DIR, 'smtp-config.json');
const LEADS_CSV_FILE = path.join(DATA_DIR, 'base_de_datos_leads.csv');

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  tipoGestion: 'reserva_evento' | 'cita_asesoramiento';
  nombre: string;
  telefono: string;
  fechaEvento: string;
  ciudadFinca: string;
  tipoEvento: string;
  efectos: string;
  horarioCita?: string;
  notas?: string;
}

export interface DiscountLeadRecord {
  id: string;
  createdAt: string;
  email: string;
  name?: string;
  phone?: string;
  eventType?: string;
  couponCode: string;
  acceptedTermsAndMarketing: boolean;
}

function loadJsonFile<T>(filePath: string, fallback: T[]): T[] {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err);
  }
  return fallback;
}

function saveJsonFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err);
  }
}

const bookingsStore: BookingRecord[] = loadJsonFile<BookingRecord>(BOOKINGS_FILE, []);
const discountLeadsStore: DiscountLeadRecord[] = loadJsonFile<DiscountLeadRecord>(LEADS_FILE, []);

function syncCsvDatabase() {
  try {
    const headers = [
      'ID',
      'Fecha_Registro',
      'Email_Cliente',
      'Nombre_O_Pareja',
      'Telefono_Contacto',
      'Tipo_Celebracion',
      'Codigo_Cupon_10',
      'Enlace_WhatsApp',
      'Acepta_Informacion_Constante',
    ];
    const rows = discountLeadsStore.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleString('es-ES'),
      l.email,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      l.phone || '',
      `"${(l.eventType || '').replace(/"/g, '""')}"`,
      l.couponCode,
      l.phone ? `https://wa.me/34${l.phone.replace(/[^0-9]/g, '')}` : '',
      l.acceptedTermsAndMarketing ? 'SÍ' : 'NO',
    ]);
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    fs.writeFileSync(LEADS_CSV_FILE, csvContent, 'utf-8');
  } catch (err) {
    console.error('Error sincronizando base_de_datos_leads.csv:', err);
  }
}

// Sync CSV database on startup
syncCsvDatabase();

const SYSTEM_INSTRUCTION = `Te llamas "Aura" y formas parte del equipo humano de coordinación de bodas y eventos de **Humo Y Efectos** (también conocidos como Smoke Eventos), líderes en España en efectos especiales para bodas, revelación de género y grandes eventos.

REGLA FUNDAMENTAL DE IDENTIDAD:
- Habla SIEMPRE en primera persona como una persona real del equipo ("Soy Aura, del equipo de Humo Y Efectos", "Te miro disponibilidad", "Nosotros te lo enviamos").
- NUNCA menciones ni insinúes que eres una IA, inteligencia artificial, bot o asistente virtual. El cliente debe sentir en todo momento que está hablando por chat con una coordinadora humana real de la empresa.

TU OBJETIVO:
1. Resolver dudas de forma cercana, humana, profesional y clara (respuestas breves, naturales y fáciles de leer en móvil, máximo 3-4 frases por turno salvo que pidan detalles concretos).
2. Ayudar a los novios o clientes a **agendar una cita o llamada** o **pre-reservar la fecha de su boda/evento**.

PROMOCIÓN ESPECIAL DE BIENVENIDA (10% DE DESCUENTO):
- Todos los visitantes que registren su email en la ventana emergente pop-up de bienvenida reciben un cupón directo del 10% de descuento (código promocional BODA10MAGIA) aplicable a cualquier servicio o pack de efectos.
- Si el usuario pregunta por descuentos, ofertas o promociones, anímale a usar su cupón del 10% con el código BODA10MAGIA y te dé sus datos para aplicárselo directamente.

CATÁLOGO OFICIAL DE SERVICIOS POR ORDEN DE ESPECIALIDAD:
1. **Cañones de Humo Aéreo Vertical (1 a 9 cañones) - Sbruffo Smoke 40 (Cat. T1)**:
   - Es nuestra especialidad estrella Nº1. Artificio pirotécnico Sbruffo Smoke 40 homologado CE 0163 (Registro 0163-T1-6069, NEC 35g, sonido 115,41 dB a 8m, fabricación 2025 lote COL/MIN/I25/13).
   - Un **único disparo instantáneo** sincronizado que sube a gran velocidad hasta **14,5 a 15 metros de altura**, abre en abanico formando una cúpula espectacular para la foto y **se disipa limpiamente en el aire en pocos segundos**.
   - **Distancias Técnicas de Seguridad (coordinadas por nuestro técnico)**:
     * **Distancia en dirección del efecto (vertical)**: 14,5 metros (altura del chorro en cumbre).
     * **Distancia mínima de seguridad radial**: 3,0 metros perimetrales alrededor del cañón.
     * **Distancia mínima obligatoria al público / personas**: 19 metros.
     * **Servicio con técnico**: Un técnico cualificado de nuestro equipo se desplaza y se encarga de todo el montaje, anclaje y disparo inalámbrico en la finca, garantizando tranquilidad absoluta sin que los novios tengan que preocuparse de normas ni manipulaciones técnicas.
   - **Paleta Oficial de 10 Colores Certificados en Fábrica (Stock Real)**:
     * Disponemos exclusivamente de los 10 colores oficiales de la fotografía de fábrica (Pirotecnica Manna):
       1) Amarillo Gualda / Oro
       2) Naranja Intenso / Terracota
       3) Azul Eléctrico / Zafiro Real (ideal Revelación Niño)
       4) Blanco Puro Nupcial
       5) Verde Esmeralda
       6) Rojo Pasión
       7) Rojo Carmín / Coral
       8) Morado / Violeta Real
       9) Verde Lima / Flúor
       10) Rosa Pastel Nupcial (ideal Revelación Niña)
     * Aclara amablemente al cliente que **no se fabrican ni existen otros colores en existencias** para asegurar la calidad y homologación CE.
   - Incluye opción de **Disparador TNT Retro para Papás** (caja detonadora vintage con palanca para bajar juntos en revelaciones de género).
   - También disponemos de bengalas de mano de activación por anilla (usar con distancia prudente y vigilar viento).

2. **Cañones de Confeti para Bodas, Bailes y Fiestas**:
   - **Confeti de Mariposas de seda**: Troqueladas con forma de mariposas que planean y giran lentamente en el aire en suspensión (30 a 60 segundos). Es el efecto más poético para el primer baile nupcial o la salida del enlace.
   - **Confeti de Papel Blanco Mate**: Crea un auténtico efecto de "lluvia de nieve" pura y romántica.
   - **Confeti Multicolor y Metalizado (Oro y Plata)**: Estallido de gran alcance (8 a 12m) para la apertura de la barra libre o fiesta.
   - 100% biodegradable, ignífugo homologado, no resbala y no mancha suelos ni vestidos. Cañones neumáticos y eléctricos inalámbricos sincronizados por mando.

3. **Máquinas de Chispas Frías (Sparkulars)**:
   - Fuentes verticales de fuego frío de titanio de **2 a 5 metros regulables**.
   - **100% seguras en interior y exterior**: No queman al contacto con la mano, la piel o la ropa, no tienen pólvora, no producen humo ni olor. Autorizadas en el 100% de salones cerrados, fincas históricas y hoteles. De 2 a 8 máquinas sincronizadas por mando para baile, corte de tarta y entradas.

4. **Máquinas de Humo Bajo / Niebla Baja (Vals sobre las Nubes)**:
   - El auténtico vals nupcial flotando en el cielo: combina agua a alta temperatura con hielo seco (CO2 sólido) para crear una nube blanca, densa y pesada que se desliza por el suelo y no sube por encima de las rodillas.
   - **100% limpia y sin riesgo de manchas**: Es puro vapor de agua condensado, por lo que **no mancha trajes oscuros ni vestidos de novia**, no moja y **no activa detectores de humo ni alarmas** en salones cerrados de fincas u hoteles. Cobertura de hasta 120 m² durante los 3 a 5 minutos del vals completo.

5. **Alquiler de Sonido Profesional, Iluminación y Discoteca Móvil con DJ**:
   - Servicio complementario para redondear el evento: alquiler de sonido PA de alta gama para ceremonia y cóctel, microfonía inalámbrica, puentes de luces LED robotizadas y cabina de DJ con discoteca móvil completa para la fiesta.
   - Ideal para clientes que quieren contratar todo el montaje técnico con un único proveedor de confianza, sin perder de vista que somos los Nº1 en efectos y humos.

MODALIDADES Y COBERTURA EN TODA ESPAÑA:
- **Sede Central**: Talavera de la Reina (Toledo). Base operativa y taller de preparación de artificios.
- **Servicio Técnico Prioritario**: Fincas y hoteles de Madrid, Toledo y Zona Centro (Ávila, Guadalajara, Segovia, Cuenca, Ciudad Real, Cáceres) con rápida respuesta y sin suplementos desproporcionados de desplazamiento.
- **Cobertura Nacional Completa en Fincas de España**: Desplazamiento directo de nuestros técnicos titulados a bodas y eventos en cualquier rincón del país (Cataluña, Aragón, Levante, Andalucía, Galicia y Norte).
- **Garantía y Seguridad Absoluta**: NO enviamos los cañones por paquetería para evitar cualquier problema o manipulación indebida; acudimos nosotros en persona para el montaje, anclaje seguro, perímetro y disparo en el segundo exacto.
- Certificación CE Clase T1 y ficha técnica para la finca (autorizado en el 98% de espacios sin permisos engorrosos).
- Teléfono & WhatsApp directo: **+34 600 08 24 62** | Email: **humoyefectos@gmail.com**.

CÓMO CAPTURAR CITAS O RESERVAS:
- Si el usuario quiere reservar fecha, pedir presupuesto o agendar una llamada/cita, pídele con naturalidad los datos que falten:
  1. **Nombre** (y teléfono/WhatsApp de contacto)
  2. **Fecha aproximada del evento** y **Ciudad o Finca**
  3. **Efectos que le gustan** (Humo aéreo, Confeti de mariposas/blanco, Niebla baja de hielo seco, Chispas frías, Sonido/DJ, TNT revelación)
  4. **Preferencia para llamarle o escribirle** (Mañana, Tarde o por WhatsApp).
- Cuando el usuario haya facilitado al menos su nombre o teléfono, o fecha/ciudad con intención de reserva/cita, rellena el objeto \`bookingDraft\` en tu respuesta JSON con los datos recopilados hasta el momento.`;

function buildFallbackResponse(userText: string): {
  reply: string;
  bookingDraft: Partial<BookingRecord> | null;
} {
  const lower = userText.toLowerCase();

  if (lower.includes('mancha') || lower.includes('vestido') || lower.includes('seguro')) {
    return {
      reply:
        'Depende del tipo de efecto y de cómo se coloque: los cañones de humo aéreo profesional se elevan a 12-15 metros y se disipan en el aire limpiamente sin dejar residuos siempre que se respeten las distancias de seguridad (2 a 3 metros) y el viento. Si se disparan muy pegados a los novios o con viento en contra, el pigmento podría rozar la tela, por eso cuidamos siempre la distancia técnica. Si buscáis una alternativa 100% limpia sin ningún riesgo de mancha para el salón, la Niebla Baja de hielo seco con agua caliente genera puro vapor de agua que no mancha, no moja y no activa alarmas. ¿Para qué fecha tenéis pensado vuestro evento?',
      bookingDraft: null,
    };
  }

  if (lower.includes('confeti') || lower.includes('mariposa') || lower.includes('mariposas') || lower.includes('nieve') || lower.includes('papel')) {
    return {
      reply:
        '¡Los cañones de confeti quedan espectaculares! Tenemos el de Mariposas de seda troqueladas (vuelan y planean despacito durante casi un minuto para el vals o salida de novios), el de Papel Blanco mate para efecto lluvia de nieve, y el multicolor/metalizado para romper la pista en la fiesta. Es 100% biodegradable e ignífugo. ¿Te gustaría incluirlo en tu boda o evento?',
      bookingDraft: null,
    };
  }

  if (lower.includes('sonido') || lower.includes('luz') || lower.includes('luces') || lower.includes('dj') || lower.includes('discoteca') || lower.includes('musica') || lower.includes('música')) {
    return {
      reply:
        'Aunque nuestro gran fuerte y especialidad son los efectos de humo y confeti, también alquilamos equipos de sonido PA profesional para ceremonia y cóctel, puentes de iluminación LED robotizada y servicio de discoteca móvil con DJ para la fiesta. Así podéis tener todo el montaje técnico coordinado con un único equipo. ¿Para qué fecha y lugar lo necesitáis?',
      bookingDraft: null,
    };
  }

  if (lower.includes('niebla') || lower.includes('humo bajo') || lower.includes('chispa') || lower.includes('chispas') || lower.includes('baile') || lower.includes('nubes') || lower.includes('frio') || lower.includes('frío')) {
    return {
      reply:
        'Para el primer baile nupcial, la Máquina de Niebla Baja (hielo seco con agua caliente) crea un manto blanco denso a ras de suelo como si flotaseis sobre las nubes: es 100% vapor limpio de agua que no mancha ni moja y no activa detectores de humo. Combinada con fuentes de chispas frías que no queman ni tienen pólvora, queda de película. ¿Queréis que miremos disponibilidad para vuestra fecha?',
      bookingDraft: null,
    };
  }

  if (lower.includes('tnt') || lower.includes('revelacion') || lower.includes('revelación') || lower.includes('bebe') || lower.includes('bebé')) {
    return {
      reply:
        '¡El Pack de Revelación de Género con Disparador TNT Retro es súper emocionante! Acudimos nosotros en persona o un técnico de nuestro equipo directamente a la finca con la caja TNT vintage y los cañones sorpresa codificados (hablamos en secreto con vuestro cómplice o ginecólogo). Los futuros papás bajan la palanca juntos y el cielo estalla a 15 metros en rosa o azul. ¿Para qué fecha lo tenéis previsto?',
      bookingDraft: null,
    };
  }

  if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('cuánto') || lower.includes('presupuesto') || lower.includes('pack')) {
    return {
      reply:
        'Te preparamos el presupuesto a medida según lo que elijas: 1. Cañones de humo aéreo (1 a 9), 2. Confeti de mariposas/blanco, 3. Niebla baja de hielo seco, 4. Chispas frías, o 5. Sonido y luces con discoteca móvil. Dime la fecha de tu evento, ciudad/finca y tu teléfono, o pulsa en "Agendar Cita / Evento" y te llamamos.',
      bookingDraft: null,
    };
  }

  if (lower.includes('descuento') || lower.includes('cupon') || lower.includes('cupón') || lower.includes('oferta') || lower.includes('promocion') || lower.includes('promoción') || lower.includes('codigo') || lower.includes('código')) {
    return {
      reply:
        '¡Sí! Tenemos activo un cupón del 10% de descuento registrando tu email al entrar en la web (o indicando el código BODA10MAGIA). Si me dices tu nombre, fecha y ciudad, te lo aplico directamente en tu presupuesto personalizado. ¿Para cuándo tenéis el evento?',
      bookingDraft: null,
    };
  }

  if (lower.includes('cita') || lower.includes('reservar') || lower.includes('reserva') || lower.includes('llamar') || lower.includes('disponibilidad')) {
    return {
      reply:
        '¡Claro que sí! Te bloqueo la disponibilidad de tu fecha o agendamos una llamada. Déjame por aquí tu nombre, fecha del evento, ciudad/finca y teléfono, o rellena la pestaña "Agendar Cita / Evento" de aquí arriba en un momento.',
      bookingDraft: null,
    };
  }

  return {
    reply:
      '¡Hola! Soy Aura, del equipo de Humo Y Efectos. Cuéntame qué duda tienes sobre nuestros 1. Cañones de Humo Aéreo (1 a 9 cañones a 15m), 2. Confeti de Mariposas o Blanco, 3. Niebla Baja sobre las Nubes, 4. Chispas Frías, o 5. Alquiler de Sonido y Luces, o dime tu fecha para mirarte disponibilidad.',
    bookingDraft: null,
  };
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body as { messages: ChatMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Mensajes inválidos' });
      return;
    }

    const lastUserMessage = messages[messages.length - 1]?.text || '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.json(buildFallbackResponse(lastUserMessage));
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description:
                'Respuesta amable, clara y concisa en español para mostrar al usuario en el chat.',
            },
            hasBookingIntent: {
              type: Type.BOOLEAN,
              description:
                'True si el usuario ya ha proporcionado datos concretos para una cita o reserva (como nombre, teléfono, o fecha + ciudad con intención de reservar).',
            },
            bookingDraft: {
              type: Type.OBJECT,
              description:
                'Datos extraídos de la conversación si el usuario quiere agendar cita o reservar evento.',
              properties: {
                nombre: { type: Type.STRING },
                telefono: { type: Type.STRING },
                fechaEvento: { type: Type.STRING },
                ciudadFinca: { type: Type.STRING },
                tipoEvento: { type: Type.STRING },
                efectos: { type: Type.STRING },
                horarioCita: { type: Type.STRING },
                notas: { type: Type.STRING },
              },
            },
          },
          required: ['reply', 'hasBookingIntent'],
        },
      },
    });

    const rawText = response.text || '';
    try {
      const parsed = JSON.parse(rawText);
      res.json({
        reply: parsed.reply || buildFallbackResponse(lastUserMessage).reply,
        bookingDraft: parsed.hasBookingIntent ? parsed.bookingDraft || null : null,
      });
    } catch {
      res.json({
        reply: rawText || buildFallbackResponse(lastUserMessage).reply,
        bookingDraft: null,
      });
    }
  } catch (error) {
    console.error('Error en /api/chat:', error);
    const lastUserMessage =
      Array.isArray(req.body?.messages) && req.body.messages.length > 0
        ? req.body.messages[req.body.messages.length - 1].text
        : '';
    res.json(buildFallbackResponse(lastUserMessage));
  }
});

const rawAdminEmail = process.env.ADMIN_EMAIL;
const OWNER_EMAIL =
  rawAdminEmail && rawAdminEmail.includes('@')
    ? rawAdminEmail.trim()
    : 'humoyefectos@gmail.com';

interface SmtpSettings {
  user?: string;
  pass?: string;
  host?: string;
  port?: number;
}

function getSmtpSettings(): SmtpSettings {
  try {
    if (fs.existsSync(SMTP_CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(SMTP_CONFIG_FILE, 'utf-8'));
      if (data?.user && data?.pass) {
        return {
          user: String(data.user).trim(),
          pass: String(data.pass).trim().replace(/\s+/g, ''),
          host: data.host ? String(data.host).trim() : undefined,
          port: data.port ? parseInt(String(data.port), 10) : undefined,
        };
      }
    }
  } catch (err) {
    console.error('Error reading SMTP_CONFIG_FILE:', err);
  }

  const envUser = process.env.SMTP_USER;
  const envPass = process.env.SMTP_PASS;
  if (envUser && envPass) {
    return {
      user: envUser.trim(),
      pass: envPass.trim().replace(/\s+/g, ''),
      host: process.env.SMTP_HOST?.trim(),
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
    };
  }

  return {};
}

function createTransporter() {
  const { user, pass, host, port } = getSmtpSettings();

  if (user && pass) {
    // If Gmail user or host includes gmail
    if (user.endsWith('@gmail.com') || (host && host.includes('gmail'))) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    }

    return nodemailer.createTransport({
      host: host || 'smtp.gmail.com',
      port: port || 587,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    jsonTransport: true,
  });
}

async function sendBookingEmailNotification(booking: BookingRecord) {
  try {
    const transporter = createTransporter();
    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #09090b 0%, #1e1b4b 100%); padding: 24px; border-radius: 12px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #38bdf8;">HUMO Y EFECTOS</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #bae6fd; font-weight: bold;">¡NUEVA SOLICITUD DE RESERVA / CITA · ${booking.id}!</p>
        </div>
        <div style="padding: 24px 0;">
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f3f4f6; background-color: #f0f9ff;">
              <td style="padding: 12px 14px; font-weight: bold; color: #0369a1; width: 40%;">ID Reserva:</td>
              <td style="padding: 12px 14px; font-weight: 900; color: #0284c7; font-family: monospace;">${booking.id}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Nombre / Pareja:</td>
              <td style="padding: 12px 14px; font-weight: bold; color: #111827;">${booking.nombre || 'No indicado'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Teléfono / WhatsApp:</td>
              <td style="padding: 12px 14px; color: #111827;">
                ${
                  booking.telefono
                    ? `<a href="https://wa.me/34${booking.telefono.replace(/[^0-9]/g, '')}" style="color: #059669; font-weight: bold; text-decoration: none;">${booking.telefono} 💬 (Escribir por WhatsApp)</a>`
                    : '<span style="color: #9ca3af;">No indicado</span>'
                }
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Fecha del Evento:</td>
              <td style="padding: 12px 14px; color: #111827; font-weight: 600;">${booking.fechaEvento || 'Por definir'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Ciudad o Finca:</td>
              <td style="padding: 12px 14px; color: #111827;">${booking.ciudadFinca || 'No indicada'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Tipo de Evento:</td>
              <td style="padding: 12px 14px; color: #111827;">${booking.tipoEvento || 'Boda'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Efectos Deseados:</td>
              <td style="padding: 12px 14px; color: #111827;">${booking.efectos || 'Humo Aéreo'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Horario de Contacto:</td>
              <td style="padding: 12px 14px; color: #111827;">${booking.horarioCita || 'Cualquiera'}</td>
            </tr>
            ${
              booking.notas
                ? `<tr><td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Notas:</td><td style="padding: 12px 14px; color: #111827;">${booking.notas}</td></tr>`
                : ''
            }
          </table>
        </div>
        <div style="background-color: #f9fafb; padding: 14px; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #6b7280;">Aviso automático remitido a <strong>${OWNER_EMAIL}</strong>.</p>
        </div>
      </div>
    `;

    // 1. Direct Webhook Delivery to humoyefectos@gmail.com with CC to jonielterrible@gmail.com
    try {
      await fetch('https://formsubmit.co/ajax/humoyefectos@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `📅 [Nueva Reserva/Cita] ${booking.nombre || 'Cliente'} (${booking.fechaEvento || 'Fecha pendiente'})`,
          _cc: 'jonielterrible@gmail.com',
          _captcha: 'false',
          _template: 'table',
          ID_RESERVA: booking.id,
          TIPO_GESTION: booking.tipoGestion,
          NOMBRE: booking.nombre,
          TELEFONO: booking.telefono,
          FECHA_EVENTO: booking.fechaEvento,
          CIUDAD_FINCA: booking.ciudadFinca,
          TIPO_EVENTO: booking.tipoEvento,
          EFECTOS: booking.efectos,
          HORARIO_CITA: booking.horarioCita || 'Cualquiera',
          NOTAS: booking.notas || 'Ninguna',
          WHATSAPP_DIRECTO: booking.telefono ? `https://wa.me/34${booking.telefono.replace(/[^0-9]/g, '')}` : 'No disponible',
          FECHA_REGISTRO: new Date(booking.createdAt).toLocaleString('es-ES'),
        }),
      });
      console.log(`[FormSubmit Reserva enviada a ${OWNER_EMAIL} y jonielterrible@gmail.com]: ${booking.id}`);
    } catch (fsErr) {
      console.error('Error enviando reserva por FormSubmit:', fsErr);
    }

    // 2. Transporter sendMail (if SMTP configured)
    await transporter.sendMail({
      from: `"Humo Y Efectos Reservas" <humoyefectos@gmail.com>`,
      to: OWNER_EMAIL,
      subject: `📅 [Nueva Reserva/Cita] ${booking.nombre || 'Cliente'} (${booking.fechaEvento || 'Fecha pendiente'})`,
      html,
      text: `Nueva Solicitud de Reserva:\nID: ${booking.id}\nNombre: ${booking.nombre}\nTel: ${booking.telefono}\nFecha: ${booking.fechaEvento}\nFinca: ${booking.ciudadFinca}\nEfectos: ${booking.efectos}`,
    });
    console.log(`[Email enviado a ${OWNER_EMAIL}] Reserva: ${booking.id}`);
  } catch (err) {
    console.error('Error enviando email de reserva:', err);
  }
}

app.post('/api/bookings', async (req, res) => {
  const {
    tipoGestion = 'reserva_evento',
    nombre = '',
    telefono = '',
    fechaEvento = '',
    ciudadFinca = '',
    tipoEvento = 'Boda',
    efectos = 'Humo Aéreo de Colores',
    horarioCita = 'Cualquier horario',
    notas = '',
  } = req.body || {};

  const code = `HYE-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking: BookingRecord = {
    id: code,
    createdAt: new Date().toISOString(),
    tipoGestion,
    nombre,
    telefono,
    fechaEvento,
    ciudadFinca,
    tipoEvento,
    efectos,
    horarioCita,
    notas,
  };

  bookingsStore.unshift(newBooking);
  saveJsonFile(BOOKINGS_FILE, bookingsStore);
  sendBookingEmailNotification(newBooking).catch(console.error);

  res.json({ ok: true, booking: newBooking });
});

app.get('/api/bookings', (_req, res) => {
  res.json({ bookings: bookingsStore });
});

async function sendLeadEmailNotification(lead: DiscountLeadRecord) {
  try {
    const transporter = createTransporter();

    const htmlContent = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #09090b 0%, #881337 100%); padding: 24px; border-radius: 12px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #f43f5e;">HUMO Y EFECTOS</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #fecdd3; font-weight: bold;">¡NUEVO CONTACTO REGISTRADO · CUPÓN 10% ACTIVADO!</p>
        </div>

        <div style="padding: 24px 0;">
          <p style="font-size: 15px; color: #1f2937; line-height: 1.5; margin-top: 0;">
            Un visitante ha introducido sus datos en la web y ha generado su cupón de descuento oficial del <strong>10%</strong>:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f3f4f6; background-color: #fff1f2;">
              <td style="padding: 12px 14px; font-weight: bold; color: #9f1239; width: 40%;">Código Cupón 10%:</td>
              <td style="padding: 12px 14px; font-weight: 900; color: #e11d48; font-family: monospace; font-size: 17px;">${lead.couponCode}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Email del Cliente:</td>
              <td style="padding: 12px 14px; font-weight: bold; color: #111827;">
                <a href="mailto:${lead.email}" style="color: #e11d48; text-decoration: none;">${lead.email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Nombre / Pareja:</td>
              <td style="padding: 12px 14px; color: #111827; font-weight: 600;">${lead.name || 'No especificado'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Teléfono / WhatsApp:</td>
              <td style="padding: 12px 14px; color: #111827;">
                ${
                  lead.phone
                    ? `<a href="https://wa.me/34${lead.phone.replace(/[^0-9]/g, '')}" style="color: #059669; font-weight: bold; text-decoration: none;">${lead.phone} 💬 (Escribir por WhatsApp)</a>`
                    : '<span style="color: #9ca3af;">No especificado</span>'
                }
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Tipo de Celebración:</td>
              <td style="padding: 12px 14px; color: #111827; font-weight: 600;">${lead.eventType || 'Boda Nupcial'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Aceptación Términos & Info Constante:</td>
              <td style="padding: 12px 14px; color: #059669; font-weight: 700;">
                ✓ Aceptado explícitamente en el pop-up (Envío constante de información y ofertas)
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; font-weight: bold; color: #4b5563;">Fecha y Hora:</td>
              <td style="padding: 12px 14px; color: #6b7280;">${new Date(lead.createdAt).toLocaleString('es-ES')}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f9fafb; padding: 14px; border-radius: 10px; text-align: center; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            Aviso automático remitido a <strong>${OWNER_EMAIL}</strong> y registrado en el sistema de Humo Y Efectos.
          </p>
        </div>
      </div>
    `;

    // 1. Direct Webhook Delivery to humoyefectos@gmail.com with CC to jonielterrible@gmail.com
    try {
      const formSubmitPayload = {
        _subject: `🎉 [Nuevo Lead 10%] ${lead.name || 'Cliente'} (${lead.email}) · Código: ${lead.couponCode}`,
        _cc: 'jonielterrible@gmail.com',
        _replyto: lead.email,
        _captcha: 'false',
        _template: 'table',
        CODIGO_CUPON_10_DESCUENTO: lead.couponCode,
        EMAIL_CLIENTE: lead.email,
        NOMBRE_O_PAREJA: lead.name || 'No especificado',
        TELEFONO_WHATSAPP: lead.phone || 'No especificado',
        TIPO_DE_EVENTO: lead.eventType || 'Boda Nupcial',
        WHATSAPP_DIRECTO: lead.phone ? `https://wa.me/34${lead.phone.replace(/[^0-9]/g, '')}` : 'No especificado',
        ACEPTA_INFORMACION_Y_OFERTAS: 'SÍ (Aceptado expresamente en el pop-up)',
        FECHA_HORA_REGISTRO: new Date(lead.createdAt).toLocaleString('es-ES'),
      };

      await fetch('https://formsubmit.co/ajax/humoyefectos@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://humoyefectos.es',
          'Referer': 'https://humoyefectos.es',
        },
        body: JSON.stringify(formSubmitPayload),
      });
      console.log(`[FormSubmit enviado con éxito a ${OWNER_EMAIL} y jonielterrible@gmail.com] Lead: ${lead.email}`);
    } catch (fsErr) {
      console.error('Error enviando lead por FormSubmit:', fsErr);
    }

    // 2. SMTP Transporter Delivery
    const { user } = getSmtpSettings();
    const sender = user || 'humoyefectos@gmail.com';

    await transporter.sendMail({
      from: `"Humo Y Efectos Leads" <${sender}>`,
      to: OWNER_EMAIL,
      subject: `🎉 [Nuevo Lead 10%] ${lead.name ? `${lead.name} · ` : ''}${lead.email} (Cupón: ${lead.couponCode})`,
      html: htmlContent,
      text: `Nuevo Lead Registrado en Humo Y Efectos:\nEmail: ${lead.email}\nNombre: ${lead.name || 'No indicado'}\nTeléfono: ${lead.phone || 'No indicado'}\nEvento: ${lead.eventType}\nCupón 10%: ${lead.couponCode}\nAcepta Información: SÍ\nFecha: ${new Date(lead.createdAt).toLocaleString('es-ES')}`,
    });

    console.log(`[Email enviado a ${OWNER_EMAIL}] Lead: ${lead.email}`);
    return { ok: true };
  } catch (err: any) {
    console.error('Error al enviar notificación de lead por email:', err);
    return { ok: false, error: err.message };
  }
}

async function sendCustomerCouponEmail(lead: DiscountLeadRecord) {
  try {
    const transporter = createTransporter();
    const { user } = getSmtpSettings();
    const sender = user || 'humoyefectos@gmail.com';

    const customerHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid #27272a;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #27272a;">
          <h1 style="color: #f43f5e; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: 900;">HUMO Y EFECTOS</h1>
          <p style="color: #fb7185; font-size: 12px; margin: 6px 0 0 0; font-weight: bold; text-transform: uppercase;">Especialistas en Efectos Especiales para Bodas y Eventos</p>
        </div>
        
        <div style="padding: 24px 0; text-align: center;">
          <div style="display: inline-block; background-color: rgba(244,63,94,0.15); color: #fda4af; border: 1px solid rgba(244,63,94,0.3); padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
            ✓ Cupón Oficial Activado
          </div>
          <h2 style="font-size: 24px; color: #ffffff; margin: 16px 0 8px 0; font-weight: 800;">
            ¡Aquí tienes tu 10% de Descuento!
          </h2>
          <p style="font-size: 14px; color: #d4d4d8; line-height: 1.6; max-width: 480px; margin: 0 auto 20px auto;">
            Hola <strong>${lead.name || 'pareja'}</strong>, hemos registrado tu cupón exclusivo para tu <strong>${lead.eventType || 'celebración'}</strong>.
            Preséntalo o indícalo al solicitar tu presupuesto:
          </p>

          <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border: 2px dashed #f43f5e; border-radius: 16px; padding: 20px; max-width: 360px; margin: 0 auto 24px auto;">
            <p style="color: #a1a1aa; font-size: 11px; text-transform: uppercase; margin: 0 0 6px 0; font-weight: bold;">Tu Código de Descuento 10%:</p>
            <div style="font-family: monospace; font-size: 30px; font-weight: 900; color: #fb7185; letter-spacing: 3px;">
              ${lead.couponCode}
            </div>
            <p style="color: #34d399; font-size: 12px; font-weight: bold; margin: 8px 0 0 0;">★ 10% de Descuento Directo Aplicado ★</p>
          </div>

          <div style="text-align: left; background-color: #18181b; padding: 18px; border-radius: 12px; margin-bottom: 24px; font-size: 13px; color: #e4e4e7; border: 1px solid #27272a;">
            <p style="color: #fb7185; font-weight: bold; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase;">Válido en todos nuestros servicios oficiales:</p>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
              <li><strong>Cañones de Humo Aéreo Vertical:</strong> 1 a 9 cañones a 15 metros (disparo instantáneo limpio).</li>
              <li><strong>Cañones de Confeti:</strong> Mariposas de seda para el primer baile y lluvia de nieve blanca.</li>
              <li><strong>Máquinas de Humo Bajo (Hielo Seco):</strong> Vals sobre las nubes, no mancha vestidos ni moja.</li>
              <li><strong>Máquinas de Chispas Frías (Sparkulars):</strong> Fuego frío seguro y autorizado en salones interiores.</li>
              <li><strong>Sonido, Luces & Discoteca Móvil con DJ:</strong> Montaje completo para ceremonia y fiesta.</li>
            </ul>
          </div>

          <div style="margin-top: 10px;">
            <a href="https://wa.me/34600082462?text=${encodeURIComponent(
              `¡Hola Humo Y Efectos! 👋 Me acabo de registrar en vuestra web con el email ${lead.email} y quiero aplicar mi CUPÓN DEL 10% DE DESCUENTO (CÓDIGO: ${lead.couponCode}) para mi ${lead.eventType || 'boda'}.\n\n¿Podríais confirmarme disponibilidad y presupuesto? ¡Gracias!`
            )}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 15px rgba(16,185,129,0.35);">
              💬 Canjear 10% por WhatsApp (+34 600 08 24 62)
            </a>
          </div>
        </div>

        <div style="border-top: 1px solid #27272a; padding-top: 16px; text-align: center; font-size: 11px; color: #71717a;">
          <p style="margin: 0 0 4px 0;">Humo Y Efectos · Homologación CE Clase T1 · Cobertura y envíos en 24/48h a toda España</p>
          <p style="margin: 0;">Email: humoyefectos@gmail.com · Teléfono & WhatsApp: +34 600 08 24 62</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Humo Y Efectos" <${sender}>`,
      to: lead.email,
      subject: `🎁 ¡Tu Cupón del 10% de Descuento para tu Evento! (${lead.couponCode}) · Humo Y Efectos`,
      html: customerHtml,
      text: `¡Hola ${lead.name || 'pareja'}!\n\nAquí tienes tu cupón oficial del 10% de descuento para tu ${lead.eventType || 'celebración'}.\n\nCÓDIGO: ${lead.couponCode}\n\nPuedes canjearlo directamente por WhatsApp al +34 600 08 24 62 o respondiendo a este email.\n\nHumo Y Efectos · www.humoyefectos.es`,
    });

    console.log(`[Email cupón enviado al cliente ${lead.email}]:`, info.messageId || 'OK');
    return { ok: true };
  } catch (err: any) {
    console.error(`Error enviando email de cupón al cliente ${lead.email}:`, err);
    return { ok: false, error: err.message };
  }
}

// Endpoint to check in real time if an email already exists in the database
app.get('/api/discount-leads/check', (req, res) => {
  const queryEmail = String(req.query.email || '').trim().toLowerCase();
  if (!queryEmail || !queryEmail.includes('@')) {
    res.json({ exists: false });
    return;
  }

  const existingLead = discountLeadsStore.find(
    (l) => l.email && l.email.trim().toLowerCase() === queryEmail
  );

  if (existingLead) {
    res.json({
      exists: true,
      email: existingLead.email,
      couponCode: existingLead.couponCode,
      createdAt: existingLead.createdAt,
    });
    return;
  }

  res.json({ exists: false });
});

app.post('/api/discount-leads', async (req, res) => {
  const { email, name, phone, eventType, couponCode } = req.body || {};
  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Email inválido' });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const existingLead = discountLeadsStore.find(
    (l) => l.email && l.email.trim().toLowerCase() === normalizedEmail
  );

  if (existingLead) {
    console.warn(`[Intento de duplicado bloqueado]: ${normalizedEmail} ya estaba registrado con cupón ${existingLead.couponCode}`);
    res.status(409).json({
      ok: false,
      alreadyRegistered: true,
      error: 'Este correo electrónico ya está registrado en nuestra base de datos y ya ha recibido su cupón de descuento.',
      couponCode: existingLead.couponCode,
      createdAt: existingLead.createdAt,
    });
    return;
  }

  const { acceptedTermsAndMarketing = true } = req.body || {};

  const newLead: DiscountLeadRecord = {
    id: `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    email: String(email).trim(),
    name: name ? String(name).trim() : undefined,
    phone: phone ? String(phone).trim() : undefined,
    eventType: eventType ? String(eventType).trim() : 'Boda Nupcial',
    couponCode: couponCode ? String(couponCode).trim() : 'BODA10MAGIA',
    acceptedTermsAndMarketing: Boolean(acceptedTermsAndMarketing),
  };

  discountLeadsStore.unshift(newLead);
  saveJsonFile(LEADS_FILE, discountLeadsStore);
  syncCsvDatabase();
  console.log(`[Lead 10% Capturado]: ${newLead.email} - Acepta Términos/Marketing: ${newLead.acceptedTermsAndMarketing} - Cupón: ${newLead.couponCode}`);

  // Send BOTH emails: 1 to admin (humoyefectos@gmail.com) and 1 to customer (newLead.email)
  Promise.allSettled([
    sendLeadEmailNotification(newLead),
    sendCustomerCouponEmail(newLead),
  ]).catch((e) => console.error('Error enviando emails de lead:', e));

  res.json({ ok: true, lead: newLead });
});

app.get('/api/discount-leads', (_req, res) => {
  res.json({ leads: discountLeadsStore, total: discountLeadsStore.length });
});

// Excel & Google Sheets Database Export Endpoints
app.get('/api/leads/export.csv', (_req, res) => {
  syncCsvDatabase();
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="base_de_datos_humoyefectos_leads.csv"');
  res.sendFile(LEADS_CSV_FILE);
});

app.get('/api/leads/google-sheets.csv', (_req, res) => {
  syncCsvDatabase();
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.sendFile(LEADS_CSV_FILE);
});

app.delete('/api/discount-leads/:id', (req, res) => {
  const { id } = req.params;
  const index = discountLeadsStore.findIndex((l) => l.id === id);
  if (index !== -1) {
    discountLeadsStore.splice(index, 1);
    saveJsonFile(LEADS_FILE, discountLeadsStore);
    syncCsvDatabase();
    res.json({ ok: true, deleted: id });
  } else {
    res.status(404).json({ error: 'Lead no encontrado' });
  }
});

// Re-send emails for an existing lead
app.post('/api/resend-lead-email/:id', async (req, res) => {
  const { id } = req.params;
  const lead = discountLeadsStore.find((l) => l.id === id);
  if (!lead) {
    res.status(404).json({ error: 'Lead no encontrado' });
    return;
  }

  const [adminResult, customerResult] = await Promise.all([
    sendLeadEmailNotification(lead),
    sendCustomerCouponEmail(lead),
  ]);

  res.json({ ok: true, adminResult, customerResult });
});

// SMTP Configuration endpoints
app.get('/api/smtp-config', (_req, res) => {
  const settings = getSmtpSettings();
  res.json({
    configured: Boolean(settings.user && settings.pass),
    user: settings.user || '',
    host: settings.host || 'smtp.gmail.com',
    ownerEmail: OWNER_EMAIL,
  });
});

app.post('/api/smtp-config', async (req, res) => {
  const { user, pass, host = 'smtp.gmail.com', port = 465 } = req.body || {};
  if (!user || !pass) {
    res.status(400).json({ error: 'Usuario (email) y contraseña de aplicación requeridos' });
    return;
  }

  const cleanPass = String(pass).trim().replace(/\s+/g, '');
  const cleanUser = String(user).trim();

  // Test credentials with nodemailer
  try {
    const testTransporter = nodemailer.createTransport(
      cleanUser.endsWith('@gmail.com') || host.includes('gmail')
        ? {
            service: 'gmail',
            auth: { user: cleanUser, pass: cleanPass },
          }
        : {
            host,
            port: parseInt(String(port), 10) || 587,
            secure: port === 465,
            auth: { user: cleanUser, pass: cleanPass },
          }
    );

    await testTransporter.verify();

    // Save to disk
    saveJsonFile(SMTP_CONFIG_FILE, {
      user: cleanUser,
      pass: cleanPass,
      host,
      port,
      verifiedAt: new Date().toISOString(),
    });

    // Send a welcome test email to owner
    await testTransporter.sendMail({
      from: `"Humo Y Efectos" <${cleanUser}>`,
      to: OWNER_EMAIL,
      subject: '✅ [Verificación Exitosa] Sistema de Notificaciones Humo Y Efectos Conectado',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; color: #111827; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #059669; margin-top: 0;">¡Conexión Gmail SMTP Verificada con Éxito!</h2>
          <p>Tu sistema de <strong>Humo Y Efectos</strong> ahora enviará automáticamente:</p>
          <ul>
            <li>El cupón del 10% en formato email a cada cliente que se registre.</li>
            <li>La notificación completa con los datos del nuevo lead directamente a <strong>${OWNER_EMAIL}</strong>.</li>
          </ul>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Fecha: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      `,
    });

    res.json({ ok: true, message: 'Conexión verificada y guardada. Se ha enviado un email de prueba.' });
  } catch (err: any) {
    console.error('Error verificando credenciales SMTP:', err);
    res.status(400).json({
      error: `Error al conectar con Gmail: ${err.message || 'Verifica que la contraseña de aplicación de 16 caracteres sea correcta.'}`,
    });
  }
});

app.post('/api/send-test-email', async (req, res) => {
  const { targetEmail } = req.body || {};
  const recipient = targetEmail && targetEmail.includes('@') ? targetEmail.trim() : OWNER_EMAIL;

  const { user, pass } = getSmtpSettings();
  if (!user || !pass) {
    res.status(400).json({
      error: 'SMTP no está configurado aún. Introduce tu email y contraseña de aplicación de Google en el panel de configuración.',
      configured: false,
    });
    return;
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Humo Y Efectos Test" <${user}>`,
      to: recipient,
      subject: '🧪 [Prueba de Envío] Test de Correo desde Humo Y Efectos',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #09090b; color: #ffffff; border-radius: 12px;">
          <h2 style="color: #f43f5e; margin-top: 0;">¡Prueba de Envío Exitosa!</h2>
          <p>Este correo confirma que el servidor de <strong>Humo Y Efectos</strong> puede enviar correos reales por internet sin problemas.</p>
          <p>Destinatario: <strong>${recipient}</strong></p>
          <p style="color: #71717a; font-size: 12px;">Hora: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      `,
    });

    res.json({ ok: true, message: `Email de prueba enviado con éxito a ${recipient}` });
  } catch (err: any) {
    res.status(500).json({ error: `Error enviando prueba: ${err.message}` });
  }
});

app.get('/api/system-status', (_req, res) => {
  const settings = getSmtpSettings();
  const hasSmtp = Boolean(settings.user && settings.pass);
  res.json({
    ownerEmail: OWNER_EMAIL,
    smtpConfigured: hasSmtp,
    smtpUser: settings.user || '',
    smtpHost: settings.host || (hasSmtp ? 'Gmail Oficial' : 'Sin configurar (modo local seguro)'),
    totalLeads: discountLeadsStore.length,
    totalBookings: bookingsStore.length,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Humo Y Efectos server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
