//////////////////////////////
//
// HumdrumLine::parse -- Split line into token fields.
//

HumdrumLine.prototype.parse = function (linetext) {
	this.clear();
	if ((typeof linetext !== "string") && !(linetext instanceof String)) {
		console.log("Error: Can only parse text, but given", typeof linetext, "for data", linetext);
		return this;
	}
	var lines = linetext.match(/[^\r\n]+/g);
	if (lines.length > 1) {
		console.log("Warning: input to HumdrumLine parsing has", lines.length, "lines.");
		console.log("Contents of line:", linetext);
		console.log("Only going to parse first line:", lines[0]);
	}
	this.text = lines[0];
	this.fields = [];
	this.lineStructure = {};
	var token;
	if (this.text.match(/^!!/)) {
		// global comment, reference record, universal record/comment, etc., with no tokens.
		token = new HumdrumToken(this.text, 0);
		token.owner = this;
		this.fields.push(token);
		this.lineStructure.spineQ = false;
		if (this.text.match(/^!!![^!:][^:]*:/)) {
			this.lineStructure.lineType = "RefRecord";
		} else if (this.text.match(/^!!!![^!:][^:]*:/)) {
			this.lineStructure.lineType = "UniversalRefRecord";
		} else {
			this.lineStructure.lineType = "GlobalComment";
		}
	} else if (this.text === "") {
		// empty line
		token = new HumdrumToken(this.text);
		token.owner = this;
		this.fields.push(token);
		this.lineStructure.spineQ = false;
		this.lineStructure.lineType  = "Empty";
	} else {
		this.lineStructure.spineQ = true;
		if (this.text.match(/^\*/)) {
			this.lineStructure.lineType = "Interpretation";
		} else if (this.text.match(/^\!/)) {
			this.lineStructure.lineType = "LocalComment";
		} else if (this.text.match(/^\=/)) {
			this.lineStructure.lineType = "Barline";
		} else {
			this.lineStructure.lineType = "Data";
		}
		var tokenstring = "";
		var tabcount = 0;
		var char;
		for (var i=0; i<this.text.length; i++) {
			char = this.text.charAt(i);
			if (tabcount) {
				if (char === "\t") {
					tabcount++;
				} else {
					token = new HumdrumToken(tokenstring);
					token.owner = this;
					token.tabCount = tabcount;
               this.fields.push(token);
					tokenstring = char;
					tabcount = 0;
				}
			} else {
				if (char === "\t") {
					tabcount++;
				} else {
					tokenstring += char;
				}
			}
		}
		token = new HumdrumToken(tokenstring);
		token.owner = this;
		token.tabCount = tabcount;
		this.fields.push(token);
	}
	return this;
};



