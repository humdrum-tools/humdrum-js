//////////////////////////////
//
// HumdrumLine::getToken -- Return a HumdrumToken based on the field index.
//     Multiple indexes can be given as arguments to the function, and nested
//     arrays of indexes can also be given, both of which map to an array of
//     HumdrumTokens matching the array structure of the input indexes.
//     Null is returned when the index position is invalid.
//

HumdrumLine.prototype.getToken = function () {
	if (arguments.length == 0) {
		return null;
	} else if (arguments.length == 1) {
		if (Array.isArray(arguments[0])) {
			return arguments[0].map(function(item) {return this.getToken(item)}, this);
		} else {
			if (!this.fields) {
				return null;
			}
			var fieldIndex = parseInt(arguments[0]);
			if (isNaN(fieldIndex)) {
				return null;
			}
			if (fieldIndex < 0 || fieldIndex > this.fields.length - 1) {
				return null;
			} else {
				var value = this.fields[fieldIndex];
				return value instanceof HumdrumToken ? value : null;
			}
		}
	} else {
		return [].map.call(arguments, function(item) {return this.getToken(item)}, this);
	}
};



