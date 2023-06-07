import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const RecipeEdit = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [name, setName] = useState(recipe.name ? recipe.name : "");
    
    const getRecipe = async () => {
      fetch(`http://localhost:3001/recipe/${id.replace(/ /g, '_')}`)
      .then(res => res.json())
      .then(res => setRecipe(res));
      setName(recipe.name);
    };

    useEffect(() => {
      getRecipe();
    }, []);

    return (
        <div>
            <input defaultValue={name} />
        </div>
    );
}