//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/HumdrumBase.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains the HumdrumBase class for
// the Humdrum JS library.
//
//
// Functions defined in this file:
//
// * HumdrumBase::clear()                   = Intialize variables for object.
// * HumdrumBase::parse()                   = Create obj. from input string, URL, URI, element, selector.
// * HumdrumBase::getLineCount()            = Return the number of line records in data.
// * HumdrumBase::getLine()                 = Return a HumdrumLine object.
// * HumdrumBase::analyzeRefRecords()       = Create reference record database object.
// * HumdrumBase::stringify()               = Convert object to plain text.
//
//
// Functions that are wrappers for HumdrumReferences object, this.refs.
//     These functions ensure that the reference record database is initialized
//     before calling functions on the reference record database object.
//
// * HumdrumBase::getRefFirst()             = Get the first reference record matching key in data.
// * HumdrumBase::getRefAll()               = Get array of all keys of the given type.
// * HumdrumBase::getRefFirstExact()        = Get the first reference record that matches key plus qualifiers.
// * HumdrumBase::getRefAllExact()          = Get array of all keys of the given type that matches key plus qualifiers.
// * HumdrumBase::getAllRefs()              = Return a list of all references.
// * HumdrumBase::getRefs()                 = Return a list of all references that match key list.
// * HumdrumBase::getComposerRefs()         = Return list of refs related to composers.
// * HumdrumBase::getOpusRefs()             = Return list of refs related to work.
// * HumdrumBase::expandAtTemplate()        = Expand template with ref records.
//
//
// Private functions (general user should not need to use):
//
// * HumdrumBase::ParseUrl()                = Download data from URL.
// * HumdrumBase::ParseUriHumdrum()         = Download data from Humdrum URI.
// * HumdrumBase::ParseUriGithub()          = Download data from Github URI.
// * HumdrumBase::ParseText()               = Convert string to object contents.
// * HumdrumBase::ParseSelector()           = Extract data from element matching selector.
// * HumdrumBase::ParseElement()            = Extract data from element.
// * HumdrumBase::IsElement()               = Boolean test for HTML element.
//
//
// Properties of HumdrumLine object:
//
// * this.lines        = Array of data lines.
// * this.refs         = Object containing database of reference records in the file.
// * this.parseCounter = Counter to avoid possible infinite loops.
//


//////////////////////////////
//
// HumdrumBase::initializer -- Create a HumdrumBase object.
//

function HumdrumBase(text, options) {
	if (text) {
		this.parse(text, options);
	} else {
		this.clear();
	}
	return this;
}



//////////////////////////////
//
// HumdrumBase::clear -- Clear contents of HumdrumBase object.
//

HumdrumBase.prototype.clear = function () {
	this.lines = [];   // storage for each line record in Humdrum data
	this.refs  = null; // storage for reference records;
};



//////////////////////////////
//
// HumdrumBase::parse -- Split input text into lines and tokens.  The input can be:
//   (1) The textual content of a Humdrum data file.
//   (2) An HTML element on the webpage that has Humdrum data content inside of it.
//   (3) An ID reference to an HTML element on the webpage that has Humdrum data 
//       content inside of it.  For example, givan an input of "#data" if there is an
//       element on the page with an ID of "data".  Technically this is an element selector,
//       and you can use any selector, provided that it starts with an ID reference (#).
//       If you do not want to start the selector with "#", then use HumdrumBase::ParseSelector()
//       directly.
//   (4) The URL to some Humdrum data.  When the data has been loaded HumdrumBase.onload()
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

HumdrumBase.prototype.parse = function (text, options) {
	if (typeof this.parseCounter === "undefined") {
		this.parseCounter = 0;
	}
	this.parseCounter++;
	if (this.parseCounter > 10) {
		// Some infinite loop is starting (URL that contains text to a URL for example).
		return this;
	}
	this.clear();
	if (this.IsElement(text)) {
		this.ParseElement(text, options);
	} else if ((typeof text === "string") || text instanceof String) {
		text = text.replace(/^\s+/m, "");   // remove any leading spaces or newlines
		if (text.match(/^https?:\/\//)) {
			this.ParseUrl(text, options);
		} else if (text.match(/^(h|hum|humdrum):\/\//)) {
			this.ParseUriHumdrum(text, options);
		} else if (text.match(/^(g|github):\/\//)) {
			this.ParseUriGithub(text, options);
		} else if (text.match(/^(j|jrp):\/\//)) {
			this.ParseUriJrp(text, options);
		} else if (text.match(/^#/)) {
			this.ParseSelector(text, options);
		} else {
			this.ParseText(text, options);
		}
	} else {
		console.log("Error: input to HumdrumBase::parse is unknown:", typeof text, "for data:", text);
	}
	return this;
};



//////////////////////////////
//
// HumdrumBase::stringify -- Return a plain text Humdrum data file.
//

HumdrumBase.prototype.stringify = function () {
	var output = "";
	if (!this.lines) {
		return output;
	}
	for (var i=0; i<this.lines.length; i++) {
		output += this.lines[i].stringify();
	}
	return output;
};



//////////////////////////////
//
// HumdrumBase::getLineCount -- Return the number of lines in the Humdrum data.
//

HumdrumBase.prototype.getLineCount = function () {
	return this.lines ? this.lines.length : 0;
};



//////////////////////////////
//
// HumdrumBase::getLine -- Return the specificed Humdrum line (0 indexed).
//

HumdrumBase.prototype.getLine = function (index) {
	if (index < 0) {
		return null;
	}
	if (index >= this.getLineCount()) {
		return null;
	}
	return this.lines[index];
};



///////////////////////////////
//
// HumdrumBase::analyzeRefRecords -- Generate Reference-records,
//   the results of which is stored in this.refs.
//

HumdrumBase.prototype.analyzeRefRecords = function () {
	this.refs = new RefRecords(this);
	return this;
};



///////////////////////////////////////////////////////////////////////////
//
// Private functions for HumdrumBase.  These should not be necessary to use, but
//    javascript cannot enforce privacy.
//



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
					that.onload();
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
	var matches = uri.match(/^(h|hum|humdrum):\/\/(.*)\s*$/);
	if (matches) {
		this.parse("http://kern.humdrum.org/data?s=" + matches[2], options);
	} else {
		console.log("Error: input string is not a Humdrum URI:", uri);
	}
	return this;
};



//////////////////////////////
//
// HumdrumBase::ParseUriGithub -- Load Humdrum data from a Gihub URI.
//   Example URI:
//      g://craigsapp/densmore-teton-sioux/kern/sioux002.krn
//   maps to the URL:
//      https://raw.githubusercontent.com/craigsapp/densmore-teton-sioux/master/kern/sioux002.krn
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
		this.parse("https://raw.githubusercontent.com/" + account + "/" + repo + "/master/" + file, options);
	} else {
		console.log("Error: input string is not a Github URI:", uri);
	}
	return this;
};



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
	var url;
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
		this.parse(url, options);
	} else {
		matches = uri.match(/^(j|jrp):\/\/([a-z]{3})\b/i);
		if (matches) {
			// Downloading an entire composer's repertory.  Should not be done on HumdrumBase
			// object, but rather the HumdrumSet object, so including as an example for implementation
			// there.
			composerid = matches[2].toLowerCase();
			composerid = composerid.charAt(0).toUpperCase() + composerid.substr(1);
			url = "http://kern.humdrum.org/data?s=jrp/" + composerid;
			this.parse(url, options);
		} else {
			console.log("Error: input string is not a JRP URI:", uri);
		}
	}
	return this;
};



