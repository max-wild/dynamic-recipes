import React from "react";

export class RecipeDisplay extends React.Component {
    render() {
        const searchParams = new URLSearchParams(document.location.search)
        console.log(searchParams);
        return (
            <div>
                <h1>Recipe</h1>
                <p>{searchParams.get('id')}</p>
            </div>
        )
    }
}