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
        })

        return (
            <div className = "recipes">
            <div className = "recipe-header">
              <div className = "recipe-title">
                <h1>{recipe.name}</h1>
              </div>
              <div className = "recipe-category">
                <h3>BBQ</h3>
              </div>
            </div>
            <div className = "recipe-image">
              <img src={recipe.image} alt={recipe.name}></img>
            </div>
            <div className = "cook-prep-time">
              <p><strong>Cook Time: </strong></p>
              <p>8 hours 30 min</p>
            </div>
            <div className = "ingredients-list">
              <p><strong>Ingredients: </strong></p>
              <ul>
                <li>Pork Shoulder</li>
              </ul>
            </div>
            <div className = "recipe-cookware">
              <p><strong>Cookware: </strong></p>
              <ul>
                <li>Smoker</li>
              </ul>
            </div>
            <div className = "procedure">
              <p><strong>Steps: </strong></p>
              <ol>
                <li>I ain't fillin all this out rn</li>
                <li>I'm lazy pt2</li>
                <li>aaaaaaanddddd pt3</li>
              </ol>
            </div>
            <div className = "recipe-notes">
              <p><strong>Notes: </strong></p>
              <p>This is a delicious recipe, made by yours truly</p>
            </div>
          </div>
        )
    }