//////////////////////////////
//
// HumdrumBase::ParseText -- This function takes a string containing a Humdrum data file
//   and then it chops it up into lines, which will then be chopped up into tokens.
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseText = function (text, options) {
	if (!text) {
		console.log("Error: no content to parse");
		return this;
	}
	this.parseCounter = 0;  // finally got here (but probably always fast)
	this.clear();
	if ((typeof text !== "string") && !(text instanceof String)) {
		console.log("Error: input to HumdrumBase::parseText is not text but rather", typeof text, "for data:", text);
		return this;
	}
	this.lines = [];
	var hlines = text.match(/[^\r\n]+/g);
	for (var i=0; i<hlines.length; i++) {
		var humline = new HumdrumLine(hlines[i]);
		humline.owner = this;
		this.lines.push(humline);
	}

	if (options && (options.analyzeAll || options.analyzeRefRecords)) {
		this.analyzeRefRecords();
	}

	return this;
};



//////////////////////////////
//
// HumdrumBase::ParseSelector -- Read Humdrum file contents from the given selector.
//   Typically this should be from a Humdrum text script:
//      <script type="text/x-humdrum" id="mydata">
//      **kern
//      1c
//      *-
//      </script>
//   And the call would be ParseSelector("#mydata") in this case.
//   If there are multiple matches to the selector, then only the first
//   element that matches will be processed.
//

HumdrumBase.prototype.ParseSelector = function (selector, options) {
	this.clear();
	if ((typeof selector !== "string") && !(selector instanceof String)) {
		console.log("Error: expecting a string for the selector:", selector, "but it is a", typeof selector);
		return this;
	}
	var element = document.querySelector(selector);
	if (!element) {
		console.log("Error: could not find an element for selector", selector);
		return this;
	}
	this.parse(element.innerHTML, options);
	return this;
};



//////////////////////////////
//
// HumdrumBase::ParseElement -- read Humdrum file contents from an HTML element.
//   Typically this should be from a Humdrum text script:
//      <script type="text/x-humdrum">
//      **kern
//      1c
//      *-
//      </script>
//   To avoid interpretation of the contents as HTML element.
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseElement = function (element, options) {
	this.clear();
	if (!this.IsElement(element)) {
		console.log("Error: Element is not an element, but a", typeof element, "for input", element);
		return;
	}
	this.parse(element.innerHTML, options);
	return this;
};



//////////////////////////////
//
// HumdrumBase::IsElement -- true if input an HTML element.
//

HumdrumBase.prototype.IsElement = function (element) {
	try {
		// Using W3 DOM2 (works for FF, Opera and Chrome)
		return obj instanceof HTMLElement;
	}
	catch (e) {
		// Browsers not supporting W3 DOM2 don't have HTMLElement and
		// an exception is thrown and we end up here. Testing some
		// properties that all elements have (works on IE7)
		return (typeof obj==="object") &&
				(obj.nodeType===1) && (typeof obj.style === "object") &&
				(typeof obj.ownerDocument ==="object");
	}
};


///////////////////////////////////////////////////////////////////////////
//
// functions related to RefRecords object this.refs. See the 
// RefRecords.js file for descriptions of the functions.
//


HumdrumBase.prototype.getRefFirst = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefFirst.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefAll = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefAll.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefFirstExact = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefFirstExact.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefAllExact = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefAllExact.apply(this.refs, arguments);
};

HumdrumBase.prototype.getAllRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getAllRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.getRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.getComposerRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getComposerRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.getOpusRefs = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.getOpusRefs.apply(this.refs, arguments);
};

HumdrumBase.prototype.expandAtTemplate = function () {
	if (!this.refs) { this.analyzeRefRecords() }
	return RefRecords.prototype.expandAtTemplate.apply(this.refs, arguments);
};


//
///////////////////////////////////////////////////////////////////////////



