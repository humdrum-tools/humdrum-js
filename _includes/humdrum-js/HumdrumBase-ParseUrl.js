//////////////////////////////
//
// HumdrumBase::ParseUrl -- Load Humdrum data from a URL.
//   Example URLs:
//      http://kern.humdrum.org/data?s=folk/sioux/sioux002.krn
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/master/kern/sioux002.krn
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseUrl = function (url, options) {
	this.clear();
	var tlines = url.match(/[^\r\n]+/g);
	if (tlines.length != 1) {
		console.log("Warning: only processing first line of string:", url);
	}
	if (tlines.length == 0) {
		console.log("Error: No content in input string:", url);
		return this;
	}
	var matches = url.match(/^(https?:\/\/.*)\s*$/);
	if (matches) {
		request = new XMLHttpRequest();
		(function (that) {
			request.onload = function () {
				that.parse(this.responseText, options);
				if (typeof that.onload === "function") {
					that.onload(that);
				}
			};
		})(this);
		request.open("GET", matches[1]);
		request.send();
	} else {
		console.log("Error: input string is not a Humdrum URI:", url);
	}
	return this;
};



