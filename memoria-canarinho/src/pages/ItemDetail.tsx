import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import { mockItems } from '../data/mockData';
import { AudioPlayer } from '../components/AudioPlayer';
import { ArrowLeft, Star, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useCollection();

  const item = mockItems.find(i => i.id === id);

  if (!item) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-destructive mb-4">Item não encontrado</h1>
        <Link to="/catalog" className="text-primary hover:text-primary/80 underline text-lg focus-visible:ring-4 focus-visible:ring-ring">
          Voltar para o acervo
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(item.id);

  const handleFavoriteClick = () => {
    toggleFavorite(item);
    if (!isFav) {
      toast.success('Adicionado à Coleção', {
        description: <strong className="text-black text-lg block mt-1">{item.title} foi salvo nas suas curtidas.</strong>,
      });
    } else {
      toast.info('Removido da Coleção', {
        description: <strong className="text-black text-lg block mt-1">{item.title} foi removido das suas curtidas.</strong>,
      });
    }
  };

  return (
    <article className="max-w-4xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-primary font-bold text-lg hover:text-primary/80 hover:bg-transparent px-0"
          aria-label="Voltar para a página anterior"
        >
          <ArrowLeft aria-hidden="true" className="mr-2 h-5 w-5" />
          Voltar
        </Button>
      </div>

      <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 pb-6">
        <div>
          <span className="bg-muted text-muted-foreground text-sm font-bold px-3 py-1 rounded inline-block mb-3">
            {item.category}
          </span>
          <h1 className="text-4xl font-extrabold text-primary mb-2">{item.title}</h1>
          <p className="text-xl text-muted-foreground">Ano: <strong>{item.year}</strong> {item.competition && ` | Competição: ${item.competition}`}</p>
        </div>

        <Button
          onClick={handleFavoriteClick}
          size="lg"
          variant="outline"
          className={`font-bold text-lg border-2 ${isFav ? 'bg-canarinho-amarelo text-canarinho-azul-escuro border-canarinho-amarelo hover:bg-yellow-400 hover:text-canarinho-azul-escuro' : 'text-canarinho-azul-escuro border-canarinho-azul-escuro hover:bg-primary/5'}`}
          aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos (Minha Coleção)"}
          aria-pressed={isFav}
        >
          <Star
            aria-hidden="true"
            className={`mr-2 h-6 w-6 ${isFav ? 'fill-current text-canarinho-azul-escuro' : ''}`}
          />
          {isFav ? 'Salvo na Coleção' : 'Adicionar à Coleção'}
        </Button>
      </header>

      <Separator />

      <div className="prose prose-lg text-foreground max-w-none mb-8 mt-6">
        <h2 className="text-2xl font-bold mb-3">Sobre o Item</h2>
        <p className="text-xl leading-relaxed">{item.description}</p>
      </div>

      <section aria-label="Conteúdo da Mídia" className="bg-muted p-4 md:p-8 rounded-xl border">
        {item.category === 'Fotografias' || item.category === 'Documentos' || item.category === 'Objetos 3D' ? (
          item.imageUrl ? (
            <figure className="flex flex-col items-center">
              <img src={item.imageUrl} alt={`Mídia de ${item.title}`} className="max-w-full rounded border-2 shadow-sm" />
              <figcaption className="mt-4 text-muted-foreground italic text-center">
                Imagem representativa do acervo: {item.title}.
              </figcaption>
            </figure>
          ) : (
            <div className="p-12 text-center text-muted-foreground border-2 border-dashed rounded">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
              <p className="text-xl">Imagem indisponível no arquivo mockado.</p>
            </div>
          )
        ) : null}

        {(item.category === 'Áudios' || item.category === 'Entrevistas') && (
          <AudioPlayer title={item.title} transcription={item.transcription || 'Transcrição não disponível para este item.'} />
        )}
      </section>
    </article>
  );
};
