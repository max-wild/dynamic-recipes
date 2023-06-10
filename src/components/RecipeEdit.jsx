import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RecipeEdit = () => {
    const navigate = useNavigate();

    const [isPut, setIsPut] = useState("");

    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [cooktime, setCooktime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [cookware, setCookware] = useState([]);
    const [steps, setSteps] = useState([]);
    const [notes, setNotes] = useState("");
    
    const getRecipe = async () => {
      fetch(`http://localhost:3001/recipe/${id.replace(/ /g, '_')}`)
      .then(res => {
        if(!res.ok){
          navigate("/page-not-found");
        }
        return res.json();
      })
      .then(res => {
        setRecipe(res);
        setName(res.name ? res.name : "");
        setImage(res.image ? res.image : "");
        setCategory(res.category ? res.category : "");
        setCooktime(res.cooktime ? res.cooktime : "");
        setIngredients(res.ingredients ? res.ingredients : []);
        setCookware(res.cookware ? res.cookware : []);
        setSteps(res.steps ? res.steps : []);
        setNotes(res.notes);
      });
    };


    useEffect(() => {
      getRecipe();
    }, []);

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
      data.push(document.getElementById("steps-input").value);
      document.getElementById("steps-input").value = "";
      setSteps(data);
    }

    const handleSave = () => {
      let newRecipe = {
        name: document.getElementById("name-input").value
      }
      if (document.getElementById("image-input").value) {
        newRecipe["image"] = document.getElementById("image-input").value;
      }
      if (document.getElementById("category-input").value) {
        newRecipe["category"] = document.getElementById("category-input").value;
      }
      if (document.getElementById("cooktime-input").value) {
        newRecipe["cooktime"] = document.getElementById("cooktime-input").value;
      }
      if (ingredients.length !== 0) {
        newRecipe["ingredients"] = ingredients;
      }
      if (cookware.length !== 0) {
        newRecipe["cookware"] = cookware;
      }
      if (steps.length !== 0) {
        newRecipe["steps"] = steps;
      }
      if (document.getElementById("notes-input").value) {
        newRecipe["notes"] = document.getElementById("notes-input").value;
      }
      if (newRecipe.name !== recipe.name) {
        fetch(`http://localhost:3001/recipe/${recipe.name.replace(/ /g, "_")}`, {
          method: "DELETE"
        })
        .then(
          fetch(`http://localhost:3001/recipe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
          })
          .then(setIsPut(true))
        );
      }
      else {
        fetch(`http://localhost:3001/recipe/${newRecipe.name.replace(/ /g, "_")}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newRecipe)
        })
        .then(setIsPut(true));
      }
    }

    const handleDelete = () => {

      const reqName = id.replace("%20", " ").replace(" ", "_");  // Remove all space substitutes

      fetch(`http://localhost:3001/recipe?name=${reqName}`, {
        method: "DELETE",
      })
      .then(res => {
        if(!res.ok){
          alert("Server unable to delete recipe");
          return;
        }
        window.location.href = "/";
      });
    }

    return isPut ? <Navigate to={`/recipe/${name}`} /> : (
        <div className="create-a-recipe">
            <div className="edit-header">
                <a href="http://localhost:3000/"><button className="home-button" id="home-icon">
                <i className="fa-solid fa-house fa-2xl"></i></button></a>
                <header>Edit Your Recipe:</header>
            </div>
            <div className="create-content">
            <div><p>Name: </p><input id="name-input" defaultValue={name} /></div>
            <div><p>Image: </p><input id="image-input" defaultValue={image} /></div>
            <div><p>Category: </p><input id="category-input" defaultValue={category} /></div>
            <div><p>Cooktime: </p><input id="cooktime-input" defaultValue={cooktime} /></div>
            <div>
              <p>Ingredients</p>
              <ul>
                {ingredients.map((i, ind) => {
                  return (
                    <li key={ind}>
                      <p>{i}</p><button className="trash-item" onClick={() => handleDeleteIngredient(ind)}><i className="fa-regular fa-trash-can"></i></button>
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
                      <p>{i}</p><button className="trash-item" onClick={() => handleDeleteCookware(ind)}><i className="fa-regular fa-trash-can"></i></button>
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
                      <p>{i}</p><button className="trash-item" onClick={() => handleDeleteStep(ind)}><i className="fa-regular fa-trash-can"></i></button>
                    </li>
                  )
                })}
              </ol>
              <div>
                <p>Add: </p><input id="steps-input"/><button onClick={handleAddStep}>Add</button>
            </div>
            </div>
            <div><p>Notes: </p><input id="notes-input" defaultValue={notes} /></div>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="delete-button" style={{"margin-left": "20px"}} onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}