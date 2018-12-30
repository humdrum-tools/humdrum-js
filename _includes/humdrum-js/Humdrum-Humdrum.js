//////////////////////////////
//
// Humdrum::initializer -- Create a Humdrum object.
//

function Humdrum(text) {
	HumdrumTool.call(this, text);
	return this;
}


//
// Humdrum inherits from HumdrumTool:
//

Humdrum.prototype = Object.create(HumdrumTool.prototype);



