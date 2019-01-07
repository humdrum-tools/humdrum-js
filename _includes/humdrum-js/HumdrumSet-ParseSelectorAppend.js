//////////////////////////////
//
// HumdrumSet::ParseSelectorAppend -- Read multi-segment Humdrum file contents from the given selector.
//   Typically this should be from a Humdrum text script:
//      <script type="text/x-humdrum" id="mydata">
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
//   And the call would be ParseSelector("#mydata") in this case.
//   If there are multiple matches to the selector, then only the first
//   element that matches will be processed.
//

HumdrumSet.prototype.ParseSelectorAppend = function (selector, options) {
	if ((typeof selector !== "string") && !(selector instanceof String)) {
		console.log("Error: expecting a string for the selector:", selector, "but it is a", typeof selector);
		return this;
	}
	var element = document.querySelector(selector);
	if (!element) {
		console.log("Error: could not find an element for selector", selector);
		return this;
	}
	this.parseAppend(element.textContent, options);
	return this;
};



