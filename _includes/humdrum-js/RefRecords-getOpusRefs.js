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



