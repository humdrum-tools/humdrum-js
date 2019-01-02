//////////////////////////////
//
// HumdrumAnalysis::initializer -- Create a HumdrumAnalysis object.
//

function HumdrumAnalysis(text, opts) {
	HumdrumContent.call(this, text, opts);
	return this;
}

HumdrumAnalysis.prototype = Object.create(HumdrumContent.prototype);



