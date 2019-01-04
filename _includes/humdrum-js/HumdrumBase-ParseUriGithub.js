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

HumdrumBase.prototype.ParseUriGithub = function (uri, opts) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}
	var url = this.MakeUrlGithub(uri);
	if (url) {
		this.parse(url, opts);
	} else {
		console.log("Error: input string is not a Github URI:", uri);
	}
	return this;
};



///////////////////////////////
//
// HumdrumBase::MakeUrlGithub -- Convert Github URI into a URL.
//

HumdrumBase.prototype.MakeUrlGithub = function (uri, opts) {
	var url = "";
	var matches = uri.match(/^(g|gh|github):\/\/([^\/]+)\/([^\/]+)\/(.*)\s*$/);
	if (matches) {
		var account = matches[2];
		var repo    = matches[3];
		var file    = matches[4];
		var variant;
		if (opts && opts.commitHash && (typeof opts.commitHash === "string" || text instanceof String)) {
			variant = opts.commitHash;
		} else {
			variant = "master";
		}
		url = "https://raw.githubusercontent.com/" + account + "/" + repo + "/" + variant + "/" + file;
	}
	return url;
}



