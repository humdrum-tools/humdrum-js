//////////////////////////////
//
// Convert::csvToTsv -- Convert a CSV string into a TSV string.
//   only considering double quotes as escape characters.
//   Also check on whether to include single quotes -- i.e., what
//   is the format that common spreadsheet programs expect for CSV data?
//

Convert.prototype.csvToTsv = function (input) {
	if (typeof input !== "string" && !(input instanceof String)) {
		return "";
	}
	var output   = "";
	var incell   = false;
	var inquotes = false;
	var ch;
	for (var i=0; i<input.length; i++) {
		ch = input[i];
		if (incell) {
			if (inquotes) {
				if (ch === '"') {
					// coming to the end of a quote-escaped cell
					inquotes = false;
					incell = false;
					// do not echo the quote
				} else if (inquotes && ch === '\\') {
					// poentially escaped quote character
					if (i >= input.length - 1) {
						// at end of string, which is strange,
						// so just output quote character
						output += ch;
					} else if (input[i+1] === '"') {
						// escaped quote character, so echo and skip
						output += input[i+1];
						i++;
					} else {
						// plain backslash
						output += ch;
					}
				} else {
					// plain character in quote-escape token
					output += ch;
				}
			} else {
				// incell but not inquotes
				if (ch === ",") {
					// end of cell and found separator
					incell = false;
					output += "\t";
				} else {
					// a plain cell character
					output += ch;
				}
			}
		} else {
			// not incell (and by extension not inquotes)
			if (ch === ",") {
				output += "\t";
			} else if (ch === '"') {
				// start reading a cell which is quote escaped
				incell = true;
				inquotes = true;
				// do not echo the quote
			} else {
				// start reading a cell which is not quote escaped
				incell = true;
				inquotes = false;
				output += ch;
			}
		}
	}
	return output;
};
