//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/HumdrumLine.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains the HumdrumLine object for 
// the Humdrum JS library.
//
//
// Functions defined in this file:
//
// * HumdrumLine::clear() -- Clear contents of object.
// * HumdrumLine::parse() -- Parse an input string.
// * HumdrumToken::stringify() -- Convert object to plain text.
//
// Data accessor functions:
//
// * HumdrumToken::getLineIndex() -- Returns the index number of the line in HumdrumBase line array.
// * HumdrumToken::getLineNumber() -- Return line index plus 1.
// * HumdrumToken::getNextLine() -- Return the next line in the HumdrumBase line array.
// * HumdrumToken::getOwner() -- Return the HumdrumBase object that contains the line.
// * HumdrumToken::getPrevLine() -- Return the previous line in the HumdrumBase line array.
// * HumdrumToken::getText() -- Return the TSV text of the line.
// * HumdrumToken::isSpined() -- True if the line posses spines (not an empty line or global).
//
// Line-type related functions:
//
//  * HumdrumLine::getLineType() -- Return a string enumeration of the primary line type.
//  * HumdrumLine::isBarline() -- Is a barline.
//  * HumdrumLine::isComment() -- Starts with /!+/.
//  * HumdrumLine::isData() -- Is a data line.
//  * HumdrumLine::isEmpty() -- Is an empty line.
//  * HumdrumLine::isGlobal() -- Starts with /!!+/
//  * HumdrumLine::isGlobalComment() -- Is a global comment.
//  * HumdrumLine::isInterpretation() -- Is an interpretation.
//  * HumdrumLine::isLocalComment() -- Is a local comment.
//  * HumdrumLine::isRef() -- Is a reference record (either regular or universal).
//  * HumdrumLine::isRefRecord() -- Is a regular reference record.
//  * HumdrumLine::isUniversal() -- Is a universal comment or universal reference record.
//  * HumdrumLine::isUniversalComment() -- Is a universal Comment.
//  * HumdrumLine::isUniversalRefRecord() -- Is a universal reference record.
//
//
// Properties of HumdrumLine object:
//
// * this.text      = text string of line.
// * this.fields    = data fields of line (tokens or global/reference records).
// * this.owner = The Humdrum data object that the HumdrumLine object is contained in.
// * this.lineStructure = database describing interactions with other lines in the data.
// * this.lineStructure.nextLine  = pointer to the next line in the file.
// * this.lineStructure.prevLine  = pointer to the previous line in the file.
// * this.lineStructure.nextLineOfType  = pointer to the next line of the same type in the file.
// * this.lineStructure.prevLineOfType  = pointer to the previous line of the same type in the file.
// * this.lineStructure.spineQ    = true if the line has token data. Based on line type:
//       * RefRecord                = false
//       * UniversalRefRecord       = false
//       * UniversalComment         = false
//       * GlobalComment            = false
//       * Interpretation           = true
//       * LocalComment             = true
//       * Barline                  = true
//       * Empty                    = false
//       * Data                     = true
// * this.lineStructure.lineType = the type of line:
//       * RefRecord                = in the form "^!!!KEY: VALUE"
//       * UniversalRefRecord       = in the form "^!!!!KEY: VALUE"
//       * UniversalComment         = in the form /^!!!.*/ that is not a universal reference record
//       * GlobalComment            = in the form /^!!/ that is not universal or a reference record
//       * Interpretation           = line starts with "*"
//       * LocalComment             = line starts with single "!"
//       * Barline                  = line starts with "="
//       * Empty                    = no text on line
//       * Data                     = anything else
//

{% include humdrum-js/HumdrumLine-HumdrumLine.js -%}
{% include humdrum-js/HumdrumLine-accessors.js   -%}
{% include humdrum-js/HumdrumLine-clear.js       -%}
{% include humdrum-js/HumdrumLine-parse.js       -%}
{% include humdrum-js/HumdrumLine-stringify.js   -%}
{% include humdrum-js/HumdrumLine-getToken.js    -%}
{% include humdrum-js/HumdrumLine-getLineType.js -%}



