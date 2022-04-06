
/*
 * EmailHelper.js 
 * Copyright (C) Xerox Corporation, 2012.  All rights reserved. 
 *
 * This file contains functions to start a scan job and to handle the response
 * using the ScanV2 Job Web Service Library
 */

/****************************  GLOBALS  *******************************/

var XRX_SCANV2_JOB_TICKET_NAMESPACE = 'xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;' +
	' xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;' +
	' xmlns=&quot;http://schemas.xerox.com/enterprise/eipjobmodel/1&quot;';


var jobId = '';
var jobcompled = false;
var userId = null;
var acctId = null;
var acctType = null;
//var templateName = "XTemplate0001.xst";
var templateName = "CitibankTest.XST";
var template = "";

/****************************  FUNCTIONS  *******************************/

/**
* This function initiates a scanv2 job
*/
function startScan2home() {
	try {
		//var templateName = templateName;// document.getElementById("templatename").value;
		////caminho
		//var caminho = document.getElementById('dhpath').value;
		//var temp = caminho.replace("/", " ");
		//var res = temp.split("/");
		////Host
		//var host = res[1];
		////Share
		//var share = res[2];
		////Path 
		//var path = "";
		//for (i = 3; i < res.length; i++) {
		//	if (i + 1 != res.length) {
		//		path += res[i] + "&#92;&#92;&#92;";
		//	}
		//	else {
		//		path += res[i];
		//	}
		//}
		////Password 
		//var password = document.getElementById("password").value;
		////UserName 
		//var username = document.getElementById('username').textContent;
		////DocumentFormat 
		//var documentFormat = document.getElementById('s_FileType').value;
		//ColorMode
		var colorVal = document.getElementById('s_Color').value;//document.getElementById("l_color").innerHTML; // //blackandwhite
		//Sides 
		var sidesVal = document.getElementById('s_Scanning').value; //one_sided
		//InputOrientation
		var OrientationVal = document.getElementById('s_Orientation').value; //PORTRAIT
		//Resolution
		var resolutionVal = document.getElementById("s_Resolution").value;
		if (resolutionVal === 'RES_LOWEST') {
			resolutionVal = '100x100';
		}
		else if (resolutionVal === 'RES_BEST') {
			resolutionVal = '200x200';
		}
		else if (resolutionVal === 'RES_HIGHEST') {
			resolutionVal = '300x300';
		}
		// var SaturationVal = $("#s_Darken").xrxspinbox("value");
		var SharpnessVal = $("#s_Contrast").xrxspinbox("value");
		var DarknessVal = $("#s_Darken").xrxspinbox("value");
		//DocumentImageMode  
		//DocumentImageMode  
		var DocumentImageVal = document.getElementById("s_Type").value;

		//MediaSizeType
		var MediaSizeVal = document.getElementById("s_Size").value;
		//DocumentName
		//var docVal = document.getElementById("filename").value;
		//var UserDomain = document.getElementById("userdomain").innerHTML;

		//var today = new Date();
		//var n = docVal.indexOf("Date");
		//var n1 = docVal.indexOf("Time");
		//var n2 = docVal.indexOf("UserID");
		//docVal = docVal.replace("[", "");
		//docVal = docVal.replace("&", "");
		//docVal = docVal.replace("&", "");
		//docVal = docVal.replace("_", "");
		//docVal = docVal.replace("_", "");
		//docVal = docVal.replace("_", "");
		//docVal = docVal.replace("]", "");
		//docVal = docVal.replace("Date", "");
		//docVal = docVal.replace("Time", "");
		//docVal = docVal.replace("UserID", "");
		//if (n != -1) {
		//	var dd = today.getDate();
		//	var mm = today.getMonth() + 1; //January is 0!
		//	var yyyy = today.getFullYear();
		//	var docvardate = mm + "-" + dd + "-" + yyyy;
		//	docVal += "_" + docvardate;
		//}

		//if (n1 != -1) {
		//	var hh = today.getHours();
		//	var min = today.getMinutes();

		//	if (dd < 10) {
		//		dd = '0' + dd
		//	}

		//	if (mm < 10) {
		//		mm = '0' + mm
		//	}

		//	docvarTime = hh + "-" + min;

		//	docVal += "_" + docvarTime;
		//}
		//if (n2 != -1) {
		//	docVal += "_" + username;
		//}
		//document.getElementById('ScanDoneDocName').value = docVal;

		//var edgeVal = document.getElementById("l_edge").innerHTML;

		////se as variaveis vierem preenchidas é para utilizar o servidor se não manda directo para o cliente
		//var sts = document.getElementById("sts").value;
		//if (sts == 'true') {

		//	username = document.getElementById("serverUserName").value;
		//	password = document.getElementById("UserPass").value;
		//	host = document.getElementById("Server").value;
		//	path = document.getElementById("Path").value;
		//	share = document.getElementById("Share").value;
		//}

		//path = path.replace(/&#92;[tT]/g, "t"); //tab
		//path = path.replace(/&#92;[nN]/g, "n"); // new line
		//path = path.replace(/&#92;[bB]/g, "b"); // backspace
		//path = path.replace(/&#92;[rR]/g, "r"); // retun
		//path = path.replace(/&#92;[fF]/g, "f"); // feed
		//path = path.replace(/&#92;[vV]/g, "v"); // vertical tab

		//template = "[service xrx_svc_general]\n" +
		//	" {\n" +
		//	"      enum_DCS DCSDefinitionUsed = DCS_GENERIC;\n" +
		//	"      enum_encoding JobTemplateCharacterEncoding = UTF-8;\n" +
		//	"      string JobTemplateLanguageVersion = \"4.2.00\";\n" +
		//	"      string JobTemplateName = \"" + templateName + "\";\n" +
		//	"      enum_confmethod ConfirmationMethod = PRINT;\n" +
		//	"    * string JobTemplateDescription = \"TemplateSMB\";\n" +
		//	"    * string JobTemplateCreator = \"XeroxPortugal\";\n" +
		//	"    * boolean SuppressJobLog = TRUE;\n" +
		//	" }\n" +
		//	"end\n" +
		//	"\n" +
		//	"[service xrx_svc_scan]\n" +
		//	" {\n" +
		//	"    * enum_colormode ColorMode = " + colorVal + ";\n" +
		//	"    * boolean AutoContrast = FALSE;\n" +
		//	"    * enum_autoexposure AutoExposure = OFF;\n" +
		//	"    * integer CompressionQuality = 128;\n" +
		//	"    * integer Darkness = 0;\n" +
		//	"    * enum_imagemode DocumentImageMode = " + DocumentImageVal + ";\n" +
		//	"    * enum_originalsubtype OriginalSubType = PRINTED_ORIGINAL;\n" +
		//	"    * struct_borders InputEdgeErase = 0/0/0/0/MM;\n" +
		//	"    * enum_inputorientation InputOrientation = " + OrientationVal + ";\n" +
		//	"    * string outputUsage = \"sharePrint\";\n" +
		//	"    * integer Sharpness = 0;\n" +
		//	"    * enum_sided SidesToScan = " + sidesVal + ";\n" +
		//	"    * enum_mediasize InputMediaSize = " + MediaSizeVal + ";\n" +
		//	"    * enum_blankpageremoval BlankPageRemoval = INCLUDE_ALL_PAGES;\n" +
		//	" }\n" +
		//	"end\n" +
		//	"\n" +
		//	"[service xrx_svc_file]\n" +
		//	" {\n" +
		//	"	* enum_filingpolicy DocumentFilingPolicy = OVERWRITE;\n" +
		//	"	* enum_filingprotocol FilingProtocol = SMB;\n" +
		//	"	* string UserNetworkFilingLoginName = \"" + UserDomain + "\\\\" + username + "\";\n" +
		//	"	* string UserNetworkFilingLoginId = \"" + password + "\";\n" +
		//	"	* string RepositoryName = \"" + host + "\";\n" +
		//	"	* string DocumentPath = \"" + path + "\";\n" +
		//	"	* string RepositoryVolume = \"" + share + "\";\n" +
		//	" }\n" +
		//	"end\n" +
		//	"\n" +
		//	"[doc_object xrx_document]\n" +
		//	" {\n" +
		//	"    * enum_docformat DocumentFormat = " + documentFormat + ";\n" +
		//	"    * string DocumentObjectName = \"" + docVal + "\";\n" +
		//	"    * integer ImagesPerDocument = 0;\n" +
		//	"    * boolean RotateTIFFUsingTag = FALSE;\n" +
		//	"    * enum_compression CompressionsSupported = G4, FLATE, ARITHMETIC_ENCODED_JBIG2,\n" +
		//	"                         HUFFMAN_ENCODED_JBIG2, FLATE_COMPRESSED_JPEG,\n" +
		//	"                         MIXED, NEW_JPEG_TIFF_TTN2, OLD_JPEG_TIFF_V6;\n" +
		//	"    * enum_mixedtype MixedTypesSupported = MULTI_MASK_MRC;\n" +
		//	"    * enum_mixedcompressions MixedCompressionsSupported = G4, ARITHMETIC_ENCODED_JBIG2,\n" +
		//	"                         HUFFMAN_ENCODED_JBIG2, JPEG, FLATE_COMPRESSED_JPEG;\n" +
		//	"    * enum_optimizedforfastwebview OptimizedForFastWebView = NONE;\n" +
		//	"    * enum_halftonemethod HalftoneMethod = ERRORDIFFUSE;\n" +
		//	"    * enum_halftonescreen HalftoneScreen = AUTO;\n" +
		//	"    * enum_resolution Resolution = " + resolutionVal + ";\n" +
		//	"    * enum_searchabletext SearchableText = IMAGE_ONLY;\n" +
		//	"    * enum_textcompression TextCompression = FLATE;\n" +
		//	" }\n" +
		//	"end\n";

		var dt = new Date();
		var filename = "Skan_" + dt.getFullYear() + (dt.getMonth() + 1) + dt.getDate() + "_" + dt.getHours() + dt.getMinutes() + dt.getSeconds();

		template = "[service xrx_svc_general]\n" +
			" {\n" +
			"      enum_DCS DCSDefinitionUsed = DCS_GENERIC;\n" +
			"      enum_encoding JobTemplateCharacterEncoding = UTF-8;\n" +
			"      string JobTemplateLanguageVersion = \"4.2.00\";\n" +
			"      string JobTemplateName = \"" + templateName + "\";\n" +
			"      enum_confmethod ConfirmationMethod = PRINT;\n" +
			"    * string JobTemplateDescription = \"\";\n" +
			"    * string JobTemplateCreator = \"XeroxPortugal\";\n" +
			"    * boolean SuppressJobLog = TRUE;\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[service xrx_svc_scan]\n" +
			" {\n" +
			"    * boolean AutoContrast = FALSE;\n" +
			"    * enum_autoexposure AutoExposure = AUTO;\n" +
			"    * integer CompressionQuality = 128;\n" +
			"    * integer Darkness = 0;\n" +
			"    * enum_imagemode DocumentImageMode = " + DocumentImageVal + ";\n" +
			"    * enum_originalsubtype OriginalSubType = PRINTED_ORIGINAL;\n" +
			"    * struct_borders InputEdgeErase = 3/3/3/3/MM;\n" +
			"    * enum_mediasize InputMediaSize = " + MediaSizeVal + ";\n" +
			"    * enum_inputorientation InputOrientation = " + OrientationVal + ";\n" +
			"    * string outputUsage = \"custom\";\n" +
			"    * integer Sharpness = 0;\n" +
			"    * enum_sided SidesToScan = " + sidesVal + ";\n" +
			"    * enum_blankpageremoval BlankPageRemoval = INCLUDE_ALL_PAGES;\n" +
			"    * integer Contrast = 0;\n" +
			"    * integer Saturation = 0;\n" +
			"    * enum_colormode ColorMode = " + colorVal + ";\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[service xrx_svc_file]\n" +
			" {\n" +
			"    * enum_filingpolicy DocumentFilingPolicy = NEW_AUTO_GENERATE;\n" +
			"    * string RepositoryAlias = \"CitibankTest\";\n" +
			"    * string DocumentPath = \"/Citibank\";\n" +
			"    * enum_loginsource LoginSource = TEMPLATE;\n" +
			"    * string NDSNameContext = \"\";\n" +
			"    * string NDSTree = \"\";\n" +
			"    * string RepositoryName = \"13.165.212.250:220\";\n" +
			"    * string RepositoryVolume = \"\";\n" +
			"    * enum_filingprotocol FilingProtocol = SFTP;\n" +
			"    * string UserNetworkFilingLoginName = \"tester\";\n" +
			"    * boolean ServerValidationReq = FALSE;\n" +
			"    * string XrxHTTPScriptLocation = \"\";\n" +
			"    * boolean DocumentDirectoryXSM = TRUE;\n" +
			"    * string UserNetworkFilingLoginID = \"password\";\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[doc_object xrx_document]\n" +
			" {\n" +
			"    * enum_docformat DocumentFormat = TIFF_V6;\n" +
			"    * integer ImagesPerDocument = 0;\n" +
			"    * boolean RotateTIFFUsingTag = FALSE;\n" +
			"    * enum_compression CompressionsSupported = G4, FLATE, ARITHMETIC_ENCODED_JBIG2, \n" +
			"                         HUFFMAN_ENCODED_JBIG2, FLATE_COMPRESSED_JPEG, \n" +
			"                         MIXED, NEW_JPEG_TIFF_TTN2, OLD_JPEG_TIFF_V6;\n" +
			"    * enum_mixedtype MixedTypesSupported = MULTI_MASK_MRC;\n" +
			"    * enum_mixedcompressions MixedCompressionsSupported = G4, ARITHMETIC_ENCODED_JBIG2, \n" +
			"                         HUFFMAN_ENCODED_JBIG2, JPEG, FLATE_COMPRESSED_JPEG;\n" +
			"    * enum_optimizedforfastwebview OptimizedForFastWebView = NONE;\n" +
			"    * enum_halftonemethod HalftoneMethod = ERRORDIFFUSE;\n" +
			"    * enum_halftonescreen HalftoneScreen = AUTO;\n" +
			"    * enum_resolution Resolution = RES_200X200;\n" +
			"    * enum_searchabletext SearchableText = IMAGE_ONLY;\n" +
			"    * enum_textcompression TextCompression = FLATE;\n" +
			"    * string DocumentObjectName = \"" + filename + "\";\n" +
			"    * string SourceDocumentLanguages = \"\";\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[service document_security]\n" +
			" {\n" +
			"    * boolean MasterSecurityPasswordPDFrequired = FALSE;\n" +
			"    * boolean MasterSecurityPasswordPDFdisabled = FALSE;\n" +
			" }\n" +
			"end\n";


		//alert("xrxTemplateGetTemplateList");
		xrxTemplateGetTemplateList("http://127.0.0.1", callback_success_templist, callback_failure_templist, 0);

		//xrxTemplateGetTemplate("http://127.0.0.1", templateName, callback_success_template, callback_failure_template, 0);
		//xrxTemplateGetTemplateList( url, callback_success, callback_failure, timeout )
		//xrxTemplateReplaceTemplate(url, templateName, templateContent, priorChecksum, callback_success, callback_failure, timeout)
		//xrxTemplateDeleteTemplate("http://127.0.0.1", templateName, checksum, callback_success_template, callback_failure_template, 0)
		// xrxScanV2InitiateScanJobWithTemplate("http://127.0.0.1", "7A9C74C6-877C-4DA9-8177-47979442F6BF.xst", false, "", callback_success_scan_job, callback_failure_scan_job, 0, false);

		//alert(jobTicket);
		// xrxScanV2InitiateScanJob("http://127.0.0.1", jobTicket, callback_success_scan_job, callback_failure_scan_job);
	} catch (e) {
		alert("erro no startScan2home: " + e);
	}
}

