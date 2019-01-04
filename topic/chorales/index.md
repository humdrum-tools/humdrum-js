---
verovio: "true"
title: "Bach chorale typesetter"
breadcrumbs: '[["/", "home"], ["/topic", "topics"]]'
github: https://github.com/humdrum-tools/humdrum-js
vim: ts=3
---

{% include header.html %}

# Introduction #

This page demonstrates how to mix <a target="_blank"
href="https://js.humdrum.org">humdrum-js</a> with the <a target="_blank"
href="https://plugins.humdrum.org">humdrum-notation-plugin</a>
library to download J.S. Bach chorales from <a target="_blank"
href="https://github.com/craigsapp/bach-370-chorales">this Github
repository</a> and dynamically generate notation based on the option
settings from the following menus.  View the <a target="_blank"
href="https://raw.githubusercontent.com/humdrum-tools/humdrum-js/master/topic/chorales/index.md">pages's
source code</a> to see how the typesetter is implemented.

Keyboard shortcuts: the left/right arrows navigate through the
chorale list (or you can click on the title menu to choose one at
random).  Keys 1-7 transpose tonic from C to B. Digit 0 returns
choral to original pitch.  Click on the <span class="button
demo">Save</span> button to download the currently viewed notation
as an SVG image.  You can also copy-and-paste the text in the black
box to the right into a webpage to display the same notation dynamically 
on your webpage.


<span class="button right" onclick="saveChoraleSvg()">Save</span>
# Bach chorale typesetter #

<style>

@media print, screen and (max-width: 800px) {
	#right-side{
		display: none;
	}
}


#right-side {
	position: absolute;
	right: -310px;
	top: 250px;
	overflow: hidden;
	max-height: 600px;
	min-height: 300px;
	max-height: 600px;
	width:300px;
}
pretransparent code.transparent {
	background-color: transparent !important;
}
code#example {
	color: cyan !important;
	font-weight: bold;
}
pre.narrow, code.narrow {
	font-size: 0.8rem;
	width:100%;
	height: 100%;
	overflow: scroll;
	padding: 0;
	margin: 0;
	scrollbar-color: #000;
}
pre.narrow::-webkit-scrollbar, code.narrow::-webkit-scrollbar {
	width: 0px;
	height: 0px;
}
</style>
<div style="padding-bottom:50px;" id="right-side">
HTML code for music example:
<pre style="padding-bottom:-9px;" class="narrow html">
<code id="x590">&lt;html&gt;
&lt;head&gt;
&lt;title&gt;My Example&lt;/title&gt;
&lt;script src="https://verovio-script.humdrum.org/scripts/verovio-toolkit.js"&gt;&lt;/script&gt;
&lt;script src="https://plugin.humdrum.org/scripts/humdrum-notation-plugin.js"&gt;&lt;/script&gt;
&lt;script&gt;var vrvToolkit = new verovio.toolkit()&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div style="width:590px"&gt;</code></pre>
<pre style="margin-top:-8px; padding-top:4px;" class="javascript narrow">
<code id="example" class="html">









</code></pre>
<pre style="margin-top:-8px;" class="narrow html">
<code>&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p style="padding-top:10px; padding:5px; margin:-5px; inline-block; font-size:0.7rem; line-height: 0.9rem !important;">
Copy & paste the above HTML text into your own webpage.  Copy the
text in all three black boxes above to create a new webpage, or
copy only the middle box's text if you already have the Humdrum
notation plugin setup in your page.  The width of the music notation
on this page is 590 pixels, so when placing in a containing element
that is 590 pixels, the layout will match the one for the music on
this page. Adjust the following slider to change the target width
for the HTML example:
<span class="range">
	<input style="width:300px;" class="myform" id="targetWidth" type="range" min="100" max="1500" value="590">
</span>
</p>
</div>

