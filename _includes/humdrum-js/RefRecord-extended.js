//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Dec 23 01:47:54 EST 2018
// Last Modified: Sun Dec 23 01:47:57 EST 2018
// Filename:      _includes/humdrum-js/RefRecord-extended.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// This file contains descriptions of reference record keys.
//
// See:
//    https://github.com/craigsapp/humextra/blob/master/src-library/HumdrumRecord.cpp
//    https://www.humdrum.org/Humdrum/guide.append1.html
//


///////////////////////////////////////////////////////////////////////////
//
// Extentions to the RefRecords object:
//   * RefRecords::getStandardRefs() = Get list of standard references.
//   * RefRecords::AddDescriptions() = Add descriptions of keys to entries.
//   * RefRecords::AddStatuses()     = Add status of keys to entries.
//   * RefRecords::AddLanguages()    = Assign languages from language codes.
//


//////////////////////////////
//
// RefRecords::getStandardRefs -- Return an array of standard
//   references records.
//

RefRecords.prototype.getStandardRefs = function () {
	var output = [];
	for (var i=0; i<this.sequence.length; i++) {
		if (this.sequence[i].status === "standard") {
			output.push(this.sequence[i]);
		}
	}
	return output;
}



//////////////////////////////
//
// RefRecords::AddDescriptions --  Add description field to all
//    reference records in the database.  General user should not need to
//    call this function.
//

RefRecords.prototype.AddDescriptions = function () {
	if (!this.sequence) {
		console.log("Warning: no sequence database for reference records");
		return this;
	}
	for (var i=0; i<this.sequence.length; i++) {
		this.sequence[i].description = this.sequence[i].getKeyDescription();
	}
};



//////////////////////////////
//
// RefRecords:AddStatuses -- Mark reference records as "standard", 
//    "semi-standard" or "non-standard".  General user should not need
//    to call this function.
//

RefRecords.prototype.AddStatuses = function () {
	if (!this.sequence) {
		console.log("Warning: no sequence database for reference records");
		return this;
	}
	for (var i=0; i<this.sequence.length; i++) {
		this.sequence[i].status = this.sequence[i].getStatus();
	}
};



//////////////////////////////
//
// RefRecords:AddLanguages -- Add full name of languages for
//     reference records that have an associated langauge code.  General
//     user should not need to call this function.
//

RefRecords.prototype.AddLanguages = function () {
	if (!this.sequence) {
		console.log("Warning: no sequence database for reference records");
		return this;
	}
	for (var i=0; i<this.sequence.length; i++) {
		this.sequence[i].language = this.sequence[i].getLanguage();
	}
};



///////////////////////////////////////////////////////////////////////////
//
// Extentions to the RefRecordEntry object:
//   * RefRecordEntry::getKeyDescription() = Get meaning of key.
//   * RefRecordEntry::getStatus()         = Check if standard, semi-standard, or non-standard.
//   * RefRecordEntry::getLanguage()       = Get language from language code.  Return null if no-language (or non-standard code).
//   * RefRecordEntry::meanings            = Hash of key meanings.
//   * RefRecordEntry::languages           = Hash of language codes.
// 
// Properties added with the extension (by RefRecords::parse()):
//   * this.description = Description of the key.
//   * this.status      = Status of the key ("standard", "semi-standard", "non-standard").
//   * this.language    = Full name of language represented by language code.
//


//////////////////////////////
//
// RefRecordEntry::getKeyDescription -- Return the description of the
//   reference record key (called a property in javascript).  For example,
//   the reference key "OTL" means the title of the work.
//

RefRecordEntry.prototype.getKeyDescription = function () {
	var output = this.meanings[this.keyBase];
	if (!output) {
		return "non-standard";
	}
	var matches;
	var language = "";
	var languagecode = "";
	var original = false;
	if (this.keyAt) {
		matches = this.keyAt.match(/^(@+)(.*)/);
		if (matches) {
			languagecode = matches[2];
			language = this.languages[languagecode];
			if (matches[1] == "@@") {
				original = true;
			}
		}
	}
	if (language) {
		output += " (in " + language;
		if (original) {
			output += ", original langauge";
		}
		output += ")";
	}

	if (this.keyExinterp) {
		output += ", applies to " + this.keyExinterp + " data";
	}

	if (this.keyCounter) {
		output += " [" + this.keyCounter + "]";
	}

	return output;
};



//////////////////////////////
//
// RefRecordEntry::getStatus -- Returns "standard" if the key
//   starts with a capital letter and is found in the meanings database.
//   Returns "semi-standard" if the key starts with a lower-case letter,
//   but is found in the meangs database.  Returns "non-standard" if the
//   key is not found in the meanings database.
//

RefRecordEntry.prototype.getStatus = function () {
	var output = this.meanings[this.keyBase];
	if (!output) {
		return "non-standard";
	} else if (this.keyBase[0] === this.keyBase[0].toLowerCase()) {
		return "semi-standard";
	} else {
		return "standard";
	}
};



//////////////////////////////
//
// RefRecordEntry::getLanguage -- Return the full language name
//   based on the language code.
//

RefRecordEntry.prototype.getLanguage = function () {
	if (!this.langCode) {
		return null;
	} else {
		return this.languages[this.langCode];
	}
};



//////////////////////////////
//
// RefRecordEntry::meanings -- A database of the meaning of
//    standard and semi-standard reference record keys.  This hash
//    is used by RefRecordEntry::getKeyDescription() to generate
//    the description of the key.
//
// References:
//    https://csml.som.ohio-state.edu/Humdrum/guide.append1.html
//    https://www.humdrum.org/Humdrum/guide.append1.html
//

