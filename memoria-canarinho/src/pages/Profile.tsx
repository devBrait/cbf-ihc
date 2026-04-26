import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hashPassword } from '../utils/crypto';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User as UserIcon, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '../context/I18nContext';

export const Profile: React.FC = () => {
  const { user, updatePassword } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Se acessar a rota sem logar, redireciona
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('Erro', { description: t('auth.errPwdNoMatch') });
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Senha fraca', { description: t('auth.errPwdWeak') });
      return;
    }

    setIsLoading(true);

    try {
      const currentHashed = await hashPassword(currentPassword);
      
      // Verifica se a senha atual está correta (comparando com a do usuário logado)
      if (currentHashed !== user.passwordHash) {
        toast.error('Erro', { description: t('auth.errPwdCurrent') });
        setIsLoading(false);
        return;
      }

      const newHashed = await hashPassword(newPassword);
      updatePassword(newHashed);
      toast.success('Sucesso', { description: t('auth.pwdSuccess') });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      toast.error('Erro', { description: t('auth.errGeneric') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full">
          <UserIcon className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-primary">{t('auth.profileTitle')}</h1>
          <p className="text-muted-foreground text-lg">{t('auth.profileDesc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 md:col-span-1 shadow-sm border-slate-200 h-fit">
          <h2 className="text-xl font-bold text-slate-800 mb-4">{t('auth.info')}</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('auth.name')}</p>
              <p className="text-lg font-medium text-slate-900">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('auth.email')}</p>
              <p className="text-lg font-medium text-slate-900">{user.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2 shadow-sm border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-slate-700" />
            <h2 className="text-xl font-bold text-slate-800">{t('auth.changePassword')}</h2>
          </div>
          <Separator className="mb-6" />
          
          <form onSubmit={handlePasswordChange} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t('auth.currentPassword')}</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showCurrentPassword ? "text" : "password"} 
                  required 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-[50%] -translate-y-[50%] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('auth.newPassword')}</Label>
                <div className="relative">
                  <Input 
                    id="newPassword" 
                    type={showNewPassword ? "text" : "password"} 
                    required 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-[50%] -translate-y-[50%] text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">{t('auth.confirmPassword')}</Label>
                <div className="relative">
                  <Input 
                    id="confirmNewPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    required 
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[50%] -translate-y-[50%] text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="mt-6 w-full sm:w-auto h-11 px-8 font-bold bg-canarinho-azul-escuro hover:bg-canarinho-azul-escuro/90 text-white transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:opacity-100 shadow-sm"
              disabled={isLoading || !currentPassword || !newPassword || !confirmNewPassword}
            >
              {isLoading ? t('auth.loading') : t('auth.savePassword')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
