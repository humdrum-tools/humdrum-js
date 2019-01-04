//////////////////////////////
//
// HumdrumBase::getMeasureNumbers -- Return a list of all 
//    measure numbers found in the data.  Barline numbers are
//    expected to be present in the first token on the line.
//

HumdrumBase.prototype.getMeasureNumbers = function () {
	var output = [];
	var bar = this.getFirstBarline();
	while (bar) {
		var matches = bar.getTokenText(0).match(/(\d+)/);
		if (matches) {
			output.push(parseInt(matches[1]));
		}
		bar = bar.getNextLineOfSameType();
	}
	return output;
};



