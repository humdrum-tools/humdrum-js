//////////////////////////////
//
// RefRecords::getRefFirst -- Get the first reference record
//    which matches the given key.  This function will ignore qualifiers,
//    counts or variants on the key (KEY2 will map to KEY, KEY@@LANG will map
//    to KEY, KEY-variant will map to KEY).
//

RefRecords.prototype.getRefFirst = function (keyBase) {
	// return the first keyBase record
	var items  = this.database[keyBase];
	if (!items) {
		return "";
	} else if (items.length > 0) {
		return items[0];
	} else {
		return "";
	}
};



