//////////////////////////////
//
// HumdrumBase::clear -- Clear contents of HumdrumBase object.
//

HumdrumBase.prototype.clear = function () {
	this.lines = [];   // storage for each line record in Humdrum data
	this.refs  = null; // storage for reference records;
};



