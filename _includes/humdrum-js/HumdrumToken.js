//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/HumdrumToken.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains the HumdrumToken class for 
// the Humdrum JS library.
//
//
// Functions defined in this file:
//
// * HumdrumLine::clear()      = Clear contents of object.
// * HumdrumToken::stringify() = Convert object to plain text.
//
//
// Properties of HumdrumToken object:
//
// * this.text      = The raw text of the token.
// * this.tabCount  = The number of tab characters after the tokoen in the parsed line.
// * this.subTokens = An array of subtokens in the token.
// * this.owner     = The HumdrumLine object that the HumdrumToken object is contained in.
//


//////////////////////////////
//
// HumdrumToken::initializer -- Create a HumdrumToken object.
//

function HumdrumToken(tokentext) {
	this.clear();
	if (typeof tokentext === "string" || tokentext instanceof String) {
		this.text = tokentext;
	}
	return this;
}



//////////////////////////////
//
// HumdrumToken::clear --
//

HumdrumToken.prototype.clear = function () {
	this.text     = null;   // full string of the token.
	this.tabCount = null;   // number of tabs following token when line was parsed.
	this.owner    = null;   // pointer to the HumdrumLine that contains this token.
	this.subTokens = [];    // split of token string into subtokens.
};



//////////////////////////////
//
// HumdrumToken::stringify -- Convert object to plain text.
//

HumdrumToken.prototype.stringify = function () {
	if (this.text && ((typeof this.text === "string") || this.text instanceof String)) {
		return this.text;
	} else {
		return ".";
	}
}



