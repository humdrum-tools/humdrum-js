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



