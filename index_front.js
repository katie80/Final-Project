/*
	This is the front-end javascript for our website. It handles displaying the
	projects to the user. You can think of this as the "view" of the site.
*/

/*
	This function takes in a recipe (object with name, author, description, and
	year array), and returns a DOM element clone of the project template. (An
	HTML element that we can append to the page later).
*/
function createRecipeHMTL(recipe) {
	// clone the template
	var recipeDiv = $('#recipe_template').clone();
	// remove the id (only one thing with each id)
	recipeDiv.removeAttr("id");
	// set name, author, and description
	recipeDiv.find(".recipe_name").text(recipe.name);
	recipeDiv.find(".recipe_author").text(recipe.author);
	recipeDiv.find(".recipe_year").text(recipe.year);
	recipeDiv.find(".recipe_description").text(recipe.description);
	recipeDiv.find(".recipe_ingredient_number").text(recipe.ingredient.number);
	recipeDiv.find(".recipe_ingredient_unit").text(recipe.ingredient.unit);
	recipeDiv.find(".recipe_ingredient_name").text(recipe.ingredient.name);
	// show this clone of the template (template is hidden by default)
	recipeDiv.show();
	// return a reference to the clone
	return recipeDiv;
}

/*
	On page load...
*/
$(document).ready(function() {

	/*
		Get all of the recipes from the server. Uses the
		"/display" endpoint. If the response is an empty array, display
		"No recipes!". Otherwise we build the recipes into HTML and display
		them on the page.
	*/
	$.get('/display', function(res) {
		// res here is what we ("res.send") on the backend
		if (res.length === 0) {
			$('#recipes').text("No recipes!");
		} else {
			for (var i in res) {
				// for-in, since for-of sometimes doesn't work on frontend
				$('#recipes').append(createRecipeHMTL(res[i]));
			}
		}
	}, 'json'); //'json' = auto parse as json

	$("#send_new_recipe").click(submitRecipe);
});
