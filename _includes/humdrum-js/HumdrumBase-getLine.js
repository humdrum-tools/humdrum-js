//////////////////////////////
//
// HumdrumBase::getLine -- Return the specificed Humdrum line (0 indexed).
//

HumdrumBase.prototype.getLine = function (index) {
	if (index < 0) {
		return null;
	}
	if (index >= this.getLineCount()) {
		return null;
	}
	return this.lines[index];
};



