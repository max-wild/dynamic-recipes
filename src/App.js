import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { RecipeDisplay } from './components/RecipeDisplay';
import { RecipeEdit } from './components/RecipeEdit';
import { ShoppingList } from './components/ShoppingList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/recipe/:id" element={<RecipeDisplay />} />
        <Route path="/edit/:id" element={<RecipeEdit />} />
        <Route path="/shopping" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;
