//////////////////////////////
//
// HumdrumSet::ParseElementAppend -- read a multi-segment Humdrum file contents from an HTML element.
//   Typically this should be from a Humdrum text script:
//      <script type="text/x-humdrum">
//      **kern
//      1c
//      *-
//      **kern
//      1d
//      *-
//      **kern
//      1e
//      *-
//      </script>
//   To avoid interpretation of the contents as HTML element.
//   This function should not be called directly; use HumdrumSet::parseAppend instead.
//

HumdrumSet.prototype.ParseElementAppend = function (element, options) {
	if (!this.IsElement(element)) {
		console.log("Error: Element is not an element, but a", typeof element, "for input", element);
		return;
	}
	this.parseAppend(element.textContent, options);
	return this;
};



