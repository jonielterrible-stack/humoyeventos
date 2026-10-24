/**
 * Chatbot RAG (Retrieval-Augmented Generation) Knowledge Engine
 * Grounded in index.html, smokeData.ts, official CE T1 specifications,
 * precise pricing criteria, and real service catalogs.
 */

export interface KnowledgeChunk {
  id: string;
  category: 'seguridad_vestidos' | 'precios_presupuesto' | 'humo_aereo' | 'confeti' | 'niebla_baja' | 'chispas_frias' | 'sonido_luces' | 'cobertura_local' | 'revelacion_tnt' | 'descuento';
  title: string;
  keywords: string[];
  content: string;
  directAnswer: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'vestidos-manchas-seguridad',
    category: 'seguridad_vestidos',
    title: 'Seguridad, Ropa, Vestidos de Novia y Manchas',
    keywords: [
      'mancha', 'manchas', 'manchar', 'ensucia', 'ensuciar', 'vestido', 'vestidos', 'novia',
      'traje', 'trajes', 'ropa', 'tela', 'telas', 'blanco', 'suelo', 'resbala', 'resbalar',
      'olor', 'olores', 'limpio', 'seguro', 'seguridad', 'peligro', 'quemar', 'alarma', 'alarmas'
    ],
    content:
      'Garantía técnica de limpieza y seguridad en trajes y vestidos de novia. Humo aéreo Sbruffo Smoke 40 vertical a 15m. Niebla baja de hielo seco y chispas frías Sparkulars.',
    directAnswer:
      'Por regla general no se ensucia la ropa ni los vestidos, ya que por ejemplo los cañones de humo aéreo se disparan hacia el cielo en vertical (alcanzando entre 14,5 y 15 metros de altura donde abren en abanico y se disipan en el aire en pocos segundos). Además, nuestro técnico oficial en finca cuida siempre las distancias de seguridad reglamentarias (3 metros radiales y 19 metros respecto al público) y vigila la dirección del viento para que la nube no incida sobre los novios ni los invitados.\n\nEn cuanto a la niebla baja para el vals nupcial, se genera con agua caliente y hielo seco (CO2 sólido): es vapor limpio condensado que se mantiene a ras de suelo (bajo las rodillas) y se evapora sin mojar el piso ni manchar trajes oscuros. Por su parte, las fuentes de chispas frías Sparkulars son fuego frío de titanio que no quema las telas ni la piel al contacto.',
  },
  {
    id: 'precios-tarifas-presupuesto',
    category: 'precios_presupuesto',
    title: 'Precios, Tarifas y Elaboración de Presupuesto',
    keywords: [
      'precio', 'precios', 'coste', 'costes', 'cuanto cuesta', 'cuanto vale', 'tarifa', 'tarifas',
      'presupuesto', 'presupuestos', 'cotizacion', 'paquetes', 'pack', 'cuanto cobra', 'caro', 'economico'
    ],
    content:
      'Política de precios a medida: no trabajamos con tarifas fijas rígidas ni paquetes engañosos. El presupuesto se calcula según: 1) Número exacto de cañones de humo aéreo elegidos (de 1 a 9 cañones), 2) Efectos adicionales (confeti de mariposas, niebla baja con hielo seco o chispas frías), 3) Fecha del evento, y 4) Ubicación de la finca para incluir el desplazamiento con técnico oficial propio sin intermediarios.',
    directAnswer:
      'Nuestros presupuestos son totalmente a medida y transparentes, sin precios fijos estándar cerrados, ya que cada celebración tiene necesidades distintas. El importe se ajusta en función de:\n\n1. El número de cañones de humo aéreo que elijáis (de 1 a 9 cañones disparados en abanico vertical).\n2. Los efectos combinados que queráis sumar (como la lluvia de mariposas de seda, el vals sobre las nubes o las chispas frías).\n3. La fecha del evento y la finca o localidad, para incluir el desplazamiento y asistencia presencial de nuestro técnico oficial.\n\nAdemás, podéis conseguir un 10% de descuento registrando vuestro email en la ventana de bienvenida para recibir vuestro código único oficial y certificado en PDF. Si me indicáis la fecha aproximada y el lugar de la celebración, o pulsáis en "Agendar Cita / Evento" de arriba, os preparamos la propuesta exacta en pocos minutos.',
  },
  {
    id: 'tipos-humo-aereo-canones',
    category: 'humo_aereo',
    title: 'Cañones de Humo Aéreo Vertical (1 a 9 Cañones) y Paleta Oficial',
    keywords: [
      'humo aereo', 'humo aéreo', 'canon', 'cañon', 'canones', 'cañones', '1 a 9', 'sbruffo',
      'smoke 40', 'altura', 'segundos', 'disparo', 'vertical', 'abanico', 'colores', 'color',
      'paleta', 'rosa', 'azul', 'amarillo', 'blanco', 'verde', 'rojo', 'morado', 'naranja'
    ],
    content:
      'Especialidad estrella Nº1. Artificio pirotécnico Sbruffo Smoke 40 homologado CE 0163 (Registro 0163-T1-6069, NEC 35g). Disparo instantáneo único de 1 a 9 cañones que sube a 14,5-15 metros y se disipa en segundos. Paleta oficial de 10 colores certificados en fábrica: Amarillo Oro, Naranja, Azul Eléctrico, Blanco Puro Nupcial, Verde Esmeralda, Rojo Pasión, Rojo Carmín, Morado, Verde Lima y Rosa Pastel. No se fabrican colores fuera de esta gama para garantizar la certificación.',
    directAnswer:
      'Nuestra especialidad Nº 1 son los Cañones de Humo Aéreo Vertical (artificio Sbruffo Smoke 40 con homologación oficial CE Clase T1):\n\n• Cómo funciona: Se realiza un único disparo instantáneo sincronizado por control remoto que sube con gran potencia hasta 14,5 - 15 metros de altura en vertical, abriendo en una espectacular cúpula de color para la foto y disipándose en pocos segundos en la atmósfera limpia.\n• Configuración flexible de 1 a 9 cañones: Podéis elegir desde un cañón individual hasta 9 cañones simultáneos, disparando todos del mismo color o repartiendo una combinación multicolor a vuestro gusto.\n• Paleta oficial de 10 colores certificados de fábrica (stock permanente): Amarillo Oro, Naranja Terracota, Azul Eléctrico (ideal revelación niño), Blanco Puro Nupcial, Verde Esmeralda, Rojo Pasión, Rojo Carmín, Morado Violeta, Verde Lima Flúor y Rosa Pastel (ideal revelación niña). No disponemos de otros colores para preservar la homologación CE europea.',
  },
  {
    id: 'confeti-mariposas-blanco-multicolor',
    category: 'confeti',
    title: 'Cañones de Confeti para Bodas, Vals y Fiestas',
    keywords: [
      'confeti', 'confetti', 'mariposa', 'mariposas', 'seda', 'nieve', 'papel blanco',
      'lluvia blanca', 'multicolor', 'metalizado', 'oro', 'plata', 'biodegradable', 'ignifugo', 'ignífugo'
    ],
    content:
      'Cañones neumáticos y eléctricos inalámbricos sincronizados. Tres cargas oficiales: 1) Mariposas de seda troqueladas que planean 30-60s en suspensión (baile nupcial o salida), 2) Papel blanco mate efecto nieve romántica, 3) Multicolor y metalizado oro/plata para barra libre (alcance 8 a 12m). 100% biodegradable e ignífugo homologado CE.',
    directAnswer:
      'Para los cañones de confeti disponemos de tres acabados profesionales con disparo eléctrico/neumático inalámbrico:\n\n🦋 Confeti de Mariposas de Seda: Papel de seda troquelado con forma de mariposas que planean y giran suavemente en el aire manteniéndose en suspensión entre 30 y 60 segundos. Es el efecto más emotivo y fotogénico para el primer baile nupcial o la salida de la ceremonia.\n❄️ Confeti Blanco Nieve: Papel blanco mate que cae con suavidad creando una elegante nevada romántica sobre los novios.\n🎉 Confeti Multicolor y Metalizado (Oro / Plata): Disparo de alta presión con dispersión de 8 a 12 metros, diseñado para el subidón del corte de tarta o la apertura de la barra libre.\n\nTodo el material es 100% biodegradable, no resbala en suelos de mármol o madera y cuenta con certificación ignífuga CE.',
  },
  {
    id: 'niebla-baja-vals-nubes',
    category: 'niebla_baja',
    title: 'Máquina de Niebla Baja (Vals sobre las Nubes)',
    keywords: [
      'niebla baja', 'humo bajo', 'vals', 'nubes', 'bailar sobre las nubes', 'baile nupcial',
      'hielo seco', 'co2', 'vapor', 'alarma', 'alarmas', 'humedad'
    ],
    content:
      'Vals sobre las nubes con máquinas profesionales de agua caliente y hielo seco (CO2 sólido a -78°C). Manto blanco denso a ras de suelo durante 3 a 5 minutos (duración completa del vals). 100% vapor limpio de agua: no moja, no mancha vestidos y no activa detectores de humo en salones de bodas.',
    directAnswer:
      'La Máquina de Niebla Baja para el vals nupcial crea el emblemático efecto de "Bailar sobre las nubes":\n\n• Funciona exclusivamente combinando agua caliente con hielo seco (CO2 sólido). Esto genera una nube densa y blanca que se desliza por el suelo y no supera la altura de las rodillas.\n• Dura los 3 a 5 minutos que dura vuestra canción de vals.\n• Al ser vapor limpio condensado, no moja el piso, no ensucia el vestido de la novia y no activa los detectores de humo ni alarmas contra incendios en fincas, palacetes u hoteles.',
  },
  {
    id: 'chispas-frias-sparkulars',
    category: 'chispas_frias',
    title: 'Fuentes de Chispas Frías Sparkulars (Fuego Frío)',
    keywords: [
      'chispa', 'chispas', 'chispas frias', 'chispas frías', 'sparkular', 'sparkulars',
      'fuego frio', 'fuego frío', 'titanio', 'quema', 'quemar', 'interior', 'interiores'
    ],
    content:
      'Fuentes Sparkulars de titanio procesado electrónicamente a baja temperatura. Columnas de luz dorada de 2 a 4 metros regulables. No queman al contacto con la mano ni con la ropa, sin pólvora tradicional, sin humo denso ni olores. 100% autorizadas en salones interiores, carpas y patios.',
    directAnswer:
      'Nuestras Fuentes de Chispas Frías (Sparkulars) ofrecen el impacto visual del fuego pero con total seguridad:\n\n• Tecnología de Fuego Frío: Utilizan microgránulos de titanio procesados a baja temperatura. Las chispas no queman la piel ni prenden telas, manteles ni vestidos de novia.\n• Altura regulable de 2 a 4 metros de columna dorada brillante.\n• Sin humo ni olores molestos: Por regla general están autorizadas en el 100% de salones cerrados y fincas históricas donde la pirotecnia tradicional está prohibida.\n• Ideales para el clímax del baile nupcial, la entrada al banquete o el corte de tarta.',
  },
  {
    id: 'revelacion-genero-caja-tnt',
    category: 'revelacion_tnt',
    title: 'Revelación de Género con Disparador TNT Retro',
    keywords: [
      'revelacion', 'revelación', 'genero', 'género', 'gender reveal', 'tnt', 'caja tnt',
      'palanca', 'bebe', 'bebé', 'nene', 'nena', 'embarazo', 'sorpresa', 'secreto'
    ],
    content:
      'Pack Revelación de Género Signature con caja detonadora vintage de palanca de émbolo tipo dinamita retro. Disparo sincronizado hacia el cielo en Rosa Pastel o Azul Eléctrico. Coordinación en secreto con el ginecólogo, matrona o familiar cómplice.',
    directAnswer:
      '¡Nuestro Pack de Revelación de Género con Disparador TNT Retro es el más emocionante y viral de España!\n\n• Disparador TNT Vintage: Los futuros papás sujetan la palanca de émbolo de madera juntos, hacen la cuenta atrás con sus seres queridos y al empujar la palanca con fuerza, los cañones detonan hacia el cielo en Rosa Pastel o Azul Eléctrico a 15 metros.\n• Modo 100% Sorpresa para los padres: Si no queréis saber el sexo antes de tiempo, vuestro ginecólogo, matrona o cómplice nos comunica el resultado en secreto por WhatsApp o email con vuestro número de reserva. Nosotros preparamos los cañones con precintos ocultos para que nadie descubra el color hasta el disparo.\n• Asistencia de nuestro técnico: Acudimos a vuestra finca o jardín con todo el equipo montado.',
  },
  {
    id: 'cobertura-talavera-madrid-toledo-espana',
    category: 'cobertura_local',
    title: 'Cobertura, Desplazamiento y Sedes (Talavera, Madrid, Toledo, Zona Centro y España)',
    keywords: [
      'talavera', 'talavera de la reina', 'madrid', 'toledo', 'zona centro', 'avila', 'ávila',
      'segovia', 'guadalajara', 'caceres', 'cáceres', 'ciudad real', 'donde estan', 'donde estáis',
      'cobertura', 'desplazamiento', 'furgon', 'furgón', 'espana', 'españa', 'nacional', 'finca'
    ],
    content:
      'Sede central y taller en Talavera de la Reina (Toledo). Furgón técnico diario en Madrid y Comunidad. Cobertura preferente en Toledo y Cigarrales. Zona Centro: Ávila, Segovia, Guadalajara, Cáceres y Ciudad Real. Cobertura nacional programada en toda España peninsular con técnicos oficiales propios.',
    directAnswer:
      'Nuestra red de cobertura técnica cubre tanto la zona centro como el resto de España:\n\n⭐ Talavera de la Reina (Sede Central & Taller Oficial): Mayor demanda y entrega inmediata con desplazamiento 0 km para fincas de Talavera, Cazalegas, Comarca de la Jara, Pepino, Sierra de San Vicente y La Vera.\n🔥 Madrid y Sierra de Guadarrama: Ruta y furgón técnico diario para fincas de Pozuelo, Las Rozas, San Lorenzo de El Escorial, Aranjuez, Boadilla y Sierra.\n🏰 Toledo y Cigarrales: Especialistas en terrazas panorámicas de cigarrales del Tajo, bodegas de Méntrida y cortijos toledanos.\n📍 Zona Centro: Rutas directas en menos de 90 minutos para Ávila, Segovia, Guadalajara, Cáceres y Ciudad Real.\n🇪🇸 Toda España: Para bodas de gran formato y festivales nos desplazamos por toda la península (Valencia, Sevilla, Barcelona, Zaragoza, Bilbao, etc.) con técnicos propios cualificados.',
  },
  {
    id: 'sonido-iluminacion-discoteca-dj',
    category: 'sonido_luces',
    title: 'Alquiler de Sonido Profesional, Iluminación LED y Discoteca Móvil con DJ',
    keywords: [
      'sonido', 'audio', 'musica', 'música', 'altavoces', 'microfono', 'micrófono',
      'iluminacion', 'iluminación', 'luces', 'focos', 'cabezas moviles', 'discoteca', 'dj', 'fiesta'
    ],
    content:
      'Servicio audiovisual completo: equipos de sonido PA para ceremonia y cóctel, microfonía inalámbrica, puentes de iluminación LED con cabezas móviles robotizadas y discoteca móvil con DJ profesional para la barra libre.',
    directAnswer:
      'Además de los efectos de humo y confeti, ofrecemos servicio audiovisual completo para que tengáis un único proveedor de confianza:\n\n• Sonido Profesional PA: Equipos de alta fidelidad para la ceremonia civil (con microfonía inalámbrica para los novios y oficiante), música ambiente para el cóctel y banquete.\n• Iluminación Espectacular: Focos LED y cabezas móviles robotizadas para dar ambiente a la pista de baile.\n• Discoteca Móvil con DJ: Repertorio a vuestro gusto para disfrutar de la barra libre hasta el fin de fiesta.\n• Podéis contratarlo por separado o sumarlo al Pack Boda Total 360° junto con el humo aéreo y la niebla baja.',
  },
  {
    id: 'cupones-descuento-promociones',
    category: 'descuento',
    title: 'Obtención del 10% de Descuento Oficial mediante Registro de Email',
    keywords: [
      'descuento', 'descuentos', 'cupon', 'cupón', 'codigo', 'código', 'promocion', 'promoción',
      'oferta', 'ofertas', 'rebaja', '10%', 'como consigo', 'cómo consigo', 'conseguir', 'registro', 'registrarse'
    ],
    content:
      'Para conseguir el 10% de descuento es imprescindible registrarse con el email en la web. No existen códigos fijos abiertos ni públicos. A cada usuario que se registra se le genera un código único e intransferible según su tipo de celebración (con prefijo BODA10-XXX, REVELACION10-XXX o FIESTA10-XXX) junto con su certificado oficial en PDF y verificación en base de datos.',
    directAnswer:
      'Para conseguir tu cupón oficial del 10% de descuento es imprescindible registrarte con tu email en nuestra web. No facilitamos códigos genéricos abiertos, ya que a cada persona que se registra se le genera un código único e intransferible para su celebración (con prefijo BODA10-XXX, REVELACION10-XXX o FIESTA10-XXX) junto con su certificado oficial en PDF descargable.\n\n🎁 Pulsa en el botón que tienes abajo para abrir la ventana de registro, indicar tu correo y recibir tu código de descuento oficial al instante.',
  },
];

