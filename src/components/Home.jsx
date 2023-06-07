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
                    <h2>Where to go</h2>

                    <div clasName="dropdown">
                      <span>Folders</span>
                      <div className="dropdown-content">
                        {dummyFolderData.map((s) => <a>{s}</a>)}
                      </div>
                    </div>

                    <div className="dropdown">
                      <span>Recipe Actions</span>
                      <div className="dropdown-content">
                        <p>Create Recipe</p>
                        <p>Import Recipe</p>
                      </div>
                    </div>

                    <div className="dropdown">
                      <span>Shopping List</span>
                      <div className="dropdown-content">
                        <a href="/shopping">Go to Shopping List</a>
                        <p>Export Shopping List</p>
                      </div>
                    </div>

                  </ul>
              </div>
              <div className="recipe-list">
                {recipes.map((r) => {
                  return <RecipeCard recipe={r} />
                })}
              </div>
            </div>
        </div>)
    }
