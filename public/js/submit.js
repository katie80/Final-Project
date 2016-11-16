function submitRecipe() {
	var recipe = {
		name: $("#recipeName").val(),
		author: $("#recipeAuthor").val(),
		year: $("#recipeYear").val(),
		instructions: $("#recipeInstructions").val(),
		ingredients: JSON.stringify([{
			number: $(".ingredientNumber").val(), 
			unit: $(".ingredientUnit").val(), 
			name: $(".ingredientName").val()
		}])
	};
	console.log(recipe.ingredients);

	$.post('/submit', recipe, (err,res)=>{
		console.log(res);
		// window.location= "/recipe/" + res._id;
	});
}



$("#send_new_recipe").click(submitRecipe);

//duplicated from index_front.js