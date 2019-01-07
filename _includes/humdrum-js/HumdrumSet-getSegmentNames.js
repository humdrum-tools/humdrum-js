//////////////////////////////
//
// HumdrumSet::getSegmentNames -- Return the unique names of Humdrum segments
//      in the HumdrumSet segment array.  If a Humdrum object in the set
//      does not have a segment name, then its name will not be included
//      in the list.  If there is more than one segment with the same name,
//      only one of the will be stored in the name lookup database, and there
//      will only be one unique name in the lookup database. (Search the 
//      this.segments array in the case of Humdrum objects with empty segment
//      names or duplicated segment names.)
//

HumdrumSet.prototype.getSegmentNames = function () {
	if (this.nameToSegment) {
		return Object.keys(this.nameToSegment);
	} else {
		return [];
	}
};



