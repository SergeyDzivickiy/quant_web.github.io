
$('#ethernet_apply').on('click', function () {
	alert("test");
});

var connected_eth = 0;
var status_connection_eth = document.getElementById("status_eth");
if(connected_eth == 1)
{
	status_connection_eth.innerHTML = "Connected";
}else{
	status_connection_eth.innerHTML = "No connection";
}

//*******************WEB SOCKET***********************************//
function get_appropriate_ws_url(extra_url)
{
	var pcol;
	var u = document.URL;

	if (u.substring(0, 5) === "https") {
		pcol = "wss://";
		u = u.substr(8);
	} else {
		pcol = "ws://";
		if (u.substring(0, 4) === "http")
			u = u.substr(7);
	}

	u = u.split("/");

	/* + "/xxx" bit is for IE10 workaround */

	return pcol + u[0] + "/" + extra_url;
}

function new_ws(urlpath, protocol)
{
	return new WebSocket(urlpath, protocol);
}

document.addEventListener("DOMContentLoaded", function() {

	var ws = new_ws(get_appropriate_ws_url(""), "lws-minimal");
	ws.binaryType = "blob";
	try {
		ws.onopen = function() {
			console.log("Connected");
			console.log(ws);
		};

		ws.onmessage =function got_packet(msg) {
			console.log("Data from Server: "  + msg.data);
			var sizeInBytes = (msg.data).size;
		};
		
		ws.onclose = function(){
			console.log("Connection Close");
		};
	} catch(exception) {
		alert("<p>Error " + exception);  
	}
	

}, false);
//*******************WEB SOCKET***********************************//