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
    fs.readFile(`./serverFiles/recipes/${request.params.id}.json`, "utf-8", (err, data) => {
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
   
    // Find a valid filename
    var fileBasename = request.body.name;
    var fileBasenameSuffix = ""
    var numberSuffix = 0;
    if(!fileBasename){
        fileBasename = "unnamed";
    }
    var filepath = path.join("serverFiles", "recipes", `${fileBasename}${fileBasenameSuffix}.json`)
    while(fs.existsSync(filepath)){
        // Stops from overwriting a pre-existing file
        numberSuffix += 1;
        fileBasenameSuffix = String(numberSuffix);
        filepath = path.join("serverFiles", "recipes", `${fileBasename}${fileBasenameSuffix}.json`);
    }

    fs.writeFile(filepath, JSON.stringify(request.body, null, "\t"), err => {
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

app.put("/recipe/:id", (request, response) => {
    fs.writeFile(`./serverFiles/recipes/${request.params.id}`, err => {
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
