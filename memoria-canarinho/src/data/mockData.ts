export type Category = 'Fotografias' | 'Entrevistas' | 'Documentos' | 'Objetos 3D' | 'Vídeos' | 'Áudios';

export interface CollectionItem {
  id: string;
  title: string;
  category: Category;
  year: string;
  competition?: string;
  opponent?: string;
  player?: string;
  description: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  transcription?: string;
  creatorEmail?: string;
}

const mockItemsPT: CollectionItem[] = [
  {
    id: '1',
    title: 'Pelé levanta a Taça Jules Rimet',
    category: 'Fotografias',
    year: '1970',
    competition: 'Copa do Mundo',
    opponent: 'Itália',
    player: 'Pelé',
    description: 'Um dos momentos mais icônicos da história do futebol mundial: Pelé ergue a Taça Jules Rimet, consagrando o Brasil como o primeiro tricampeão mundial. A imagem captura a alegria contagiante do Rei do Futebol cercado por torcedores no gramado do Estádio Azteca, no México, simbolizando o ápice de uma era dourada para o esporte brasileiro.',
    imageUrl: 'https://placehold.co/600x800/19AE47/FFFFFF?text=Pele+1970',
  },
  {
    id: '2',
    title: 'Narração do Gol de Carlos Alberto',
    category: 'Áudios',
    year: '1970',
    competition: 'Copa do Mundo',
    opponent: 'Itália',
    player: 'Carlos Alberto Torres',
    description: 'Ouça a emocionante e clássica narração do último gol da final de 1970. A jogada, que envolveu quase todo o time brasileiro, é considerada por muitos como o maior gol da história das Copas do Mundo. O chute fulminante do capitão Carlos Alberto (o "Capita") selou a vitória por 4 a 1 sobre a Itália.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    transcription: 'E lá vai o Brasil... Tocou para Jairzinho... Pelé... Esperou a passagem do Carlos Alberto. Bateu cruzado! Goooool do Brasil! Um golaço! Carlos Alberto Torres é o nome dele!'
  },
  {
    id: '3',
    title: 'Súmula do Jogo - Brasil x Uruguai',
    category: 'Documentos',
    year: '1950',
    competition: 'Copa do Mundo',
    opponent: 'Uruguai',
    description: 'Este é o documento oficial e original da súmula da final da Copa do Mundo de 1950, um registro histórico do evento que ficou conhecido como "Maracanazo". O documento exibe as escalações e as anotações do árbitro, servindo como uma testemunha silenciosa de uma das tardes mais impactantes da história esportiva do Brasil.',
    imageUrl: 'https://placehold.co/600x800/eeeeee/193375?text=Sumula+1950',
  },
  {
    id: '4',
    title: 'Entrevista Zagallo 1994',
    category: 'Entrevistas',
    year: '1994',
    competition: 'Copa do Mundo',
    player: 'Zagallo',
    description: 'Entrevista exclusiva e histórica com Zagallo, concedida nos dias que antecederam a grande final da Copa de 1994. Com sua habitual paixão e superstição ("Vocês vão ter que me engolir!"), o Velho Lobo transmite confiança na conquista do inédito tetracampeonato após 24 anos de espera.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    transcription: 'Nós estamos preparados. O Brasil tem uma equipe forte, consistente e vamos buscar esse título com toda a garra. A torcida pode acreditar!'
  },
  {
    id: '5',
    title: 'Camisa 1958 Final',
    category: 'Objetos 3D',
    year: '1958',
    competition: 'Copa do Mundo',
    opponent: 'Suécia',
    description: 'O modelo 3D digitalizado da lendária camisa azul, improvisada e utilizada pela Seleção Brasileira na final de 1958 contra a Suécia. Segundo a lenda, o chefe da delegação Paulo Machado de Carvalho inspirou os jogadores dizendo que era o azul do manto de Nossa Senhora Aparecida, afastando o medo de não jogar com a tradicional Amarelinha.',
    imageUrl: 'https://placehold.co/600x800/0C87D1/FFFFFF?text=Camisa+1958'
  },
  {
    id: '6',
    title: 'Gol de Adriano Imperador no Último Minuto',
    category: 'Vídeos',
    year: '2004',
    competition: 'Copa América',
    opponent: 'Argentina',
    player: 'Adriano',
    description: 'Reviva o momento de puro êxtase na final da Copa América 2004. Nos últimos segundos dos acréscimos (47 do segundo tempo), Adriano domina na área, gira e desfere um chute de perna esquerda indefensável. O gol levou o jogo para os pênaltis, onde o Brasil se sagrou campeão de forma espetacular.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '7',
    title: 'Ronaldo Fenômeno Garante o Penta',
    category: 'Fotografias',
    year: '2002',
    competition: 'Copa do Mundo',
    opponent: 'Alemanha',
    player: 'Ronaldo',
    description: 'A fotografia perfeita da redenção. Ronaldo comemora com seu famoso corte de cabelo "Cascão" um dos seus dois gols na grande final contra a Alemanha, em Yokohama. Após lesões gravíssimas, ele retornou ao topo do mundo para dar ao Brasil o pentacampeonato invicto.',
    imageUrl: 'https://placehold.co/600x800/19AE47/FFFFFF?text=Ronaldo+2002'
  },
  {
    id: '8',
    title: 'Pênalti Decisivo de Neymar e Ouro Inédito',
    category: 'Fotografias',
    year: '2016',
    competition: 'Olimpíadas',
    opponent: 'Alemanha',
    player: 'Neymar',
    description: 'O momento de maior catarse do Maracanã nas Olimpíadas do Rio. A imagem captura o instante em que Neymar, sob imensa pressão, cobra o pênalti decisivo contra a Alemanha. O gol encerrou a longa espera do futebol brasileiro pelo único título que lhe faltava: a medalha de Ouro Olímpica.',
    imageUrl: 'https://placehold.co/600x800/FFD700/000000?text=Ouro+2016'
  },
  {
    id: '9',
    title: '"Sai que é sua Taffarel!"',
    category: 'Áudios',
    year: '1994',
    competition: 'Copa do Mundo',
    opponent: 'Itália',
    player: 'Taffarel',
    description: 'Escute a eletrizante disputa de pênaltis na final de 1994 em Pasadena. A gravação imortalizou não apenas o herói do jogo, o goleiro Taffarel, mas também a voz emblemática de Galvão Bueno exclamando "É Tetra!" após o italiano Roberto Baggio isolar a bola na última cobrança.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    transcription: 'Vai partir Baggio... Bateu... Pra fora! Acabou! É Tetra! É Tetra! Sai que é sua Taffarel!'
  },
  {
    id: '10',
    title: 'Marta Brilha em Atenas',
    category: 'Fotografias',
    year: '2004',
    competition: 'Olimpíadas',
    player: 'Marta',
    description: 'A jovem Marta, já demonstrando ser a futura Rainha do Futebol, conduzindo a Seleção Feminina em uma campanha maravilhosa que culminou na primeira medalha de Prata olímpica do Brasil em Atenas. Uma imagem que representa o início do boom do futebol feminino brasileiro no cenário mundial.',
    imageUrl: 'https://placehold.co/600x800/193375/FFFFFF?text=Marta+2004'
  },
  {
    id: '11',
    title: 'Show de Ronaldinho Gaúcho',
    category: 'Vídeos',
    year: '2005',
    competition: 'Copa das Confederações',
    opponent: 'Argentina',
    player: 'Ronaldinho Gaúcho',
    description: 'Assista aos melhores lances de uma atuação de gala de Ronaldinho. No auge de sua forma, ele comandou a Seleção em uma goleada impiedosa de 4 a 1 contra a maior rival, a Argentina, na final disputada na Alemanha, desfilando sua magia, dribles curtos e visão de jogo.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '12',
    title: 'Gol de Romário no Maracanã',
    category: 'Fotografias',
    year: '1989',
    competition: 'Copa América',
    opponent: 'Uruguai',
    player: 'Romário',
    description: 'Esta imagem eterniza o exato segundo em que Romário cabeceia a bola para o fundo das redes do Uruguai, no Maracanã lotado. O gol garantiu o título da Copa América de 1989 e encerrou um jejum doloroso de 40 anos sem títulos importantes para o Brasil diante de sua torcida.',
    imageUrl: 'https://placehold.co/600x800/19AE47/FFFFFF?text=Romario+1989'
  },
  {
    id: '13',
    title: 'Despedida da Lenda Formiga',
    category: 'Entrevistas',
    year: '2021',
    competition: 'Amistoso',
    player: 'Formiga',
    description: 'A emocionante e profunda entrevista concedida após a última partida oficial da volante Formiga com a camisa amarela. Com recordes impressionantes de participações em Copas do Mundo e Olimpíadas, ela fala sobre seu legado, as dificuldades enfrentadas pelas mulheres no esporte e a passagem de bastão.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    transcription: 'É um orgulho imenso ter vestido essa camisa por mais de duas décadas. Deixo um legado de muita luta para a próxima geração. O futebol feminino no Brasil precisa ser abraçado por todos.'
  },
  {
    id: '14',
    title: 'Virada Épica com Kaká e Luís Fabiano',
    category: 'Documentos',
    year: '2009',
    competition: 'Copa das Confederações',
    opponent: 'Estados Unidos',
    player: 'Kaká',
    description: 'Este relatório tático original detalha como o Brasil, perdendo por 2 a 0 no primeiro tempo para os EUA, mudou sua postura. Com grande liderança de Kaká e gols cruciais de Luís Fabiano e Lúcio, a equipe buscou uma virada épica para 3 a 2 na final, demonstrando enorme força mental.',
    imageUrl: 'https://placehold.co/600x800/eeeeee/193375?text=Relatorio+2009'
  },
  {
    id: '15',
    title: 'A Comemoração do Bebeto ("Embala Neném")',
    category: 'Fotografias',
    year: '1994',
    competition: 'Copa do Mundo',
    opponent: 'Holanda',
    player: 'Bebeto',
    description: 'Nas quartas de final contra a Holanda, Bebeto marcou um gol antológico e correu para a lateral do campo simulando embalar um bebê, homenageando seu filho Mattheus recém-nascido. Imediatamente acompanhado por Romário e Mazinho, criaram a comemoração mais copiada do mundo naquele ano.',
    imageUrl: 'https://placehold.co/600x800/0C87D1/FFFFFF?text=Bebeto+1994'
  },
  {
    id: '16',
    title: 'Drible Desconcertante de Garrincha',
    category: 'Vídeos',
    year: '1962',
    competition: 'Copa do Mundo',
    opponent: 'Inglaterra',
    player: 'Garrincha',
    description: 'Um vídeo clássico e restaurado mostrando a genialidade de Mané Garrincha. Na Copa do Chile, assumindo o protagonismo após a lesão de Pelé, o Anjo das Pernas Tortas entortou completamente a forte defesa inglesa, marcando de cabeça e em belo chute de fora da área.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '17',
    title: 'Gol de Ouro de Malcom em Tóquio',
    category: 'Fotografias',
    year: '2021',
    competition: 'Olimpíadas',
    opponent: 'Espanha',
    player: 'Malcom',
    description: 'O flash do gol do bicampeonato olímpico! Na prorrogação da tensa final contra a Espanha nos Jogos de Tóquio, o atacante Malcom ganha na velocidade da defesa espanhola e chuta cruzado para marcar o gol de ouro, selando a conquista da segunda medalha dourada consecutiva.',
    imageUrl: 'https://placehold.co/600x800/FFD700/000000?text=Ouro+2020'
  },
  {
    id: '18',
    title: 'Neymar Maior Artilheiro da Seleção',
    category: 'Fotografias',
    year: '2023',
    competition: 'Eliminatórias',
    opponent: 'Bolívia',
    player: 'Neymar',
    description: 'Momento histórico no Estádio Mangueirão em que Neymar marca duas vezes contra a Bolívia, chegando a 79 gols oficiais e ultrapassando a marca de Pelé (nas contas da FIFA), consagrando-se como o maior artilheiro da história da Seleção Brasileira Masculina.',
    imageUrl: 'https://placehold.co/600x800/19AE47/FFFFFF?text=Neymar+2023'
  }
];

