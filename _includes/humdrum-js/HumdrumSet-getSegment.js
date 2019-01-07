//////////////////////////////
//
// HumdrumSet::getSegment -- Get a segment by integer index or by name.
//

HumdrumSet.prototype.getSegment = function (index) {
	if (Number.isInteger(index)) {
		if (index < 0) {
			return null;
		} if (index <= this.segments.length) {
			return this.segments[index];
		} else {
			return null;
		}
	} else if (typeof index === "string" || index instanceof String) {
		var matches = index.match(/^\d+$/);
		if (matches) {
			return this.getSegment(parseInt(index));
		} else {
			// a named segment
			return this.nameToSegment[index];
		}
	} else {
		return null;
	}
};



