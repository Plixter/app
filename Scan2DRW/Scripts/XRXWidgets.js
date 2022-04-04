/* v1.3.17 c8 20140613 */
/* 
	Copyright (c) 2007 Xerox Corporation. All Rights Reserved. 

	Copyright protection claimed includes all forms and matters of
	copyrightable material and information now allowed by statutory or
	judicial law or hereinafter granted, including without limitation,
	material generated from the software programs which are displayed
	on the screen such as icons, screen and the like. 
*/

/****************************************************************************************
*                                   Section Listing
* Constants
* Globals
* Routing Files
* External Globals
* Links
* Support
* Generic XrxWidget (Parent)
* Widget Helper Classes
*	XrxButton (Service Class)
*	XrxImage (Parent) (Service Class)
*	XrxImageScaled (Service Class)
*	XrxImageSliced (Service Class)
*	XrxImageSlicedScaled (Service Class)
*	XrxImageDrawn (Service Class)
* Widget External Functions
* Widget Load Functions
* Onload Event Definition
* Default Data Load
* Debug Functions
****************************************************************************************/

/*****************************  Constants  ***********************************************/

var XRX_WIDGETS_VERSION					= 'v1.3.17 c8 20140613';

// image array constants
var XRXUNSELECTED						= 0;
var XRXSELECTED							= 1;
var XRXUNSELECTABLE						= 2;
var XRXUNSELECTABLE_SELECTED			= 3;

var XRXUNSELECTEDBUTTON					= 0;
var XRXPRESSEDBUTTON					= 1;
var XRXSELECTEDBUTTON					= 2;
var XRXUNSELECTABLEBUTTON				= 3;
var XRXUNSELECTABLE_SELECTEDBUTTON		= 4;

// Widget loading arrays
var XRXWIDGETNAMES		= [ "xrx:checkbox",
							"xrx:spinbox",
							"xrx:command",
							"xrx:windowbearing",
							"xrx:radio",
							"xrx:radiosmall",
							"xrx:keyboardtext",
							"xrx:keyboard",
							"xrx:select",
							"xrx:serviceselector",
							"xrx:squareselector" ];

var XRXWIDGETTYPES		= { "xrx:checkbox":'input',
							"xrx:spinbox":'input',
							"xrx:command":'input',
							"xrx:windowbearing":'input',
							"xrx:radio":'input',
							"xrx:radiosmall":'input',
							"xrx:keyboardtext":'input',
							"xrx:keyboard":'input',
							"xrx:select":'select',
							"xrx:serviceselector":'input',
							"xrx:squareselector":'input' };

var XRXWIDGETTYPELIST	= [ "input",
							"select" ];

var XRXCONSTRUCTORNAMES	= { "xrx:checkbox":"XRXCheckbox",
							"xrx:spinbox":"XRXSpinbox",
							"xrx:command":"XRXCommand",
							"xrx:windowbearing":"XRXWindowBearing",
							"xrx:radio":"XRXRadio",
							"xrx:radiosmall":"XRXRadioSmall",
							"xrx:keyboardtext":"XRXKeyboardText",
							"xrx:keyboard":"XRXKeyboard",
							"xrx:select":"XRXSelect",
							"xrx:serviceselector":"XRXServiceSelector",
							"xrx:squareselector":"XRXSquareSelector",
							"xrx:keyboardsingleton":"XRXKeyboardSingleton" };

var XRXPARENTS			= { "xrx:windowbearing":"xrx:command",
							"xrx:radio":"xrx:checkbox",
							"xrx:radiosmall":"xrx:radio",
							"xrx:keyboardtext":"xrx:keyboardsingleton",
							"xrx:keyboard":"xrx:keyboardtext",
							"xrx:serviceselector":"xrx:windowbearing",
							"xrx:squareselector":"xrx:serviceselector" };

// current disble keyword and event name
var XRXDISABLEKEYWORD = "unselectable";
var XRXDISABLEHANDLERKEYWORD = "onunselectableclick";
// style attributes NOT to be transfered from the element to the main div
var XRX_RESTRICTED_STYLE_OPTIONS = ["color","imgsize","labelalign","font-size"];
// Widget font sizes array
var XRXFONTSIZES = ["4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19",
					"20","21","22","23","24"];
					

/*****************************  Globals  ***********************************************/

// Array for widget object storage and access
var xrxWidgetObjectArray = new Array();
// flags for files already loaded
var xrxWidgetsLoaded = new Array();
// for Server location
var xrxParentLoc = location.hostname;
var xrxCurrentPage = location.pathname;
var xrxCurrentFolderName = ((xrxCurrentPage.lastIndexOf( "/" ) >= 0)?xrxCurrentPage.substring( 
				((xrxCurrentPage.charAt(0) == "/")?1:0), xrxCurrentPage.lastIndexOf( "/" ) ):"");
var xrxCurrentFolder = "/" + xrxCurrentFolderName + "/";
var xrxLinkLocation = "http://localhost/xrx_widgets/";
var xrxServerLocation = "http://localhost/xrx_widgets/";
var xrxWidgetImagePath = "images/";

		
/*******************************  Routing Files  **********************************************/

// This section allows a Router file loaded before this file to shift the location of the Data file
// and/or identify the server location
try
{
	if ( XRXRouterEnabled )
	{
		xrxLinkLocation = xrxDataLocation;
		xrxServerLocation = xrxServerLoc;
	}
}
catch( e ){}

// This section allows a Router file loaded after this file to shift the location of the Data file
// and/or identify the server location
try
{
	if ( XRXPostRouterEnabled )
	{
		xrxLinkLocation = xrxPostDataLocation;
		xrxServerLocation = xrxPostServerLoc;
	}
}
catch( e ){}

/*******************************  External Globals  **********************************************/

// Informational data array loaded by the Data file
var xrxData = new Array();

var xrxImageLocation = xrxLinkLocation + xrxWidgetImagePath;
var xrxPreprocessorNeeded = true;
// This section allows a Router file loaded before this file to shift the location of the Data file
// and/or identify the server location
try
{
	if(xrxRev1 != undefined) xrxPreprocessorNeeded = xrxRev1;
}
catch( e ){}

var xrxTypesRequired					= new Array();

for ( var i = 0, ii = XRXWIDGETTYPELIST.length; i < ii; i++ )
{
    xrxTypesRequired[XRXWIDGETTYPELIST[i]] = true;
}

var xrxWidgetsRequired					= new Array();

// This section allows a Router file loaded before this file to shift the location of the Data file
// and/or identify the server location
// xrxWidgetsNeeded is a variable that would be defined before including this
// file in an application
try
{
	if ( undefined != xrxWidgetsNeeded )
	{
		if (( undefined == xrxWidgetsNeeded[0] ) ||
			( 'all' != xrxWidgetsNeeded[0].toLowerCase() ))
		{
			for (var i = 0, ii = XRXWIDGETTYPELIST.length; i < ii; i++ )
			{
				xrxTypesRequired[XRXWIDGETTYPELIST[i]]	= false;
			}
		}

		if (( undefined != xrxWidgetsNeeded[0] ) &&
			( 'all' != xrxWidgetsNeeded[0].toLowerCase() ))
		{
			xrxWidgetsRequired			= new Array();

			for ( var i = 0, ii = xrxWidgetsNeeded.length; i < ii; i++ )
			{
				xrxWidgetsRequired[i]	= xrxWidgetsNeeded[i];

				if ( undefined != XRXCONSTRUCTORNAMES[xrxWidgetsNeeded[i]] )
				{
					xrxTypesRequired[XRXWIDGETTYPES[xrxWidgetsNeeded[i]]] = true;
				}
			}
		}
	}
}
catch( e )
{
	for ( var i = 0, ii = XRXWIDGETNAMES.length; i < ii; i++ )
	{
		xrxWidgetsRequired[i] = XRXWIDGETNAMES[i];
	}
}

/*
* Inheritance Handler
*/
xrx_extend = function( subClass, baseClass ) 
{
   function inheritance() {}
   inheritance.prototype = baseClass.prototype;
   subClass.prototype = new inheritance();
   subClass.prototype.constructor = subClass;
   subClass.baseConstructor = baseClass;
   subClass.superClass = baseClass.prototype;
};

/*******************************  Links  **********************************************/

// load files that are needed to display the Xerox look and feel
document.write( '<link href="' + xrxLinkLocation + 'XRXWidgets.css" type="text/css" rel="stylesheet">' );

if ( 600 == screen.height )
{
	document.write( '<link href="' + xrxLinkLocation + 'XRXWidgets_c10.css" type="text/css" rel="stylesheet">' );
}

document.write( '<script src="' + xrxServerLocation + 'XRXData.js" type="text/javascript"></script>' );

for ( var i = 0; i < xrxWidgetsRequired.length; i++ ) 
{
	xrxLoadJsCode( xrxWidgetsRequired[i] );
}

// load extension file, only if the server location is "off the box"
if (( -1 == xrxServerLocation.indexOf( '//127.0.0.1/' )) &&
	( -1 == xrxServerLocation.indexOf( '//localhost/' )))
{
	document.write( '<script src="' + xrxServerLocation + 'XRXExtension.js" type="text/javascript"></script>' );
}


/**
*	This function will check to see if there are any parents that need to be
*	loaded before we try and load ourselves.
*
*	@param	i_strClass - string - name of class
*/
function xrxLoadJsCode( i_strClass )
{
// 	alert( 'IN xrxLoadJsCode() TO LOAD ' + i_strClass + '\n already loaded = ' + xrxWidgetsLoaded[i_strClass] +
// 			'\n constructor = ' + XRXCONSTRUCTORNAMES[i_strClass] + '\n parents = ' + XRXPARENTS[i_strClass] );
	// if there is a parent and it hasn't been loaded, then load it :)
	if (( undefined != XRXPARENTS[i_strClass] ) &&
		( undefined == xrxWidgetsLoaded[XRXPARENTS[i_strClass]] ))
	{
		xrxLoadJsCode( XRXPARENTS[i_strClass] );
	}

	if (( undefined == xrxWidgetsLoaded[i_strClass] ) &&
		( undefined != XRXCONSTRUCTORNAMES[i_strClass] ))
	{
		document.write( '<script src="' + xrxServerLocation + XRXCONSTRUCTORNAMES[i_strClass] + '.js" type="text/javascript"></script>' );
		xrxWidgetsLoaded[i_strClass]	= true;
// 		alert( 'LOADED ' + i_strClass );
	}

	return;
}


/******************************  Support  *********************************************/

function strjoin()
{
	var arr = new Array();

	for ( var i = 0, ii = strjoin.arguments.length; i < ii; i++ )
	{
		arr[i]							= strjoin.arguments[i];
	}

    return arr.join( "" );
}

/*
* Function to replace characters in a string. Replacement is global. Necessary as current 
* browser has problems with String.replace().
*
* @param text	string to modify
* @param str	string to search for
* @param rstr	replacement string
* @return modified string
*/
function xrxReplaceChars( text, str, rstr )
{
	var index = text.indexOf( str );
	var result = "";
	while(index >= 0) 
	{
		result += ((index > 0)?text.substring( 0, index ):"");
		result += rstr;
		text = text.substring( index + str.length, text.length );
		index = text.indexOf( str );
	}
	return( result + text );
}

/*
* Function to find all elements in a document with the given tag name and class.
*
* @param tag		tag name to match
* @param className	class name to match
* @return array of all elements found
*/
function xrxGetElementsByClassName( tag, className )
{
	var result = new Array();
	var elements = document.getElementsByTagName( tag );
	for(var i = 0;i < elements.length;++i)
		if(elements[i].className.toLowerCase() == className)
			result.push( elements[i] );
	return result;
}

