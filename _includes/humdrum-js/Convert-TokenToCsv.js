//////////////////////////////
//
// Convert::TokenToCsv -- Convert a Humdrum token string into 
//     a CSV string.  This function will decide if the token needs
//     to be quote-escape if there are double quotes, a comma, or
//     space at the beginning or ending of the token (or maybe should
//     always quote-escape if any spaces found) to ensure that they are
//     preserved.  This is a helper fuction for Convert.tsvToCsv().
//

Convert.prototype.TokenToCsv = function (input) {
	if (typeof input !== "string" && !(input instanceof String)) {
		return "";
	}
	if (input === "") {
		// empty string, so return empty string
		return input;
	}
	var needsquotes = false;
	if (input.match(/[",]/)) {
		needsquotes = true;
	}
	if (input.match(/^\s+/)) {
		needsquotes = true;
	}
	if (input.match(/\s+$/)) {
		needsquotes = true;
	}
	if (!needsquotes) {
		return input;
	}
	return '"' + input.replace(/"/g, '\\"') + '"';
};



