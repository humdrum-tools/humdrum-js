//////////////////////////////
//
// HumdrumSet::ParseUriGithubAppend -- Load Humdrum data from a Gihub URI.
//   Example URI:
//      g://craigsapp/densmore-teton-sioux/kern/sioux002.krn
//   maps to the URL:
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/master/kern/sioux002.krn
//   Downloading from commit has "d5d5"
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/d5d5/kern/sioux002.krn
//   This function should not be called directly; use HumdrumSet::parseAppend instead.
//

HumdrumSet.prototype.ParseUriGithubAppend = function (uri, opts) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}
	var url = HumdrumBase.prototype.MakeUrlGithub(uri);
	if (url) {
		this.parseAppend(url, opts);
	} else {
		console.log("Error: input string is not a Github URI:", uri);
	}
	return this;
};