<table style="margin-left:-27px;" class="chooser">
	<tr>
		<th> Title </th>
		<th> Tonic </th>
		<th> Octave </th>
		<th> Staves </th>
	</tr>
	<tr>
		<td>
			<div id="title-menu"></div>
		</td>

		<td>
			<select class="myform" id="tonic">
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
			<select class="myform" id="octave">
				<option value="1">+1</option>
				<option selected value="0">0</option>
				<option value="-1">-1</option>
			</select>
		</td>

		<td>
			<select class="myform" id="staves">
				<option value="gs">GS</option>
				<option value="satb">SATB</option>
			</select>
		</td>

	</tr>

	<tr>
		<td colspan="4">
			<span style="display:block" id="measures">
				Measures:
				<select class="myform" id="barbegin">
					<option value="0">beginning</option>
					<option value="$">end</option>
				</select>
				to 
				<select class="myform" id="barend">
					<option value="0">beginning</option>
					<option selected value="$">end</option>
				</select>
			</span>
			<span style="white-space:nowrap;" id="spacing">
				Musical spacing:
				<span class="range">
					<input style="width:200px;" class="myform" id="spacingLinear" type="range" min="10" max="60" value="25">
				</span>
				<span class="range">
					<input style="width:200px;" class="myform" id="spacingNonLinear" type="range" min="30" max="80" value="60">
				</span>
			</span>
		</td>
	</tr>
	<tr>
		<td colspan="4">
			<span style="white-space:nowrap; padding-left:10px;">
				Title:&nbsp;<input class="myform" checked type="checkbox" id="showTitle" value="yes">
			</span>
			<span style="white-space:nowrap; padding-left:10px;">
				Size:
				<span style="display:inline-block; position:relative; top:3px;">
					<input style="width:80px;" class="myform" id="size" type="range" min="10" max="60" value="32">
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
var CURRENTWORK = new Humdrum();

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
	var forms = document.querySelectorAll(".myform");
	for (var i=0; i<forms.length; i++) {
		forms[i].addEventListener("change", generateNotationFromOptions);
	}
});



//////////////////////////////
//
// generateNotationFromOptions -- Read the display options 
//    from the webpage and then display based on those options.
//

function generateNotationFromOptions() {
	var forms = document.querySelectorAll(".myform");
	var options = {};
	for (var i=0; i<forms.length; i++) {
		var name = forms[i].id;
		if (!name) {
			continue;
		}
		if (forms[i].type == "checkbox") {
			options[name] = forms[i].checked;
		} else {
			options[name] = forms[i].value;
		}
		
	}
	displayNotation(options);
};



//////////////////////////////
//
// buildTitleMenu -- Create a selection list of titles
//   and filenames from the downloaded index file.
//