/**
 * Clean & normalize text for token matching
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export interface RagResult {
  reply: string;
  matchedChunkId?: string;
  confidence: number;
}

/**
 * Semantic score retriever grounded in the knowledge base
 */
export function queryKnowledgeBase(userQuery: string): RagResult {
  const queryTokens = tokenize(userQuery);
  const normalizedQuery = userQuery
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  let bestChunk: KnowledgeChunk | null = null;
  let highestScore = 0;

  for (const chunk of KNOWLEDGE_BASE) {
    let score = 0;

    // Check exact keyword overlaps
    for (const kw of chunk.keywords) {
      const cleanKw = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normalizedQuery.includes(cleanKw)) {
        score += cleanKw.length > 5 ? 6 : 4;
      }
    }

    // Token match against chunk content and title
    const chunkTokens = tokenize(`${chunk.title} ${chunk.content}`);
    for (const token of queryTokens) {
      if (chunkTokens.includes(token)) {
        score += 2;
      }
    }

    // Priority boost for specific question types
    if (chunk.id === 'vestidos-manchas-seguridad') {
      if (
        normalizedQuery.includes('mancha') ||
        normalizedQuery.includes('ensucia') ||
        normalizedQuery.includes('ropa') ||
        normalizedQuery.includes('vestid')
      ) {
        score += 15;
      }
    }

    if (chunk.id === 'confeti-mariposas-blanco-multicolor') {
      if (normalizedQuery.includes('confeti') || normalizedQuery.includes('mariposa')) {
        score += 15;
      }
    }

    if (chunk.id === 'niebla-baja-vals-nubes') {
      if (normalizedQuery.includes('niebla') || normalizedQuery.includes('vals') || normalizedQuery.includes('nubes')) {
        score += 15;
      }
    }

    if (chunk.id === 'chispas-frias-sparkulars') {
      if (normalizedQuery.includes('chispa') || normalizedQuery.includes('sparkular') || normalizedQuery.includes('fuego frio') || normalizedQuery.includes('fuego frío')) {
        score += 15;
      }
    }

    if (chunk.id === 'precios-tarifas-presupuesto') {
      if (normalizedQuery.includes('precio') || normalizedQuery.includes('coste') || normalizedQuery.includes('presupuesto') || normalizedQuery.includes('cuanto cuesta')) {
        score += 15;
      }
    }

    if (chunk.id === 'cobertura-talavera-madrid-toledo-espana') {
      if (
        normalizedQuery.includes('talavera') ||
        normalizedQuery.includes('madrid') ||
        normalizedQuery.includes('toledo') ||
        normalizedQuery.includes('zona centro') ||
        normalizedQuery.includes('desplazamiento') ||
        normalizedQuery.includes('cobertura')
      ) {
        score += 12;
      }
    }

    if (chunk.id === 'revelacion-genero-caja-tnt') {
      if (normalizedQuery.includes('tnt') || normalizedQuery.includes('revela') || normalizedQuery.includes('genero') || normalizedQuery.includes('género')) {
        score += 15;
      }
    }

    if (chunk.id === 'cupones-descuento-promociones') {
      if (normalizedQuery.includes('descuento') || normalizedQuery.includes('cupon') || normalizedQuery.includes('cupón') || normalizedQuery.includes('codigo') || normalizedQuery.includes('código')) {
        score += 14;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestChunk = chunk;
    }
  }

  if (bestChunk && highestScore >= 4) {
    return {
      reply: bestChunk.directAnswer,
      matchedChunkId: bestChunk.id,
      confidence: highestScore,
    };
  }

  // General warm informative response when no single topic dominates
  return {
    reply:
      '¡Hola! Te atiendo encantada desde el equipo de Humo Y Efectos ✨. Disponemos de información precisa sobre:\n\n' +
      '1. Cañones de Humo Aéreo Vertical (Sbruffo Smoke 40 CE T1 de 1 a 9 cañones a 15m con 10 colores oficiales).\n' +
      '2. Confeti de Mariposas de seda troqueladas, papel blanco nieve o fiesta multicolor.\n' +
      '3. Vals sobre las Nubes con niebla baja de hielo seco y fuentes de chispas frías Sparkulars.\n' +
      '4. Pack Revelación de Género con Disparador TNT Retro vintage.\n' +
      '5. Alquiler de Sonido Profesional, Iluminación LED y Discoteca Móvil con DJ.\n' +
      '6. Presupuestos personalizados y cobertura en Talavera, Madrid, Toledo, Zona Centro y toda España.\n\n' +
      '¿Qué efecto o detalle te gustaría consultar para tu fecha?',
    confidence: 0,
  };
}