/**
* This function finds a given element in an array.
*
* @param theArray	the array to search
* @param theElement	the element to search the array for
* @return index of found element in the array or -1
*/
function xrxInArray( theArray, theElement )
{
	for ( var i = 0, ii = theArray.length; i < ii; i++ )
	{
		if (theArray[i] == theElement)
		{
			return i;
		}
	}

	return -1;
}

/** 
* This is a function to get a node's displayed width.
*
* @param	node	node to measure
* @return	node width in pixels
*/
function xrxGetNodeWidth( node )
{
	var w = node.style.width;
	var p = node.style.position;
	node.style.position = "absolute";
	node.style.width = "auto";
	var width = node.offsetWidth;
	node.style.width = w;
	node.style.position = p;
	return width;
}

/** 
* This is a function to get a node's displayed width outside its context.
*
* @param node	node to measure
* @return node width in pixels
*/
function xrxGetNodeWidthOutOfFlow( node, clone )
{
	var node2 = (((clone == undefined) || clone)?node.cloneNode( true ):node);
	document.body.appendChild( node2 );
	var width = node2.offsetWidth;
	document.body.removeChild( node2 );
	return width;
}

/** 
* This is a function to get a node's displayed width outside its context.
*
* @param node	node to measure
* @return node width in pixels
*/
function xrxGetImgNodeWidthOutOfFlow( src )
{
	var img = xrxCreateImg( document.body );
	img.src = src;
	var width = img.offsetWidth;
	document.body.removeChild( img );
	return width;
}

/** 
* This is a function to find the form element the given element is in.
*
* @param node	node starting point
* @return form element or null
*/
function xrxFindForm( node )
{
	while(node != null)
		if(node.tagName.toLowerCase() == 'form') 
			break;
		else
			node = node.parentNode;
	return node;
}


/* ========================================================================
@funct	xrxPrivCopyAttributes
@input	io_objWidget - object - instantiated widget having attributes added to
@input	io_objElement - object - HTML element to have attributes copied from
@output	None
@descr	This function will copy over any attributes that were found on the
		original element to the newly created widget.
@/descr
======================================================================== */
function xrxPrivCopyAttributes( io_objWidget, io_objElement )
{
	var arrAttribs						= io_objElement.attributes;

	for ( var i = 0, ii = arrAttribs.length; i < ii; i++ )
	{
		var strAttrib					= arrAttribs.item(i).nodeName;

		if ( "id" != strAttrib.toLowerCase() )
		{
			if ( "name" != strAttrib.toLowerCase() )
			{
				io_objWidget.setAttribute( strAttrib, io_objElement.getAttribute( strAttrib ));
			}
			else
			{
				io_objWidget.setAttribute( strAttrib, io_objElement.getAttribute( strAttrib ) + '_widget');
			}
		}
	}

	return;
}


/*
* Function to use the eval command on a user defined function. The difference
* here is the function is made part of the original element and then
* executed in that context. The advantage is that the use of the this
* keyword is then valid and pertains to the original element.
*
* @param func	predefined function
* @param node	the original element to execute the function in
*/
function xrxEval( func, node )
{
	if((func != null) && (func.length > 0))
	{
		if(func.charAt( func.length - 1 ) == ';') 
			func = func.substring( 0, func.length - 1 );
		node.doFunc = new Function( func );
		node.doFunc();
	}
}

/*
* Function to create a div with the default attributes and link it in if a 
* parent is provided.
*
* @param parent	parent element to link the new div to or undefined
* @param sibling	sibling to insert the div before or undefined
*/
function xrxCreateDiv( parent, sibling )
{
	var div = document.createElement( 'div' );
	if(parent != undefined)
		if(sibling != undefined)
			parent.insertBefore( div, sibling );
		else
			parent.appendChild( div ); 
	div.style.display = "block";
	div.style.position = "absolute";
	div.style.left = "0px";
	div.style.top = "0px";
	div.style.height = 500 + "px";
	div.style.width = 600 + "px";
	div.style.overflow = "hidden";
	return div;
}

/*
* Function to create a img with the default attributes and link it in if a 
* parent is provided.
*
* @param parent	parent element to link the new div to or undefined
* @param sibling	sibling to insert the div before or undefined
*/
function xrxCreateImg( parent, sibling )
{
	var img = document.createElement( 'img' );
	if(parent != undefined)
		if(sibling != undefined)
			parent.insertBefore( img, sibling );
		else
			parent.appendChild( img );
	img.style.position = "absolute";
	img.style.left = "0px";
	img.style.top = "0px";
	return img;
}

/*
* Function to set a border around an element.
*
* @param i_node		node to set the border around
* @param i_width	width of the border
* @param i_style	style of the border
* @param i_color	color of the border
*/
function xrxSetBorder( i_node, i_width, i_style, i_color )
{
    var style = i_node.style;

	style.borderColor					= i_color;
	style.borderStyle					= i_style;
	style.borderWidth					= i_width;

	return;
}

/** 
* This is a function to execute the given event in the context of the
* given element if the event is defined.
*
* @param eventName	name of event to execute
* @param element	the element whose context to execute the event in
*/
function xrxTriggerEvent( eventName, element )
{
	var func;
	if(element.hasAttribute( eventName ))
		xrxEval( element.getAttribute( eventName ), element );
}

/**
* This function loads the attributes from a keyboard or keyboardtext class.
*
* @param node	the element to search
* @return array of parameters corresponding to known attributes found
*/
function xrxLoadTextAttributes( node )
{
	var params = new Array();
	params["value"] = this.saveValue = node.value;
	params["title"] = xrxGetLabel( node, ["title","label"] );
	if((node.hasAttribute( "type" )) && (node.getAttribute( "type" ).toLowerCase() == "password")) 
			params["password"] = "true";
	if(node.hasAttribute( "maxlength" )) params["maxlength"] = node.getAttribute( "maxlength" );
	if(node.hasAttribute( "onsave" )) params["onsave"] = node.getAttribute( "onsave" );
	if(node.hasAttribute( "oncancel" )) params["oncancel"] = node.getAttribute( "oncancel" );
	if(node.hasAttribute( "onenter" )) params["onenter"] = node.getAttribute( "onenter" );
	if(node.hasAttribute( "onvalidate" )) params["onvalidate"] = node.getAttribute( "onvalidate" );
	if(node.hasAttribute( "lang" )) params["lang"] = node.getAttribute( "lang" );
	if(node.hasAttribute( "blink" )) params["blink"] = "true";
	if(node.hasAttribute( "zIndex" )) params["zindex"] = node.getAttribute( "zIndex" );
	return params;
}

/** 
* Get the label from the internal element. All the possible names of the attribute
* are in the internal labelNames array.
*
* @param node	element to query
* @param names	prioritized array of possible attribute names
* @return label name or ""
*/
function xrxGetLabel( node, names )
{
	for ( var i = 0, ii = names.length; i < ii; i++ )
	{
		if(node.hasAttribute( names[i] ))
		{
			return node.getAttribute( names[i] );
		}
	}

	return "";
}

/** 
* This is a function to transfer the style attribute from one node to
* another possibly excluding certain attributes.
*
* @param from	node to tranfer from
* @param to		node to transfer to 
*/
function xrxTransferStyle( from, to )
{
	var name;
	var newStyle = "";
	var style = from.getAttribute( 'style' ).toLowerCase().split( ";" );
	for ( var i = 0, ii = style.length; i < ii ; i++ )
	{
		name = xrxTrim( style[i].split( ":" )[0] );
		if(name != "")
			if((num = xrxInArray( XRX_RESTRICTED_STYLE_OPTIONS, name )) == -1)
				newStyle += ((newStyle.length > 0)?";":"") + style[i];
	}
	if(newStyle.length > 0) to.setAttribute( 'style', newStyle );
}

/** 
* This is a function to get the iconsize attribute and determine the scaling factor 
* needed to fit in the space provided.
*
* @param el		the element
* @param width	width of the space provided
* @param height	height of the space provided
* @param defw	default width of the image
* @param defh	default height of the image
* @return	array of image width and image height
*/
function xrxGetIconSize( el, width, height, defw, defh )
{
	var result = [defw,defh];
	if(el.hasAttribute( 'iconsize' ))
	{
		var sizes = (el.getAttribute( 'iconsize' )).toLowerCase().split( 'x' );
		if(sizes.length == 2)
		{
			var scalew = 1.0;
			var scaleh = 1.0;
			var scale = 1.0;
			result[0] = parseInt( sizes[0] );
			result[1] = parseInt( sizes[1] );
			if(isNaN( result[0] ) || isNaN( result[1] ))
			{
				result[0] = defw;
				result[1] = defh;
			} else
			{
				if((result[0] + 2) > width) scalew = (width / result[0]);
				if((result[1] + 2) > height) scaleh = (height / result[1]);
				scale = ((scalew < scaleh)?scalew:scaleh);
				result[0] = Math.floor( result[0] * scale );
				result[1] = Math.floor( result[1] * scale );
			}
		}
	}
	return result;
}

/** 
* This is a function to parse a string to an int. This function uses the
* built-in function parseInt(). But the current browser's implementation
* of that function fails when non-numeric characters are encountered. This
* function makes a copy of the string until a non-numeric charcter is 
* encountered.
*
* @param num	the string
* @return	number or null
*/
function xrxParseInt( num )
{
	var number = null;
	var num2 = "";

	for ( var i = 0, ii = num.length; i < ii; i++ )
	{
		if((num.charAt( i ) >= '0') && (num.charAt( i ) <= '9'))
		{
			num2 += num.charAt( i );
		}
		else
		{
			break;
		}
	}
	if (num2.length > 0)
	{
		number = parseInt( num2 );
	}

	return number;
}

/**
* This function trims whitespace from both ends of the given string.
*
* @param str	string to modify
* @return modified string
*/
function xrxTrim( str )
{
	if((str != undefined) && (str != null))
		return xrxLtrim( xrxRtrim( str ) );
	else
		return "";
}

/**
* This function trims whitespace from the left end of the given string.
*
* @param str	string to modify
* @return modified string
*/
function xrxLtrim( str )
{
	if (( str != undefined ) && ( str != null ))
	{
		var i;

		for ( i = 0, ii = str.length; i < ii; i++ )
		{
			if ( ' ' != str.charAt( i ))
			{
				break;
			}
		}

		if ( 0 < i )
		{
			return str.substring( i, str.length );
		}

		return str;
	}
	else
	{
		return "";
	}
}

/**
* This function trims whitespace from the right end of the given string.
*
* @param str	string to modify
* @return modified string
*/
function xrxRtrim( str )
{
	if (( str != undefined ) && ( str != null ))
	{
		var i							= 0;
		var length						= str.length - 1;

		for ( i = length; i >= 0; i-- )
		{
			if (( ' ' != str.charAt(i) ) && ( '\t' != str.charAt( i )))
			{
				break;
			}
		}

		if ( i < length )
		{
			return str.substring( 0, i + 1 );
		}

		return str;
	}
	else
	{
		return "";
	}
}

/*****************************  Widgets  ***********************************************/

/*****************************************************************************
******************************************************************************
**  Interface XrxWidget ******************************************************
******************************************************************************
*****************************************************************************/

