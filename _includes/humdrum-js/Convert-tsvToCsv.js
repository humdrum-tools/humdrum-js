//////////////////////////////
//
// Convert::tsvToCsv -- Convert a TSV string into a CSV string.  Tabs
//     are not allowed to be escapeable, i.e., embeddable within
//     tokens. However tabs within global comments or reference
//     records are embeddable, since there are no spines in those
//     line types.  If a token contains a comma or a quote, then it
//     will be quote-escaped.  This will add a backslash in front
//     of every double-quote in the token, and then wrap the token
//     in double quotes.  Also if the token starts or ends with a space
//     the token will be quote-escaped to ensure that the space is
//     preserved. Newlines are not expected in the input string.
//

Convert.prototype.tsvToCsv = function (input) {
	if (typeof input !== "string" && !(input instanceof String)) {
		return "";
	}
	if (input === "") {
		// empty string, so return empty string
		return input;
	}
	var segments;
	if (input.match(/^!!/)) {
		// treat line as a single segment
		segments = [input];
	} else {
		segments = input.split(/\t/);
	}
	var output = "";
	for (var i=0; i<segments.length; i++) {
		if (segments[i] === "") {
			output += ",";
		} else {
			output += this.TokenToCsv(segments[i]);
			if (i < segments.length - 1) {
				output += ",";
			}
		}
	}
	return output;
};