function buildTitleMenu(index) {
	var titleMenu = document.querySelector("#title-menu");
	var output = '<select class="myform" name="chorale" id="file">';
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

function displayNotation(opts) {
console.log("opts", opts);
	var filebase = opts.file.replace(/\.[^.]*$/, "").replace(/.*\//, "");
	var script = document.querySelector("#" + filebase);
	var filter = "";
	var swapper;
	if ((typeof opts.barbegin != "undefined") && (typeof opts.barend != "undefined")) {
		if (opts.barbegin == "0" && opts.barend == "$") {
			// the entire piece, so do not extract measures
		} else {
			filter += filter ? " | " : "";
			if (opts.barbegin === opts.barend) {
				filter += "myank -m " + opts.barbegin;
			} else {
				var starting = opts.barbegin;
				var ending = opts.barend;
				if (ending === "$") {
					// this is good
				} else if (starting === "$") {
					// this is bad: swap them
					swapper = ending;
					ending = starting;
					starting = swapper;
				} else {
					if (parseInt(starting) > parseInt(ending)) {
						swapper = ending;
						ending = starting;
						starting = swapper;
					}
				}
				filter += "myank -m " + starting + "-" + ending;
			}
		}
	}
	if (opts.staves.toUpperCase() === "GS") {
		filter += filter ? " | " : "";
		filter += "satb2gs";
	}
	if (opts.tonic.toUpperCase() !== "ORIGINAL") {
		filter += filter ? " | " : "";
		filter += "transpose -k " + opts.tonic;
	}
	opts.octave = parseInt(opts.octave) * 40;
	if (opts.octave) {
		filter += filter ? " | " : "";
		filter += "transpose -b " + opts.octave;
	}
	if (!script) {
		prepareExample(opts.file, opts.tonic);
	} else {
		var options = {
			source: filebase,
			target: "main",
			scale: 32,
			filter: filter,
			header: opts.showTitle ? true : false
		};
		if (opts.spacingLinear) {
			options.spacingLinear = parseInt(opts.spacingLinear) / 100.0;
		}
		if (opts.spacingNonLinear) {
			options.spacingNonLinear = parseInt(opts.spacingNonLinear) / 100.0;
		}
		if (size) {
			options.scale = parseInt(opts.size);
		}
		options.spacingStaff = filter.match(/satb/) ? 6 : 10;
		options.appendText = "!!!header-left: @{SCT}";
		options.targetWidth = opts.targetWidth;
		options.file = opts.file;
		displayHumdrum(options);
		printExampleCode(options);
		loadCurrentWork();
	}
}



//////////////////////////////
//
// loadCurrentWork --
//

function loadCurrentWork() {
	var element = document.querySelector("#main-humdrum");
	var text = element.textContent;
	CURRENTWORK.parse(text);
	var measures = CURRENTWORK.getMeasureNumbers();
	if (measures.length == 0) {
		return;
	}
	measures[measures.length - 1] = "$";
	var pickup = CURRENTWORK.hasPickup();
	if (pickup) {
		measures.unshift(0);
	}
	var barbegin = document.querySelector("#barbegin");
	var barend = document.querySelector("#barend");
	if (!barbegin || !barend) {
		return;
	}
	var output = "";
	for (var i=0; i<measures.length; i++) {
		if (i == 0) {
			output += '<option value="0">beginning</option>\n';
		} else if (measures[i] === "$") {
			output += '<option value="$">end</option>\n';
		} else {
			output += '<option value="' + measures[i] + '">' + measures[i] + '</option>\n';
		}
	}

	var bbindex = barbegin.selectedIndex;
	var beindex = barend.selectedIndex;
	if (bbindex > beindex) {
		var temp = beindex;
		beindex = bbindex;
		bbindex = temp;
	}
	var endindex = barbegin.length - 1;

	if (beindex == endindex) {
		beindex = measures.length - 1;
	}
	if (bbindex == endindex) {
		bbindex = measures.length - 1;
	}
	if (beindex > measures.length - 1) {
		beindex = measures.length - 1;
	}
	if (bbindex > measures.length - 1) {
		bbindex = measures.length - 1;
	}
	
	barbegin.innerHTML = output;
	barend.innerHTML = output;
	barbegin.selectedIndex = bbindex;
	barend.selectedIndex = beindex;
}



/////////////////////////////
//
// printExampleCode
//

function printExampleCode(opts) {
	var example = document.querySelector("#example");
	if (!example) {
		return;
	}
	var exampleid = getExampleId();
	var output = "";
	output += "<script" + ">displayHumdrum({\n";
   output += '   source: "' + exampleid + '",\n';
	if (opts.scale) {
		output += "   scale: " + parseInt(parseInt(opts.scale) * parseInt(opts.targetWidth) / 590.0) + ",\n";
	}
	if (opts.spacingLinear != 0.25) {
		output += "   spacingLinear: " + opts.spacingLinear + ",\n";
	}
	if (opts.spacingNonLinear != 0.6) {
		output += "   spacingNonLinear: " + opts.spacingNonLinear + ",\n";
	}
	if (opts.header) {
   	output += "   header: true,\n";
		if (opts.appendText) {
   		output += '   appendText: "' + opts.appendText + '",\n';
		}
	}
	if (opts.spacingStaff) {
		output += "   spacingStaff: " + opts.spacingStaff + ",\n";
	}
	if (opts.filter) {
		output += '   filter: "' + opts.filter + '",\n';
	}
   output += '   uri: "github://craigsapp/bach-370-chorales/' + opts.file + '"\n';
   output += "})";
	output += "</script" + ">\n";
	output += '<script id="' + exampleid + '" type="text/x-humdrum"><';
	output += '/script>';
	example.textContent = output;

	var x590 = document.querySelector("#x590");
	if (x590) {
		x590.textContent = x590.textContent.replace(/width:\d+px/, "width:" + opts.targetWidth + "px");
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
			getAdjacentFiles();
		};
		downloader.parse(URIBASE + "/" + filename);
	}
}



////////////////////
//
// getAdjacentFiles -- preload files so that sequential access to scores is sped up.
//

function getAdjacentFiles() {
	var selection = document.querySelector("#file");
	if (!selection) {
		return;
	}
	var index = selection.selectedIndex;
	var len = selection.length;
	var above = index == len-1 ? 0 : index + 1;
	var below = index == 0 ? len-1 : index - 1;
	preFetch(selection[above].value);
	preFetch(selection[below].value);
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
	var selection = document.querySelector("#file");
	if (!selection) {
		return;
	}
	var index = selection.selectedIndex;
	var len = selection.length;
	var newindex = index;

	if (event.key === "ArrowRight") {
		newindex = index == len-1 ? 0 : index + 1;
	} else if (event.key === "ArrowLeft") {
		newindex = index == 0 ? len-1 : index - 1;
	} else if (event.key === "ArrowUp") {
		newindex = index == 0 ? len-1 : index - 1;
	} else if (event.key === "ArrowDown") {
		newindex = index == len-1 ? 0 : index + 1;
	} else {
		// check for transposition: 1=c, 2=d, 3=e, 0=original
		var newkey = -1
		if (event.key === "1") {
			newkey = 2;   // c
		} else if (event.key === "2") {
			newkey = 5;   // d
		} else if (event.key === "3") {
			newkey = 8;   // e
		} else if (event.key === "4") {
			newkey = 11;   // f
		} else if (event.key === "5") {
			newkey = 14;   // g
		} else if (event.key === "6") {
			newkey = 17;   // a
		} else if (event.key === "7") {
			newkey = 20;   // b
		} else if (event.key === "0") {
			newkey = 0;   // original
		}
		if (newkey >= 0) {
			var tselect = document.querySelector("#tonic");
			if (tselect) {
				event.preventDefault();
				tselect.selectedIndex = newkey;
				generateNotationFromOptions();
			}
		}
		return;
	}
	event.preventDefault();
	selection.selectedIndex = newindex;
	generateNotationFromOptions();
});