/** 
* This is the interface for functions that need to manipulate all the widget 
* objects as the same.
*
* @param index		index of this widget in xrxWidgetObjectArray
* @param element	original element or null
* @param className	name of this widget class
*/
function XrxWidgetInterface( index, element, className )
{
	// attributes
	// index of this object in the xrxWidgetObjectArray
	this.index = index;
	// the original html element
	this.element = element;
	// class of this object
	this.className = className;
	// id of original element
	this.id = ((this.element != null)?this.element.getAttribute( 'id' ):"");
	// name of orginal element
	this.name = ((this.element != null)?this.element.getAttribute( 'name' ):"");
	// for those widgets that have a changeable value
	this.state = 0;
	// previous state
	this.oldState = 0;
	
	// functions
	// getter for the element name
	this.getName = _xrxGetName;
	// getter for the widget class name
	this.getClassName = _xrxGetClassName;
	// getter for the element id
	this.getId = _xrxGetId;
	// function thats gets the presentation state
	this.getState = _xrxGetState;
	// setter for the presentation layer state
	this.setState = null;
	// function that handles overall generation of the presentation layer
	this.generate = null;
	
	//body
}

/*
* Function that returns the element name.
*
* @return object name attribute
*/
function _xrxGetName()
{
	return this.name;
}

/*
* Function that returns the element name.
*
* @return object name attribute
*/
function _xrxGetId()
{
	return this.id;
}

/*
* Function that returns the element class.
*
* @return object widget name attribute
*/
function _xrxGetClassName()
{
	return this.className;
}

/*
* Function that returns the current widget value state.
*
* @return object state
*/
function _xrxGetState()
{
	return this.state;
}

/*****************************************************************************
******************************************************************************
**  Generic XrxWidget (Parent)  **********************************************
******************************************************************************
*****************************************************************************/

// class extension mechanism
xrx_extend( XrxWidget, XrxWidgetInterface );

/** 
* This is the parent of all the new widget objects.
*
* @param el		document element
* @param ind	index of this widget in xrxWidgetObjectArray
* @param name	className of this widget class
*/
function XrxWidget( element, index, className )
{
	// constructor
	XrxWidget.baseConstructor.call( this, index, element, className );
	
	// attributes
	// placeholder on the page where the element was/is
	this.placeHolder = this.element;
	// flag for disabled status, true=disabled
	this.disabled = false;
	// main image of presentation layer
	this.img = null;
	// height of presentation image
	this.imgHeight = 0;
	// width of presentation image
	this.imgWidth = 0;
	// flag to indicate that the presentation is forced to the imgWidth and imgHeight
	this.imgSizeForced = false;
	// main presentation element
	this.div = null;
	// scale factor for widget size
	this.scale = 1.0;
	// associated label text
	this.label = "";
	// names of attributes that may contain the label text
	this.labelNames = ["label"];
	// associated label element
	this.caption = null;
	// position of associated label (above,below,left,right,center,centerleft)
	this.captionPos;
	// if no attribute set, label position to default to
	this.captionDefaultPos = 'right';
	// text color for associated label
	this.captionColor;
	// left position of label
	this.captionLeft;
	// font of associated label
	this.captionFont = null;
	// amount of space to border a caption with
	this.captionPadding = null;
	// handle on text node for label
	this.text = null;
	// storage for onchange event
	this.onchange = null;
	// flag to determine whether to monitor attribute changes (true)
	this.monitorAttrChange = true;
	// flag to determine whether to ignore attribute changes (true)
	this.suspendAttrChange = false;
	// flag to determine whether to ignore click events (true)
	this.suspendClick = false;
	// flag to indicate a regeneration is already in process
	this.regenInProgress = false;
	// parent node of original element
	this.parentNode = this.element.parentNode;
	// storage for pre-existing key event handler
	this.bodyKeyEventHandler = null;
	// zIndex of this widget's presentation layer
	this.zIndex = 50;
	// flag for whether this widget is visible
	this.visible = true;
	// attribute to shift the position of the widget in a relative vertical direction
	this.shiftVertical = 0;
	// attribute to shift the position of the widget in a relative horizontal direction
	this.shiftHorizontal = 0;
	
	// functions
	// setter for the label text
	this.setLabel = _xrxSetLabel;
	// setter for the widget value
	this.setValue = null;
	// function to handle basic initial housekeeping
	this.basicSetup = _xrxBasicSetupWidget;
	// function that happens first during generation of the presentation layer
	this.generatePrimary = null;
	// function to set the initial state of the widget during generation
	this.setInitialWidgetState = _xrxSetInitialWidgetState;
	// function that happens second during generation of the presentation layer
	this.generateSecondary = null;
	// function that generates the image of the presentation layer
	this.generateImage = _xrxGenerateImage;
	// function that generates the label of the presentation layer
	this.generateCaption = _xrxGenerateCaption;
	// function that happens last during generation of the presentation layer
	this.generateFinal = null;
	// function to get the labelalign attribute from the element
	this.getLabelAlign = _xrxGetLabelAlign;
	// function to load disable attributes during generation
	this.loadDisableAttributes = _xrxLoadDisableAttributes;
	// function to load basic attributes during generation
	this.loadBasicAttributes = _xrxLoadBasicAttributes;
	// function to load standard attributes during generation
	this.loadAttributes = _xrxLoadAttributes;
	// function that handles regeneration
	this.regenerate = _xrxRegenerateWidget;
	// function that happens first during regeneration of the presentation layer
	this.prepareToRegenerate = null;
	// function that happens last during regeneration of the presentation layer
	this.finishRegeneration = null;
	// function to do memory/page cleanup when widget being removed
	this.cleanup = _xrxCleanup;
	// function to re-display the presentation layer
	this.display = _xrxDisplayWidget;
	// event to execute if clicked on when disabled
	this.onDisableClick = null;
	// function to execute when presentation layer clicked on
	this.handleClick = _xrxHandleClick;
	// function to execute on the widget itself
	this.onclick = null;
	// handler for executing events on original element
	this.triggerEvents = _xrxTriggerEvents;
	// handler for executing a event on the original element
	this.eval = _xrxEval;
	// function to handle when an attribute changes in the original element
	this.attrChange = _xrxHandleAttrChange;
	// function to handle when the original element is removed
	this.remove = _xrxHandleRemove;
	// function to disable/enable this widget
	this.disable = _xrxHandleDisable;
	// function to hide/unhide this widget
	this.hide = _xrxHideWidget;
	// function to shift the position of the presentation relatively
	this.shiftPosition = _xrxShiftPositionWidget;
	
	//body
	this.generate = _xrxGenerateWidget;
	// set the widget index in the original element
	this.element.setAttribute( 'index', this.index );
	// do basic setup
	if(this.basicSetup != null) this.basicSetup();
}

/** 
* Handle the most basic preparation, hide the old element and load the images.
*/
function _xrxBasicSetupWidget()
{
	this.element.style.display = "none";

	if(this.className != null)
	{
		xrxLoadImages( this.className );
	}
}

/** 
* Hide or display the widget according to value.
*
* @param value	true = hide
*/
function _xrxHideWidget( value )
{
	if(this.div != null) 
	{
		this.div.style.visibility = ((value)?"hidden":"visible");
	}

	if(this.img != null)
	{
		this.img.hide( value );
	}

	if ( this.caption != null )
	{
		this.caption.style.visibility = ((value)?"hidden":"visible");
	}
}

/*
* Generic display function to place the correct image in the document according to the state.
*/
function _xrxDisplayWidget()
{
	if(this.setState != null) 
	    this.setState();
	this.img.setState( this.state );
	if(this.caption != null) this.caption.style.color = ((this.disabled)?"Grey":this.div.style.color);
}

/*
* Function to get the initial attributes from the element and place the object in a valid state.
*/
function _xrxSetInitialWidgetState()
{
	this.imgSizeForced = false;
	this.div = null;
	this.text = null;
	this.caption = null;
	this.img = null;
	this.state = 0;
	this.caption = null;
	this.suspendClick = false;
	this.imgWidth = this.imgHeight = 0;
	this.scale = 1.0;
}

/** 
* This is a function to get the disable attributes.
*/
function _xrxLoadDisableAttributes()
{
	if(this.element.hasAttribute( 'disabled' )) 
	{
		this.element.removeAttribute( 'disabled' );
		this.element.setAttribute( XRXDISABLEKEYWORD, true );
		this.disabled = true;
	} else
	{
		this.disabled = this.element.hasAttribute( XRXDISABLEKEYWORD );
	}
	this.onDisableClick = this.element.getAttribute( XRXDISABLEHANDLERKEYWORD );
	this.onDisableClick = ((this.onDisableClick != "")?this.onDisableClick:null);
}

function _xrxLoadBasicAttributes()
{	
	if(this.element.hasAttribute( 'visibility' )) 
		this.visible = (this.element.getAttribute( 'visibility' ).toLowerCase() != 'hidden');
		
	if(this.element.hasAttribute( 'offsetvertical' ))
	{
		this.shiftVertical = parseInt( this.element.getAttribute( 'offsetvertical' ) );
		if(isNaN( this.shiftVertical )) this.shiftVertical = 0;
	}
	if(this.element.hasAttribute( 'offsethorizontal' ))
	{
		this.shiftHorizontal = parseInt( this.element.getAttribute( 'offsethorizontal' ) );
		if(isNaN( this.shiftHorizontal )) this.shiftHorizontal = 0;
	}
}

function _xrxShiftPositionWidget()
{
	if((this.offsetVertical != 0) || (this.offsetHorizontal != 0))
	{
		this.div.style.position = "relative";
		this.div.style.left = this.shiftHorizontal + "px";
		this.div.style.top = this.shiftVertical + "px";
	} else
	{
		this.div.style.position = this.element.style.position;
		this.div.style.position = ((this.element.style.position != "")?
									this.element.style.position:"relative");
	}
}

/**
* This function gets the labelalign from the internal element. It only
* accepts known values and defaults to the internal default.
*/
function _xrxGetLabelAlign()
{
	this.captionPos = null;
	if(this.element.hasAttribute( 'labelalign' ))
		this.captionPos = this.element.getAttribute( 'labelalign' ).toLowerCase();
	if((this.captionPos == null) || ((this.captionPos != 'right') && (this.captionPos != 'center') && 
			(this.captionPos != 'below') && (this.captionPos != 'left') && (this.captionPos != 'above') && 
			(this.captionPos != 'centerleft')))
		this.captionPos = this.captionDefaultPos;
}

/** 
* This is a function to get other attributes. These are standard attributes but
* loaded in a separate function to allow a child class to override.
*/
function _xrxLoadAttributes()
{
	this.getLabelAlign();
	if(this.element.hasAttribute( 'imgsize' ))
	{
		var value = xrxTrim( this.element.getAttribute( 'imgsize' ).toLowerCase() );
		if(value.charAt( value.length - 1 ) == '%')
		{
			this.scale = parseInt( value );
			this.scale = ((isNaN( this.scale ))?1.0:(this.scale * 0.01));
		} else
		{
			var values = value.split( "x" );
			if(values.length == 2)
			{
				var val1 = parseInt( values[0] );
				var val2 = parseInt( values[1] );
				if(!isNaN( val1 ) && !isNaN( val2 ))
				{
					this.imgWidth = val1;
					this.imgHeight = val2;
				}
			} else
			{
				if(value == "larger")
					this.scale = 1.3;
				else
					if(value == "smaller")
						this.scale = 0.7;
			}
		}
	}
	if(this.imgWidth == 0)
	{
		this.imgWidth = Math.round( xrxData[this.className]['imgWidth'] * this.scale );
		this.imgHeight = Math.round( xrxData[this.className]['imgHeight'] * this.scale );
	} else
	{
		this.imgWidth = Math.round( this.imgWidth * this.scale );
		this.imgHeight = Math.round( this.imgHeight * this.scale );
		this.imgSizeForced = true;
	}
	if(this.element.style.zIndex != "") 
	    this.zIndex = parseInt( this.element.style.zIndex );
	if((this.onchange == null) && (this.element.hasAttribute( 'onchange' )))
	{
		// Necessary to stop onchange in order to control as Ant will fire an onchange event
		// even when the change is done programmatically
		this.onchange = this.element.getAttribute( 'onchange' );
		// necessary to change rather than remove as an Ant defect will continue to fire an 
		// event after removal
		this.element.setAttribute( 'onchange', "" );
	}
}

