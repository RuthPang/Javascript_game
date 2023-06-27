var w = window.innerWidth;
var h = window.innerHeight;
var score = 0;
var time = 10;
var clear=false;
window.onload = function(){
	$("start").onclick = BallSize;
}

function BallSize(){
	time = 10;
	$("time2").innerHTML = time;
	$("start").disabled = true;
	$("level1").disabled = true;
	$("level2").disabled = true;
	$("level3").disabled = true;
	

	if($("level1").checked){
		$("ball").style.width = "50px";
		$("ball").style.height = "50px";
		
	}
	else if($("level2").checked){
		$("ball").style.width = "30px";
		$("ball").style.height = "30px";
	}
	else{
		$("ball").style.width = "10px";
		$("ball").style.height = "10px";
	}

	ShowBall();
	window.setTimeout("CountDown()", 1000);
}

function CountDown(){
	if(time != 0){
		time--;
		$("time2").innerHTML = time;
		window.setTimeout("CountDown()", 1000);
	}

}

function ShowBall(){
	if(time == 0)
		ShowResult();
	else if(clear){
		time = 0;
		score = 0;
		$("ball").style.display = "none";
		$("score2").innerHTML = score;
		$("time2").innerHTML = time;
		$("start").disabled = false;
		$("level1").disabled = false;
		$("level2").disabled = false;
		$("level3").disabled = false;
		clear=false;
	}
	else{
		var width = parseInt($("ball").style.width) + 5; // +5是為讓球球完整顯示
		var height = parseInt($("ball").style.height) + 5;
		var left = Random(0, (w-width)) +"px"; //(w-width)球球在最右邊
			var top = Random(200, (h-height)) +"px"; //200為表單空間, (h-height)為球球在最下面
			$("bingGo").style.display = "none";
		$("ball").style.left = left;
		$("ball").style.top = top;
		$("ball").style.display = "inline-block";
		$("ball").onclick = AddScore; //按到球球加分
		$("clear").onclick= Clear;
		window.setTimeout("ShowBall()", 1000);
	}
}

function AddScore(){
	$("bingGo").style.display = "inline-block"; //顯示煙花圖案，表示按到球球了
	score++;
	$("score2").innerHTML = score;
}

function Clear(){
	clear=true;
}


function ShowResult(){
	$("time2").innerHTML = time;
	$("ball").style.display = "none";
	$("result").innerHTML = "總得分為: "+score;
	$("result").style.left = ((w/2)-300) + "px";
	$("result").style.top = (((h+100)/2)-200) + "px";
	$("img").style.left = ((w/2)-300) + "px";
	$("img").style.top = (((h+100)/2)-170) + "px";
	$("img").style.padding = "20px";

	if(score > 40){
		$("img").src="excellent.png";
	}
	else if((score > 20) && (score < 41)){
		$("img").src="good.jpg";
	}
	else{
		$("img").src="poor.jpg";
	}
	$("result").style.display = "inline-block";
	$("img").style.display = "inline-block";
	window.setTimeout("Disappear()", 3000);

}


function Disappear(){
	score=0;
	$("score2").innerHTML = score;
	$("result").style.display = "none";
	$("img").style.display = "none";
	$("start").disabled = false;
	$("level1").disabled = false;
	$("level2").disabled = false;
	$("level3").disabled = false;
}


function Random(a, b){
	return Math.floor(a+Math.random()*(b-a+1));
}

function $(id){
	return document.getElementById(id);
}
