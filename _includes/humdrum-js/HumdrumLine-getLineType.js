//////////////////////////////
//
// HumdrumLine::getLineType -- Return the primary line type category:
//
//    "Empty"              == line is empty
//    "RefRecord"          == line is a reference record
//    "UniversalRefRecord" == line is a universal reference record
//    "GlobalComment"      == line is a global comment
//    "Interpretation"     == line is an interpretation
//    "LocalComment"       == line is local comment
//    "Barline"            == line is a barline
//    "Data"               == line is a data line
//

HumdrumLine.prototype.getLineType = function () {
	if (this.lineStructure && this.lineStructure.lineType &&
			(typeof this.lineStructure.lineType === "string" || this.lineStructure.lineType instanceof String)) {
		return this.lineStructure.lineType;
	} else {
		return "";
	}
};


//
// Convenience functions related to HumdrumLine::getLineType.  Regular expressions are used,
// since the line type stirng will have an added subtype qualifier added later.
//

HumdrumLine.prototype.isEmpty              = function () { return this.getLineType().match(/^Empty/             )}
HumdrumLine.prototype.isRefRecord          = function () { return this.getLineType().match(/^RefRecord/         )}
HumdrumLine.prototype.isUniversalRefRecord = function () { return this.getLineType().match(/^UniversalRefRecord/)}
HumdrumLine.prototype.isGlobalComment      = function () { return this.getLineType().match(/^GlobalComment/     )}
HumdrumLine.prototype.isInterpretation     = function () { return this.getLineType().match(/^Interpretation/    )}
HumdrumLine.prototype.isLocalComment       = function () { return this.getLineType().match(/^LocalComment/      )}
HumdrumLine.prototype.isBarline            = function () { return this.getLineType().match(/^Barline/           )}
HumdrumLine.prototype.isData               = function () { return this.getLineType().match(/^Data/              )}

HumdrumLine.prototype.isComment   = function () { return this.getLineType().match(/Comment/)   ? true : false }
HumdrumLine.prototype.isRef       = function () { return this.getLineType().match(/RefRecord/) ? true : false }
HumdrumLine.prototype.isGlobal    = function () { return this.getText().match(/^!!/) ? true : false }



