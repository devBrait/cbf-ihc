import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Library, Home as HomeIcon, User as UserIcon, LogOut, Settings, Globe, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/I18nContext';

export const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useTranslation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path || (path === '/catalog' && location.pathname.startsWith('/catalog'));
    return `flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 font-semibold text-sm md:text-[15px] ${isActive
      ? 'bg-canarinho-amarelo text-canarinho-azul-escuro shadow-sm'
      : 'text-white hover:bg-white/10'
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

      <header className="bg-canarinho-verde text-canarinho-branco sticky top-0 z-50 border-b-2 border-canarinho-amarelo shadow-md w-full">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16 h-20 flex justify-between items-center relative">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-3 hover:opacity-90 transition-opacity focus:ring-4 focus:ring-white focus:outline-none rounded-lg p-1"
            aria-label="Memória Canarinho, Página Inicial"
          >
            <img src={`${import.meta.env.BASE_URL}cbf-logo.png`} alt="Símbolo da CBF" className="w-10 md:w-11 h-auto drop-shadow-sm" />
            <span className="hidden sm:block tracking-tight text-xl md:text-[1.4rem]">Memória Canarinho</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Abrir menu principal</span>
            {isMobileMenuOpen ? (
              <X className="block h-7 w-7" aria-hidden="true" />
            ) : (
              <Menu className="block h-7 w-7" aria-hidden="true" />
            )}
          </button>

          {/* Navigation Links and Actions */}
          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-canarinho-verde md:bg-transparent flex-col md:flex-row items-center gap-6 px-6 py-8 md:p-0 shadow-2xl md:shadow-none border-b-4 border-canarinho-amarelo md:border-none z-40 transition-all duration-300 origin-top`}>
            <nav aria-label="Navegação Principal" className="w-full md:w-auto">
              <ul className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
                <li className="w-full md:w-auto">
                  <Link to="/" className={getLinkClasses('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
                    <HomeIcon aria-hidden="true" className="w-5 h-5" />
                    {t('nav.home')}
                  </Link>
                </li>
                <li className="w-full md:w-auto">
                  <Link to="/catalog" className={getLinkClasses('/catalog')} aria-current={location.pathname.startsWith('/catalog') ? 'page' : undefined}>
                    <Search aria-hidden="true" className="w-5 h-5" />
                    {t('nav.catalog')}
                  </Link>
                </li>
                <li className="w-full md:w-auto">
                  <Link to="/collection" className={getLinkClasses('/collection')} aria-current={location.pathname === '/collection' ? 'page' : undefined}>
                    <Library aria-hidden="true" className="w-5 h-5" />
                    {t('nav.collection')}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 pt-6 md:pt-0 border-t border-white/20 md:border-t-0 md:border-l md:pl-6">

              <div className="relative w-full md:w-auto flex justify-center">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center justify-center gap-2 text-white hover:bg-white/10 px-4 py-2.5 rounded-full transition-colors focus:ring-4 focus:ring-canarinho-amarelo focus:outline-none w-full md:w-auto"
                  title="Mudar Idioma / Change Language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="uppercase font-semibold text-[15px]">{language}</span>
                </button>
                {isLangOpen && (
                  <div className="absolute top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden text-slate-700 z-50 py-1.5 md:right-0">
                    <button onClick={() => { setLanguage('pt'); setIsLangOpen(false); }} className={`w-full text-left px-5 py-2.5 hover:bg-canarinho-verde hover:text-white transition-colors text-sm ${language === 'pt' ? 'font-bold bg-slate-50 text-canarinho-verde' : 'font-medium'}`}>PT-BR</button>
                    <button onClick={() => { setLanguage('en'); setIsLangOpen(false); }} className={`w-full text-left px-5 py-2.5 hover:bg-canarinho-verde hover:text-white transition-colors text-sm ${language === 'en' ? 'font-bold bg-slate-50 text-canarinho-verde' : 'font-medium'}`}>EN-US</button>
                    <button onClick={() => { setLanguage('es'); setIsLangOpen(false); }} className={`w-full text-left px-5 py-2.5 hover:bg-canarinho-verde hover:text-white transition-colors text-sm ${language === 'es' ? 'font-bold bg-slate-50 text-canarinho-verde' : 'font-medium'}`}>ES-ES</button>
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative w-full md:w-auto flex justify-center">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 text-white hover:bg-white/10 p-1.5 pr-4 rounded-full transition-colors outline-none focus:ring-2 focus:ring-white/50 w-full md:w-auto justify-center"
                    aria-expanded={isProfileOpen}
                    aria-label="Menu do Usuário"
                  >
                    <div className="w-9 h-9 bg-canarinho-amarelo text-canarinho-azul-escuro rounded-full flex items-center justify-center font-bold text-sm shadow-inner">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm hidden md:block text-white">{user.name.split(' ')[0]}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden text-slate-800 z-50 md:right-0">
                      <div className="p-4 bg-slate-50/50 border-b border-slate-100">
                        <p className="font-semibold text-sm truncate text-slate-900">{user.name}</p>
                        <p className="text-slate-500 text-xs truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors font-medium text-sm text-slate-700"
                        >
                          <Settings className="w-4 h-4 text-slate-400" />
                          {t('nav.profile')}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-left font-medium text-sm"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          {t('nav.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-canarinho-azul-escuro font-bold bg-canarinho-amarelo px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-all focus:ring-4 focus:ring-yellow-300 focus:outline-none whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 w-full md:w-auto"
                >
                  <UserIcon className="w-4 h-4" />
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
