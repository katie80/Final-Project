/*jshint esversion:6*/
function getIngredients() {
	var ingredients = [];
	$('.duplicateInput').each(function(index) {

	var ingredient = {number: $(this).find('.ingredientNumber').val(), unit: $(this).find('.ingredientUnit').val(), name: $(this).find('.ingredientName').val()};
    ingredients.push(ingredient);
});
	console.log(ingredients);

	return ingredients;
}

function submitRecipe() {
	var ingredients = getIngredients();
	var recipe = {
		name: $("#recipeName").val(),
		author: $("#recipeAuthor").val(),
		year: $("#recipeYear").val(),
		instructions: $("#recipeInstructions").val(),
		ingredients: JSON.stringify(ingredients)
	};
	console.log(recipe.ingredients);

	$.post('/submit', recipe, (err,res)=>{
		console.log(res);
		// window.location= "/recipe/" + res._id;
	});

	// $('.duplicateInput').each(function(index, element) => {
	// 	ingredients.push(element.find('.ingredientNumber').val());
	// 	ingredients.push(element.find('.ingredientUnit').val());
	// 	ingredients.push(element.find('.ingredientName').val());
	// });
}


$("#send_new_recipe").click(submitRecipe);

//duplicated from index_front.js