import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import { Library, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const MyCollection: React.FC = () => {
  const { favorites, toggleFavorite } = useCollection();

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex items-center gap-3 mb-6">
        <Library className="w-10 h-10 text-primary" aria-hidden="true" />
        <h1 className="text-4xl font-extrabold text-primary">Minha Coleção</h1>
      </header>
      
      <Separator className="mb-8" />

      {favorites.length === 0 ? (
        <Card className="p-12 text-center bg-muted">
          <p className="text-2xl text-muted-foreground mb-6 font-medium">Você ainda não salvou nenhum item histórico.</p>
          <Button asChild size="lg" variant="outline" className="font-bold text-lg border-2 text-canarinho-azul-escuro border-canarinho-azul-escuro hover:bg-slate-100 hover:text-canarinho-azul-escuro w-[max-content] mx-auto px-8 transition-colors">
            <Link to="/catalog">Explorar Acervo</Link>
          </Button>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Lista de itens favoritados">
          {favorites.map(item => (
            <li key={item.id}>
              <Card className="flex flex-row gap-4 items-center p-4 hover:shadow-md transition-shadow">
                <div className="w-24 h-24 bg-slate-200 rounded flex-shrink-0 flex justify-center items-center overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-xs font-bold text-center p-1">{item.category}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 py-2">
                  <Link 
                    to={`/catalog/${item.id}`} 
                    className="block group focus-visible:outline-none rounded focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Visualizar item completo: ${item.title}`}
                  >
                    <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary group-hover:underline p-1">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">{item.category} | Ano: {item.year}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-4 focus-visible:ring-destructive/50"
                  onClick={() => toggleFavorite(item)}
                  aria-label={`Remover ${item.title} da Minha Coleção`}
                  title="Remover item"
                >
                  <Trash2 className="w-6 h-6" aria-hidden="true" />
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
