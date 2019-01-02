//////////////////////////////
//
// HumdrumTool::initializer -- Create a HumdrumTool object.
//

function HumdrumTool(text, opts) {
	HumdrumAnalysis.call(this, text, opts);
	return this;
}

HumdrumTool.prototype = Object.create(HumdrumAnalysis.prototype);



