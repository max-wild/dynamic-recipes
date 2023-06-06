import React from "react";
import { useParams } from "react-router-dom";

export const RecipeDisplay = () => {
        const {id} = useParams();
        console.log(id);
        return (
            <div class = "recipes">
            <div class = "recipe-header">
              <div class = "recipe-title">
                <h1>Pulled Pork</h1>
              </div>
              <div class = "recipe-category">
                <h3>BBQ</h3>
              </div>
            </div>
            <div class = "recipe-image">
              <img src="/pulled_pork.png" alt="Delicious Pulled Pork"></img>
            </div>
            <div class = "cook-prep-time">
              <p><strong>Cook Time: </strong></p>
              <p>8 hours 30 min</p>
            </div>
            <div class = "ingredients-list">
              <p><strong>Ingredients: </strong></p>
              <ul>
                <li>Pork Shoulder</li>
              </ul>
            </div>
            <div class = "recipe-cookware">
              <p><strong>Cookware: </strong></p>
              <ul>
                <li>Smoker</li>
              </ul>
            </div>
            <div class = "procedure">
              <p><strong>Steps: </strong></p>
              <ol>
                <li>I ain't fillin all this out rn</li>
                <li>I'm lazy pt2</li>
                <li>aaaaaaanddddd pt3</li>
              </ol>
            </div>
            <div class = "recipe-notes">
              <p><strong>Notes: </strong></p>
              <p>This is a delicious recipe, made by yours truly</p>
            </div>
          </div>
        )
    }