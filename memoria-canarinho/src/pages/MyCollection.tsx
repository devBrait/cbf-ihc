import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import { useAuth } from '../context/AuthContext';
import { Library, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getMockItems } from '../data/mockData';
import { toast } from 'sonner';
import { useTranslation } from '../context/I18nContext';
import { AddItemModal } from '../components/AddItemModal';
import { Plus } from 'lucide-react';

export const MyCollection: React.FC = () => {
  const { favorites, toggleFavorite } = useCollection();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const mockItems = getMockItems(language);

  React.useEffect(() => {
    if (!user) {
      toast.warning(t('auth.restricted'), { id: 'auth-redirect', description: t('auth.restrictedDesc') });
      navigate('/login');
    }
  }, [user, navigate, t]);
  
  const collectionItems = favorites.map(fav => mockItems.find(mi => mi.id === fav.id) || fav);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Library className="w-10 h-10 text-primary" aria-hidden="true" />
          <div>
            <h1 className="text-4xl font-extrabold text-primary">
              {t('collection.title')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <Button 
              size="lg"
              onClick={() => setIsAddModalOpen(true)}
              className="font-bold bg-canarinho-azul-escuro hover:bg-blue-800 text-white shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('add.button')}
            </Button>
          )}

        </div>
      </header>
      
      <Separator className="mb-8" />

      {collectionItems.length === 0 ? (
        <Card className="p-12 text-center bg-muted border-2 border-dashed border-slate-300">
          <p className="text-2xl text-slate-600 mb-6 font-medium">
            {t('collection.empty')}
          </p>
          <Button asChild size="lg" variant="outline" className="font-bold text-lg border-2 text-canarinho-azul-escuro border-canarinho-azul-escuro hover:bg-slate-100 hover:text-canarinho-azul-escuro w-[max-content] mx-auto px-8 transition-colors shadow-sm">
            <Link to="/catalog">{t('collection.explore')}</Link>
          </Button>
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
                    <span className="font-bold text-slate-400 text-lg uppercase tracking-wider">{t(`cat.${item.category}`)}</span>
                  )}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-sm border border-slate-200">
                    {t(`cat.${item.category}`)}
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
                    <p>{t('catalog.year')}: <strong className="text-slate-900">{item.year}</strong></p>
                    {item.competition && <p>{t('catalog.competition')}: <strong className="text-slate-900">{item.competition}</strong></p>}
                    {item.player && <p>{t('catalog.player')}: <strong className="text-slate-900">{item.player}</strong></p>}
                    {item.opponent && <p>{t('catalog.opponent')}: <strong className="text-slate-900">{item.opponent}</strong></p>}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-4 pt-2">
                    <Button asChild size="lg" variant="default" className="bg-canarinho-azul-escuro text-white hover:bg-canarinho-azul-escuro/90 shadow-md font-bold">
                      <Link to={`/catalog/${item.id}`}>{t('collection.viewDetails')}</Link>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white font-bold transition-colors shadow-sm"
                      onClick={() => toggleFavorite(item)}
                      title="Remover item"
                    >
                      <Trash2 className="w-5 h-5 mr-2" aria-hidden="true" />
                      {t('collection.remove')}
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      
      <AddItemModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onItemAdded={() => {
          // Re-render handled by CollectionContext's favorites state change
        }} 
      />
    </div>
  );
};
