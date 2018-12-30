//////////////////////////////
//
// RefRecords::getRefAll -- Get all reference records that match to key.
//

RefRecords.prototype.getRefAll = function (keyBase) {
	// if keyBase is empty, then return all records:
	if (!keyBase) {
		return this.sequence;
	}
	// return all keyBase records
	var items  = this.database[keyBase];
	return items ? items : [];
};



