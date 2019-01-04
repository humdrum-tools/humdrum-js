//////////////////////////////
//
// HumdrumBase::ParseUriJrp -- Load Humdrum data from a Josquin Ressearch Project URI
//   that maps to the dataset for JRP.  The structure is: j[rp]://catalog-number
//   Example URI:
//      j://Jos2721
//   maps to the URL:
//      http://jrp.ccarh.org/cgi-bin/jrp?a=humdrum&f=Jos2721
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseUriJrp = function (uri, options) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}
	var url = this.MakeUrlJrp(uri);
	if (url) {
		this.parse(url, options);
	} else {
		console.log("Error: input string is not a JRP URI:", uri);
	}
	return this;
};



///////////////////////////////
//
// HumdrumBase::MakeUrlJrp -- Convert a (kernScores) JRP URI into a URL.
//

HumdrumBase.prototype.MakeUrlJrp = function (uri, options) {
	var url = "";
	var composerid;
	var jrpid;
	var filename;
	var composerid;
	var matches = uri.match(/^(j|jrp):\/\/([a-z]{3})(\d{4}[a-z]*)-?(.*)$\s*$/i);
	if (matches) {
		composerid = matches[2].toLowerCase();
		composerid = composerid.charAt(0).toUpperCase() + composerid.substr(1);
		jrpid = composerid + matches[3].toLowerCase();
		filename = matches[4];
		if (filename) {
			jrpid += "-" + filename;
		}
		url = "http://jrp.ccarh.org/cgi-bin/jrp?a=humdrum&f=" + jrpid;
	}
	return url;
}



