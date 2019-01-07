//////////////////////////////
//
// HumdrumSet::initializer -- Create a HumdrumSet object.
//

function HumdrumSet(text, opts) {
	if (text) {
		this.parse(text, opts);
	} else {
		this.clear();
	}

	return this;
}



