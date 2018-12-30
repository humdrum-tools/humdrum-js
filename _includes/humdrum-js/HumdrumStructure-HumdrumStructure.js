//////////////////////////////
//
// HumdrumStructure::initializer -- Create a HumdrumStructure object.
//

function HumdrumStructure(text) {
	HumdrumBase.call(this, text);
	return this;
}

HumdrumStructure.prototype = Object.create(HumdrumBase.prototype);



