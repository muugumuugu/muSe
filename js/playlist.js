let frm;
let fs=false;
let dropbox;
let stashurl;
let loadbtn;
let btn;
let shuffling=false;
let txt;
let m3u=[];
let playlist=[];
let player;
let currSong=-1;
function setup() {
  noCanvas();
  frm=document.getElementById('folders');
  stashurl=frm.src;
  player=document.getElementById('song');
  btn=document.createElement('a');
  loadbtn=createFileInput(loadPlaylist);
  loadbtn.parent(select('#load'))
  btn.innerHTML="&nbsp;<<&nbsp;"
  btn.href=stashurl;
  btn.id="btn";
  dropbox=document.getElementById('dropbox');
  txt=document.getElementById('txt');
  player.onended=function(){playnext(); }
}
function playselected(){
	sels=select('#dropbox').selected();
	if (sels.length>0 && player.paused){player.src=sels[0];}
}

function draw() {
	translate(width/2,height/2);
	if(frm.contentWindow.location.href!=stashurl){
		let title=frm.contentWindow.document.getElementsByTagName('h1')[0];
		let ul=frm.contentWindow.document.getElementsByTagName('ul')[0];
		if(ul){ul.style.height=windowHeight*0.78+'px';
		ul.style.overflow="auto";}
		let links=frm.contentWindow.document.getElementsByTagName('a');
		if (!player.src.match("mp3") && playlist.length>0){ currSong=0;player.src=playlist[0]}
		for(let i=0;i<links.length;i++){
			links[i].ondragstart=function(){drag(event);}
			links[i].draggable=true;
			links[i].style.userSelect="none";
			links[i].title=trim(links[i].innerHTML);
			if(links[i].id!="btn"){
				links[i].onclick=function(e){
					e.preventDefault();
					let pp=document.createElement('option');
					let url=links[i].href;
					pp.innerHTML=decodeURI(url.replace(/.*\//, ""));
					pp.value=url;
					pp.style.userSelect="all";
					dropbox.add(pp);
					const ii=dropbox.options.length-1;
					pp.ondblclick=function(){playSong(ii);}
					return false;
				}
				links[i].dblclick=function(e){links[i].onclick(e);}
				links[i].ontouchstart=function(e){e.preventDefault();return false;}
				links[i].ontouchend=function(e){
					e.preventDefault();
					let pp=document.createElement('option');
					let url=links[i].href;
					pp.innerHTML=decodeURI(url.replace(/.*\//, ""));
					pp.value=url;
					pp.style.userSelect="all";
					dropbox.add(pp);
					const ii=dropbox.options.length-1;
					pp.ondblclick=function(){playSong(ii);}
					return false;
				}
			}
		}
		if(title){
		let temp=title.innerHTML;
		if (!temp.match('href')){
		title.innerHTML="";
		title.appendChild(btn);
		title.innerHTML+=temp;
		}
		let bb=title.getElementsByTagName('a')[0];
		bb.style.background="transparent";
		bb.style.borderRadius="30px";
		bb.style.padding="4px";
		bb.style.color="white";
		bb.style.border="groove";
		bb.style.borderColor="black";
		bb.style.textDecoration="none";
		bb.style.marginRight="50px";
		}
	}
	let songs=document.getElementsByTagName('option');
		for (let i=0; i<songs.length; i++){
			playlist[i]=songs[i].value.replace(/^.*muSe/,'..');
		}
		if(playlist.length>songs.length){
			playlist.length=songs.length;
		}
}
//---------------------------------------
function mixit(){
	shuffling=!shuffling;
}
//
function vizIt(){
	let str={dat:[]}
	for(let i=0; i<dropbox.options.length; i++){
		str.dat.push(decodeURI(dropbox.options[i].value));
	}
	window.location.href = window.location.href.replace(/builder\.html/,"play.html?playlist=")+JSON.stringify(str);
}
//
function del(){
	for(let i=0; i<dropbox.options.length; i++){
		if (dropbox.options[i].selected){dropbox.remove(i,null);}
	}
	if (currSong>dropbox.length){currSong=-1;}
	for (let i=0; i<dropbox.options.length;i++){
		let pp=dropbox[i];
		pp.ondblclick=function(){playSong(i);}
		pp.style.userSelect="all";
	}

}
//
function remDup(){
	playlist =[...new Set(playlist)];
	dropbox.innerHTML="";
	for (let i=0; i<playlist.length;i++){
		let pp=document.createElement('option');
		url=playlist[i];
		pp.innerHTML=decodeURI(url.replace(/.*\//, ""));
		pp.value=url;
		dropbox.add(pp);
		pp.ondblclick=function(){playSong(i);}
		pp.style.userSelect="all";
	}

}
//
function savePlaylist(){
	let str=['#EXTM3U'];
	if(select('#online').checked()){
		for(let i=0; i<dropbox.options.length; i++){
			str.push('#EXTINF: ' + dropbox.options[i].innerHTML);
			str.push(decodeURI(playlist[i].replace(/\.\.\//,window.document.URL.replace(/html\/builder\.html/,''))));
		}
	}
	else{
		for(let i=0; i<dropbox.options.length; i++){
			str.push('#EXTINF: ' + dropbox.options[i].innerHTML);
			str.push(decodeURI(playlist[i].replace(/\.\.\//,'/home/Desktop/muSe/')));
		}
	}
	let pname=txt.value;
	saveStrings(str, pname,'m3u')
}
//
function highlight(currSong){
	dropbox.options[currSong].style.textShadow="0px 0px 4px yellow"
}
function unhighlight(currSong){
	if(currSong>=playlist.length){currSong=0}
	dropbox.options[currSong].style.textShadow="0px 0px 4px blue,0px 0px 6px blue";
}
//
function loadPlaylist(f){
	if (f){
		fetch(f.data)
			.then(
				res => res.blob()
				) // Gets the response and returns it as a blob
			.then(
				blob => {
				console.log(blob);
				var textPromise = blob.text();
				blob.text().then(text =>{m3u=parseplaylist(text.split('\n'));playlist.push(...onlylinks(m3u));remDup();});
				var text = blob.text();
				}
			);
		txt.value=f.name.replace(/\.m3u$/,'');
	}
}
function onlylinks(arr2d){
	for (let i=0;i<arr2d.length;i++){
		arr2d[i]=arr2d[i][1].replace(/^music/,'../music');//save memory dont need 2d array
	}
	return arr2d;
}
//-----------------------------
function allowDrop(ev) {
	ev.preventDefault();
}
function drag(ev){
	ev.dataTransfer.setData("text/plain",ev.target.href);
}
function drop(ev) {
	let pp=document.createElement('option');
	ev.preventDefault();
	let url=ev.dataTransfer.getData("text/plain");
	pp.innerHTML=decodeURI(url.replace(/.*\//, ""));
	pp.value=url;
	pp.style.userSelect="all";
	ev.target.add(pp);
	const i=dropbox.options.length-1;
	pp.ondblclick=function(){playSong(i);}
	return false;
}
function keyPressed(){
	console.log(key);
	switch (keyCode){
		case ENTER:
			for (let i=0; i<dropbox.options.length;i++){
				if(dropbox.options[i].selected){
				playSong(i);
				return;
				}
			}
		case RIGHT_ARROW:
			playnext();
			return;
		case LEFT_ARROW:
			playprev();
			return;
		case 32:
			if (player.paused){player.play();}
			else{player.pause();}
			return;
	}
}
//------------
function playnext(){
if (playlist.length>0){
  	unhighlight(currSong)
  	if (shuffling){currSong=Math.floor(Math.random()*playlist.length)}
  	else{currSong+=1;currSong=currSong%playlist.length;}
  	player.src=playlist[currSong];
  	player.play();
  	highlight(currSong);
  	document.title=dropbox.options[currSong].innerHTML.replace(/.*_\s*/,'');
  	}
}
function playprev(){
if (playlist.length>0){
  	unhighlight(currSong)
  	if (shuffling){currSong=Math.floor(Math.random()*playlist.length)}
  	else{currSong+=(playlist.length-1);currSong=currSong%playlist.length;}
  	player.src=playlist[currSong];
  	player.play();
  	highlight(currSong);
  	document.title=dropbox.options[currSong].innerHTML.replace(/.*_\s*/,'');
  	}
}
function playSong(i){
	pp=dropbox.options[i];
	if(currSong>-1){unhighlight(currSong)}
	player.src=pp.value;
	document.title=pp.innerHTML.replace(/.*_\s*/,'');
	currSong=i;
	highlight(currSong);
	player.play();
}

//--------------
function fullscreenit(e){
	fs=!fs;
	if (fs){
		document.getElementById('sub').style.display="none";
		document.getElementById('main').style.width="100%";
		select('#fs').html('EDITOR')
	}
	else{
		document.getElementById('sub').style.display="block";
		document.getElementById('main').style.width="45%";
		select('#fs').html('FULLSCREEN')
	}
}