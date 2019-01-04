//////////////////////////////
//
// HumdrumBase::getBarlines -- Return an array of all barlines in the data.
//

HumdrumBase.prototype.getBarlines = function () {
	var output = [];
	var bar = this.getFirstBarline();
	while (bar) {
		output.push(bar);
		bar = bar.getNextLineOfSameType();
	}
	return output;
};



