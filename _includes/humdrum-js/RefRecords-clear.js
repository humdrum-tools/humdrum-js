//////////////////////////////
//
// RefRecords::clear -- Initialize the object.
//

RefRecords.prototype.clear = function () {
	if (this.sequence && Array.isArray(this.sequence)) {
		for (var i=0; i<this.sequence.length; i++) {
			this.sequence[i].clear();
		}
	}
	this.sequence = [];   // The order that the Humdrum records are found in the file.
	this.database = {};   // Hash of the records by RefRecordEntry::keyBase.
	this.owner    = null; // The HumdrumBase structure that this object is contained in.
	return this;
};



