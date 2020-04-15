/* RTSP Ratio*/
var slider = document.getElementById("Range_bitrate");
var bitrate = document.getElementById("bitrate").value;

var bitrate_cam1 = document.getElementById("bitrate_cam1");
var bitrate_cam2 = document.getElementById("bitrate_cam2");

var cam1 = document.getElementById("cam1");
var cam2 = document.getElementById("cam2");

var status_connection1 = document.getElementById("status_rtsp1");
var status_connection2= document.getElementById("status_rtsp2");
var connected1 = 0,connected2 = 0;
if(connected1 == 1)
{
	status_connection1.innerHTML = "Connected";
}else{
	status_connection1.innerHTML = "No connection";
}
if(connected2 == 1)
{
	status_connection2.innerHTML = "Connected";
}else{
	status_connection2.innerHTML = "No connection";
}
cam1.innerHTML = slider.value;
cam2.innerHTML = slider.value;

slider.oninput = function() {
	cam1.innerHTML = this.value;
	cam2.innerHTML = (100 - cam1.innerHTML);
	bitrate_cam1.innerHTML = bitrate*this.value/100 +("kbps");
	bitrate_cam2.innerHTML = (bitrate-(bitrate*this.value/100))+("kbps");
}
/* RTSP Ratio*/


/* Link1 Copy*/
function Copy_func() {
	var copyText = document.getElementById("link1_copy");
	copyText.select();
	document.execCommand("copy");
}
/* Link1 Copy*/

/* Link2 Copy*/
function Copy_func2() {
	var copyText = document.getElementById("link2_copy");
	copyText.select();
	document.execCommand("copy");
}
/* Link2 Copy*/

$('#stream').on('click', function () {
	if ( $(this).is(':checked') ) {
		alert("RTSP Stream Start");
	} else {
		alert("RTSP Stream Stop");
	}
})

$('#rtsp_apply').on('click', function () {

});


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

	var ws = new_ws("ws://10.0.1.27:7681", "lws-minimal");
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