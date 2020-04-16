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
	}}

	$( window ).resize(function() {
		var width = $('body').innerWidth();
		if (width < 1400) {
			$('.container-settings').removeClass('container-settings').addClass('container-settings-mob');
		}else{
			$('.container-settings-mob').removeClass('container-settings-mob').addClass('container-settings');
		}
	});

	$('#cam1_en').on('click', function () {
		var cam1_field = document.getElementById("cam1");
		var cam1_controler = document.getElementById("controler");
		var no_vid_cam1 = document.getElementById("cam1_no_vid");
		if ( $(this).is(':checked') ) {
			camera_enable = 1;
		} else {
			camera_enable = 0;
		}
		if(camera_enable == 0){
			cam1_field.hidden = true;
			cam1_controler.style.display = "none";
			no_vid_cam1.hidden = false;
		}else{
			cam1_field.hidden = false;
			cam1_controler.style.display = "block";
			no_vid_cam1.hidden = true;
		}
	});

	$('#top_cam1').on('click', function () {
		alert("up");
	});
	$('#middle_left_cam1').on('click', function () {
		alert("left");
	});
	$('#middle_cent_cam1').on('click', function () {
		alert("select");
	});
	$('#middle_right_cam1').on('click', function () {
		alert("right");
	});
	$('#bot_cam1').on('click', function () {
		alert("down");
	});
