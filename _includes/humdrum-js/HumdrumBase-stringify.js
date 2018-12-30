//////////////////////////////
//
// HumdrumBase::stringify -- Return a plain text Humdrum data file.
//

HumdrumBase.prototype.stringify = function () {
	var output = "";
	if (!this.lines) {
		return output;
	}
	for (var i=0; i<this.lines.length; i++) {
		output += this.lines[i].stringify();
	}
	return output;
};



