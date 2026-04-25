import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Library, Home as HomeIcon } from 'lucide-react';

export const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path || (path === '/catalog' && location.pathname.startsWith('/catalog'));
    return `flex items-center gap-2 px-4 py-3 rounded-md transition-colors font-bold border-2 ${isActive
      ? 'bg-canarinho-amarelo text-canarinho-azul-escuro border-white shadow-md'
      : 'text-white bg-transparent border-transparent hover:bg-canarinho-amarelo/20 hover:text-white focus:ring-4 focus:ring-canarinho-amarelo focus:outline-none'
      }`;
  };

  return (
    <div className="min-h-screen bg-canarinho-branco flex flex-col font-sans text-lg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-canarinho-amarelo focus:text-canarinho-azul-escuro focus:font-bold focus:outline-none focus:ring-4 focus:ring-canarinho-azul-escuro"
      >
        Ir para o conteúdo principal
      </a>

      <header className="bg-canarinho-verde text-canarinho-branco p-4 shadow-md border-b-8 border-canarinho-amarelo">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold flex items-center gap-2 hover:underline focus:ring-4 focus:ring-canarinho-branco focus:outline-none rounded p-1"
            aria-label="Memória Canarinho, Página Inicial"
          >
            <img src={`${import.meta.env.BASE_URL}cbf-logo.png`} alt="Símbolo da CBF" className="w-10 h-auto" />
            <span>Memória Canarinho</span>
          </Link>

          <nav aria-label="Navegação Principal">
            <ul className="flex flex-wrap gap-2 md:gap-4 justify-center m-0 p-0 list-none">
              <li>
                <Link to="/" className={getLinkClasses('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
                  <HomeIcon aria-hidden="true" className="w-6 h-6" />
                  Início
                </Link>
              </li>
              <li>
                <Link to="/catalog" className={getLinkClasses('/catalog')} aria-current={location.pathname.startsWith('/catalog') ? 'page' : undefined}>
                  <Search aria-hidden="true" className="w-6 h-6" />
                  Acervo
                </Link>
              </li>
              <li>
                <Link to="/collection" className={getLinkClasses('/collection')} aria-current={location.pathname === '/collection' ? 'page' : undefined}>
                  <Library aria-hidden="true" className="w-6 h-6" />
                  Minha Coleção
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8" tabIndex={-1}>
        {children}
      </main>

      <footer className="bg-canarinho-azul-escuro text-canarinho-branco p-6 mt-12 text-center text-sm border-t-8 border-canarinho-verde">
        <p className="mt-2 text-canarinho-amarelo font-medium">Protótipo de Baixa Fidelidade com Foco em Acessibilidade</p>
      </footer>
    </div>
  );
};
