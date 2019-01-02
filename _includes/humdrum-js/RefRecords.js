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
// * RefRecords::getRef()           = Get the first reference record matching key in data.
// * RefRecords::getRefValue()      = Get value of the first reference record matching key in data.
// * RefRecords::getRefAll()        = Get array of all keys of the given type.
// * RefRecords::getRefFirstExact() = Get the first reference record that matches key plus qualifiers.
// * RefRecords::getRefAllExact()   = Get array of all keys of the given type that matches key plus qualifiers.
// * RefRecords::getAllRefs()       = Return a list of all references.
// * RefRecords::getRefs()          = Return a list of all references that match key list.
// * RefRecords::getComposerRefs()  = Return list of refs related to composers.
// * RefRecords::getOpusRefs()      = Return list of refs related to work.
// * RefRecords::expandAtTemplate() = Expand template with ref records.
// * RefRecords::AddBacklinks()     = Store RefRecordEntries onto their originating HumdrumLine (in HumdrumLine.ref).
//
//
// Properties for RefRecordEntry object:
//
//	* this.sequence =  The order that the Humdrum records are found in the file.
//	* this.database =  Hash of the records by RefRecordEntry::keyBase.
//	* this.owner    =  The HumdrumBase structure that this object is contained in.
//

{% include humdrum-js/RefRecords-RefRecords.js -%}
{% include humdrum-js/RefRecords-clear.js -%}
{% include humdrum-js/RefRecords-parse.js -%}
{% include humdrum-js/RefRecords-getRef.js -%}
{% include humdrum-js/RefRecords-getRefAll.js -%}
{% include humdrum-js/RefRecords-getRefFirstExact.js -%}
{% include humdrum-js/RefRecords-getRefAllExact.js -%}
{% include humdrum-js/RefRecords-getAllRefs.js -%}
{% include humdrum-js/RefRecords-getRefs.js -%}
{% include humdrum-js/RefRecords-getComposerRefs.js -%}
{% include humdrum-js/RefRecords-getOpusRefs.js -%}
{% include humdrum-js/RefRecords-expandAtTemplate.js -%}
{% include humdrum-js/RefRecords-AddBacklinks.js -%}



