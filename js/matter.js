let songitems,prev=null,pl;function switcher(e){e?currSong=e.target.id:(e=songitems[Math.floor(Math.random()*songitems.length)],currSong=e.id,e.scrollIntoView()),pl.src=currSong,pl.play(),document.title=currSong.replace(/.*_ /,"")}function addtopl(e){let t={};t.fn=e.target.id.replace("webp","m3u").replace(/.*playlisticons/,"playlists"),t.link=decodeURI(pl.src).replace(/http:\/\/localhost:?\d?\d?\d?\d?/,"/home/muku/Desktop/muSe/music"),t.title=t.link.replace(/.*_ /,"");e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};fetch("/addintopl",e).then(e=>e.json()).then(e=>{console.log(e)}).catch(e=>e)}window.onload=function(){songitems=document.getElementsByClassName("songs"),pl=document.getElementById("current"),pl.onended=function(){switcher()},document.onkeydown=function(e){switch(console.log(e.key),e.key){case" ":1==pl.paused?pl.play():pl.pause();break;case"ArrowRight":switcher()}}};