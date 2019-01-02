---
verovio: "true"
title: "Topics"
breadcrumbs: '[["/", "home"], ["/topic", "topics"]]'
github: https://github.com/humdrum-tools/humdrum-js
vim: ft=text ts=3
---

{% include header.html %}
{% include_relative style-local.html %}

# Introduction #

This page demonstrates how to mix humdrum-js with the <a target="_blank"
href="https://plugins.humdrum.org">humdrum-notation-plugin</a>
library to download J.S. Bach chorales from <a target="_blank"
href="https://github.com/craigsapp/bach-370-chorales">this
Github repository</a> and dynamically generate notation based on
the option settings from the following menus.  View the <a target="_blank"
href="https://raw.githubusercontent.com/humdrum-tools/humdrum-js/master/topic/chorales/index.md">pages's
source code</a> to see how the navigator is implemented.


<span class="button right" onclick="saveChoraleSvg()">Save</span>
# Bach chorale typesetter #

<table style="margin-left:-27px;" class="chooser">
	<tr>
		<th> Title </th>
		<th> Tonic </th>
		<th> Octave </th>
		<th> Staves </th>
	</tr>
	<tr>
		<td>
			<div id="menu"></div>
		</td>

		<td>
			<select id="tonic">
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

		<td>
			<select id="octave">
				<option value="1">+1</option>
				<option selected value="0">0</option>
				<option value="-1">-1</option>
			</select>
		</td>

		<td>
			<select id="staves">
				<option value="gs">GS</option>
				<option value="satb">SATB</option>
			</select>
		</td>

	</tr>

	<tr>
		<td colspan="4">
			<span style="display:none" id="measures">
				Measures:
				<select id="barbegin">
					<option value="0">beginning</option>
					<option value="$">end</option>
				</select>
				to 
				<select id="barend">
					<option value="0">beginning</option>
					<option selected value="$">end</option>
				</select>
			</span>
			<span style="white-space:nowrap;" id="spacing">
				Musical spacing:
				<span class="range">
					<input style="width:200px;" id="spacingLinear" type="range" min="10" max="60" value="25">
				</span>
				<span class="range">
					<input style="width:200px;" id="spacingNonLinear" type="range" min="30" max="80" value="60">
				</span>
			</span>
		</td>
	</tr>
	<tr>
		<td colspan="4">
			<span style="white-space:nowrap; padding-left:10px;">
				Title:&nbsp;<input checked type="checkbox" id="title" value="yes">
			</span>
			<span style="white-space:nowrap; padding-left:10px;">
				Size:
				<span style="display:inline-block; position:relative; top:3px;">
					<input style="width:80px;" id="size" type="range" min="10" max="60" value="32">
				</span>
			</span>

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

	if (sessionStorage.index) {
			index.parse(sessionStorage.index);
			buildTitleMenu(index);
			generateNotationFromOptions();
	} else {
		var uri = URIBASE + "/index.hmd";
		index.onload = function (x) {
			buildTitleMenu(index);
			generateNotationFromOptions();
			sessionStorage.index = x.stringify();
		};
		index.parse(uri);
	}

	// add event listeners for static form fields:
	var tonicSelect = document.querySelector("#tonic");
	var octaveSelect = document.querySelector("#octave");
	var staffSelect = document.querySelector("#staves");
	var spacingLinearSelect = document.querySelector("#spacingLinear");
	var spacingNonLinearSelect = document.querySelector("#spacingNonLinear");
	var titleCheck = document.querySelector("#title");
	var sizeSelect = document.querySelector("#size");

	tonicSelect.addEventListener("change", generateNotationFromOptions);
	octaveSelect.addEventListener("change", generateNotationFromOptions);
	staffSelect.addEventListener("change", generateNotationFromOptions);
	spacingLinearSelect.addEventListener("change", generateNotationFromOptions);
	spacingNonLinearSelect.addEventListener("change", generateNotationFromOptions);
	titleCheck.addEventListener("change", generateNotationFromOptions);
	sizeSelect.addEventListener("change", generateNotationFromOptions);
});



//////////////////////////////
//
// generateNotationFromOptions -- Read the display options 
//    from the webpage and then display based on those options.
//

function generateNotationFromOptions () {
	var fileSelect = document.querySelector("#menu select");
	var file = fileSelect[fileSelect.selectedIndex].value;
	var tonicSelect = document.querySelector("#tonic");
	var tonic = tonicSelect[tonicSelect.selectedIndex].value;
	var octaveSelect = document.querySelector("#octave");
	var octave = octaveSelect[octaveSelect.selectedIndex].value;
	var staffSelect = document.querySelector("#staves");
	var staves = staffSelect[staffSelect.selectedIndex].value;
	var spacingLinearInput = document.querySelector("#spacingLinear");
	var spacingLinear = spacingLinearInput.value;
	var spacingNonLinearInput = document.querySelector("#spacingNonLinear");
	var spacingNonLinear = spacingNonLinearInput.value;
	var titleCheck = document.querySelector("#title");
	var showTitle = titleCheck.checked;
	var sizeSelect = document.querySelector("#size");
	var size = sizeSelect.value;
	displayNotation(file, tonic, octave, staves, spacingLinear, spacingNonLinear, showTitle, size);
};



//////////////////////////////
//
// buildTitleMenu -- Create a selection list of titles
//   and filenames from the downloaded index file.
//

