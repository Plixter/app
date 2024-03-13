
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
//Adicionei para funcionar com o ftp
var UserID = "FTPUser";
var UserPass = "1=Qwerty";

var templateName = "Scan2XSS.xst";
var serverAddr = "10.97.92.67:25";
var documentPath = "/inetpub/ftproot/scan";
//var HTTPSscriptLocation = "/HTTPS/xerox.ashx";

var template = "";
var filename = "";

/****************************  FUNCTIONS  *******************************/

/**
* This function initiates a scanv2 job
*/
function startScan2home() {
	//alert("Scan2home");
	try {
		//var templateName = templateName;// document.getElementById("templatename").value;
		//DocumentFormat 
		var documentFormat = document.getElementById('s_FileType').value;
		//ColorMode
		var colorVal = document.getElementById('s_Color').value;//document.getElementById("l_color").innerHTML; // //blackandwhite
		//Sides 
		var sidesVal = document.getElementById('s_Scanning').value; //one_sided

		switch (sidesVal) {
			case "OneSided":
				sidesVal = "ONE_SIDED";
				break;
			case "TwoSided":
				sidesVal = "TWO_SIDED";
				break;
		}

		//InputOrientation
		var OrientationVal = document.getElementById('s_Orientation').value; //PORTRAIT
		//Resolution
		var resolutionVal = document.getElementById("s_Resolution").value;
		if (resolutionVal === 'RES_LOWEST') {
			resolutionVal = 'RES_100x100';
		}
		else if (resolutionVal === 'RES_BEST') {
			resolutionVal = 'RES_200x200';
		}
		else if (resolutionVal === 'RES_HIGHEST') {
			resolutionVal = 'RES_300x300';
		}
		// var SaturationVal = $("#s_Darken").xrxspinbox("value");
		var ContrastVal = $("#s_Contrast").xrxspinbox("value");
		var DarknessVal = $("#s_Darken").xrxspinbox("value");
		//DocumentImageMode
		var DocumentImageVal = document.getElementById("s_Type").value;

		switch (DocumentImageVal) {
			case "Auto":
				DocumentImageVal = "AUTO";
				break;
			case "Photo":
				DocumentImageVal = "PHOTO";
				break;
			case "Text":
				DocumentImageVal = "TEXT";
				break;
			case "PhotoAndText":
				DocumentImageVal = "MIXED";
				break;
			case "Map":
				DocumentImageVal = "MAP";
				break;
			case "NewspaperOrMagazine":
				DocumentImageVal = "NEWSPAPERANDMAGAZINE";
				break;
		}

		//MediaSizeType
		var MediaSizeVal = document.getElementById("s_Size").value;
		if (MediaSizeVal == "AUTO") MediaSizeVal = ""; // Para AUTO o template leva esta prop a vazio

		var BlankPageRemoval = document.getElementById("l_blankpageremoval").innerHTML;

		var dt = new Date();
		var year = dt.getFullYear();
		var month = dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1);
		var day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
		var hour = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
		var minute = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
		var second = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();
		filename = "Skan_" + year + month + day + "_" + hour + minute + second;

		template = "[service xrx_svc_general]\n" +
			" {\n" +
			"      enum_DCS DCSDefinitionUsed = DCS_GENERIC;\n" +
			"      enum_encoding JobTemplateCharacterEncoding = UTF-8;\n" +
			"      string JobTemplateLanguageVersion = \"4.2.00\";\n" +
			"      string JobTemplateName = \"" + templateName + "\";\n" +
			"      enum_confmethod ConfirmationMethod = PRINT;\n" +
			"    * string JobTemplateDescription = \"\";\n" +
			"    * string JobTemplateCreator = \"XeroxPortugal\";\n" +
			"    * boolean SuppressJobLog = FALSE;\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[service xrx_svc_scan]\n" +
			" {\n" +
			"    * boolean AutoContrast = FALSE;\n" +
			"    * enum_autoexposure AutoExposure = AUTO;\n" +
			"    * integer CompressionQuality = 128;\n" +
			"    * integer Darkness = " + DarknessVal + ";\n" +
			"    * enum_imagemode DocumentImageMode = " + DocumentImageVal + ";\n" +
			"    * enum_originalsubtype OriginalSubType = PRINTED_ORIGINAL;\n" +
			"    * struct_borders InputEdgeErase = 3/3/3/3/MM;\n" +
			"    * enum_mediasize InputMediaSize = " + MediaSizeVal + ";\n" +
			"    * enum_inputorientation InputOrientation = " + OrientationVal + ";\n" +
			"    * string outputUsage = \"custom\";\n" +
			"    * integer Sharpness = 0;\n" +
			"    * enum_sided SidesToScan = " + sidesVal + ";\n" +
			"    * enum_blankpageremoval BlankPageRemoval = " + BlankPageRemoval + ";\n" +
			"    * integer Contrast = " + ContrastVal + ";\n" +
			"    * integer Saturation = 0;\n" +
			"    * enum_colormode ColorMode = " + colorVal + ";\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[service xrx_svc_file]\r\n" +
			"file_1{\r\n" +
			"* enum_filingpolicy DocumentFilingPolicy = OVERWRITE;\r\n" +
			"* string RepositoryAlias = \"\";\r\n" +
			"* string DocumentPath = \"" + DocumentPath + "\";\r\n" +
			"* string RepositoryName = \"" + ServerAddr + "\";\r\n" +
			"* enum_filingprotocol FilingProtocol = FTP;\r\n" +
			"* string UserNetworkFilingLoginName = \"" + UserID + "\";\r\n" +
			"* string UserNetworkFilingLoginID = \"" + UserPass + "\";\r\n" +
			"}\r\n" +
			"end\r\n" +
			"\n" +
			"[doc_object xrx_document]\n" +
			" {\n" +
			"    * enum_docformat DocumentFormat = " + documentFormat + ";\n" +
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
			"    * enum_resolution Resolution = " + resolutionVal + ";\n" +
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

		//alert(jobTicket);
	} catch (e) {
		alert("erro no startScan2home: " + e);
	}
}

