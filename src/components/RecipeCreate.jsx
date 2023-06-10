import { useState } from "react";

export const RecipeCreate = () => {

    const [ingredients, setIngredients] = useState([]);
    const [cookware, setCookware] = useState([]);
    const [steps, setSteps] = useState([]);

    const handleDeleteIngredient = (ind) => {
        const data = JSON.parse(JSON.stringify(ingredients));
        data.splice(ind, 1);
        setIngredients(data);
    }

    const handleDeleteCookware = (ind) => {
        const data = JSON.parse(JSON.stringify(cookware));
        data.splice(ind, 1);
        setCookware(data);
    }

    const handleDeleteStep = (ind) => {
        const data = JSON.parse(JSON.stringify(steps));
        data.splice(ind, 1);
        setSteps(data);
    }

    const handleAddIngredient = () => {
        const data = JSON.parse(JSON.stringify(ingredients));
        data.push(document.getElementById("ingredients-input").value);
        document.getElementById("ingredients-input").value = "";
        setIngredients(data);
    }

    const handleAddCookware = () => {
        const data = JSON.parse(JSON.stringify(cookware));
        data.push(document.getElementById("cookware-input").value);
        document.getElementById("cookware-input").value = "";
        setCookware(data);
    }

    const handleAddStep = () => {
        const data = JSON.parse(JSON.stringify(steps));
        data.push(document.getElementById("cookware-input").value);
        document.getElementById("cookware-input").value = "";
        setCookware(data);
    }


    var sendingRequests = false;  // Global variable used to stop multiple post requests to the server

    /**
     * 
     * @returns True or false if the recipe name already is being used. Throws an
     * error if it can't connect to the server.
     */
    const recipeExists = async (recipeName) => {

        recipeName = recipeName.replace(/ /g, '_');

        const response = await fetch(`http://localhost:3001/recipe-exists?name=${recipeName}`, {
            method: "GET"
        });
        const responseBod = await response.json();

        if(!response.ok){
            throw new Error('The server is not communicating if the recipe name is valid.');
        }
        return responseBod.exists;
    }

    /**
     * 
     * @returns JSON object will all filled-out information in the page
     */
    const getFormData = () => {

        var formData = {
            "name": document.getElementById("name-input").value,
            "image": document.getElementById("image-input").value,
            "category": document.getElementById("category-input").value,
            "cooktime": document.getElementById("cooktime-input").value,
            "notes": document.getElementById("notes-input").value
        };

        if(ingredients.length){
            formData["ingredients"] = ingredients;
        }
        if(cookware.length){
            formData["cookware"] = cookware;
        }
        if(steps.length){
            formData["steps"] = steps;
        }

        return formData;
    }

    const attemptCreateRecipe = async () => {

        // Prevent multiple post requests from being sent
        if(sendingRequests){
            return;
        }
        sendingRequests = true;

        const formData = getFormData();
        const recipeName = formData.name;

        // Check if the recipe name is unspecified or already taken
        if(!recipeName){
            alert('Please specify a recipe name.');
            sendingRequests = false;
            return;
        }
        try{
            if(await recipeExists(recipeName)){
                alert('This recipe name is already taken. Please use another.');
                sendingRequests = false;
                return;
            }
        }catch{
            alert('Server is unable to communicate if this recipe name is already taken.');
            sendingRequests = false;
            return;
        }

        // Add the recipe to the server
        const response = await fetch(`http://localhost:3001/recipe`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {"Content-Type": "application/json"}
        });

        // Report conclusion
        if(response.status !== 200){
            const responseBod = await response.json();
            console.error("Tried to upload recipe:", formData, "\nResulted in error:", responseBod);
            alert("The server was not able to add this recipe.");
            sendingRequests = false;
            return;
        }

        window.location.href = `/recipe/${recipeName.replace(/ /g, '_')}`;
        sendingRequests = false;
    }

    return (
        <div>
            <div className="shopping-list-header">
                <header>Create a Recipe:</header>
            </div>
            
            <p>warning cookware is temporarily kind of buggy since it's tyler's old code copy-pasted</p>

            <div><p>Name: </p><input id="name-input" /></div>
            <div><p>Image: </p><input id="image-input" /></div>
            <div><p>Category: </p><input id="category-input" /></div>
            <div><p>Cooktime: </p><input id="cooktime-input" /></div>
            
            <div>
                <p>Ingredients</p>
                <ul>
                    {ingredients.map((i, ind) => {
                        return (
                            <li key={ind}>
                            <p>{i}</p><button onClick={() => handleDeleteIngredient(ind)}><i className="fa-regular fa-trash-can"></i></button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <p>Add: </p><input id="ingredients-input"/><button onClick={handleAddIngredient}>Add</button>
                </div>
            </div>
            
            <div>
                <p>Cookware</p>
                <ul>
                    {cookware.map((i, ind) => {
                        return (
                            <li key={ind}>
                            <p>{i}</p><button onClick={() => handleDeleteCookware(ind)}><i className="fa-regular fa-trash-can"></i></button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <p>Add: </p><input id="cookware-input"/><button onClick={handleAddCookware}>Add</button>
                </div>
            </div>
            
            <div>
                <p>Steps</p>
                <ol>
                    {steps.map((i, ind) => {
                        return (
                            <li key={ind}>
                            <p>{i}</p><button onClick={() => handleDeleteStep(ind)}><i className="fa-regular fa-trash-can"></i></button>
                            </li>
                        )
                    })}
                </ol>
                <div>
                    <p>Add: </p><input id="steps-input"/><button onClick={handleAddStep}>Add</button>
                </div>
            </div>
            
            <div><p>Notes: </p><input id="notes-input" /></div>
            
            <button onClick={() => attemptCreateRecipe()}>Create</button>
        </div>
    )
}