RefRecordEntry.prototype.meanings = {

	// A = Analytic related codes
	ACO	:	"Analytic collection",
	AFR	:	"Form designation",
	AGN	:	"Genre designation",
	AIN	:	"Instrumentation",
	AMD	:	"Mode designation",
	AMT	:	"Metric classification",
	AST	:	"Style, period, or type of work designation",
	ASW	:	"Associated analytic work",
	// Geographic codes:
	ARE	:	"Geographical region",
	ARL	:	"Geographical location of origin",

	// C = Composer related codes
	CDT	:	"Composer's dates",
	CNT	:	"Composer's nationality",
	COA	:	"Attributed composer",
	COC	:	"Composer's corporate name",
	COL	:	"Stage name, alias",
	COM	:	"Composer's name",
	COS	:	"Suspected composer",

	// E = Edition related codes
	EED	:	"Electronic editor",
	EEV	:	"Electronic edition version",
	EFL	:	"File number",
	EMD	:	"Document modification description",
	ENC	:	"Music encoder",
	END	:	"Initial enc. date",
	EST	:	"Encoding status",

	// G = Group related codes
	GCO	:	"Collection designation",
	GNM	:	"Group number",
	GTL	:	"Group title",
	GAW	:	"Associated group work",

	// H = speech related codes
	HAO	:	"Aural history",
	HTX	:	"Translation of vocal text",

	// L = Lyrics related codes
	LAR	:	"Arranger",
	LDT	:	"Lyric Date",
	LIB	:	"Librettist",
	LOR	:	"Orchestrator",
	LYR	:	"Lyricist",

	// M = Performance related codes
	MCN	:	"Conductor's name",
	MLC	:	"Performance location",
	MPD	:	"Date of first performance",
	MPN	:	"Performer's name",
	MPS	:	"Suspected performer",
	MRD	:	"Date of performance",

	// O = Work (opus) related codes
	OAC	:	"Act number",
	OCL	:	"Collector's name",
	OCO	:	"Commission",
	OCY	:	"Country of composition",
	ODE	:	"Dedication",
	ODT	:	"Date of composition",
	OKY	:	"Key",
	OMD	:	"Movement designation",
	OMV	:	"Movement number",
	ONB	:	"Free format note",
	ONM	:	"Number",
	OPC	:	"City of composition",
	OPR	:	"Title of parent work",
	OPS	:	"Opus number",
	OPT	:	"Parent work",
	OSC	:	"Scene number",
	OTA	:	"Alternative title",
	OTL	:	"Title",
	OTP	:	"Popular title",
	OVM	:	"Volume",

	// P = Publisher related codes
	"PC#"	:	"Publisher's cat. num.",
	PDT	:	"Date first published",
	PPG	:	"Page",
	PPG	:	"Publication page",
	PPP	:	"Place first published",
	PPR	:	"First publisher",
	PUB	:	"Publication status",

	// R = Recording related codes
	"RC#"	:	"Recording company's catalog number",
	RDT	:	"Date of recording",
	RLC	:	"Recording location",
	RMM	:	"Manufacturer or sponsoring company",
	RNP	:	"Name of the producer",
	RRD	:	"Release date of recording",
	RTL	:	"Title of album",
	"RT#"	:	"Track number",

	RNB	:	"Encoding note",
	RWG	:	"Representation warning",
	RDF	:	"User-defined signifier",
	RLN	:	"ASCII language setting",

	// S = Scholarly/source related codes
	SCA	:	"Full cat. name",
	SCT	:	"Scholarly cat. num.",
	SMA	:	"Acknowledgment of manuscript access",
	SML	:	"Manuscript location",
	SMS	:	"Manuscript source name",

	// T = Translation related codes
	TRN	:	"Translator of text",
	TXL	:	"Language of the encoded text",
	TXO	:	"Orignal language of text",

	// V
	VTS	:	"Checksum validation number",

	// X = title translation codes.  These should be considered
	// deprecated: use the @ system to describe the language of a field.
	// These codes are basically equivalent to the @ system with mappings
	// such as:
	//      XAB => OTL@AB   (Title translated into Arabic)
	// The @ system can work for any reference record, but the X system
	// only works for the title (OTL).  With the @ system you can give
	// two @@ to indicate the original langauge:
	//     OTL     (Title with language unspecified)
	//     OTL@@AB (Original title in Arabic)
	//     OTL@EN  (Title translated into English)
	XAB	:	"translated title in Arabic",
	XAL	:	"translated title in Albanian",
	XAM	:	"translated title in Armenian",
	XAZ	:	"translated title in Azeri",
	XBE	:	"translated title in Bengali",
	XBU	:	"translated title in Bulgarian",
	XCA	:	"translated title in Cantonese",
	XCB	:	"translated title in Cambodian",
	XCE	:	"translated title in Czech",
	XDA	:	"translated title in Danish",
	XDE	:	"Translated title in German",
	XEN	:	"Translated title in English",
	XES	:	"translated title in Spanish",
	XET	:	"translated title in Estonian",
	XFL	:	"translated title in Flemish",
	XFR	:	"Translated title in French",
	XGA	:	"translated title in Gaelic",
	XGR	:	"translated title in Greek",
	XHB	:	"translated title in Hebrew",
	XHI	:	"translated title in Hindi",
	XHO	:	"translated title in Xhosa",
	XHR	:	"translated title in Croatian",
	XHU	:	"translated title in Hungarian",
	XIC	:	"translated title in Icelandic",
	XIT	:	"translated title in Italian",
	XJV	:	"translated title in Javanese",
	XKO	:	"translated title in Korean",
	XLA	:	"translated title in Latin",
	XLI	:	"translated title in Lithuanian",
	XLV	:	"translated title in Latvian",
	XMA	:	"translated title in Mandarin",
	XMG	:	"translated title in Malagasy",
	XML	:	"translated title in Malayalam",
	XMO	:	"translated title in Mongolian",
	XNE	:	"translated title in Dutch",
	XNI	:	"Translated title in Japanese",
	XNO	:	"translated title in Norwegian",
	XPL	:	"translated title in Polish",
	XPR	:	"translated title in Portuguese",
	XRU	:	"translated title in Russian",
	XSK	:	"translated title in Slovak",
	XSN	:	"translated title in Slovenian",
	XSR	:	"translated title in Serbian",
	XSU	:	"translated title in Finnish",
	XSV	:	"translated title in Swedish",
	XSW	:	"translated title in Swahili",
	XTA	:	"translated title in Tamil",
	XTH	:	"translated title in Thai",
	XTU	:	"translated title in Turkish",
	XUK	:	"translated title in Ukranian",
	XUR	:	"translated title in Urdu",
	XVN	:	"translated title in Vietnamese",
	XWE	:	"translated title in Welsh",
	XZU	:	"translated title in Zulu",

	// Y = copyright related codes
	YEC	:	"Copyright notice",
	YED	:	"Last edited",
	YEM	:	"Copyright message",
	YEN	:	"Country of copyright",
	YEP	:	"Publisher of electronic edition",
	YER	:	"Date electronic edition released",
	YOE	:	"Editor of printed source",
	YOO	:	"Original document owner",
	YOR	:	"Original document",
	YOY	:	"Original copyright year",

	// Known non-standard bibliographic codes (so semi-standard):
	IMGURL		:	"Image URL",
	PDFURL		:	"PDF URL",
	URL		:	"URL",
	id		:	"Database catalog number",
	isbn		:	"ISBN",
	title		:	"Title expansion directive",
	hum2abc		:	"Humdrum to ABC+ options",
	catalog		:	"Catalog number",
	tune		:	"Tuning",
	rism		:	"RISM number",
	meter		:	"Meter(s)",
	ref		:	"Reference note",
	minrhy		:	"Smallest rhythmic unit",

	// EsAC codes (may be present when converting from EsAC data):
	bem		:	"EsAC Remark",
	"cut[^a-z]?"	:	"EsAC Incipit",
	fkt		:	"EsAC Function/Genre",
	fnt		:	"EsAC Display font",
	key		:	"EsAC KEY[] field",
	kkd		:	"EsAC Source concordance",
	trd		:	"EsAC Source"
};



