---
title:  HumdrumBase object
github: https://github.com/humdrum-tools/humdrum-js/master/kern/_include/humdrum-js/HumdrumBase.js
breadcrumbs: objects
vim: ts=3 hlsearch ft=text
---

{% include header.html %}
{% include stylesheets/function.css %}
{% include docslot/docslot.html %}

The HumdrumBase object is an interface for basic processing of
Humdrum data.  The class can read Humdrum data from URLs, URIs,
elements, selectors, and text strings.  Data is first 
split into lines, which are stored in [HumdrumLine](../HumdrumLine)
objects, and HumdrumLines are futher split into [HumdrumToken](../HumdrumToken)
objects.



<br/>

# Primary functions #

{% include docslot/HumdrumBase_main.html %}



<br/>

# Reference Records #

{% include docslot/HumdrumBase_refs.html %}



<br/>

# Variables #

{% include docslot/HumdrumBase_variables.html %}



<br/>

# Private functions #

{% include docslot/HumdrumBase_private.html %}



