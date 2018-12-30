//////////////////////////////
//
// RefRecords::getRefAllExact -- Return all reference records
//   which match the input argument exactly (key base plus any qualifiers).
//   This compares to this.key.
//

RefRecords.prototype.getRefAllExact = function (key) {
	// return all matching key record
	var list = this.getRefAll(key)
	var output = [];
	for (var i=0; i<list.length; i++) {
		if (list[i].key === key) {
			output.push(list[i]);
		}
	}
	return output;
};



