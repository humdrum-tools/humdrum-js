//
// RefRecordEntry data accessor functions
//


//////////////////////////////
//
// getKeyBase -- Return the .keyBase variable, giving an empty string if it is
//     undefined or invalid.
//

RefRecordEntry.prototype.getKeyBase = function () {
	if (this.keyBase && (typeof this.keyBase === "string" || this.keyBase instanceof String)) {
		return this.keyBase;
	} else {
		return "";
	}
}



//////////////////////////////
//
// getKey -- Return the .key variable, giving an empty string if it is
//     undefined or invalid.
//

RefRecordEntry.prototype.getKey = function () {
	if (this.key && (typeof this.key === "string" || this.key instanceof String)) {
		return this.key;
	} else {
		return "";
	}
}



//////////////////////////////
//
// getText -- Return the .key variable, giving an empty string if it is
//     undefined or invalid.
//

RefRecordEntry.prototype.getText = function () {
	if (this.text && (typeof this.text === "string" || this.text instanceof String)) {
		return this.text;
	} else {
		return "";
	}
}



//////////////////////////////
//
// getValue -- Return the .value variable, giving an empty string if it is
//     undefined or invalid.
//

RefRecordEntry.prototype.getValue = function () {
	if (this.value && (typeof this.value === "string" || this.value instanceof String)) {
		return this.value;
	} else {
		return "";
	}
}



