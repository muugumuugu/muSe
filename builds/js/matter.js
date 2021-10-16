let songitems;
let prev=null
let pl;
window.onload=function(){
songitems=document.getElementsByClassName('songs')
pl=document.getElementById("current");
pl.onended=function(){switcher()}
document.onkeydown=function(e){
  console.log(e.key)
  switch (e.key){
  	case " ":
  		if (pl.paused==true){pl.play()}
  		else {pl.pause()}
  		break;
  	case "ArrowRight":
  		switcher();
  		break;

  }
}
}
function switcher(e){
	if(e){
		currSong=e.target.id
	}
	else{
		e=songitems[Math.floor(Math.random()*songitems.length)]
		currSong=e.id
		e.scrollIntoView();
	}
	pl.src=currSong
	pl.play()
	document.title=currSong.replace(/.*_ /,'');
}

function addtopl(e){
	let  data={};
	data.fn=e.target.id.replace("webp","m3u").replace(/.*playlisticons/,"playlists")
	data.link=decodeURI(pl.src).replace(/http:\/\/localhost:?\d?\d?\d?\d?/ ,'/home/muku/Desktop/muSe/music')
	data.title=data.link.replace(/.*_ /,'')
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    // Send the POST request - when completed reroute to the /checkin page
    fetch("/addintopl", options).then(result => {
        return result.json()
    }).then(result => {
        console.log(result);
    }).catch(err => {
        return err;
    })

}