/*jshint esversion:6 */

/*
	Description of a Recipe object. Currently only on the backend, but
	we could actually share this with the frontend if we wanted... hmm...
*/
module.exports = function (mongoose) {

	var recipeSchema = new mongoose.Schema({
		name: String,
		ingredients: Array,
		instructions: String,
		author: String,
		year: Number
	});

	var recipeModel = mongoose.model("Recipes", recipeSchema);

	return recipeModel;
};

