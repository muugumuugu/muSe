function preload(){
  clusters=loadJSON('../dat/clusters.json');
  names=loadStrings('../dat/tiles/tile_names.txt');
  }
let player;
let pl=[];
function setup() {
	player=select('audio')
	player.elt.onended=function(){player.play();}
	noCanvas();
	keys=Object.keys(clusters)
	i=0;
  for (let keyy of keys){
    div=createDiv('');
    div.id('d'+keyy)
    div.parent(select('main'))
    img=createImg('../dat/tiles/frames/' +keyy.replace('/','')+".webp",keyy)
    img.elt.id='i' +keyy;
    img.elt.title=names[i]
    img.elt.style.cursor="pointer";
    img.elt.onclick=function(){mkpl(event);}
    img.parent(div)
    i++;
    if (clusters[keyy][0]=="*")continue
    let sl=createSelect();
    sl.parent(div)
    sl.elt.id='s' +keyy;
    sl.elt.onchange=function(){
      player.elt.src=sl.value();
    };
    for (let song of clusters[keyy]){
      sl.option(song,song.replace(/(.*?)_/,'../music/$1/')+'.mp3')
    }

  }

}
function keyPressed(){
if (key==" " ){player.play();}
}
function mkpl(e){
	pl=[];
	let sl=document.getElementById(e.target.id.replace('i','s'));
	if (!sl){return;}
	let keyy=sl.id.replace('/','').replace('s','')
	let opts=sl.children
	for (let o of opts){
		pl.push('"' + encodeURI(o.value)+'"')
	}
	loc=window.location.href.replace(/html\/.*/,'');
	window.location.href=loc +'html/playlist_simple.html?playlist={"dat":[' + pl + ']}&title=' + names[parseInt(keyy)]+ '&cover=' +  '../dat/tiles/frames/' +keyy+".webp"
}