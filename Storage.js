/* jshint esversion:6 */

/*
	This is our extensible storage object. We've written it so that we can
	replace any parts of it in the future with calls to file system or mongo
	without too much effort.
*/

function Storage() {
	var recipes = [];
	var users = [];

	// this.addrecipe = (recipe, cb)  => {
	// 	// cb = callback
	// 	recipes.push(recipe);
	// 	if (cb) {
	// 		cb();
	// 	}
	// };

	this.getAllrecipes = (cb) => {
		// cb = callback
		cb(recipes);
	};
}

module.exports = Storage;