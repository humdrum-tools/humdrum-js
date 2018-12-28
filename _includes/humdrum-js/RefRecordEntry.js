//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/RefRecordEntry.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
//	This file contains the RefRecordEntry class for
// the Humdrum JS library.  This class is used by
// the RefRecords class to store a particular
// reference record.
//
//
// List of prototype functions:
//
// * RefRecordEntry::clear()           = Clear previous contents.
// * RefRecordEntry::clearParsedData() = Clear only parsed data.
// * RefRecordEntry::setLineIndex()    = Store the original data line index.
// * RefRecordEntry::setLineText()     = Store the line text and parse it.
// * RefRecordEntry::addBacklink()     = Store a reference to this object in the originating HumdrumLine.
//
// Private prototype functions:
//
// * RefRecordEntry::ParseTextLine()   = Parse the text line.
//
//
// Properties for RefRecordEntry object:
//
// * this.lineIndex    = Line index: offset from 0 for first line in file.
// * this.text         = The raw text of the reference record line.
// * this.owner        = The HumdrumLine where the reference record entry came from.
// * this.key          = The complete reference key.
// * this.keyBase      = The reference key without langauge, count or exinterp qualifiers.
// * this.keyAt        = The language qualification, including the @ signs.
// * this.langCode     = The langauge qualification, without the @ prefix.
// * this.keyExinterp  = The exclusive interpretation, including two * marks.
// * this.keyVariant   = The variant qualification (to be designed).
// * this.keyCount     = A Number following a keyBase, before keyAt or keyQual.
//


//////////////////////////////
//
// RefRecordEntry::initializer -- Create a RefRecordEntry object.
//

function RefRecordEntry(linetext, lineindex) {
	this.clear();
	this.setLineIndex(lineindex);
	this.setLineText(linetext);
	return this;
}



//////////////////////////////
//
// RefRecordEntry::clear -- Set the object to an unintialized state.
//

RefRecordEntry.prototype.clear = function () {
	this.lineIndex    = -1;   // line index: offset from 0 for first line in file.
	this.text         = "";   // the raw text of the reference record line.
	if (owner) {
		if (owner.ref) {
			delete owner.ref;
		}
	}
	this.owner        = null; // the HumdrumLine where the reference record entry came from.
	this.clearParsedData();
	return this;
};



//////////////////////////////
//
// RefRecordEntry::clearParsedData -- Clear all parsed data.  This is
//   useful if you want to preserve the original line, the owner, and the
//   text fields, but want to reparse the text field which will update these
//   fields.
//

RefRecordEntry.prototype.clearParsedData = function () {
	this.key          = null;
	this.keyBase      = null;
	this.keyAt        = null;
	this.langCode     = null;
	this.keyExinterp  = null;
	this.keyVariant   = null;
	this.keyCounter   = null;
	this.value        = null;

	// remove extended parameters (see RefRecord-extended.js)
	if (typeof this.description != "undefined") {
		delete this.description;
	}
	if (typeof this.status != "undefined") {
		delete this.status;
	}

	return this;
};



//////////////////////////////
//
// RefRecordEntry::setLineIndex -- This is the line index number in
//   the original file that the reference record comes from.  This is useful
//   if you want to change the value of the reference record on that line.
//   You can also use the this.owner which points to the original HumdrumLine
//   when the input data for this.parseTextLine is a HumdrumLine rather than text.
//

RefRecordEntry.prototype.setLineIndex = function (lineindex) {
	try {
		this.lineIndex = parseInt(lineindex);
	} catch (error) {
		this.lineIndex = -1;
	}
	return this;
};



//////////////////////////////
//
// RefRecordEntry::setLineText -- Store the line of text in this.text,
//    and then parse the text to extract the key and value information.
//

RefRecordEntry.prototype.setLineText = function (linetext) {
	if (typeof linetext === "string" || linetext instanceof String) {
		this.text = linetext;
		this.parseTextLine();
	} else if (linetext instanceof HumdrumLine) {
		this.text = linetext.text;
		this.owner = linetext;
		this.parseTextLine();
	} else {
		console.log("Warning: unknown type of input:", typeof linetext, "for data", linetext);
		this.clear();
	}
	return this;
};



//////////////////////////////
//
// RefRecordEntry::ParseTextLine -- Extract the key and value from the
//     reference record line stored in this.text.  The general user of this
//     class should not need to call this function (it is called automatically
//     by the setLineText function.
//
// Variables resulting from parsing (will be null if not used):
//    this.key          = The complete reference key.
//    this.keyBase      = The reference key without langauge, count or variant qualifiers.
//    this.keyAt        = The language qualification, including the @ signs.
//    this.langCode     = The language qualification without the @ signs.
//    this.keyExinterp  = The exclusive interpretation, including two * marks.
//    this.keyVariant   = The variant qualification (to be designed).
//    this.keyCount     = A Number following a keyBase, before keyAt or keyQual.
//

RefRecordEntry.prototype.parseTextLine = function () {
	this.clearParsedData();

	// Extract the key and value:
	var matches = this.text.match(/^!!!([^!:][^:]*)\s*:\s*(.*)\s*$/);
	if (matches) {
		this.keyBase = matches[1];
		this.key     = matches[1];
		this.value   = matches[2];
	}

	// Check if there are any @ markers for langauge codes:
	matches = this.keyBase.match(/^([^@]+)(@+.*)$/);
	if (matches) {
		this.keyBase = matches[1];
		this.keyAt = matches[2];
		this.langCode = this.keyAt.replace(/^@+/, "");
	}

	// Check if there are any ** markers for exclusive interpretatiosn (RDF only):
	matches = this.keyBase.match(/^([^@]+)(\*\*[^*]+)$/);
	if (matches) {
		this.keyBase = matches[1];
		this.keyExinterp = matches[2];
	}

	// Check if there are any number qualifications:
	matches = this.keyBase.match(/^(.*)(\d+)$/);
	if (matches) {
		this.keyBase = matches[1];
		this.keyCounter = parseInt(matches[2], 10);
	}

	return this;
};



//////////////////////////////
//
// RefRecordEntry::addBacklink -- Add a reference to this object in the originating HumdrumLine.
//

RefRecordEntry.prototype.addBackLine = function () {
	if (owner) {
		owner.ref = this;
	}
}



