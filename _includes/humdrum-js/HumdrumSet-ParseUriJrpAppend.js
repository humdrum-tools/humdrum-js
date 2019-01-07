//////////////////////////////
//
// HumdrumSet::ParseUriJrpAppend -- Load Humdrum data from a Josquin Ressearch Project URI
//   that maps to the dataset for JRP.  The structure is: j[rp]://catalog-number
//   Example URI:
//      j://Jos2721
//   maps to the URL:
//      http://jrp.ccarh.org/cgi-bin/jrp?a=humdrum&f=Jos2721
//   This function should not be called directly; use HumdrumSet::parseAppend instead.
//

HumdrumSet.prototype.ParseUriJrpAppend = function (uri, options) {
	this.clear();
	var tlines = uri.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", uri);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", uri);
		return this;
	}
	var url = HumdrumBase.prototype.MakeUrlJrp(uri);
	if (url) {
		this.parseAppend(url, options);
	} else {
		console.log("Error: input string is not a JRP URI:", uri);
	}
	return this;
};



