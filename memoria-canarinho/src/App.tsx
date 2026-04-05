import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ItemDetail } from './pages/ItemDetail';
import { MyCollection } from './pages/MyCollection';

function App() {
  return (
    <Navigation>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ItemDetail />} />
        <Route path="/collection" element={<MyCollection />} />
      </Routes>
    </Navigation>
  );
}

export default App;
