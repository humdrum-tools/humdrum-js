---
title: "Object documentation"
breadcrumbs: objects
github: https://github.com/humdrum-tools/humdrum-js/master/_includes/humdrum-js
vim: ft=text
---

{% include header.html %}

The humdrum-js library contains a collection of JavaScript
objects for processing musical data in the <a target="_blank"
href="https://www.humdrum.org">Humdrum syntax</a>.  Click on the name
of an object in the listings below, or click on an object name at the
top of this page (above the yellowish bar), to view documentation for
that object.



# Main objects #

Here are a list of the most useful objects.  The main interface when
working with Humdrum data is the [Humdrum](/object/Humdrum) object, but
for low-complexity processing, [HumdrumBase](/object/HumdrumBase) can
be used instead.  A Humdrum[Base] object primarily contains an array of
[HumdrumLines](/object/HumdrumLine), which in turn consists mostly of an
array of data tokens stored in [HumdrumToken](/object/HumdrumToken)
objects.  The [RefRecords](/object/RefRecords) and
[RefRecordEntry](/object/RefRecordEntry) objects allow for easy parsing
of Humdrum Reference records, which store composer, title, and other
bibliographic information about the music.



Object name                             | Description
----------------------------------------|----------------
[Humdrum](/object/Humdrum)              | The high-level interface for working with Humdrum data.  This object inherits from HumdrumBase as well as several abstraction layers described further below.
[HumdrumBase](/object/HumdrumBase)      | The low-level interface for Humdrum data.  This object manages parsing and stringifying Humdrum data and managing the RefRecords database.  This object can be used directly (rather than through the Humdrum object, which inherits it) for simple manipulation of Humdrum data.
[HumdrumSet](/object/HumdrumSet)        | For managing a collection of one or more Humdrum data segments, such as movements in a work or a set of songs in a collection.
[HumdrumLine](/object/HumdrumLine)      | Used to manage each line of Humdrum data.  This object keeps track of the line type as well as the data fields on the line and line-level analytic data.
[HumdrumToken](/object/HumdrumToken)    | Used to manage data tokens on a line of Humdrum data.
[RefRecords](/object/RefRecords)        | A database of the reference records found in the Humdrum data.
[RefRecordEntry](/object/RefRecordEntry)| A single entry in the reference record database.


# Abstraction objects #

There are four abstraction-layer objects to divide the functionality of
parsing a Humdrum file.  All of these objects inherit from HumdrumBase,
and the Humdrum object inherits all of them.


Object name                                    | Description
-----------------------------------------------|----------------
[HumdrumStructure](/object/HumdrumStructure)   | Analyzes the spine and strand structure of the Humdrum data loaded into a [HumdrumBase](/object/HumdrumBase) object.
[HumdrumContent](/object/HumdrumContent)       | Primarily used to store rhythmic analysis of Humdrum \*\*kern spines loaded after the music has been processed by the HumdrumStructure object.  This analysis will generate timestamps for each [HumdrumLine](/object/HumdrumLine)
[HumdrumAnalysis](/object/HumdrumAnalysis)     | Used to generate analytic information from data stored in a Humdrum object.
[HumdrumTool](/object/HumdrumTool)             | Used for high-level access to the analyses extracted from lower-level abstraction layers.


# Support objects #

Other support objects for processing Humdrum data:



Object name                                    | Description
-----------------------------------------------|----------------
[RationalNumber](/object/RationalNumber)       | Used to do calculations with rational numbers (one integer divided by another integer).  This class is used in particular for timestamp analysis in the [HumdrumContent](/object/HumdrumContent) object.
[Convert](/object/Convert)                     | A collection of data conversion functions.


