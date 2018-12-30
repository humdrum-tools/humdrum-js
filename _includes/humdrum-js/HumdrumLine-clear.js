//////////////////////////////
//
// HumdrumLine::clear -- (Re-)initialize the state variables for the object.
//

HumdrumLine.prototype.clear = function () {
	this.text      = "";    // input string from call to parse()
	this.fields    = [];    // array of HumdrumToken objects extracted from text
	this.nextLine  = null;  // reference to the next HumdrumLine in the owner
	this.prevLine  = null;  // reference to the previous HumdrumLine in the owner
	this.hasSpines = null;  // false if an empty line, global comment or reference record
	this.lineType  = null;  // basic category of line, such as "Interpretation", "Data", or "LocalComment"
	this.owner     = null;  // the HumdrumBase object that contains this object.
	return this;
};



