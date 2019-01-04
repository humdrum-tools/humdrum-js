//////////////////////////////
//
// RefRecords::parse -- Read the reference record lines in a Humdrum file
//   string or object and store in object.
//

RefRecords.prototype.parse = function (humdrumfile) {
	this.clear();

	var lines = [];

	if (typeof humdrumfile === "string" || humdrumfile instanceof String) {
		lines = humdrumfile.match(/[^\r\n]+/g);
	} else if (Object.prototype.toString.call(humdrumfile) === '[object Array]') {
		if (humdrumfile[0] === "string" || humdrumfile[0] instanceof String) {
			line = humdrumfile;
		}
	} else if (humdrumfile instanceof HumdrumBase) {
		lines = humdrumfile.lines;
	} else {
		// check if an HTML element and load text from there.
		var ishtml = false;
  		try {
			ishtml = obj instanceof HTMLElement ? true : false;
  		}
  		catch(e){
    		//Browsers not supporting W3 DOM2 don't have HTMLElement and
    		//an exception is thrown and we end up here. Testing some
    		//properties that all elements have (works on IE7)
    		if ((typeof obj === "object") &&
      			(obj.nodeType === 1) && (typeof obj.style === "object") &&
      			(typeof obj.ownerDocument ==="object")) {
				ishtml = true;
			}
		}
		if (ishtml) {
			lines = humdrumfile.textContent.match(/[^\r\n]+/g);
		}
	}

	if (humdrumfile instanceof HumdrumBase) {
		for (i=0; i<lines.length; i++) {
			if (lines[i].getLineType().match(/RefRecord/)) {
				// also allowing UniversalRefRecord.
				var record = new RefRecordEntry(lines[i], i);
				this.sequence.push(record);
				var key = record.keyBase;
				if (!this.database[key]) {
					this.database[key] = [ record ];
				} else {
					this.database[key].push(record);
				}
			}
		}
	} else {
		for (i=0; i<lines.length; i++) {
			if (lines[i].match(/^!!![^!:]+:/)) {
				var record = new RefRecordEntry(lines[i], i);
				this.sequence.push(record);
				var key = record.keyBase;
				if (!this.database[key]) {
					this.database[key] = [ record ];
				} else {
					this.database[key].push(record);
				}
			}
		}
	}

	// Give links to next/previous records
	for (i=0; i<this.sequence.length-1; i++) {
		this.sequence[i].nextRef = this.sequence[i+1];
		this.sequence[i+1].prevRef = this.sequence[i];
	}

	this.AddBacklinks();

	try {
		this.AddDescriptions();
	} catch (e) {
		// description extension not installed
	}

	try {
		this.AddLanguages();
	} catch (e) {
		// language extension not installed
	}

	try {
		this.AddStatuses();
	} catch (e) {
		// status extension not installed
	}

	return this;
};



