$('#record').on('click', function () {
	if ( $(this).is(':checked') ) {
		timerRecStart();
		updateSessionNumber(sessionNumber);
		sessionNumber++;
	} else {
		timerRecStop();
	}
})

var cam1_status = 1, cam2_status = 1;
var cam1_field = document.getElementById("cam1");
var cam2_field = document.getElementById("cam2");
var no_vid_cam1 = document.getElementById("cam1_no_vid");
var no_vid_cam2 = document.getElementById("cam2_no_vid");
if(cam1_status == 0 )
{
	cam1_field.hidden = true;
	no_vid_cam1.hidden = false;
}else{
	cam1_field.hidden = false;
	no_vid_cam1.hidden = true;
}
if(cam2_status == 0 )
{
	cam2_field.hidden = true;
	no_vid_cam2.hidden = false;
}else{
	cam2_field.hidden = false;
	no_vid_cam2.hidden = true;
}

var seconds = 0, minutes = 0, hours = 0, recTimer;
var sessionNumber	= 0;

function timerRecStart() {
	recTimer = setTimeout(updateRecWatch, 1000);
}

function updateRecWatch() {
	seconds++;
	if (seconds >= 60) {

		seconds = 0;
		minutes++;
		if (minutes >= 60) {
			minutes = 0;
			hours++;
		}
	}   

	watch = document.getElementById("rec-watch");
	watch.textContent = (hours ? (hours > 9 ? hours: "0" + hours) : "00" ) + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
	watch.innerHTML = "&nbsp;" + watch.textContent + "&nbsp;";
	timerRecStart();
}
function updateSessionNumber(arg) {
	watch = document.getElementById("rec-session");
	watch.textContent = "Session #" + arg;
	watch.innerHTML = "&nbsp;" + watch.textContent + "&nbsp";
}

function timerRecStop() {
	clearTimeout(recTimer);
	hours = minutes = seconds = 0;
	document.getElementById("rec-watch").innerHTML = "&nbsp;00:00:00&nbsp;";
}
/////*******************RECORD BUTTON HANDLER******//////////

/////*******************RTSP STREAM HANDLER******//////////


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