export const translateItemToEN = (item: CollectionItem): CollectionItem => {
  let competition = item.competition;
  if (competition === 'Copa do Mundo') competition = 'World Cup';
  else if (competition === 'Copa América') competition = 'America Cup';
  else if (competition === 'Olimpíadas') competition = 'Olympics';
  else if (competition === 'Copa das Confederações') competition = 'Confederations Cup';
  else if (competition === 'Amistoso') competition = 'Friendly';
  else if (competition === 'Eliminatórias') competition = 'Qualifiers';

  let opponent = item.opponent;
  if (opponent === 'Itália') opponent = 'Italy';
  else if (opponent === 'Uruguai') opponent = 'Uruguay';
  else if (opponent === 'Suécia') opponent = 'Sweden';
  else if (opponent === 'Alemanha') opponent = 'Germany';
  else if (opponent === 'Holanda') opponent = 'Netherlands';
  else if (opponent === 'Inglaterra') opponent = 'England';
  else if (opponent === 'Espanha') opponent = 'Spain';
  else if (opponent === 'Bolívia') opponent = 'Bolivia';
  else if (opponent === 'Estados Unidos') opponent = 'USA';
  else if (opponent === 'Sérvia') opponent = 'Serbia';

  let title = item.title;
  let description = item.description;

  if (title === 'Voleio de Richarlison contra a Sérvia') {
    title = 'Richarlison\'s Volley against Serbia';
  }
  if (description === 'Golaço de Richarlison contra a servia') {
    description = 'Richarlison\'s great goal against Serbia';
  }

  if (item.id.startsWith('collab-')) {
    if (description.includes('Pelé marca um gol contra a Argentina em plena Copa do Mundo de 1970')) {
      description = 'Pelé scores a goal against Argentina right in the middle of the 1970 World Cup.';
    } else if (description.includes('Pelé marca um golaço contra a Argentina em plena Copa do Mundo de 1970')) {
      description = 'Pelé scores a great goal against Argentina right in the middle of the 1970 World Cup.';
    }
  }

  const enItem = { ...item, competition, opponent, title, description };

  if (item.id === '1') return { ...enItem, title: 'Pelé Lifts the Jules Rimet Trophy', description: 'One of the most iconic moments in world football history: Pelé lifts the Jules Rimet Trophy, consecrating Brazil as the first three-time world champion. The image captures the contagious joy of the King of Football surrounded by fans on the pitch of the Azteca Stadium in Mexico.' };
  if (item.id === '2') return { ...enItem, title: 'Narration of Carlos Alberto\'s Goal', description: 'Listen to the emotional and classic narration of the last goal of the 1970 final. The play, which involved almost the entire Brazilian team, is considered by many to be the greatest goal in World Cup history.' };
  if (item.id === '3') return { ...enItem, title: 'Match Summary - Brazil vs Uruguay', description: 'This is the official and original match summary of the 1950 World Cup final, a historical record of the event known as the "Maracanazo".' };
  if (item.id === '4') return { ...enItem, title: 'Zagallo Interview 1994', description: 'Exclusive and historic interview with Zagallo, given in the days leading up to the 1994 final. With his usual passion and superstition, the Old Wolf conveys confidence in winning the unprecedented fourth championship.' };
  if (item.id === '5') return { ...enItem, title: '1958 Final Shirt', description: 'The digitized 3D model of the legendary blue shirt, improvised and used by the Brazilian National Team in the 1958 final against Sweden.' };
  if (item.id === '6') return { ...enItem, title: 'Adriano Emperor\'s Last Minute Goal', description: 'Relive the moment of pure ecstasy in the 2004 Copa América final. In the last seconds of stoppage time, Adriano dominates in the area, turns and unleashes an indefensible left-footed shot.' };
  if (item.id === '7') return { ...enItem, title: 'Ronaldo Fenômeno Secures the Penta', description: 'The perfect photograph of redemption. Ronaldo celebrates with his famous "Cascão" haircut one of his two goals in the grand final against Germany in Yokohama.' };
  if (item.id === '8') return { ...enItem, title: 'Neymar\'s Decisive Penalty and Unprecedented Gold', description: 'The moment of greatest catharsis at the Maracanã in the Rio Olympics. The image captures the instant when Neymar, under immense pressure, takes the decisive penalty against Germany.' };
  if (item.id === '9') return { ...enItem, title: '"It\'s yours Taffarel!"', description: 'Listen to the electrifying penalty shootout in the 1994 final in Pasadena. The recording immortalized not only the hero of the game, goalkeeper Taffarel, but also the emblematic voice of Galvão Bueno.' };
  if (item.id === '10') return { ...enItem, title: 'Marta Shines in Athens', description: 'A young Marta, already proving to be the future Queen of Football, leading the Women\'s National Team in a wonderful campaign that culminated in Brazil\'s first Olympic Silver medal in Athens.' };
  if (item.id === '11') return { ...enItem, title: 'Ronaldinho Gaúcho\'s Show', description: 'Watch the best moments of a gala performance by Ronaldinho. At the peak of his form, he led the National Team in a merciless 4-1 thrashing against their biggest rivals, Argentina.' };
  if (item.id === '12') return { ...enItem, title: 'Romário\'s Goal at the Maracanã', description: 'This image eternalizes the exact second Romário heads the ball into the back of the net against Uruguay, in a packed Maracanã. The goal secured the 1989 Copa América title.' };
  if (item.id === '13') return { ...enItem, title: 'Farewell of Legend Formiga', description: 'The emotional and profound interview given after the last official match of defensive midfielder Formiga in the yellow shirt. With impressive records of participation in World Cups and Olympics, she talks about her legacy.' };
  if (item.id === '14') return { ...enItem, title: 'Epic Comeback with Kaká and Luís Fabiano', description: 'This original tactical report details how Brazil, losing 2-0 in the first half to the USA, changed its posture. With great leadership from Kaká and crucial goals, the team sought an epic comeback to win 3-2.' };
  if (item.id === '15') return { ...enItem, title: 'Bebeto\'s Celebration ("Rock the Baby")', description: 'In the quarter-finals against the Netherlands, Bebeto scored an anthological goal and ran to the sidelines simulating rocking a baby, paying homage to his newborn son Mattheus.' };
  if (item.id === '16') return { ...enItem, title: 'Garrincha\'s Baffling Dribble', description: 'A classic and restored video showing the genius of Mané Garrincha. In the Chile World Cup, assuming the leading role after Pelé\'s injury, he completely twisted the strong English defense.' };
  if (item.id === '17') return { ...enItem, title: 'Malcom\'s Golden Goal in Tokyo', description: 'The flash of the back-to-back Olympic championship goal! In the extra time of the tense final against Spain at the Tokyo Games, forward Malcom wins in speed against the Spanish defense and shoots to score the golden goal.' };
  if (item.id === '18') return { ...enItem, title: 'Neymar Top Scorer of the National Team', description: 'Historic moment at the Mangueirão Stadium where Neymar scores twice against Bolivia, reaching 79 official goals and surpassing Pelé\'s mark (in FIFA\'s count), consecrating himself as the greatest scorer in the history of the Brazilian Men\'s National Team.' };
  return enItem;
};

