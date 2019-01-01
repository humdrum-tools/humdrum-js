//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Mon Dec 31 23:15:04 EST 2018
// Filename:      _includes/humdrum-js/RefRecordEntry.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
//	This file contains the RefRecordEntry class for
// the Humdrum JS library.  This class is used by
// the RefRecords class to store a particular
// reference record.
//
//
// List of prototype functions:
//
// * RefRecordEntry::clear()           = Clear previous contents.
// * RefRecordEntry::clearParsedData() = Clear only parsed data.
// * RefRecordEntry::setLineIndex()    = Store the original data line index.
// * RefRecordEntry::setLineText()     = Store the line text and parse it.
// * RefRecordEntry::AddBacklink()     = Store a reference to this object in the originating HumdrumLine.
//
// Private prototype functions:
//
// * RefRecordEntry::ParseTextLine()   = Parse the text line.
//
//
// Properties for RefRecordEntry object:
//
// * this.lineIndex    = Line index: offset from 0 for first line in file.
// * this.text         = The raw text of the reference record line.
// * this.owner        = The HumdrumLine where the reference record entry came from.
// * this.key          = The complete reference key.
// * this.keyBase      = The reference key without langauge, count or exinterp qualifiers.
// * this.keyAt        = The language qualification, including the @ signs.
// * this.langCode     = The langauge qualification, without the @ prefix.
// * this.keyExinterp  = The exclusive interpretation, including two * marks.
// * this.keyVariant   = The variant qualification (to be designed).
// * this.keyCount     = A Number following a keyBase, before keyAt or keyQual.
//

{% include humdrum-js/RefRecordEntry-RefRecordEntry.js -%}
{% include humdrum-js/RefRecordEntry-clear.js -%}
{% include humdrum-js/RefRecordEntry-clearParsedData.js -%}
{% include humdrum-js/RefRecordEntry-setLineIndex.js -%}
{% include humdrum-js/RefRecordEntry-setLineText.js -%}
{% include humdrum-js/RefRecordEntry-parseTextLine.js -%}
{% include humdrum-js/RefRecordEntry-AddBacklink.js -%}
{% include humdrum-js/RefRecordEntry-accessors.js -%}



