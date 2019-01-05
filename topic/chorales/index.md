---
verovio: "true"
title: "Bach chorale typesetter"
breadcrumbs: '[["/", "home"], ["/topic", "topics"]]'
github: https://github.com/humdrum-tools/humdrum-js/tree/master/topic/chorales
vim: ts=3
---

{% include header.html %}


This page demonstrates how to mix <a target="_blank"
href="https://js.humdrum.org">humdrum-js</a> with the <a target="_blank"
href="https://plugin.humdrum.org">humdrum-notation-plugin</a>
library to download J.S. Bach chorales from <a target="_blank"
href="https://github.com/craigsapp/bach-370-chorales">this
Github repository</a> and dynamically generate notation based on
the option settings from the following menus.  View the <a target="_blank"
href="https://github.com/humdrum-tools/humdrum-js/tree/master/topic/chorales">page's
source code</a> to see how the typesetter is implemented.


<hr noshade>

{% include_relative right-side.html %}
{% include_relative typesetting-options.html %}

<hr noshade>


<div id="main-container">
<!-- the SVG notation will be inserted here -->
<script type="text/x-humdrum" id="main"></script>
</div>

{% include_relative typesetter.html %}
{% include_relative styles-local.html %}