/**
* This function adds the label to the presentation. This implementation is for images 
* where the label is to the left, right or on the image. This function creates the
* caption and passes it to setLabel().
*
* @param label	label to add or undefined in which case getLabel() will be called
*/
function _xrxGenerateCaption( label )
{
	this.caption = xrxCreateDiv( this.div );
	this.div.style.display = "block";
	this.caption.style.zIndex = this.zIndex + 2;
	this.caption.style.fontWeight = ((this.div.style.fontWeight == "")?"Bold":this.div.style.fontWeight);
	this.caption.style.fontFamily = ((this.div.style.fontFamily == "")?"Arial":this.div.style.fontFamily);
	this.caption.style.color = this.captionColor = ((this.div.style.color == "")?"Black":this.div.style.color);
	this.caption.style.fontSize = ((this.div.style.fontSize == "")?((this.captionFont != null)?this.captionFont
					:(XRXFONTSIZES[Math.round( this.scale * 10 ) - 1] + "px")):this.div.style.fontSize);
	if(label != "") this.setLabel( ((label != undefined)?label:xrxGetLabel( this.element, this.labelNames )) );
}

/**
* This function sets the label and adjusts the size of the image if necessary. This implementation 
* is for images where the label is to the left, right or on the image.
*
* @param label	label to add or undefined in which case this.label is used
*/
function _xrxSetLabel( label )
{
	this.label = xrxTrim(label);
	var divWidth = this.imgWidth = this.img.getWidth();
	var divHeight;
	this.imgHeight = this.img.getHeight();
	var captionPadding = Math.round( this.scale * 5 );
	var captionOffsetHeight = Math.round( this.scale * 7 );
	this.caption.style.width = "auto";
	this.caption.style.left = "0px";
	if(this.text == null)
		this.caption.appendChild( this.text = document.createTextNode( this.label ) );
	else 
		this.text.nodeValue = this.label;
	var width = xrxGetNodeWidthOutOfFlow( this.caption );
	this.caption.style.width = (width + (((this.captionPos != 'center') && (this.captionPos != "below") &&
				(this.captionPos != "above"))?captionPadding:0)) + "px";
	this.caption.style.height = "auto";
	this.img.setHeight( this.imgHeight = ((this.imgSizeForced)?this.imgHeight:(((this.captionPos != "below") ||
						(this.imgHeight >= (this.caption.offsetHeight + (captionOffsetHeight * 2))))?
						this.imgHeight:(this.caption.offsetHeight + (captionOffsetHeight * 2)))) );
	this.div.style.height = (divHeight = (((this.captionPos != "below") && (this.captionPos != "above"))?
				this.imgHeight:(this.imgHeight + this.caption.offsetHeight + 3))) + "px";
	var captionTop;
	this.caption.style.top = (captionTop = (((this.captionPos != "below") && (this.captionPos != "above"))?
							Math.floor( (this.imgHeight - this.caption.offsetHeight) / 2 - 1)
							:((this.captionPos == "below")?(divHeight - this.caption.offsetHeight):0))) + "px";

	if (( 'below' != this.captionPos ) &&
		( 'above' != this.captionPos ))
	{
		if ((this.captionPos != 'center') && (this.captionPos != 'centerleft'))
		{ 
			this.caption.style.left = (this.captionLeft = ((this.captionPos == 'right')?
										(captionPadding + this.imgWidth):0)) + "px";
			if(!this.imgSizeForced) divWidth = ((captionPadding * 2) + width + this.imgWidth);
			if(this.captionPos == 'left') this.img.setLeft( width + captionPadding );
			this.caption.style.height = (divHeight - captionTop) + "px";
		}
		else
		{
			captionPadding = Math.round( this.scale * (((this.captionPadding != undefined)
								&& (this.captionPadding != null))?this.captionPadding:30) );
			if(!this.imgSizeForced) 
				if((divWidth = ((this.imgWidth >= (width + (captionPadding * 2)))?this.imgWidth
								:(width + (captionPadding * 2)))) != this.img.actualWidth)
					divWidth = this.img.setWidth( divWidth );
			this.caption.style.left = (this.captionLeft = ((this.captionPos == 'centerleft')?3
										:(Math.floor( (divWidth - width) / 2 ) - 1))) + "px";
		}
	}
	else
	{
		if(width > divWidth)
		{
			this.img.setLeft( Math.floor( (width - divWidth) / 2 ) );
			divWidth = width;
		}
		else
		{
			this.img.setLeft( 0 );
			this.caption.style.left = Math.floor( (divWidth - width) / 2 ) + "px";
		}
		if(this.captionPos == "above") this.img.setTop( this.caption.offsetHeight + 3 );
	}
	this.div.style.width = divWidth + "px";
}

/**
* This function adds the image to the presentation. 
*/
function _xrxGenerateImage()
{
	this.img = new XrxImageScaled( this.div, this.className, this.imgWidth, this.imgHeight );
	this.img.generate();
}

/**
* This function is the blueprint for the widget presentation creation.
*/
function _xrxGenerateWidget()
{
	this.suspendAttrChange = true;
	if(this.generatePrimary != null) 
		this.generatePrimary();
	if(this.setInitialWidgetState != null) 
		this.setInitialWidgetState();
	if(this.loadBasicAttributes != null) 
		this.loadBasicAttributes();
	if(this.loadDisableAttributes != null) 
		this.loadDisableAttributes();
	if(this.loadAttributes != null) 
		this.loadAttributes();
	this.div = xrxCreateDiv( this.parentNode, this.placeHolder );
	if(this.element.hasAttribute( 'changed' )) 
		this.element.removeAttribute( 'changed' );
	if(this.element.hasAttribute( 'style' )) 
		xrxTransferStyle( this.element, this.div );
	if(this.shiftPosition != null) 
		this.shiftPosition();
	this.div.style.display = "block";
	this.div.style.zIndex = this.zIndex;
	if(this.div.style.color == "") 
		this.div.style.color = "Black";
	if(this.generateSecondary != null) 
		this.generateSecondary();
	
	if(this.generateFinal != null) 
		this.generateFinal();
	this.display();
	if(!this.visible)
		this.hide( true );
	if(this.monitorAttrChange)
	{
		this.element.addEventListener( 'DOMAttrModified', xrxHandleAttrChange, false );
		this.element.addEventListener( 'DOMNodeRemoved', xrxHandleRemove, false );
	}
	this.suspendAttrChange = false;
}

/*
* Function to regenerate the presentation for the changed element.
*/
function _xrxRegenerateWidget()
{
	if(!this.regenInProgress)
	{
		this.suspendAttrChange = true;
		this.regenInProgress = true;
		if(this.oldState != null) this.oldState = this.getState();
		this.cleanup();
		if(this.prepareToRegenerate != null) 
		    this.prepareToRegenerate();
		this.parentNode.removeChild( this.div );
		this.generate();
		if(!this.disabled && (this.oldState != null))
			if(this.getState() != this.oldState)
				this.triggerEvents( ['onchange'], this.element );
		if(this.finishRegeneration != null) this.finishRegeneration();
		this.suspendAttrChange = false;
		this.regenInProgress = false;
	} else
	{
		setTimeout( "xrxRegenerateWidget(\"" + this.index + "\")", 200 );
	}	
}

/*
* Function to trigger the events provided in the context of the element.
*
* @param events		array of event names to fire
* @param element	dom element
*/
function _xrxHandleClick( parameter1, parameter2, parameter3 )
{
	if((this.onclick != undefined) && (this.onclick != null))
	    if(parameter1 == undefined)
	        this.onclick();
	    else
	        if(parameter2 == undefined)
	            if(parameter1 == 2)
	                setTimeout( "xrxOnClickWidget(\"" + this.index + "\", 3 )", 2000 );
	            else
	                if(parameter1 == 3)
	                    this.onclick( 2 );
	                else
	                    this.onclick( parameter1 );
	        else
	            if(parameter3 == undefined)
	                if(parameter1 == 2)
	                    setTimeout( "xrxOnClickWidget(\"" + this.index + "\", 3, parameter2 )", 2000 );
	                else
	                    if(parameter1 == 3)
	                        this.onclick( 2, parameter2 );
	                    else
	                        this.onclick( parameter1, parameter2 );
	            else
	                if(parameter1 == 2)
	                    setTimeout( "xrxOnClickWidget(\"" + this.index + "\", 3, parameter2, parameter3 )", 2000 );
	                else
	                    if(parameter1 == 3)
	                        this.onclick( 2, parameter2, parameter3 );
	                    else
	                        this.onclick( parameter1, parameter2, parameter3 );
}

/*
* Function to trigger the events provided in the context of the element.
*
* @param events		array of event names to fire
* @param element	dom element
*/
function _xrxTriggerEvents( events, element )
{
	for ( var i = 0, ii = events.length; i < ii; i++ )
	{
		if((events[i] != 'onchange') || (this.onchange == undefined) || (this.onchange == null))
		{
			xrxTriggerEvent( events[i], element );
		}
		else
		{
			xrxEval( this.onchange, element );
		}
	}
}

/*
* Function to trigger an event provided in the context of the element
* while making sure attribute change events are suppressed.
*
* @param func		function definition to fire
* @param element	dom element
*/
function _xrxEval( func, element )
{
	xrxEval( func, element );
}

/*
* Function to handle a change of attributes in the original element.
*
* @param evt	event	(attrChange: 1=change,2=add,3=remove)
*/
function _xrxHandleAttrChange( evt )
{
	if(!this.suspendAttrChange)
	{
		this.suspendAttrChange = true;
		if(this.element.hasAttribute( 'changed' )) this.element.removeAttribute( 'changed' );
		var attr = evt.attrName.toLowerCase();
		if(( attr == XRXDISABLEKEYWORD) || (attr == "disabled"))
		{
			this.disabled = ((evt.attrChange == 2) || (evt.attrChange == 1));
			this.display();
		} else
		{
			switch( attr )
			{
				case "visibility":
					this.hide( this.visible = ((evt.attrChange == 3)?false
								:(this.element.getAttribute( attr ).toLowerCase() == "hidden")) );
					break;
				case "label":
					this.setLabel( this.element.getAttribute( 'label' ) );
					break;
				case 'value':
					this.setLabel( this.element.getAttribute( 'value' ) );
					break;
				default:
					setTimeout( "xrxRegenerate(\"" + this.index + "\")", 50 );
					break;
			}
		}
		this.suspendAttrChange = false;
	}
}

/*
* Function to handle the element being disabled.
*
* @param value	new value of disabled, true = disabled
*/
function _xrxHandleDisable( value )
{
	this.disabled = value;
	this.display();
}

/*
* Function to handle the original element being removed. 
* Removes the added presentation elements.
*
* @param evt	event
*/
function _xrxHandleRemove( evt )
{
	if(this.cleanup != null) this.cleanup();
	this.parentNode.removeChild( this.div );
	this.element.removeAttribute( 'index' );
	this.element = this.div = this.caption = this.img = null;
	xrxWidgetObjectArray[this.index] = null;
}

/**
* This function cleans up any listeners set.
*/
function _xrxCleanup()
{
	//this.element.removeEventListener( 'DOMAttrModified', xrxHandleAttrChange, false );
	this.element.removeEventListener( 'DOMNodeRemoved', xrxHandleRemove, false );
}

/***********************  Widget Helper Classes  ********************************/

/*****************************************************************************
******************************************************************************
**  XrxButton ****************************************************************
******************************************************************************
*****************************************************************************/

