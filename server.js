var express = require("express");
const cors = require("cors");
var fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

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
            return;
        }
        response.status(200);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.type("application/json");
        response.send(data);
        return;
    });
});

app.get("/shopping", (request, response) => {
    fs.readFile("./serverFiles/shoppingList.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
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
    fs.writeFile("./serverFiles/shoppingList.json", JSON.stringify(request.body), err => {
        if (err) {
            console.error(err);
            return;
        }
        response.status(200);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.type('text/plain');
        response.send("Success");
        return;
    });
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});