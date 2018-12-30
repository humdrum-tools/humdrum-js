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



