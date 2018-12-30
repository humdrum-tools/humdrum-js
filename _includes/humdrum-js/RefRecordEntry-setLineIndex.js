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



