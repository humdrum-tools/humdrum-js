//////////////////////////////
//
// HumdrumLine::clear -- (Re-)initialize the state variables for the object.
//

HumdrumLine.prototype.clear = function () {
	this.text      = "";    // input string from call to parse()
	this.fields    = [];    // array of HumdrumToken objects extracted from text
	this.owner     = null;  // the HumdrumBase object that contains this object.

	this.lineStructure = {}; // erase all previous contents of line structure information
	this.lineStructure.lineType  = null;  // basic category of line, such as "Interpretation", "Data", or "LocalComment"
	this.lineStructure.spineQ    = null;  // false if an empty line, global comment or reference record
	this.lineStructure.nextLine  = null;  // reference to the next HumdrumLine in the owner
	this.lineStructure.prevLine  = null;  // reference to the previous HumdrumLine in the owner
	this.lineStructure.nextLineOfType = null; // reference to next line of same type in owner
	this.lineStructure.prevLineOfType = null; // reference to previous line of same type in owner

	return this;
};



