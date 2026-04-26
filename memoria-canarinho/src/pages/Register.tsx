import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hashPassword } from '../utils/crypto';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '../context/I18nContext';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Erro', { description: 'As senhas não coincidem.' });
      return;
    }

    if (password.length < 6) {
      toast.error('Senha fraca', { description: 'A senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    setIsLoading(true);

    try {
      const hashed = await hashPassword(password);
      register(name, email, hashed);
      navigate('/');
    } catch (err: any) {
      toast.error('Erro', { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-12 pb-24">
      <div className="text-center mb-8">
        <div className="bg-canarinho-verde/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-10 h-10 text-canarinho-verde" />
        </div>
        <h1 className="text-4xl font-extrabold text-primary mb-2">{t('auth.registerTitle')}</h1>
        <p className="text-muted-foreground">{t('auth.registerDesc')}</p>
      </div>

      <Card className="p-6 md:p-8 shadow-lg border-t-4 border-t-canarinho-verde">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold text-slate-700">{t('auth.name')}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t('auth.namePlaceholder')}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 border-slate-300 placeholder:text-slate-400/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold text-slate-700">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-slate-300 placeholder:text-slate-400/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold text-slate-700">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.newPasswordPlaceholder')}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-slate-300 placeholder:text-slate-400/70 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-bold text-slate-700">{t('auth.confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 border-slate-300 placeholder:text-slate-400/70 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-canarinho-azul-escuro hover:bg-canarinho-azul-escuro/90 transition-colors text-white"
            disabled={isLoading}
          >
            {isLoading ? t('auth.loading') : t('auth.registerBtn')}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          {t('auth.hasAccount')} <Link to="/login" className="text-canarinho-verde font-bold hover:underline">
            {t('auth.doLogin')}
          </Link>
        </div>
      </Card>
    </div>
  );
};
