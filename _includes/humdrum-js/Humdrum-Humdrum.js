//////////////////////////////
//
// Humdrum::initializer -- Create a Humdrum object.
//

function Humdrum(text, opts) {
	HumdrumTool.call(this, text, opts);
	return this;
}


//
// Humdrum inherits from HumdrumTool:
//

Humdrum.prototype = Object.create(HumdrumTool.prototype);



