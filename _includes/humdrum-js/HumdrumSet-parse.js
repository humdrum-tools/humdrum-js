//////////////////////////////
//
// HumdrumSet::parse -- Clear the previous contents (if any) of the object,
//   and then run parseAppend to add Humdrum files to the Set.
//

HumdrumSet.prototype.parse = function (text, opts) {
	this.clear();
	this.parseAppend(text, opts);
	return this;
};



