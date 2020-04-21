osd_adapt();

function osd_adapt(){
	var width = $('body').innerWidth();

	if (width < 700) {
		$('.container-osd').removeClass('container-osd').addClass('container-mobile');
	}else if (width >700){
		$('.container-mobile').removeClass('container-mobile').addClass('container-osd');
	}
}
$( window ).resize(function() {
	var width = $('body').innerWidth();

	if (width < 700) {
		$('.container-osd').removeClass('container-osd').addClass('container-mobile');
	}else if (width >700){
		$('.container-mobile').removeClass('container-mobile').addClass('container-osd');
	}
});		

$('#camera-sel').change(function() {
	var camera_selector = document.getElementById("camera-sel").value;
	if(camera_selector == "Right-Top"){
		$('#right-top').append( $('#osd-camera'));
	}else if(camera_selector == "Left-Top"){
		$('#left-top').append( $('#osd-camera'));
	}else if(camera_selector == "Left-Bottom"){
		$('#left-bottom').append( $('#osd-camera'));
	}else{
		$('#right-bottom').append( $('#osd-camera'));
	}
});

$('#time-sel').change(function() {
	var time_selector = document.getElementById("time-sel").value;
	if(time_selector == "Right-Top"){
		$('#right-top').append( $('#osd-time'));
	}else if(time_selector == "Left-Top"){
		$('#left-top').append( $('#osd-time'));
	}else if(time_selector == "Left-Bottom"){
		$('#left-bottom').append( $('#osd-time'));
	}else{
		$('#right-bottom').append( $('#osd-time'));
	}
});

$('#battery-sel').change(function() {
	var battery_selector = document.getElementById("battery-sel").value;
	if(battery_selector == "Right-Top"){
		$('#right-top').append( $('#osd-battery'));
	}else if(battery_selector == "Left-Top"){
		$('#left-top').append( $('#osd-battery'));
	}else if(battery_selector == "Left-Bottom"){
		$('#left-bottom').append( $('#osd-battery'));
	}else{
		$('#right-bottom').append( $('#osd-battery'));
	}
});

var osdItems = {
	"cam" : "osd-camera",
	"time" : "osd-time",
	"bat" : "osd-battery" 
}

var osdSwitchState = { "cam" : true, "time" : true, "bat" : true }
var osdMouseDown = false;
var osdDragItem;
var osdParentRect; 

var alpha = document.getElementById("Range_alpha");

osdUpdateElements(osdItems);
osdUpdateTime();


document.onmousemove = () => {
	var target = document.getElementById(osdDragItem);

	if (osdMouseDown == true) {	
		var target_rect = target.getBoundingClientRect();
		target.style.position = 'absolute';
		target.style.top = event.clientY + "px";
		target.style.left = event.clientX + "px";
	}
};

function osdGetTragetElement(elementId) {
	document.getElementById(elementId).addEventListener("mousedown", (event) => {
		console.log("mouse down");
		osdMouseDown = true;
		osdDragItem = elementId;
		osdParentRect = document.getElementById("container-osd").getBoundingClientRect();
		document.getElementById(elementId).style.background = "#12ad12";
		return false;
	});

	document.getElementById(elementId).addEventListener("mouseup", (event) => {
		console.log("mouse up");
		osdMouseDown = false;
		var pos = {
			"ltop" : document.getElementById("left-top").getBoundingClientRect(),
			"rtop" : document.getElementById("right-top").getBoundingClientRect(),
			"lbot" : document.getElementById("left-bottom").getBoundingClientRect(),
			"rbot" : document.getElementById("right-bottom").getBoundingClientRect()
		}

		if (osdIsOverlap(event, pos.ltop)) {
			console.log("if#1");
			osdMoveElement(elementId, "left-top");
		} else if (osdIsOverlap(event, pos.rtop)) {
			console.log("if#2");
			osdMoveElement(elementId, "right-top");
		} else if (osdIsOverlap(event, pos.lbot)) {
			console.log("if#3");
			osdMoveElement(elementId, "left-bottom");
		} else if (osdIsOverlap(event, pos.rbot)) {
			console.log("if#4");
			osdMoveElement(elementId, "right-bottom");
		} else {
			console.log("else#1");
			document.getElementById(elementId).style.position = 'relative';
			document.getElementById(elementId).style.top = "";
			document.getElementById(elementId).style.left = "";
		}


		var camera_pos = document.getElementById("osd-camera");
		var time_pos = document.getElementById("osd-time");
		var battery_pos = document.getElementById("osd-battery");

		var left_top = document.getElementById("left-top");
		var right_top = document.getElementById("right-top");
		var left_bottom = document.getElementById("left-bottom");
		var right_bottom = document.getElementById("right-bottom");

		if(camera_pos.parentNode == left_top){
			$("#camera-sel").val('Left-Top'); 
		}else if(camera_pos.parentNode == right_top){
			$("#camera-sel").val('Right-Top'); 
		}else if(camera_pos.parentNode == left_bottom){
			$("#camera-sel").val('Left-Bottom'); 
		}else{
			$("#camera-sel").val('Right-Bottom'); 
		}

		if(time_pos.parentNode == left_top){
			$("#time-sel").val('Left-Top'); 
		}else if(time_pos.parentNode == right_top){
			$("#time-sel").val('Right-Top'); 
		}else if(time_pos.parentNode == left_bottom){
			$("#time-sel").val('Left-Bottom'); 
		}else{
			$("#time-sel").val('Right-Bottom'); 
		}

		if(battery_pos.parentNode == left_top){
			$("#battery-sel").val('Left-Top'); 
		}else if(battery_pos.parentNode == right_top){
			$("#battery-sel").val('Right-Top'); 
		}else if(battery_pos.parentNode == left_bottom){
			$("#battery-sel").val('Left-Bottom'); 
		}else{
			$("#battery-sel").val('Right-Bottom'); 
		}

	});	
}

