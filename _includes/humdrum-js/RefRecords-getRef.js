//////////////////////////////
//
// RefRecords::getRef -- Get the first reference record
//    which matches the given key.  This function will ignore qualifiers,
//    counts or variants on the key (KEY2 will map to KEY, KEY@@LANG will map
//    to KEY, KEY-variant will map to KEY).  Returns null if there is no
//    reference record related to the given key.
//

RefRecords.prototype.getRef = function (keyBase) {
	// return the first keyBase record
	var items  = this.database[keyBase];
	if (!items) {
		return null
	} else if (items.length > 0) {
		return items[0];
	} else {
		return null;
	}
};



//////////////////////////////
//
// RefRecords::getRefValue -- Get the value of the first reference record
//    in the data that matches the given key.  This function will ignore 
//    qualifiers, counts or variants on the key (KEY2 will map to KEY,
//    KEY@@LANG will map to KEY, KEY-variant will map to KEY).  Returns
//    an empty string if there is no reference record related to the given key.
//

RefRecords.prototype.getRefValue = function (keyBase) {
	var entry = this.getRef(keyBase);
	return entry ? entry.getValue() : "";
}



