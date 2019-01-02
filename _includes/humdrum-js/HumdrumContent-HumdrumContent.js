//////////////////////////////
//
// HumdrumContent::initializer -- Create a HumdrumContent object.
//

function HumdrumContent(text, opts) {
	HumdrumStructure.call(this, text, opts);
	return this;
}

HumdrumContent.prototype = Object.create(HumdrumStructure.prototype);



