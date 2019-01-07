//////////////////////////////
//
// HumdrumSet::ParseUrlAppend -- Load Humdrum data from a URL.
//   Example URLs:
//      http://kern.humdrum.org/data?s=folk/sioux/sioux002.krn
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/master/kern/sioux002.krn
//   This function should not be called directly; use HumdrumSet::parseAppend instead.
//

HumdrumSet.prototype.ParseUrlAppend = function (url, opts) {
	this.clear();
	var tlines = url.match(/[^\r\n]+/g);
	if (tlines && tlines.length != 1) {
		console.log("Warning: only processing first line of string:", url);
	}
	if (tlines && tlines.length == 0) {
		console.log("Error: No content in input string:", url);
		return this;
	}
	var matches = url.match(/^(https?:\/\/.*)\s*$/);
	var finalurl = url.trim();
	if (matches) {
		finalurl = matches[1];
	}

	request = new XMLHttpRequest();
	(function (that) {
		request.onload = function () {
			that.parseAppend(this.responseText, opts);
		};
	})(this);
	request.open("GET", finalurl);
	request.send();

	return this;
};



