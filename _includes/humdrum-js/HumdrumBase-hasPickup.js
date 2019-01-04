//////////////////////////////
//
// HumdrumBase::hasPickup -- Returns true if there is a pickup
//     measure at the start of the data.  This is currently
//     only approximate: it checks for data before the first
//     barline (but it does not compare the duration of the
//     music before the barline and compare to the time 
//     signature, which will be needed to give the correct
//     answer.
//

HumdrumBase.prototype.hasPickup = function () {
	var firstbar = this.getFirstBarline();
	var firstdata = this.getFirstDataline();
	if (!(firstbar || firstdata)) {
		null;
	}
	if (firstbar.getLineIndex() > firstdata.getLineIndex()) {
		return true;
	} else {
		return false;
	}
};



