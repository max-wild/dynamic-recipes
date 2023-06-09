


export const RecipeCreate = () => {

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

        return {
            "temp": "button",
            "name": "rofl"
        }
    }

    const attemptCreateRecipe = async () => {

        // Prevent multiple post requests from being sent
        if(sendingRequests){
            return;
        }
        sendingRequests = true;

        const formData = getFormData();
        const recipeName = formData.name;

        // Check if the recipe name already exists
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
        <div /*className="shopping-list"*/>
            <div className="shopping-list-header">
                <header>Create a Recipe:</header>
            </div>
            <ul>
                {/* {ingredients.map((i, ind) => {
                    return(<li key={ind}><p>{i}</p><button onClick={() => handleDelete(ind)}><i class="fa-regular fa-trash-can"></i></button></li>)
                })} */}
            </ul>
            <button onClick={() => attemptCreateRecipe()}>recipe rofl</button>
        </div>)
}