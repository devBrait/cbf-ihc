import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hashPassword } from '../utils/crypto';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '../context/I18nContext';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        <div className="bg-canarinho-azul-escuro/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-10 h-10 text-canarinho-azul-escuro" />
        </div>
        <h1 className="text-4xl font-extrabold text-primary mb-2">{t('auth.registerTitle')}</h1>
        <p className="text-muted-foreground">{t('auth.registerDesc')}</p>
      </div>

      <Card className="p-6 md:p-8 shadow-lg border-t-4 border-t-canarinho-azul-escuro">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold text-slate-700">{t('auth.name')}</Label>
            <Input 
              id="name" 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 border-slate-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold text-slate-700">{t('auth.email')}</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-slate-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold text-slate-700">{t('auth.password')}</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-slate-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-bold text-slate-700">{t('auth.confirmPassword')}</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 border-slate-300"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-bold bg-canarinho-verde hover:bg-green-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? t('auth.loading') : t('auth.registerBtn')}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          {t('auth.hasAccount')} <Link to="/login" className="text-canarinho-azul-escuro font-bold hover:underline">
            {t('auth.doLogin')}
          </Link>
        </div>
      </Card>
    </div>
  );
};