function callback_success_templist(request, response) {
	alert("callback_success_templist");
	var result = new Array();
	try {
		//var data = xrxGetTheElement(xrxStringToDom(response), "TemplateEntries");
		//var entries = xrxFindElements(data, "TemplateEntry");
		var data = xrxGetTheElement(xrxStringToDom(response), "TemplateEntries");
		var entries = xrxFindElements(data, "TemplateEntry");
		var name, checksum;
		if (entries != null)
			for (var i = 0; i < entries.length; ++i)
				if (((name = xrxGetElementValue(entries[i], "TemplateName")) != null) &&
					((checksum = xrxGetElementValue(entries[i], "TemplateChecksum")) != null))
					result[name] = checksum;
		//alert("xrxTemplateDeleteTemplateRequest: " + result[templateName]);
	}
	catch (e) {
		alert("deu erro xrxTemplateDeleteTemplateRequest: " + e);
	}
	xrxTemplateDeleteTemplate("http://127.0.0.1", templateName, result[templateName], callback_success_delete, callback_failure_delete, 0);
}
function callback_failure_templist(request, response) {
	//alert("callback_failure_templist");
	xrxTemplateDeleteTemplate("http://127.0.0.1", templateName, "", callback_success_delete, callback_failure_delete, 0);
}

function callback_success_delete(request, response) {
	alert("callback_success_delete");
	xrxTemplatePutTemplate("http://127.0.0.1", templateName, template, callback_success_template, callback_failure_template, 0);
}
function callback_failure_delete(request, response) {
	//	alert("callback_failure_delete");
	xrxTemplatePutTemplate("http://127.0.0.1", templateName, template, callback_success_template, callback_failure_template, 0);
}

