//build the playlist
//---------------------------------------------
function parseplaylist(fname){
	let  m3u=[];
	let regexp=/music.*\/(.*)/;
	for (let i=0; i<fname.length; i++){
		let line=decodeURI(fname[i]);
		let info=line.match(regexp);//match(line, regexp)
		if (info){
			m3u.push([info[1],info[0]]);
		}
	}
	//playlist=m3u;
	return m3u;
}
//-----------------------------------------------------
