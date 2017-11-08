//define vars
var time={
	t:1500, //current clock time
	work:1500, //work interval
	rest:300, //rest interval
	isOn: false //clock runnung boolean
}; 
var clockCode; //time.tout code for clock
// var onOff=false; //time.tr running boolean


//define functions
function runClock(){ //selfreferential clock function
  if(time.t>1){
    time.t--; 
    displayClock();
    //echo to console
    clockCode=window.setTimeout(runClock,1000); //recursive call
    return;
  } else {
  	time.t = 0;
  	displayClock();
  	alarm();
  }
} 
function fmt(x){ // convert time to string and add "0" for disp
 	if (x<10) {
 		return "0"+x.toString();
	} else {
		return x.toString();
	}
}
function displayClock(){ //format in hh:mm:ss and output to html clock
	var s = time.t%60;
 	var m = ((time.t-s)/60)%60;
 	var h = (time.t-s-60*m)/3600;
 	$('.clockFace').html(fmt(h)+" : "+fmt(m)+" : "+fmt(s));
}
function displayInit(name){ //display work/rest init values
	var m = time[name]/60;
	$('#'+name+'Face').html(fmt(m));
}

function alarm(){ //placeholder alarm function
	console.log("beep!");
}


function adjInit(name,plusMinus){ //adjust init values of work/rest 
	if (plusMinus == "+") {
		if (time[name]<99*60) {
			time[name]=time[name]+60;
		} 
	} else {
		if (time[name]>60) {
			time[name]=time[name]-60;
		} 
	}
	displayInit(name);
}

$("document").ready(function(){  //on DOM load
	//initial display
	displayClock();
	displayInit('work');
	displayInit('rest');

	//start button behavior
	$("#start").click(function(){
		if (time.isOn) {
			window.clearTimeout(clockCode);
			$("#start").html('<i class="fa fa-play"></i>');
			time.isOn=false;
		} else {
			setTimeout(runClock,1000);
			$("#start").html('<i class="fa fa-pause"></i>');
			time.isOn=true;
		}
	});
	
	$("#workPlus").click(function(){
		adjInit('work','+');
	});
	$("#workMinus").click(function(){
		adjInit('work','-');
	});
	$("#restPlus").click(function(){
		adjInit('rest','+');
	});
	$("#restMinus").click(function(){
		adjInit('rest','-');
	});
});
