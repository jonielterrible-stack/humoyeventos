import { jsPDF } from 'jspdf';

export interface CouponPdfData {
  couponCode: string;
  email: string;
  name?: string;
  phone?: string;
  eventType?: string;
  discountPercent?: number;
}

/**
 * =========================================================================
 * ⚙️ PANEL DE CONFIGURACIÓN DEL CUPÓN (EDITA AQUÍ TUS TEXTOS FÁCILMENTE)
 * =========================================================================
 * Puedes modificar cualquiera de los textos o teléfonos de abajo entre comillas.
 * Los datos del usuario (Nombre, Email, Teléfono y CÓDIGO ÚNICO) se insertarán
 * automáticamente en cada descarga sin peligro de romper nada.
 */
export const COUPON_CONFIG = {
  // 1. Textos del Encabezado
  empresaNombre: 'HUMO Y EFECTOS',
  empresaSubtitulo: 'ESPECIALISTAS N.º 1 EN ESPAÑA · EFECTOS ESPECIALES PARA BODAS Y EVENTOS',
  tituloCertificado: 'CERTIFICADO OFICIAL DE CUPÓN · 10% DE DESCUENTO',

  // 2. Recuadro del Código de Descuento
  etiquetaCodigo: 'CÓDIGO EXCLUSIVO DE DESCUENTO:',
  textoValidez: '• VÁLIDO PARA UN 10% DE DESCUENTO DIRECTO EN TU PRESUPUESTO •',

  // 3. Columna Izquierda (Datos del titular)
  etiquetaTitular: 'DATOS DEL TITULAR DEL CUPÓN:',

  // 4. Columna Derecha (Lista de servicios cubiertos)
  etiquetaServicios: 'SERVICIOS INCLUIDOS EN LA PROMOCIÓN:',
  servicios: [
    '1. Cañones de Humo Aéreo Vertical (1 a 9 cañones a 15m)',
    '2. Cañones de Confeti (Mariposas de seda, Nieve blanca, Fiesta)',
    '3. Máquinas de Humo Bajo / Niebla Baja (Vals sobre las Nubes)',
    '4. Fuentes de Chispas Frías Sparkulars (Fuego frío que no quema)',
    '5. Alquiler de Sonido Profesional, Iluminación LED & Discoteca DJ',
  ],

  // 5. Caja Inferior "¿Cómo Canjear?"
  tituloCanjear: '¿CÓMO CANJEAR TU CUPÓN DEL 10%?',
  instruccionesCanjear: 'Indica tu código al solicitar presupuesto por WhatsApp al 600 08 24 62 o por email.',
  contactoCanjear: 'Contacto oficial: WhatsApp: +34 600 08 24 62 · Email: humoyefectos@gmail.com · Web: humoyefectos.es',

  // 6. Pie de Página Legal y Homologación
  pieLegal: 'Homologación Oficial CE Clase T1 · Cobertura y envíos en 24/48h a toda España · Sede Talavera De La Reina',
};

/**
 * Generates an artistic aerial smoke background on a pure white canvas
 * Featuring colorful, soft ethereal smoke clouds (pink, turquoise, gold, violet)
 * billowing softly along the borders while keeping the center clean for typography.
 */
