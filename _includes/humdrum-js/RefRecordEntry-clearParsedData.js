//////////////////////////////
//
// RefRecordEntry::clearParsedData -- Clear all parsed data.  This is
//   useful if you want to preserve the original line, the owner, and the
//   text fields, but want to reparse the text field which will update these
//   fields.
//

RefRecordEntry.prototype.clearParsedData = function () {
	this.key          = null;
	this.keyBase      = null;
	this.keyAt        = null;
	this.langCode     = null;
	this.keyExinterp  = null;
	this.keyVariant   = null;
	this.keyCounter   = null;
	this.value        = null;

	// remove extended parameters (see RefRecord-extended.js)
	if (typeof this.description != "undefined") {
		delete this.description;
	}
	if (typeof this.status != "undefined") {
		delete this.status;
	}

	return this;
};



