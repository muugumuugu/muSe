<?php
	function trimMP3String($fn) {
		if($fn[0] === '.' || $fn[0] === ' ') {$fn = substr($fn, 1);}
		if($pos = strpos($fn, ' _ ')) {$fn = substr($fn, $pos+2, -4);}
	return $fn;
	}
	function formatdir($dn){
		while ($pos = strpos($dn, '/')) {$dn = substr($dn, $pos+1);}
		return $dn;
	}

	$musicDir = '../music';

	function recursiveDI($d) {
		if (is_dir($d)) {
			if ($dh = opendir($d)) {
				if ($d==='../music'){echo '<li class="dir" id="root" ><details open><summary>' . root . '</summary><ul id="main">' . PHP_EOL;}
				else{echo '<li class="dir" id="' . formatdir($d) .'"><details><summary>' . formatdir($d) . '</summary><ul>' . PHP_EOL;}
				while (($f = readdir($dh)) !== false) {
					if (!($f == '.' || $f== '..')){
						if (filetype($d . '/'. $f) ==='dir'){recursiveDI($d . '/' . $f);}
						else if (substr($f,-3,3) ==='mp3'){echo '<li class="file"><a href="' . $d . '/' . $f . '">' . trimMP3String($f) . '</a></li>';}
					}
				}
				echo '</ul></details></li>';
				closedir($dh);
			}
		}
	}
?><!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="/styles/home.css"><link rel="icon" href="../muse.ico">
	<meta name="viewport" content="width=device-width">
	<style>
		li {list-style:none!important;}
		li.file{border-radius: 50px;padding-left:15px;}
		li.file:nth-child(odd) {background-color: rgba(255,255,255, 0.1);}
		li.file:nth-child(even) {background-color: rgba(255,255,255, 0.05);}
		li.file a{font-size:1.3em;font-weight:normal;font-style:italic;text-decoration:none;color:#fff;text-shadow: 0px 0px 1px #ddd, 0 0 3px #eee;}
		button:focus{color:white;background-color:black}
		button{margin-top:15px;}
		audio {width: 100%;height: 50px;position: fixed;bottom: 0;left: 0; right: 0;}
		summary{font-style:italic!important;font-size:1.6em!important; border:dotted; padding:5px;margin-bottom:15px;padding-left:15px; border-width:0.3px;cursor:pointer;}
		details{padding-bottom:15px;margin-bottom:15px; background-color:rgba(200,200,200,0.05);}
		header{position:fixed;top:0px;left:0px;right:0px;height:90px; overflow-y:auto;}
		main{padding:15px;width:96%;position:absolute;top:150px;left:0px;;overflow:scroll;height:80%;}
	</style>
	<title>collection</title>
</head>
<body>
	<header>
	<span>&nbsp;</span><input style="width:400px" type="text" onchange="resets()" id="search"/> <button onclick="look()" id="look"> SONG SEARCH</button><br><span>&nbsp;</span><input style="width:400px" type="text" onchange="resetf()" id="searchf"/> <button onclick="lookf()" id="lookf">ALBUM SEARCH</button>
	</header>
	<main><?php recursiveDI($musicDir); ?></main>
	<audio controls><source></audio>
	<script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
	<script>
		let switchSrc = function(src) {
			let $p = $('audio');
			$p[0].title=src.replace(/.*\/(.*) _ .*/,'$1')
			document.title=src.replace(/.* _ /,'');
			$('audio source').first().attr('src', src);
			$p[0].pause();
			$p[0].load();
			$p[0].oncanplaythrough = $p[0].play();
		}
		$('li a').on('click', function(event) {
			event.preventDefault();
			let src = $(this).attr('href');
			switchSrc(src);
		});
		let Gfi=-1,Gsi=-1;
		function sortList() {
		let list, i, w, d, swap;
		list = document.getElementById("main");
		w = true;
		while (w) {
			w = false;
			d = list.getElementsByClassName("dir");
			for (i = 0; i < (d.length - 1); i++) {
				swap = false;
				if (d[i].id.toLowerCase() > d[i + 1].id.toLowerCase()) {swap = true;break;}
			}
			if (swap) {d[i].parentNode.insertBefore(bdi + 1], d[i]);w = true;}
		  }
		}
		window.onload=function(){sortList();}
	function look(){
		let links=document.getElementsByTagName('a');
		let notfound=true;
		Gsi+=1;
		let query=document.getElementById('search').value.toLowerCase();
		while (notfound && Gsi<links.length){
			if (links[Gsi].innerHTML.toLowerCase().search(query)>=0){notfound=false;links[Gsi].parentElement.parentElement.parentElement.open=true; links[Gsi].scrollIntoView();return}
			Gsi=Gsi+1;
		}
		Gsi=-1;
		alert("dOn't haVe tHis soNg :(")
	}
	function resets(){
		Gsi=-1;
		document.getElementById('look').focus()
		look();
	}
	function resetf(){
		Gfi=-1;
		document.getElementById('lookf').focus()
		lookf();
	}
	function lookf(){
		let links=document.getElementsByClassName("dir");
		let notfound=true;
		let query=document.getElementById('searchf').value.toLowerCase();
		Gfi+=1;
		while (notfound && Gfi<links.length){
			if (links[Gfi].id.toLowerCase().search(query)>=0){notfound=false; links[Gfi].scrollIntoView(); links[Gfi].children[0].open=true;return;}
			Gfi=Gfi+1;
		}
		Gfi=-1;
		alert("dOn't haVe tHis alBum :(")
	}
	</script>
</body>
</html>
