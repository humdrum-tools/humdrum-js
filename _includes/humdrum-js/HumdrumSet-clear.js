//////////////////////////////
//
// HumdrumSet::clear -- Clear contents of HumdrumSet object.
//

HumdrumSet.prototype.clear = function () {
	this.segments = [];  // remove Humdrum files from object.
	this.nameToSegment = {};
};