function buildTitleMenu(index) {
	var titleMenu = document.querySelector("#menu");
	var output = '<select name="chorale" id="sel">';
	for (var i=0; i<index.getLineCount(); i++) {
		if (!index.getLine(i).isData()) {
			continue;
		}

		// Hard-coded to field index 4 for now. Eventually this will be:
		// var file = index.getTokenText(i, "**file");
		var file = index.getToken(i, 0).getText(); 

		// Hard-coded to field index 4 for now. Eventually this will be:
		// var title = index.getTokenText(i, "**description");
		var title = index.getToken(i, 4).getText(); // hard-coded to 4 for now.

		output += "<option value='" + file + "'>" + title + "</option>\n";
	}
	output += "</select>";
	titleMenu.innerHTML = output;
	titleMenu.addEventListener("change", generateNotationFromOptions);
}



//////////////////////////////
//
// displayNotation -- Build the needed filter command based
//  on the tonic and octave options, then generate the
//  notation of specified work.
//

function displayNotation(filename, tonic, octave, staves, spacingLinear, 
		spacingNonLinear, showTitle, size) {
	var filebase = filename.replace(/\.[^.]*$/, "").replace(/.*\//, "");
	var script = document.querySelector("#" + filebase);
	var filter = "";
	if (staves.toUpperCase() === "GS") {
		filter += "satb2gs";
	}
	if (tonic.toUpperCase() !== "ORIGINAL") {
		filter += filter ? " | " : "";
		filter += "transpose -k " + tonic;
	}
	octave = parseInt(octave) * 40;
	if (octave) {
		filter += filter ? " | " : "";
		filter += "transpose -b " + octave;
	}
	if (!script) {
		prepareExample(filename, tonic);
	} else {
		var options = {
			source: filebase,
			target: "main",
			scale: 32,
			filter: filter,
			header: showTitle
		};
		if (spacingLinear) {
			options.spacingLinear = parseInt(spacingLinear) / 100.0;
		}
		if (spacingNonLinear) {
			options.spacingNonLinear = parseInt(spacingNonLinear) / 100.0;
		}
		if (size) {
			options.scale = parseInt(size) / 100.0;
		}
		options.spacingStaff = filter.match(/satb/) ? 6 : 10;
		displayHumdrum(options);
	}
}



/////////////////////////////
//
// prepareExample --
//

function prepareExample(filename) {
	var filebase = filename.replace(/\.[^.]*$/, "").replace(/.*\//, "");
	var teste = document.querySelector("#" + filebase);
	if (teste) {
		return;
	}
	if (sessionStorage[filebase]) {
			var script = document.createElement("script");
			script.setAttribute("type", "text/x-humdrum");
			script.setAttribute("id", filebase);
			script.textContent = sessionStorage[filebase];
			document.body.appendChild(script);
			generateNotationFromOptions();
	} else {
		var downloader = new Humdrum;
		downloader.onload = function (x) {
			// Create a new script and insert the downloaded text into it.
			// Then call displayNotation again.
			var text = x.stringify();
			if (!text) {
				console.log("Error downloading", filename);
				return;
			}
			var script = document.createElement("script");
			script.setAttribute("type", "text/x-humdrum");
			script.setAttribute("id", filebase);
			script.textContent = text;
			document.body.appendChild(script);
			generateNotationFromOptions();
		};
		downloader.parse(URIBASE + "/" + filename);
	}
}



/////////////////////////////
//
// preFetch --
//

function preFetch(filename) {
	var filebase = filename.replace(/\.[^.]*$/, "").replace(/.*\//, "");
	var teste = document.querySelector("#" + filebase);
	if (teste) {
		// already fetched
		return;
	}
	if (sessionStorage[filebase]) {
		// already fetched
		return;
	} else {
		var downloader = new Humdrum;
		downloader.onload = function (x) {
			var text = x.stringify();
			if (!text) {
				console.log("Error downloading", filename);
				return;
			}
			sessionStorage[filename] = text;
		};
		downloader.parse(URIBASE + "/" + filename);
	}
}



//////////////////////////////
//
// Keydown event listener -- 
//

window.addEventListener("keydown", function (event) {
	console.log(event);
});


//////////////////////////////
//
// saveChoraleSvg --
//

function saveChoraleSvg() {
	var fileSelect = document.querySelector("#menu select");
	var file = fileSelect[fileSelect.selectedIndex].value;
	var tonicSelect = document.querySelector("#tonic");
	var tonic = tonicSelect[tonicSelect.selectedIndex].value;
	var octaveSelect = document.querySelector("#octave");
	var octave = octaveSelect[octaveSelect.selectedIndex].value;
	var staffSelect = document.querySelector("#staves");
	var staves = staffSelect[staffSelect.selectedIndex].value;

	// Construct a filename based on the options:
	if (!file) {
		return;
	}
	var matches = file.match(/(chor\d+)/);
	if (!matches) {
		return;
	}
	filename = matches[1];
	if (tonic.toUpperCase() !== "ORIGINAL") {
		filename += "-" + tonic.replace("-", "flat").replace("#", "sharp");
	}
	octave = parseInt(octave);
	if (octave) {
		if (octave > 0) {
			filename += "-up";
		}
		if (octave < 0) {
			filename += "-down";
		}
	}
	if (staves.toUpperCase() === "SATB") {
		filename += "-satb";
	}

	filename += ".svg";
	console.log("FILENAME", filename);
	saveHumdrumSvg("main", filename);
}


</script>

