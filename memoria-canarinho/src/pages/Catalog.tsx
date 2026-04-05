import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Image as ImageIcon, FileText, Video, Headphones, Box } from 'lucide-react';
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
  
  const categories = ['Todas', 'Fotografias', 'Entrevistas', 'Documentos', 'Áudios', 'Objetos 3D', 'Vídeos'];

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === '' || item.year === yearFilter;
    const matchesCompetition = competitionFilter === '' || item.competition?.toLowerCase().includes(competitionFilter.toLowerCase());
    
    return matchesCategory && matchesSearch && matchesYear && matchesCompetition;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fotografias': return <ImageIcon aria-hidden="true" className="w-5 h-5" />;
      case 'Áudios': return <Headphones aria-hidden="true" className="w-5 h-5" />;
      case 'Vídeos': return <Video aria-hidden="true" className="w-5 h-5" />;
      case 'Documentos': return <FileText aria-hidden="true" className="w-5 h-5" />;
      case 'Objetos 3D': return <Box aria-hidden="true" className="w-5 h-5" />;
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
                  onClick={() => setSelectedCategory(cat as any)}
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
              {isAdvancedSearchOpen ? <ChevronUp aria-hidden="true" className="mr-2" /> : <ChevronDown aria-hidden="true" className="mr-2" />}
              {isAdvancedSearchOpen ? 'Ocultar Busca Avançada' : 'Mostrar Busca Avançada'}
            </Button>

            {isAdvancedSearchOpen && (
              <div id="advanced-search-panel" className="bg-muted p-6 rounded-md border mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="filter-year" className="text-lg font-bold">Ano</Label>
                  <Input
                    id="filter-year"
                    type="text"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
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
                    onChange={(e) => setCompetitionFilter(e.target.value)}
                    className="py-6 text-lg"
                    placeholder="Ex: Copa do Mundo"
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
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <li key={item.id} className="h-full">
                  <Link 
                    to={`/catalog/${item.id}`}
                    className="flex flex-col h-full rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                    aria-label={`Visualizar item: ${item.title}`}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:border-canarinho-verde hover:shadow-lg transition-all group">
                      <div className="bg-slate-200 h-48 relative flex items-center justify-center p-4">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="object-cover w-full h-full" />
                        ) : (
                          <div className="text-muted-foreground flex flex-col items-center">
                             {getCategoryIcon(item.category)}
                             <span className="mt-2 font-medium">{item.category}</span>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded shadow">
                          {item.category}
                        </div>
                      </div>
                      <CardHeader className="p-4 flex-1">
                        <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mt-auto">Ano: <strong>{item.year}</strong></p>
                      </CardFooter>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
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
