export type Category = 'Fotografias' | 'Entrevistas' | 'Documentos' | 'Objetos 3D' | 'Vídeos' | 'Áudios';

export interface CollectionItem {
  id: string;
  title: string;
  category: Category;
  year: string;
  competition?: string;
  opponent?: string;
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
    description: 'Momento histórico em que Pelé levanta a taça após a conquista do tricampeonato no México.',
    imageUrl: 'https://placehold.co/600x400/19AE47/FFFFFF?text=Pele+Taca+1970',
  },
  {
    id: '2',
    title: 'Narração do Gol de Carlos Alberto',
    category: 'Áudios',
    year: '1970',
    competition: 'Copa do Mundo',
    opponent: 'Itália',
    description: 'A clássica narração do último gol da final de 1970.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
    transcription: 'E lá vai o Brasil... Tocou para Jairzinho... Pelé... Esperou a passagem do Carlos Alberto. Bateu cruzado! Goooool do Brasil! Um golaço! Carlos Alberto Torres é o nome dele!'
  },
  {
    id: '3',
    title: 'Súmula do Jogo - Brasil x Uruguai',
    category: 'Documentos',
    year: '1950',
    competition: 'Copa do Mundo',
    opponent: 'Uruguai',
    description: 'Documento original da súmula da final do fatídico Maracanazo.',
    imageUrl: 'https://placehold.co/600x800/eeeeee/193375?text=Sumula+1950',
  },
  {
    id: '4',
    title: 'Entrevista Zagallo 1994',
    category: 'Entrevistas',
    year: '1994',
    competition: 'Copa do Mundo',
    description: 'Entrevista pré-jogo onde Zagallo mostra confiança no tetra.',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder video
    transcription: 'Nós estamos preparados. O Brasil tem uma equipe forte, consistente e vamos buscar esse título com toda a garra.'
  },
  {
    id: '5',
    title: 'Camisa 1958 Final',
    category: 'Objetos 3D',
    year: '1958',
    competition: 'Copa do Mundo',
    opponent: 'Suécia',
    description: 'A clássica camisa azul utilizada na final de 1958 contra os donos da casa.',
    imageUrl: 'https://placehold.co/400x400/0C87D1/FFFFFF?text=Camisa+Azul+1958'
  }
];