const mockItemsEN: CollectionItem[] = mockItemsPT.map(translateItemToEN);

export const translateItemToES = (item: CollectionItem): CollectionItem => {
  // Translations for ES
  let competition = item.competition;
  if (competition === 'Copa do Mundo') competition = 'Copa del Mundo';
  else if (competition === 'Olimpíadas') competition = 'Juegos Olímpicos';
  else if (competition === 'Copa das Confederações') competition = 'Copa Confederaciones';
  
  let opponent = item.opponent;
  if (opponent === 'Itália') opponent = 'Italia';
  else if (opponent === 'Suécia') opponent = 'Suecia';
  else if (opponent === 'Alemanha') opponent = 'Alemania';
  else if (opponent === 'Holanda') opponent = 'Países Bajos';
  else if (opponent === 'Estados Unidos') opponent = 'EE. UU.';
  else if (opponent === 'Sérvia') opponent = 'Serbia';

  let title = item.title;
  let description = item.description;

  if (title === 'Voleio de Richarlison contra a Sérvia') {
    title = 'Volea de Richarlison contra Serbia';
  }
  if (description === 'Golaço de Richarlison contra a servia') {
    description = 'Gran gol de Richarlison contra Serbia';
  }

  if (item.id.startsWith('collab-')) {
    if (description.includes('Pelé marca um gol contra a Argentina em plena Copa do Mundo de 1970')) {
      description = 'Pelé marca un gol contra Argentina en plena Copa del Mundo de 1970.';
    } else if (description.includes('Pelé marca um golaço contra a Argentina em plena Copa do Mundo de 1970')) {
      description = 'Pelé marca un gran gol contra Argentina en plena Copa del Mundo de 1970.';
    }
  }

  const esItem = { ...item, competition, opponent, title, description };

  if (item.id === '1') return { ...esItem, title: 'Pelé Levanta la Copa Jules Rimet', description: 'Uno de los momentos más icónicos en la historia del fútbol mundial: Pelé levanta la Copa Jules Rimet, consagrando a Brasil como el primer tricampeón mundial. La imagen captura la alegría contagiosa del Rey del Fútbol rodeado de aficionados.' };
  if (item.id === '2') return { ...esItem, title: 'Narración del Gol de Carlos Alberto', description: 'Escucha la emotiva y clásica narración del último gol de la final de 1970. La jugada, que involucró a casi todo el equipo brasileño, es considerada por muchos como el mejor gol en la historia de los Mundiales.' };
  if (item.id === '3') return { ...esItem, title: 'Acta del Partido - Brasil vs Uruguay', description: 'Este es el documento oficial y original del acta de la final de la Copa del Mundo de 1950, un registro histórico del evento conocido como el "Maracanazo".' };
  if (item.id === '4') return { ...esItem, title: 'Entrevista a Zagallo 1994', description: 'Entrevista exclusiva e histórica con Zagallo, concedida en los días previos a la gran final de 1994. Con su habitual pasión y superstición, el Viejo Lobo transmite confianza en la conquista del tetracampeonato inédito.' };
  if (item.id === '5') return { ...esItem, title: 'Camiseta Final 1958', description: 'El modelo 3D digitalizado de la legendaria camiseta azul, improvisada y utilizada por la Selección Brasileña en la final de 1958 contra Suecia.' };
  if (item.id === '6') return { ...esItem, title: 'Gol de Adriano Emperador en el Último Minuto', description: 'Revive el momento de puro éxtasis en la final de la Copa América 2004. En los últimos segundos del tiempo de descuento, Adriano domina en el área, se da vuelta y lanza un tiro zurdo indefendible.' };
  if (item.id === '7') return { ...esItem, title: 'Ronaldo Fenómeno Asegura el Penta', description: 'La fotografía perfecta de la redención. Ronaldo celebra con su famoso corte de pelo "Cascão" uno de sus dos goles en la gran final contra Alemania, en Yokohama.' };
  if (item.id === '8') return { ...esItem, title: 'Penalti Decisivo de Neymar y Oro Inédito', description: 'El momento de mayor catarsis del Maracaná en los Juegos Olímpicos de Río. La imagen captura el instante en que Neymar, bajo inmensa presión, cobra el penal decisivo contra Alemania.' };
  if (item.id === '9') return { ...esItem, title: '"¡Sal que es tuya Taffarel!"', description: 'Escucha la electrizante tanda de penaltis en la final de 1994 en Pasadena. La grabación inmortalizó no solo al héroe del partido, el portero Taffarel, sino también la voz emblemática de Galvão Bueno.' };
  if (item.id === '10') return { ...esItem, title: 'Marta Brilla en Atenas', description: 'La joven Marta, demostrando ya ser la futura Reina del Fútbol, liderando a la Selección Femenina en una campaña maravillosa que culminó en la primera medalla de Plata olímpica de Brasil.' };
  if (item.id === '11') return { ...esItem, title: 'Show de Ronaldinho Gaúcho', description: 'Mira los mejores momentos de una actuación de gala de Ronaldinho. En la cima de su forma, lideró a la Selección en una goleada despiadada de 4 a 1 contra su mayor rival, Argentina.' };
  if (item.id === '12') return { ...esItem, title: 'Gol de Romário en el Maracaná', description: 'Esta imagen eterniza el segundo exacto en que Romário cabecea el balón al fondo de la red contra Uruguay, en un Maracaná lleno. El gol aseguró el título de la Copa América de 1989.' };
  if (item.id === '13') return { ...esItem, title: 'Despedida de la Leyenda Formiga', description: 'La emotiva y profunda entrevista concedida después del último partido oficial de la centrocampista defensiva Formiga con la camiseta amarilla. Con récords impresionantes, habla sobre su legado.' };
  if (item.id === '14') return { ...esItem, title: 'Remontada Épica con Kaká y Luís Fabiano', description: 'Este informe táctico original detalla cómo Brasil, perdiendo por 2 a 0 en la primera mitad contra EE. UU., cambió su postura. Con gran liderazgo de Kaká y goles cruciales, el equipo buscó una remontada épica para 3 a 2.' };
  if (item.id === '15') return { ...esItem, title: 'Celebración de Bebeto ("Acuna al Bebé")', description: 'En los cuartos de final contra Holanda, Bebeto anotó un gol antológico y corrió hacia la línea de banda simulando acunar a un bebé, rindiendo homenaje a su hijo recién nacido Mattheus.' };
  if (item.id === '16') return { ...esItem, title: 'Regate Desconcertante de Garrincha', description: 'Un video clásico y restaurado que muestra la genialidad de Mané Garrincha. En el Mundial de Chile, asumiendo el protagonismo tras la lesión de Pelé, torció por completo a la fuerte defensa inglesa.' };
  if (item.id === '17') return { ...esItem, title: 'Gol de Oro de Malcom en Tokio', description: '¡El destello del gol del bicampeonato olímpico! En la prórroga de la tensa final contra España en los Juegos de Tokio, el delantero Malcom gana en velocidad a la defensa española y dispara cruzado.' };
  if (item.id === '18') return { ...esItem, title: 'Neymar Máximo Goleador de la Selección', description: 'Momento histórico en el Estadio Mangueirão donde Neymar marca dos veces contra Bolivia, llegando a 79 goles oficiales y superando la marca de Pelé (en el recuento de la FIFA).' };
  return esItem;
};