function callback_success_template(request, response) {
	alert("callback_success_template");
	xrxScanV2InitiateScanJobWithTemplate("http://127.0.0.1", templateName, false, "", callback_success_scan_job, callback_failure_scan_job, 0, false);
}

function callback_failure_template(request, response) {

	alert("callback_failure_template failed: " + response + " request " + request);
}

/**
* This function handles the response when InitiateScanJob (ScanV2) is successful. 
*
* @param    request         InitiateScanJob soap request
* @param	response		InitiateScanJob soap response
*/
function callback_success_scan_job(request, response) {

	jobId = xrxScanV2ParseInitiateScanJobWithTemplate(response);
	alert("callback_success_scan_job jobid " + jobId);
	//xrxGetJobDetails("http://127.0.0.1", "Smb", "JobId", jobId, callback_success_job_details, callback_failure_job_details);
	xrxJobMgmtGetJobDetails("http://127.0.0.1", "WorkflowScanning", jobId, callback_success_job_details, callback_failure_job_details);
	//xrxJobMgmtGetJobDetails( url, jobType, jobId, callback_success, callback_failure, timeout, async ) 
}

/**
* This function handles the response when InitiateScanJob (ScanV2) fails. 
*
* @param    request         InitiateScanJob soap request
* @param	response		InitiateScanJob soap response
*/
function callback_failure_scan_job(request, response) {
	var temp = response.substring(0, response.length / 2);
	alert("InitiateScanJob failed1 : " + temp);
	temp = response.substring(response.length / 2, response.length);
	alert("InitiateScanJob failed2 : " + temp);

}

