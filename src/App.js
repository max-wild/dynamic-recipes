import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { RecipeDisplay } from './components/RecipeDisplay';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/recipe" element={<RecipeDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
