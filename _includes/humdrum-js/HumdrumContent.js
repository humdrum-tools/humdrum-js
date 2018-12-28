//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/HumdrumContent.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains the HumdrumContent class for 
// the Humdrum JS library. It inherits from the 
// HumdrumStructure class and is inherited by the
// Humdrum class.  The HumdrumContent class does
// analysis of the Humdrum data content.
//

//////////////////////////////
//
// HumdrumContent::initializer -- Create a HumdrumContent object.
//

function HumdrumContent(text) {
	HumdrumStructure.call(this, text);
	return this;
}

HumdrumContent.prototype = Object.create(HumdrumStructure.prototype);


