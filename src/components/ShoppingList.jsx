import { useEffect } from "react";
import { useState } from "react";

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
        <div>
            <ul>
            {ingredients.map((i, ind) => {
                return(<li key={ind}><p>{i}</p><button onClick={() => handleDelete(ind)}>Delete</button></li>)
            })}
            </ul>
        </div>
    );
}