///////////////////////////////
//
// HumdrumBase::analyzeLineSequence -- Fill in the contents of
//   HumdrumLine.lineIndex, HumdrumLine.nextLine, and HumdrumLine.prevLine.
//

HumdrumBase.prototype.analyzeLineSequence = function () {
	if ((!this.lines) || (!Array.isArray(this.lines))) {
		return;
	}
	for (var i=0; i<this.lines.length; i++) {
		this.lines[i].lineIndex = i;
		this.lines[i].nextLine = i >= this.lines.length - 1 ? null : this.lines[i+1];
		this.lines[i].prevLine = i <= 0 ? null : this.lines[i-1];
	}
	return this;
};