/*
* This function handles the response when GetJobDetails is successful. 
*
* @param    request         GetJobDetails soap request
* @param	response		GetJobDetails soap response
*/
function callback_success_job_details(request, response) {

	var jobDetails = xrxJobMgmtParseGetJobDetails(response);
	var jobStateNode = xrxFindElement(jobDetails, ["JobInfo", "JobState"]);
	var jobState = xrxGetValue(jobStateNode);

	var jobStateMsg = jobId + " : " + jobState;
	alert("jobStateMsg " + jobStateMsg);
	var substring = 'Unknown';
	var substring1 = 'Completed';

	if (jobState.indexOf(substring) !== -1 || jobState.indexOf(substring1) !== -1) {
		//        alert("Completed CriaLog");
		jobcompled = true;
		//var jobStateReason = xrxJobMgmtParseJobStateReasons(response);
		//var jobStateReasonMsg = " - " + jobStateReason;
		CriaLog();
	}
	else {
		//      alert("NOT Completed " + jobId);
		//setTimeout("xrxGetJobDetails(\"http://127.0.0.1\", \"Smb\", \"JobId\", jobId, callback_success_job_details, callback_failure_job_details)", 2000);
		if (jobcompled == false) {
			setTimeout("xrxJobMgmtGetJobDetails(\"http://127.0.0.1\", \"WorkflowScanning\",  jobId, callback_success_job_details, callback_failure_job_details)", 2000);
		}

	}
}

