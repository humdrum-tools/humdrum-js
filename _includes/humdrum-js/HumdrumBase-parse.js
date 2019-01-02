//////////////////////////////
//
// HumdrumBase::parse -- Split input text into lines and tokens.  The input can be:
//   (1) The textual content of a Humdrum data file.
//   (2) An HTML element on the webpage that has Humdrum data content inside of it.
//   (3) An ID reference to an HTML element on the webpage that has Humdrum data 
//       content inside of it.  For example, givan an input of "#data" if there is an
//       element on the page with an ID of "data".  Technically this is an element selector,
//       and you can use any selector, provided that it starts with an ID reference (#).
//       If you do not want to start the selector with "#", then use HumdrumBase::ParseSelector()
//       directly.
//   (4) The URL to some Humdrum data.  When the data has been loaded HumdrumBase.onload()
//       will be called.
//
//   Various URIs for downloding Humdrum data from online content providers:
// 
//   (5) A Humdrum URI, which is a URI starting with "h://", "hum://", or "humdrum://" and 
//       then a file location/name that will map to a URL on kernScores.
//   (6) A Github URI, which is a URI starting with "g://" or "github://" and 
//       then an account/repo/path/file will map to a URL on Github.
//   (7) A Josquin Research Project URI, which is a URI starting with "j://" or "jrp://" and 
//       then an JRP ID for a work that will map to a URL on kernScores.
//
// Second parameter is an optional set of parsing options.   Known options:
//
//      opts.basicParse == only do basic parsing of Humdrum data; otherwise, do a full parse and anaysis.
//      opts.analyzeRefRecords == turn on/off automatic ref record analysis.
//

HumdrumBase.prototype.parse = function (text, opts) {
	if (typeof this.parseCounter === "undefined") {
		this.parseCounter = 0;
	}
	this.parseCounter++;
	if (this.parseCounter > 10) {
		// Some infinite loop is starting (URL that contains text to a URL for example).
		return this;
	}
	this.clear();
	if (this.IsElement(text)) {
		this.ParseElement(text, opts);
	} else if ((typeof text === "string") || text instanceof String) {
		text = text.replace(/^\s+/m, "");   // remove any leading spaces or newlines
		if (text.match(/^https?:\/\//)) {
			this.ParseUrl(text, opts);
		} else if (text.match(/^(h|hum|humdrum):\/\//)) {
			this.ParseUriHumdrum(text, opts);
		} else if (text.match(/^(g|gh|github):\/\//)) {
			this.ParseUriGithub(text, opts);
		} else if (text.match(/^(j|jrp):\/\//)) {
			this.ParseUriJrp(text, opts);
		} else if (text.match(/^#/)) {
			this.ParseSelector(text, opts);
		} else if (text.match(/^[\r\n]*!/)) {
			this.ParseText(text, opts);
		} else if (text.match(/^[\r\n]*\*/)) {
			this.ParseText(text, opts);
		} else {
			this.ParseUrl(text, opts);  // assumed to be a relative URL address
		}
	} else {
		console.log("Error: input to HumdrumBase::parse is unknown:", typeof text, "for data:", text);
	}
	return this;
};



