var camera_enable = 1;

for (var i = 3; i<=12; i+=0.5) {
	if((i%1)==0)
	{
		var newOption = new Option (i+".0", i+".0");
	}else{
		var newOption = new Option (i, i);
	}
	cam_volt.append(newOption);
}

video_adapt();

function video_adapt(){
	var width = $('body').innerWidth();

	if (width < 1400) {
		$('.container-settings').removeClass('container-settings').addClass('container-settings-mob');
	}else{
		$('.container-settings-mob').removeClass('container-settings-mob').addClass('container-settings');
	}	if (width > 700 && width < 1050) {
		$('.cameras-settings').removeClass('cameras-settings').addClass('cameras-settings-ipad');
	}else{
		$('.cameras-settings-ipad').removeClass('cameras-settings-ipad').addClass('cameras-settings');
	}
}

$( window ).resize(function() {
	var width = $('body').innerWidth();
	if (width < 1400) {	
		$('.container-settings').removeClass('container-settings').addClass('container-settings-mob');
	}else{
		$('.container-settings-mob').removeClass('container-settings-mob').addClass('container-settings');
	}
	if (width > 700 && width < 1050) {
		$('.cameras-settings').removeClass('cameras-settings').addClass('cameras-settings-ipad');
	}else{
		$('.cameras-settings-ipad').removeClass('cameras-settings-ipad').addClass('cameras-settings');
	}
});

$('#cam2_en').on('click', function () {
	var cam2_field = document.getElementById("cam2");
	var cam2_controler = document.getElementById("canvas_field");
	var no_vid_cam2 = document.getElementById("cam2_no_vid");
	if ( $(this).is(':checked') ) {
		camera_enable = 1;
	} else {
		camera_enable = 0;
	}
	if(camera_enable == 0){
		cam2_field.hidden = true;
		cam2_controler.style.display = "none";
		no_vid_cam2.hidden = false;
	}else{
		cam2_field.hidden = false;
		cam2_controler.style.display = "block";
		no_vid_cam2.hidden = true;
	}
});

$('#top_cam').on('click', function () {
	alert("up");
	document.getElementById("contr1").style.display='none';
	document.getElementById("contr2").style.display='none';
	document.getElementById("contr3").style.display='none';
	document.getElementById("top_click").style.display='block';
	 setTimeout(() => { 
	 document.getElementById("contr1").style.display='block';
	document.getElementById("contr2").style.display='block';
	document.getElementById("contr3").style.display='block';
	document.getElementById("top_click").style.display='none';
	 }, 100);
});

$('#left_cam').on('click', function () {
	alert("left");
	document.getElementById("contr1").style.display='none';
	document.getElementById("contr2").style.display='none';
	document.getElementById("contr3").style.display='none';
	document.getElementById("left_click").style.display='block';
	 setTimeout(() => { 
	 document.getElementById("contr1").style.display='block';
	document.getElementById("contr2").style.display='block';
	document.getElementById("contr3").style.display='block';
	document.getElementById("left_click").style.display='none';
	 }, 100);
});
$('#middle_cam').on('click', function () {
	alert("select");
	document.getElementById("contr1").style.display='none';
	document.getElementById("contr2").style.display='none';
	document.getElementById("contr3").style.display='none';
	document.getElementById("mid_click").style.display='block';
	 setTimeout(() => { 
	 document.getElementById("contr1").style.display='block';
	document.getElementById("contr2").style.display='block';
	document.getElementById("contr3").style.display='block';
	document.getElementById("mid_click").style.display='none';
	 }, 100);
});
$('#right_cam').on('click', function () {
	alert("right");
	document.getElementById("contr1").style.display='none';
	document.getElementById("contr2").style.display='none';
	document.getElementById("contr3").style.display='none';
	document.getElementById("right_click").style.display='block';
	 setTimeout(() => { 
	 document.getElementById("contr1").style.display='block';
	document.getElementById("contr2").style.display='block';
	document.getElementById("contr3").style.display='block';
	document.getElementById("right_click").style.display='none';
	 }, 100);
});
$('#down_cam').on('click', function () {
	alert("down");
	document.getElementById("contr1").style.display='none';
	document.getElementById("contr2").style.display='none';
	document.getElementById("contr3").style.display='none';
	document.getElementById("bot_click").style.display='block';
	 setTimeout(() => { 
	 document.getElementById("contr1").style.display='block';
	document.getElementById("contr2").style.display='block';
	document.getElementById("contr3").style.display='block';
	document.getElementById("bot_click").style.display='none';
	 }, 100);
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