// Router file to shift the location of the Xerox Widgets

// true = offbox 
// false = on device
var XRXRouterEnabled = false;

// [Offbox Server Address] - Your Offbox Server ip address
// [Folder Path] - The xrx_g9_widgets path relative to the Web root on your Offbox Server
//var xrxServerLoc = "http://[Offbox Server ip Address]/[Folder Path]/xrx_g9_widgets/";
var xrxServerLoc = "http://localhost:82/Scripts/";
var xrxServerLocStyles = "http://localhost:82/styles/";

// Xerox 9th Gen Widgets path relative to your application
// var xrxServerLoc = "../xrx_g9_widgets/";      

// Do not touch this section
if (!XRXRouterEnabled) {
	xrxServerLoc = "http://localhost/xrx_g9_widgets/";
	xrxServerLocStyles = "http://localhost/styles/";
}

(function loadJSandCSS() {
	//document.write('<link rel=\"stylesheet\" href=\"' + xrxServerLoc + 'XRXg9Widgets.min.css\" type=\"text/css\" />');
	document.write('<link rel=\"stylesheet\" href=\"' + xrxServerLocStyles + 'XRXg9Widgets.min.css\" type=\"text/css\" />');
	document.write('<script src=\"' + xrxServerLoc + 'XRXg9Widgets.min.js\"></script>');
})();
//    xrxServerLocjs = "http://192.168.1.206/blabla/ServerAppFax/Scripts/";
//    xrxServerLoccss = "http://192.168.1.206/blabla/ServerAppFax/styles/";
