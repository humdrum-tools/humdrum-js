//////////////////////////////
//
// HumdrumLine::initializer -- Create a HumdrumLine object.
//

function HumdrumLine(text) {
	Convert.call(this); // not needed, but maybe in the future
	if (typeof text === "string" || text instanceof String) {
		this.parse(text);
	} else {
		this.clear();
	}
	return this;
}


//
// HumdrumLine inherits from Convert:
//

HumdrumLine.prototype = Object.create(Convert.prototype);