function createSmokeBackground(): string | null {
  try {
    if (typeof document === 'undefined') return null;

    const width = 1260;
    const height = 888;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Crisp White Base with subtle pearl gradient
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Subtle radial luminescence in center
    const centerGlow = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width * 0.7);
    centerGlow.addColorStop(0, '#FFFFFF');
    centerGlow.addColorStop(0.65, '#FAFBFC');
    centerGlow.addColorStop(1, '#F1F5F9');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, width, height);

    // 2. Artistic Aerial Smoke Clouds (Specialty of Humo Y Efectos)
    // Soft, organic swirling clouds in signature aerial smoke colors
    const smokePuffs = [
      // Top-Left Aerial Cloud (Rose & Pink)
      { x: 130, y: 110, rad: 230, r: 244, g: 63, b: 94, a: 0.18 }, // Rose
      { x: 210, y: 170, rad: 190, r: 236, g: 72, b: 153, a: 0.15 }, // Fuchsia
      { x: 90, y: 240, rad: 160, r: 14, g: 165, b: 233, a: 0.14 }, // Sky Blue

      // Top-Right Aerial Cloud (Violet & Fuchsia)
      { x: width - 130, y: 120, rad: 240, r: 139, g: 92, b: 246, a: 0.17 }, // Violet
      { x: width - 210, y: 190, rad: 180, r: 236, g: 72, b: 153, a: 0.14 }, // Pink
      { x: width - 100, y: 250, rad: 160, r: 245, g: 158, b: 11, a: 0.13 }, // Amber

      // Bottom-Left Aerial Cloud (Emerald & Turquoise)
      { x: 140, y: height - 120, rad: 230, r: 16, g: 185, b: 129, a: 0.15 }, // Emerald
      { x: 230, y: height - 170, rad: 180, r: 14, g: 165, b: 233, a: 0.14 }, // Turquoise
      { x: 90, y: height - 230, rad: 150, r: 244, g: 63, b: 94, a: 0.12 }, // Soft Rose

      // Bottom-Right Aerial Cloud (Gold & Rose)
      { x: width - 150, y: height - 130, rad: 240, r: 244, g: 63, b: 94, a: 0.17 }, // Rose
      { x: width - 240, y: height - 180, rad: 190, r: 245, g: 158, b: 11, a: 0.15 }, // Gold
      { x: width - 110, y: height - 250, rad: 160, r: 139, g: 92, b: 246, a: 0.13 }, // Violet

      // Delicate top & bottom rim vapor accents
      { x: width * 0.28, y: 55, rad: 140, r: 245, g: 158, b: 11, a: 0.11 },
      { x: width * 0.72, y: 55, rad: 140, r: 14, g: 165, b: 233, a: 0.11 },
      { x: width * 0.35, y: height - 60, rad: 150, r: 244, g: 63, b: 94, a: 0.11 },
      { x: width * 0.65, y: height - 60, rad: 150, r: 16, g: 185, b: 129, a: 0.11 },
    ];

    smokePuffs.forEach((puff) => {
      const grad = ctx.createRadialGradient(puff.x, puff.y, 8, puff.x, puff.y, puff.rad);
      grad.addColorStop(0, `rgba(${puff.r}, ${puff.g}, ${puff.b}, ${puff.a})`);
      grad.addColorStop(0.5, `rgba(${puff.r}, ${puff.g}, ${puff.b}, ${puff.a * 0.65})`);
      grad.addColorStop(0.85, `rgba(${puff.r}, ${puff.g}, ${puff.b}, ${puff.a * 0.2})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(puff.x, puff.y, puff.rad, 0, Math.PI * 2);
      ctx.fill();
    });

    return canvas.toDataURL('image/jpeg', 0.94);
  } catch {
    return null;
  }
}

export function generateCouponPdf(data: CouponPdfData): jsPDF {
  // A5 Landscape: 210mm x 148mm (Standard luxury voucher certificate)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a5',
  });

  const pageWidth = 210;
  const pageHeight = 148;
  const discount = data.discountPercent || 10;

  // 1. BASE BACKGROUND: Pure White
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. AERIAL SMOKE EFFECT IN THE BACKGROUND
  const smokeBgData = createSmokeBackground();
  if (smokeBgData) {
    try {
      doc.addImage(smokeBgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    } catch {
      // Fallback to pure white if canvas image fails
    }
  }

  // 3. ELEGANT DOUBLE LUXURY BORDER (Perfect square framing without sticking out)
  // Outer Rose-Gold Border
  doc.setDrawColor(225, 29, 72); // #e11d48 (Rose-600)
  doc.setLineWidth(0.9);
  doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

  // Inner Amber-Gold Hairline Border
  doc.setDrawColor(217, 119, 6); // #d97706 (Amber-600)
  doc.setLineWidth(0.35);
  doc.rect(9, 9, pageWidth - 18, pageHeight - 18);

  // Decorative Corner Crosses / Accents
  doc.setFillColor(225, 29, 72);
  const cornerOffset = 8;
  doc.circle(cornerOffset, cornerOffset, 0.7, 'F');
  doc.circle(pageWidth - cornerOffset, cornerOffset, 0.7, 'F');
  doc.circle(cornerOffset, pageHeight - cornerOffset, 0.7, 'F');
  doc.circle(pageWidth - cornerOffset, pageHeight - cornerOffset, 0.7, 'F');

  // 4. HEADER: Brand & Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42); // #0f172a (Deep Slate / Charcoal Black)
  doc.text(COUPON_CONFIG.empresaNombre, pageWidth / 2, 19, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(225, 29, 72); // #e11d48 (Rose-600)
  doc.text(COUPON_CONFIG.empresaSubtitulo, pageWidth / 2, 24, { align: 'center' });

  // Voucher Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(180, 83, 9); // #b45309 (Amber-700 / Golden)
  doc.text(COUPON_CONFIG.tituloCertificado.replace('10%', `${discount}%`), pageWidth / 2, 33, {
    align: 'center',
  });

  // 5. CENTRAL BOX FOR COUPON CODE (Structured & Centered, 100% Guaranteed Zero Text Overflow)
  const boxW = 164; // Generous 164mm width perfectly centered
  const boxX = (pageWidth - boxW) / 2; // 23mm margins on left and right
  const boxY = 37;
  const boxH = 28;

  // Frosted White Card with soft rose dashed border
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 29, 72);
  doc.setLineWidth(0.5);
  doc.setLineDashPattern([2, 1.5], 0);
  doc.roundedRect(boxX, boxY, boxW, boxH, 2.5, 2.5, 'FD');
  doc.setLineDashPattern([], 0); // reset dash

  // Code Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139); // #64748b (Slate-500)
  doc.text(COUPON_CONFIG.etiquetaCodigo, pageWidth / 2, boxY + 6.5, { align: 'center' });

  // Big Dynamic Coupon Code (Bold Courier)
  doc.setFont('courier', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(190, 18, 60); // #be123c (Rose-700)
  doc.text(data.couponCode, pageWidth / 2, boxY + 15, { align: 'center' });

  // Validity Subtitle (Sanitized of unrenderable glyphs & auto-scaled to NEVER overflow)
  const rawValidez = COUPON_CONFIG.textoValidez.replace('10%', `${discount}%`);
  // Replace unrenderable Unicode star with clean bullet or dot for reliable PDF rendering
  const safeValidez = rawValidez.replace(/[★*&]/g, '•').trim();

  let valFontSize = 7.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(valFontSize);
  const maxAllowedWidth = boxW - 14; // Strict 7mm safety margin inside each side of the box

  // Dynamically shrink font size if text is ever too long
  while (doc.getTextWidth(safeValidez) > maxAllowedWidth && valFontSize > 4.5) {
    valFontSize -= 0.25;
    doc.setFontSize(valFontSize);
  }

  // Draw clean soft emerald pill badge inside the box
  const textWidth = doc.getTextWidth(safeValidez);
  const pillW = Math.min(boxW - 8, textWidth + 10);
  const pillH = 5.2;
  const pillX = (pageWidth - pillW) / 2;
  const pillY = boxY + boxH - 5.5;

  doc.setFillColor(236, 253, 245); // #ecfdf5 (Emerald-50)
  doc.setDrawColor(167, 243, 208); // #a7f3d0 (Emerald-200)
  doc.setLineWidth(0.3);
  doc.roundedRect(pillX, pillY - 3.7, pillW, pillH, 1.5, 1.5, 'FD');

  doc.setTextColor(4, 120, 87); // #047857 (Emerald-700)
  doc.text(safeValidez, pageWidth / 2, pillY, { align: 'center' });

  // 6. DETAILS SECTION (2 Balanced Columns, Guaranteed No Overflow)
  const detailsY = 70;

  // LEFT COLUMN: Client Data
  const colLeftX = 16;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(190, 18, 60); // Rose-700
  doc.text(COUPON_CONFIG.etiquetaTitular, colLeftX, detailsY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59); // Slate-800

  // Format with safety truncation to prevent line overflow
  const rawTitular = data.name ? data.name.trim() : 'Titular Registrado';
  const titular = rawTitular.length > 34 ? rawTitular.substring(0, 32) + '...' : rawTitular;

  const rawEmail = data.email ? data.email.trim() : '';
  const email = rawEmail.length > 36 ? rawEmail.substring(0, 34) + '...' : rawEmail;

  const phone = data.phone ? data.phone.trim() : 'Asociado a WhatsApp';
  const eventType = data.eventType || 'Boda Nupcial';

  doc.text(`• Titular: ${titular}`, colLeftX, detailsY + 5);
  doc.text(`• Email: ${email}`, colLeftX, detailsY + 9.5);
  doc.text(`• Teléfono: ${phone}`, colLeftX, detailsY + 14);
  doc.text(`• Celebración: ${eventType}`, colLeftX, detailsY + 18.5);

  // RIGHT COLUMN: Services Included
  const colRightX = 108;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(190, 18, 60); // Rose-700
  doc.text(COUPON_CONFIG.etiquetaServicios, colRightX, detailsY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85); // Slate-700
  COUPON_CONFIG.servicios.forEach((serv, idx) => {
    doc.text(serv, colRightX, detailsY + 4.5 + idx * 4);
  });

  // 7. HOW TO REDEEM BOX (Centered, Clean Rose-50 Tinted Card)
  const redeemY = 99;
  const redeemW = 180;
  const redeemX = 15;
  const redeemH = 24;

  doc.setFillColor(255, 241, 242); // #fff1f2 (Soft Rose-50)
  doc.setDrawColor(254, 205, 211); // #fecdd3 (Rose-200)
  doc.setLineWidth(0.4);
  doc.roundedRect(redeemX, redeemY, redeemW, redeemH, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(159, 18, 57); // Rose-800
  doc.text(COUPON_CONFIG.tituloCanjear.replace('10%', `${discount}%`), pageWidth / 2, redeemY + 5.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.text(
    COUPON_CONFIG.instruccionesCanjear.replace('tu código', `tu código "${data.couponCode}"`),
    pageWidth / 2,
    redeemY + 11.5,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105); // Slate-600
  doc.text(
    COUPON_CONFIG.contactoCanjear,
    pageWidth / 2,
    redeemY + 17.5,
    { align: 'center' }
  );

  // 8. FOOTER: Official Homologation & Legal Notice
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139); // Slate-500
  const now = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.text(
    `Emitido el ${now} · ${COUPON_CONFIG.pieLegal}`,
    pageWidth / 2,
    pageHeight - 9.5,
    { align: 'center' }
  );

  return doc;
}

export function downloadCouponPdf(data: CouponPdfData): void {
  const doc = generateCouponPdf(data);
  const safeFilename = `Cupon-10-HumoYEfectos-${data.couponCode}.pdf`;
  doc.save(safeFilename);
}
