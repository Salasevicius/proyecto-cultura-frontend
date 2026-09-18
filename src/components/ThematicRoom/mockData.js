export const thematicRoomData = {
  header: {
    volumen: "VOL. IV — ARCHIVO PATRIMONIAL",
    title: "Arte & Cultura",
    subtitle: "Catálogo razonado y expediente crítico de las disciplinas estéticas que construyeron la identidad del litoral.",
    imagenHero: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1920&auto=format&fit=crop",
    imagenFondo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1920&auto=format&fit=crop"
  },
  categorias: [
    {
      id: "pintura",
      numeroRomano: "I",
      nombre: "Pintura",
      disciplina: "Artes Plásticas & Vanguardia",
      obrasContadas: "142 Artículos en Acervo",
      temaColor: "#c9a463",
      imagenFondo: "/silosdavis.jpg",
      articulos: [
        {
          id: "p1",
          titulo: "Vanguardias y la Ruptura Pictórica del Litoral",
          capitular: "L",
          textoIntroductorio: "La plástica rosarina del siglo XX desarticuló los cánones académicos centralistas. Desde el Grupo de Arte Vanguardista hasta el desarrollo del dibujo como lenguaje autónomo, el lienzo local fue trinchera de experimentación y manifiesto político.",
          fecha: "1930 — PRESENTES",
          coordenadas: "32°56'S 60°38'O • MUSEO CASTAGNINO / MACRO",
          imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El color en el río no es materia fija, es un estado de ánimo colectivo.",
          autorCita: "Registro de Taller (1965)",
          notasMarginales: [
            "Curaduría: Colección Histórica Castagnino",
            "Técnica Predominante: Óleo, grabado y técnica mixta",
            "Estado de Conservación: Restauración 2024"
          ],
          relacionados: [
            {
              id: "p-rel-1",
              titulo: "El Manifiesto Mutualista de 1925",
              bajada: "Documentos inéditos sobre los primeros talleres independientes de la bajada del puerto.",
              imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=75&w=600&auto=format&fit=crop",
              tag: "DOCUMENTO"
            },
            {
              id: "p-rel-2",
              titulo: "Geometría del Grabado y la Madera",
              bajada: "Técnicas de xilografía aplicadas al paisaje industrial costero.",
              imagen: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=75&w=600&auto=format&fit=crop",
              tag: "TÉCNICA"
            },
            {
              id: "p-rel-3",
              titulo: "Retratos Urbanos del 900",
              bajada: "Estudio antropométrico y plástico de la burguesía y el proletariado.",
              imagen: "https://images.unsplash.com/photo-1582561847368-bb419339e1f5?q=75&w=600&auto=format&fit=crop",
              tag: "RESEÑA"
            }
          ]
        },
        {
          id: "p2",
          titulo: "El Realismo Ribereño y la Luz del Paraná",
          capitular: "E",
          textoIntroductorio: "El estudio de la luz natural sobre los meandros del río Paraná generó una escuela pictórica propia. Los maestros del pincel local capturaron la humedad atmosférica, el barro barcaza y las jornadas obreras de los puertos iniciales.",
          fecha: "1915 — 1945",
          coordenadas: "32°57'S 60°37'O • SALÓN MUNICIPAL DE BELLAS ARTES",
          imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "Pintar la orilla no es copiar el paisaje; es respirar sus humedales.",
          autorCita: "Manifiesto de los Pintores del Puerto (1928)",
          notasMarginales: [
            "Soporte: Lienzo lino importado",
            "Pigmentos: Tierras naturales y aglutinante vegetal",
            "Ubicación de Archivo: Reserva Técnica B"
          ],
          relacionados: [
            {
              id: "p-rel-4",
              titulo: "Pigmentos Orgánicos del Meandro",
              bajada: "Análisis químico de las paletas utilizadas en la década del 20.",
              imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=75&w=600&auto=format&fit=crop",
              tag: "QUÍMICA"
            },
            {
              id: "p-rel-5",
              titulo: "Nocturnos de la Bajada España",
              bajada: "Las series cromáticas sobre la nocturnidad ribereña.",
              imagen: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=75&w=600&auto=format&fit=crop",
              tag: "ANÁLISIS"
            }
          ]
        },
        {
          id: "p3",
          titulo: "Abstracción y Texturas de la Ribera Industrial",
          capitular: "A",
          textoIntroductorio: "Con la expansión de los silos y la arquitectura de hierro, la plástica incorporó óxidos, chapas y texturas matéricas. Una corriente que transformó el descarte portuario en una sofisticada sintaxis visual de carácter constructivo.",
          fecha: "1950 — 1978",
          coordenadas: "32°56'S 60°39'O • SALAS DE ARTE CONTEMPORÁNEO",
          imagen: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El óxido del puerto es la verdadera pátina de nuestra modernidad.",
          autorCita: "Crítica de Salón (1962)",
          notasMarginales: [
            "Técnica: Assemblage y materia sobre soporte rígido",
            "Colección: Acervo Experimental del Litoral",
            "Conservación: Tratamiento contra oxidación activa"
          ],
          relacionados: [
            {
              id: "p-rel-6",
              titulo: "Chatarra y Poesía Matérica",
              bajada: "El uso de elementos industriales recuperados en la escultura plana.",
              imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=75&w=600&auto=format&fit=crop",
              tag: "MATERIA"
            }
          ]
        },
        {
          id: "p4",
          titulo: "El Neofigurativismo y la Tensión Social en los Sesenta",
          capitular: "N",
          textoIntroductorio: "Las convulsiones políticas y sindicales de la época hallaron en la neofiguración un vehículo de alta densidad dramática. Los cuerpos fragmentados y las atmósferas opresivas de los óleos locales reflejaron la agitación obrera y estudiantil en el conurbano industrial.",
          fecha: "1960 — 1972",
          coordenadas: "32°57'S 60°38'O • GALERÍA MUNICIPAL DE ARTE",
          imagen: "https://images.unsplash.com/photo-1582561847368-bb419339e1f5?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1582561847368-bb419339e1f5?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El lienzo contemporáneo sangra las urgencias de la calle.",
          autorCita: "Manifiesto Plástico Rosarino (1966)",
          notasMarginales: [
            "Soporte: Tela de algodón de alta densidad",
            "Restauración: Consolidación de capas pictóricas",
            "Investigación: Beca de Acervo Crítico"
          ],
          relacionados: [
            {
              id: "p-rel-7",
              titulo: "Cuerpos en Tensión: Antropometría del Óleo",
              bajada: "Estudio sobre la distorsión anatómica como crítica sociopolítica.",
              imagen: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=75&w=600&auto=format&fit=crop",
              tag: "ESTUDIO"
            }
          ]
        },
        {
          id: "p5",
          titulo: "Paisajes Liminales: La Isla y el Humedal en la Pintura de Caballete",
          capitular: "P",
          textoIntroductorio: "Más allá del puerto urbano, los artistas cruzaron el cauce principal para instalar sus atriles en las islas del delta. El resultado es un repertorio de verdes turbios, arenas movedizas y celajes inmensos que documentan la mutación constante del ecosistema isleño.",
          fecha: "1935 — 1980",
          coordenadas: "32°55'S 60°35'O • RESERVA DEL DELTA",
          imagen: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "La isla no tiene contornos fijos; se dibuja y se borra con cada crecida.",
          autorCita: "Bitácora de Isla (1951)",
          notasMarginales: [
            "Técnica: Óleos de pequeño formato sobre tabla",
            "Clasificación: Paisajismo Crítico del Litoral",
            "Ubicación: Sala III - Fondos Regionales"
          ],
          relacionados: [
            {
              id: "p-rel-8",
              titulo: "Verdes de Bajada y Barrizales",
              bajada: "Análisis cromático de la vegetación anfibia en el arte moderno.",
              imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=75&w=600&auto=format&fit=crop",
              tag: "CROMATISMO"
            }
          ]
        }
      ]
    },
    {
      id: "musica",
      numeroRomano: "II",
      nombre: "Música",
      disciplina: "Sonoridad & Poética Urbano-Fluvial",
      obrasContadas: "89 Grabaciones de Archivo",
      temaColor: "#8c1414",
      imagenFondo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
      articulos: [
        {
          id: "m1",
          titulo: "La Trova Rosarina: El Manifiesto Poético Sonoro",
          capitular: "E",
          textoIntroductorio: "En las vísperas de los años ochenta, una generación de músicos locales fusionó el folklore urbano, el rock y la poesía lírica. La Trova representó el renacer de la voz democrática desde las márgenes del río.",
          fecha: "1982 — CRÓNICA VIVA",
          coordenadas: "32°56'S 60°38'O • TEATRO EL CÍRCULO",
          imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "Cantar desde el puerto es hacer vibrar las piedras del río.",
          autorCita: "Manifiesto Sonoro de los 80",
          notasMarginales: [
            "Archivos Fonográficos: Cintas Abiertas 1/4 inch",
            "Acústica Ensayada: Sala de Conciertos El Círculo",
            "Impacto: Movimiento Trova Nacional"
          ],
          relacionados: [
            {
              id: "m-rel-1",
              titulo: "Los Ensayos Secretos del 81",
              bajada: "Cintas recuperadas de los sótanos de ensayo de la calle Salta.",
              imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=75&w=600&auto=format&fit=crop",
              tag: "FONOGRAMA"
            },
            {
              id: "m-rel-2",
              titulo: "Acústica Teatral Italiana",
              bajada: "Cómo la arquitectura neoclásica moldeó la resonancia del movimiento.",
              imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=75&w=600&auto=format&fit=crop",
              tag: "ARQUITECTURA"
            }
          ]
        },
        {
          id: "m2",
          titulo: "Acordes del Puerto y el Jazz Ribereño",
          capitular: "D",
          textoIntroductorio: "El intercambio comercial en la cuenca del Plata trajo consigo vinilos e instrumentos de viento de ultramar. Los clubes nocturnos de Pichincha y el centro albergaron sincopadas jam sessions que sentaron las bases del jazz de la ciudad.",
          fecha: "1940 — 1968",
          coordenadas: "32°56'S 60°39'O • CLUB SOCIAL PICHINCHA",
          imagen: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El viento del sur soplaba en los metales antes de perderse en el muelle.",
          autorCita: "Crónicas del Jazz Subterráneo (1955)",
          notasMarginales: [
            "Instrumentos Destacados: Saxofón alto, Contrabajo de pino",
            "Formatos Conservados: Discos de pasta 78 RPM",
            "Estado: Digitalización en Alta Fidelidad"
          ],
          relacionados: [
            {
              id: "m-rel-3",
              titulo: "La Noche de los Clarinetes Ocultos",
              bajada: "Registros sonoros de las veladas de 1952 en el puerto.",
              imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=75&w=600&auto=format&fit=crop",
              tag: "HISTORIA"
            }
          ]
        },
        {
          id: "m3",
          titulo: "Orquestas Típicas y Tangos de Arrabal",
          capitular: "T",
          textoIntroductorio: "Las esquinas de barrio y los cafés cantantes vibraron al compás del bandoneón durante la edad de oro del tango. Las formaciones típicas rosarinas desarrollaron arreglos complejos que rivalizaron con los grandes coliseos porteños.",
          fecha: "1925 — 1955",
          coordenadas: "32°57'S 60°38'O • ANTIGUO CAFÉ DE LA COMEDIA",
          imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El fueye llora con acento fluvial cuando la noche se instala en el bulevar.",
          autorCita: "Memorias del Bandoneón (1948)",
          notasMarginales: [
            "Arreglos: Partituras originales firmadas a tinta china",
            "Salas Históricas: Cine Teatro Astrea",
            "Archivo Sonoro: Transcripciones de Radio Splendid Litoral"
          ],
          relacionados: [
            {
              id: "m-rel-4",
              titulo: "Bandoneones del Río Hondo",
              bajada: "Mantenimiento y afinación de los fuelles en climas húmedos.",
              imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=75&w=600&auto=format&fit=crop",
              tag: "LUTHIER"
            }
          ]
        },
        {
          id: "m4",
          titulo: "Folklore de Orilla y Canto Surero en el Litoral",
          capitular: "F",
          textoIntroductorio: "La confluencia de migrantes internos y saberes nativos consolidó un cancionero folklórico de fuerte arraigo en las peñas y festivales provinciales. Las guitarras criollas y las voces contrapunteadas tejieron un puente entre la llanura pampeana y el sistema fluvial.",
          fecha: "1950 — 1980",
          coordenadas: "32°58'S 60°36'O • PEÑAS FOLKLÓRICAS HISTÓRICAS",
          imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "La zamba en el puerto adquiere el ritmo pausado de las barcazas.",
          autorCita: "Crónicas del Canto Nativo (1970)",
          notasMarginales: [
            "Registros: Grabaciones de campo en festivales zonales",
            "Instrumentación: Guitarra de caja ancha y bombo legüero",
            "Acervo: Fonoteca Tradicional de Santa Fe"
          ],
          relacionados: [
            {
              id: "m-rel-5",
              titulo: "Guitarras de Madera Blanca",
              bajada: "Construcción artesanal de instrumentos en talleres del barrio Belgrano.",
              imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=75&w=600&auto=format&fit=crop",
              tag: "LUTHIERÍA"
            }
          ]
        }
      ]
    },
    {
      id: "teatro",
      numeroRomano: "III",
      nombre: "Teatro",
      disciplina: "Dramaturgia, Coliseos & Escena Independiente",
      obrasContadas: "115 Obras y Registros Escénicos",
      temaColor: "#7a2838",
      imagenFondo: "/el-circulo-rosario.webp",
      articulos: [
        {
          id: "t1",
          titulo: "Coliseos Históricos y la Ópera en el Litoral",
          capitular: "L",
          textoIntroductorio: "La inauguración de grandes salas líricas como El Círculo posicionó a Rosario en el circuito internacional de ópera y drama. Compañías líricas de Milán y Madrid encontraban en la gran sala local una acústica inigualable y un público de rigurosa exigencia estética.",
          fecha: "1904 — 1950",
          coordenadas: "32°56'S 60°38'O • TEATRO EL CÍRCULO / LAPRIDA Y MENDOZA",
          imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "Bajo la cúpula pintada por Centurión, el drama humano adquiere dimensión universal.",
          autorCita: "Crónicas de la Temporada Lírica (1912)",
          notasMarginales: [
            "Arquitectura: Estilo Renacimiento Italiano con foso hidráulico",
            "Acervo: Libretos originales de temporada operística",
            "Restauración: Puesta en valor de frescos y tarimas"
          ],
          relacionados: [
            {
              id: "t-rel-1",
              titulo: "La Cúpula Pintada y sus Alegorías",
              bajada: "Estudio iconográfico de los cielorrasos del coliseo principal.",
              imagen: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=75&w=600&auto=format&fit=crop",
              tag: "PATRIMONIO"
            },
            {
              id: "t-rel-2",
              titulo: "Vestuarios de Terciopelo y 1910",
              bajada: "Catálogo de indumentaria conservada en los altillos del teatro.",
              imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=75&w=600&auto=format&fit=crop",
              tag: "VESTUARIO"
            }
          ]
        },
        {
          id: "t2",
          titulo: "Teatros Independientes y el Nuevo Realismo",
          capitular: "S",
          textoIntroductorio: "A mediados del siglo XX, los sótanos y galpones reconvertidos dieron luz a un movimiento de teatro independiente sin precedentes. Directores y dramaturgos locales exploraron el absurdo, la crítica social y la experimentación corporal en espacios no convencionales.",
          fecha: "1955 — 1985",
          coordenadas: "32°57'S 60°37'O • SALAS UNDERGROUND DEL CENTRO",
          imagen: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "Hacer teatro en el sótano es desafiar la luz oficial con la linterna de la poesía.",
          autorCita: "Manifiesto de Dramaturgia Independiente (1968)",
          notasMarginales: [
            "Soportes: Programas mimeografiados y críticas de prensa",
            "Redes Escénicas: Circuito cooperativo del litoral",
            "Fondo Documental: Archivo Teatral Rosarino"
          ],
          relacionados: [
            {
              id: "t-rel-3",
              titulo: "Los Talleres de Actuación de la Cortada",
              bajada: "Métodos de entrenamiento corporal y voz en la escena de los 70.",
              imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=75&w=600&auto=format&fit=crop",
              tag: "MÉTODO"
            },
            {
              id: "t-rel-4",
              titulo: "Dramaturgia de Resistencia",
              bajada: "Textos breves representados en funciones clandestinas de medianoche.",
              imagen: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=75&w=600&auto=format&fit=crop",
              tag: "TEXTO"
            }
          ]
        },
        {
          id: "t3",
          titulo: "El Grotesco Criollo y la Sátira en los Conventillos",
          capitular: "G",
          textoIntroductorio: "La hibridación cultural de los conventillos encontró en el grotesco criollo un espejo trágico y cómico de las contradicciones inmigratorias. Las piezas dramáticas representadas en los patios internos desnudaron las ilusiones de ascenso social frente a la crudeza urbana.",
          fecha: "1920 — 1948",
          coordenadas: "32°58'S 60°38'O • ANTIGUO TEATRO BALMORAL",
          imagen: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "La risa en el conventillo siempre esconde una lágrima de asfalto y puerto.",
          autorCita: "Crítica de Teatro Popular (1935)",
          notasMarginales: [
            "Género: Comedia dramática de raigambre social",
            "Escenarios: Patios de inquilinatos y salas barriales",
            "Archivo: Documentación Escénica del Litoral"
          ],
          relacionados: [
            {
              id: "t-rel-5",
              titulo: "Escenografías de Inquilinato",
              bajada: "Reconstrucción de espacios habitacionales en los escenarios de época.",
              imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=75&w=600&auto=format&fit=crop",
              tag: "ESCENOGRAFÍA"
            }
          ]
        }
      ]
    },
    {
      id: "escultura",
      numeroRomano: "IV",
      nombre: "Escultura",
      disciplina: "Monumentalidad, Bronce & Caliza",
      obrasContadas: "56 Monumentos Urbanos",
      temaColor: "#4a6b82",
      imagenFondo: "/cabralescultura.webp",
      articulos: [
        {
          id: "e1",
          titulo: "La Geometría Monumental en el Espacio Público",
          capitular: "E",
          textoIntroductorio: "El relieve neoclásico y la escultura de vanguardia coexisten en el trazado urbano. El bronce, la piedra caliza y el granito tallado dialogan con el paisaje fluvial, transformando parques en galerías a cielo abierto.",
          fecha: "1910 — 1957",
          coordenadas: "32°57'S 60°37'O • PARQUE NACIONAL A LA BANDERA",
          imagen: "https://images.unsplash.com/photo-1544411047-c491e34a2465?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1544411047-c491e34a2465?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "La piedra no oculta el espacio: lo esculpe para la eternidad.",
          autorCita: "Anales de Escultura Monumental",
          notasMarginales: [
            "Materiales: Bronce patinado y Mármol Travertino",
            "Trazado Escultórico: Eje Fluvial Centro",
            "Registro Patrimonial: Ley 12.735"
          ],
          relacionados: [
            {
              id: "e-rel-1",
              titulo: "Fundiciones del Puerto Viejo",
              bajada: "Proceso de colada en bronce de los relieves conmemorativos.",
              imagen: "https://images.unsplash.com/photo-1569084024058-1632922a4e2d?q=75&w=600&auto=format&fit=crop",
              tag: "OFICIO"
            },
            {
              id: "e-rel-2",
              titulo: "Mármol Travertino y Humedad",
              bajada: "Comportamiento del material expuesto a la humedad costera.",
              imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=75&w=600&auto=format&fit=crop",
              tag: "CONSERVACIÓN"
            }
          ]
        },
        {
          id: "e2",
          titulo: "Relieves y Alegorías en la Arquitectura Bancaria",
          capitular: "F",
          textoIntroductorio: "Las fachadas de los grandes edificios financieros e institucionales del bulevar y la peatonal exhiben frisos escultóricos de gran porte. En ellos se alegoriza el comercio agrario, la navegación fluvial y el trabajo industrial.",
          fecha: "1905 — 1935",
          coordenadas: "32°56'S 60°38'O • PASEO DE LAS CARIÁTIDES",
          imagen: "https://images.unsplash.com/photo-1569084024058-1632922a4e2d?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1569084024058-1632922a4e2d?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El frontón esculpido es el testamento cívico grabado sobre el muro de piedra.",
          autorCita: "Tratado de Arquitectura y Escultura Civil",
          notasMarginales: [
            "Escultores: Maestros itinerantes formados en Academias Europeas",
            "Soporte: Sillería de piedra parís y revoques armados",
            "Catálogo: Relevamiento Patrimonial Urbano"
          ],
          relacionados: [
            {
              id: "e-rel-3",
              titulo: "Cariátides y Atlantes del Centro Histórico",
              bajada: "Guía fotográfica de los soportes antropomorfos en ochavas históricas.",
              imagen: "https://images.unsplash.com/photo-1544411047-c491e34a2465?q=75&w=600&auto=format&fit=crop",
              tag: "ARQUITECTURA"
            }
          ]
        },
        {
          id: "e3",
          titulo: "Escultura Moderna y Abstracción en los Parques Públicos",
          capitular: "M",
          textoIntroductorio: "La inserción de piezas abstractas en el espacio verde modificó la relación de la ciudadanía con el arte tridimensional. Hierro soldado y hormigón visto desafiaron la gravedad en los paseos costeros durante la expansión urbana de mediados de siglo.",
          fecha: "1958 — 1975",
          coordenadas: "32°55'S 60°39'O • PARQUE URQUIZA",
          imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "La escultura moderna al aire libre interpela al caminante sin mediaciones académicas.",
          autorCita: "Seminario de Arte Público (1971)",
          notasMarginales: [
            "Materiales: Perfiles de hierro laminado y hormigón armado",
            "Intervención: Circuito de Arte en Espacios Verdes",
            "Conservación: Mantenimiento preventivo contra corrosión"
          ],
          relacionados: [
            {
              id: "e-rel-4",
              titulo: "Soldadura y Estética Industrial",
              bajada: "Técnicas de unión en las estructuras escultóricas de gran porte.",
              imagen: "https://images.unsplash.com/photo-1569084024058-1632922a4e2d?q=75&w=600&auto=format&fit=crop",
              tag: "TÉCNICA"
            }
          ]
        }
      ]
    },
    {
      id: "literatura",
      numeroRomano: "V",
      nombre: "Literatura",
      disciplina: "Letras, Editores & Revistas Subterráneas",
      obrasContadas: "310 Volúmenes Impresos",
      temaColor: "#c27b38",
      imagenFondo: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1600&auto=format&fit=crop",
      articulos: [
        {
          id: "l1",
          titulo: "Imprentas Clandestinas y la Poesía del Puerto",
          capitular: "L",
          textoIntroductorio: "Las imprentas independientes y las revistas culturales marcaron el pulso de las letras locales. Una narrativa caracterizada por la melancolía ribereña, el realismo crítico y una poesía que captura la bruma nocturna.",
          fecha: "1920 — CONTEMPORÁNEO",
          coordenadas: "32°56'S 60°38'O • BIBLIOTECA ARGENTINA DR. JUAN ÁLVAREZ",
          imagen: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "Escribir en la orilla es registrar el paso del tiempo en el agua.",
          autorCita: "Cuadernos de la Biblioteca Argentina",
          notasMarginales: [
            "Ediciones Primera Plana: Fondos Rarísimos",
            "Géneros Predominantes: Poesía del Litoral y Crónica",
            "Catálogo de Incunables: Fondo Histórico"
          ],
          relacionados: [
            {
              id: "l-rel-1",
              titulo: "Revistas Literarias de los Años 40",
              bajada: "Tiradas limitadas impresas en tipos móviles de plomo.",
              imagen: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=75&w=600&auto=format&fit=crop",
              tag: "PUBLICACIONES"
            },
            {
              id: "l-rel-2",
              titulo: "El Lenguaje de la Niebla",
              bajada: "Metafísica del río en la narrativa breve de mediados de siglo.",
              imagen: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=75&w=600&auto=format&fit=crop",
              tag: "ENSAYO"
            }
          ]
        },
        {
          id: "l2",
          titulo: "Narrativa Urbana y los Diarios de Orilla",
          capitular: "C",
          textoIntroductorio: "La prosa realista en Rosario configuró un mapa literario donde el conventillo, las barrancas y las madrugadas portuarias son personajes con vida propia. Los cronistas de la primera mitad de siglo retrataron el pulso obrero con precisión documental.",
          fecha: "1930 — 1970",
          coordenadas: "32°57'S 60°37'O • HEMEROTECA MUNICIPAL",
          imagen: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "La ciudad se cuenta a sí misma a través del rumor constante de sus imprentas.",
          autorCita: "Estudios de Crítica Literaria Litoraleña",
          notasMarginales: [
            "Soportes: Papel prensa de época y folletines",
            "Fondo: Colección Autores Rosarinos",
            "Investigación: Seminario de Letras Regionales"
          ],
          relacionados: [
            {
              id: "l-rel-3",
              titulo: "Folletines y Crimen en el Bulevar",
              bajada: "Análisis de las novelas por entregas publicadas en periódicos locales.",
              imagen: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=75&w=600&auto=format&fit=crop",
              tag: "CRÓNICA"
            }
          ]
        },
        {
          id: "l3",
          titulo: "Ensayo Crítico y Pensamiento Social en la Universidad del Litoral",
          capitular: "E",
          textoIntroductorio: "El arco intelectual nucleado en torno a las extensiones universitarias y las revistas de pensamiento crítico generó un corpus ensayístico de incalculable valor. La sociología urbana, la economía regional y la filosofía estética encontraron tribuna en publicaciones de tirada nacional.",
          fecha: "1940 — 1975",
          coordenadas: "32°57'S 60°38'O • FACULTAD DE HUMANIDADES Y ARTES",
          imagen: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
          imagenFondo: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1600&auto=format&fit=crop",
          citaTextual: "El pensamiento crítico en la región es una herramienta de emancipación intelectual.",
          autorCita: "Anales de Extensión Universitaria (1964)",
          notasMarginales: [
            "Soportes: Cuadernos académicos y revistas trimestrales",
            "Fondo: Archivo Histórico de Humanidades",
            "Relevamiento: Investigaciones Bibliográficas del Litoral"
          ],
          relacionados: [
            {
              id: "l-rel-4",
              titulo: "Revistas de Sociología Urbana",
              bajada: "Artículos fundamentales sobre la transformación demográfica y portuaria.",
              imagen: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=75&w=600&auto=format&fit=crop",
              tag: "SOCIOLOGÍA"
            }
          ]
        }
      ]
    }
  ]
};