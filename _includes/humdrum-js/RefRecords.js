//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/RefRecords.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
//	This file contains the RefRecords class for 
// the Humdrum notation plugin.  This class is used to access
// the reference records in a Humdrum file.
//
//
// Functions defined in this file:
// 
// * RefRecords::clear()            = Clear contents of object.
// * RefRecords::parse()            = Extract reference records from Humdrum data.
// * RefRecords::getRefFirst()      = Get the first reference record matching key in data.
// * RefRecords::getRefAll()        = Get array of all keys of the given type.
// * RefRecords::getRefFirstExact() = Get the first reference record that matches key plus qualifiers.
// * RefRecords::getRefAllExact()   = Get array of all keys of the given type that matches key plus qualifiers.
// * RefRecords::getAllRefs()       = Return a list of all references.
// * RefRecords::getRefs()          = Return a list of all references that match key list.
// * RefRecords::getComposerRefs()  = Return list of refs related to composers.
// * RefRecords::getOpusRefs()      = Return list of refs related to work.
// * RefRecords::expandAtTemplate() = Expand template with ref records.
// * RefRecords::addBacklinks()     = Store RefRecordEntries onto their originating HumdrumLine (in HumdrumLine.ref).
//
//
// Properties for RefRecordEntry object:
//
//	* this.sequence =  The order that the Humdrum records are found in the file.
//	* this.database =  Hash of the records by RefRecordEntry::keyBase.
//	* this.owner    =  The HumdrumBase structure that this object is contained in.
//

//////////////////////////////
//
// RefRecords::initializer -- Create a RefRecords object.
//

function RefRecords(humdrumfile) {
	this.clear();
	this.parse(humdrumfile);
	return this;
}



//////////////////////////////
//
// RefRecords::clear -- Initialize the object.
//

RefRecords.prototype.clear = function () {
	if (this.sequence && Array.isArray(this.sequence)) {
		for (var i=0; i<sequence.length; i++) {
			this.sequence[i].clear();
		}
	}
	this.sequence = [];   // The order that the Humdrum records are found in the file.
	this.database = {};   // Hash of the records by RefRecordEntry::keyBase.
	this.owner    = null; // The HumdrumBase structure that this object is contained in.
	return this;
};



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
			lines = humdrumfile.innerHTML.match(/[^\r\n]+/g);
		}
	}

	if (humdrumfile instanceof HumdrumBase) {
		for (i=0; i<lines.length; i++) {
			if (lines[i].lineType.match(/RefRecord/)) {
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



//////////////////////////////
//
// RefRecords::getRefFirst -- Get the first reference record
//    which matches the given key.  This function will ignore qualifiers,
//    counts or variants on the key (KEY2 will map to KEY, KEY@@LANG will map
//    to KEY, KEY-variant will map to KEY).
//

RefRecords.prototype.getRefFirst = function (keyBase) {
	// return the first keyBase record
	var items  = this.database[keyBase];
	if (!items) {
		return "";
	} else if (items.length > 0) {
		return items[0];
	} else {
		return "";
	}
};



//////////////////////////////
//
// RefRecords::getRefAll -- Get all reference records that match to key.
//

RefRecords.prototype.getRefAll = function (keyBase) {
	// if keyBase is empty, then return all records:
	if (!keyBase) {
		return this.sequence;
	}
	// return all keyBase records
	var items  = this.database[keyBase];
	if (!items) {
		return [];
	} else if (items.length > 0) {
		return items[0];
	} else {
		return [];
	}
};



//////////////////////////////
//
// RefRecords::getRefFirstExact -- Return the first key in the
//   file sequence that matches the input argument exactly.  This compares
//   to this.key.
//

RefRecords.prototype.getRefFirstExact = function (key) {
	// return first matching key record
	var list = this.getRefAll(key)
	for (var i=0; i<list.length; i++) {
		if (list[i].key === key) {
			return list[i];
		}
	}
	return "";
};



//////////////////////////////
//
// RefRecords::getRefAllExact -- Return all reference records
//   which match the input argument exactly (key base plus any qualifiers).
//   This compares to this.key.
//

RefRecords.prototype.getRefAllExact = function (key) {
	// return all matching key record
	var list = this.getRefAll(key)
	var output = [];
	for (var i=0; i<list.length; i++) {
		if (list[i].key === key) {
			output.push(list[i]);
		}
	}
	return output;
};



//////////////////////////////
//
// RefRecords::getAllRefs -- Return all reference records.
//

RefRecords.prototype.getAllRefs = function () {
	return this.sequence;
};



//////////////////////////////
//
// RefRecords::getRefs -- Return all reference records that match 
//    their (base) key to the input array or hash of keys.
//

RefRecords.prototype.getRefs = function (obj) {
	var hash = obj;
	var i;
	if (Array.isArray(obj)) {
		hash = {};
		for (i=0; i<obj.length; i++) {
			hash[obj[i]] = true;
		}
	}
	var output = [];
	for (i=0; i<this.sequence.length; i++) {
		if (hash[this.sequence[i].keyBase]) {
			output.push(this.sequence[i]);
		}
	}
	return output;
};



//////////////////////////////
//
// RefRecords::getComposerRefs -- Return all standard reference records that
//    are related to composers.
//

RefRecords.prototype.getComposerRefs = function (obj) {
	return this.getRefs([
		"CDT",	//	Composer's dates
		"CNT",	//	Composer's nationality
		"COA",	//	Attributed composer
		"COC",	//	Composer's corporate name
		"COL",	//	Stage name [of composer], alias
		"COM",	//	Composer's name
		"COS" 	//	Suspected composer
	]);
};



//////////////////////////////
//
// RefRecords::getOpusRefs -- Return all standard reference records that
//    are related to the work (opus)..
//

RefRecords.prototype.getOpusRefs = function (obj) {
	return this.getRefs([
		"OAC",	//	Act number
		"OCL",	//	Collector's name
		"OCO",	//	Commission
		"OCY",	//	Country of composition
		"ODE",	//	Dedication
		"ODT",	//	Date of composition
		"OKY",	//	Key
		"OMD",	//	Movement designation
		"OMV",	//	Movement number
		"ONB",	//	Free format note
		"ONM",	//	Number
		"OPC",	//	City of composition
		"OPR",	//	Title of parent work
		"OPS",	//	Opus number
		"OPT",	//	Parent work
		"OSC",	//	Scene number
		"OTA",	//	Alternative title
		"OTL",	//	Title
		"OTP",	//	Popular title
		"OVM" 	//	Volume
	]);
};



//////////////////////////////
//
// RefRecords::expandAtTemplate -- For example, "@{OTL}" will replace
//    @{OTL} string with reference value for OTL.  Function not fully
//    implemented yet (need to expand constructs such as @{key}{true}{false}).
//

RefRecords.prototype.expandAtTemplate = function (template) {
	var matches;
	var key;
	var record;
	matches = template.match(/@\{(.*?)\}/);
	while (matches) {
		key = matches[1];
		record = this.getRefFirstExact(key);
		if (!record) {
			record = this.getRefFirst(key);
		}
		template = template.replace(/@\{.*?\}/, record.value);
		matches = template.match(/@\{(.*?)\}/);
	}
	return template;
};



//////////////////////////////
//
// RefRecords::addBacklinks -- Store RefRecordEntriies into the originalting HumdrumLine if data was parsed as
//     a plain text string.
// 
//

RefRecords.prototype.addBacklinks = function () {
	if (!this.sequence) {
		console.log("Warning: no sequence database for reference records");
		return this;
	}
	for (var i=0; i<this.sequence.length; i++) {
		this.sequence[i].addBackLink();
	}
};



