function gettitle(i){
	let fname=files[i];
	let title=files[i].replace(/.*_ /,'').replace('.mp3','');
	return title;
}
let curr=0;
let prev=0;
let playlist=[]
let radio;
let plstr
function next(){
	prev=curr;
	curr++
	curr%=nsongs
	player.src="../music/" + files[playlist[curr]];
	radio.selected(curr)
	document.title=gettitle(playlist[curr]);
	player.play();
}
function prevs(){
	curr=prev;
	prev--
	prev+=nsongs
	prev%=nsongs
	player.src="../music/" + files[playlist[curr]];
	radio.selected(curr)
	document.title=gettitle(playlist[curr]);
	player.play();
}

function playspecific(i){
	prev=curr
	curr=radio.value()||0
	player.src="../music/" + files[playlist[curr]];
	document.title=gettitle(playlist[curr]);
	player.play();
}
function getpl(){
	playlist=[];
	radio=createRadio();
	for (let i=0;i<nsongs;i++){
		playlist.push(ngbrs[i].index);
		radio.option(i,gettitle(playlist[i]));

	}
	radio.parent(Radio)
	const strs=getplstr(playlist);
	select('#r' + radct).elt.onclick=function(){
		saveStrings(strs,"playlist.m3u")
	}
	radio.elt.onchange=function(){playspecific();}
	player.elt.onended=function(){next();}
	prevs();
}

function getplstr(pl){
	plstr=[];
	for (let i=0;i<pl.length;i++){
		let song=files[pl[i]]
		plstr.push("#EXTINF: " + song.replace(/.* _ /,''))
		plstr.push("music/" + song);
	}
	return plstr;
}