/**
* This object handles widget images.
*
* @param parent			parent element to attach the image to
* @param id				id of this button
* @param imageClass		name of image class
* @param width			width of the image to display
* @param height			height of the image to display
* @param imgOffset		offset into the array of img sources to start at
* @param imgSep			separation in the image array between states
* @param imgProvider	image builder
* @param className		name of this class	
*/
function XrxButton( parent, id, imageclass, width, height, imgOffset, imgSep, imgProvider, classname )
{
	// attributes
	this.captionFont					= null;
	this.captionPos						= 'center';
	this.className						= ((classname != undefined)?classname:'xrxbutton');
	this.disabled						= false;
	this.div							= xrxCreateDiv( parent );
	this.icon							= null;
	this.id								= id;
	this.imageClass						= imageclass;
	this.imageProvider					= (((imgProvider != undefined) && (imgProvider != null))?imgProvider:XrxImageScaled);
	this.img							= null;
	this.imgHeight						= height;
	this.imgOffset						= (((imgOffset != undefined) && (imgOffset != null))?imgOffset:0);
	this.imgSep							= ((imgSep != undefined)?imgSep:0);
	this.imgSizeForced					= true;
	this.imgWidth						= width;
	this.label							= "";
	this.left							= 0;
	this.parentNode						= parent;
	this.pressed						= false;
	this.selected						= false;
	this.state							= 0;
	this.top							= 0;
	this.zIndex							= ((parent.style.zIndex != "")?parseInt( parent.style.zIndex ) + 1:51);
	
	//functions
	this.addCaption						= _xrxAddCaptionButton;
	this.addIcon						= _xrxAddIconButton;
	this.disable						= _xrxSetDisabledButton;
	this.display						= _xrxDisplayWidget;
	this.generate						= _xrxGenerateButton;
	this.generateCaption				= _xrxGenerateCaption;
	this.getHeight						= _xrxGetHeightButton;
	this.getLeft						= _xrxGetLeftButton;
	this.getTop							= _xrxGetTopButton;
	this.getWidth						= _xrxGetWidthButton;
	this.hide							= _xrxHideButton;
	this.onclick						= _xrxOnclickButton;
	this.setCaptionFont					= _xrxSetCaptionFontButton;
	this.setCaptionLeft					= _xrxSetCaptionLeftButton;
	this.setCaptionTop					= _xrxSetCaptionTopButton;
	this.setEvent						= _xrxSetEventButton;
	this.setEvent						= _xrxSetEventButton;
	this.setHeight						= _xrxSetHeightButton;
	this.setLabel						= _xrxSetLabel;
	this.setLeft						= _xrxSetLeftButton;
	this.setPressed						= _xrxSetPressedButton;
	this.setSelected					= _xrxSetSelectedButton;
	this.setState						= _xrxSetStateButton;
	this.setTop							= _xrxSetTopButton;
	this.setWidth						= _xrxSetWidthButton;
	this.setZIndex						= _xrxSetZIndex;
	
	// body
}

/*
* Function to generate the presentation elements from the given attributes.
*/
function _xrxGenerateButton()
{
	this.div.style.zIndex = this.zIndex;
	this.img = new this.imageProvider( this.div, this.imageClass, this.imgWidth, this.imgHeight,
										this.imgOffset, this.imgSep );
	this.img.generate();
}

/*
* Add a label to the button.
*
* @param label	label to set
* @param labelpos	position to set the label inside the button
*/
function _xrxAddCaptionButton( label, labelpos )
{
	if(labelpos != undefined) 
		this.captionPos = labelpos;
	this.generateCaption( this.label = label );
	this.caption.style.width = (this.imgWidth - 3) + "px";
}

/*
* Add an icon to the button.
*
* @param src	icon source
* @param size	icon size
*/
function _xrxAddIconButton( src, width, height )
{
	if(src != null)
	{
		if(this.icon == null) this.icon = xrxCreateImg( this.div );
		this.icon.style.width = width + "px";
		this.icon.style.height = height + "px";
		this.icon.style.left = "2px";
		this.icon.style.zIndex = this.zIndex + 2;
		this.icon.style.top = Math.floor( (this.imgHeight - height) / 2.0 ) + "px";
		if(this.caption != null) this.caption.style.left = (width + 2) + "px";
		this.icon.src = src;
	} else
	{
		if(this.icon != null)
		{
			this.div.removeChild( this.icon );
			this.icon = null;
		}
	}
}

/*
* Function to set the current state of the presentation and element based on 
* the presentation having been clicked on.
*
* @param dir	0=mousedown, 1=mouseup
*/
function _xrxOnclickButton( dir )
{
	if(!this.suspendClick)
	{
		if(!this.disabled)
		{
			this.pressed = (dir == 0);
			this.display();
		}
	}
}

