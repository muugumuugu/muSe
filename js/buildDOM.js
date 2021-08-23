//create dom
let playlist;
//
let loopB;
let shuffleB;
//
let player;
//----------------------
let numsongs=0;
let filee;
//---------------------------------------------
function playlistUI(){
	if (filee){
		playlist=parseplaylist(filee);
		//
		numsongs=playlist.length;
		let ul=document.getElementById('playlistUL');
		for (let i=0; i<numsongs;i++){
			let button= document.createElement('li');
			let bold= document.createElement('strong');
			//
			button.innerHTML=playlist[i][0].replace(/.*_\s*/,'').replace(/\.mp3/,'');
			button.id='song'+i;
			//
			ul.appendChild(bold);
			bold.appendChild(button);
			//
			let newb=document.getElementById('song'+i);
			newb.onfocus=function(){highlight(i,2);};
			newb.onmouseover=function(){highlight(i,2);};
			newb.onmouseout=function(){highlight(i,0);highlight(curr,1);}
			newb.onblur=function(){highlight(i,0);highlight(curr,1);};
			newb.onclick=function(){switchsong(i);};
			newb.onkeypress=function(){switchsong(i);};
			newb.tabIndex=0;
		}
	}
}
function controlsUI(){
	player=document.getElementById('player');
	//
	loopB=document.getElementById('loop');
	shuffleB=document.getElementById('shuffle');
}
//---------------------------------------------------
function mainUI(){
	playlistUI();
	controlsUI();
}