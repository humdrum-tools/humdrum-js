---
title:  HumdrumLine object
github: https://github.com/humdrum-tools/humdrum-js/master/kern/_include/humdrum-js/HumdrumLine.js
breadcrumbs: objects
vim: ts=3 hlsearch ft=text
---

{% include header.html %}
{% include stylesheets/function.css %}
{% include docslot/docslot.html %}

The <span class="obj">HumdrumLine</span> object is an interface for
managing the contents of a Humdrum data line.  All events in all spines
that occur (or start) at the same time will be members of the same <span
class="obj">HumdrumLine</span>, so it represents a unique time instant
in the data.  If spines posses duration information, such as <span
class="exinterp">**kern</span> or <span class="exinterp">**recip</span>
data, then the Humdrum content can be rhythmically analyzed and a specific
timestamp assigned to the <span class="obj">HumdrumLine</span> (which
will be stored in the <span class="var">timestamp</span> property of the object).


A <span class="obj">HumdrumLine</span> object contains an array of
<span class="obj s">HumdrumToken</span> in its <span class="var
arr">fields</span> property.  If the line consists of a global
comment or reference record, <span class="var arr">fields</span>
will contain only one <span class="obj">HumdrumToken</span>
object representing the entire line; otherwise, the line will be
split into one or more spine tokens, each managed by a separate
<span class="obj">HumdrumToken</span> object stored in the <span
class="var">fields</span> array.  Empty lines are represented as a
single empty <span class="obj">HumdrumToken</span>.  Therefore, there
will always be at least one <span class="obj">HumdrumToken</span>
in an initialized <span class="obj">HumdrumLine</span> object's
<span class="var">fields</span> property.  Usually the <span
class="func">getToken</span> function should be used to access the <span
class="obj s">HumdrumToken</span> contained in the object.


# Functions #

{% include docslot/HumdrumLine_main.html %}



<br/>

# Line-type functions #

{% include docslot/HumdrumLine_linetypes.html %}


<br/>

# State variables #

These properties are used to manage the <span
class="obj">HumdrumLine</span> object.  Prefer using the above functions
to access or modify these variables unless you know what your are doing.

{% include docslot/HumdrumLine_variables.html %}



<br/>

# Private functions #

Here is a list of functions that are mostly intended for automatic
processing of the <span class="obj">HumdrumLine</span> object, so 
they should not be used in general.  These functions are mostly
used by
<span class="objfunc">HumdrumBase.parse</span> and
<span class="objfunc">HumdrumBase.stringify</span>.

{% include docslot/HumdrumLine_private.html %}


