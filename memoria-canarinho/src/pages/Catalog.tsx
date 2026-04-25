import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Image as ImageIcon, FileText, Video, Headphones, Box, LayoutGrid, Mic, Filter } from 'lucide-react';
import { mockItems } from '../data/mockData';
import type { Category } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';

export const Catalog: React.FC = () => {
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
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Categorias</h2>
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
                  {cat}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1">
        <h1 className="text-3xl font-extrabold text-primary mb-6">Explorar Acervo</h1>

        <Card className="p-6 mb-8 bg-card shadow-sm border-2">
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()} aria-label="Formulário de Busca">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col space-y-2">
                <Label htmlFor="search-simple" className="text-lg font-bold">
                  Busca Simples (Título ou Descrição)
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
                    placeholder="Digite para buscar..."
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
              {isAdvancedSearchOpen ? 'Ocultar Busca Avançada' : 'Mostrar Busca Avançada'}
              {isAdvancedSearchOpen ? <ChevronUp aria-hidden="true" className="ml-2" /> : <ChevronDown aria-hidden="true" className="ml-2" />}
            </Button>

            {isAdvancedSearchOpen && (
              <div id="advanced-search-panel" className="bg-muted p-6 rounded-md border mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="filter-year" className="text-lg font-bold">Ano</Label>
                  <Input
                    id="filter-year"
                    type="text"
                    value={yearFilter}
                    onChange={(e) => {
                      setYearFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder="Ex: 1970"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-comp" className="text-lg font-bold">Competição</Label>
                  <Input
                    id="filter-comp"
                    type="text"
                    value={competitionFilter}
                    onChange={(e) => {
                      setCompetitionFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder="Ex: Copa do Mundo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-player" className="text-lg font-bold">Jogador</Label>
                  <Input
                    id="filter-player"
                    type="text"
                    value={playerFilter}
                    onChange={(e) => {
                      setPlayerFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder="Ex: Pelé"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-opponent" className="text-lg font-bold">Adversário</Label>
                  <Input
                    id="filter-opponent"
                    type="text"
                    value={opponentFilter}
                    onChange={(e) => {
                      setOpponentFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-6 text-lg"
                    placeholder="Ex: Itália"
                  />
                </div>
              </div>
            )}
          </form>
        </Card>

        <section aria-live="polite" aria-atomic="true">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            Resultados da Busca ({filteredItems.length} encontrado{filteredItems.length !== 1 && 's'})
          </h2>

          {filteredItems.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedItems.map(item => (
                  <li key={item.id} className="h-full">
                  <Link
                    to={`/catalog/${item.id}`}
                    className="block group relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring bg-slate-900 shadow-lg hover:shadow-2xl hover:shadow-canarinho-verde/20 transition-all duration-500 border border-border"
                    aria-label={`Visualizar item: ${item.title}`}
                  >
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white/5 bg-slate-900 transition-transform duration-700 group-hover:scale-110">
                        <div className="[&>svg]:w-40 [&>svg]:h-40 mb-12">
                          {getCategoryIcon(item.category)}
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Top Badge (Glassmorphism) */}
                    <div className="absolute top-4 left-4 z-10 backdrop-blur-md bg-white/20 border border-white/30 text-white font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-2 shadow-sm">
                      <span className="[&>svg]:w-4 [&>svg]:h-4">
                        {getCategoryIcon(item.category)}
                      </span>
                      {item.category}
                    </div>

                    {/* Content Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                      <h3 className="text-2xl font-extrabold text-white leading-tight mb-2 line-clamp-3 shadow-black drop-shadow-md group-hover:text-canarinho-amarelo transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      {/* Slide-up details container */}
                      <div className="grid grid-cols-1 gap-1.5 text-sm text-white/80 overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <p className="border-l-2 border-canarinho-verde pl-2 flex items-center">Ano: <strong className="text-white ml-1">{item.year}</strong></p>
                        {item.competition && <p className="border-l-2 border-canarinho-amarelo pl-2 flex items-center">Competição: <strong className="text-white ml-1">{item.competition}</strong></p>}
                        {item.player && <p className="border-l-2 border-canarinho-azul-claro pl-2 flex items-center line-clamp-1">Jogador: <strong className="text-white ml-1">{item.player}</strong></p>}
                        {item.opponent && <p className="border-l-2 border-red-500 pl-2 flex items-center">Adversário: <strong className="text-white ml-1">{item.opponent}</strong></p>}
                      </div>
                    </div>
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
                    className="font-bold border-2"
                  >
                    Anterior
                  </Button>
                  <span className="text-lg font-bold" aria-live="polite">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Próxima Página"
                    className="font-bold border-2"
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className="p-8 text-center bg-muted">
              <p className="text-xl text-muted-foreground">Nenhum item encontrado com os filtros atuais.</p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};
