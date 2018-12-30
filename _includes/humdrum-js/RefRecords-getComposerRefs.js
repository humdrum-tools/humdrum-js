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