// No final: Elimina o template
function callback_success_templist(request, response) {
	//alert("callback_success_templist");
	var result = new Array();
	var data = xrxGetTheElement(xrxStringToDom(response), "TemplateEntries");
	var entries = xrxFindElements(data, "TemplateEntry");
	var name, checksum;
	if (entries != null)
		for (var i = 0; i < entries.length; ++i)
			if (((name = xrxGetElementValue(entries[i], "TemplateName")) != null) &&
				((checksum = xrxGetElementValue(entries[i], "TemplateChecksum")) != null))
				result[name] = checksum;
	//alert("xrxTemplateDeleteTemplateRequest: " + result[templateName]);
	xrxTemplateDeleteTemplate("http://127.0.0.1", templateName, result[templateName], callback_success_delete, callback_failure_delete, 0);
}

function callback_failure_templist(request, response) {
	//alert("callback_failure_templist");
	xrxTemplateDeleteTemplate("http://127.0.0.1", templateName, "", callback_success_delete, callback_failure_delete, 0);
}
// No final: Coloca o novo template
function callback_success_delete(request, response) {
	//alert("callback_success_delete");
	xrxTemplatePutTemplate("http://127.0.0.1", templateName, template, callback_success_template, callback_failure_template, 0);
}

function callback_failure_delete(request, response) {
	//	alert("callback_failure_delete");
	xrxTemplatePutTemplate("http://127.0.0.1", templateName, template, callback_success_template, callback_failure_template, 0);
}
// No final: inicia o scan com o novo template
function callback_success_template(request, response) {
	//alert("callback_success_template");
	xrxScanV2InitiateScanJobWithTemplate("http://127.0.0.1", templateName, false, "", callback_success_scan_job, callback_failure_scan_job, 0, false);
}

function callback_failure_template(request, response) {
	//alert("callback_failure_template failed: " + response + " request " + request);
}

/**
* This function handles the response when InitiateScanJob (ScanV2) is successful.
*/
// No final: Obtém o detalhe do job de scan que executou
function callback_success_scan_job(request, response) {

	jobId = xrxScanV2ParseInitiateScanJobWithTemplate(response);
	//alert("callback_success_scan_job jobid " + jobId);
	xrxJobMgmtGetJobDetails("http://127.0.0.1", "WorkflowScanning", jobId, callback_success_job_details, callback_failure_job_details);
}

/**
* This function handles the response when InitiateScanJob (ScanV2) fails.
*/
function callback_failure_scan_job(request, response) {
	var temp = response.substring(0, response.length / 2);
	alert("InitiateScanJob failed1 : " + temp);
	temp = response.substring(response.length / 2, response.length);
	alert("InitiateScanJob failed2 : " + temp);

}

/*
* This function handles the response when GetJobDetails is successful.
*/
// No final: espera que o job termine (setTimeout e volta a chamar esta função) ou, estando terminado, chama o CriaLog
function callback_success_job_details(request, response) {

	var jobDetails = xrxJobMgmtParseGetJobDetails(response);
	var jobStateNode = xrxFindElement(jobDetails, ["JobInfo", "JobState"]);
	var jobState = xrxGetValue(jobStateNode);

	var jobStateMsg = jobId + " : " + jobState;
	var substring = 'Unknown';
	var substring1 = 'Completed';

	if (jobState.indexOf(substring) !== -1 || jobState.indexOf(substring1) !== -1) {
		jobcompled = true;
		$("#ScanDonename").val(filename);
		$("#popup_progress .scanning").hide();
		$("#popup_progress .completed").show();
		$("#progress_scan").xrxactivityindicator("complete");
		//var jobStateReason = xrxJobMgmtParseJobStateReasons(response);
		//var jobStateReasonMsg = " - " + jobStateReason;
		setTimeout(function () {
			CriaLog();
			// É aqui que termina o job de digitalização
		}, 2000);
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
*/
function callback_failure_job_details(request, response) {

	//alert("callback_failure_job_details CriaLog");
	CriaLog();
}


/*************************  End of File  *****************************/