export interface SmokePack {
  id: string;
  name: string;
  tagline: string;
  category: 'bodas' | 'revelacion_genero' | 'humo_aereo' | 'confeti' | 'humo_bajo' | 'chispas_frias' | 'sonido_luces' | 'bengalas';
  badge?: string;
  highlight?: boolean;
  image: string;
  imageAlt: string;
  imageTitle: string;
  height: string;
  duration: string;
  tubesRecommendation: string;
  colors: string[];
  includes: string[];
  description: string;
  idealMoment: string;
}

export interface SmokeColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  category: 'clasico' | 'reveal';
  description: string;
  tubeIndex: number; // 1 to 10 corresponding to official lineup photo
}

// EXACT 10 OFFICIAL COLORS FROM REAL FACTORY PRODUCTION (IMG-20261023-WA0001)
// Manufacturer: Pirotecnica Manna / Sbruffo Smoke 40
export const SMOKE_COLORS: SmokeColor[] = [
  {
    id: 'amarillo-gualda',
    name: 'Amarillo Gualda / Oro',
    hex: '#FACC15',
    secondaryHex: '#FDE047',
    category: 'clasico',
    description: 'Color n°1 oficial. Tono dorado solar radiante y alegre para aperturas diurnas.',
    tubeIndex: 1,
  },
  {
    id: 'naranja-intenso',
    name: 'Naranja Intenso / Terracota',
    hex: '#FB923C',
    secondaryHex: '#F97316',
    category: 'clasico',
    description: 'Color n°2 oficial. Naranja cálido de altísima visibilidad y contraste otoñal.',
    tubeIndex: 2,
  },
  {
    id: 'azul-electrico',
    name: 'Azul Eléctrico / Zafiro Real',
    hex: '#2563EB',
    secondaryHex: '#3B82F6',
    category: 'clasico',
    description: 'Color n°3 oficial. Azul intenso saturado para cielo abierto (ideal Revelación Niño).',
    tubeIndex: 3,
  },
  {
    id: 'blanco-puro',
    name: 'Blanco Puro Nupcial',
    hex: '#FFFFFF',
    secondaryHex: '#E2E8F0',
    category: 'clasico',
    description: 'Color n°4 oficial. Blanco nube impoluto para salidas de ceremonia civil e iglesia.',
    tubeIndex: 4,
  },
  {
    id: 'verde-esmeralda',
    name: 'Verde Esmeralda',
    hex: '#16A34A',
    secondaryHex: '#22C55E',
    category: 'clasico',
    description: 'Color n°5 oficial. Verde vivo natural, máxima armonía con jardines y viñedos.',
    tubeIndex: 5,
  },
  {
    id: 'rojo-pasion',
    name: 'Rojo Pasión',
    hex: '#DC2626',
    secondaryHex: '#EF4444',
    category: 'clasico',
    description: 'Color n°6 oficial. Rojo escarlata de máximo impacto emocional y fuerza visual.',
    tubeIndex: 6,
  },
  {
    id: 'rojo-carmin',
    name: 'Rojo Carmín / Coral',
    hex: '#E11D48',
    secondaryHex: '#FB7185',
    category: 'clasico',
    description: 'Color n°7 oficial. Tono carmín profundo y romántico con matiz frambuesa.',
    tubeIndex: 7,
  },
  {
    id: 'morado-violeta',
    name: 'Morado / Violeta Real',
    hex: '#7E22CE',
    secondaryHex: '#9333EA',
    category: 'clasico',
    description: 'Color n°8 oficial. Púrpura regio, elegante y exclusivo para momentos cumbre.',
    tubeIndex: 8,
  },
  {
    id: 'verde-lima',
    name: 'Verde Lima / Flúor',
    hex: '#84CC16',
    secondaryHex: '#A3E635',
    category: 'clasico',
    description: 'Color n°9 oficial. Verde ácido vibrante y moderno de alto impacto visual.',
    tubeIndex: 9,
  },
  {
    id: 'rosa-pastel',
    name: 'Rosa Pastel Nupcial',
    hex: '#F472B6',
    secondaryHex: '#F9A8D4',
    category: 'clasico',
    description: 'Color n°10 oficial. Rosa suave romántico y delicado (ideal Revelación Niña).',
    tubeIndex: 10,
  },
];

