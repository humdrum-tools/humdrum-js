//////////////////////////////
//
// HumdrumBase::getLines -- Return an array of HumdrumLines for the object.
//

HumdrumBase.prototype.getLines = function (index) {
	if (this.lines) {
		return this.lines;
	} else {
		return [];
	}
};



