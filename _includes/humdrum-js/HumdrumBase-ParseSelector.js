//////////////////////////////
//
// HumdrumBase::ParseSelector -- Read Humdrum file contents from the given selector.
//   Typically this should be from a Humdrum text script:
//      <script type="text/x-humdrum" id="mydata">
//      **kern
//      1c
//      *-
//      </script>
//   And the call would be ParseSelector("#mydata") in this case.
//   If there are multiple matches to the selector, then only the first
//   element that matches will be processed.
//

HumdrumBase.prototype.ParseSelector = function (selector, options) {
	this.clear();
	if ((typeof selector !== "string") && !(selector instanceof String)) {
		console.log("Error: expecting a string for the selector:", selector, "but it is a", typeof selector);
		return this;
	}
	var element = document.querySelector(selector);
	if (!element) {
		console.log("Error: could not find an element for selector", selector);
		return this;
	}
	this.parse(element.textContent, options);
	return this;
};