function osdMoveElement(elementId, place) {
	var dest = document.getElementById(place);
	var element = document.getElementById(elementId);

	var html_place = ((place == "right-top") || (place == "right-bottom")) ? "beforeEnd" : "afterBegin";

	dest.insertAdjacentHTML(html_place, element.outerHTML);

	element.parentNode.innerHTML = element.parentNode.innerHTML.replace(element.outerHTML, "");
	
	osdUpdateElements(osdItems);

	document.getElementById(elementId).style.position = 'relative';
	document.getElementById(elementId).style.top = "";
	document.getElementById(elementId).style.left = ""
	document.getElementById(elementId).style.background = "#373737";
}

function osdIsOverlap(event, rect) {
	console.log("X:"+ event.clientX);
	console.log("Y:"+ event.clientY);
	console.log("rect.right:"+ rect.right);
	console.log("rect.left:"+ rect.left);
	console.log("rect.bottom:"+ rect.bottom);
	console.log("rect.top:"+ rect.top);
	if (event.clientX > rect.right || event.clientX < rect.left) {
		//console.log("test1");
		return false;
	}

	if (event.clientY > rect.bottom || event.clientY < rect.top) {
		//console.log("test2");
		return false;
	}
	//console.log("test333");
	return true;
}

function osdUpdateElements(elements){
	for (var item in elements) {
		osdGetTragetElement(elements[item]);
	}
}

function osdUpdateTime() {
	time = document.getElementById(osdItems.time);
	time.innerHTML = osdGetTimeString();
	setTimeout(osdUpdateTime, 1000);
}

function osdGetTimeString() {
	var helper = (val) => {
		return (val ? (val > 9 ? val : ("0" + val)) : "00" );
	};

	var today = new Date();	
	var hours = helper(today.getHours());
	var minutes = helper(today.getMinutes());
	var seconds = helper(today.getSeconds());
	var date = helper(today.getDate());
	var month = helper(today.getMonth() + 1);
	var year = helper(today.getFullYear());

	return (date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds);
}

var alpha_value = document.getElementById("alpha_value");

alpha_value.innerHTML = 100;
alpha.oninput = function() {
	for(var item in osdItems){
		document.getElementById(osdItems[item]).style.opacity = this.value/255;
	}
	alpha_value.innerHTML = Math.round(this.value/2.55);
}


// time switch
var osdTimeCheckbox = document.getElementById("time");
osdTimeCheckbox.addEventListener('change', (event) => {
	if (event.target.checked) {
		document.getElementById(osdItems.time).style.display = 'inline-block';
	} else {
		document.getElementById(osdItems.time).style.display = 'none';
	}

	osdSwitchState.time = event.target.checked;
	console.log(osdSwitchState);
});

// camera id switch
var osdCamCheckbox = document.getElementById("camera");
osdCamCheckbox.addEventListener('change', (event) => {
	if (event.target.checked) {
		document.getElementById(osdItems.cam).style.display = 'inline-block';
	} else {
		document.getElementById(osdItems.cam).style.display = 'none';
	}

	osdSwitchState.cam = event.target.checked;
	console.log(osdSwitchState);
});

// battery icon switch
var osdBatCheckbox = document.getElementById("battery");
osdBatCheckbox.addEventListener('change', (event) => {
	if (event.target.checked) {
		document.getElementById(osdItems.bat).style.display = 'inline-block';
	} else {
		document.getElementById(osdItems.bat).style.display = 'none';
	}

	osdSwitchState.bat = event.target.checked;
	console.log(osdSwitchState);
});


$('#osd_apply').on('click', function () {

	if ( $("#camera").is(':checked') ) {
		var camera_selector = document.getElementById("camera-sel").value;
		alert(camera_selector);
	} 
	if($("#time").is(':checked') ){
		var time_selector = document.getElementById("time-sel").value;
		alert(time_selector);
	} 
	if($("#battery").is(':checked') ){
		var battery_selector = document.getElementById("battery-sel").value;
		alert(battery_selector);
	}
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