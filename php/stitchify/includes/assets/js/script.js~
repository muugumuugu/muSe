var currentPlaylist = [];
var shufflePlaylist = [];
var tempPlaylist = [];
var audioElement;
var mouseDown = false;
var repeat = false;
var currentIndex;
var shuffle = false;
var userLoggedIn;
var timer;

$(window).scroll(hideOptionMenu);

$(document).click(function(click){
	var target = $(click.target);
	if (!target.hasClass("item") && !target.hasClass("optionButton")) {
		hideOptionMenu();
	}
});

$(document).on("change","select.playlist", function(){
	var select = $(this);
	var playlistId = select.val();
	var songId = select.prev(".songId").val();

	$.post("includes/handlers/ajax/songToPlaylist.php", {songId: songId , playlistId: playlistId})
	.done(function(error){
		if (error != "") {
				alert(error);
				return;
			}
		hideOptionMenu();
		select.val("");
	});
});

window.onpopstate = function(event) {
  openpage(document.location.href);
};

function openpage(url){

	if (timer != null) {
		clearTimeout(timer);
	}

	if (url.indexOf("?") == -1) {
		url = url + "?";
	}
	var encodedUrl;

	if (url.indexOf('userLoggedIn') < 0) {
		 encodedUrl = encodeURI(url + '&userLoggedIn=' + userLoggedIn);
	} else {
		encodedUrl = encodeURI(url);
	}

	$("#mainContent").load(encodedUrl);
	$("body").scrollTop(0);
	history.pushState(null, null, encodedUrl);
}

function createPlaylist(){

	var popup = prompt("Enter the name of your Playlist");

	if (popup != null) {

		$.post("includes/handlers/ajax/createPlaylist.php", {name: popup , username: userLoggedIn})
		.done(function(error){
			if (error != "") {
				alert(error);
				return;
			}
			openpage("yourMusic.php");
		});
	}

}


function updatePassword(oldPasswordClass, newPassword1Class, newPassword2Class){
	var oldPassword = $("."+oldPasswordClass).val();
	var newPassword1 = $("."+newPassword1Class).val();
	var newPassword2 = $("."+newPassword2Class).val();
	$.post("includes/handlers/ajax/updatePassword.php", {username: userLoggedIn, oldPassword: oldPassword ,newPassword1: newPassword1, newPassword2: newPassword2 }).done(function(m){
		$("."+oldPasswordClass).nextAll(".message").text(m);
	});
}

function logout(){
	$.post("includes/handlers/ajax/logout.php",function(){
		location.reload();
	});
}

function deleteSongPlaylist(button, playlistId){

		var songId = $(button).prevAll(".songId").val();

		$.post("includes/handlers/ajax/deleteSongPlaylist.php", {playlistId: playlistId , songId: songId})
		.done(function(error){
			if (error != "") {
				alert(error);
				return;
			}
			openpage("playlist.php?id="+ playlistId);
		});


}

function deletePlaylist(playlistId){

	var prompt = confirm("Do You really want to Delete this Playlist");

	if (prompt == true) {

		$.post("includes/handlers/ajax/deletePlaylist.php", { playlistId: playlistId})
		.done(function(error){
			if (error != "") {
				alert(error);
				return;
			}
			openpage("yourMusic.php");
		});
	}

}

function formatTime(seconds){
	var time = Math.round(seconds);
	var minute = Math.floor(time / 60);
	var sec = time - (minute * 60 );

	var extraZero = (sec < 10 )? "0" : "";

	return minute + ":" +extraZero + sec;
}

function hideOptionMenu(){
	var menu = $(".optionMenu");
	if (menu.css("display") != "none") {
		menu.css("display", "none");
	}
}

function showOptionMenu(button){
	var songId = $(button).prevAll(".songId").val();
	var menu = $(".optionMenu");
	var menuWidth = menu.width();
	menu.find(".songId").val(songId);

	var scrollTop = $(window).scrollTop();
	var elementOffset = $(button).offset().top;

	var top = elementOffset - scrollTop;
	var left = $(button).position().left;

	menu.css({"left": left - menuWidth +"px" , "top": top + "px", "display": "inline" });
}

function playFirstSong(){
	setTrack(tempPlaylist[0], tempPlaylist, true);
}

function updateTimeProgress(audio){
	$(".progressTime.current").text(formatTime(audio.currentTime));
	$(".progressTime.remaining").text(formatTime(audio.duration - audio.currentTime));

	var progress = audio.currentTime / audio.duration * 100;
	document.querySelector(".progressBarBg .progress").style.width = progress+"%";
	//$(".progressBarBg .progress").css("width",progress+"%");
}
function Audio(){
	this.currentPlaying;
	this.audio = document.createElement('audio');

	this.audio.addEventListener("ended",function(){
		nextSong();
	});

	this.audio.addEventListener("canplay",function(){
		var duration = formatTime(this.duration)
		$(".progressTime.remaining").text(duration);
	});

	this.audio.addEventListener("timeupdate", function(){
		if (this.duration) {
			updateTimeProgress(this);
		}
	});

	this.setTrack = function(track){
		this.currentPlaying = track;

		this.audio.src ="/Desktop/muSe/music/" + encodeURI(track.path);
	}

	this.play = function(){
		this.audio.play();
	}

	this.pause = function(){
		this.audio.pause();
	}

	this.setTime = function(seconds){
		this.audio.currentTime = seconds;
	}
}