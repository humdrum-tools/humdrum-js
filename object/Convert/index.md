---
title:  Convert object
github: https://github.com/humdrum-tools/humdrum-js/master/kern/_include/humdrum-js/Convert.js
breadcrumbs: objects
vim: ts=3 hlsearch ft=text
---

{% include header.html %}
{% include stylesheets/function.css %}
{% include docslot/docslot.html %}

The <span class="obj">Convert</span> object manages conversions between
different datatypes for the humdrum-js library.  It is inherited by <span
class="obj">HumdrumToken</span>, <span class="obj">HumdrumLine</span>, and
<span class="obj">HumdrumBase</span> for internal use in those objects.
If you want to use the <span class="obj">Convert</span> functions
directly, there are two primary methods:

The first method is to call the prototype functions of <span
class="obj">Convert</span> directly, such as:

```javascript
Convert.prototype.csvToTsv('a,b,c,d')
```

The second method is to create a <span class="obj">Convert</span> object
and then use its prototype functions directly through that object:

```javascript
var converter = new Convert();
converter.csvToTsv('a,b,c,d')
```

An alternative third method is to call the prototype functions indirectly
through an object that inherits from <span class="obj">Convert</span>:

```javascript
var line = new HumdrumLine();
line.csvToTsv('a,b,c,d')
```

However, this last way of accessing the functions is dangerous,
since it is possible that the objects inheriting from <span
class="obj">Convert</span> may re-define the function names for their
own purposes, thus shadowing the original <span class="obj">Convert</span>
prototypes.


# Functions #

{% include docslot/Convert_main.html %}


<br/>

# Private functions #

These functions are helper functions for the main set of functions.
In general they will not be interesting to use in isolation.

{% include docslot/Convert_private.html %}





