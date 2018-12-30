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



