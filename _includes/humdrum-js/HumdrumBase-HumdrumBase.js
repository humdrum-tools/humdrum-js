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


//
// HumdrumBase inherits from Convert, but there are not any
// state variables in Convert that HumdrumBase should need to
// initialize; therefore, it is not referred to in the initialize
// function given above.
//

HumdrumBase.prototype = Object.create(Convert.prototype);



