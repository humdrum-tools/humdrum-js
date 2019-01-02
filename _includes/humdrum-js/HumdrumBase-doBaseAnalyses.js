///////////////////////////////
//
// HumdrumBase::doBaseAnalyses -- Do all of the analyses that
//   are typically done on HumdrumBase after data has been
//   loaded into the object.
//

HumdrumBase.prototype.doBaseAnalyses = function () {
	this.analyzeLineSequence();
	this.analyzeRefRecords();
	return this;
};



