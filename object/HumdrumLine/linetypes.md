
{% capture linetable %}

value	             | meaning
---------------------|----------------------------------------------
`Empty`              | An empty line.
`RefRecord`          | A reference record, which has the form `!!!key: value`.
`UniversalRefRecord` | A reference record, which has the form `!!!!key: value`, which applies to multiple data segments in a <span class="obj">HumdrumSet</span>.
`GlobalComment`      | A line starting with `!!` that is not a RefRecord, or a UniversalRefRecord.
`Interpretation`     | A line starting with `*`.
`LocalComment`       | A line starting with `!` followed by anything except another `!`..
`Barline`            | A line starting with `=`.
`Data`               | Any line which does not fit into the above categories.


{% endcapture linetable %}
{{ linetable | markdownify }}

