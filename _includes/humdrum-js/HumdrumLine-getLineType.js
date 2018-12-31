//////////////////////////////
//
// HumdrumLine::getLineType -- Return the primary line type category:

//    "Empty"              == line is empty
//    "RefRecord"          == line is a reference record
//    "UniversalRefRecord" == line is a universal reference record
//    "UniversalComment"   == line is a universal comment
//    "GlobalComment"      == line is a global comment
//    "Interpretation"     == line is an interpretation
//    "LocalComment"       == line is local comment
//    "Barline"            == line is a barline
//    "Data"               == line is a data line
//

HumdrumLine.prototype.getLineType = function () {
	if (this.lineType && (typeof this.lineType === "string" || this.lineType instanceof String)) {
		return this.lineType;
	} else {
		return "";
	}
};


//
// Convenience functions related to HumdrumLine::getLineType:
//

HumdrumLine.prototype.isEmpty              = function () { return this.getLineType() === "Empty"              }
HumdrumLine.prototype.isRefRecord          = function () { return this.getLineType() === "RefRecord"          }
HumdrumLine.prototype.isUniversalRefRecord = function () { return this.getLineType() === "UniversalRefRecord" }
HumdrumLine.prototype.isUniversalComment   = function () { return this.getLineType() === "UniversalComment"   }
HumdrumLine.prototype.isGlobalComment      = function () { return this.getLineType() === "GlobalComment"      }
HumdrumLine.prototype.isInterpretation     = function () { return this.getLineType() === "Interpretation"     }
HumdrumLine.prototype.isLocalComment       = function () { return this.getLineType() === "LocalComment"       }
HumdrumLine.prototype.isBarline            = function () { return this.getLineType() === "Barline"            }
HumdrumLine.prototype.isData               = function () { return this.getLineType() === "Data"               }

HumdrumLine.prototype.isComment   = function () { return this.getLineType().match(/Comment/)   ? true : false }
HumdrumLine.prototype.isUniversal = function () { return this.getLineType().match(/Universal/) ? true : false }
HumdrumLine.prototype.isRef       = function () { return this.getLineType().match(/RefRecord/) ? true : false }
HumdrumLine.prototype.isGlobal    = function () { return this.getText().match(/^!!/) ? true : false }



