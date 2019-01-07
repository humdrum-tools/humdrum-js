//////////////////////////////
//
// HumdrumBase::setOwner -- Set the owner to a specific HumdrumSet.
//

HumdrumBase.prototype.setOwner = function (myowner) {
	if (!myowner) {
		this.owner = null;
	} else if (myowner instanceof HumdrumSet) {
		this.owner = myowner;
	} else {
		this.owner = null;
	}
};



