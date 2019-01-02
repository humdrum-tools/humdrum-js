---
verovio: "true"
title: "Topics"
breadcrumbs: '[["/", "home"], ["/topic", "topics"]]'
github: https://github.com/humdrum-tools/humdrum-js
vim: ft=text ts=3
---

{% include header.html %}

<style>
footer {
	display: none;
}
section {
	min-height: 1000px;
}
table.chooser tr, table.chooser td {
	border: 0;
}
</style>

# Introduction #

This page demonstrates how to mix humdrum-js with the <a target="_blank"
href="https://plugins.humdrum.org">humdrum-notation-plugin</a>
library to download J.S. Bach chorales from <a target="_blank"
href="https://github.com/craigsapp/bach-370-chorales">this Github
repository</a>.


# Bach chorale navigator #

<table class="chooser">
<tr>
	<td>
		<div id="menu"></div>
	</td>
	<td>
	tonic:&nbsp;
		<select name="tonic" id="tonic">
			<option value="original">original</option>
			<option value="c-">C&flat;</option>
			<option value="c">C</option>
			<option value="c#">C&sharp;</option>
			<option value="d-">D&flat;</option>
			<option value="d">D</option>
			<option value="d#">D&sharp;</option>
			<option value="e-">E&flat;</option>
			<option value="e">E</option>
			<option value="e#">E&sharp;</option>
			<option value="f-">F&flat;</option>
			<option value="f">F</option>
			<option value="f#">F&sharp;</option>
			<option value="g-">G&flat;</option>
			<option value="g">G</option>
			<option value="g#">G&sharp;</option>
			<option value="a-">A&flat;</option>
			<option value="a">A</option>
			<option value="a#">A&sharp;</option>
			<option value="b-">B&flat;</option>
			<option value="b">B</option>
			<option value="b#">B&sharp;</option>
		</select>
	</td>
</tr>
</table>

<div id="main-container">
<script type="text/x-humdrum" id="main"></script>
</div>


<script>
var URIBASE = "github://craigsapp/bach-370-chorales";

document.addEventListener("DOMContentLoaded", function () {
	var index = new Humdrum();
	var uri = URIBASE + "/index.hmd";
	index.onload = function () {
		buildMenu(index);
		displayNotation("kern/chor001.krn", "original");
	};
	index.parse(uri);
});


document.addEventListener("DOMContentLoaded", function () {
	var tselect = document.querySelector("#tonic");
	tselect.addEventListener("change", function () {

		var selector = document.querySelector("#menu select");
		var gfile = selector[selector.selectedIndex].value;

		var tonic = document.querySelector("#tonic");
		var tonicvalue = tonic[tonic.selectedIndex].value;

		displayNotation(gfile, tonicvalue);
	});

});


//////////////////////////////
//
// buildMenu --
//

function buildMenu(index) {
	var i;
	var smenu = document.querySelector("#menu");
	var output = '<select name="chorale" id="sel">';
	for (i=0; i<index.getLineCount(); i++) {
		if (!index.getLine(i).isData()) {
			continue;
		}
		var file = index.getToken(i, 0).getText(); // hard-coded to 0 for now.
		var title = index.getToken(i, 4).getText(); // hard-coded to 4 for now.
		output += "<option value='" + file + "'>" + title + "</option>\n";
	}
	output += "</select>";
	smenu.innerHTML = output;
	smenu.addEventListener("change", function (event) {
		var selector = document.querySelector("#menu select");
		var gfile = selector[selector.selectedIndex].value;

		var tonic = document.querySelector("#tonic");
		var tonicvalue = tonic[tonic.selectedIndex].value;

		displayNotation(gfile, tonicvalue);
	});
}


//////////////////////////////
//
// displayNotation --
//

function displayNotation(filename, tonic) {
	var filebase = filename.replace(/\.[^.]*$/, "").replace(/.*\//, "");
	var script = document.querySelector("#" + filebase);
	var filter = "satb2gs";
	if (tonic.length < 4) {
		filter += " | ";
		filter += " transpose -k " + tonic;
	}
	if (!script) {
		prepareExample(filename, tonic);
	} else {
		var entry = HNP.entries["main"];
		if (entry) {
			var opts = entry.optinos;
			if (opts) {
				opts.soure = filebase;
			}
		}
		displayHumdrum({
			source: filebase,
			target: "main",
			scale: 32,
			filter: filter,
			header: true
		});
	}
}



/////////////////////////////
//
// prepareExample --
//

function prepareExample(filename, tonic) {
	var filebase = filename.replace(/\.[^.]*$/, "").replace(/.*\//, "");
	var downloader = new Humdrum;
	downloader.onload = function (x) {
		// Create a new script and insert the downloaded text into it.
		// Then call displayNotation again.
		var text = x.stringify();
		if (!text) {
			return;
		}
		var script = document.createElement("script");
		script.setAttribute("type", "text/x-humdrum");
		script.setAttribute("id", filebase);
		script.textContent = text;
		document.body.appendChild(script);
		displayNotation(filename, tonic);
	};
	downloader.parse(URIBASE + "/" + filename);
}




</script>

