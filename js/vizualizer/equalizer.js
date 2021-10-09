let sketcheq = function(p) {
	let ctx;
	let cnv;
	let mic;
	let wid;
	let loudness = .5;
	let wavhist = [];
	let amp;
	p.preload=function(){
		if(tempplaylist){filee=tempplaylist;}
		else if(playlistid){filee=p.loadStrings("../playlists/"+playlistid +".m3u");}
		else if(FNAME){filee=p.loadStrings(decodeURI(FNAME));}
	}
	p.setup=function(){
		mainUI();
		if (filee){switchsong(0);}
		player.pause();
		//
		p.cnv = p.createCanvas(p.windowWidth,p.windowHeight*0.985);
		p.colorMode(p.HSB,360,255,255,255);
		p.angleMode(p.DEGREES);
		amp=new p5.Amplitude();
		if (soundmode==1){
			let audCtx=p.getAudioContext();
			let audioSrc=audCtx.createMediaElementSource(document.getElementById('player'));
			audioSrc.connect(p5.soundOut);
			for (let i = 0; i < 712; i++) {wavhist.push(0);}
		}
		else{
			p.noLoop();
		}
	}
	p.windowResized=function(){
		p.resizeCanvas(p.windowWidth,p.windowHeight*0.985,true);
	}
	p.draw=function(){
		p.clear();
		let vol = amp.getLevel();
		wavhist.push(vol);
		p.noFill();
		p.strokeWeight(1.3);
		for (let i = 0; i < wavhist.length; i++) {
		p.stroke(p.map(i,0,wavhist.length,0,360), 255, 255,100);
		    let x = p.map(i, 0, wavhist.length, 0, p.width);
		    let y = p.map(wavhist[i], 0, 1, p.height, p.height/2);
		    p.line(x,p.height,x,y);
		}
		if (wavhist.length > 712) {wavhist.splice(0, 1);}
	}
}
//------------------------------------------------------------------------
let equili = new p5(sketcheq,'eq');