//////////////////////////////
//
// HumdrumContent::initializer -- Create a HumdrumContent object.
//

function HumdrumContent(text) {
	HumdrumStructure.call(this, text);
	return this;
}

HumdrumContent.prototype = Object.create(HumdrumStructure.prototype);



