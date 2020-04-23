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
		value: 0xFF,
		enumerable: true,
		writable: true
	},
	gps:{
		value: 0x00,
		enumerable: true,
		writable: true
	}
});
console.log(gsm_data);

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
}else{
	document.getElementById("gps").checked = false;
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
	// for(let key in gsm_data)
	// {
	// 	ws.send(gsm_data[key]);
	// 	console.log("send: " + gsm_data[key]);
	// }
	ws.send(gsm_data);
	console.log("send: " + gsm_data);
});

}, false);
//*******************WEB SOCKET***********************************//


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

