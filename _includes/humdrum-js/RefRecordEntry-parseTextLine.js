//////////////////////////////
//
// RefRecordEntry::ParseTextLine -- Extract the key and value from the
//     reference record line stored in this.text.  The general user of this
//     class should not need to call this function (it is called automatically
//     by the setLineText function.
//
// Variables resulting from parsing (will be null if not used):
//    this.key          = The complete reference key.
//    this.keyBase      = The reference key without langauge, count or variant qualifiers.
//    this.keyAt        = The language qualification, including the @ signs.
//    this.langCode     = The language qualification without the @ signs.
//    this.keyExinterp  = The exclusive interpretation, including two * marks.
//    this.keyVariant   = The variant qualification (to be designed).
//    this.keyCount     = A Number following a keyBase, before keyAt or keyQual.
//

RefRecordEntry.prototype.parseTextLine = function () {
	this.clearParsedData();

	// Extract the key and value:
	var matches = this.text.match(/^!!!([^!:][^:]*)\s*:\s*(.*)\s*$/);
	if (matches) {
		this.keyBase = matches[1];
		this.key     = matches[1];
		this.value   = matches[2];
	}

	// Check if there are any @ markers for langauge codes:
	matches = this.keyBase.match(/^([^@]+)(@+.*)$/);
	if (matches) {
		this.keyBase = matches[1];
		this.keyAt = matches[2];
		this.langCode = this.keyAt.replace(/^@+/, "");
	}

	// Check if there are any ** markers for exclusive interpretatiosn (RDF only):
	matches = this.keyBase.match(/^([^@]+)(\*\*[^*]+)$/);
	if (matches) {
		this.keyBase = matches[1];
		this.keyExinterp = matches[2];
	}

	// Check if there are any number qualifications:
	matches = this.keyBase.match(/^(.*)(\d+)$/);
	if (matches) {
		this.keyBase = matches[1];
		this.keyCounter = parseInt(matches[2], 10);
	}

	return this;
};



