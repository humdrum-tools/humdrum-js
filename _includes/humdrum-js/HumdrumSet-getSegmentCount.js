//////////////////////////////
//
// HumdrumSet::getSegmentCount -- Return the number of Humdrum segments
//      in the HumdrumSet segment array.
//

HumdrumSet.prototype.getSegmentCount = function () {
	if (this.segments && Array.isArray(this.segments)) {
		return this.segments.length;
	} else {
		return null;
	}
};



