import "./RecipeCard.css"

export const RecipeCard = (props) => {
    return (
        <a href={`/recipe/${props.recipe.name}`} className="recipe-card">
            <img className="recipe-card-img" src={props.recipe.image} alt={props.recipe.name} />
            <p>{props.recipe.name}</p>
        </a>
    );
}