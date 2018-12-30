//////////////////////////////
//
// HumdrumToken::initializer -- Create a HumdrumToken object.
//

function HumdrumToken(tokentext) {
	this.clear();
	if (typeof tokentext === "string" || tokentext instanceof String) {
		this.text = tokentext;
	}
	return this;
}


//
// HumdrumToken inherits from Convert, but there are not any
// state variables in Convert that HumdrumToken should need to
// initialize; therefore, it is not referred to in the initialize
// function given above.
//

HumdrumToken.prototype = Object.create(Convert.prototype);



