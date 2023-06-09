import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const ShoppingList = () => {
    const [ingredients, setIngredients] = useState([]);
    const getIngredients = async () => {
        fetch("http://localhost:3001/shopping")
        .then((res) => res.json())
        .then((res) => {const data = res.list; setIngredients(data);})
    }
    useEffect(() => {
        getIngredients();
    }, []);

    const handleDelete = (item) => {
        console.log(ingredients[item]);
        const data = ingredients;
        data.splice(item, 1);
        console.log(data);
        fetch("http://localhost:3001/shopping", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({list: data}),
        })
        .then(() => {
            getIngredients();
        })
    }

    return (
        <div className="shopping-list">
            <div className="shopping-list-header">
                <a href="http://localhost:3000/"><button className="home-button" id="home-icon">
                    <i className="fa-solid fa-house fa-2xl"></i></button></a>
                <header>Shopping List </header> 
            </div>
            <div className="shopping-list-items">
            <ul>
            {ingredients.map((i, ind) => {
                return (
                    <li key={ind} >
                        <p>{i}</p>
                        <button className="shopping-list-item-x" onClick={() => handleDelete(ind)}>
                        <i class="fa-regular fa-trash-can fa-sm"></i>
                        </button>
                    </li>
                );
            })}
            </ul>
            </div>
        </div>
    );
}