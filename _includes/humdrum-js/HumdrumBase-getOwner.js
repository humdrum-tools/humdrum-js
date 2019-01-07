//////////////////////////////
//
// HumdrumBase::getOwner -- Get HumdrumSet owner of this object.
//

HumdrumBase.prototype.getOwner = function () {
	if (!this.owner) {
		return null;
	} else if (this.owner instanceof HumdrumSet) {
		return this.owner;
	} else {
		return null;
	}
};



