//////////////////////////////
//
// RefRecords::initializer -- Create a RefRecords object.
//

function RefRecords(humdrumfile) {
	this.clear();
	this.parse(humdrumfile);
	return this;
}