/**
* This function handles the response when GetJobDetails fails. 
*
* @param    request         GetJobDetails soap request
* @param	response		GetJobDetails soap response
*/
function callback_failure_job_details(request, response) {

	//alert("callback_failure_job_details CriaLog");
	CriaLog();
}

// InitiateScanJob job ticket help functions

/**
* This function builds the InitiateScanJob job ticket
*
* @param    jobTicketPayload    job ticket payload in string form
* @return   string              job ticket in string form
*/
function xrxScanV2JobTicket(scanV2JobTicketPayload) {
	return xrxCreateTag('ScanJobTicketXmlDocument', '',
		'&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;' + scanV2JobTicketPayload);
}

/**
* This function builds the InitiateScanJob job ticket payload
* 
* @param    schemaVersionTag   schemaVersion tag in string form
* @param    jobDescriptionTag  JobDescription tag in string form
* @param    jobProcessingTag   JobProcessing tag in string from
* @return   string             job ticket payload in string from
*/
function xrxScanV2JobTicketPayload(schemaVersionTag, jobDescriptionTag, jobProcessingTag) {
	return xrxCreateEscapedTag('ScanJobTicket', XRX_SCANV2_JOB_TICKET_NAMESPACE,
		schemaVersionTag + jobDescriptionTag + jobProcessingTag);
}

