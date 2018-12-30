//////////////////////////////
//
// RefRecords::getRefFirstExact -- Return the first key in the
//   file sequence that matches the input argument exactly.  This compares
//   to this.key.
//

RefRecords.prototype.getRefFirstExact = function (key) {
	// return first matching key record
	var list = this.getRefAll(key)
	for (var i=0; i<list.length; i++) {
		if (list[i].key === key) {
			return list[i];
		}
	}
	return "";
};



