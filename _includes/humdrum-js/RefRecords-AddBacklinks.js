//////////////////////////////
//
// RefRecords::AddBacklinks -- Store RefRecordEntries into the originating HumdrumLine if data was parsed as
//     a plain text string.
// 
//

RefRecords.prototype.AddBacklinks = function () {
	if (!this.sequence) {
		console.log("Warning: no sequence database for reference records");
		return this;
	}
	for (var i=0; i<this.sequence.length; i++) {
		this.sequence[i].AddBackLink();
	}
};



