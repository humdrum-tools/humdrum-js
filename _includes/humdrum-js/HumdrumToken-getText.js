//////////////////////////////
//
// HumdrumToken::getText -- Returns the string representation of the token.
//

HumdrumToken.prototype.getText = function () {
	if (this.text && (typeof this.text === "string" || this.text instanceof String)) {
		return this.text;
	} else {
		return "";
	}
};