// OFFICIAL SAFETY REGULATIONS & TECHNICAL SPECIFICATIONS (LABEL CE CAT. T1)
// Direct extraction from official cartridge labels (IMG-20261022-WA0006 / WA0007 / WA0005)
export const OFFICIAL_SAFETY_SPECS = {
  modelName: 'SBRUFFO SMOKE 40',
  type: 'Volcán Pirotécnico de Humo Aéreo',
  category: 'PIROTÉCNICO - CAT. T1 (Uso Escenario / Eventos al Aire Libre)',
  ceNumber: 'CE 0163',
  registrationNumber: '0163-T1-6069',
  manufacturingYear: '2025',
  batchNumber: 'COL/MIN/I25/13',
  necWeight: '35 g (Materia Reglamentada por artificio)',
  soundLevel: '115,41 dB(AI) a 8 m (Disparo seco técnico sin estruendo pirotécnico atronador)',
  minAge: '18 años (Prohibida la venta a menores de 18 años)',
  distances: {
    vertical: '14,5 m',
    verticalLabel: 'Distancia mínima en la dirección del efecto (altura vertical)',
    radial: '3,0 m',
    radialLabel: 'Distancia mínima de seguridad radial alrededor del cañón',
    public: '19 m',
    publicLabel: 'Distancia mínima de seguridad obligatoria a personas / público',
  },
  images: {
    palette10: '/assets/aistudio/IMG-20261024-WA0020_cb7a103d.jpg',
  },
};