const mockItemsES: CollectionItem[] = mockItemsPT.map(translateItemToES);

export const addCollaborativeItem = (item: CollectionItem) => {
  const existing = localStorage.getItem('collaborative_items');
  const items: CollectionItem[] = existing ? JSON.parse(existing) : [];
  items.push(item);
  localStorage.setItem('collaborative_items', JSON.stringify(items));
};

export const deleteCollaborativeItem = (id: string) => {
  const existing = localStorage.getItem('collaborative_items');
  const items: CollectionItem[] = existing ? JSON.parse(existing) : [];
  const newItems = items.filter(i => i.id !== id);
  localStorage.setItem('collaborative_items', JSON.stringify(newItems));
};

const getCollaborativeItems = (): CollectionItem[] => {
  const existing = localStorage.getItem('collaborative_items');
  return existing ? JSON.parse(existing) : [];
};

export const getMockItems = (lang: string): CollectionItem[] => {
  const collabItems = getCollaborativeItems();
  
  if (lang === 'en') return [...mockItemsEN, ...collabItems.map(translateItemToEN)];
  if (lang === 'es') return [...mockItemsES, ...collabItems.map(translateItemToES)];
  return [...mockItemsPT, ...collabItems];
};

// Export original for places that don't need translation strictly, but everything should use getMockItems
export const mockItems = [...mockItemsPT, ...getCollaborativeItems()];
