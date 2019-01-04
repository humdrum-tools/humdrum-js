//////////////////////////////
//
// HumdrumBase::ParseUriHumdrum -- Load Humdrum data from a Humdrum URI that maps to kernScores.
//   Example URI:
//      h://folk/sioux/sioux002.krn
//   maps to the URL:
//      http://kern.humdrum.org/data?s=folk/sioux/sioux002.krn
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseUriHumdrum = function (uri, options) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}

	var url = this.MakeUrlHumdrum(uri);
	if (url) {
		this.parse(url, options);
	} else {
		console.log("Error: input string is not a Humdrum URI:", uri);
	}
	return this;
};



///////////////////////////////
//
// HumdrumBase::MakeUrlHumdrum -- Convert a (kernScores) Humdrum URI into a URL.
//

HumdrumBase.prototype.MakeUrlHumdrum = function (uri, options) {
	var url = "";
	var matches = uri.match(/^(h|hum|humdrum):\/\/(.*)\s*$/);
	if (matches) {
		url = "http://kern.humdrum.org/data?s=" + matches[2];
	}
	return url;
}



