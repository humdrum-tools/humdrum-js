//////////////////////////////
//
// HumdrumBase::ParseUriGithub -- Load Humdrum data from a Gihub URI.
//   Example URI:
//      g://craigsapp/densmore-teton-sioux/kern/sioux002.krn
//   maps to the URL:
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/master/kern/sioux002.krn
//   Downloading from commit has "d5d5"
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/d5d5/kern/sioux002.krn
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseUriGithub = function (uri, options) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}
	var matches = uri.match(/^(g|github):\/\/([^\/]+)\/([^\/]+)\/(.*)\s*$/);
	if (matches) {
		var account = matches[2];
		var repo    = matches[3];
		var file    = matches[4];
		var variant;
		if (options && options.commitHash && (typeof options.commitHash === "string" || text instanceof String)) {
			variant = options.commitHash;
		} else {
			variant = "master";
		}
		var url = "https://raw.githubusercontent.com/" + account + "/" + repo + "/" + variant + "/" + file;
		this.parse(url, options);
	} else {
		console.log("Error: input string is not a Github URI:", uri);
	}
	return this;
};



