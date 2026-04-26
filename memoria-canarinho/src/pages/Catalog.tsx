import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Image as ImageIcon, FileText, Video, Headphones, Box, LayoutGrid, Mic, Filter } from 'lucide-react';
import { getMockItems } from '../data/mockData';
import type { Category } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useTranslation } from '../context/I18nContext';

export const Catalog: React.FC = () => {
  const { t, language } = useTranslation();
  const mockItems = getMockItems(language);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');

  const [yearFilter, setYearFilter] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('');
  const [playerFilter, setPlayerFilter] = useState('');
  const [opponentFilter, setOpponentFilter] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const initialPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('page', currentPage.toString());
      return p;
    }, { replace: true });
  }, [currentPage, setSearchParams]);

  const ITEMS_PER_PAGE = 6;

  const categories = ['Todas', 'Fotografias', 'Entrevistas', 'Documentos', 'Áudios', 'Objetos 3D', 'Vídeos'];

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === '' || item.year === yearFilter;
    const matchesCompetition = competitionFilter === '' || item.competition?.toLowerCase().includes(competitionFilter.toLowerCase());
    const matchesPlayer = playerFilter === '' || item.player?.toLowerCase().includes(playerFilter.toLowerCase());
    const matchesOpponent = opponentFilter === '' || item.opponent?.toLowerCase().includes(opponentFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesYear && matchesCompetition && matchesPlayer && matchesOpponent;
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fotografias': return <ImageIcon aria-hidden="true" className="w-5 h-5" />;
      case 'Áudios': return <Headphones aria-hidden="true" className="w-5 h-5" />;
      case 'Vídeos': return <Video aria-hidden="true" className="w-5 h-5" />;
      case 'Documentos': return <FileText aria-hidden="true" className="w-5 h-5" />;
      case 'Objetos 3D': return <Box aria-hidden="true" className="w-5 h-5" />;
      case 'Todas': return <LayoutGrid aria-hidden="true" className="w-5 h-5" />;
      case 'Entrevistas': return <Mic aria-hidden="true" className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 flex-shrink-0" aria-label="Filtro por Categorias">
        <div className="bg-muted border rounded-lg p-4 sticky top-4">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">{t('catalog.categories')}</h2>
          <ul className="flex flex-col gap-2">
            {categories.map(cat => (
              <li key={cat}>
                <Button
                  variant={selectedCategory === cat ? "default" : "ghost"}
                  onClick={() => {
                    setSelectedCategory(cat as any);
                    setCurrentPage(1);
                  }}
                  className={`w-full justify-start text-lg h-auto py-3 px-4 flex items-center gap-3`}
                  aria-pressed={selectedCategory === cat}
                >
                  {getCategoryIcon(cat)}
                  {t(`cat.${cat}`)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1">
        <h1 className="text-3xl font-extrabold text-primary mb-6">{t('catalog.title')}</h1>

        <Card className="p-6 mb-8 bg-card shadow-sm border-2">
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()} aria-label="Formulário de Busca">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col space-y-2">
                <Label htmlFor="search-simple" className="text-lg font-bold">
                  {t('catalog.searchTitle')}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <Input
                    id="search-simple"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-12 py-6 text-lg"
                    placeholder={t('catalog.searchPlaceholder')}
                  />
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
              className="text-primary font-bold text-lg w-fit mt-2"
              aria-expanded={isAdvancedSearchOpen}
              aria-controls="advanced-search-panel"
            >
              <Filter aria-hidden="true" className="mr-2" />
              {isAdvancedSearchOpen ? t('catalog.hideAdvanced') : t('catalog.showAdvanced')}
              {isAdvancedSearchOpen ? <ChevronUp aria-hidden="true" className="ml-2" /> : <ChevronDown aria-hidden="true" className="ml-2" />}
            </Button>

            {isAdvancedSearchOpen && (
              <div id="advanced-search-panel" className="bg-muted p-6 rounded-md border mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="filter-year" className="text-lg font-bold">{t('catalog.year')}</Label>
                  <Input
                    id="filter-year"
                    type="text"
                    value={yearFilter}
                    onChange={(e) => {
                      setYearFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder={t('catalog.yearPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-comp" className="text-lg font-bold">{t('catalog.competition')}</Label>
                  <Input
                    id="filter-comp"
                    type="text"
                    value={competitionFilter}
                    onChange={(e) => {
                      setCompetitionFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder={t('catalog.compPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-player" className="text-lg font-bold">{t('catalog.player')}</Label>
                  <Input
                    id="filter-player"
                    type="text"
                    value={playerFilter}
                    onChange={(e) => {
                      setPlayerFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder={t('catalog.playerPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-opponent" className="text-lg font-bold">{t('catalog.opponent')}</Label>
                  <Input
                    id="filter-opponent"
                    type="text"
                    value={opponentFilter}
                    onChange={(e) => {
                      setOpponentFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder={t('catalog.oppPlaceholder')}
                  />
                </div>
              </div>
            )}
          </form>
        </Card>

        <section aria-live="polite" aria-atomic="true">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            {t('catalog.results')} ({filteredItems.length})
          </h2>

          {filteredItems.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedItems.map(item => (
                  <li key={item.id} className="h-full">
                    <Link to={`/catalog/${item.id}`} className="block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-xl">
                      <Card className="h-full flex flex-col overflow-hidden hover:border-canarinho-verde hover:shadow-lg transition-all group">
                        <div className="bg-slate-100 h-56 relative flex items-center justify-center p-4">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className="text-muted-foreground flex flex-col items-center">
                              <div className="[&>svg]:w-12 [&>svg]:h-12 mb-2 text-slate-400">
                                {getCategoryIcon(item.category)}
                              </div>
                              <span className="font-medium text-slate-500">{t(`cat.${item.category}`)}</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-sm border border-slate-200">
                            {t(`cat.${item.category}`)}
                          </div>
                        </div>
                        <div className="p-5 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 line-clamp-2 group-hover:text-canarinho-verde transition-colors">
                            {item.title}
                          </h3>
                          
                          <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                            <p>{t('catalog.year')}: <strong className="text-slate-900">{item.year}</strong></p>
                            {item.competition && <p>{t('catalog.competition')}: <strong className="text-slate-900">{item.competition}</strong></p>}
                            {item.player && <p>{t('catalog.player')}: <strong className="text-slate-900">{item.player}</strong></p>}
                            {item.opponent && <p>{t('catalog.opponent')}: <strong className="text-slate-900">{item.opponent}</strong></p>}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </li>
              ))}
              </ul>
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Página Anterior"
                    className="font-bold border-2 px-6 text-slate-700 border-slate-300 hover:bg-canarinho-verde hover:text-white hover:border-canarinho-verde disabled:opacity-40 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 transition-all"
                  >
                    {t('catalog.previous')}
                  </Button>
                  <span className="text-lg font-bold text-slate-700" aria-live="polite">
                    {t('catalog.pageOf', currentPage.toString(), totalPages.toString())}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Próxima Página"
                    className="font-bold border-2 px-6 text-slate-700 border-slate-300 hover:bg-canarinho-verde hover:text-white hover:border-canarinho-verde disabled:opacity-40 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 transition-all"
                  >
                    {t('catalog.next')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className="p-8 text-center bg-muted">
              <p className="text-xl text-muted-foreground">{t('catalog.notFound')}</p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};
