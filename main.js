/*

Copyright (C)FrogIT. All Rights Reserved.

*/

var srch = $("#srchbox");
var hplb = $("#hlplb");
var ussb = $("#ussbm");
var cssb = $("#cssbm");
var ebtn = $("#edtbtn");
var hrzn = $("#line");
var scls = $(".srchrslt");
var splt = new Array;
var swrd, tmpx, hour, mnut, scnd, ampm, itvl;
ussb = "hello";
$("content img").bind("click", restartElement);
$("#sbmbtn").bind("click", resultFactor);
ebtn.bind("click", editField);
$("#credit").bind("click", showCredit);
//디버그
function restartElement() {
	srch.css("margin", "10vw 3pt 0 3%");
	scls.css("display", "none");
}
function resultFactor() {
	preventXSS();
	clearPrevious();
	$("#ussbm").text(srch.val());
	splt = srch.val().split(/ +/);
	$("#cssbm").text("분석 중...");
	if ($.trim(srch.val()).length==0) {
		$("#cssbm").text("명령어를 입력해주세요!");
		ebtn.css("visibility", "hidden");
	}
	else if (splt[1]!=undefined) {
		if (splt[splt.length-1].indexOf("검색")>-1||splt[splt.length-1].indexOf("찾아")>-1) {
			swrd = srch.val().substring(0, srch.val().lastIndexOf(" "));
			$("#cssbm").text(swrd + Josa.c(swrd, "을/를") + " 검색합니다.");
			window.open("http://www.google.com/search?q=" + swrd, "_blank");
		}
		else if (splt[1].indexOf("켜")>-1||splt[1].indexOf("열어")>-1) {
			if (splt[0]=="구글"||splt[0]=="google") {
				$("#cssbm").text("Google을 엽니다.");
				window.open("http://www.google.com ", "_blank");
			}
			else if (splt[0]=="네이버"||splt[0]=="naver") {
				$("#cssbm").text("Naver를 엽니다.");
				window.open("http://www.naver.com ", "_blank");
			}
			else if (splt[0].indexOf("http://")>-1) {
				$("#cssbm").text(splt[0] + " 를 엽니다.");
				window.open(splt[0], "_blank");
			}
			else if (splt[0].indexOf(".")>-1) {
				$("#cssbm").text(splt[0] + " 를 엽니다.");
				window.open("http://" + splt[0], "_blank");
			}
			else {
				$("#cssbm").text("이런. 링크를 찾지 못했습니다.\n\"(링크) 켜\" 등으로 입력해 보세요.");
			}
		}
		else {
			resultFace();
		}
	}
	else {
		resultFace();
	}
	srch.val("");
}
function resultFace() {
	if (srch.val().indexOf("시간")>-1||srch.val().indexOf("시계")>-1||
	srch.val().indexOf("몇 시")>-1||srch.val().indexOf("몇시")>-1) {
		itvl = setInterval(getTime, 500);
	}
	else if (srch.val().indexOf("안녕")>-1||srch.val().indexOf("ㅎㅇ")>-1||srch.val().indexOf("반가워")>-1) {
		switch (runRandom(3)) {
			case 0: $("#cssbm").text("저도 반가워요!"); break;
			case 1: $("#cssbm").text("안녕하세요."); break;
			case 2: $("#cssbm").text("좋은 하루에요!"); break;
		}
	}
	else if (srch.val().indexOf("링크")>-1||srch.val().indexOf("실행")>-1) {
		$("#cssbm").text("\"(링크) 켜\" 등으로 입력해 보세요.");
	}
	else {
		resultNot();
	}
}
function clearPrevious() {
	ebtn.css("visibility", "visible");
	hplb.css("display", "none");
	scls.css("display", "block");
	splt = [];
	clearInterval(itvl);
	srch.css("margin", "3vw 3pt 0 3%");
}
function preventXSS() {
    /*srch.val(replace("<", "&lt"));
    srch.val(replace(">", "&gt"));*/
}
function runRandom(rdnb) {
	return Math.floor(Math.random()*rdnb);
}
function resultNot() {
	$("#cssbm").text("제가 모르는 명령어 입니다 :(");
}
function editField() {
	srch.val($("#ussbm").text());
	$("#ussbm").text("");
	ebtn.css("visibility", "hidden");
	srch.focus();
}
function getTime() {
	var tday = new Date();
	hour = tday.getHours();
	mnut = tday.getMinutes();
	scnd = tday.getSeconds();
	mnut = checkTime(mnut);
	scnd = checkTime(scnd);
	if (hour>=12) {
		noon = "오후";
		if (hour>12) {hour = hour-12;}
	}
	else {noon = "오전";}
	$("#cssbm").text(noon + " " + hour + ":" + mnut + ":" + scnd);
}
function checkTime(cktm) {
    if (cktm < 10) {cktm = "0" + cktm};
    return cktm;
}
function showCredit() {
	alert("Thanks to...\njosa.js Library (C) 2012 Jaemin Jo\njQuery Library - The jQuery Foundation");
}
