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
// HumdrumLine::getNextLine -- Return the .nextLine property of the object, or a null
//     if .nextLine does not exist, is invalid or is null.  The return value
//     is the next HumdrumLine object in the HumdrumBase object that owns the line.
//

HumdrumLine.prototype.getNextLine = function () {
	if (this.nextLine && this.nextLine instanceof HumdrumLine) {
		return this.nextLine;
	} else {
		return null;
	}
};



//////////////////////////////
//
// HumdrumLine::getPrevLine -- Return the .prevLine property of the object, or a null
//     if .prevLine does not exist, is invalid or is null.  The return value
//     is the previous HumdrumLine object in the HumdrumBase object that owns the line.
//

HumdrumLine.prototype.getPrevLine = function () {
	if (this.prevLine && this.prevLine instanceof HumdrumLine) {
		return this.prevLine;
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
	return this.spineQ ? true : false;
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
	if (typeof this.lineIndex === "number") {
		return this.lineIndex;
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