/**
* This function builds the InitiateScanJob schemaVersion tag
* 
* @param    majorVersion    major version
* @param    minorVersion    minor version
* @param    revision        revision
* @return   string          schemaVersion tag
*/
function xrxScanV2JobTicketSchemaVersion(majorVersion, minorVersion, revision) {
	var majorVersionTag = xrxCreateEscapedTag('MajorVersion', '', majorVersion);
	var minorVersionTag = xrxCreateEscapedTag('MinorVersion', '', mainorVersion);
	var revisionTag = xrxCreateEscapedTag('Revision', '', revision);

	return xrxCreateEscapedTag('schemaVersion', '', majorVersionTag + minorVersionTag + revisionTag);
}

/**
* This function builds the InitiateScanJob JobDescription tag
* 
* @param    jobName         job name
* @return   string          JobDescription in string form
*/
function xrxScanV2JobTicketJobDescription(jobName) {
	return xrxCreateEscapedTag('JobDescription', '', xrxCreateEscapedTag('JobName', '', jobName));
}

/**
* This function builds the InitiateScanJob JobProcessing tag
* 
* @param    inputTag        input tag in string form
* @param    outputTag       output tag in string form
* @return   string          JobProcessing in string form
*/
function xrxScanV2JobTicketJobProcessing(inputTag, outputTag) {
	return xrxCreateEscapedTag('JobProcessing', '', inputTag + outputTag);
}

/**
* This function builds the InitiateScanJob JobProcessing Input tag
* 
* @param    colorMode           color mode value
* @param    sides               sides value
* @param    originalTypeTag     OriginalType tag
* @param    imageOptionsTag     ImageOptions tag
* @param    layoutAdjustmentTag LayoutAdjustment tag
* @param    imageSettingsTag    ImageSettings tag
* @param    accountingTag       Accounting tag
* @return   string              Input tag in string form
*/
function xrxScanV2JobTicketInput(colorMode, blankpageremoval, sides, originalTypeTag, imageOptionsTag, layoutAdjustmentTag, imageSettingsTag, accountingTag) {
	return xrxCreateEscapedTag('Input', '', xrxCreateEscapedTag('ColorMode', '', colorMode) + xrxCreateEscapedTag('BlankPageRemoval', '', blankpageremoval) +
		xrxCreateEscapedTag('Sides', '', sides) + originalTypeTag + imageOptionsTag + layoutAdjustmentTag + imageSettingsTag + accountingTag);
}

/**
* This function builds the InitiateScanJob LayoutAdjustment tag
* 
* @param    inputOrientation    input orientation
* @param    inputMediaSize      input media size
* @param    inputEdgeEraseTag   edge erase tag
* @return   string              LayoutAdjustment tag in string form
*/
function xrxScanV2JobTicketLayoutAdjustment(inputOrientation, inputMediaSize, inputEdgeEraseTag) {
	return xrxCreateEscapedTag('LayoutAdjustment', '', xrxCreateEscapedTag('InputOrientation', '', inputOrientation) +
		xrxCreateEscapedTag('InputMediaSize', '', xrxCreateEscapedTag('MediaSizeType', '', inputMediaSize)) +
		xrxCreateEscapedTag('InputEdgeErase', '', inputEdgeEraseTag));
}


