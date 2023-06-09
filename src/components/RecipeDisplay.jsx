import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const RecipeDisplay = () => {
        const {id} = useParams();
        const [recipe, setRecipe] = useState({});
        
        const getRecipe = async () => {
          fetch(`http://localhost:3001/recipe/${id.replace(/ /g, '_')}`)
          .then(res => res.json())
          .then(res => setRecipe(res));
        };

        useEffect(() => {
          getRecipe();
        }, []);

        const handleClick = async (item) => {
          console.log("Handling click", item);
          fetch('http://localhost:3001/shopping')
          .then(res => res.json())
          .then(res => {
            res.list.push(item);
            const list = res.list;
            fetch("http://localhost:3001/shopping", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({list: list})
            });
          })
        }

        return (
            <div className = "recipes">
            <div className = "recipe-header">
              <button class="home-button" id="home-icon"><i class="fa-solid fa-house fa-2xl"></i></button>
              <div className = "recipe-title">
                <header>{recipe.name}</header>
              </div>
              {recipe.category && <div className = "recipe-category">
                <h3>{recipe.category}</h3>
            </div>}
            </div>
            {recipe.image && <div className = "recipe-image">
              <img src={recipe.image} alt={recipe.name}></img>
            </div>}
            {recipe.cooktime && <div className = "cook-prep-time">
              <p><strong>Cook Time: </strong></p>
              <p>{recipe.cooktime}</p>
            </div>}
            {recipe.ingredients && <div className = "ingredients-list">
              <p><strong>Ingredients: </strong></p>
              <ul>
                {recipe.ingredients.map((i) => <li><p>{i}</p><button onClick={() => handleClick(i)}>Add</button></li>)}
              </ul>
            </div>}
            {recipe.cookware && <div className = "recipe-cookware">
              <p><strong>Cookware: </strong></p>
              <ul>
                {recipe.cookware.map((c) => <li>{c}</li>)}
              </ul>
            </div>}
            {recipe.steps && <div className = "procedure">
              <p><strong>Steps: </strong></p>
              <ol>
                {recipe.steps.map((s) => <li>{s}</li>)}
              </ol>
            </div>}
            {recipe.notes && <div className = "recipe-notes">
              <p><strong>Notes: </strong></p>
              <p>{recipe.notes}</p>
            </div>}
          </div>
        )
    }