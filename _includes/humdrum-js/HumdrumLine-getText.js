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



