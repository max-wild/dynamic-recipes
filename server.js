var express = require("express");
var fs = require('fs');

const app = express();

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
    var data = require(`./serverFiles/recipes/${request.params.id}.json`);
    response.status(200);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.type("application/json");
    response.send(data);
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});