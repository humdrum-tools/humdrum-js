//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/HumdrumBase.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains the HumdrumBase class for
// the Humdrum JS library.
//
//
// Functions defined in this file:
//
// * HumdrumBase::clear()                   = Intialize variables for object.
// * HumdrumBase::parse()                   = Create obj. from input string, URL, URI, element, selector.
// * HumdrumBase::getLineCount()            = Return the number of line records in data.
// * HumdrumBase::getLines()                = Return an array of all HumdrumLine objects contained in the object.
// * HumdrumBase::getLine()                 = Return a HumdrumLine object.
// * HumdrumBase::analyzeRefRecords()       = Create reference record database object.
// * HumdrumBase::stringify()               = Convert object to plain text.
//
//
// Functions that are wrappers for HumdrumReferences object, this.refs.
//     These functions ensure that the reference record database is initialized
//     before calling functions on the reference record database object.
//
// * HumdrumBase::getRefFirst()             = Get the first reference record matching key in data.
// * HumdrumBase::getRefAll()               = Get array of all keys of the given type.
// * HumdrumBase::getRefFirstExact()        = Get the first reference record that matches key plus qualifiers.
// * HumdrumBase::getRefAllExact()          = Get array of all keys of the given type that matches key plus qualifiers.
// * HumdrumBase::getAllRefs()              = Return a list of all references.
// * HumdrumBase::getRefs()                 = Return a list of all references that match key list.
// * HumdrumBase::getComposerRefs()         = Return list of refs related to composers.
// * HumdrumBase::getOpusRefs()             = Return list of refs related to work.
// * HumdrumBase::expandAtTemplate()        = Expand template with ref records.
//
//
// Private functions (general user should not need to use):
//
// * HumdrumBase::ParseUrl()                = Download data from URL.
// * HumdrumBase::ParseUriHumdrum()         = Download data from Humdrum URI.
// * HumdrumBase::ParseUriGithub()          = Download data from Github URI.
// * HumdrumBase::ParseText()               = Convert string to object contents.
// * HumdrumBase::ParseSelector()           = Extract data from element matching selector.
// * HumdrumBase::ParseElement()            = Extract data from element.
// * HumdrumBase::IsElement()               = Boolean test for HTML element.
//
//
// Properties of HumdrumLine object:
//
// * this.lines        = Array of data lines.
// * this.refs         = Object containing database of reference records in the file.
// * this.parseCounter = Counter to avoid possible infinite loops.
//


{% include humdrum-js/HumdrumBase-HumdrumBase.js -%}
{% include humdrum-js/HumdrumBase-clear.js -%}
{% include humdrum-js/HumdrumBase-stringify.js -%}
{% include humdrum-js/HumdrumBase-parse.js -%}
{% include humdrum-js/HumdrumBase-getLineCount.js -%}
{% include humdrum-js/HumdrumBase-getLine.js -%}
{% include humdrum-js/HumdrumBase-getLines.js -%}
{% include humdrum-js/HumdrumBase-analyzeRefRecords.js -%}

///////////////////////////////////////////////////////////////////////////
//
// Private functions for HumdrumBase.  These should not be necessary to use, but
//    javascript cannot enforce privacy.
//

{% include humdrum-js/HumdrumBase-ParseUrl.js -%}
{% include humdrum-js/HumdrumBase-ParseUriHumdrum.js -%}
{% include humdrum-js/HumdrumBase-ParseUriGithub.js -%}
{% include humdrum-js/HumdrumBase-ParseUriJrp.js -%}
{% include humdrum-js/HumdrumBase-ParseText.js -%}
{% include humdrum-js/HumdrumBase-ParseSelector.js -%}
{% include humdrum-js/HumdrumBase-ParseElement.js -%}
{% include humdrum-js/HumdrumBase-IsElement.js -%}
{% include humdrum-js/HumdrumBase-RefRecord-interface.js -%}



