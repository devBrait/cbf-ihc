import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import { mockItems } from '../data/mockData';
import { AudioPlayer } from '../components/AudioPlayer';
import { ArrowLeft, Star, FileText, Video, Share2, Link as LinkIcon, Search } from 'lucide-react';
import { WhatsAppIcon, XIcon, InstagramIcon } from '../components/SocialIcons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const MarketplaceZoom = ({ src, alt }: { src: string, alt: string }) => {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <figure className="flex flex-col items-center">
      <div 
        className="relative w-full max-w-2xl mx-auto overflow-hidden bg-white border-2 rounded shadow-sm cursor-crosshair group"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-auto object-contain transition-opacity duration-200 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
        />
        
        <div 
          className={`absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-200 ${isZooming ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            backgroundSize: '250%',
          }}
        />
        
        {!isZooming && (
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg pointer-events-none flex items-center justify-center">
            <Search className="w-6 h-6 text-slate-700" />
          </div>
        )}
      </div>
      <figcaption className="mt-4 text-muted-foreground italic text-center">
        Passe o mouse sobre a imagem para explorar os detalhes em zoom.
      </figcaption>
    </figure>
  );
};

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useCollection();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const item = mockItems.find(i => i.id === id);

  const relatedItems = useMemo(() => {
    if (!item) return [];
    
    const scoredItems = mockItems
      .filter(i => i.id !== item.id)
      .map(i => {
        let score = 0;
        if (i.competition && item.competition && i.competition === item.competition) score += 2;
        if (i.player && item.player && i.player === item.player) score += 2;
        if (i.year === item.year) score += 1;
        if (i.opponent && item.opponent && i.opponent === item.opponent) score += 1;
        if (i.category === item.category) score += 1;
        return { item: i, score };
      });
      
    return scoredItems
      .filter(si => si.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(si => si.item);
  }, [item]);

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

  const shareText = `Confira este item histórico: ${item.title}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado!', { description: 'O link deste item foi copiado para sua área de transferência.' });
    setIsShareMenuOpen(false);
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`, '_blank');
    setIsShareMenuOpen(false);
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    setIsShareMenuOpen(false);
  };

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12">
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
          <span className="bg-muted text-muted-foreground text-xl font-bold px-4 py-2 rounded inline-block mb-3">
            {item.category}
          </span>
          <h1 className="text-4xl font-extrabold text-primary mb-2">{item.title}</h1>
          <p className="text-xl text-muted-foreground">
            Ano: <strong>{item.year}</strong>
            {item.competition && <span> | Competição: <strong>{item.competition}</strong></span>}
          </p>
          {(item.player || item.opponent) && (
            <p className="text-xl text-muted-foreground mt-1">
              {item.player && <span>Jogador: <strong>{item.player}</strong></span>}
              {item.player && item.opponent && <span> | </span>}
              {item.opponent && <span>Adversário: <strong>{item.opponent}</strong></span>}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
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

          <Button 
            size="lg" 
            variant="default"
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            className="font-bold text-lg bg-canarinho-verde hover:bg-green-700 text-white shadow-sm"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar
          </Button>

          {isShareMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden flex flex-col">
              <div className="p-3 bg-slate-50 border-b border-slate-100 font-bold text-sm text-slate-700">
                Compartilhar item via...
              </div>
              <button onClick={handleWhatsAppShare} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left text-slate-800 font-medium">
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                WhatsApp
              </button>
              <button onClick={handleTwitterShare} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left text-slate-800 font-medium">
                <XIcon className="w-5 h-5 text-black ml-0.5" />
                X (Twitter)
              </button>
              <button onClick={handleCopyLink} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left text-slate-800 font-medium">
                <InstagramIcon className="w-6 h-6 text-[#E1306C]" />
                Instagram
              </button>
              <Separator />
              <button onClick={handleCopyLink} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left text-slate-800 font-medium">
                <LinkIcon className="w-5 h-5 ml-0.5 text-slate-500" />
                Copiar Link
              </button>
            </div>
          )}
        </div>
      </header>

      <Separator />

      <div className="prose prose-lg text-foreground max-w-none mb-8 mt-6">
        <h2 className="text-2xl font-bold mb-3">Sobre o Item</h2>
        <p className="text-xl leading-relaxed">{item.description}</p>
      </div>

      <section aria-label="Conteúdo da Mídia" className="bg-slate-50 p-4 md:p-8 rounded-xl border border-slate-200 shadow-inner">
        {item.category === 'Fotografias' || item.category === 'Documentos' || item.category === 'Objetos 3D' ? (
          item.imageUrl ? (
            <MarketplaceZoom src={item.imageUrl} alt={`Mídia de ${item.title}`} />
          ) : (
            <div className="p-12 text-center text-muted-foreground border-2 border-dashed rounded">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
              <p className="text-xl">Imagem indisponível no arquivo mockado.</p>
            </div>
          )
        ) : null}

        {item.category === 'Vídeos' ? (
          <figure className="flex flex-col items-center">
            <div className="w-full max-w-3xl aspect-video bg-slate-900 rounded-lg border-2 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <Video className="w-24 h-24 text-white opacity-20 absolute z-0" aria-hidden="true" />
              <div className="z-20 w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
              </div>
              <p className="z-20 mt-4 text-white/80 font-medium text-lg">Prévia do Player de Vídeo</p>
            </div>
            <figcaption className="mt-4 text-muted-foreground italic text-center">
              Item de acervo em formato de vídeo: {item.title}.
            </figcaption>
          </figure>
        ) : null}

        {(item.category === 'Áudios' || item.category === 'Entrevistas') && (
          <AudioPlayer title={item.title} transcription={item.transcription || 'Transcrição não disponível para este item.'} />
        )}
      </section>
      
      {relatedItems.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Você também pode se interessar por</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map(related => (
              <li key={related.id} className="h-full">
                <Link to={`/catalog/${related.id}`} className="block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-xl">
                  <Card className="h-full flex flex-col overflow-hidden hover:border-canarinho-verde hover:shadow-lg transition-all group">
                    <div className="bg-slate-100 h-56 relative flex items-center justify-center p-4">
                      {related.imageUrl ? (
                        <img src={related.imageUrl} alt="" className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <span className="font-bold text-slate-400 uppercase tracking-wider">{related.category}</span>
                      )}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-sm border border-slate-200">
                        {related.category}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col bg-white">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 line-clamp-2 group-hover:text-canarinho-verde transition-colors">
                        {related.title}
                      </h3>
                      
                      <div className="mt-auto space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p>Ano: <strong className="text-slate-900">{related.year}</strong></p>
                        {related.competition && <p>Competição: <strong className="text-slate-900">{related.competition}</strong></p>}
                        {related.player && <p>Jogador: <strong className="text-slate-900">{related.player}</strong></p>}
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {isShareMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsShareMenuOpen(false)} />
      )}
    </article>
  );
};
