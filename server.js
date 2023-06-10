/**
 * Setup
 */
const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))  // Lets us see information in the body


/**
 * Recipe HTTP Requests
 */
app.get("/recipes", (request, response) => {
    var pdat = [];
    fs.readdirSync("./serverFiles/recipes/").forEach(element => {
        pdat.push(require("./serverFiles/recipes/"+element)); 
    })
    response.status(200);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.type("application/json");
    response.send({
        recipes: pdat
    });
});

app.get("/recipe/:id", (request, response) => {
    const filepath = `./serverFiles/recipes/${request.params.id}.json`;
    if(!fs.existsSync(filepath)){
        response.status(400).send({error: "Recipe doesn't exist."});
        return;
    }

    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            response.sendStatus(400);
            return;
        }
        response.status(200);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.type("application/json");
        response.send(data);
        return;
    });
});

// Create a new recipe
// Send in a request where the request body has recipe information
app.post("/recipe", (request, response) => {

    if(!request.body.name){
        return response.status(400).send({"error": "No recipe name specified."});
    }

    var filepath = path.join("serverFiles", "recipes", `${request.body.name.replace(/ /g, '_')}.json`);
    if(fs.existsSync(filepath)){
        // Stops from overwriting a pre-existing file
        return response.status(400).send({"error": "Recipe name already taken."});
    }

    fs.writeFile(filepath, JSON.stringify(request.body), err => {
        if (err) {
            console.error(err);
            response.sendStatus(400);
            return;
        }
        response.status(200);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.type('text/plain');
        response.send("Success");
        return;
    });
});

// Communicates if a recipe name is already taken
// Url must have the query "name"
app.get("/recipe-exists", (request, response) => {

    if(!request.query.name){
        return response.status(400).send({"error": "No recipe name specified."});
    }

    const filepath = path.join("serverFiles", "recipes", `${request.query.name}.json`);
    const fileExists = fs.existsSync(filepath);

    return response.status(200).send({"exists": fileExists});
})

app.put("/recipe/:id", (request, response) => {
    fs.writeFile(`./serverFiles/recipes/${request.params.id}.json`, JSON.stringify(request.body), err => {
        if (err) {
            console.error(err);
            response.sendStatus(400);
            return;
        }
        response.status(200);
        response.type('text/plain');
        response.send("Success");
    })
});

app.delete("/recipe/:id", (request, response) => {
    fs.unlink(`./serverFiles/recipes/${request.params.id}.json`, err => {
        if (err) {
            console.log(err);
        }
        response.status(200);
        response.type('text/plain');
        response.send("Success");
    })
})

// Delete a new recipe
// Url must have the query "name"
app.delete("/recipe", (request, response) => {

    if(!request.query.name){
        console.log("Error in DELETE: No recipe name specified.")
        return response.status(400).send({"error": "No recipe name specified."});
    }

    var filepath = path.join("serverFiles", "recipes", `${request.query.name.replace(/ /g, '_')}.json`);
    if(!fs.existsSync(filepath)){
        // Stops from overwriting a pre-existing file
        console.log("Error in DELETE: Recipe doesn't exist.")
        return response.status(400).send({"error": "Recipe doesn't exist."});
    }

    fs.unlink(filepath, (err => {
        if (err){ 
            console.error(err);
            response.sendStatus(500);
            return;
        }else {
            response.status(200);
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.type('text/plain');
            response.send("Success");
            return;
        }
    }));
});


/**
 * Shopping HTTP Requests
 */
app.get("/shopping", (request, response) => {
    fs.readFile("./serverFiles/shoppingList.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            response.sendStatus(400);
            return;
        }
        response.status(200);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.type("application/json");
        response.send(data);
        return;
    })
});

app.post("/shopping", (request, response) => {
    console.log(request.body);
    fs.writeFile("./serverFiles/shoppingList.json", JSON.stringify(request.body, null, "\t"), err => {
        if (err) {
            console.error(err);
            response.sendStatus(400);
            return;
        }
        response.status(200);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.type('text/plain');
        response.send("Success");
        return;
    });
});


/**
 * Listener
 */
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
