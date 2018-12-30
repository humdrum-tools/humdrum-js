//////////////////////////////
//
// RefRecordEntry::clear -- Set the object to an unintialized state.
//

RefRecordEntry.prototype.clear = function () {
	this.lineIndex    = -1;   // line index: offset from 0 for first line in file.
	this.text         = "";   // the raw text of the reference record line.
	if (this.owner) {
		if (this.owner.ref) {
			delete this.owner.ref;
		}
	}
	this.owner        = null; // the HumdrumLine where the reference record entry came from.
	this.clearParsedData();
	return this;
};



