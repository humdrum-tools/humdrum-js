//////////////////////////////
//
// HumdrumTool::initializer -- Create a HumdrumTool object.
//

function HumdrumTool(text) {
	HumdrumContent.call(this, text);
	return this;
}

HumdrumTool.prototype = Object.create(HumdrumContent.prototype);



