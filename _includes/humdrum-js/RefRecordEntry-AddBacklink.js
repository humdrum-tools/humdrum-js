//////////////////////////////
//
// RefRecordEntry::AddBacklink -- Add a reference to this object in the originating HumdrumLine.
//

RefRecordEntry.prototype.AddBackLink = function () {
	if (this.owner) {
		this.owner.ref = this;
	}
};



