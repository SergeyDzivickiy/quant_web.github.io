document.addEventListener("DOMContentLoaded", function() {

	let wlan_data = Object.create({},{
		header:{
			value: 0x02,
			enumerable: true,
			writable: true
		},
		type:{
			value: 0x00,
			enumerable: true,
			writable: true
		},
		wf_start:{
			value: 0x00,
			enumerable: true,
			writable: true
		},
		ssid:{
			value: '',
			enumerable: true,
			writable: true
		},
		pass:{
			value: '',
			enumerable: true,
			writable: true
		},
		hid_net:{
			value: 0x00,
			enumerable: true,
			writable: true
		},
		band:{
			value: 0x00,
			enumerable: true,
			writable: true
		},
		mode:{
			value: 0x00,
			enumerable: true,
			writable: true
		},
		work_mode:{
			value: 0x00,
			enumerable: true,
			writable: true
		}					
	});

	parse_object_for_page();
// parse_object_to_Cstruct(wlan_data);

$('body').on('click', '.password-control', function(){

	if ($('#password_input').attr('type') == 'password'){

		$(this).addClass('view');
		$('#password_input').attr('type', 'text');

	} else {
		$(this).removeClass('view');
		$('#password_input').attr('type', 'password');
	}
	
	return false;
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



	// var ws = new_ws(get_appropriate_ws_url(""), "lws-minimal");
	var ws = new_ws("ws://10.0.1.27:7681", "lws-minimal");
	ws.binaryType = "arraybuffer";
	try {
		ws.onopen = function() {
			console.log("Connected");
			console.log(ws);
		};

		ws.onmessage =function got_packet(msg) {
			console.log("Data from Server: "  + msg.data);
			var sizeInBytes = (msg.data).size;
			parse_Cstruct_to_object(msg.data);
		};
		
		ws.onclose = function(){
			console.log("Connection Close");
		};
	} catch(exception) {
		alert("<p>Error " + exception);  
	}

	$('#wlan_apply').on('click', function () {

		save_data_from_page_to_object();
		parse_object_to_Cstruct(wlan_data);
	});



	function ascii_to_hex(str)
	{
		var arr1 = [];
		for (var n = 0; n < str.length; n ++) 
		{
			var hex = Number(str.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join('');
	}

//*******************WEB SOCKET***********************************//

function parse_object_to_Cstruct()
{
	const packet_size = 71;
	var packet_wlan = new Uint8Array(packet_size);

	packet_wlan[0] = wlan_data.header;
	packet_wlan[1] = wlan_data.type;
	packet_wlan[2] = wlan_data.wf_start;

	const text_size = 32;
	var password = document.getElementById("password_input").value;
	var ssid = document.getElementById("ssid_input").value;
	var uint8array_pass = new TextEncoder("utf-8").encode(password);
	var uint8array_ssid = new TextEncoder("utf-8").encode(ssid);
	var password_field = new Uint8Array(text_size);
	var ssid_field = new Uint8Array(text_size);
	
	if(ssid.length <= text_size)
	{
		for(var i = 0; i<uint8array_ssid.length;i++)
		{
			ssid_field[i] = uint8array_ssid[i];
		}
	}else{
		alert("SSID max len is: " +text_size+" Your SSID len is: "+ssid.length);
		return false;
	}

	// console.log(ssid_field);

	if(password.length <= text_size)
	{
		for(var i = 0; i<uint8array_pass.length;i++)
		{
			password_field[i] = uint8array_pass[i];
		}
	}else{
		alert("Password max len is: " +text_size+" Your Password len is: "+password.length);
		return false;
	}

	// console.log(password_field);

	for(var i = 0; i < text_size; i++)
	{
		packet_wlan[i+3] = ssid_field[i];
	}

	for(var i = 0; i < text_size; i++)
	{
		packet_wlan[(text_size+3)+i] = password_field[i];
	}

	packet_wlan[packet_size-4] = wlan_data.hid_net;
	packet_wlan[packet_size-3] = wlan_data.band;
	packet_wlan[packet_size-2] = wlan_data.mode;
	packet_wlan[packet_size-1] = wlan_data.work_mode;
	console.log(packet_wlan);
	ws.send(packet_wlan);
}

function parse_Cstruct_to_object(struct)
{
	const packet_size = 71;
	let packet_server = new Uint8Array(struct);
	if(packet_server[0] == wlan_data.header)
	{
		wlan_data.header = packet_server[0];
	}else{
		alert("bad packet!");
		return false;
	}


	console.log(packet_server);

}

function save_data_from_page_to_object()
{
	var wf_start = document.getElementById("wf_start");
	var ssid = document.getElementById("ssid_input").value;
	var password = document.getElementById("password_input").value;
	var hid_network = document.getElementById("hid_network");
	var band = document.getElementById("band_sel").value;
	var mode = document.getElementById("mode_sel").value;
	var work_mode = document.getElementById("work_sel").value;
	
	wlan_data.type = 0xAF;
	wlan_data.wf_start = (wf_start.checked == true) ? 0xFF : 0x00;
	wlan_data.hid_net =  (hid_network.checked == true) ? 0xFF : 0x00;
	wlan_data.band = (band > 0)? 0xFF : 0x00;
	wlan_data.mode = (mode > 0)? 0xFF : 0x00;
	wlan_data.ssid = ssid;
	wlan_data.pass = password;
	if(work_mode == 2)
	{
		wlan_data.work_mode = 0xFF;
	}else if(work_mode == 1){
		wlan_data.work_mode = 0x80;
	}else{
		wlan_data.work_mode = 0x00;
	}
	console.log(wlan_data);
}


function parse_object_for_page()
{
	var wf_start = document.getElementById("wf_start");
	var ssid = document.getElementById("ssid_input");
	var password = document.getElementById("password_input");
	var hid_network = document.getElementById("hid_network");
	var band = document.getElementById("band_sel");
	var mode = document.getElementById("mode_sel");
	var work_mode = document.getElementById("work_sel");

	wf_start.checked = (wlan_data.wf_start > 0)? true:false;
	ssid.value = wlan_data.ssid;
	password.value = wlan_data.pass;
	hid_network.checked = (wlan_data.hid_net > 0)? true:false;
	band.value = (wlan_data.band > 0)? 1:0;
	mode.value = (wlan_data.mode > 0)? 1:0;
	if(wlan_data.work_mode == 0xFF)
	{
		work_mode.value = 2;
	}else if(wlan_data.work_mode == 0x80){
		work_mode.value = 1;
	}else{
		work_mode.value = 0;
	}
}

}, false);

