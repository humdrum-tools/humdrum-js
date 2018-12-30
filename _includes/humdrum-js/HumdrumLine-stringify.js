//////////////////////////////
//
// HumdrumLine::stringify -- Convert object to plain text.
//

HumdrumLine.prototype.stringify = function (opts) {
	var output = "";
	if (!this.fields) {
		return output;
	}
	var format = "tsv";
	if (opts && opts.format && (typeof opts.format === "string" || opts.format instanceof String)) {
		format = opts.format.toLowerCase();
	}
	var separatorCount;
	var separator = "\t";
	if (format === "csv") {
		separator = ",";
	}
	for (var i=0; i<this.fields.length; i++) {
		output += this.fields[i].stringify(opts);
		if (i < this.fields.length - 1) {
			separatorCount = this.fields[i].tabCount;
			separatorCount = separatorCount ? separatorCount : 1;
			for (var j=0; j<separatorCount; j++) {
				output += separator;
			}
		}
	}
	output += "\n";
	return output;
};