/*
* Function to set the current state of the presentation and element.
*/
function _xrxSetStateButton()
{
	var theState						= XRXUNSELECTEDBUTTON;

	if ( this.disabled )
	{
		if ( this.selected )
		{
			theState					= XRXUNSELECTABLE_SELECTEDBUTTON;
		}
		else
		{
			theState					= XRXUNSELECTABLEBUTTON;
		}
	}
	else
	{
		if ( this.pressed )
		{
			theState					= XRXPRESSEDBUTTON;
		}
		else if ( this.selected )
		{
			theState					= XRXSELECTEDBUTTON;
		}
	}
// alert( 'in _xrxSetStateButton() / ' + theState + ' / ' + this.disabled + ' / ' + this.selected + ' / ' + this.pressed );

	this.state							= theState;

	return;
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetWidthButton()
{
	return this.imgWidth;
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetHeightButton()
{
	return this.imgHeight;
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetLeftButton()
{
	return this.left;
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetTopButton()
{
	return this.top;
}

/*
* Function to set the current state of this attribute.
*/
function _xrxSetLeftButton( value )
{
	this.div.style.left = (this.left = value) + "px";
}

/*
* Function to set the current state of this attribute.
*/
function _xrxSetTopButton( value )
{
	this.div.style.top = (this.top = value) + "px";
}

/*
* Function to set the current state of this attribute.
*/
function _xrxSetCaptionLeftButton( value )
{
	this.caption.style.left = value + "px";
}

/*
* Function to set the current state of this attribute.
*/
function _xrxSetCaptionTopButton( value )
{
	this.caption.style.top = value + "px";
}

/*
* Function to set the current state of this attribute.
*/
function _xrxSetWidthButton( value )
{
	this.div.style.width = (this.imgWidth = this.img.setWidth( value )) + "px";
}

/*
* Function to set the current state of this attribute.
*/
function _xrxSetHeightButton( value )
{
	this.div.style.height = (this.imgHeight = value) + "px";
	this.img.setHeight( value );
}

/*
* Function to set the event on the presentation layer.
*
* @param eventName	name of event
* @param func	function definition
*/
function _xrxSetEventButton( eventName, func )
{
	this.img.setEvent( eventName, func );
	if(this.caption != null) 
		this.caption.setAttribute( eventName, func );
}

/*
* Function to hide/display the presentation layer.
*
* @param value	true=hide, false=display
*/
function _xrxHideButton( value )
{
	this.img.hide( value );
}

/*
* Function to set an attribute.
*
* @param value	new value
*/
function _xrxSetSelectedButton( value )
{
	if(value != this.selected)
	{
		this.selected = value;
		this.display();
	}
}

/*
* Function to set an attribute.
*
* @param value	new value
*/
function _xrxSetPressedButton( value )
{
	if(value != this.pressed)
	{
		this.pressed = value;
		this.display();
	}
}

function _xrxSetDisabledButton( value )
{
	if(value != this.disabled)
	{
		if(this.disabled = value) 
			this.pressed = false;
		this.display();
	}
}

function _xrxSetCaptionFontButton( font )
{
	this.captionFont = font;
}

function _xrxSetZIndex( index )
{
	this.zIndex = index;
}

/*****************************************************************************
******************************************************************************
**  XrxImage (Parent) ********************************************************
******************************************************************************
*****************************************************************************/

/**
* This object handles widget images. This is the abstract parent class.
*
* @param parent		parent element to attach the image to
* @param imageClass	name of image class
* @param className	name of this class
* @param width		width of the image to display
* @param height		height of the image to display
* @param imgOffset	offset into the array of img sources to start at	
*/
function XrxImage( parent, imageclass, classname, width, height, imgOffset )
{
	// attributes
	this.parentNode = parent;
	this.imageClass = imageclass;
	this.imgData = xrxData[this.imageClass]['images'];
	this.className = classname;
	this.img = null;
	this.imgWidth = width;
	this.imgHeight = height;
	this.actualWidth = width;
	this.actualHeight = height;
	this.imgLeft = 0;
	this.imgTop = 0;
	this.imgOffset = ((imgOffset != undefined)?imgOffset:0);
	this.state = 0;
	this.zIndex = ((this.parentNode.style.zIndex != "")?parseInt( this.parentNode.style.zIndex ):50);
	
	//functions
	this.generate = null;
	this.getWidth = _xrxGetWidthImage;
	this.getHeight = _xrxGetHeightImage;
	this.getLeft = _xrxGetLeftImage;
	this.getTop = _xrxGetTopImage;
	this.getEvent = _xrxGetEventImage;
	this.setWidth = _xrxSetWidthImage;
	this.setHeight = _xrxSetHeightImage;
	this.setLeft = _xrxSetLeftImage;
	this.setTop = _xrxSetTopImage;
	this.setEvent = _xrxSetEventImage;
	this.setState = null;
	this.hide = _xrxHideImage;
	
	// body
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetWidthImage()
{
	return this.actualWidth
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetHeightImage()
{
	return this.actualHeight;
}

function _xrxGetEventImage( ev )
{
	return this.img.getAttribute( ev );
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetLeftImage()
{
	return this.imgLeft;
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetTopImage()
{
	return this.imgTop;
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetWidthImage( value )
{
	if(this.actualWidth != value)
		this.img.style.width = (this.imgWidth = this.actualWidth = value) + "px";
	return this.actualWidth;
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetHeightImage( value )
{
	if(this.actualHeight != value)
		this.img.style.height = (this.imgHeight = this.actualHeight = value) + "px";
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetLeftImage( value )
{
	if(this.imgLeft != value)
		this.img.style.left = (this.imgLeft = value) + "px";
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetTopImage( value )
{
	if(this.imgTop != value)
		this.img.style.top = (this.imgTop = value) + "px";
}

/*
* Function to set the event on the presentation layer.
*
* @param eventName	name of event
* @param func	function definition
*/
function _xrxSetEventImage( eventName, func )
{
	this.img.setAttribute( eventName, func );
}

/*
* Function to hide/display the presentation layer.
*
* @param value	true=hide, false=display
*/
function _xrxHideImage( value )
{
	this.img.style.visibility = ((value)?"hidden":"visible");
}

/*****************************************************************************
******************************************************************************
**  XrxImageScaled  **********************************************************
******************************************************************************
*****************************************************************************/

xrx_extend( XrxImageScaled, XrxImage );

/**
* This object handles widget images.
*
* @param parent		parent element to attach the image to
* @param imageClass	name of image class
* @param className	name of this class
* @param width		width of the image to display
* @param height		height of the image to display
* @param imgOffset	offset into the array of img sources to start at		
* @param imgSep		increment between img srcs in image array		
*/
function XrxImageScaled( parent, imageclass, width, height, imgOffset, imgSep )
{
	// constructor
	XrxImageScaled.baseConstructor.call( this, parent, imageclass, 'XrxImageScaled', width, height, imgOffset );
	
	// attributes
	
	//functions
	
	// body
	this.generate = _xrxGenerateImageScaled;
	this.setState = _xrxSetStateImageScaled;
}

/*
* Function to generate the presentation elements from the given attributes.
*/
function _xrxGenerateImageScaled()
{
	this.img = xrxCreateImg( this.parentNode );
	this.img.style.zIndex = this.zIndex + 1;
	this.img.style.width = this.imgWidth + "px";
	this.img.style.height = this.imgHeight + "px";
	this.img.src = this.imgData[this.state+this.imgOffset].src;
}

/*
* Function to set the current state of the presentation and element.
*
* @param state	new state to set
*/
function _xrxSetStateImageScaled( state )
{
	if(state != this.state)
		this.img.src = this.imgData[(this.state = state)+this.imgOffset].src;
}

/*****************************************************************************
******************************************************************************
**  XrxImageSliced  **********************************************************
******************************************************************************
*****************************************************************************/

xrx_extend( XrxImageSliced, XrxImage );

/**
* This object handles widget images.
*
* @param parent		parent element to attach the image to
* @param imageClass	name of image class
* @param width		width of the image to display
* @param height		height of the image to display
* @param imgOffset	offset into the array of img sources to start at	
* @param imgSep		increment between img srcs in image array		
* @param myclass	name of this class, used by child classes	
*/
function XrxImageSliced( parent, imageclass, width, height, imgOffset, imgSep, myclass )
{
	// constructor
	XrxImageSliced.baseConstructor.call( this, parent, imageclass, ((myclass == undefined)?'XrxImageSliced':myclass), 
										width, height, imgOffset );
	// attributes
	this.imgSep = (((imgSep != undefined) && (imgSep != null))?imgSep:3);
	
	//functions
	this.setCenterTiles = _xrxSetCenterTilesImageSliced;
	
	// body
	this.generate = _xrxGenerateImageSliced;
	this.getEvent = _xrxGetEventImageSliced;
	this.setWidth = _xrxSetWidthImageSliced;
	this.setHeight = _xrxSetHeightImageSliced;
	this.setLeft = _xrxSetLeftImageSliced;
	this.setTop = _xrxSetTopImageSliced;
	this.setEvent = _xrxSetEventImageSliced;
	this.setState = _xrxSetStateImageSliced;
	this.hide = _xrxHideImageSliced;
}

/*
* Function to generate the presentation elements from the given attributes.
*/
function _xrxGenerateImageSliced()
{
	var sliceEndSize = xrxData[this.imageClass]['sliceEndSize'];

	this.img = new Array();
	this.img[0] = xrxCreateImg( this.parentNode );
	this.img[0].style.width = sliceEndSize + "px";
	this.img[0].style.height = this.imgHeight + "px";
	this.img[0].style.zIndex = this.zIndex + 1;
	this.img[0].src = this.imgData[this.imgOffset].src;
	
	this.img[1] = xrxCreateImg( this.parentNode );
	this.img[1].style.width = sliceEndSize + "px";
	this.img[1].style.height = this.imgHeight + "px";
	this.img[1].style.zIndex = this.zIndex + 1;
	this.img[1].src = this.imgData[this.imgSep+this.imgOffset].src;
	
	this.setCenterTiles();
}

function _xrxSetCenterTilesImageSliced()
{
	var sliceEndSize = xrxData[this.imageClass]['sliceEndSize'];
	var slices = Math.ceil( (this.imgWidth - (2 * (this.actualWidth = sliceEndSize))) 
							/ xrxData[this.imageClass]['sliceCtrSize'] );
	var i;
	var ii;

	for ( i = 2, ii = ( 2 + slices ); i < ii; i++ )
	{
		if((this.img[i] == undefined) || (this.img[i] == null)) this.img[i] = xrxCreateImg( this.parentNode );
		this.img[i].style.width = xrxData[this.imageClass]['sliceCtrSize'] + "px";
		this.img[i].style.height = this.imgHeight + "px";
		this.img[i].style.zIndex = this.zIndex + 1;
		this.img[i].src = this.imgData[(2*this.imgSep)+this.imgOffset].src;
		this.img[i].style.left = (this.imgLeft + this.actualWidth) + "px";
		this.actualWidth += xrxData[this.imageClass]['sliceCtrSize'];
	}

	for ( var x = i, xx = this.img.length; x < xx; x++ )
	{
		if((this.img[x] != undefined) && (this.img[x] != null))
		{
			this.parentNode.removeChild( this.img[x] );
			this.img[x] = null;
		}
	}

	this.img[1].style.left = (this.imgLeft + this.actualWidth) + "px";
	this.actualWidth += sliceEndSize;
}

/*
* Function to set the current state of the presentation and element.
*
* @param state	new state to set
*/
function _xrxSetStateImageSliced( state )
{
	if(this.state != state)
	{
		this.state = state;

		var img;

		for ( var i = 0, ii = this.img.length; i < ii; i++ )
		{
			img = this.img[i];

			if((img != undefined) && (img != null))
			{
				img.src = this.imgData[(((i < 2)?i:2) * this.imgSep) 
								+ state + this.imgOffset].src;
			}
		}
	}
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetEventImageSliced( ev )
{
	return this.img[0].getAttribute( ev );
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetWidthImageSliced( value )
{
	this.imgWidth = value;
	this.setCenterTiles();
	return this.actualWidth;
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetHeightImageSliced( value )
{
	this.imgHeight = this.actualHeight = value
	var img;

	for ( var i = 0, ii = this.img.length; i < ii; i++ )
	{
	    img = this.img[i];

		if((img != undefined) && (img != null))
		{
			img.style.height = strjoin( this.imgHeight, "px" );
		}
	}
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetLeftImageSliced( value )
{
	this.img[0].style.left = strjoin( (this.imgLeft = value), "px" );
	var length = this.img.length;
	var sliceEndSize = xrxData[this.imageClass]['sliceEndSize'];
	var sliceCtrSize = xrxData[this.imageClass]['sliceCtrSize'];
	var img;
	for ( var i = 2, ii = this.img.length; i < ii; i++ )
	{
	    img = this.img[i];
		if((img != undefined) && (img != null))
		{
			img.style.left = (value + sliceEndSize + ((i - 2) * sliceCtrSize)) + "px";
		}
	}
	this.img[1].style.left = (value + this.actualWidth - sliceEndSize) + "px";
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetTopImageSliced( value )
{
	this.imgTop = value;
	var img;
	for ( var i = 0, ii = this.img.length; i < ii; i++ )
	{
	    img = this.img[i];
		if((img != undefined) && (img != null))
		{
			this.img[i].style.top = this.imgTop + "px";
		}
	}
}

/*
* Function to set the event on the presentation layer.
*
* @param eventName	name of event
* @param func	function definition
*/
function _xrxSetEventImageSliced( eventName, func )
{
	for ( var i = 0, ii = this.img.length; i < ii; i++ )
	{
		this.img[i].setAttribute( eventName, func );
	}
}

/*
* Function to hide/display the presentation layer.
*
* @param value	true=hide, false=display
*/
function _xrxHideImageSliced( value )
{
	for ( var i = 0, ii = this.img.length; i < ii; i++ )
	{
		this.img[i].style.visibility = ((value)?"hidden":"visible");
	}
}

/*****************************************************************************
******************************************************************************
**  XrxImageSlicedScaled  ****************************************************
******************************************************************************
*****************************************************************************/

xrx_extend( XrxImageSlicedScaled, XrxImageSliced );

/**
* This object handles widget images.
*
* @param parent		parent element to attach the image to
* @param imageClass	name of image class
* @param width		width of the image to display
* @param height		height of the image to display
* @param imgOffset	offset into the array of img sources to start at	
* @param imgSep		increment between img srcs in image array		
*/
function XrxImageSlicedScaled( parent, imageclass, width, height, imgOffset, imgSep )
{
	// constructor
	XrxImageSlicedScaled.baseConstructor.call( this, parent, imageclass, width, height, imgOffset, imgSep,
												'XrxImageSlicedScaled' );
	
	// attributes
	
	//functions
	
	// body
	this.generate = _xrxGenerateImageSlicedScaled;
	this.setWidth = _xrxSetWidthImageSlicedScaled;
	this.setLeft = _xrxSetLeftImageSlicedScaled;
}

/*
* Function to generate the presentation elements from the given attributes.
*/
function _xrxGenerateImageSlicedScaled()
{
	var sliceEndSize = xrxData[this.imageClass]['sliceEndSize'];

	this.img = new Array();
	this.img[0] = xrxCreateImg( this.parentNode );
	this.img[0].style.width = sliceEndSize + "px";
	this.img[0].style.height = this.imgHeight + "px";
	this.img[0].style.zIndex = this.zIndex + 1;
	this.img[0].src = this.imgData[this.imgOffset].src;
	
	this.img[2] = xrxCreateImg( this.parentNode );
	var w = (2 * sliceEndSize);
	var w2;
	this.img[2].style.width = (w2 = (((w + 2) >= this.imgWidth)?2:(this.imgWidth - w))) + "px";
	this.actualWidth = w + w2;
	this.img[2].style.height = this.imgHeight + "px";
	this.img[2].style.zIndex = this.zIndex + 1;
	this.img[2].src = this.imgData[( this.imgSep * 2 ) +this.imgOffset].src;
	this.img[2].style.left = sliceEndSize + "px";
	
	this.img[1] = xrxCreateImg( this.parentNode );
	this.img[1].style.width = sliceEndSize + "px";
	this.img[1].style.height = this.imgHeight + "px";
	this.img[1].style.zIndex = this.zIndex + 1;
	this.img[1].src = this.imgData[this.imgSep + this.imgOffset].src;
	this.img[1].style.left = (this.actualWidth - sliceEndSize) + "px";
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetWidthImageSlicedScaled( value )
{
    var sliceEndSize = xrxData[this.imageClass]['sliceEndSize'];

	this.imgWidth = value;
	var w = (sliceEndSize * 2);
	this.actualWidth = ((value < (w + 2))?(w + 2):value);
	this.img[1].style.left = (this.actualWidth - sliceEndSize + this.imgLeft) + "px";
	this.img[2].style.width = (this.actualWidth - w) + "px";
	return this.actualWidth;
}

/*
* Function to set the current state of this attribute.
*
* @param value	new value to set
*/
function _xrxSetLeftImageSlicedScaled( value )
{
	this.img[0].style.left = (this.imgLeft = value) + "px";
	this.img[1].style.left = (this.actualWidth - sliceEndSize + value) + "px";
	this.img[2].style.left = (value + sliceEndSize) + "px";
}


/*****************************************************************************
******************************************************************************
**  XrxImageDrawn  ***********************************************************
******************************************************************************
*****************************************************************************/

xrx_extend( XrxImageDrawn, XrxImage );

/**
* This object handles widget images and draws the presentation layer.
*
* @param parent		parent element to attach the image to
* @param imageClass	name of image class
* @param width		width of the image to display
* @param height		height of the image to display
* @param imgOffset	offset into the array of img sources to start at	
* @param imgSep		increment between img srcs in image array		
* @param myclass	name of this class, used by child classes		
*/
function XrxImageDrawn( parent, colors, width, height, imgOffset, imgSep, myclass )
{
	// constructor
	XrxImageDrawn.baseConstructor.call( this, parent, "", ((myclass == undefined)?'XrxImageDrawn':myclass), 
										width, height );

	// attributes
	this.colors = colors;
	
	//functions
	
	// body
	this.generate = _xrxGenerateImageDrawn;
	this.setState = _xrxSetStateImageDrawn;
}

/*
* Function to generate the presentation elements from the given attributes.
*/
function _xrxGenerateImageDrawn()
{
	this.img = xrxCreateDiv( this.parentNode );
	this.img.style.width = this.imgWidth + "px";
	this.img.style.height = this.imgHeight + "px";
	this.img.style.zIndex = this.zIndex + 1;
	xrxSetBorder( this.img, 1, "solid", "Black" );
	this.img.style.backgroundColor = this.colors[0];
}

/*
* Function to set the current state of the presentation and element.
*
* @param state	new state to set
*/
function _xrxSetStateImageDrawn( state )
{
	this.state = state;
	this.img.style.backgroundColor = this.colors[state];
}

/*
* Function to get the current state of this attribute.
*/
function _xrxGetEventImageDrawn( ev )
{
	return this.img.getAttribute( ev );
}

/*****************************************************************************
******************************************************************************
************************  Widget External Functions  *************************
******************************************************************************
*****************************************************************************/

/*
* This function invokes the attribute change handler in the given element.
*
* @param id	id of element
*/
function xrxRefreshWidget( id, desc )
{
	var node = document.getElementById( id );
	var widget;
	if(node != null)
		if(node.hasAttribute( 'index' ))
			if((widget = xrxWidgetObjectArray[node.getAttribute( 'index' )]) != undefined)
			{
				node.setAttribute( 'changed', ((desc != undefined)?desc:true) );
				return true;
			}
	return false;
}

/*
* This function is the Singleton pattern accessor to get a handle on the Singleton keyboard.
*/
function xrxGetKeyboard()
{
	if(xrxWidgetObjectArray['keyboard'] == undefined) 
		xrxWidgetObjectArray['keyboard'] = new XRXKeyboardSingleton();
	return xrxWidgetObjectArray['keyboard'];
}

/*
* This function preloads the necessary images for the widget with the given index.
*
* @param index	widget index
*/
function xrxLoadImages( className )
{
	try
	{
		if((xrxData[className] == undefined) || (xrxData[className]['imageNames'] == undefined))
			xrxLoadBackupWidgetData( className );
	}
	catch( e ){}

	if (xrxData[className] != undefined)
	{
		if (xrxData[className]['images'] == undefined)
		{
			if (xrxData[className]['imageNames'] != undefined)
			{
				xrxData[className]['images'] = new Array();

				for ( var i = 0, ii = xrxData[className]['imageNames'].length; i < ii; i++ )
				{
					xrxData[className]['images'][i] = new Image();
					xrxData[className]['images'][i].src = xrxData[className]['imageNames'][i];
				}
			}
		}
	}
}

/*
* This function passes the click call to the widget with the given index.
*
* @param index	widget index
* @param parameter1	optional parameter
* @param parameter2	optional parameter
* @param parameter3	optional parameter
*/
function xrxOnClickWidget( index, parameter1, parameter2, parameter3 )
{
	if(xrxWidgetObjectArray[index] != undefined)
		if(xrxWidgetObjectArray[index].handleClick != undefined)
			if(parameter1 == undefined)
				xrxWidgetObjectArray[index].handleClick();
			else
				if(parameter2 == undefined)
					xrxWidgetObjectArray[index].handleClick( parameter1 );
				else
					if(parameter3 == undefined)
						xrxWidgetObjectArray[index].handleClick( parameter1, parameter2 );
					else
						xrxWidgetObjectArray[index].handleClick( parameter1, parameter2, parameter3 );
}

/*
* This function invokes regeneration in the widget with the given index.
*
* @param index	widget index
*/
function xrxRegenerate( index )
{
	if((xrxWidgetObjectArray[index] != undefined) && (xrxWidgetObjectArray[index] != null))
		xrxWidgetObjectArray[index].regenerate();
}

/*
* This function invokes the handler for this event in the widget with the given index.
*
* @param evt	event
*/
function xrxHandleAttrChange( evt )
{
	var node = evt.currentTarget;
	if(node != null)
		if(node.hasAttribute( 'index' ))
		{
			var index = node.getAttribute( 'index' );
			if(xrxWidgetObjectArray[index] != undefined)
				if(!xrxWidgetObjectArray[index].suspendAttrChange)
					xrxWidgetObjectArray[index].attrChange( evt );
		}
}

/*
* This function invokes the handler for this event in the widget with the given index.
*
* @param evt	event
*/
function xrxHandleRemove( evt )
{
	var node = evt.currentTarget;
	if(node != null)
		if(node.hasAttribute( 'index' ))
		{
			var index = node.getAttribute( 'index' );
			if(xrxWidgetObjectArray[index] != undefined) xrxWidgetObjectArray[index].remove( evt );
		}
}

/*****************************************************************************
******************************************************************************
****************************  Widget Load Functions  *************************
******************************************************************************
*****************************************************************************/

/*
* This function gets the next available unique widget index.
*
* @return next available widget index
*/
function xrxGetWidgetIndex()
{
	for ( var i = 0, ii = 10000; i < ii; i++ )
	{
		if((xrxWidgetObjectArray["xrx"+i] == undefined) || (xrxWidgetObjectArray["xrx"+i] == null))
		{
			return( "xrx" + i );
		}
	}
}

/*
* This function is called fom xrx_load_widgets() to scan the document and convert
* markup in ASP.net form and markup specific to the previous version of the Xerox
* widgets to the current markup.
*/
function xrxPreprocessor()
{
	var attrs;
	var attr;
	var node;
	var widgets = new Array();
	var els = new Array();
	var tag = -1;
	var pos = -1;
	var xrxClass;
	var id;
	var elements = document.getElementsByTagName( 'span' );
	var done = false;
	while(!done)
	{
		done = true;
		for(var i = 0;i < elements.length;++i)
			if((elements[i].hasAttribute( 'class' )) && 
				(XRXCONSTRUCTORNAMES[xrxTrim( elements[i].getAttribute( 'class' ).toLowerCase() )] != undefined) &&
				(xrxInArray( xrxWidgetsRequired, name ) >= 0))
			{
				var inp = false;
				var lab = false;
				var label = null;
				var child;
				node = null;
				for(var b = 0;(b < elements[i].childNodes.length) && (!inp || !lab);++b) 
				{
					child = elements[i].childNodes.item( b );
					if(!inp && (child.tagName.toLowerCase() == "input"))
					{
						node = child;
						node.setAttribute( 'class', elements[i].getAttribute( 'class' ) );
						attrs = ['style','onmousedown','onclick','onmouseup','onchange','imgsize','label','labelalign',
								'width',XRXDISABLEKEYWORD,XRXDISABLEHANDLERKEYWORD,'name','onfocus','onblur','checked'];
						for(var x = 0;x < attrs.length;++x)
							if(elements[i].hasAttribute( attrs[x] )) 
								node.setAttribute( attrs[x], elements[i].getAttribute( attrs[x] ) );
						inp = true;
					}
					if(!lab && (child.tagName.toLowerCase() == "label"))
					{
						label = child.firstChild.nodeValue;
						lab = true;
					}
				}
				if(node != null)
				{
					if((label != null) && (!node.hasAttribute( 'label' )))
						node.setAttribute( 'label', label );
					elements[i].removeChild( node );
					elements[i].parentNode.insertBefore( node, elements[i] );
					elements[i].parentNode.removeChild( elements[i] );
					done = false;
					break;
				}
			}
		if(!done) elements = document.getElementsByTagName( 'span' );
	}
	var search = ['button','a','select'];
	for(var n = 0;n < search.length;++n)
	{
		elements = document.getElementsByTagName( search[n] );
		var name;
		for(var i = 0;i < elements.length;++i)
		{
			name = elements[i].tagName.toLowerCase();
			if(elements[i].hasAttribute( 'xrxsetattr' ))
			{
				var tokens = elements[i].getAttribute( 'xrxsetattr' ).split( ":p:" );
				if(tokens.length == 2)
				{
					elements[i].setAttribute( tokens[0], eval(tokens[1]) );
					elements[i].removeAttribute( 'xrxsetattr' );
				}
			}
			if(elements[i].hasAttribute( 'class' ) && 
				(XRXCONSTRUCTORNAMES[xrxClass = xrxTrim( elements[i].getAttribute( 'class' ) )
							.toLowerCase()] != undefined) && (xrxInArray( xrxWidgetsRequired, xrxClass ) >= 0))
			{
				switch( xrxClass )
				{
					case "xrx:windowbearing":
						if((name == "button") || (name == "a"))
						{
							widgets[++pos] = document.createElement( 'input' );
							if(!elements[i].hasAttribute( 'id' )) elements[i].setAttribute( 'id', "xrxwidget_id_" + pos );
							widgets[pos].setAttribute( 'id', (id = elements[i].getAttribute( 'id' )) );
							elements[i].setAttribute( 'id', (els[pos] = id + "_temp") );

							xrxPrivCopyAttributes( widgets[pos], elements[i] );

							if(!elements[i].hasAttribute( 'label' ) && (elements[i].firstChild != null) && 
									(elements[i].firstChild.nodeType == 3))
								widgets[pos].setAttribute( 'label', elements[i].firstChild.nodeValue );
						}
						break;
					case "xrx:serviceselector":
						if(name == "button")
						{
							widgets[++pos] = document.createElement( 'input' );
							if(!elements[i].hasAttribute( 'id' )) elements[i].setAttribute( 'id', "xrxwidget_id_" + pos );
							widgets[pos].setAttribute( 'id', (id = elements[i].getAttribute( 'id' )) );
							elements[i].setAttribute( 'id', (els[pos] = id + "_temp") );

							xrxPrivCopyAttributes( widgets[pos], elements[i] );

							widgets[pos].setAttribute( 'type', 'button' );
							
							for ( var x = 0, xx = elements[i].childNodes.length; x < xx; x++ )
							{
								node = elements[i].childNodes.item(x);
								if(node.nodeName.toLowerCase() == "img")
									widgets[pos].setAttribute( "icon", node.getAttribute( 'src' ) );
							}
						}
						break;
					case "xrx:command":
						if(name == "button")
						{
							widgets[++pos] = document.createElement( 'input' );
							if(!elements[i].hasAttribute( 'id' )) elements[i].setAttribute( 'id', "xrxwidget_id_" + pos );
							widgets[pos].setAttribute( 'id', (id = elements[i].getAttribute( 'id' )) );
							elements[i].setAttribute( 'id', (els[pos] = id + "_temp") );

							xrxPrivCopyAttributes( widgets[pos], elements[i] );

							widgets[pos].setAttribute( 'type', 'button' );
							if(!elements[i].hasAttribute( 'label' ))
							{
								for ( var x = 0, xx = elements[i].childNodes.length; x < xx; x++ )
								{
									node = elements[i].childNodes.item(x);
									if(node.nodeType == 3)
									{
										widgets[pos].setAttribute( "label", node.nodeValue );
										break;
									}
								}
							}
						}
						break;
					case "xrx:radio":
					case "xrx:radiosmall":
						if(name == "select")
						    // added to prevent doubling of radio buttons whem xrx_load_widgets called twice - CQ 404393
						    if(!elements[i].hasAttribute( 'transformed' ))
						    {
								var radioId;

								if(!elements[i].hasAttribute( 'id' ))
								    elements[i].setAttribute( 'id', "xrxels_id_" + ++tag );
							    elements[i].setAttribute( 'transformed', "true" );
								
								for ( var x = 0, xx = elements[i].options.length; x < xx; x++ )
								{
									widgets[++pos] = document.createElement( 'input' );
									els[pos] = elements[i].getAttribute( 'id' );
									widgets[pos].setAttribute( 'id', (radioId = (els[pos] + "_" + x )) );
									elements[i].options[x].setAttribute( 'xrxradioid', radioId );

									xrxPrivCopyAttributes( widgets[pos], elements[i] );

									widgets[pos].setAttribute( 'type', 'radio' );
									if(elements[i].options[x].hasAttribute( 'selected' )) 
										widgets[pos].setAttribute( 'checked', true );
									if(elements[i].options[x].hasAttribute( 'value' )) 
										widgets[pos].setAttribute( 'value', elements[i].options[x].getAttribute( 'value' ) );
									if(elements[i].options[x].hasAttribute( 'disabled' )) 
										widgets[pos].setAttribute( 'unselectable', true );
									if(elements[i].options[x].firstChild.nodeType == 3)
										widgets[pos].setAttribute( 'label', elements[i].options[x].firstChild.nodeValue );
									widgets[pos].setAttribute( 'hasselect', els[pos] );
								}
								if(elements[i].hasAttribute( 'onchange' ))
									elements[i].removeAttribute( 'onchange' );
							}
						break;
				} 
			}
		}
	}

	for ( var x = 0, xx = widgets.length; x < xx; x++ )
	{
		node = document.getElementById( els[x] );
		node.parentNode.insertBefore( widgets[x], node );
	}

	for ( var x = 0, xx = els.length; x < xx; x++ )
	{
		node = document.getElementById( els[x] );

		if(node != null)
		{
			if(node.tagName.toLowerCase() != 'select')
			{
				node.parentNode.removeChild( node );
			}
			else
			{
				node.style.display = "none";
			}
		}
	}
}

/*
* This is the main function that scans the document and replaces elements found with
* a Xerox widget presentation layer object. Elements that have the attribute 'index'
* are ignored as already generated.
*/
function xrxProcessWidgets()
{
	var widget;
	var index;
	var elements;
	var name;
	var tag;
	if (xrxPreprocessorNeeded)
	{
		xrxPreprocessor();
	}

	for(var typeName in xrxTypesRequired)
	{
		if(xrxTypesRequired[typeName])
		{
			elements = document.getElementsByTagName( typeName );

			for ( var i = 0, ii = elements.length; i < ii; i++ )
			{
				if((!elements[i].hasAttribute( 'index' )) && ((tag = elements[i].tagName.toLowerCase()) != "div") 
							&& (elements[i].hasAttribute( 'class' )))
				{
					if((XRXCONSTRUCTORNAMES[name = xrxTrim( elements[i].getAttribute( 'class' ) ).toLowerCase()] != undefined) &&
							(xrxInArray( xrxWidgetsRequired, name ) >= 0))
					{
						if(tag == XRXWIDGETTYPES[name])
						{
							index = xrxGetWidgetIndex();
							widget = null;
							try
							{ // if the appropriate widget file has not been loaded, will silently fail
								widget = eval( "new " + XRXCONSTRUCTORNAMES[name] + "(elements[i],index)" );
								if(widget != null)
								{
									xrxWidgetObjectArray[index] = widget;
									widget.generate();
								}
							}
							catch( e ) {}
						}
					}
				}
			}
		}
	}
}

/*****************************************************************************
******************************************************************************
**********************  Onload Event Definition ******************************
******************************************************************************
*****************************************************************************/

function xrx_load_widgets()
{
	if(xrxData == undefined) xrxLoadDefaultData();
	xrxProcessWidgets();
}

window.onload = xrx_load_widgets;

/*****************************************************************************
******************************************************************************
***********************  Default Data Load  **********************************
******************************************************************************
*****************************************************************************/

function xrxLoadDefaultData()
{
	XRX_DATA_VERSION_STRING = "Default Data";
	xrxData = new Array();
	
	// Device characteristics
	xrxData['color'] = 'mono';
	xrxData['screen'] = '640x240';

	xrxData['spinbox'] = new Array();
	xrxData['spinbox']['imageNames'] = [xrxImageLocation+"numbt_nl.gif",xrxImageLocation+"numbt_nl.gif",xrxImageLocation+"numbt_nal.gif",
				xrxImageLocation+"numbt_nr.gif",xrxImageLocation+"numbt_nr.gif",xrxImageLocation+"nubt_nar.gif",
				xrxImageLocation+"numbt_nc.gif",xrxImageLocation+"numbt_nc.gif",xrxImageLocation+"nubt_nac.gif",
				xrxImageLocation+"numbt_nl.gif",xrxImageLocation+"numbt_nl.gif",xrxImageLocation+"nubt_nal.gif",
				xrxImageLocation+"numbt_nr.gif",xrxImageLocation+"numbt_nr.gif",xrxImageLocation+"nubt_nar.gif",
				xrxImageLocation+"numbt_nc.gif",xrxImageLocation+"numbt_nc.gif",xrxImageLocation+"nubt_nac.gif",
				xrxImageLocation+"scrl_u.gif",xrxImageLocation+"scrl_u_s.gif",xrxImageLocation+"scrl_u_n.gif",
				xrxImageLocation+"scrl_dn.gif",xrxImageLocation+"scrl_d_s.gif",xrxImageLocation+"scrl_d_n.gif"];
	xrxData['spinbox']['attributes'] = ["style"];
	xrxData['spinbox']['imgWidth'] = 38;
	xrxData['spinbox']['imgHeight'] = 38;
	xrxData['spinbox']['boxHeight'] = 24;
	xrxData['spinbox']['sliceEndSize'] = 8;
	xrxData['spinbox']['sliceCtrSize'] = 4;
	xrxData['spinbox']['fgcolor'] = "Black";
	xrxData['spinbox']['bgcolor'] = "White";

	xrxData['command'] = new Array();
	xrxData['command']['imageNames'] = [xrxImageLocation+"tb_sq_l.gif",xrxImageLocation+"tb_sq_ls.gif",xrxImageLocation+"tb_sq_ln.gif",
							xrxImageLocation+"tb_sq_r.gif",xrxImageLocation+"tb_sq_rs.gif",xrxImageLocation+"tb_sq_rn.gif",
							xrxImageLocation+"tb_sq_c.gif",xrxImageLocation+"tb_sq_cs.gif",xrxImageLocation+"tb_sq_cn.gif"];
	xrxData['command']['imgWidth'] = 80;
	xrxData['command']['imgHeight'] = 38;
	xrxData['command']['sliceEndSize'] = 16;
	xrxData['command']['sliceCtrSize'] = 4;

	xrxData['windowbearing'] = new Array();
	xrxData['windowbearing']['imageNames'] = [xrxImageLocation+"bt_rd.gif",xrxImageLocation+"bt_rd_s.gif",xrxImageLocation+"bt_rd_n.gif"];
	xrxData['windowbearing']['imgWidth'] = 48;
	xrxData['windowbearing']['imgHeight'] = 48;

	xrxData['serviceselector'] = new Array();
	xrxData['serviceselector']['imageNames'] = [xrxImageLocation+"w_pi_l.png",xrxImageLocation+"w_pi_ls.png",xrxImageLocation+"w_pi_ln.png"];
	xrxData['serviceselector']['imgWidth'] = 68;
	xrxData['serviceselector']['imgHeight'] = 48;
	xrxData['serviceselector']['defaultLabelAlign'] = 'right';

	xrxData['radio'] = new Array();
	xrxData['radio']['imageNames'] = [xrxImageLocation+"s_fbtn.gif",xrxImageLocation+"s_fbtn_s.gif",xrxImageLocation+"s_fbtn_n.gif",
										xrxImageLocation+"s_fbtn_n.gif"];
	xrxData['radio']['imgWidth'] = 48;
	xrxData['radio']['imgHeight'] = 42;

	xrxData['radiosmall'] = new Array();
	xrxData['radiosmall']['imageNames'] = [xrxImageLocation+"sm_fbtn.gif",xrxImageLocation+"sm_fbtn_s.gif",xrxImageLocation+"sm_fbtn_n.gif",
										xrxImageLocation+"sm_fbtn_n.gif"];
	xrxData['radiosmall']['imgWidth'] = 32;
	xrxData['radiosmall']['imgHeight'] = 22;

	xrxData['select'] = new Array();
	xrxData['select']['imageNames'] = [
		xrxImageLocation+"scrl_u.gif",xrxImageLocation+"scrl_u_s.gif",xrxImageLocation+"scrl_u_s.gif",xrxImageLocation+"scrl_u_n.gif",xrxImageLocation+"scrl_u_n.gif",
		xrxImageLocation+"scrl_dn.gif",xrxImageLocation+"scrl_d_s.gif",xrxImageLocation+"scrl_d_s.gif",xrxImageLocation+"scrl_d_n.gif",xrxImageLocation+"scrl_d_n.gif",
		xrxImageLocation+"numbt_nl.gif",xrxImageLocation+"numbt_sl.gif",xrxImageLocation+"numbt_sl.gif",xrxImageLocation+"nubt_nal.gif",xrxImageLocation+"nubt_nal.gif",
		xrxImageLocation+"numbt_nr.gif",xrxImageLocation+"numbt_sr.gif",xrxImageLocation+"numbt_sr.gif",xrxImageLocation+"nubt_nar.gif",xrxImageLocation+"nubt_nar.gif",
		xrxImageLocation+"numbt_nc.gif",xrxImageLocation+"numbt_sc.gif",xrxImageLocation+"numbt_sc.gif",xrxImageLocation+"nubt_nac.gif",xrxImageLocation+"nubt_nac.gif"];
	xrxData['select']['imgWidth'] = 165;
	xrxData['select']['imgHeight'] = 140;
	xrxData['select']['scrollWidth'] = 38;
	xrxData['select']['scrollHeight'] = 38;
	xrxData['select']['width'] = 150;
	xrxData['select']['sliceEndSize'] = 8;
	xrxData['select']['sliceCtrSize'] = 4;
	xrxData['select']['sliceHeight'] = 37;
	xrxData['select']['iconSize'] = 25;

	xrxData['keyboardtext'] = new Array();
	xrxData['keyboardtext']['bgcolor'] = "rgb(255, 255, 255)";
	xrxData['keyboardtext']['borderWidth'] = 2;
	xrxData['keyboardtext']['borderColor'] = "Black";
	xrxData['keyboardtext']['borderStyle'] = "solid";
	
	xrxData['scroll_buttons'] = 
			[xrxImageLocation+"scrl_up.gif",xrxImageLocation+"scrl_up_s.gif",xrxImageLocation+"scrl_up_d.gif",
			xrxImageLocation+"scrl_dn.gif",xrxImageLocation+"scrl_dn_s.gif",xrxImageLocation+"scrl_dn_d.gif",
			xrxImageLocation+"scrl_l.gif",xrxImageLocation+"scrl_l_s.gif",xrxImageLocation+"scrl_l_n.gif",
			xrxImageLocation+"scrl_r.gif",xrxImageLocation+"scrl_r_s.gif",xrxImageLocation+"scrl_r_n.gif"];
}

/*****************************************************************************
**************************  Misc Functions  *********************************
*****************************************************************************/

function addClass(i_obj, strClass) { if ( !hasClass(i_obj, strClass) ) { if ( !i_obj.className ) { i_obj.className = strClass; } else { i_obj.className += " " + strClass; }} }
function getClassNameRegExp(strClass) { return new RegExp("(^|\\s)" + strClass + "(\\s|$)"); }
function hasClass(i_obj, strClass) { return i_obj.className.match(getClassNameRegExp(strClass)); }
function removeClass(i_obj, strClass) { i_obj.className = i_obj.className.replace(getClassNameRegExp(strClass), ""); }
function xrxDisplaySR3( i_strMsg ) { var objDiv = document.getElementById('xrxSR3Text'); if ((null != objDiv) && (undefined != objDiv)) { objDiv.innerHTML = i_strMsg; }}
function xrxGetWidgetCodeVersion() { return XRX_WIDGETS_VERSION; }
function xrxGetWidgetDataVersion() { return ''; }	// deprecated - will be removed in the future
function xrxGetWidgetExtensionVersion() { return ''; }	// deprecated - will be removed in the future
function xrxGetWidgetStyleVersion() { return ''; }	// deprecated - will be removed in the future

/******************************  End of File  *****************************************/
