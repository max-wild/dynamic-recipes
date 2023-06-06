var express = require("express");

const app = express();

app.get("/recipes", (request, response) => {
    response.status(200);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.type("application/json");
    response.send({
        recipes: [
            {image: "https://cdn.britannica.com/13/234013-050-73781543/rice-and-chorizo-burrito.jpg", name: "Burrito"},
            {image: "https://www.inspiredtaste.net/wp-content/uploads/2023/01/Spaghetti-with-Meat-Sauce-Recipe-Video.jpg", name: "Spaghetti"},
            {image: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/09/sushi-sashimi-1296x728-header.jpg?w=1155&h=1528", name: "Sushi"},
            {image: "https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg", name: "Burger"},
            {image: "https://www.campbells.com/wp-content/uploads/2021/09/F21-Condensed-Eating_10oz_Chicken-Noodle-for-eComm-2400x2400-2.jpg", name: "Chicken Noodle Soup"}
        ]
    });
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
})