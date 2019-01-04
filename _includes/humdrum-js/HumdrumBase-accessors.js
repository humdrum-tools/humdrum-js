//////////////////////////////
//
// HumdrumBase::getFirstLineOfType -- return the first line of a given line type.
//    Returns null if no line of given type is found in the file.
//

HumdrumBase.prototype.getFirstLineOfType = function (type) {
	if (!this.lineStructure) {
		return null;
	}
	if (!this.lineStructure.firstLineOfType) {
		return null;
	}
	if (typeof this.lineStructure.firstLineOfType[type] === "undefined") {
		return null;
	} else {
		return this.lineStructure.firstLineOfType[type];
	}
};


HumdrumBase.prototype.getFirstInterpretation = function () { return this.getFirstLineOfType("Interpretation") };
HumdrumBase.prototype.getFirstBarline = function () { return this.getFirstLineOfType("Barline") };
HumdrumBase.prototype.getFirstDataline = function () { return this.getFirstLineOfType("Data") };



//////////////////////////////
//
// HumdrumBase::getLastLineOfType -- return the last line of a given line type.
//    Returns null if no line of given type is found in the file.
//

HumdrumBase.prototype.getLastLineOfType = function (type) {
	if (!this.lineStructure) {
		return null;
	}
	if (!this.lineStructure.lastLineOfType) {
		return null;
	}
	if (typeof this.lineStructure.lastLineOfType[type] === "undefined") {
		return null;
	} else {
		return this.lineStructure.lastLineOfType[type];
	}
}


HumdrumBase.prototype.getLastInterpretation = function () { return this.getLastLineOfType("Interpretation") };
HumdrumBase.prototype.getLastBarline = function () { return this.getLastLineOfType("Barline") };
HumdrumBase.prototype.getLastDataline = function () { return this.getLastLineOfType("Data") };



//////////////////////////////
//
// HumdrumBase::getLineTypes -- return a list of all line types
//    present in the file.
//

HumdrumBase.prototype.getLineTypes = function (type) {
	if (!this.lineStructure) {
		return [];
	}
	if (!this.lineStructure.firstLineOfType) {
		return [];
	}
	return Object.keys(this.lineStructure.firstLineOfType);
}



