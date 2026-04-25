import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { hashPassword } from '../utils/crypto';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, passwordHash: string) => void;
  register: (name: string, email: string, passwordHash: string) => void;
  logout: () => void;
  updatePassword: (newHash: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('cbf_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, passwordHash: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('cbf_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.passwordHash === passwordHash);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('cbf_session', JSON.stringify(foundUser));
      toast.success('Login bem-sucedido!', { description: `Bem-vindo de volta, ${foundUser.name}!` });
    } else {
      throw new Error('E-mail ou senha incorretos.');
    }
  };

  const register = (name: string, email: string, passwordHash: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('cbf_users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error('Este e-mail já está em uso.');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash,
    };

    users.push(newUser);
    localStorage.setItem('cbf_users', JSON.stringify(users));
    
    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem('cbf_session', JSON.stringify(newUser));
    toast.success('Conta criada com sucesso!', { description: `Bem-vindo, ${name}!` });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cbf_session');
    toast.info('Você saiu da sua conta.');
  };

  const updatePassword = (newHash: string) => {
    if (!user) return;
    
    const users: User[] = JSON.parse(localStorage.getItem('cbf_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex].passwordHash = newHash;
      localStorage.setItem('cbf_users', JSON.stringify(users));
      
      const updatedUser = { ...user, passwordHash: newHash };
      setUser(updatedUser);
      localStorage.setItem('cbf_session', JSON.stringify(updatedUser));
      toast.success('Senha alterada com sucesso!');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
