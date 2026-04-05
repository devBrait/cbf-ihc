import React, { useState, useRef } from 'react';
import { Play, Pause, FileText, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  audioUrl?: string; // Not strictly needed for the static prototype to play, but we mock it.
  transcription: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, transcription }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Para mock, não usaremos audioUrl real a menos que funcione. Usaremos um estado artificial se for o caso.
  // Como é protótipo UX, focar na clareza visual.

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Em um sistema real:
    // if (isPlaying) audioRef.current?.pause();
    // else audioRef.current?.play();
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-6 shadow-sm mb-8" aria-label={`Reprodutor de áudio: ${title}`}>
      <h3 className="text-xl font-bold mb-4 text-canarinho-azul-escuro flex items-center gap-2">
        <Volume2 aria-hidden="true" className="w-6 h-6" />
        Controles de Áudio
      </h3>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0 w-full md:w-auto">
          <button
            onClick={togglePlay}
            className={`w-full md:w-48 h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-4 font-bold text-lg transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-canarinho-azul-escuro
              ${isPlaying 
                ? 'bg-red-100 text-red-900 border-red-500 hover:bg-red-200' 
                : 'bg-canarinho-verde text-white border-canarinho-verde hover:bg-green-700'
              }`}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? `Pausar áudio ${title}` : `Tocar áudio ${title}`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-8 h-8" aria-hidden="true" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-8 h-8" aria-hidden="true" />
                Ouvir Áudio
              </>
            )}
          </button>
          
          {isPlaying && (
             <div className="mt-4 p-2 bg-blue-50 border border-blue-200 text-blue-900 text-sm rounded font-medium flex items-center justify-center" aria-live="polite">
               <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
               Reproduzindo áudio...
             </div>
          )}
        </div>
        
        <div className="flex-1 bg-slate-50 border-2 border-slate-300 rounded p-4 relative w-full">
          <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3 border-b pb-2">
            <FileText aria-hidden="true" className="w-5 h-5 text-canarinho-azul-escuro" />
            Transcrição do Áudio
          </h4>
          
          <div 
            className="prose prose-lg text-slate-700 select-text" 
            aria-label="Texto da transcrição"
            id="transcription-text"
          >
             <p className="leading-relaxed bg-white p-3 rounded border border-slate-200">
               {transcription}
             </p>
          </div>
          
          <div className="mt-3 text-sm text-slate-500 italic">
            Dica: Você pode selecionar e copiar o texto da transcrição.
          </div>
        </div>
      </div>
      
      {/* Hidden audio element for screen readers or real implementation */}
      <audio aria-hidden="true" ref={audioRef} controls className="sr-only">
        {/* <source src={audioUrl} type="audio/mpeg" /> */}
        Seu navegador não suporta a tag de áudio.
      </audio>
    </div>
  );
};
