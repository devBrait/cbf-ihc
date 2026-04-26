import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Accessibility, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useTranslation } from '../context/I18nContext';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <section className="text-center w-full max-w-4xl pt-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
          {t('home.welcome')}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-2xl h-auto py-4 px-8 font-bold flex gap-3 shadow-lg hover:-translate-y-1 transition-transform border-b-4 border-green-800"
            aria-label="Buscar Itens no Acervo Histórico"
          >
            <Link to="/catalog">
              <Search className="w-8 h-8" aria-hidden="true" />
              {t('catalog.title')}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-2xl h-auto py-4 px-8 font-bold flex gap-3 shadow-lg hover:-translate-y-1 transition-transform text-canarinho-azul-escuro border-4 border-canarinho-azul-escuro"
          >
            <Link to="/collection">
              <Star className="w-8 h-8 text-canarinho-amarelo" aria-hidden="true" />
              {t('nav.collection')}
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl mt-8 pt-10 border-t-2 border-border" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-3xl font-bold text-center mb-10">
          {t('home.why')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-muted flex flex-col items-center text-center p-2">
            <CardHeader>
              <div className="bg-canarinho-amarelo p-4 rounded-full mx-auto" aria-hidden="true">
                <Search className="w-10 h-10 text-canarinho-azul-escuro" />
              </div>
              <CardTitle className="text-xl mt-4">{t('home.search')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">{t('home.searchDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-muted flex flex-col items-center text-center p-2">
            <CardHeader>
              <div className="bg-canarinho-amarelo p-4 rounded-full mx-auto" aria-hidden="true">
                <Accessibility className="w-10 h-10 text-canarinho-azul-escuro" />
              </div>
              <CardTitle className="text-xl mt-4">{t('home.accessibility')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">{t('home.accessibilityDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-muted flex flex-col items-center text-center p-2">
            <CardHeader>
              <div className="bg-canarinho-amarelo p-4 rounded-full mx-auto" aria-hidden="true">
                <ShieldCheck className="w-10 h-10 text-canarinho-azul-escuro" />
              </div>
              <CardTitle className="text-xl mt-4">{t('home.preservation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">{t('home.preservationDesc')}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
