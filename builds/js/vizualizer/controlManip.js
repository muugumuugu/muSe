//controlling
let shuffling=false;
let prev=0; curr=0; next=1;
let looping=false;
let vizid=0;
//===============================================================================================================
function highlight(index,status){
	if (filee){
		let item=document.getElementById('song'+index);
		if (status==1){//playing
			item.scrollIntoView();
			item.style.color="black";
			item.style.background="#AAff33";
		}
		else if (status==0){//unhighlight
			item.style.color="white";
			item.style.background="transparent";
		}
		else if (status==2){//show link
			item.style.fontWeight="bold"
			item.style.color="#63c0f5"
			item.style.textShadow="0 0 5px rgba(104, 182, 255, 0.5)"
			item.style.background="transparent";
		}
	}
}
//-------------------------------------------------
function switchsong(ind){
	if (filee){
		prev=curr;
		curr=ind;
		if (shuffling){next=Math.floor(Math.random()*numsongs);}
		else{next=(ind+1)%numsongs;}
		highlight(prev,0);
		highlight(curr,1);
		player.src="../" + playlist[ind][1]
		player.title=playlist[ind][0].replace(/_ .*/,'');
		player.play();
	}
}
//-------------------------------------------------------
function playnext(){
	switchsong(next);
}
function playprev(){
	switchsong(prev);
}
//-------------------------------------------------------------------
function toggle(){
		if (looping){
			loopB.textContent='loop';
			document.getElementById('loopB').className="toggledoff";
		}
		else{
			loopB.textContent='noloop';
			document.getElementById('loopB').className="toggledon";
		}
		looping=!looping;
		console.log("looping: " + looping);
		player.loop=looping;
}
//--------------------------------------------------------------------
function shuffle(){
	if (shuffling==false){
	shuffleB.innerHTML='reorder';
	document.getElementById('shuffleB').className="toggledon";
	}
	else{
	shuffleB.innerHTML='shuffle';
	document.getElementById('shuffleB').className="toggledoff";
	}
	//
	shuffling=!shuffling;
	console.log("shuffling: "+shuffling);
}
//--------------------------------------------------------------------------
function switchviz(currstate){
	if (currstate==1){vizid=(vizid+1)%vizNames.length;}
	else{vizid=(vizid-1+vizNames.length)%vizNames.length;}
	console.log(vizNames[vizid]);
}
//------------------------------------------------------------------
