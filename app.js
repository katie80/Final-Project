/*jshint esversion:6 */
var express = require("express");

var app = express();

var mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

// bring in what we `module.export`ed from Recipe.js
var recipeConstructor = require("./Recipe.js");

var Recipe = recipeConstructor(mongoose);

// bring in what we `module.export`ed from Storage.js
// var Storage = require("./Storage.js");

// create our storage object
// var storage = new Storage();

mongoose.connect("mongodb://localhost");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(req.url);
	next();
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/html/index.html");
});

app.get("/submit", (req, res) => {
	res.sendFile(__dirname + "/html/submit-recipe.html");
});

app.get("/recipe/:id", (req, res) => {
	res.sendFile(__dirname + "/html/recipe-display.html");
});

app.get("/user", (req, res) => {
	res.sendFile(__dirname + "/html/user_page.html");
});

// app.get("/recipe/:id", (req, res) => {
// 	res.sendFile(__dirname + "/html/recipe-display.html");
// });

app.post("/api/oneRecipe", (req, res) => {
	console.log(req.body.id,"here's a message");
	Recipe.findOne({_id: req.body.id}, (err,data)=>{
		res.send(data);
	});
	
});

app.post("/submit", (req, res) => {
	console.log(req.body.ingredients);

	var recipe = new Recipe(
	{
		name: req.body.name,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		author: req.body.author,
		year: req.body.year
	});

	recipe.save();

	Recipe.findOne({name: recipe.name}, (err, data)=>{
		console.log(data, "should be data");
		res.send(data);
	});

});


app.get("/api/recipes", (req, res) => {

	Recipe.find({}, (err, recipes) => {
		res.send(recipes);
	});
	
});

app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404);
    res.send("File not found.");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send("500 Error");
});

app.listen(PORT, () => {
    console.log("Server Started on Port: " + PORT);
});