//////////////////////////////
//
// HumdrumStructure::initializer -- Create a HumdrumStructure object.
//

function HumdrumStructure(text, opts) {
	HumdrumBase.call(this, text, opts);
	return this;
}

HumdrumStructure.prototype = Object.create(HumdrumBase.prototype);



