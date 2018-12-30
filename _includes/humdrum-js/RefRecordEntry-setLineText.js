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



