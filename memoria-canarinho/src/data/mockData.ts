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
}

export const mockItems: CollectionItem[] = [
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
