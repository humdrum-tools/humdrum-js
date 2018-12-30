//////////////////////////////
//
// RefRecords::getRefs -- Return all reference records that match 
//    their (base) key to the input array or hash of keys.
//

RefRecords.prototype.getRefs = function (obj) {
	var hash = obj;
	var i;
	if (Array.isArray(obj)) {
		hash = {};
		for (i=0; i<obj.length; i++) {
			hash[obj[i]] = true;
		}
	}
	var output = [];
	for (i=0; i<this.sequence.length; i++) {
		if (hash[this.sequence[i].keyBase]) {
			output.push(this.sequence[i]);
		}
	}
	return output;
};