//////////////////////////////
//
// getExampleId --
//

function getExampleId() {
	var output = "";

	var fileSelect = document.querySelector("#file");
	var file = fileSelect[fileSelect.selectedIndex].value;
	var tonicSelect = document.querySelector("#tonic");
	var tonic = tonicSelect[tonicSelect.selectedIndex].value;
	var octaveSelect = document.querySelector("#octave");
	var octave = octaveSelect[octaveSelect.selectedIndex].value;
	var staffSelect = document.querySelector("#staves");
	var staves = staffSelect[staffSelect.selectedIndex].value;

	// Construct a filename based on the options:
	if (!file) {
		return "unknown";
	}
	var matches = file.match(/(chor\d+)/);
	if (!matches) {
		return "unknown";
	}
	output = matches[1];
	if (tonic.toUpperCase() !== "ORIGINAL") {
		output += "-" + tonic.replace("-", "flat").replace("#", "sharp");
	}
	octave = parseInt(octave);
	if (octave) {
		if (octave > 0) {
			output += "-up";
		}
		if (octave < 0) {
			output += "-down";
		}
	}
	if (staves.toUpperCase() === "SATB") {
		output += "-satb";
	}
	return output;
}



//////////////////////////////
//
// saveChoraleSvg --
//

function saveChoraleSvg() {
	var filename = getExampleId() + ".svg";
	saveHumdrumSvg("main", filename);
}


</script>



<!-- ---------- STYLES for page ---------- -->

<style>
nav {
	display: none;
}
footer {
	display: none;
}
section {
	margin-left: -100px;
}
@media print, screen and (max-width: 1060px) {
	section {
		margin-left: 0px;
	}
}
body section {
	min-height: 1200px !important;
	min-width: 590px !important;
}
table.chooser tr, table.chooser td {
	border: 0;
	padding: 0px 3px;
	text-align: center;
}
</style>

<!-- option men  styles -->

<style>

span.range {
	display: inline-block; 
	position: relative; 
	top: 3px;
}

</style>


<!--  styling for save button: -->

<style>

span.button {
   background: #aa0000;
   border-radius: 1rem;
   font-family: Arial;
   color: #fafafa;
   font-size: 1rem;
   padding: 0px 5px 0px 5px;
   text-decoration: none;
   margin-left: 1px;
   margin-right: 1px;
}
span.button.demo {
   font-size: 0.80rem;
   padding: 0px 4px 0px 4px;
}

span.right {
   display: block;
   float: right;
}

span.button:hover:not(.demo) {
   background: #009900;
   text-shadow: 0px 0px 3px #00ff00;
   box-shadow: 0px 0px 14px #008800;
   cursor: pointer;
}

span.button.demo:hover {
   cursor: default;
}

</style>
