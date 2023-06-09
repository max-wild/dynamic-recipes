import "./Home.css";
import React from "react";
import { RecipeCard } from "./RecipeCard";
import { useEffect, useState } from "react";

const dummyFolderData = ["Pasta", "Fish", "Vegetarian"];

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    fetch("http://localhost:3001/recipes")
    .then((res) => res.json())
    .then((res) => setRecipes(res.recipes));
  }

  const downloadList = () => {
    fetch("http://localhost:3001/shopping")
    .then(res => res.json())
    .then(res => {
      const blob = new Blob ([res.list.join('\n')], {type: "text/plain"});
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'shopping.txt';
      link.click();
    })
  }

  useEffect(() => {
    getRecipes();
  }, []);
        return (<div>
            <div className = "head">
              <header>
                Recipe Manager
              </header>
            </div>
            <div className = "container">
              <div className = "nav-bar">
                  <ul>
                    <h2>Menu</h2>

                    <div className="dropdown">
                      <span>Folders</span>
                      <div className="dropdown-content">
                        {dummyFolderData.map((s, ind) => <a key={ind}>{s}</a>)}
                      </div>
                    </div>

                    <div className="dropdown">
                      <span>Recipe Actions</span>
                      <div className="dropdown-content">
                        <a href="/create">Create Recipe</a>
                        <a>Import Recipe</a>
                      </div>
                    </div>

                    <div className="dropdown">
                      <span>Shopping List</span>
                      <div className="dropdown-content">
                        <a href="/shopping">Go to Shopping List</a>
                        <button onClick={downloadList}>Export Shopping List</button>
                      </div>
                    </div>

                  </ul>
              </div>
              <div className="recipe-list">
                {recipes.map((r, ind) => {
                  return <RecipeCard key={ind} recipe={r} />
                })}
              </div>
            </div>
        </div>)
    }
