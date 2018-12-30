//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/Humdrum-basic.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains a substitute Humdrum class for the Humdrum JS library.
// It inherits from HumdrumBase, and skips over HumdrumTool, HumdrumContent,
// and HumdrumStructure.
//

//////////////////////////////
//
// Humdrum::initializer -- Create a Humdrum object.
//

function Humdrum(text) {
	HumdrumBase.call(this, text);
	return this;
}

Humdrum.prototype = Object.create(HumdrumBase.prototype);



