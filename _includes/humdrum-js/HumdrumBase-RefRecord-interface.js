///////////////////////////////////////////////////////////////////////////
//
// functions related to RefRecords object this.refs. See the 
// RefRecords.js file for descriptions of the functions.
//

HumdrumBase.prototype.getRef = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRef.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefValue = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefValue.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefAll = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefAll.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefFirstExact = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefFirstExact.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefAllExact = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefAllExact.apply(this.refs, arguments);
};

HumdrumBase.prototype.getAllRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getAllRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.getComposerRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getComposerRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.getOpusRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getOpusRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.expandAtTemplate = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.expandAtTemplate.apply(this.refs, arguments);
};


//
//////////////////////////////////////////////////////////////////////////



