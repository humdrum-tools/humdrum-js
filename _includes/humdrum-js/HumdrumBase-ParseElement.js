//////////////////////////////
//
// HumdrumBase::ParseElement -- read Humdrum file contents from an HTML element.
//   Typically this should be from a Humdrum text script:
//      <script type="text/x-humdrum">
//      **kern
//      1c
//      *-
//      </script>
//   To avoid interpretation of the contents as HTML element.
//   This function should not be called directly; use HumdrumBase::parse instead.
//

HumdrumBase.prototype.ParseElement = function (element, options) {
	this.clear();
	if (!this.IsElement(element)) {
		console.log("Error: Element is not an element, but a", typeof element, "for input", element);
		return;
	}
	this.parse(element.innerHTML, options);
	return this;
};



