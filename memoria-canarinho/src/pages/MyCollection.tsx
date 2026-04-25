import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import { Library, Trash2, Share2, Link as LinkIcon, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockItems } from '../data/mockData';
import { toast } from 'sonner';
import { WhatsAppIcon, XIcon, InstagramIcon } from '../components/SocialIcons';

export const MyCollection: React.FC = () => {
  const { favorites, toggleFavorite } = useCollection();
  const [searchParams] = useSearchParams();
  const sharedParam = searchParams.get('shared');
  
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const sharedIds = sharedParam ? sharedParam.split(',').filter(Boolean) : [];
  const isSharedMode = sharedIds.length > 0;
  
  const collectionItems = isSharedMode 
    ? mockItems.filter(item => sharedIds.includes(item.id))
    : favorites;

  const currentShareUrl = isSharedMode 
    ? window.location.href 
    : `${window.location.origin}${window.location.pathname}?shared=${favorites.map(f => f.id).join(',')}`;

  const shareText = `Confira esta coleção incrível do Acervo Digital da Seleção Brasileira!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentShareUrl);
    toast.success('Link copiado!', { description: 'O link da coleção foi copiado para sua área de transferência.' });
    setIsShareMenuOpen(false);
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentShareUrl)}`, '_blank');
    setIsShareMenuOpen(false);
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentShareUrl)}`, '_blank');
    setIsShareMenuOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {isSharedMode ? (
            <Users className="w-10 h-10 text-primary" aria-hidden="true" />
          ) : (
            <Library className="w-10 h-10 text-primary" aria-hidden="true" />
          )}
          <div>
            <h1 className="text-4xl font-extrabold text-primary">
              {isSharedMode ? 'Coleção Compartilhada' : 'Minha Coleção'}
            </h1>
            {isSharedMode && (
              <p className="text-muted-foreground mt-1">
                Você está visualizando uma coleção montada por outro usuário.
              </p>
            )}
          </div>
        </div>

        {collectionItems.length > 0 && (
          <div className="relative">
            <Button 
              size="lg" 
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
              className="font-bold bg-canarinho-verde hover:bg-green-700 text-white shadow-md"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar
            </Button>

            {isShareMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden flex flex-col">
                <div className="p-3 bg-slate-50 border-b border-slate-100 font-bold text-sm text-slate-700">
                  Compartilhar via...
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
        )}
      </header>
      
      <Separator className="mb-8" />

      {collectionItems.length === 0 ? (
        <Card className="p-12 text-center bg-muted border-2 border-dashed border-slate-300">
          <p className="text-2xl text-slate-600 mb-6 font-medium">
            {isSharedMode 
              ? 'Esta coleção compartilhada está vazia ou os itens não existem mais.' 
              : 'Você ainda não salvou nenhum item histórico.'}
          </p>
          {!isSharedMode && (
            <Button asChild size="lg" variant="outline" className="font-bold text-lg border-2 text-canarinho-azul-escuro border-canarinho-azul-escuro hover:bg-slate-100 hover:text-canarinho-azul-escuro w-[max-content] mx-auto px-8 transition-colors shadow-sm">
              <Link to="/catalog">Explorar Acervo</Link>
            </Button>
          )}
        </Card>
      ) : (
        <ul className="flex flex-col gap-6" aria-label="Lista de itens da coleção">
          {collectionItems.map(item => (
            <li key={item.id}>
              <Card className="flex flex-col sm:flex-row overflow-hidden hover:border-canarinho-verde hover:shadow-lg transition-all group border-slate-200">
                <div className="w-full sm:w-72 h-64 sm:h-auto bg-slate-100 flex-shrink-0 relative flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-slate-200">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105 drop-shadow-md" />
                  ) : (
                    <span className="font-bold text-slate-400 text-lg uppercase tracking-wider">{item.category}</span>
                  )}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-sm border border-slate-200">
                    {item.category}
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col min-w-0 bg-white">
                  <Link to={`/catalog/${item.id}`} className="hover:underline focus-visible:outline-none w-fit">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3 group-hover:text-canarinho-verde transition-colors">
                      {item.title}
                    </h2>
                  </Link>
                  
                  <p className="text-slate-600 line-clamp-3 mb-5 text-lg leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-base text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p>Ano: <strong className="text-slate-900">{item.year}</strong></p>
                    {item.competition && <p>Competição: <strong className="text-slate-900">{item.competition}</strong></p>}
                    {item.player && <p>Jogador: <strong className="text-slate-900">{item.player}</strong></p>}
                    {item.opponent && <p>Adversário: <strong className="text-slate-900">{item.opponent}</strong></p>}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                    <Button asChild size="lg" variant="default" className="bg-canarinho-azul-escuro text-white hover:bg-canarinho-azul-escuro/90 shadow-md font-bold">
                      <Link to={`/catalog/${item.id}`}>Ver Detalhes</Link>
                    </Button>
                    
                    {!isSharedMode && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white font-bold transition-colors shadow-sm"
                        onClick={() => toggleFavorite(item)}
                        title="Remover item"
                      >
                        <Trash2 className="w-5 h-5 mr-2" aria-hidden="true" />
                        Remover da Coleção
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      
      {/* Background overlay for mobile menu closing */}
      {isShareMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsShareMenuOpen(false)} />
      )}
    </div>
  );
};
