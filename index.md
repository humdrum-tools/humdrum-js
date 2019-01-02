---
title: 
github:	"github: https://github.com/humdrum-tools/humdrum-js/master/kern/_include/humdrum-js"
vim:	ft=text
---
{% include header.html %}
{% include mainpage-toc.html %}

This website documents the humdrum-js library, which consists of several
[JavaScript objects](/object) for parsing digital music scores in the
Humdrum data format.

The parser and documentation on this website is currently under construction, but
you can use/view the source code for the full JavaScript code
[here](https://js.humdrum.org/scripts/humdrum.js) and the individual
components of the combined file [here](https://github.com/humdrum-tools/humdrum-js/tree/master/_includes/humdrum-js).

Try out the parse from this page by opening up the JavaScript console (either command/control-option/alt I, or
command/control-option/alt J), depending on your web browser and operating system.


To load a Humdrum file using the Github URI, then display the number of lines in the file and a list
of the reference records in the file:

```javascript
var myfile = new Humdrum("github://craigsapp/densmore-teton-sioux/kern/sioux155.krn");
console.log("Number of lines in file:", myfile.getLineCount());
console.log("Line 110 contains the text:", myfile.getLine(110).text);
console.log("Performer reference records:", myfile.analyzeRefRecords().getRefAll("MPN"));
```

You must copy and paste each line separately (at least the first line
separate from the other lines).  This is because the downloading process
needs to finished before trying to look at data in the score.  To do
a similar thing in a non-interactive manner, you can copy/paste this
entire block of code in one step:

```javascript
var myfile = new Humdrum("github://craigsapp/densmore-teton-sioux/kern/sioux155.krn");
myfile.onload = function () {
   console.log("Number of lines in file:", myfile.getLineCount());
   console.log("Line 110 contains the text:", myfile.getLine(110).text);
   console.log("Performer reference records:", myfile.analyzeRefRecords().getRefAll("MPN"));
};
```

The `onload` function is called when the data is finished downloading
and has been parsed.  Here is the results of copy-and-paste of the
above code block into the javascript console window (click to view in
higher resolution):

<a target="_blank" href="/images/demo1.png"><img style="width:100%" class="figure" src="/images/demo1.png"></a>

The <a target="_blank" href="https://github.com/craigsapp/densmore-teton-sioux/blob/57c0a3/kern/sioux115.krn#L112-L113">data file</a> contains two MPN reference records:

```
!!!MPN@@SIO: Oku'te
!!!MPN@ENG: Shooter
```

The bottom half of the above screen capture shows the parsing results
for the `MPN@@SIO` reference record, displaying the meaning of `MPN@@SIO`
as `Performer's name (in Siouan languages, original language)`, and
`status: "standard"` indicates that the reference record `MPN` is a
standard (official) reference record.


# Using humdrum-js on your webpage #

To use the Humdrum-js library on your webpage, add the following line to it:

```html
<script src="https://js.humdrum.org/scripts/humdrum.js"></script>
```

It is currently in an early state of development, but will be modeled off
of the <a target="_blank" href="https://humlib.humdrum.org">humlib C++
Humdrum parser</a>.


# Tutorials #

{% include tutorial-list.html %}