//////////////////////////////
//
// RefRecordEntry::languages -- A database of 2-letter
//    and three letter language codes for use with @ and @@ qualifiers
//    on Humdrum reference record keys.  This hash is used by
//    RefRecordEntry::getKeyDescription() to generate
//    the description of the key.
//
// Two-letter codes are ISO 639.1
//   https://en.wikipedia.org/wiki/ISO_639-1
//   https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
//
// Three-letter codes are ISO 639.2
//   https://en.wikipedia.org/wiki/ISO_639-2
//   https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
//
// There is also now ISO 639.3 which aims to cover all known natural langauges:
//   https://en.wikipedia.org/wiki/ISO_639-3
//   https://en.wikipedia.org/wiki/ISO_639:a
// That is probably overkill, but langauge codes could be expanded to level III.
//
// References:
//    https://en.wikipedia.org/wiki/ISO_639
//    https://www.loc.gov/standards/iso639-2/php/code_list.php
//    http://www.loc.gov/standards/iso639-2/ISO-639-2_8859-1.txt
//

RefRecordEntry.prototype.languages = {
	"AAR"	:	"Afar",
	"AA"	:	"Afar",
	"ABK"	:	"Abkhazian",
	"AB"	:	"Abkhazian",
	"ACE"	:	"Achinese",
	"ACH"	:	"Acoli",
	"ADA"	:	"Adangme",
	"ADY"	:	"Adyghe; Adygei",
	"AFA"	:	"Afro-Asiatic languages",
	"AFH"	:	"Afrihili",
	"AFR"	:	"Afrikaans",
	"AF"	:	"Afrikaans",
	"AIN"	:	"Ainu",
	"AKA"	:	"Akan",
	"AK"	:	"Akan",
	"AKK"	:	"Akkadian",
	"ALB"	:	"Albanian",
	"SQI"	:	"Albanian",
	"SQ"	:	"Albanian",
	"ALE"	:	"Aleut",
	"ALG"	:	"Algonquian languages",
	"ALT"	:	"Southern Altai",
	"AMH"	:	"Amharic",
	"AM"	:	"Amharic",
	"ANG"	:	"Old English",
	"ANP"	:	"Angika",
	"APA"	:	"Apache languages",
	"ARA"	:	"Arabic",
	"AR"	:	"Arabic",
	"ARC"	:	"Official Aramaic; Imperial Aramaic",
	"ARG"	:	"Aragonese",
	"AN"	:	"Aragonese",
	"ARM"	:	"Armenian",
	"HYE"	:	"Armenian",
	"HY"	:	"Armenian",
	"ARN"	:	"Mapudungun; Mapuche",
	"ARP"	:	"Arapaho",
	"ART"	:	"Artificial languages",
	"ARW"	:	"Arawak",
	"ASM"	:	"Assamese",
	"AS"	:	"Assamese",
	"AST"	:	"Asturian; Bable; Leonese; Asturleonese",
	"ATH"	:	"Athapascan languages",
	"AUS"	:	"Australian languages",
	"AVA"	:	"Avaric",
	"AV"	:	"Avaric",
	"AVE"	:	"Avestan",
	"AE"	:	"Avestan",
	"AWA"	:	"Awadhi",
	"AYM"	:	"Aymara",
	"AY"	:	"Aymara",
	"AZE"	:	"Azerbaijani",
	"AZ"	:	"Azerbaijani",
	"BAD"	:	"Banda languages",
	"BAI"	:	"Bamileke languages",
	"BAK"	:	"Bashkir",
	"BA"	:	"Bashkir",
	"BAL"	:	"Baluchi",
	"BAM"	:	"Bambara",
	"BM"	:	"Bambara",
	"BAN"	:	"Balinese",
	"BAQ"	:	"Basque",
	"EUS"	:	"Basque",
	"EU"	:	"Basque",
	"BAS"	:	"Basa",
	"BAT"	:	"Baltic languages",
	"BEJ"	:	"Beja; Bedawiyet",
	"BEL"	:	"Belarusian",
	"BE"	:	"Belarusian",
	"BEM"	:	"Bemba",
	"BEN"	:	"Bengali",
	"BN"	:	"Bengali",
	"BER"	:	"Berber languages)",
	"BHO"	:	"Bhojpuri",
	"BIH"	:	"Bihari",
	"BH"	:	"Bihari",
	"BIK"	:	"Bikol",
	"BIN"	:	"Bini; Edo",
	"BIS"	:	"Bislama",
	"BI"	:	"Bislama",
	"BLA"	:	"Siksika",
	"BNT"	:	"Bantu languages",
	"BOS"	:	"Bosnian",
	"BS"	:	"Bosnian",
	"BRA"	:	"Braj",
	"BRE"	:	"Breton",
	"BR"	:	"Breton",
	"BTK"	:	"Batak languages",
	"BUA"	:	"Buriat",
	"BUG"	:	"Buginese",
	"BUL"	:	"Bulgarian",
	"BG"	:	"Bulgarian",
	"BUR"	:	"Burmese",
	"MYA"	:	"Burmese",
	"MY"	:	"Burmese",
	"BYN"	:	"Blin; Bilin",
	"CAD"	:	"Caddo",
	"CAI"	:	"Central American Indian languages",
	"CAR"	:	"Galibi Carib",
	"CAT"	:	"Catalan; Valencian",
	"CA"	:	"Catalan; Valencian",
	"CAU"	:	"Caucasian languages",
	"CEB"	:	"Cebuano",
	"CEL"	:	"Celtic languages",
	"CHA"	:	"Chamorro",
	"CH"	:	"Chamorro",
	"CHB"	:	"Chibcha",
	"CHE"	:	"Chechen",
	"CE"	:	"Chechen",
	"CHG"	:	"Chagatai",
	"CHI"	:	"Chinese",
	"ZHO"	:	"Chinese",
	"ZH"	:	"Chinese",
	"CHK"	:	"Chuukese",
	"CHM"	:	"Mari",
	"CHN"	:	"Chinook jargon",
	"CHO"	:	"Choctaw",
	"CHP"	:	"Chipewyan; Dene Suline",
	"CHR"	:	"Cherokee",
	"CHU"	:	"Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
	"CU"	:	"Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
	"CHV"	:	"Chuvash",
	"CV"	:	"Chuvash",
	"CHY"	:	"Cheyenne",
	"CMC"	:	"Chamic languages",
	"COP"	:	"Coptic",
	"COR"	:	"Cornish",
	"KW"	:	"Cornish",
	"COS"	:	"Corsican",
	"CO"	:	"Corsican",
	"CPE"	:	"English-based Creoles and pidgins",
	"CPF"	:	"French-based Creoles and pidgins",
	"CPP"	:	"Portuguese-based Creoles and pidgins",
	"CRE"	:	"Cree",
	"CR"	:	"Cree",
	"CRH"	:	"Crimean Tatar; Crimean Turkish",
	"CRP"	:	"Creoles and pidgins",
	"CSB"	:	"Kashubian",
	"CUS"	:	"Cushitic languages",
	"CZE"	:	"Czech",
	"CES"	:	"Czech",
	"CS"	:	"Czech",
	"DAK"	:	"Dakota",
	"DAN"	:	"Danish",
	"DA"	:	"Danish",
	"DAR"	:	"Dargwa",
	"DAY"	:	"Land Dayak languages",
	"DEL"	:	"Delaware",
	"DEN"	:	"Slave (Athapascan)",
	"DGR"	:	"Dogrib",
	"DIN"	:	"Dinka",
	"DIV"	:	"Divehi; Dhivehi; Maldivian",
	"DV"	:	"Divehi; Dhivehi; Maldivian",
	"DOI"	:	"Dogri",
	"DRA"	:	"Dravidian languages",
	"DSB"	:	"Lower Sorbian",
	"DUA"	:	"Duala",
	"DUM"	:	"Middle Dutch",
	"DUT"	:	"Dutch; Flemish",
	"NLD"	:	"Dutch; Flemish",
	"NL"	:	"Dutch; Flemish",
	"DYU"	:	"Dyula",
	"DZO"	:	"Dzongkha",
	"DZ"	:	"Dzongkha",
	"EFI"	:	"Efik",
	"EGY"	:	"Egyptian (Ancient)",
	"EKA"	:	"Ekajuk",
	"ELX"	:	"Elamite",
	"ENG"	:	"English",
	"EN"	:	"English",
	"ENM"	:	"Middle English",
	"EPO"	:	"Esperanto",
	"EO"	:	"Esperanto",
	"EST"	:	"Estonian",
	"ET"	:	"Estonian",
	"EWE"	:	"Ewe",
	"EE"	:	"Ewe",
	"EWO"	:	"Ewondo",
	"FAN"	:	"Fang",
	"FAO"	:	"Faroese",
	"FO"	:	"Faroese",
	"FAT"	:	"Fanti",
	"FIJ"	:	"Fijian",
	"FJ"	:	"Fijian",
	"FIL"	:	"Filipino; Pilipino",
	"FIN"	:	"Finnish",
	"FI"	:	"Finnish",
	"FIU"	:	"Finno-Ugrian languages",
	"FON"	:	"Fon",
	"FRE"	:	"French",
	"FRA"	:	"French",
	"FR"	:	"French",
	"FRM"	:	"Middle French",
	"FRO"	:	"Old French",
	"FRR"	:	"Northern Frisian",
	"FRS"	:	"Eastern Frisian",
	"FRY"	:	"Western Frisian",
	"FY"	:	"Western Frisian",
	"FUL"	:	"Fulah",
	"FF"	:	"Fulah",
	"FUR"	:	"Friulian",
	"GAA"	:	"Ga",
	"GAY"	:	"Gayo",
	"GBA"	:	"Gbaya",
	"GEM"	:	"Germanic languages",
	"GEO"	:	"Georgian",
	"KAT"	:	"Georgian",
	"KA"	:	"Georgian",
	"GER"	:	"German",
	"DEU"	:	"German",
	"DE"	:	"German",
	"GEZ"	:	"Geez",
	"GIL"	:	"Gilbertese",
	"GLA"	:	"Gaelic; Scottish Gaelic",
	"GD"	:	"Gaelic; Scottish Gaelic",
	"GLE"	:	"Irish",
	"GA"	:	"Irish",
	"GLG"	:	"Galician",
	"GL"	:	"Galician",
	"GLV"	:	"Manx",
	"GV"	:	"Manx",
	"GMH"	:	"Middle High German",
	"GOH"	:	"Old High German",
	"GON"	:	"Gondi",
	"GOR"	:	"Gorontalo",
	"GOT"	:	"Gothic",
	"GRB"	:	"Grebo",
	"GRC"	:	"Ancient Greek",
	"GRE"	:	"Modern Greek",
	"ELL"	:	"Modern Greek",
	"EL"	:	"Modern Greek",
	"GRN"	:	"Guarani",
	"GN"	:	"Guarani",
	"GSW"	:	"Swiss German; Alemannic; Alsatian",
	"GUJ"	:	"Gujarati",
	"GU"	:	"Gujarati",
	"GWI"	:	"Gwich'in",
	"HAI"	:	"Haida",
	"HAT"	:	"Haitian; Haitian Creole",
	"HT"	:	"Haitian; Haitian Creole",
	"HAU"	:	"Hausa",
	"HA"	:	"Hausa",
	"HAW"	:	"Hawaiian",
	"HEB"	:	"Hebrew",
	"HE"	:	"Hebrew",
	"HER"	:	"Herero",
	"HZ"	:	"Herero",
	"HIL"	:	"Hiligaynon",
	"HIM"	:	"Himachali",
	"HIN"	:	"Hindi",
	"HI"	:	"Hindi",
	"HIT"	:	"Hittite",
	"HMN"	:	"Hmong",
	"HMO"	:	"Hiri Motu",
	"HO"	:	"Hiri Motu",
	"HRV"	:	"Croatian",
	"HR"	:	"Croatian",
	"HSB"	:	"Upper Sorbian",
	"HUN"	:	"Hungarian",
	"HU"	:	"Hungarian",
	"HUP"	:	"Hupa",
	"IBA"	:	"Iban",
	"IBO"	:	"Igbo",
	"IG"	:	"Igbo",
	"ICE"	:	"Icelandic",
	"ISL"	:	"Icelandic",
	"IS"	:	"Icelandic",
	"IDO"	:	"Ido",
	"IO"	:	"Ido",
	"III"	:	"Sichuan Yi; Nuosu",
	"II"	:	"Sichuan Yi; Nuosu",
	"IJO"	:	"Ijo languages",
	"IKU"	:	"Inuktitut",
	"IU"	:	"Inuktitut",
	"ILE"	:	"Interlingue; Occidental",
	"IE"	:	"Interlingue; Occidental",
	"ILO"	:	"Iloko",
	"INA"	:	"Interlingua",
	"IA"	:	"Interlingua",
	"INC"	:	"Indic languages",
	"IND"	:	"Indonesian",
	"ID"	:	"Indonesian",
	"INE"	:	"Indo-European languages",
	"INH"	:	"Ingush",
	"IPK"	:	"Inupiaq",
	"IK"	:	"Inupiaq",
	"IRA"	:	"Iranian languages",
	"IRO"	:	"Iroquoian languages",
	"ITA"	:	"Italian",
	"IT"	:	"Italian",
	"JAV"	:	"Javanese",
	"JV"	:	"Javanese",
	"JBO"	:	"Lojban",
	"JPN"	:	"Japanese",
	"JA"	:	"Japanese",
	"JPR"	:	"Judeo-Persian",
	"JRB"	:	"Judeo-Arabic",
	"KAA"	:	"Kara-Kalpak",
	"KAB"	:	"Kabyle",
	"KAC"	:	"Kachin; Jingpho",
	"KAL"	:	"Kalaallisut; Greenlandic",
	"KL"	:	"Kalaallisut; Greenlandic",
	"KAM"	:	"Kamba",
	"KAN"	:	"Kannada",
	"KN"	:	"Kannada",
	"KAR"	:	"Karen languages",
	"KAS"	:	"Kashmiri",
	"KS"	:	"Kashmiri",
	"KAU"	:	"Kanuri",
	"KR"	:	"Kanuri",
	"KAW"	:	"Kawi",
	"KAZ"	:	"Kazakh",
	"KK"	:	"Kazakh",
	"KBD"	:	"Kabardian",
	"KHA"	:	"Khasi",
	"KHI"	:	"Khoisan languages",
	"KHM"	:	"Central Khmer",
	"KM"	:	"Central Khmer",
	"KHO"	:	"Khotanese; Sakan",
	"KIK"	:	"Kikuyu; Gikuyu",
	"KI"	:	"Kikuyu; Gikuyu",
	"KIN"	:	"Kinyarwanda",
	"RW"	:	"Kinyarwanda",
	"KIR"	:	"Kirghiz; Kyrgyz",
	"KY"	:	"Kirghiz; Kyrgyz",
	"KMB"	:	"Kimbundu",
	"KOK"	:	"Konkani",
	"KOM"	:	"Komi",
	"KV"	:	"Komi",
	"KON"	:	"Kongo",
	"KG"	:	"Kongo",
	"KOR"	:	"Korean",
	"KO"	:	"Korean",
	"KOS"	:	"Kosraean",
	"KPE"	:	"Kpelle",
	"KRC"	:	"Karachay-Balkar",
	"KRL"	:	"Karelian",
	"KRO"	:	"Kru languages",
	"KRU"	:	"Kurukh",
	"KUA"	:	"Kuanyama; Kwanyama",
	"KJ"	:	"Kuanyama; Kwanyama",
	"KUM"	:	"Kumyk",
	"KUR"	:	"Kurdish",
	"KU"	:	"Kurdish",
	"KUT"	:	"Kutenai",
	"LAD"	:	"Ladino",
	"LAH"	:	"Lahnda",
	"LAM"	:	"Lamba",
	"LAO"	:	"Lao",
	"LO"	:	"Lao",
	"LAT"	:	"Latin",
	"LA"	:	"Latin",
	"LAV"	:	"Latvian",
	"LV"	:	"Latvian",
	"LEZ"	:	"Lezghian",
	"LIM"	:	"Limburgan; Limburger; Limburgish",
	"LI"	:	"Limburgan; Limburger; Limburgish",
	"LIN"	:	"Lingala",
	"LN"	:	"Lingala",
	"LIT"	:	"Lithuanian",
	"LT"	:	"Lithuanian",
	"LOL"	:	"Mongo",
	"LOZ"	:	"Lozi",
	"LTZ"	:	"Luxembourgish; Letzeburgesch",
	"LB"	:	"Luxembourgish; Letzeburgesch",
	"LUA"	:	"Luba-Lulua",
	"LUB"	:	"Luba-Katanga",
	"LU"	:	"Luba-Katanga",
	"LUG"	:	"Ganda",
	"LG"	:	"Ganda",
	"LUI"	:	"Luiseno",
	"LUN"	:	"Lunda",
	"LUO"	:	"Luo (Kenya and Tanzania)",
	"LUS"	:	"Lushai",
	"MAC"	:	"Macedonian",
	"MKD"	:	"Macedonian",
	"MK"	:	"Macedonian",
	"MAD"	:	"Madurese",
	"MAG"	:	"Magahi",
	"MAH"	:	"Marshallese",
	"MH"	:	"Marshallese",
	"MAI"	:	"Maithili",
	"MAK"	:	"Makasar",
	"MAL"	:	"Malayalam",
	"ML"	:	"Malayalam",
	"MAN"	:	"Mandingo",
	"MAO"	:	"Maori",
	"MRI"	:	"Maori",
	"MI"	:	"Maori",
	"MAP"	:	"Austronesian languages",
	"MAR"	:	"Marathi",
	"MR"	:	"Marathi",
	"MAS"	:	"Masai",
	"MAY"	:	"Malay",
	"MSA"	:	"Malay",
	"MS"	:	"Malay",
	"MDF"	:	"Moksha",
	"MDR"	:	"Mandar",
	"MEN"	:	"Mende",
	"MGA"	:	"Middle Irish",
	"MIC"	:	"Mi'kmaq; Micmac",
	"MIN"	:	"Minangkabau",
	"MIS"	:	"uncoded languages",
	"MKH"	:	"Mon-Khmer languages",
	"MLG"	:	"Malagasy",
	"MG"	:	"Malagasy",
	"MLT"	:	"Maltese",
	"MT"	:	"Maltese",
	"MNC"	:	"Manchu",
	"MNI"	:	"Manipuri",
	"MNO"	:	"Manobo languages",
	"MOH"	:	"Mohawk",
	"MON"	:	"Mongolian",
	"MN"	:	"Mongolian",
	"MOS"	:	"Mossi",
	"MUL"	:	"multiple languages",
	"MUN"	:	"Munda languages",
	"MUS"	:	"Creek",
	"MWL"	:	"Mirandese",
	"MWR"	:	"Marwari",
	"MYN"	:	"Mayan languages",
	"MYV"	:	"Erzya",
	"NAH"	:	"Nahuatl languages",
	"NAI"	:	"North American Indian languages",
	"NAP"	:	"Neapolitan",
	"NAU"	:	"Nauru",
	"NA"	:	"Nauru",
	"NAV"	:	"Navajo; Navaho",
	"NV"	:	"Navajo; Navaho",
	"NBL"	:	"South Ndebele",
	"NR"	:	"South Ndebele",
	"NDE"	:	"North Ndebele",
	"ND"	:	"North Ndebele",
	"NDO"	:	"Ndonga",
	"NG"	:	"Ndonga",
	"NDS"	:	"Low German; Low Saxon;",
	"NEP"	:	"Nepali",
	"NE"	:	"Nepali",
	"NEW"	:	"Nepal Bhasa; Newari",
	"NIA"	:	"Nias",
	"NIC"	:	"Niger-Kordofanian languages",
	"NIU"	:	"Niuean",
	"NNO"	:	"Norwegian Nynorsk",
	"NN"	:	"Norwegian Nynorsk",
	"NOB"	:	"Norwegian Bokml",
	"NB"	:	"Norwegian Bokml",
	"NOG"	:	"Nogai",
	"NON"	:	"Old Norse",
	"NOR"	:	"Norwegian",
	"NO"	:	"Norwegian",
	"NQO"	:	"N'Ko",
	"NSO"	:	"Pedi; Sepedi; Northern Sotho",
	"NUB"	:	"Nubian languages",
	"NWC"	:	"Classical Newari; Old Newari; Classical Nepal Bhasa",
	"NYA"	:	"Chichewa; Chewa; Nyanja",
	"NY"	:	"Chichewa; Chewa; Nyanja",
	"NYM"	:	"Nyamwezi",
	"NYN"	:	"Nyankole",
	"NYO"	:	"Nyoro",
	"NZI"	:	"Nzima",
	"OCI"	:	"Occitan",
	"OC"	:	"Occitan",
	"OJI"	:	"Ojibwa",
	"OJ"	:	"Ojibwa",
	"ORI"	:	"Oriya",
	"OR"	:	"Oriya",
	"ORM"	:	"Oromo",
	"OM"	:	"Oromo",
	"OSA"	:	"Osage",
	"OSS"	:	"Ossetian; Ossetic",
	"OS"	:	"Ossetian; Ossetic",
	"OTA"	:	"Ottoman Turkish",
	"OTO"	:	"Otomian languages",
	"PAA"	:	"Papuan languages",
	"PAG"	:	"Pangasinan",
	"PAL"	:	"Pahlavi",
	"PAM"	:	"Pampanga; Kapampangan",
	"PAN"	:	"Panjabi; Punjabi",
	"PA"	:	"Panjabi; Punjabi",
	"PAP"	:	"Papiamento",
	"PAU"	:	"Palauan",
	"PEO"	:	"Old Persian",
	"PER"	:	"Persian",
	"FAS"	:	"Persian",
	"FA"	:	"Persian",
	"PHI"	:	"Philippine languages)",
	"PHN"	:	"Phoenician",
	"PLI"	:	"Pali",
	"PI"	:	"Pali",
	"POL"	:	"Polish",
	"PL"	:	"Polish",
	"PON"	:	"Pohnpeian",
	"POR"	:	"Portuguese",
	"PT"	:	"Portuguese",
	"PRA"	:	"Prakrit languages",
	"PRO"	:	"Old Provenal; Old Occitan",
	"PUS"	:	"Pushto; Pashto",
	"PS"	:	"Pushto; Pashto",
	"QAA-QTZ"	:	"Reserved for local use",
	"QUE"	:	"Quechua",
	"QU"	:	"Quechua",
	"RAJ"	:	"Rajasthani",
	"RAP"	:	"Rapanui",
	"RAR"	:	"Rarotongan; Cook Islands Maori",
	"ROA"	:	"Romance languages",
	"ROH"	:	"Romansh",
	"RM"	:	"Romansh",
	"ROM"	:	"Romany",
	"RUM"	:	"Romanian; Moldavian; Moldovan",
	"RON"	:	"Romanian; Moldavian; Moldovan",
	"RO"	:	"Romanian; Moldavian; Moldovan",
	"RUN"	:	"Rundi",
	"RN"	:	"Rundi",
	"RUP"	:	"Aromanian; Arumanian; Macedo-Romanian",
	"RUS"	:	"Russian",
	"RU"	:	"Russian",
	"SAD"	:	"Sandawe",
	"SAG"	:	"Sango",
	"SG"	:	"Sango",
	"SAH"	:	"Yakut",
	"SAI"	:	"South American Indian languages",
	"SAL"	:	"Salishan languages",
	"SAM"	:	"Samaritan Aramaic",
	"SAN"	:	"Sanskrit",
	"SA"	:	"Sanskrit",
	"SAS"	:	"Sasak",
	"SAT"	:	"Santali",
	"SCN"	:	"Sicilian",
	"SCO"	:	"Scots",
	"SEL"	:	"Selkup",
	"SEM"	:	"Semitic languages",
	"SGA"	:	"Old Irish",
	"SGN"	:	"Sign Languages",
	"SHN"	:	"Shan",
	"SID"	:	"Sidamo",
	"SIN"	:	"Sinhala; Sinhalese",
	"SI"	:	"Sinhala; Sinhalese",
	"SIO"	:	"Siouan languages",
	"SIT"	:	"Sino-Tibetan languages",
	"SLA"	:	"Slavic languages",
	"SLO"	:	"Slovak",
	"SLK"	:	"Slovak",
	"SK"	:	"Slovak",
	"SLV"	:	"Slovenian",
	"SL"	:	"Slovenian",
	"SMA"	:	"Southern Sami",
	"SME"	:	"Northern Sami",
	"SE"	:	"Northern Sami",
	"SMI"	:	"Sami languages",
	"SMJ"	:	"Lule Sami",
	"SMN"	:	"Inari Sami",
	"SMO"	:	"Samoan",
	"SM"	:	"Samoan",
	"SMS"	:	"Skolt Sami",
	"SNA"	:	"Shona",
	"SN"	:	"Shona",
	"SND"	:	"Sindhi",
	"SD"	:	"Sindhi",
	"SNK"	:	"Soninke",
	"SOG"	:	"Sogdian",
	"SOM"	:	"Somali",
	"SO"	:	"Somali",
	"SON"	:	"Songhai languages",
	"SOT"	:	"Southern Sotho",
	"ST"	:	"Southern Sotho",
	"SPA"	:	"Spanish; Castilian",
	"ES"	:	"Spanish; Castilian",
	"SRD"	:	"Sardinian",
	"SC"	:	"Sardinian",
	"SRN"	:	"Sranan Tongo",
	"SRP"	:	"Serbian",
	"SR"	:	"Serbian",
	"SRR"	:	"Serer",
	"SSA"	:	"Nilo-Saharan languages",
	"SSW"	:	"Swati",
	"SS"	:	"Swati",
	"SUK"	:	"Sukuma",
	"SUN"	:	"Sundanese",
	"SU"	:	"Sundanese",
	"SUS"	:	"Susu",
	"SUX"	:	"Sumerian",
	"SWA"	:	"Swahili",
	"SW"	:	"Swahili",
	"SWE"	:	"Swedish",
	"SV"	:	"Swedish",
	"SYC"	:	"Classical Syriac",
	"SYR"	:	"Syriac",
	"TAH"	:	"Tahitian",
	"TY"	:	"Tahitian",
	"TAI"	:	"Tai languages",
	"TAM"	:	"Tamil",
	"TA"	:	"Tamil",
	"TAT"	:	"Tatar",
	"TT"	:	"Tatar",
	"TEL"	:	"Telugu",
	"TE"	:	"Telugu",
	"TEM"	:	"Timne",
	"TER"	:	"Tereno",
	"TET"	:	"Tetum",
	"TGK"	:	"Tajik",
	"TG"	:	"Tajik",
	"TGL"	:	"Tagalog",
	"TL"	:	"Tagalog",
	"THA"	:	"Thai",
	"TH"	:	"Thai",
	"TIB"	:	"Tibetan",
	"BOD"	:	"Tibetan",
	"BO"	:	"Tibetan",
	"TIG"	:	"Tigre",
	"TIR"	:	"Tigrinya",
	"TI"	:	"Tigrinya",
	"TIV"	:	"Tiv",
	"TKL"	:	"Tokelau",
	"TLH"	:	"Klingon; tlhIngan-Hol",
	"TLI"	:	"Tlingit",
	"TMH"	:	"Tamashek",
	"TOG"	:	"Tonga (Nyasa)",
	"TON"	:	"Tonga",
	"TO"	:	"Tonga",
	"TPI"	:	"Tok Pisin",
	"TSI"	:	"Tsimshian",
	"TSN"	:	"Tswana",
	"TN"	:	"Tswana",
	"TSO"	:	"Tsonga",
	"TS"	:	"Tsonga",
	"TUK"	:	"Turkmen",
	"TK"	:	"Turkmen",
	"TUM"	:	"Tumbuka",
	"TUP"	:	"Tupi languages",
	"TUR"	:	"Turkish",
	"TR"	:	"Turkish",
	"TUT"	:	"Altaic languages",
	"TVL"	:	"Tuvalu",
	"TWI"	:	"Twi",
	"TW"	:	"Twi",
	"TYV"	:	"Tuvinian",
	"UDM"	:	"Udmurt",
	"UGA"	:	"Ugaritic",
	"UIG"	:	"Uighur; Uyghur",
	"UG"	:	"Uighur; Uyghur",
	"UKR"	:	"Ukrainian",
	"UK"	:	"Ukrainian",
	"UMB"	:	"Umbundu",
	"UND"	:	"undetermined",
	"URD"	:	"Urdu",
	"UR"	:	"Urdu",
	"UZB"	:	"Uzbek",
	"UZ"	:	"Uzbek",
	"VAI"	:	"Vai",
	"VEN"	:	"Venda",
	"VE"	:	"Venda",
	"VIE"	:	"Vietnamese",
	"VI"	:	"Vietnamese",
	"VOL"	:	"Volapk",
	"VO"	:	"Volapk",
	"VOT"	:	"Votic",
	"WAK"	:	"Wakashan languages",
	"WAL"	:	"Wolaitta; Wolaytta",
	"WAR"	:	"Waray",
	"WAS"	:	"Washo",
	"WEL"	:	"Welsh",
	"CYM"	:	"Welsh",
	"CY"	:	"Welsh",
	"WEN"	:	"Sorbian languages",
	"WLN"	:	"Walloon",
	"WA"	:	"Walloon",
	"WOL"	:	"Wolof",
	"WO"	:	"Wolof",
	"XAL"	:	"Kalmyk; Oirat",
	"XHO"	:	"Xhosa",
	"XH"	:	"Xhosa",
	"YAO"	:	"Yao",
	"YAP"	:	"Yapese",
	"YID"	:	"Yiddish",
	"YI"	:	"Yiddish",
	"YOR"	:	"Yoruba",
	"YO"	:	"Yoruba",
	"YPK"	:	"Yupik languages",
	"ZAP"	:	"Zapotec",
	"ZBL"	:	"Blissymbols; Blissymbolics; Bliss",
	"ZEN"	:	"Zenaga",
	"ZHA"	:	"Zhuang; Chuang",
	"ZA"	:	"Zhuang; Chuang",
	"ZND"	:	"Zande languages",
	"ZUL"	:	"Zulu",
	"ZU"	:	"Zulu",
	"ZUN"	:	"Zuni",
	"ZXX"	:	"no linguistic content; not applicable",
	"ZZA"	:	"Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki"
};