export const SMOKE_PACKS: SmokePack[] = [
  {
    id: 'pack-salida-ceremonia',
    name: 'Pack Salida de Ceremonia',
    tagline: 'Un solo disparo sincronizado de alto impacto que abre en el cielo',
    category: 'humo_aereo',
    badge: 'IDEAL IGLESIAS & ALTARES',
    image: '/assets/services/pack-salida-ceremonia-humo-colores.jpg',
    imageAlt:
      'Boda al aire libre con los novios saliendo de la ceremonia y columnas verticales de humo de colores a 15 metros detrás de ellos en Talavera de la Reina, Madrid y España',
    imageTitle:
      'Pack Salida de Ceremonia con Cañones de Humo Aéreo de Colores para Bodas | Humo Y Efectos',
    tubesRecommendation: 'De 2 a 4 Cañones sincronizados',
    height: '12 - 15 metros de altura',
    duration: 'Disparo instantáneo (abre arriba y se disipa en segundos)',
    colors: ['Monocolor o Bicolor personalizado'],
    includes: [
      'Un solo disparo simultáneo de cañones de humo aéreo vertical',
      'Apertura progresiva en abanico conforme el humo gana altura',
      'Módulo inalámbrico RF con pulsador codificado a distancia (80m)',
      'Bases estabilizadoras pesadas antivuelco (aptas césped o adoquín)',
      'Disipación rápida limpia sin niebla residual',
      'Certificado oficial CE Clase T1 y ficha técnica para la finca',
    ],
    description:
      'Un disparo instantáneo sincronizado que proyecta columnas verticales a gran velocidad. Al alcanzar la cumbre a 15m, el humo abre en abanico para la foto soñada y se disipa limpiamente en pocos segundos.',
    idealMoment: 'Salida de ceremonia civil o religiosa',
  },
  {
    id: 'pack-entrada-triunfal',
    name: 'Pack Entrada Nupcial Signature',
    tagline: 'La llegada más emocionante y viral de la temporada en un instante mágico',
    category: 'humo_aereo',
    highlight: true,
    badge: 'MÁS ELEGIDO POR NOVIOS',
    image: '/assets/services/pack-entrada-nupcial-humo-colores.jpg',
    imageAlt:
      'Batería oficial de cañones de humo aéreo vertical en 10 colores homologados CE Clase T1 para entrada triunfal de novios en finca o cóctel',
    imageTitle:
      'Pack Entrada Nupcial Signature con Cañones de Humo Aéreo Multicolor | Humo Y Efectos',
    tubesRecommendation: 'De 4 a 6 Cañones en abanico',
    height: '15 metros de altura vertical',
    duration: 'Disparo instantáneo simultáneo de alto impacto',
    colors: ['Mezcla personalizada de 1 a 6 colores'],
    includes: [
      'Disparo único simultáneo con apertura expansiva en altura',
      'Configuración personalizada: todos del mismo color o mezcla por cañón',
      'Detonador inalámbrico a distancia de máxima seguridad',
      'Asesoramiento directo previo con tu fotógrafo y videógrafo',
      'Montaje y disparo oficial por técnico especialista en finca (cero problemas)',
    ],
    description:
      'Un fogonazo cromático vertical instantáneo al paso de los novios. El humo asciende compacto y se abre en una cúpula de color que enmarca el instante perfecto antes de disiparse de forma limpia.',
    idealMoment: 'Llegada a la finca o entrada al cóctel',
  },
  {
    id: 'pack-confeti-mariposas-blanco',
    name: 'Pack Cañones de Confeti Romántico (Mariposas & Papel Blanco)',
    tagline: 'Lluvia mágica de mariposas que planean en el aire y pétalos blancos biodegradables',
    category: 'confeti',
    highlight: true,
    badge: 'ESPECIAL BAILE & CEREMONIA',
    image: '/assets/services/pack-confeti-romantico-mariposas-blanco.jpg',
    imageAlt:
      'Pareja de novios bailando rodeada de una lluvia romántica de mariposas blancas de seda y confeti blanco biodegradable en su boda',
    imageTitle:
      'Pack Cañones de Confeti Romántico (Mariposas & Papel Blanco) para Bodas | Humo Y Efectos',
    tubesRecommendation: 'De 2 a 4 Cañones de disparo eléctrico/neumático',
    height: '6 a 10 metros de altura',
    duration: 'Efecto de vuelo lento en suspensión (30 a 60 segundos)',
    colors: ['Mariposas de seda blanca o pastel + Lluvia blanca nieve'],
    includes: [
      'Cañones neumáticos profesionales con disparo simultáneo por mando',
      'Carga premium de confeti con forma de mariposas (planean girando en el aire)',
      'Opción de confeti de papel blanco mate para efecto lluvia de nieve romántica',
      'Material 100% biodegradable e ignífugo homologado CE',
      'No resbala, no mancha suelos de madera ni alfombras de la finca',
    ],
    description:
      'El momento más poético para el vals nupcial o la salida del enlace: al detonar los cañones, cientos de mariposas blancas o pétalos de nieve caen lentamente mecidos por el aire alrededor de la pareja.',
    idealMoment: 'Primer Baile Nupcial y Salida de Ceremonia',
  },
  {
    id: 'pack-confeti-fiesta-colores',
    name: 'Pack Cañones de Confeti Fiesta & Barra Libre',
    tagline: 'Estallido multicolor y metalizado en oro y plata para momentos cumbre',
    category: 'confeti',
    badge: 'SUBIDÓN DE FIESTA',
    image: '/assets/services/pack-confeti-fiesta-barra-libre-multicolor.jpg',
    imageAlt:
      'Celebración nupcial con los novios bailando rodeados de invitados y una lluvia abundante de confeti multicolor y serpentinas en la fiesta y barra libre',
    imageTitle:
      'Pack Cañones de Confeti Fiesta & Barra Libre Multicolor para Bodas y Eventos | Humo Y Efectos',
    tubesRecommendation: '2 a 6 Cañones de gran alcance',
    height: '8 a 12 metros de dispersión',
    duration: 'Estallido instantáneo con lluvia envolvente',
    colors: ['Multicolor fiesta o Metalizado Oro / Plata'],
    includes: [
      'Cañones de alta presión para apertura de barra libre o festival',
      'Confeti metalizado brillante o de colores vivos de alta visibilidad',
      'Ignífugo según normativa de seguridad en salas y exteriores',
      'Disparo remoto con control de sincronización musical',
    ],
    description:
      'Lanza una lluvia de luz y color sobre la pista de baile justo cuando rompe la canción de apertura de la fiesta.',
    idealMoment: 'Apertura de Barra Libre, Corte de Tarta o Fin de Fiesta',
  },
  {
    id: 'pack-humo-bajo-nubes',
    name: 'Pack Máquina de Niebla Baja (Vals sobre las Nubes)',
    tagline: 'Manto blanco y denso a ras de suelo con hielo seco y agua caliente',
    category: 'humo_bajo',
    highlight: true,
    badge: '100% VAPOR LIMPIO',
    image: '/assets/services/pack-humo-bajo-baile-nupcial-nubes.jpg',
    imageAlt:
      'Novios bailando el vals nupcial sobre una nube densa de humo blanco bajo a ras de suelo con iluminación elegante azul, violeta y cálida',
    imageTitle:
      'Pack Máquina de Humo Bajo y Niebla Baja para el Baile Nupcial (Vals sobre las Nubes) | Humo Y Efectos',
    tubesRecommendation: '1 o 2 Máquinas profesionales de hielo seco de alta potencia',
    height: 'Alfombra a ras de suelo (no sube de las rodillas)',
    duration: 'Vals nupcial completo (3 a 5 minutos)',
    colors: ['Nube blanca densa pura'],
    includes: [
      'Máquina profesional de agua caliente y hielo seco (CO2 sólido)',
      'Vapor denso 100% puro: no moja, no mancha trajes y no activa alarmas',
      'Los novios parecen flotar sobre las nubes para fotos inolvidables',
      'Cobertura homogénea de pistas de hasta 120 m²',
      'Consumibles de máxima pureza que se evaporan sin dejar residuo',
    ],
    description:
      'La atmósfera más romántica para el primer baile nupcial: una nube compacta que abraza los pies de los novios creando la sensación visual de estar flotando en el cielo.',
    idealMoment: 'Primer Baile Nupcial y Corte de Tarta',
  },
  {
    id: 'pack-chispas-frias-sparkulars',
    name: 'Pack Fuentes de Chispas Frías (Sparkulars)',
    tagline: 'Chorros luminosos de 2 a 5 metros que no queman ni tienen pólvora',
    category: 'chispas_frias',
    highlight: true,
    badge: 'FUEGO FRÍO 100% SEGURO',
    image: '/assets/services/pack-fuentes-chispas-frias-sparkulars.jpg',
    imageAlt:
      'Novios celebrando su boda entre seis fuentes electrónicas de chispas frías Sparkulars que iluminan el momento sin quemar ni producir humo',
    imageTitle:
      'Pack Fuentes de Chispas Frías (Sparkulars) Homologadas para Bodas y Eventos | Humo Y Efectos',
    tubesRecommendation: 'De 2 a 8 Fuentes electrónicas sincronizadas',
    height: 'Regulable de 2 a 5 metros',
    duration: 'Disparos modulados por ráfagas para momentos clave',
    colors: ['Chispas doradas o plateadas brillantes'],
    includes: [
      'Fuentes electrónicas de titanio que no queman la piel ni la ropa',
      'Totalmente inocuas: sin humo, sin olor y sin restos de pólvora',
      'Autorizadas en el 100% de salones cerrados, fincas y hoteles',
      'Control inalámbrico por mando DMX para sincronizar con la música',
    ],
    description:
      'Columnas de luz fría que aportan la elegancia y espectacularidad de la pirotecnia sin ninguno de sus riesgos. Ideales para entradas, tarta y baile.',
    idealMoment: 'Entrada de Novios, Corte de Tarta y Primer Baile',
  },
  {
    id: 'pack-sonido-iluminacion-discoteca',
    name: 'Pack Discoteca Móvil, Sonido Profesional & Iluminación',
    tagline: 'Equipamiento completo de sonido para ceremonia, banquete y fiesta con DJ',
    category: 'sonido_luces',
    badge: 'PRODUCCIÓN INTEGRAL',
    image: '/assets/services/sonido-iluminacion.jpg',
    imageAlt:
      'Cabina de DJ profesional iluminada con controladora, altavoces PA y luces LED para pista de baile en bodas y eventos',
    imageTitle:
      'Pack Discoteca Móvil, Sonido Profesional, Iluminación LED y DJ para Bodas | Humo Y Efectos',
    tubesRecommendation: 'Equipos PA de alta gama + Puente de luces + DJ',
    height: 'Puente de iluminación regulable a 3-4 metros',
    duration: 'Cobertura del evento (desde ceremonia hasta fin de fiesta)',
    colors: ['Iluminación ambiental RGBW + Cabezas móviles robotizadas'],
    includes: [
      'Sistemas de sonido PA activo de alta definición para música y discursos',
      'Microfonía inalámbrica profesional para ceremonia, lecturas y metre',
      'Puente de iluminación espectacular con cabezas móviles y focos LED',
      'Cabina de DJ profesional y discoteca móvil para la barra libre',
      'Transporte, montaje y técnico de sonido cualificado durante todo el evento',
    ],
    description:
      'El complemento sonoro y lumínico ideal: complementa nuestros efectos líderes de humo y pirotecnia con el mejor sonido e iluminación para que no tengáis que preocuparos por nada.',
    idealMoment: 'Ceremonia, Cóctel, Banquete y Barra Libre',
  },
  {
    id: 'pack-revelacion-tnt',
    name: 'Pack Revelación de Género con Disparador TNT Retro',
    tagline: '¡El efecto más visual para los papás! Empuja la palanca TNT y el cielo se tiñe de color',
    category: 'revelacion_genero',
    highlight: true,
    badge: 'TOP VIRAL PAPÁS',
    image: '/assets/services/disparador-tnt-revelacion-real.jpg',
    imageAlt:
      'Caja detonadora TNT retro con palanca de empuje y decoración Niño o Niña para revelación de género sorpresa con humo rosa o azul',
    imageTitle:
      'Pack Revelación de Género con Disparador TNT Retro Sorpresa | Humo Y Efectos',
    tubesRecommendation: 'De 2 a 4 Cañones sorpresa + Caja TNT',
    height: '15 metros de altura hacia el cielo',
    duration: 'Disparo instantáneo con palanca de detonador vintage',
    colors: ['Rosa Intenso o Azul Cielo sorpresa (Embalaje 100% secreto)'],
    includes: [
      'Caja detonadora TNT de estilo retro vintage con palanca de empuje hacia abajo',
      'Sistema de conexión inalámbrica sin cables entre la caja TNT y los cañones',
      'Cañones de humo aéreo sorpresa con exterior idéntico y precinto codificado',
      'Cañón de confeti biodegradable sorpresa a juego para los invitados',
      'Disparo a gran altura (15m) con disipación limpia respetando distancias de seguridad',
    ],
    description:
      'Los futuros papás colocan las manos juntos sobre la clásica palanca del detonador TNT. Hacen la cuenta atrás con sus seres queridos, bajan la palanca con fuerza y al instante el cielo estalla en una espectacular nube vertical azul o rosa de 15 metros. ¡El momento fotográfico más divertido y emocionante!',
    idealMoment: 'Fiesta de Revelación de Género y Baby Shower',
  },
  {
    id: 'pack-revelacion-mando',
    name: 'Pack Revelación de Género Clásico',
    tagline: '¿Niño o niña? La sorpresa revelada al pulsar el botón secreto inalámbrico',
    category: 'revelacion_genero',
    badge: '100% SECRETO Y CONFIDENCIAL',
    image: '/assets/services/pack-revelacion-genero-clasico-rosa-azul.jpg',
    imageAlt:
      'Pareja celebrando con emoción una revelación de género al aire libre con columnas verticales de humo rosa y azul detrás de ellos',
    imageTitle:
      'Pack Revelación de Género Clásico con Cañones de Humo Rosa y Azul | Humo Y Efectos',
    tubesRecommendation: 'De 2 a 4 Cañones sorpresa',
    height: '15 metros de altura',
    duration: 'Disparo instantáneo que abre en el cielo',
    colors: ['Rosa Intenso o Azul Cielo (Exterior neutro idéntico)'],
    includes: [
      'Morteros aéreos sorpresa con código secreto enviado al ginecólogo o cómplice',
      'Embalaje exterior completamente neutro sin pistas para los futuros padres',
      'Pulsador remoto de un solo clic listo para usar',
      'Efecto vertical instantáneo que abre en el cielo en azul o rosa',
      'Disipación limpia en pocos segundos en el aire',
    ],
    description:
      'Tu ginecólogo, matrona o cómplice nos comunica en secreto el resultado. Nosotros preparamos los cañones con código ciego. En el momento culminante, pulsáis el botón y el cielo revela la gran noticia.',
    idealMoment: 'Revelación de género íntima o con familia',
  },
  {
    id: 'pack-boda-total',
    name: 'Pack Boda Total 360° (Humo Aéreo + Confeti + Niebla Baja + Chispas Frías)',
    tagline: 'La experiencia completa que cubre todos los momentos cumbres del día',
    category: 'bodas',
    badge: 'TODO INCLUIDO',
    image: '/assets/services/novios-baile-nubes-humo-bajo.jpg',
    imageAlt:
      'Celebración de boda integral combinando baile de los novios sobre niebla baja y fuentes de chispas frías Sparkulars rodeados de sus invitados',
    imageTitle:
      'Pack Boda Total 360° (Humo Aéreo + Confeti + Niebla Baja + Chispas Frías) | Humo Y Efectos',
    tubesRecommendation: 'Cañones Aéreos + Confeti + Niebla Baja + Chispas Frías + Sonido',
    height: '15m Aéreo + Nube Suelo + Chispas 4m + Lluvia Confeti',
    duration: 'Disparos coordinados por momentos clave',
    colors: ['Colores aéreos a la carta + Mariposas / Blanco + Chispas Frías'],
    includes: [
      'Disparo instantáneo de humo aéreo para la entrada exterior o salida de iglesia',
      'Lluvia de confeti de mariposas o blanco nupcial biodegradable',
      'Máquina de niebla baja (hielo seco y agua caliente) para el primer baile nupcial',
      'Fuentes de Chispas Frías (Sparkulars) que no queman para interiores y noche',
      'Montaje y disparo oficial con técnico presencial en finca',
      'Dossier de homologación y seguro de responsabilidad civil para la finca',
    ],
    description:
      'La cobertura definitiva: disparo de humo aéreo al aire libre, lluvia de mariposas o confeti blanco, baile sobre las nubes con niebla baja y fuentes de chispas frías en el salón.',
    idealMoment: 'Ceremonia, Entrada al Banquete y Primer Baile',
  },
  {
    id: 'pack-bengalas-humo-mano',
    name: 'Pack Bengalas Profesionales de Mano',
    tagline: 'Efecto envolvente con anilla Wire-Pull de ignición fría sin mechero',
    category: 'bengalas',
    badge: 'FOTOGRAFÍA CREATIVA',
    image: '/assets/services/pack-bengalas-humo-mano-colores.jpg',
    imageAlt:
      'Efecto envolvente de bengala profesional de humo de color con ignición fría por anilla para sesiones fotográficas de novios e invitados',
    imageTitle:
      'Pack Bengalas Profesionales de Mano para Fotografía de Bodas y Eventos | Humo Y Efectos',
    tubesRecommendation: 'Pack de 10 o 20 unidades',
    height: 'A ras de suelo / Fotos de grupo',
    duration: 'Efecto foto envolvente',
    colors: ['Surtido multicolor o tonos corporativos'],
    includes: [
      'Bengalas con sistema Wire Pull (se tira de la anilla y arranca)',
      'Mango anticalórico atérmico para sujetar con las manos con seguridad',
      'Pigmento lavable que no tiñe manos, piel ni vestidos de novia',
      'Guía de posados para novios y fotógrafos',
    ],
    description:
      'El complemento estrella para reportajes fotográficos con damas de honor, amigos o invitados alrededor de los novios.',
    idealMoment: 'Preboda, reportaje nupcial y photocall dinámico',
  },
];