/**
* This function builds the InitiateScanJob Accounting tag
* 
* @param    userId              user id
* @param    acctId              account id
* @param    acctType            account type
* @return   string              Accounting tag in string form
*/
function xrxScanV2JobTicketAccounting(userId, acctId, acctType) {
	if ((acctType != undefined) && (acctType != null)) {
		return xrxCreateEscapedTag('Xsa', '', xrxCreateEscapedTag('AccountUserId', '', userId) +
			xrxCreateEscapedTag('AccountTypeInfo', '', xrxCreateEscapedTag('AccountType', '', acctType) + xrxCreateEscapedTag('AccountID', '', acctId)));
	}
	else {
		return xrxCreateEscapedTag('Jba', '', xrxCreateEscapedTag('JobAccountingUserId', '', userId) + xrxCreateEscapedTag('JobAccountId', '', acctId));
	}
}

/**
* This function builds the InitiateScanJob JobProcessing Output tag
* 
* @param    destinationTag      Destination tag
* @param    metaDataTag         MetaData tag
* @return   string              Output tag in string form
*/
function xrxScanV2JobTicketOutput(destinationTag, metaDataTag) {
	return xrxCreateEscapedTag('Output', '', destinationTag + metaDataTag);
}

/**
* This function builds the InitiateScanJob Destination tag
* 
* @param    destinationType     DestinationType value
* @param    manualValueTag      ManualValue tag
* @return   string              Destination tag in string form
*/
function xrxScanV2JobTicketDestination(destinationType, manualValueTag) {
	if (destinationType == '') {
		alert("Please specify the file destination.");
	}

	return xrxCreateEscapedTag('Destination', '', xrxCreateEscapedTag('DestinationType', '', destinationType) + manualValueTag);
}

/**
* This function builds the InitiateScanJob ManualValue tag
* 
* @param    friendlyName        FriendlyName value
* @param    loginSourceTag         LoginSource tag
* @param    filingPolicy        FilingPolicy value
* @param    host                Host value
* @param    path                Path value
* @param    share               Share value
* @param    validateCertificate ValidateCertificate value
* @param    phoneNumber         PhoneNumber value
* @param    scriptPath          ScriptPath value
* @param    documentFormat      DocumentFormat value
* @param    emailOptionsTag     EmailOptions tag
* @return   string              ManualValue tag in string form
*/
function xrxScanV2JobTicketManualValue(friendlyName, loginSourceTag, filingPolicy, host, path, share, validateCertificate, phoneNumber, scriptPath, documentFormat, emailOptionsTag) {
	var friendlyNameTag = (friendlyName != '') ? xrxCreateEscapedTag('FriendlyName', '', friendlyName) : '';
	var filingPolicyTag = (filingPolicy != '') ? xrxCreateEscapedTag('FilingPolicy', '', filingPolicy) : '';
	var hostTag = (host != '') ? xrxCreateEscapedTag('Host', '', host) : '';
	var pathTag = (path != '') ? xrxCreateEscapedTag('Path', '', path) : '';
	var shareTag = (share != '') ? xrxCreateEscapedTag('Share', '', share) : '';
	var validateCertificateTag = (validateCertificate != '') ? xrxCreateEscapedTag('ValidateCertificate', '', validateCertificate) : '';
	var phoneNumberTag = (phoneNumber != '') ? xrxCreateEscapedTag('PhoneNumber', '', phoneNumber) : '';
	var scriptPathTag = (scriptPath != '') ? xrxCreateEscapedTag('ScriptPath', '', scriptPath) : '';
	var documentFormatTag = (documentFormat != '') ? xrxCreateEscapedTag('DocumentFormat', '', documentFormat) : '';

	return xrxCreateEscapedTag('ManualValue', '', friendlyNameTag + loginSourceTag + filingPolicyTag + hostTag + pathTag +
		shareTag + validateCertificateTag + phoneNumberTag + scriptPathTag + documentFormatTag + emailOptionsTag);
}

