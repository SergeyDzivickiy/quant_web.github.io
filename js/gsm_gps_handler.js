let gsm_data = Object.create({},{
	
	header:{
		value: 0x0E,
		enumerable: true,
		writable: true
	},
	type:{
		value: 0x0A,
		enumerable: true,
		writable: true
	},
	gsm:{
		value: 0x00,
		enumerable: true,
		writable: true
	},
	gps:{
		value: 0xFF,
		enumerable: true,
		writable: true
	}
});



// var MyObject = new Object();
// MyObject.header = 0xFF; 
// MyObject.type = 0xE0;
// MyObject.data = 0xFFFF;  

console.log(gsm_data);
update_page();

function update_page()
{
	for(let key in gsm_data)
	{
		console.log(gsm_data[key]);
	}

	if(gsm_data.gsm > 0)
	{
		document.getElementById("gsm").checked = true;
	}else{
		document.getElementById("gsm").checked = false;
	}

	if(gsm_data.gps > 0)
	{
		document.getElementById("gps").checked = true;
		document.getElementById("google_map").style.display = "block";
	}else{
		document.getElementById("gps").checked = false;
		document.getElementById("google_map").style.display = "none";
	}
	console.log(gsm_data);
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

	return pcol + u[0] + "/" + extra_url;
}

function new_ws(urlpath, protocol)
{
	return new WebSocket(urlpath, protocol);
}

document.addEventListener("DOMContentLoaded", function() {

	var ws = new_ws("ws://10.0.1.27:7681", "lws-minimal");
	ws.binaryType = 'arraybuffer';
	try {
		ws.onopen = function() {
			console.log("Connected");
			console.log(ws);
		};

		ws.onmessage =function got_packet(msg) {
			console.log("Data from Server: "  + msg.data);
			var sizeInBytes = (msg.data).size;
			handle_data(msg.data);
		};
		
		ws.onclose = function(){
			console.log("Connection Close");
		};
	} catch(exception) {
		alert("<p>Error " + exception);  
	}
	
	$('#gsm_apply').on('click', function () {
		if(document.getElementById("gsm").checked == true)
		{
			gsm_data.gsm = 0xFF;
		}else{
			gsm_data.gsm = 0x00;
		}
		if(document.getElementById("gps").checked == true)
		{
			gsm_data.gps = 0xFF;
		}else{
			gsm_data.gps = 0x00;
		}
		var size = Object.keys(gsm_data).length;
		var byteArray = new Uint8Array(size);
		byteArray[0] = gsm_data.header;
		byteArray[1] = gsm_data.type;
		byteArray[2] = gsm_data.gsm;
		byteArray[3] = gsm_data.gps;
		ws.send(byteArray.buffer);
		console.log("send: " + byteArray.buffer);
		// ws.send(MyObject);
		// ws.send(gsm_data);
	});

}, false);

function handle_data(data)
{

}


//*******************WEB SOCKET***********************************//



















$('#gps').on('click', function () {
	var map_field = document.getElementById("google_map");
	if ( $(this).is(':checked') ) {
		map_field.style.display = "block";
	} else {
		map_field.style.display = "none";
	}
});


//*******************Google map Handle****************************//

function initMap()
{
	navigator.geolocation.getCurrentPosition(function(position) {
        // Текущие координаты.
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var current_position = {lat: lat, lng: lng};
         // console.log(current_position);
         var map = new google.maps.Map(
         	document.getElementById('map'), {zoom: 4, center: current_position});
         var marker = new google.maps.Marker({position: current_position, map: map});

         $('#current_location').on('click', function () {
         	var url = "https://www.google.com/maps/dir/?api=1";
         	var origin = "&origin=" + lat + "," + lng;
         	var dest_lat = lat + 0.2;
         	var dest_lng = lng + 0.2;
         	var destination = "&destination=" + dest_lat + "," + dest_lng;
         	var newUrl = new URL(url + origin + destination);
         	var win = window.open(newUrl, '_blank');
         	win.focus();
         });
     });
}



//*******************Google map Handle****************************//

