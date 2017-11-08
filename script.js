//define vars
var time={
	t:1500, //current clock time
	work:1500, //work interval
	rest:300, //rest interval
	isOn: false, //clock runnung boolean
	reset: true, //reset mode active?
	mode: "work" //which cycle is active
}; 
var clockCode; //time.out code for clock


//define functions
function runClock(){ //recursive clock function
	time.isOn=true; //flip controlling boolean
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
function stopClock(){ //kill running clock function
	window.clearTimeout(clockCode); //stop clock function
	time.isOn=false; //flip clock is on boolean
}
function resetClock(){ //reset the clock
	stopClock();
	time.reset = true;
	time.t=time.work;
	$('.digitalOn').removeClass('.digitalOn');
	displayClock();
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
function displayMode(){
	$(".adjDiv").removeClass('digitalOn');
	$("#"+time.mode+'Face').addClass('digitalOn');
}
function alarm(){ //placeholder alarm function
	console.log("beep!");
	if (time.mode == 'work'){

	}
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
	if (!time.onOff && time.reset && name == "work"){
		time.t = time[name];
		displayClock();
	}
}

//run stuff on DOM Load!!
$("document").ready(function(){
	//initial display
	displayClock();
	displayInit('work');
	displayInit('rest');

	//start button behavior
	$("#start").click(function(){
		if (time.isOn) {
			stopClock();
			$("#start").html('<i class="fa fa-play"></i>'); //change icon
			$(".clockFace").removeClass('digitalOn');
		} else {
			setTimeout(runClock,1000); //run clock after initial timeout
			$("#start").html('<i class="fa fa-pause"></i>');  //change icon
			$(".clockFace").addClass('digitalOn');
			displayMode();
			time.reset=false; //reset mode off
		}
	});
	
	//init button behavior
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

	//reset button behavior
	$('#reset').click(function(){
		resetClock();
	});
});