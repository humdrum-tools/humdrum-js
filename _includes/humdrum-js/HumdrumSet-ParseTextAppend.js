//////////////////////////////
//
// HumdrumSet::ParseTextAppend -- This function takes a string containing a Humdrum data file
//   and then it chops it up into lines, which will then be chopped up into tokens.
//   This function should not be called directly; use HumdrumSet::parseAppend instead.
//

HumdrumSet.prototype.ParseTextAppend = function (text, options) {
	if (!text) {
		console.log("Error: no content to parse");
		return this;
	}
	if (typeof this.parseCounter !== "undefined") {
		// finally got here (but probably always fast)
		delete this.parseCounter;
	}
	if ((typeof text !== "string") && !(text instanceof String)) {
		console.log("Error: input to HumdrumSet::ParseTextAppend is not text but rather", typeof text, "for data:", text);
		return this;
	}
	var hlines = text.match(/[^\r\n]+/g);
	if (!hlines.length) {
		console.log("Error: input to HumdrumSet::ParseTextAppend is empty");
		return this;
	}

	var i;
	var segmentline = false;
	var segmentname = "";
	var matches;
	var exinterpcount = 0;
	var inlines = [];
	var infile;
	for (i=0; i<hlines.length; i++) {
		matches = hlines[i].match(/^!!!!SEGMENT\s*:\s*(.*)\s*$/);
		if (matches) {
			if (exinterpcount > 0) {
				// new segment to process
				infile = new Humdrum();
				infile.ParseText(inlines, options);
				this.segments.push(infile);
				inlines = [];
				exinterpcount = 0;
console.log("SEGMENTNAME", segmentname);
				if (segmentname) {
					// infile.setSegmentName(segmentname);
console.log("        STORING SEGMENT " , segmentname);
               this.nameToSegment[segmentname] = infile;
				}
				segmentname = "";
			}
			segmentline = true;
			segmentname = matches[1];
			inlines.push(hlines[i]);
			continue;
		}
		if (hlines[i].match(/^\*\*/)) {
			exinterpcount++;
			if (exinterpcount == 2) {
				// a new segment encountered without a segment marker
				// preceding it. Force a new automatic segment.  In the future
				// this will be treated as a partwise encoded part and 
				// merged with other segments between a !!!!SEGMENT: marker.
				infile = new Humdrum();
				infile.ParseText(inlines, options);
				this.segments.push(infile);
				inlines = [];
				exinterpcount = 0;
				segmentname = "";
				segmentline = false;
			}
		}
		inlines.push(hlines[i]);
	}

	// Need to store the last segment
	// maybe also check if exinterpcount is 1 and not 0 (which would
	// global comments and reference records only in the segment)?
	if (inlines.length > 0) {
		// new segment to process
		infile = new Humdrum();
		infile.ParseText(inlines, options);
		this.segments.push(infile);
		inlines = [];
		exinterpcount = 0;
		if (segmentname) {
			// infile.setSegmentName(segmentname);
			this.nameToSegment[segmentname] = infile;
		}
		segmentname = "";
	}

	for (i=0; i<this.segments.length; i++) {
		if (this.segments[i]) {
			this.segments[i].setOwner(this);
		}
	}

	if (options && typeof options.onloadSet === "function") {
		options.onloadSet(this);
	} else if (typeof this.onload === "function") {
		this.onload(this);
	}

	return this;
};