/**
* This function builds the InitiateScanJob EmailOptions tag
* 
* @param    to                  To value
* @param    cc                  Cc value
* @param    bcc                 Bcc value
* @param    from                From tag
* @param    replyTo             ReplyTo value
* @param    subjectLine         SubjectLine value
* @param    messageBody         MessageBody value
* @param    attachmentName      AttachmentName value
* @param    smtpAcctUserid      SMTPAccountUserId value
* @param    smtpAcctId          SMTPAccountId value
* @return   string              EmailOptions tag in string form
*/
function xrxScanV2JobTicketEmailOptions(to, cc, bcc, from, replyTo, subjectLine, messageBody, attachmentName, smtpAcctUserId, smtpAcctId) {
	if (to == '') {
		alert("Please enter at least one to address.");
	}

	if (from == '') {
		alert("Please enter the from address.");
	}

	var toTag = xrxCreateEscapedTag('To', '', to);
	var ccTag = xrxCreateEscapedTag('Cc', '', cc);
	var bccTag = xrxCreateEscapedTag('Bcc', '', bcc);
	var recipientsTag = xrxCreateEscapedTag('Recipients', '', toTag + ccTag + bccTag);
	var fromTag = xrxCreateEscapedTag('From', '', from);
	var replyToTag = (replyTo != '') ? xrxCreateEscapedTag('ReplyTo', '', replyTo) : fromTag;
	var subjectLineTag = (subjectLine != '') ? xrxCreateEscapedTag('SubjectLine', '', subjectLine) : '';
	var messageBodyTag = (messageBody != '') ? xrxCreateEscapedTag('MessageBody', '', messageBody) : '';
	var attachmentNameTag = (attachmentName != '') ? xrxCreateEscapedTag('AttachmentName', '', attachmentName) : '';
	var smtpAcctUserIdTag = (smtpAcctUserId != '') ? xrxCreateEscapedTag('SMTPAccountUserId', '', smtpAcctUserId) : '';
	var smtpAcctIdTag = (smtpAcctId != '') ? xrxCreateEscapedTag('SMTPAccountId', '', smtpAcctId) : '';
	return xrxCreateEscapedTag('EmailOptions', '', recipientsTag + fromTag + replyToTag + subjectLineTag + messageBodyTag + attachmentNameTag +
		smtpAcctUserIdTag + smtpAcctIdTag);
}

/*
* Get Session Info
*/
function getSessionInfo() {
	xrxSessionGetSessionInfo("http://127.0.0.1", callback_success_get_session, callback_failure_get_session);
}

/**
* This function handles the response when the GetSessionInfo call is successful
*
* @param request	soap request for the GetSessionInfo call
* @param response	soap response for the GetSessionInfo call
*/
function callback_success_get_session(request, response) {
	disable('Next', false);

	var data = xrxSessionParseGetSessionInfo(response);
	var jba = xrxGetElementValue(data, "jba");
	var xsa = xrxGetElementValue(data, "xsa");

	if (jba != null) {
		var jbaUserId = xrxGetElementValue(data, "userID");
		var jbaAcctId = xrxGetElementValue(data, "accountID");

		userId = jbaUserId;
		acctId = jbaAcctId;
		acctType = null;

		var jbaMsg = "User ID : " + userId + "   Account ID : " + acctId;

	}

	if (xsa != null) {
		var xsaUserId = xrxGetElementValue(data, "userID");
		var xsaAcctType = xrxGetElementValue(data, "AccountType");
		var xsaAcctId = xrxGetElementValue(data, "AccountID");

		userId = xsaUserId;
		acctId = xsaAcctId;
		acctType = xsaAcctType;

		var xsaMsg = "User ID : " + userId + "   Account ID : " + acctId + "   Account Type : " + acctType;

	}
}

/**
* This function handles the response when the GetSessionInfo call fails
*
* @param request	soap request for the GetSessionInfo call
* @param response	soap response for the GetSessionInfo call
*/
function callback_failure_get_session(envelope, response) {
	alert("GetSessionInfo failed : " + response);
}

/**
* This function creates an xml tag in an escaped string.
*
* @param	label		tag
* @param	type		attribute
* @param	value		text value
*/
function xrxCreateEscapedTag(label, type, value) {
	if (type == "") {
		return ("&lt;" + label + "&gt;" + value + "&lt;/" + label + "&gt;");
	}
	else {
		return ("&lt;" + label + " " + type + "&gt;" + value + "&lt;/" + label + "&gt;");
	}
}

/*************************  End of File  *****************************/