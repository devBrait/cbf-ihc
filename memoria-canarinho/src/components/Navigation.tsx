import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Library, Home as HomeIcon, User as UserIcon, LogOut, Settings, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/I18nContext';

export const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useTranslation();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path || (path === '/catalog' && location.pathname.startsWith('/catalog'));
    return `flex items-center gap-2 px-4 py-3 rounded-md transition-colors font-bold border-2 ${isActive
      ? 'bg-canarinho-amarelo text-canarinho-azul-escuro border-white shadow-md'
      : 'text-white bg-transparent border-transparent hover:bg-canarinho-amarelo/20 hover:text-white focus:ring-4 focus:ring-canarinho-amarelo focus:outline-none'
      }`;
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-canarinho-branco flex flex-col font-sans text-lg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-canarinho-amarelo focus:text-canarinho-azul-escuro focus:font-bold focus:outline-none focus:ring-4 focus:ring-canarinho-azul-escuro"
      >
        Ir para o conteúdo principal
      </a>

      <header className="bg-canarinho-verde text-canarinho-branco p-4 shadow-md border-b-8 border-canarinho-amarelo relative z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold flex items-center gap-2 hover:underline focus:ring-4 focus:ring-canarinho-branco focus:outline-none rounded p-1"
            aria-label="Memória Canarinho, Página Inicial"
          >
            <img src={`${import.meta.env.BASE_URL}cbf-logo.png`} alt="Símbolo da CBF" className="w-10 h-auto" />
            <span>Memória Canarinho</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <nav aria-label="Navegação Principal">
              <ul className="flex flex-wrap gap-2 justify-center m-0 p-0 list-none">
                <li>
                  <Link to="/" className={getLinkClasses('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
                    <HomeIcon aria-hidden="true" className="w-5 h-5" />
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className={getLinkClasses('/catalog')} aria-current={location.pathname.startsWith('/catalog') ? 'page' : undefined}>
                    <Search aria-hidden="true" className="w-5 h-5" />
                    {t('nav.catalog')}
                  </Link>
                </li>
                <li>
                  <Link to="/collection" className={getLinkClasses('/collection')} aria-current={location.pathname === '/collection' ? 'page' : undefined}>
                    <Library aria-hidden="true" className="w-5 h-5" />
                    {t('nav.collection')}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="relative md:border-l-2 md:border-canarinho-amarelo/30 md:pl-4 mt-2 md:mt-0 flex items-center gap-3">
              
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 text-white hover:bg-canarinho-amarelo/20 px-3 py-2 rounded-md transition-colors focus:ring-4 focus:ring-canarinho-amarelo focus:outline-none"
                  title="Mudar Idioma / Change Language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="uppercase font-bold text-sm">{language}</span>
                </button>
                {isLangOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-24 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden text-slate-800 origin-top z-50">
                    <button onClick={() => { setLanguage('pt'); setIsLangOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 font-bold text-xs">PT-BR</button>
                    <button onClick={() => { setLanguage('en'); setIsLangOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 font-bold text-xs">EN-US</button>
                    <button onClick={() => { setLanguage('es'); setIsLangOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 font-bold text-xs">ES-ES</button>
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-white hover:bg-canarinho-amarelo/20 px-3 py-2 rounded-md transition-colors focus:ring-4 focus:ring-canarinho-amarelo focus:outline-none border-2 border-transparent"
                    aria-expanded={isProfileOpen}
                    aria-label="Menu do Usuário"
                  >
                    <div className="w-9 h-9 bg-canarinho-amarelo text-canarinho-azul-escuro rounded-full flex items-center justify-center font-bold shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 md:right-auto md:left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800 origin-top-left z-50">
                      <div className="p-3 bg-slate-50 border-b border-slate-100 text-sm">
                        <p className="font-bold truncate">{user.name}</p>
                        <p className="text-slate-500 text-xs truncate">{user.email}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        onClick={() => setIsProfileOpen(false)} 
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors font-medium"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        {t('nav.profile')}
                      </Link>
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors text-left font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 text-white font-bold bg-canarinho-azul-escuro border-2 border-canarinho-azul-escuro px-4 py-2 rounded-md hover:bg-canarinho-azul-escuro/80 transition-colors focus:ring-4 focus:ring-canarinho-amarelo focus:outline-none whitespace-nowrap"
                >
                  <UserIcon className="w-5 h-5" />
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8" tabIndex={-1}>
        {children}
      </main>

      <footer className="bg-canarinho-azul-escuro text-canarinho-branco p-6 mt-12 text-center text-sm border-t-8 border-canarinho-verde">
        <p className="mt-2 text-canarinho-amarelo font-medium">{t('footer.text')}</p>
      </footer>
      
      {(isProfileOpen || isLangOpen) && (
        <div className="fixed inset-0 z-30" onClick={() => { setIsProfileOpen(false); setIsLangOpen(false); }} />
      )}
    </div>
  );
};
