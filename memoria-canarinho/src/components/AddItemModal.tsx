import React, { useState } from 'react';
import { useTranslation } from '../context/I18nContext';
import { useCollection } from '../context/CollectionContext';
import { useAuth } from '../context/AuthContext';
import { addCollaborativeItem } from '../data/mockData';
import type { Category, CollectionItem } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { X, Upload } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: () => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onItemAdded }) => {
  const { t } = useTranslation();
  const { toggleFavorite } = useCollection();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Fotografias');
  const [year, setYear] = useState('');
  const [competition, setCompetition] = useState('');
  const [opponent, setOpponent] = useState('');
  const [player, setPlayer] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const categories: Category[] = ['Fotografias', 'Entrevistas', 'Documentos', 'Áudios', 'Objetos 3D', 'Vídeos'];

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: CollectionItem = {
      id: `collab-${Date.now()}`,
      title,
      category,
      year,
      competition,
      description,
      // If player or opponent is empty, don't include them so they aren't shown
      ...(player.trim() ? { player: player.trim() } : {}),
      ...(opponent.trim() ? { opponent: opponent.trim() } : {}),
      imageUrl: imageUrl || `https://placehold.co/600x800/0C87D1/FFFFFF?text=${encodeURIComponent(title || 'Item')}`,
      ...(user?.email ? { creatorEmail: user.email } : {})
    };

    // Save to global catalog
    addCollaborativeItem(newItem);
    
    // Add to personal collection
    toggleFavorite(newItem);

    toast.success(t('add.success'));
    onItemAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-auto animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b p-4 md:p-6">
          <h2 className="text-2xl font-bold text-slate-800">{t('add.title')}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="add-title" className="font-bold">{t('add.name')} *</Label>
            <Input id="add-title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-category" className="font-bold">{t('add.category')} *</Label>
              <select 
                id="add-category"
                value={category} 
                onChange={e => setCategory(e.target.value as Category)}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{t(`cat.${cat}`)}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="add-year" className="font-bold">{t('add.year')} *</Label>
              <Input id="add-year" value={year} onChange={e => setYear(e.target.value)} placeholder="Ex: 2002" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-competition" className="font-bold">{t('add.competition')} *</Label>
              <Input id="add-competition" value={competition} onChange={e => setCompetition(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-opponent" className="font-bold">{t('add.opponent')}</Label>
              <Input id="add-opponent" value={opponent} onChange={e => setOpponent(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-player" className="font-bold">{t('add.player')}</Label>
              <Input id="add-player" value={player} onChange={e => setPlayer(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-desc" className="font-bold">{t('add.desc')} *</Label>
            <textarea 
              id="add-desc" 
              value={description} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
              rows={3} 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-file" className="font-bold">{t('add.upload')}</Label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md transition-colors border border-slate-300 border-dashed">
                <Upload className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Selecionar Arquivo</span>
                <input id="add-file" type="file" className="hidden" accept="image/*,audio/*,video/*" onChange={handleFileChange} />
              </label>
              {imageUrl && <span className="text-sm text-green-600 font-medium">Arquivo selecionado!</span>}
            </div>
          </div>

        </form>

        <div className="border-t p-4 md:p-6 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
          <Button type="button" variant="outline" onClick={onClose} className="font-bold">
            {t('add.cancel')}
          </Button>
          <Button type="submit" onClick={handleSubmit} className="bg-canarinho-verde hover:bg-canarinho-verde/90 text-white font-bold">
            {t('add.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};
