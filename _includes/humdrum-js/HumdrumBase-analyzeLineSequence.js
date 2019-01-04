///////////////////////////////
//
// HumdrumBase::analyzeLineSequence -- Fill in the contents of
//   HumdrumLine.lineIndex, HumdrumLine.nextLine, and HumdrumLine.prevLine.
//

HumdrumBase.prototype.analyzeLineSequence = function () {
	if ((!this.lines) || (!Array.isArray(this.lines))) {
		return;
	}
	this.lineStructure = {};
	this.lineStructure.firstLineOfType = {};
	this.lineStructure.lastLineOfType = {};
	var flot = this.lineStructure.firstLineOfType;
	var llot = this.lineStructure.lastLineOfType;

	for (var i=0; i<this.lines.length; i++) {
		var curline = this.lines[i];
		var lt = curline.getLineType();
		if (typeof curline.lineStructure === "undefined") {
			curline.lineStructure = {};
		}
		curline.lineStructure.lineIndex = i;
		curline.lineStructure.nextLine = i >= this.lines.length - 1 ? null : this.lines[i+1];
		curline.lineStructure.prevLine = i <= 0 ? null : this.lines[i-1];
		curline.lineStructure.prevLineOfType = llot[lt] ? llot[lt] : null;
		curline.lineStructure.nextLineOfType = null;
		if (llot[lt]) {
			llot[lt].lineStructure.nextLineOfType = curline;
		}
		llot[lt] = curline;
		if (!flot[lt]) {
			flot[lt] = curline;
		}
	}
	return this;
};