export const COMPARISON_DATA = [
  {
    feature: 'Tipo de Disparo',
    smokeEventos: 'Disparo instantáneo único: sube vertical, abre en altura y se disipa limpiamente en pocos segundos',
    lowCost: 'Emisiones continuas lentas que ahogan el aire y crean humo molesto persistente',
  },
  {
    feature: 'Certificación y Homologación Legal',
    smokeEventos: 'Certificado oficial CE Clase T1 (0163-T1-6069, Sbruffo Smoke 40, NEC 35g) con distancias técnicas reglamentadas (14,5m vertical, 3m radial, 19m público)',
    lowCost: 'Pirotecnia no homologada o importada sin sellado legal ni ficha técnica europea',
  },
  {
    feature: 'Efecto sobre Vestidos de Novia y Trajes',
    smokeEventos: 'Cañones a 14,5 - 15m con disipación limpia en el cenit a distancia reglamentaria (3m radiales y 19m al público); y Niebla Baja de hielo seco 100% vapor limpio que no moja ni mancha',
    lowCost: 'Bengalas baratas y botes de humo que expulsan tintes y pólvora con alto riesgo de manchar tejidos y piel',
  },
  {
    feature: 'Modalidad de Servicio e Instalación',
    smokeEventos: 'Asistencia y disparo exclusivo con técnico en finca: acudo yo o un especialista de mi equipo para montaje, distancias y detonación perfecta',
    lowCost: 'Envío de paquetes para que los novios o invitados manipulen artificios sin control ni seguridad',
  },
  {
    feature: 'Sistema de Activación',
    smokeEventos: 'Mando a distancia o Disparador TNT Retro con pulsador codificado',
    lowCost: 'Mechas manuales con cerillas (riesgo de quemaduras y retardo impredecible)',
  },
  {
    feature: 'Personalización de Cañones (1 a 9)',
    smokeEventos: 'Configuración libre: todos de un color o cada cañón con su tono en abanico',
    lowCost: 'Packs fijos cerrados sin opción de combinaciones personalizadas',
  },
  {
    feature: 'Apertura Visual y Altura',
    smokeEventos: 'Columna vertical compacta que abre en abanico a 15 metros para la foto perfecta',
    lowCost: 'Humo rastrero y disperso que tapa a los novios y arruina las fotos',
  },
];

