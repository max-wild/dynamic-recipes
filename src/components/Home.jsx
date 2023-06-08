import "./Home.css";
import React from "react";
import { RecipeCard } from "./RecipeCard";
import { useEffect, useState } from "react";

const dummyFolderData = ["Pasta", "Fish", "Vegetarian"];

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    fetch("http://localhost:3001/recipes")
    .then((res) => {console.log(res); return res.json();})
    .then((res) => setRecipes(res.recipes));
  }

  useEffect(() => {
    getRecipes();
  });
        return (<div>
            <div class = "head">
              <header>
                Recipe Manager
              </header>
            </div>
            <div class = "container">
              <div class = "nav-bar">
                  <ul>
                    <h2>Menu</h2>

                    <div class="dropdown">
                      <span>Folders</span>
                      <div class="dropdown-content">
                        {dummyFolderData.map((s) => <a>{s}</a>)}
                      </div>
                    </div>

                    <div class="dropdown">
                      <span>Recipe Actions</span>
                      <div class="dropdown-content">
                        <p>Create Recipe</p>
                        <p>Import Recipe</p>
                      </div>
                    </div>

                    <div class="dropdown">
                      <span>Shopping List</span>
                      <div class="dropdown-content">
                        <p>Go to Shopping List</p>
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
