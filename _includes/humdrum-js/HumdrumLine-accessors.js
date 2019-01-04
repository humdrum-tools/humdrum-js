//////////////////////////////
//
// HumdrumLine::getText -- Return the .text property of the object, or an empty
//     string if .text does not exist or is null.
//

HumdrumLine.prototype.getText = function () {
	if (this.text && (typeof this.text === "string" || this.text instanceof String)) {
		return this.text;
	} else {
		return "";
	}
};



//////////////////////////////
//
// HumdrumLine::getOwner -- Return the .owner property of the object, or a null
//     if .owner does not exist, is invalid or is null.
//

HumdrumLine.prototype.getOwner = function () {
	if (this.owner && this.owner instanceof HumdrumBase) {
		return this.owner;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getNextLine -- Return the next line in the data after this one.
//     Returns null if there is no line after this one.
//

HumdrumLine.prototype.getNextLine = function () {
	if (this.lineStructure && this.lineStructure.nextLine && this.lineStructure.nextLine instanceof HumdrumLine) {
		return this.lineStructure.nextLine;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getNextLineOfSameType -- Returns the next line that has the same basic type
//     in the data as the line.  If there is no next line of the same time, then null is returned.
//

HumdrumLine.prototype.getNextLineOfSameType = function () {
	if (this.lineStructure && this.lineStructure.nextLineOfType && this.lineStructure.nextLineOfType instanceof HumdrumLine) {
		return this.lineStructure.nextLineOfType;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getPrevLine -- Return the previous line in the data before this one.
//     Returns null if there is no line before this one.
//

HumdrumLine.prototype.getPrevLine = function () {
	if (this.lineStructure && this.lineStructure.prevLine && this.lineStructure.prevLine instanceof HumdrumLine) {
		return this.lineStructure.prevLine;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getPrevLineOfSameType -- Returns the previous line that has the same basic type
//     in the data as the line.  If there is no previous line of the same time, then null is returned.
//

HumdrumLine.prototype.getPrevLineOfSameType = function () {
	if (this.lineStructure && this.lineStructure.prevLineOfType && this.lineStructure.prevLineOfType instanceof HumdrumLine) {
		return this.lineStructure.prevLineOfType;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::isSpined -- Returns true if the line is not a global comment,
//     and empty line, a reference record, or a universal reference record.
//

HumdrumLine.prototype.isSpined = function () {
	if (this.lineStructure) {
		return this.spineQ ? true : false;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getTokens -- Returns an array of HumdrumToken objects for line.
//     Returns an empty array if there are no tokens (in cases where the
//     HumdrumLine is uninitialized).  Non-spined lines will have one
//     HumdrumToken in the array which contains the entire line.
//

HumdrumLine.prototype.getTokens = function () {
	if (this.fields && Array.isArray(this.fields)) {
		return this.fields;
	} else {
		return [];
	}
};



//////////////////////////////
//
// HumdrumLine::getLineIndex -- Returns the line index in the Humdrum data.
//

HumdrumLine.prototype.getLineIndex = function () {
	if (this.lineStructure && typeof this.lineStructure.lineIndex === "number") {
		return this.lineStructure.lineIndex;
	} else {
		return -1;
	}
};



//////////////////////////////
//
// HumdrumLine::getLineNumber -- Returns the line index in the Humdrum data plus 1.
//

HumdrumLine.prototype.getLineNumber = function () {
	return this.getLineIndex() + 1;
};



//////////////////////////////
//
// HumdrumLine::getNextLine -- Returns the next line in the data, otherwise returns null.
//

HumdrumLine.prototype.getNextLine = function () {
	if (!this.lineStructure) {
		return null;
	}
	if (this.lineStructure.nextLine) {
		return this.lineStructure.nextLine;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getPrevLine -- Returns the previous line in the data, otherwise returns null.
//

HumdrumLine.prototype.getPrevLine = function () {
	if (!this.lineStructure) {
		return null;
	}
	if (this.lineStructure.prevLine) {
		return this.lineStructure.prevLine;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getNextLineOfSameType -- Returns the next line in the data
//     that has the same line type as this one, otherwise returns null.
//

HumdrumLine.prototype.getNextLineOfSameType = function () {
	if (!this.lineStructure) {
		return null;
	}
	if (this.lineStructure.nextLineOfType) {
		return this.lineStructure.nextLineOfType;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getPrevLineOfSameType -- Returns the previous line in the data
//     that has the same line type as this one, otherwise returns null.
//

HumdrumLine.prototype.getPrevLineOfSameType = function () {
	if (!this.lineStructure) {
		return null;
	}
	if (this.lineStructure.prevLineOfType) {
		return this.lineStructure.prevLineOfType;
	} else {
		return null;
	}
};



