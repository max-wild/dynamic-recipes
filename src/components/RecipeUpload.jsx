import { useState } from "react";
import { Navigate } from "react-router-dom";

export const RecipeUpload = () => {
    const [recipeName, setRecipeName] = useState("");
    const handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            const recipe = JSON.parse(content);
            fetch("http://localhost:3001/recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: content
            })
            .then(setRecipeName(recipe.name));
        }

        reader.readAsText(file);
    }
    return recipeName ? <Navigate to={`/recipe/${recipeName}`} /> : (
        <div>
            <input type="file" onChange={handleUpload}/>
        </div>
    )
}