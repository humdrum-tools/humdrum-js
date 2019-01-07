//////////////////////////////
//
// HumdrumBase::ParseText -- This function takes a string containing a Humdrum data file
//   and then it chops it up into lines, which will then be chopped up into tokens.
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseText = function (text, options) {
	if (!text) {
		console.log("Error: no content to parse");
		return this;
	}
	if (typeof this.parseCounter !== "undefined") {
		// finally got here (but probably always fast)
		delete this.parseCounter;
	}
	this.clear();
	if ((typeof text !== "string") && !(text instanceof String)) {
		if (Array.isArray(text) && (text.length > 0) && (typeof text[0] === "string" || text[0] instanceof String)) {
			// This is good: the input will be assigned to hlines
		} else {
			console.log("Error: input to HumdrumBase::ParseText is not text but rather", typeof text, "for data:", text);
			return this;
		}
	}
	this.lines = [];
	var hlines;
	if (Array.isArray(text)) {
		hlines = text;
	} else {
		hlines = text.match(/[^\r\n]+/g);
	}
	for (var i=0; i<hlines.length; i++) {
		var humline = new HumdrumLine(hlines[i]);
		humline.owner = this;
		this.lines.push(humline);
	}

	if (options) {
		if (options.analyzeLineSequence) {
			// expicitly requested
			this.analyzeLineSequence();
		} else if (!options.basicParse) {
			// implicitly requested
			this.analyzeLineSequence();
		}

		if (options.analyzeRefRecords) {
			// expicitly requested
			this.analyzeRefRecords();
		} else if (!options.basicParse) {
			// implicitly requested
			this.analyzeRefRecords();
		}
	} else {
		// implicitly requested
		this.doBaseAnalyses();
	}

	if (options && typeof options.onload === "function") {
		options.onload(this);
	} else if (typeof this.onload === "function") {
		this.onload(this);
	}

	return this;
};



