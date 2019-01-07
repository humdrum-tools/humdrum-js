//////////////////////////////
//
// HumdrumSet::ParseUriHumdrumAppend -- Load Humdrum data from a Humdrum URI that maps to kernScores.
//   Example URI:
//      h://folk/sioux/sioux002.krn
//   maps to the URL:
//      http://kern.humdrum.org/data?s=folk/sioux/sioux002.krn
//   This function should not be called directly; use HumdrumSet::parseAppend instead.
//

HumdrumSet.prototype.ParseUriHumdrumAppend = function (uri, options) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}

	var url = HumdrumBase.prototype.MakeUrlHumdrum(uri);
	if (url) {
		this.parseAppend(url, options);
	} else {
		console.log("Error: input string is not a Humdrum URI:", uri);
	}
	return this;
};