export const CITIES_SEO = [
  {
    name: 'Talavera de la Reina (Sede Central)',
    slug: 'talavera',
    badge: 'Sede Central Humo Y Efectos',
    description:
      'Nuestra sede central y base operativa. Asistencia inmediata para bodas, comuniones y eventos en fincas de Talavera de la Reina, Comarca de la Jara, La Vera y alrededores sin costes de kilometraje ni suplementos.',
  },
  {
    name: 'Madrid (Fincas y Hoteles)',
    slug: 'madrid',
    badge: 'Servicio Técnico Directo Fincas',
    description:
      'Servicio prioritario en las fincas más reconocidas de la Comunidad de Madrid, Sierra de Guadarrama, Pozuelo, Las Rozas, Aranjuez, San Lorenzo de El Escorial y Alcalá de Henares con técnicos propios.',
  },
  {
    name: 'Toledo y Cigarrales',
    slug: 'toledo',
    badge: 'Técnicos Oficiales Toledo',
    description:
      'Especialistas en enlaces en cigarrales de Toledo, bodegas y cortijos toledanos. Disparo instantáneo de humo aéreo milimétrico con control técnico de viento y máxima seguridad.',
  },
  {
    name: 'Zona Centro (Ávila, Segovia, Guadalajara, Cáceres)',
    slug: 'zona-centro',
    badge: 'Cobertura Furgón Técnico',
    description:
      'Desplazamiento directo desde Talavera y Madrid para celebraciones en fincas de Ávila, Segovia, Guadalajara, Cuenca, Ciudad Real y Cáceres.',
  },
  {
    name: 'Toda España (Nivel Nacional)',
    slug: 'espana',
    badge: 'Nº 1 en Toda España',
    description:
      'Nos desplazamos por toda España con técnicos propios cualificados: Cataluña, Aragón, Levante, Andalucía, Galicia y Norte. Todo el equipamiento viaja con nosotros.',
  },
  {
    name: 'Zaragoza y Aragón',
    slug: 'zaragoza',
    badge: 'Delegación Logística',
    description:
      'Especialistas en fincas de Zaragoza, Huesca y Teruel con disparo instantáneo y efectos especiales para bodas.',
  },
  {
    name: 'Valencia y Levante',
    slug: 'valencia',
    badge: 'Alta Demanda Fiestas',
    description:
      'Humo aéreo instantáneo, confeti y fuego frío para alquerías, barracas y enlaces costeros en Alicante, Castellón y Valencia.',
  },
  {
    name: 'Sevilla y Andalucía',
    slug: 'andalucia',
    badge: 'Cobertura Completa',
    description:
      'Ideal para haciendas sevillanas, cortijos y bodas con luz natural vibrante en el sur.',
  },
];

