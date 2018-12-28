//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/HumdrumLine.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains the HumdrumLine class for 
// the Humdrum JS library.
//
//
// Functions defined in this file:
//
// * HumdrumLine::clear() -- Clear contents of object.
// * HumdrumLine::parse() -- Parse an input string.
// * HumdrumToken::stringify() -- Convert object to plain text.
//
//
// Properties of HumdrumLine object:
//
// * this.text      = text string of line.
// * this.fields    = data fields of line (tokens or global/reference records).
// * this.nextLine  = pointer to the next line in the file.
// * this.prevLine  = pointer to the previous line in the file.
// * this.hasSpines = true if the line has token data. Based on line type:
//       * RefRecord                = false
//       * UniversalRefRecord       = false
//       * UniversalComment         = false
//       * GlobalComment            = false
//       * Interpretation           = true
//       * LocalComment             = true
//       * Barline                  = true
//       * Empty                    = false
//       * Data                     = true
// * this.lineType = the type of line:
//       * RefRecord                = in the form "^!!!KEY: VALUE"
//       * UniversalRefRecord       = in the form "^!!!!KEY: VALUE"
//       * UniversalComment         = in the form "^!!!!.*"
//       * GlobalComment            = in the form "^!!![^!]?.*
//       * Interpretation           = line starts with *
//       * LocalComment             = line starts with single !
//       * Barline                  = line starts with "="
//       * Empty                    = no text on line
//       * Data                     = anything else
// * this.owner = The Humdrum file object that the HumdrumLine object is contained in.
//


//////////////////////////////
//
// HumdrumLine::initializer -- Create a HumdrumLine object.
//

function HumdrumLine(text) {
	if (typeof text === "string" || text instanceof String) {
		this.parse(text);
	} else {
		this.clear();
	}
	return this;
}



//////////////////////////////
//
// HumdrumLine::clear --
//

HumdrumLine.prototype.clear = function () {
	this.text      = "";
	this.fields    = [];
	this.nextLine  = null;
	this.prevLine  = null;
	this.hasSpines = null;
	this.lineType  = null;
	this.owner     = null;
};



//////////////////////////////
//
// HumdrumLine::parse -- Split line into token fields.
//

HumdrumLine.prototype.parse = function (linetext) {
	this.clear();
	if ((typeof linetext !== "string") && !(linetext instanceof String)) {
		console.log("Error: Can only parse text, but given", typeof linetext, "for data", linetext);
		return;
	}
	var lines = linetext.match(/[^\r\n]+/g);
	if (lines.length > 1) {
		console.log("Warning: input to HumdrumLine parsing has", lines.length, "lines.");
		console.log("Contents of line:", linetext);
		console.log("Only going to parse first line:", lines[0]);
	}
	this.text = lines[0];
	this.fields = [];
	var token;
	if (this.text.match(/^!!/)) {
		// global comment, reference record, universal record/comment, etc., with no tokens.
		token = new HumdrumToken(this.text, 0);
		token.owner = this;
		this.fields.push(token);
		this.hasSpines = false;
		if (this.text.match(/^!!![^!:][^:]*:/)) {
			this.lineType = "RefRecord";
		} else if (this.text.match(/^!!!![^!:][^:]*:/)) {
			this.lineType = "UniversalRefRecord";
		} else if (this.text.match(/^!!!!/)) {
			this.lineType = "UniversalComment";
		} else {
			this.lineType = "GlobalComment";
		}
	} else if (this.text === "") {
		// empty line
		token = new HumdrumToken(this.text);
		token.owner = this;
		this.fields.push(token);
		this.hasSpines = false;
		this.lineType  = "Empty";
	} else {
		this.hasSpines = true;
		if (this.text.match(/^\*/)) {
			this.lineType = "Interpretation";
		} else if (this.text.match(/^\!/)) {
			this.lineType = "LocalComment";
		} else if (this.text.match(/^\=/)) {
			this.lineType = "Barline";
		} else {
			this.lineType = "Data";
		}
		var tokenstring = "";
		var tabcount = 0;
		var char;
		for (var i=0; i<this.text.length; i++) {
			char = this.text.charAt(i);
			if (tabcount) {
				if (char === "\t") {
					tabcount++;
				} else {
					token = new HumdrumToken(tokenstring);
					token.owner = this;
					token.tabCount = tabcount;
               this.fields.push(token);
					tokenstring = char;
					tabcount = 0;
				}
			} else {
				if (char === "\t") {
					tabcount++;
				} else {
					tokenstring += char;
				}
			}
		}
		token = new HumdrumToken(tokenstring);
		token.owner = this;
		token.tabCount = tabcount;
		this.fields.push(token);
	}
	return this;
};



//////////////////////////////
//
// HumdrumLine::stringify -- Convert object to plain text.
//

HumdrumLine.prototype.stringify = function () {
	var output = "";
	var tc;
	if (!this.fields) {
		return output;
	}
	for (var i=0; i<this.fields.length; i++) {
		output += this.fields[i].stringify();
		if (i < this.fields.length - 1) {
			tc = this.fields[i].tabCount;
			tc = tc ? tc : 1;
			for (var j=0; j<tc; j++) {
				output += "\t";
			}
		}
	}
	output += "\n";
	return output;
};



