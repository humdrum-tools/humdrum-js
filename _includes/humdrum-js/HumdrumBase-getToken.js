//////////////////////////////
//
// HumdrumBase::getToken -- Return the specificed HumdrumToken on 
//     the specified HumdrumLine (0 indexed).
//

HumdrumBase.prototype.getToken = function (lineIndex, tokenIndex) {
	if (lineIndex < 0) {
		return null;
	}
	if (lineIndex >= this.getLineCount()) {
		return null;
	}
	var ht = this.lines[lineIndex];
	if (!ht) {
		return null;
	} else {
		return ht.getToken(tokenIndex);
	}
};



//////////////////////////////
//
// HumdrumBase::getTokenText -- Return text of requested token.
//     Returns and empty string if an invalid location is requested.
//

HumdrumBase.prototype.getTokenText = function (lineIndex, tokenIndex) {
	var ht = this.getToken(lineIndex, tokenIndex);
	if (ht) {
		ht.getText();
	} else {
		return "";
	}
}
