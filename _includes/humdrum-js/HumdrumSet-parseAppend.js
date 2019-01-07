//////////////////////////////
//
// HumdrumSet::parseAppend -- Split input text into lines and tokens.  The input can be:
//   (1) The textual content of a Humdrum data file.
//   (2) An HTML element on the webpage that has Humdrum data content inside of it.
//   (3) An ID reference to an HTML element on the webpage that has Humdrum data 
//       content inside of it.  For example, givan an input of "#data" if there is an
//       element on the page with an ID of "data".  Technically this is an element selector,
//       and you can use any selector, provided that it starts with an ID reference (#).
//       If you do not want to start the selector with "#", then use HumdrumSet::ParseSelector()
//       directly.
//   (4) The URL to some Humdrum data.  When the data has been loaded HumdrumSet.onload()
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
// Second parameter is an optional set of parsing options that will be sent to the
// HumdrumSet.parse() function.
//

HumdrumSet.prototype.parseAppend = function (text, opts) {
	if (typeof this.parseCounter === "undefined") {
		this.parseCounter = 0;
	}
	this.parseCounter++;
	if (this.parseCounter > 10) {
		// Some infinite loop is starting (URL that contains text to a URL for example).
		return this;
	}
	this.clear();
	if (HumdrumBase.prototype.IsElement(text)) {
		this.ParseElementAppend(text, opts);
	} else if ((typeof text === "string") || text instanceof String) {
		text = text.replace(/^\s+/m, "");   // remove any leading spaces or newlines
		if (text.match(/^https?:\/\//)) {
			this.ParseUrlAppend(text, opts);
		} else if (text.match(/^(h|hum|humdrum):\/\//)) {
			this.ParseUriHumdrumAppend(text, opts);
		} else if (text.match(/^(g|gh|github):\/\//)) {
			this.ParseUriGithubAppend(text, opts);
		} else if (text.match(/^(j|jrp):\/\//)) {
			this.ParseUriJrpAppend(text, opts);
		} else if (text.match(/^#/)) {
			this.ParseSelectorAppend(text, opts);
		} else if (text.match(/^[\r\n]*!/)) {
			this.ParseTextAppend(text, opts);
		} else if (text.match(/^[\r\n]*\*/)) {
			this.ParseTextAppend(text, opts);
		} else {
			this.ParseUrlAppend(text, opts);  // assumed to be a relative URL address
		}
	} else {
		console.log("Error: input to HumdrumSet::parseAppend is unknown:", typeof text, "for data:", text);
	}
	return this;
};



