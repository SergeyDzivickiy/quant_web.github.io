
setBatLevel(40);

header_adapt();
function header_adapt(){
	var width = $('body').innerWidth();
	if (width < 800) {
		$('.wrapper-simple-desc').removeClass('wrapper-simple-desc').addClass('wrapper-simple-mob');
	}else if (width >800){
		$('.wrapper-simple-mob').removeClass('wrapper-simple-mob').addClass('wrapper-simple-desc');
	}
}
$( window ).resize(function() {
	var width = $('body').innerWidth();
	if (width < 800) {
		$('.wrapper-simple-desc').removeClass('wrapper-simple-desc').addClass('wrapper-simple-mob');
	}else if (width >800){
		$('.wrapper-simple-mob').removeClass('wrapper-simple-mob').addClass('wrapper-simple-desc');
	}
});

show_cpu(50, 30);
function show_cpu(temp, load)
{
	var cpu_temp = document.getElementById("cpu_temp");
	var cpu_load = document.getElementById("cpu_load");
	
	cpu_temp.innerHTML = temp + "°C";
	cpu_load.innerHTML = "&nbsp;&nbsp;" + load + "%";
	cpu_temp.style.color = "#006633";
	cpu_load.style.color = "#006633";

	temp > 40 ? cpu_temp.style.color = "#e05e00" : cpu_temp.style.color = "#006633";
	if(temp > 70)
	{
		cpu_temp.style.color = "#c70000";
	}

	load > 40 ? cpu_load.style.color = "#e05e00" : cpu_load.style.color = "#006633";
	if(load > 70)
	{
		cpu_load.style.color = "#c70000";
	}
}

function setBatLevel(batLevel) {

	const BatIcon = [
	"1.png",
	"2.png",
	"3.png",
	"4.png",
	"5.png"
	]
	var adress = "img/bat/";
	var batBlinkTimer;
	var batBlinkActive = false;

	var iconIndex = 5;
	if (batLevel <= 34) {
		iconIndex = 0;
	} else if (batLevel >= 35 && batLevel <= 36) {
		iconIndex = 1;
	} else if (batLevel >= 37 && batLevel <= 37) {
		iconIndex = 2;
	} else if (batLevel >= 38 && batLevel <= 39) {
		iconIndex = 3;
	} else if (batLevel >= 40 && batLevel <= 40) {
		iconIndex = 4;
	} else if (batLevel >= 41) {
		iconIndex = 5;
	} 

	if (iconIndex == 0) {
		if (batBlinkActive == false) {
			batBlink(iconIndex);
			batBlinkActive = true;
		}

	} else {
		clearTimeout(batBlinkTimer);
		batBlinkActive = false;
		document.getElementsByClassName("bat-img")[0].src = adress + BatIcon[iconIndex];
	}

	function batBlink(arg) {
		if (arg > 1) arg = 0;
		document.getElementsByClassName("bat-img")[0].src = adress + BatIcon[arg];
		batBlinkTimer = setTimeout(batBlink, 800, arg);
	}}

	