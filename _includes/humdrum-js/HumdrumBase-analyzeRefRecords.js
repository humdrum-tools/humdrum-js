///////////////////////////////
//
// HumdrumBase::analyzeRefRecords -- Generate Reference-records,
//   the results of which is stored in this.refs.
//

HumdrumBase.prototype.analyzeRefRecords = function () {
	this.refs = new RefRecords(this);
	return this;
};



