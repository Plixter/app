
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
var debugAddr = "10.97.92.47:443"; // apenas para debug
var template = "";
var filename = "";

/****************************  FUNCTIONS  *******************************/

/**
* This function initiates a scanv2 job
*/
function startScan2home() {
	try {
		//var templateName = templateName;// document.getElementById("templatename").value;
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

		//MediaSizeType
		var MediaSizeVal = document.getElementById("s_Size").value;

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
			"    * enum_blankpageremoval BlankPageRemoval = INCLUDE_ALL_PAGES;\n" +
			"    * integer Contrast = " + ContrastVal + ";\n" +
			"    * integer Saturation = 0;\n" +
			"    * enum_colormode ColorMode = " + colorVal + ";\n" +
			" }\n" +
			"end\n" +
			"\n" +
			"[service xrx_svc_file]\n" +
			" {\n" +
			"    * enum_filingpolicy DocumentFilingPolicy = NEW_AUTO_GENERATE;\n" +
			"    * string RepositoryAlias = \"CitibankTest\";\n" +
			"    * string DocumentPath = \"/inetpub/wwwroot/HTTPS/Citibank\";\n" +
			"    * enum_loginsource LoginSource = TEMPLATE;\n" +
			"    * string NDSNameContext = \"\";\n" +
			"    * string NDSTree = \"\";\n" +
			"    * string RepositoryName = \"" + debugAddr + "\";\n" +
			"    * string RepositoryVolume = \"\";\n" +
			"    * enum_filingprotocol FilingProtocol = XRXHTTPS;\n" +
			"    * string UserNetworkFilingLoginName = \"\";\n" +
			"    * boolean ServerValidationReq = FALSE;\n" +
			"    * string XrxHTTPScriptLocation = \"/HTTPS/xerox.ashx\";\n" +
			"    * boolean DocumentDirectoryXSM = TRUE;\n" +
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
	alert("callback_failure_template failed: " + response + " request " + request);
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