export const FAQS = [
  {
    q: '¿Cómo funciona la Revelación de Género con Disparador TNT Retro?',
    a: 'Es la opción más divertida y fotogénica para los futuros papás. Os entregamos una caja detonadora TNT vintage con palanca de émbolo. Los papás sujetan la palanca juntos, hacen la cuenta atrás con sus invitados, y al bajar la palanca con fuerza, los cañones detonan al unísono hacia el cielo en rosa o azul. ¡Queda un recuerdo espectacular en vídeo y fotos!',
    category: 'Revelación de Género',
  },
  {
    q: '¿Qué opciones de Cañones de Confeti tenéis para bodas y fiestas?',
    a: 'Disponemos de cañones profesionales eléctricos y neumáticos de gran alcance (hasta 10-12 metros). Ofrecemos tres cargas estrella: 1) Confeti de Mariposas de seda o papel, que planean y giran suavemente en el aire creando un efecto poético e inolvidable para el primer baile o salida de novios; 2) Confeti de papel blanco mate, ideal para simular una elegante lluvia de nieve romántica; y 3) Confeti multicolor y metalizado en oro o plata para estallidos de fiesta y barra libre. Todo nuestro confeti es 100% biodegradable, no destiñe e ignífugo homologado CE.',
    category: 'Confeti',
  },
  {
    q: '¿Cómo funciona la Niebla Baja (Hielo Seco) para el vals nupcial?',
    a: 'Nuestra máquina de niebla baja combina agua caliente con hielo seco (CO2 sólido a -78°C). Esto genera una densa nube de vapor de agua blanco y puro que se desliza por el suelo sin subir por encima de las rodillas. Crea el efecto visual de "Bailar sobre las nubes". Al ser 100% vapor limpio de agua, no moja, no mancha telas de novia y no activa detectores de humo ni alarmas en salones de hoteles y fincas.',
    category: 'Niebla Baja',
  },
  {
    q: '¿Las máquinas de Chispas Frías (Sparkulars) son 100% seguras en interior?',
    a: 'Sí, totalmente. A diferencia de la pirotecnia tradicional, las fuentes Sparkular utilizan gránulos de titanio procesados electrónicamente a baja temperatura (fuego frío). No queman al tacto, no prenden telas, manteles ni vestidos de novia, y no generan humo ni olor. Están autorizadas en el 100% de salones cerrados, carpas y fincas.',
    category: 'Chispas Frías',
  },
  {
    q: '¿Alquiláis también Sonido, Iluminación y Discoteca Móvil para eventos?',
    a: '¡Sí! Aunque nuestro fuerte y especialidad reconocida en toda España son los efectos especiales y el humo aéreo, disponemos de servicio completo de alquiler de equipos de sonido PA de alta gama, microfonía inalámbrica para ceremonias, puentes de iluminación LED con cabezas móviles y discoteca móvil con DJ profesional para la barra libre. Así podéis contratar todo el espectáculo con un único proveedor de máxima confianza.',
    category: 'Sonido y Luces',
  },
  {
    q: '¿Con cuánta antelación debo solicitar mi reserva?',
    a: 'Recomendamos consultar disponibilidad con un mínimo de 2 a 4 semanas para asegurar el stock de tus colores preferidos, máquinas de niebla baja, chispas frías, cañones de confeti y caja TNT. Te enviamos una propuesta personalizada según fecha y lugar.',
    category: 'Servicio & Asistencia',
  },
  {
    q: '¿Cómo funciona la Revelación de Género sorpresa para los padres?',
    a: 'Tu clínica, matrona o la persona encargada nos comunica en secreto el resultado por WhatsApp o email con vuestro número de reserva. Nosotros preparamos los cañones con exterior idéntico y un precinto oculto. Ni los novios ni los invitados sabrán si el cielo se teñirá de azul o rosa hasta accionar el disparador.',
    category: 'Revelación de Género',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    couple: 'Lucía & Álvaro',
    location: 'Finca Los Lavaderos (Talavera de la Reina, Toledo)',
    date: 'Octubre 2024',
    rating: 5,
    text: 'Contratamos 6 cañones de humo aéreo en Talavera y fue el momentazo absoluto de la boda. Abrieron a 15 metros en el aire con un colorido espectacular y se disiparon enseguida sin manchar nada. ¡Todo el mundo quedó impresionado!',
    pack: 'Pack Entrada Nupcial Signature',
  },
  {
    id: 2,
    couple: 'Marta & Javier (Revelación de Género)',
    location: 'Finca Las Palmeras (Madrid)',
    date: 'Agosto 2024',
    rating: 5,
    text: '¡El pack con el disparador TNT fue lo mejor de toda la fiesta! Bajamos la palanca entre los dos y el cielo se llenó de un rosa increíble que abrió en una nube enorme. ¡Todos los invitados gritando de la emoción!',
    pack: 'Pack Revelación de Género con Disparador TNT Retro',
  },
  {
    id: 3,
    couple: 'Carlos & Sofía',
    location: 'Finca Soto de Cerrolén (Madrid)',
    date: 'Julio 2024',
    rating: 5,
    text: 'Contratamos la máquina de niebla baja (efecto flotar sobre las nubes) y las 4 fuentes de chispas frías para el baile nupcial. Fue mágico, parecía que estuviésemos flotando y las fotos quedaron de auténtica película.',
    pack: 'Pack Niebla Baja (Hielo Seco) & Chispas Frías',
  },
];
