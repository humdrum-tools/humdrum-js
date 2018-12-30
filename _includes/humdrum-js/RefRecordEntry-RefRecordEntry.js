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



