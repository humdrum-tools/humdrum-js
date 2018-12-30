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
//
// Properties of HumdrumLine object:
//
// * this.text      = text string of line.
// * this.fields    = data fields of line (tokens or global/reference records).
// * this.nextLine  = pointer to the next line in the file.
// * this.prevLine  = pointer to the previous line in the file.
// * this.hasSpines = true if the line has token data. Based on line type:
//       * RefRecord                = false
//       * UniversalRefRecord       = false
//       * UniversalComment         = false
//       * GlobalComment            = false
//       * Interpretation           = true
//       * LocalComment             = true
//       * Barline                  = true
//       * Empty                    = false
//       * Data                     = true
// * this.lineType = the type of line:
//       * RefRecord                = in the form "^!!!KEY: VALUE"
//       * UniversalRefRecord       = in the form "^!!!!KEY: VALUE"
//       * UniversalComment         = in the form "^!!!!.*"
//       * GlobalComment            = in the form "^!!![^!]?.*
//       * Interpretation           = line starts with *
//       * LocalComment             = line starts with single !
//       * Barline                  = line starts with "="
//       * Empty                    = no text on line
//       * Data                     = anything else
// * this.owner = The Humdrum file object that the HumdrumLine object is contained in.
//

{% include humdrum-js/HumdrumLine-HumdrumLine.js -%}
{% include humdrum-js/HumdrumLine-clear.js -%}
{% include humdrum-js/HumdrumLine-parse.js -%}
{% include humdrum-js/HumdrumLine-stringify.js -%}
{% include humdrum-js/HumdrumLine-getText.js -%}
{% include humdrum-js/HumdrumLine-getToken.js -%}



