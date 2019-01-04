//////////////////////////////
//
// HumdrumBase::hasLinesOfType -- returns true if has a line of the 
//    given type present in the file.
//

HumdrumBase.prototype.hasLinesOfType = function (type) {
	if (!this.lineStructure) {
		return null;
	}
	if (!this.lineStructure.firstLineOfType) {
		return null;
	}
	if (this.lineStructure.firstLineOfType[type]) {
		return true;
	} else {
		return false;
	}
}



//////////////////////////////
//
// HumdrumBase::hasBarlines -- Returns true if there are barlines in the data.
//

HumdrumBase.prototype.hasBarlines = function () {
	return this.hasLinesOfType("Barline");
}



//////////////////////////////
//
// HumdrumBase::hasMeasures -- Returns true if there are barlines in the data.
//

HumdrumBase.prototype.hasMeasures = HumdrumBase.prototype.hasBarlines;



//////////////////////////////
//
// HumdrumBase::hasEmptyLines-- Returns true if there are empty lines in the data.
//

HumdrumBase.prototype.hasEmptyLines = function () {
	return this.hasLinesOfType("Empty");
}



//////////////////////////////
//
// HumdrumBase::hasRefRecords-- Returns true if there are reference records in the data.
//

HumdrumBase.prototype.hasRefRecords = function () {
	return this.hasLinesOfType("RefRecord");
}



