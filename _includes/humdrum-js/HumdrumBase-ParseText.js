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
	this.parseCounter = 0;  // finally got here (but probably always fast)
	this.clear();
	if ((typeof text !== "string") && !(text instanceof String)) {
		console.log("Error: input to HumdrumBase::ParseText is not text but rather", typeof text, "for data:", text);
		return this;
	}
	this.lines = [];
	var hlines = text.match(/[^\r\n]+/g);
	for (var i=0; i<hlines.length; i++) {
		var humline = new HumdrumLine(hlines[i]);
		humline.owner = this;
		this.lines.push(humline);
	}

	if (options) {
		if (options.analyzeRefRecords) {
			// expicitly requested
			this.analyzeRefRecords();
		} else if (!options.basicParse) {
			// implicitly requested
			this.analyzeRefRecords();
		}
	} else {
		// implicitly requested
		this.analyzeRefRecords();
	}

	return this;
};



