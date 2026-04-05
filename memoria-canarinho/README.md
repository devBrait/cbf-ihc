# Memória Canarinho - O Acervo da CBF

Este é um protótipo digital interativo de baixa fidelidade desenvolvido para atuar como um museu virtual do acervo histórico da Seleção Brasileira de Futebol. 

## Funcionalidades
- **Busca Eficiente e Filros**: Encontre facilmente mídias, arquivos em 3D, áudios históricos e fotos usando buscas simples ou a Busca Avançada.
- **Player Acessível com Transcrição Curada**: Permite que pessoas surdas ou jornalistas que precisem do texto copiem rapidamente as falas de uma narração antiga.
- **Coleção Pessoal**: Um sistema robusto para o usuário "Favoritar" e manter sua própria lista de arquivos preferidos ("Minha Coleção").

## Tecnologias Usadas
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (Estilização baseada na paleta da seleção)
- Componentes unificados e acessíveis baseados no [shadcn/ui](https://ui.shadcn.com/) (Input, Label, Button, Card, Sonner, Separator)
- Ícones via `lucide-react`
- Roteamento nativo via `react-router-dom`

## Estrutura do Projeto

```text
memoria-canarinho/
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Navigation.tsx     # Cabeçalho global fixo (Top Menu)
│   │   ├── AudioPlayer.tsx    # Player de Mídia Customizado e Acessível (+Transcrições)
│   │   └── ui/                # Biblioteca de Componentes UI (via Shadcn + Radix)
│   │       ├── button.tsx, card.tsx, input.tsx, label.tsx, separator.tsx, sonner.tsx
│   ├── context/
│   │   └── CollectionContext.tsx  # Persistência mockada (Favoritos / Minha Coleção)
│   ├── data/
│   │   └── mockData.ts        # Dados hardcoded que simulam a API da Memória
│   ├── pages/                 # Telas da Aplicação
│   │   ├── Home.tsx           # Tela Inicial do sistema (Bem-Vindo)
│   │   ├── Catalog.tsx        # Página Combinada: Categorias + Busca + Filtros
│   │   ├── ItemDetail.tsx     # Visualização completa do Arquivo (+ Mídias)
│   │   └── MyCollection.tsx   # Dashboard próprio do Usuário
│   ├── App.tsx                # Declaração Global de Rotas
│   └── main.tsx               # Entrypoint do Vite React com Providers (Context e Router)
```
